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
            
            $sql = "SELECT 
                        invoice.invoice_id,
                        invoice_noresi,
                        invoice_createdate,
                        fullname,
                        email,
                        phone,
                        user_photo,
                        username,
                        GROUP_CONCAT(invoice_status_detail_createdate separator '~') AS status_date,
                        GROUP_CONCAT(status_desc separator '~') AS status_desc
                    FROM
                        invoice
                        LEFT JOIN `user` ON `user`.user_id=invoice.user_id
                        LEFT JOIN invoice_status_detail ON invoice_status_detail.invoice_id=invoice.invoice_id
                        LEFT JOIN status ON status.status_id=invoice_status_detail.status_id
                    WHERE
                        seller_id = '".$user_id."'
                        AND invoice_current_status=4";
        
            $stmt = $con->query($sql);
            
            if($delivery != '0'){
                $sql .= " AND invoice.delivery_id = ".$delivery;
            }
            
            if($search != ''){
                if(is_numeric ($search)){
                    $sql .= " AND (invoice.delivery_id = ".$search." OR invoice.invoice_noresi =".$search.")";
                }else{
                    $sql .= " AND invoice.fullname = '".$search."'";
                }
            }
            
            /*
                Function location in : functions.php
                Cache variabel got from : /model/memcache.php
            */
            sendinginvoice($stmt);
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