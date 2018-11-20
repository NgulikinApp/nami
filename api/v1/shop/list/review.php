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
    $shop_nametemp = array_values(array_slice($linkArray, -1))[0];
    $shop_nameArray = explode('?',$shop_nametemp);
    $shop_name = $shop_nameArray[0];
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
                                                DATE_FORMAT(shop_review_createdate, '%d %M %Y, %H:%i') AS comment_date,
                                                shop_total_review
                                            FROM 
                                                `shop`
                                                LEFT JOIN shop_review ON shop_review.shop_id = `shop`.shop_id
                                                LEFT JOIN `user` ON `user`.user_id = shop_review.user_id
                                            WHERE
                                                shop.shop_name = '".$shop_name."'
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
                                                DATE_FORMAT(shop_review_createdate, '%d %M %Y, %H:%i') AS comment_date,
                                                shop_total_review
                                            FROM 
                                                `shop`
                                                LEFT JOIN shop_review ON shop_review.shop_id = `shop`.shop_id
                                                LEFT JOIN `user` ON `user`.user_id = shop_review.user_id
                                            WHERE
                                                shop.shop_name = '".$shop_name."'
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