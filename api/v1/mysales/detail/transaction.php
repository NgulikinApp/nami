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
    $invoice_id = param($_GET['invoice_id']);
    
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
                        delivery_name,
                        invoice_delivery_price,
                        invoice_detail_noresi,
                        invoice_total_price,
                        invoice_createdate,
                        fullname,
                        email,
                        phone,
                        user_photo,
                        username,
                        GROUP_CONCAT(invoice_detail_sumproduct separator '~') AS invoice_detail_sumproduct,
                        GROUP_CONCAT(invoice_detail_notes separator '~') AS invoice_detail_notes,
                        GROUP_CONCAT(product_name separator '~') AS product_names,
                        GROUP_CONCAT(SUBSTRING_INDEX(product_image,',',1) separator '~') AS product_images,
                        GROUP_CONCAT(brand_name separator '~') AS brand_names,
                        GROUP_CONCAT(invoice_status_detail_createdate separator '~') AS status_date,
                        GROUP_CONCAT(status_desc separator '~') AS status_desc
                    FROM
                        invoice
                        LEFT JOIN `user` ON `user`.user_id=invoice.user_id
                        LEFT JOIN invoice_detail ON invoice.invoice_id=invoice_detail.invoice_id
                        LEFT JOIN invoice_status_detail ON invoice_status_detail.invoice_id=invoice.invoice_id
                        LEFT JOIN status ON status.status_id=invoice_status_detail.status_id
                        LEFT JOIN product ON product.product_id=invoice_detail.product_id
                        LEFT JOIN brand ON brand.brand_id=product.brand_id
                        LEFT JOIN delivery ON delivery.delivery_id=invoice.delivery_id
                    WHERE
                        invoice.invoice_id = ?
                    GROUP BY 
                        invoice_detail_sumproduct,
                        invoice_detail_notes,
                        product_name,
                        product_image,
                        brand_name,
                        invoice_status_detail_createdate,
                        status_desc";
            
            $stmt = $con->prepare($sql);
            $stmt->bind_param("i", $invoice_id);
            
            /*
                Function location in : functions.php
                Cache variabel got from : /model/memcache.php
            */
            listtransaction($stmt);
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