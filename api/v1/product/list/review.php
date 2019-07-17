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
    
    //Parameters
    $linkArray = explode('/',$actual_link);
    $shopname = array_values(array_slice($linkArray, -2))[0];
    $productname = array_values(array_slice($linkArray, -1))[0];
    $productname = preg_replace('/-/', ' ', $productname);
	$productnameArray = explode('?',$productname);
    $productname = $productnameArray[0];
    $page = param($_GET['page']);
    $pagesize = param($_GET['pagesize']);
    $type = param($_GET['type']);
    
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
            
            if($type == 0){
                $stmt = $con->prepare(" SELECT 
                                            * 
                                        FROM (
                                            SELECT 
                                                product_review_id,
                                                product_review.user_id,
                                                product_review_comment,
                                                username,
                                                user_photo,
                                                DATE_FORMAT(product_review_createdate, '%d %M %Y, %H:%i') AS comment_date,
                                                product_total_review
                                            FROM 
                                                product_review
												LEFT JOIN product ON product_review.product_id = product.product_id
                                                LEFT JOIN brand ON brand.brand_id = product.brand_id
                                                LEFT JOIN `shop` ON shop.shop_id = brand.shop_id
                                                LEFT JOIN `user` ON `user`.user_id = product_review.user_id
                                            WHERE
                                                shop.shop_name = ?
                                                AND
                                                product.product_name = ?
                                            ORDER BY 
                                                product_review_id DESC
                                            LIMIT ?
                                        ) sub
                                        ORDER BY 
                                            product_review_id ASC");
                
                $stmt->bind_param("ssi", $shopname,$productname,$pagesize);
            }else{
                $stmt = $con->prepare(" SELECT 
                                                product_review_id,
                                                product_review.user_id,
                                                product_review_comment,
                                                username,
                                                user_photo,
                                                DATE_FORMAT(product_review_createdate, '%d %M %Y, %H:%i') AS comment_date,
                                                product_total_review
                                            FROM 
                                                product_review
												LEFT JOIN product ON product_review.product_id = product.product_id
                                                LEFT JOIN brand ON brand.brand_id = product.brand_id
                                                LEFT JOIN `shop` ON shop.shop_id = brand.shop_id
                                                LEFT JOIN `user` ON `user`.user_id = product_review.user_id
                                            WHERE
                                                shop.shop_name = ?
                                                AND
                                                product.product_name = ?
                                            ORDER BY 
                                                product_review_id DESC
                                            LIMIT ?,?");
                                            
                $stmt->bind_param("ssii", $shopname,$productname,$page,$pagesize);
            }
            
            /*
                Function location in : function.php
            */
            review($stmt,$pagesize);
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