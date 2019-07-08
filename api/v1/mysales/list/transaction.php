<?php
    /*
        This API used in ngulikin.com/js/module-general.js
    */
    
    //--------------------------------------------------------------------------
	// Link to File
	//--------------------------------------------------------------------------
	include $_SERVER['DOCUMENT_ROOT'].'/api/model/general/get_auth.php';
    include $_SERVER['DOCUMENT_ROOT'].'/api/model/beanoflink.php';
    include 'functions.php';
    
    /*
        Function location in : /model/jwt.php
    */
    use \Firebase\JWT\JWT;
    
    /*
        Function location in : /model/connection.php
    */
    $con = conn();
    
    $date = param($_GET['date']);
    $delivery = param($_GET['delivery']);
    $search = param($_GET['search']);
    
    /*
        Function location in : /model/general/get_auth.php
    */
    $token = bearer_auth();
    
    $con->begin_transaction(MYSQLI_TRANS_START_READ_ONLY);
    
    if($token == ''){
        /*
            Function location in : /model/general/functions.php
        */
        invalidCredential();
    }else{
       try{
            //secretKey variabel got from : /model/jwt.php
            $exp = JWT::decode($token, $secretKey, array('HS256'));
            
            if(isset($_SESSION['user'])){
                $user_id = $_SESSION['user']["user_id"];
                $key = $_SESSION['user']["key"];
            }else{
                $user_id = '';
                $key = '';
            }
            
            /*
                Function location in : /model/general/functions.php
            */
            if(checkingAuthKey($con,$user_id,$key,0,$cache) == 0){
                return invalidKey();
            }
            
            $a_param_type = array();
            $a_bind_params = array();
            
            $sql = "SELECT 
                        invoice.invoice_id,
                        invoice_no,
                        DATE_FORMAT(invoice_createdate, '%d-%m-%Y') AS invoice_createdate,
                        fullname,
                        username,
                        user_photo,
                        delivery_name,
                        invoice_current_status
                    FROM
                        shop
                        LEFT JOIN invoice_shop_detail ON invoice_shop_detail.shop_id=shop.shop_id
                        LEFT JOIN invoice ON invoice.invoice_id=invoice_shop_detail.invoice_id
                        LEFT JOIN `user` ON `user`.user_id=invoice.user_id
                        LEFT JOIN delivery ON delivery.delivery_id=invoice_shop_detail.delivery_id
                    WHERE
                        shop.user_id = ?
                        AND invoice_current_status=6 OR invoice_current_status=7
                    LIMIT 0,5";
            
            array_push($a_param_type,"s");
            array_push($a_bind_params,$user_id);
            
            if($date != ''){
                $sql .= " AND CAST(invoice_createdate AS DATE) = ".date("Y-m-d");
            }
            
            if($delivery != '0'){
                $sql .= " AND invoice.delivery_id = ?";
                
                array_push($a_param_type,"i");
                array_push($a_bind_params,$delivery);
            }
            
            if($search != ''){
                if(is_numeric ($search)){
                    $sql .= " AND invoice.delivery_id = ?";
                    
                    array_push($a_param_type,"i");
                }else{
                    $sql .= " AND fullname = ?";
                    
                    array_push($a_param_type,"s");
                }
                array_push($a_bind_params,$search);
            }
        
            $a_params = array();
 
            $param_type = '';
            $n = count($a_param_type);
            for($i = 0; $i < $n; $i++) {
              $param_type .= $a_param_type[$i];
            }
             
            /* with call_user_func_array, array params must be passed by reference */
            $a_params[] = & $param_type;
             
            for($i = 0; $i < $n; $i++) {
              /* with call_user_func_array, array params must be passed by reference */
              $a_params[] = & $a_bind_params[$i];
            }
             
            /* Prepare statement */
            $stmt = $con->prepare($sql);
             
            /* use call_user_func_array, as $stmt->bind_param('s', $param); does not accept params array */
            call_user_func_array(array($stmt, 'bind_param'), $a_params);
            
            /*
                Function location in : functions.php
                Cache variabel got from : /model/memcache.php
            */
            transaction($stmt);
        }catch(Exception $e){
            /*
                Function location in : /model/general/functions.php
            */
           tokenExpired();
        }
    }
    
    $con->commit();
    
    /*
        Function location in : /model/connection.php
    */
    conn_close($con);
?>