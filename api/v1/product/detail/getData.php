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
    
    $linkArray = explode('/',$actual_link);
    $shopname = array_values(array_slice($linkArray, -2))[0];
    $productname = array_values(array_slice($linkArray, -1))[0];
    $productname = preg_replace('/-/', ' ', $productname);
    
    /*
        Function location in : /model/general/get_auth.php
    */
    $token = bearer_auth();
    
    $con->begin_transaction(MYSQLI_TRANS_START_READ_WRITE);
    
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
            }else{
                $user_id = '';
            }
            
            $sql = "
                    SELECT 
                        product.product_id,
                        `user`.user_id,
                        username,
                        product_name,
                        product_image,
                        product_price,
                        product_description,
                        product_stock,
                        product_minimum,
                        product_weight,
                        product_condition,
                        shop_icon,
                        shop_name,
    					product_count_favorite,
                        product_average_rate,
						category_id,
						subcategory_id,
                        product_count_rate,
                        shop.shop_id,
                        brand_name,
                        product_level,
                        DATE_FORMAT(product_modifydate, '%d %M %Y') AS product_modifydate,
                        product_sold,
                        shop_total_brand,
                        product_seen,
                        product_total_discuss,
                        product_total_review,
						IFNULL((
							SELECT 
									COUNT(invoice.invoice_id) AS soldCurMonth
							FROM
									invoice_shop_detail,
                            		invoice
							WHERE 
                            		shop.shop_id=invoice_shop_detail.shop_id
                            		AND
                            		invoice.invoice_id=invoice_shop_detail.invoice_id
                            		AND
									MONTH(invoice_paiddate) = MONTH(NOW())
							GROUP BY 
									invoice.invoice_id
						), 0) AS soldCurMonth
                    FROM 
                        product
                        LEFT JOIN brand ON brand.brand_id = product.brand_id
                        LEFT JOIN shop ON shop.shop_id = brand.shop_id
                        LEFT JOIN `user` ON `user`.user_id = shop.user_id
                    WHERE
                        shop_name = ?
                        AND
                        product_name = ?
                    ";
            $stmt = $con->prepare($sql);
            
            $stmt->bind_param("ss",$shopname,$productname);
            /*
                Function location in : functions.php
            */
            detail($stmt,$cache,$con);
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