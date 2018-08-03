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
    $id = intval(array_values(array_slice($linkArray, -1))[0]);
    
    /*
        Function location in : /model/general/get_auth.php
    */
    $token = bearer_auth();
    
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
            
            $stmt = $con->query("
                                    SELECT 
                                            inner1.*,
                                            count(product_rate_id) AS product_israte,
                                            IFNULL(product_rate_value,0) AS product_rate_value 
                                    FROM(
                                        SELECT 
                                            product_id,
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
											category_name
                                        FROM 
                                            product
                                            LEFT JOIN brand ON brand.brand_id = product.brand_id
                                            LEFT JOIN shop ON shop.shop_id = brand.shop_id
                                            LEFT JOIN `user` ON `user`.user_id = shop.user_id
                                            LEFT JOIN category ON category.category_id = product.category_id
                                        WHERE
                                            product_id=".$id."
                                    ) AS inner1 
                                        LEFT JOIN product_rate ON inner1.product_id=product_rate.product_id 
                                    WHERE 
                                        product_rate.user_id = '".$user_id."'");
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
    
    /*
        Function location in : /model/connection.php
    */
    conn_close($con);
?>