<?php
    /*
        This API used in ngulikin.com/js/module-product.js
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
                                shop_name,
                                brand_name,
                                product_name,
                                SUBSTRING_INDEX(product_image,',',1) AS product_image,
                                invoice_product_detail.product_id,
                                username,
                                invoice_no,
                                DATE_FORMAT(invoice_createdate, '%d-%m-%Y') AS invoice_createdate,
                                invoice_shop_detail_notran,
                                delivery_name,
                                payment_name
                            FROM
                                invoice
								LEFT JOIN invoice_shop_detail ON invoice_shop_detail.invoice_id = invoice.invoice_id
								LEFT JOIN shop ON shop.shop_id = invoice_shop_detail.shop_id
								LEFT JOIN invoice_brand_detail ON invoice_brand_detail.invoice_shop_detail_id = invoice_shop_detail.invoice_shop_detail_id
								LEFT JOIN brand ON brand.brand_id = invoice_brand_detail.brand_id
								LEFT JOIN invoice_product_detail ON invoice_product_detail.invoice_brand_detail_id = invoice_brand_detail.invoice_brand_detail_id
								LEFT JOIN product ON product.product_id = invoice_product_detail.product_id
								LEFT JOIN user ON user.user_id = product.user_id
								LEFT JOIN delivery ON delivery.delivery_id=invoice_shop_detail.delivery_id
								LEFT JOIN payment ON payment.payment_id=invoice.payment_id
                            WHERE
                                invoice.user_id = ?
                                AND
								invoice_product_detail_israted='0'
                                AND
								invoice_current_status=6
                       ";
            
            $stmt = $con->prepare($sql);
            $stmt->bind_param("s", $user_id);
            /*
                Function location in : functions.php
            */
            
            israted($stmt);
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