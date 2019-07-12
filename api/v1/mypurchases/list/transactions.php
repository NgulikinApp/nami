<?php
    /*
        This API used in ngulikin.com/js/module-general.js
    */
    
    //--------------------------------------------------------------------------
	// Link to File
	//--------------------------------------------------------------------------
	include './api/model/general/get_auth.php';
    include './api/model/beanoflink.php';
    include 'functions.php';
    
    /*
        Function location in : /model/jwt.php
    */
    use \Firebase\JWT\JWT;
    
    /*
        Function location in : /model/connection.php
    */
    $con = conn();
    
    /*
        Parameters
    */
    $date = param(@$_GET['date']);
    $search = param(@$_GET['search']);
    
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
						invoice_no,
                        IFNULL(DATE_FORMAT(invoice_createdate, '%d %M %Y'),'') AS transaction_date,
                        CASE
							WHEN invoice_current_status = 1 AND DATEDIFF(CAST(NOW() AS DATE),CAST(invoice_last_paiddate AS DATE)) > 0 THEN 'Kadaluarsa'
							ELSE status_name
						END AS status_name,
                        product_name,
                        SUBSTRING_INDEX(product_image,',',1) AS product_image,
                        username,
                        (invoice_product_detail_sumproduct * product_price) AS total_price
                    FROM
                        invoice
                        LEFT JOIN status ON status.status_id=invoice.invoice_current_status
                        LEFT JOIN invoice_shop_detail ON invoice_shop_detail.invoice_id = invoice.invoice_id
						LEFT JOIN invoice_brand_detail ON invoice_brand_detail.invoice_shop_detail_id = invoice_shop_detail.invoice_shop_detail_id
						LEFT JOIN invoice_product_detail ON invoice_product_detail.invoice_brand_detail_id = invoice_brand_detail.invoice_brand_detail_id
                        LEFT JOIN product ON product.product_id=invoice_product_detail.product_id
                        LEFT JOIN `user` ON `user`.user_id=product.user_id
                    WHERE
                        invoice.user_id = ?";
                                    
            array_push($a_param_type,"s");
            array_push($a_bind_params,$user_id);
            
            if($search != ''){
                $sql .= " AND invoice.invoice_id = ?";
                
                array_push($a_param_type,"i");
                array_push($a_bind_params,$search);
            }
            
            if($date != ''){
                $sql .= " AND invoice.invoice_createdate = ?";
                
                array_push($a_param_type,"s");
                array_push($a_bind_params,$date);
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
            transactions($stmt);
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