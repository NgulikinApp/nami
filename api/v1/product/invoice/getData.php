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
            if(checkingAuthKey($con,$user_id,$key,0,$cache) == 0){
                return invalidKey();
            }
            
            $sql = "
                            SELECT 
                                invoice.invoice_id,
                                invoice_paiddate,
                                invoice_last_paiddate,
                                fullname,
                                phone,
                                email,
                                username,
                                invoice_shop_detail.shop_id AS shop_id,
                                shop_name,
                                invoice_shop_detail.delivery_id,
                                delivery_name,
                                invoice_shop_detail_delivery_price,
								invoice_shop_detail_notes,
								invoice_shop_detail_noresi,
                                invoice_product_detail.product_id AS product_id,
                                brand_name,
                                product_name,
                                invoice_product_detail_sumproduct,
                                SUBSTRING_INDEX(product_image,',',1) AS product_image,
                                product_average_rate,
                                product_price,
                                product_weight
                            FROM
                                invoice
								LEFT JOIN invoice_shop_detail ON invoice_shop_detail.invoice_id = invoice.invoice_id
								LEFT JOIN shop ON shop.shop_id = invoice_shop_detail.shop_id
								LEFT JOIN delivery ON delivery.delivery_id = invoice_shop_detail.delivery_id
								LEFT JOIN invoice_brand_detail ON invoice_brand_detail.invoice_shop_detail_id = invoice_shop_detail.invoice_shop_detail_id
								LEFT JOIN brand ON brand.brand_id = invoice_brand_detail.brand_id
								LEFT JOIN invoice_product_detail ON invoice_product_detail.invoice_brand_detail_id = invoice_brand_detail.invoice_brand_detail_id
								LEFT JOIN product ON product.product_id = invoice_product_detail.product_id
                                LEFT JOIN `user` ON `user`.user_id=shop.user_id
                            WHERE
                                invoice.invoice_no = ?
                       ";
            
            $stmt = $con->prepare($sql);
            $stmt->bind_param("s", $noinvoice);
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