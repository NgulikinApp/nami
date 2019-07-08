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
    
    /*
        Parameters
    */
    $notrans = param($_GET['notrans']);
    
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
            
            $sql = 'SELECT 
                        delivery_name,
                        GROUP_CONCAT(DATE_FORMAT(invoice_status_detail_createdate, "%d %M %Y")) AS statusdate,
                        GROUP_CONCAT(DATE_FORMAT(invoice_status_detail_createdate, "%H:%i")) AS statustime,
                        GROUP_CONCAT(status_desc) AS `desc`
                    FROM
                        invoice
                        LEFT JOIN invoice_shop_detail ON invoice_shop_detail.invoice_id=invoice.invoice_id
                        LEFT JOIN delivery ON invoice_shop_detail.delivery_id=delivery.delivery_id
                        LEFT JOIN invoice_status_detail ON invoice.invoice_id=invoice_status_detail.invoice_id
                        LEFT JOIN status ON invoice_status_detail.status_id=status.status_id
                    WHERE
                        invoice_shop_detail_notran = ?
                    GROUP BY 
                        invoice_shop_detail_notran';
        
            $stmt = $con->prepare($sql);
            
            $stmt->bind_param("s", $notrans);
            
            /*
                Function location in : functions.php
                Cache variabel got from : /model/memcache.php
            */
            statussending($stmt);
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