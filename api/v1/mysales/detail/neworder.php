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
    $invoiceid = param($_GET['invoiceid']);
    
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
                        recipientname,
                        user_address_phone,
                        email,
                        invoice_shop_detail_notran,
                        CONCAT(address," ", `villages`.name," ",`districts`.name," ",`regencies`.name," ",`provinces`.name) AS address,
                        invoice_shop_detail_notes,
                        GROUP_CONCAT(SUBSTRING_INDEX(product_image, ",", 1) SEPARATOR "~") AS product_image,
                        GROUP_CONCAT(brand_name SEPARATOR "~") AS brand_name,
                        GROUP_CONCAT(product_name SEPARATOR "~") AS product_name,
                        GROUP_CONCAT(product_price SEPARATOR "~") AS product_price,
                        GROUP_CONCAT(invoice_product_detail_sumproduct SEPARATOR "~") AS invoice_product_detail_sumproduct,
                        GROUP_CONCAT(invoice_shop_detail_delivery_price SEPARATOR "~") AS invoice_shop_detail_delivery_price
                    FROM
                        invoice
                        LEFT JOIN invoice_shop_detail ON invoice_shop_detail.invoice_id=invoice.invoice_id
                        LEFT JOIN invoice_brand_detail ON invoice_shop_detail.invoice_shop_detail_id=invoice_brand_detail.invoice_shop_detail_id
                        LEFT JOIN invoice_product_detail ON invoice_brand_detail.invoice_brand_detail_id=invoice_product_detail.invoice_brand_detail_id
                        LEFT JOIN delivery ON invoice_shop_detail.delivery_id=delivery.delivery_id
                        LEFT JOIN `user` ON invoice.user_id=`user`.user_id
                        LEFT JOIN `user_address` ON `user`.user_id=`user_address`.user_id
                        LEFT JOIN `villages` ON `villages`.id=`user_address`.villages_id
                        LEFT JOIN `districts` ON `districts`.id=`villages`.district_id
                        LEFT JOIN `regencies` ON `regencies`.id=`districts`.regency_id
                        LEFT JOIN `provinces` ON `provinces`.id=`regencies`.province_id
                        LEFT JOIN product ON product.product_id=invoice_product_detail.product_id
                        LEFT JOIN brand ON brand.brand_id=product.brand_id
                    WHERE
                        invoice.invoice_id = ?
                        AND priority  = "1"
                        AND user_address_isactive  = "1"
                    GROUP BY 
                        invoice_shop_detail.shop_id';
        
            $stmt = $con->prepare($sql);
            
            $stmt->bind_param("i", $invoiceid);
            
            /*
                Function location in : functions.php
                Cache variabel got from : /model/memcache.php
            */
            neworder($stmt);
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