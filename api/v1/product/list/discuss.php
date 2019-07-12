<?php
    /*
        This API used in ngulikin.com/js/module-shop.js
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
    $shop_nametemp = array_values(array_slice($linkArray, -1))[0];
    $shop_nameArray = explode('?',$shop_nametemp);
    $shop_name = $shop_nameArray[0];
    $page = param($_GET['page']);
    $pagesize = param($_GET['pagesize']);
    
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
            
            $stmt = $con->prepare(" SELECT 
                                            product_discuss.product_discuss_id,
											product_discuss.user_id,
                                            product_discuss_comment,
                                            `user`.username,
                                            `user`.user_photo,
                                            DATE_FORMAT(product_discuss_createdate, '%W, %d %M %Y') AS comment_date,
                                            product_total_discuss,
											IFNULL((
												SELECT 
													GROUP_CONCAT(p.user_id separator '~')
												FROM 
													product_discuss_reply p 
												WHERE 
													p.product_discuss_id = product_discuss.product_discuss_id
											),'') AS reply_user_id,
											IFNULL((
												SELECT 
													GROUP_CONCAT(sr.fullname separator '~')
												FROM 
													product_discuss_reply p,
													`user` AS sr
												WHERE 
													p.product_discuss_id = product_discuss.product_discuss_id
													AND
													sr.user_id = p.user_id
											),'') AS reply_fullname,
											IFNULL((
												SELECT 
													GROUP_CONCAT(sr.user_photo separator '~')
												FROM 
													product_discuss_reply p,
													`user` AS sr
												WHERE 
													p.product_discuss_id = product_discuss.product_discuss_id
													AND
													sr.user_id = p.user_id
											),'') AS reply_photo,
											IFNULL((
												SELECT 
													GROUP_CONCAT(p.product_discuss_reply_comment separator '~')
												FROM 
													product_discuss_reply p 
												WHERE 
													p.product_discuss_id = product_discuss.product_discuss_id
											),'') AS reply_comment,
											IFNULL((
												SELECT 
													GROUP_CONCAT(p.product_discuss_reply_createdate separator '~')
												FROM 
													product_discuss_reply p 
												WHERE 
													p.product_discuss_id = product_discuss.product_discuss_id
											),'') AS reply_comment_date,
											IFNULL((
												SELECT 
													GROUP_CONCAT(sr.username separator '~')
												FROM 
													product_discuss_reply p,
													`user` AS sr
												WHERE 
													p.product_discuss_id = product_discuss.product_discuss_id
													AND
													sr.user_id = p.user_id
											),'') AS reply_username,
											fullname,
											product.user_id
                                        FROM
                                            `shop`
                                            LEFT JOIN brand ON shop.shop_id = brand.shop_id
                                            LEFT JOIN `product` ON brand.brand_id = product.brand_id
                                            LEFT JOIN product_discuss ON product_discuss.product_id = `product`.product_id
                                            LEFT JOIN `user` ON `user`.user_id = product_discuss.user_id
                                        WHERE
                                            shop.shop_name = ?
                                            AND
                                            product.product_name = ?
                                        ORDER BY 
                                            product_discuss.product_discuss_id
                                        LIMIT ?");
            
            $stmt->bind_param("si", $shop_name,$pagesize);
            /*
                Function location in : function.php
            */
            discuss($stmt,$pagesize);
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