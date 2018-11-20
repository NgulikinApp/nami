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
    $shopname = array_values(array_slice($linkArray, -2))[0];
    $productname = array_values(array_slice($linkArray, -1))[0];
    $productname = preg_replace('/-/', ' ', $productname);
    
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
                                product_rate,
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
                                product_rate_value,
                       ";
            if($user_id != ''){
                $sql .=" (SELECT count(product_rate_id) AS product_rate_id FROM product_rate WHERE product.product_id=product_rate.product_id AND user_id = '".$user_id."') AS product_israte";
            }else{
                $sql .=" 0 AS product_israte";
            }
            $sql .= " FROM 
                                product
                                LEFT JOIN brand ON brand.brand_id = product.brand_id
                                LEFT JOIN shop ON shop.shop_id = brand.shop_id
                                LEFT JOIN `user` ON `user`.user_id = shop.user_id
                            	LEFT JOIN product_rate ON product.product_id=product_rate.product_id
                            WHERE
                                product_name='".$productname."'
                                AND
                                shop_name = '".$shopname."'";
            
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