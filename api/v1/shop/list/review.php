<?php
    /*
        This API used in ngulikin.com/js/module-shop.js
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
    
    //Parameters
    $linkArray = explode('/',$actual_link);
    $id = intval(array_values(array_slice($linkArray, -1))[0]);
    $page = $_GET['page'];
    $pagesize = $_GET['pagesize'];
    $type = $_GET['type'];
    
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
                $stmt = $con->query(" SELECT 
                                            * 
                                        FROM (
                                            SELECT 
                                                shop_review_id,
                                                shop_review.user_id,
                                                shop_review_comment,
                                                username,
                                                user_photo,
                                                fullname,
                                                DATE_FORMAT(shop_review_createdate, '%W, %d %M %Y') AS comment_date,
                                                shop_total_review
                                            FROM 
                                                shop_review
                                                LEFT JOIN `user` ON `user`.user_id = shop_review.user_id
                                                LEFT JOIN `shop` ON `shop`.shop_id = shop_review.shop_id
                                            WHERE
                                                shop_review.shop_id = ".$id."
                                            ORDER BY 
                                                shop_review_id DESC
                                            LIMIT ".$pagesize."
                                        ) sub
                                        ORDER BY 
                                            shop_review_id ASC");
            }else{
                $stmt = $con->query(" SELECT 
                                                shop_review_id,
                                                shop_review.user_id,
                                                shop_review_comment,
                                                username,
                                                user_photo,
                                                fullname,
                                                DATE_FORMAT(shop_review_createdate, '%W, %d %M %Y') AS comment_date,
                                                shop_total_review
                                            FROM 
                                                shop_review
                                                LEFT JOIN `user` ON `user`.user_id = shop_review.user_id
                                                LEFT JOIN `shop` ON `shop`.shop_id = shop_review.shop_id
                                            WHERE
                                                shop_review.shop_id = ".$id."
                                            ORDER BY 
                                                shop_review_id DESC
                                            LIMIT ".$page.",".$pagesize."");
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