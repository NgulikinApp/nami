<?php
    /*
        This API used in ngulikin.com/js/module-product.js
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
    
    $linkArray = explode('/',$actual_link);
    $noinvoice = array_values(array_slice($linkArray, -1))[0];
    
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
            if(checkingAuthKey($con,$user_id,$key,0) == 0){
                return invalidKey();
            }
            
            $sql = "
                            SELECT 
                                invoice.invoice_id,
                                delivery_name,
                                invoice_delivery_price,
                                invoice_noresi,
                                invoice_total_price,
                                invoice_paid,
                                invoice_paiddate,
                                invoice_last_paiddate,
                                invoice_detail_sumproduct,
                                GROUP_CONCAT(invoice_detail_notes separator '~') AS list_notes,
                                GROUP_CONCAT(product_name separator '~') AS list_product_name,
                                GROUP_CONCAT(brand_name separator '~') AS list_brand_name,
                                GROUP_CONCAT(shop_name separator '~') AS list_shop_name,
                                GROUP_CONCAT(SUBSTRING_INDEX(product_image,',',1) separator '~') AS list_product_image,
                                GROUP_CONCAT(product_average_rate separator '~') AS list_product_rate,
                                fullname,
                                phone,
                                email
                            FROM
                                invoice
                                LEFT JOIN invoice_detail ON invoice_detail.invoice_id = invoice.invoice_id
                                LEFT JOIN product ON product.product_id = invoice_detail.product_id
                                LEFT JOIN brand ON brand.brand_id = product.brand_id
                                LEFT JOIN shop ON shop.shop_id = brand.shop_id
                                LEFT JOIN delivery ON delivery.delivery_id = invoice.delivery_id
                                LEFT JOIN `user` ON `user`.user_id=invoice.user_id
                            WHERE
                                invoice.invoice_id = ".$noinvoice."
                       ";
            
            $stmt = $con->query($sql);
            /*
                Function location in : functions.php
            */
            detail($stmt);
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