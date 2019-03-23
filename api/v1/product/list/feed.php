<?php
    /*
        This API used in ngulikin.com/js/module-home.js
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
    $filter = param($_GET['filter']);
    
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
            //secretKey variabel getting from : /model/jwt.php
            $exp = JWT::decode($token, $secretKey, array('HS256'));
            
            if(isset($_SESSION['user'])){
                $user_id = $_SESSION['user']["user_id"];   
            }else{
                $user_id = '';
            }
            
            $sql = "SELECT 
                                            product.product_id, 
                                            username,
                                            product_name,
                                            product_image,
                                            product_price,
                    						(
                                                SELECT 
                                                    COUNT(product_favorite_id) 
                                                FROM 
                                                    product_favorite 
                                                WHERE 
                                                    product_favorite.product_id=product.product_id 
                                                    AND 
                                                    user_id = ?
                                            ) AS product_isfavorite,
											shop_name,
											shop.shop_id,
											product_average_rate
                                    FROM 
                                            product
                                            LEFT JOIN brand ON brand.brand_id = product.brand_id
                                            LEFT JOIN shop ON shop.shop_id = brand.shop_id
                                            LEFT JOIN `user` ON `user`.user_id = shop.user_id";
                    				
            if($filter == 'bestseller'){
                $sql .= " ORDER BY product_sold DESC";
            }else{
                $sql .= " ORDER BY product_id DESC";
            }
            
            $sql .= " LIMIT 6";
            $stmt = $con->prepare($sql);
            
            $stmt->bind_param("s", $user_id);
            
            /*
                Function location in : functions.php
            */
            feed($stmt);
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