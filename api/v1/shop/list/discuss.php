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
            
            $localname = 'id_ID';
            $stmt = $con->prepare("SET lc_time_names = ?");
            $stmt->bind_param("s", $localname);
            $stmt->execute();
            $stmt->close();
            
            $stmt = $con->prepare(" SELECT 
                                            shop_discuss.shop_discuss_id,
											shop_discuss.user_id,
                                            shop_discuss_comment,
                                            `user`.username,
                                            `user`.user_photo,
                                            DATE_FORMAT(shop_discuss_createdate, '%d %M %Y, %H:%i') AS comment_date,
                                            shop_total_discuss,
											IFNULL((
												SELECT 
													GROUP_CONCAT(s.user_id separator '~')
												FROM 
													shop_discuss_reply s 
												WHERE 
													s.shop_discuss_id = shop_discuss.shop_discuss_id
											),'') AS reply_user_id,
											IFNULL((
												SELECT 
													GROUP_CONCAT(sr.fullname separator '~')
												FROM 
													shop_discuss_reply s,
													`user` AS sr
												WHERE 
													s.shop_discuss_id = shop_discuss.shop_discuss_id
													AND
													sr.user_id = s.user_id
											),'') AS reply_fullname,
											IFNULL((
												SELECT 
													GROUP_CONCAT(sr.user_photo separator '~')
												FROM 
													shop_discuss_reply s,
													`user` AS sr
												WHERE 
													s.shop_discuss_id = shop_discuss.shop_discuss_id
													AND
													sr.user_id = s.user_id
											),'') AS reply_photo,
											IFNULL((
												SELECT 
													GROUP_CONCAT(s.shop_discuss_reply_comment separator '~')
												FROM 
													shop_discuss_reply s 
												WHERE 
													s.shop_discuss_id = shop_discuss.shop_discuss_id
											),'') AS reply_comment,
											IFNULL((
												SELECT 
													GROUP_CONCAT(DATE_FORMAT(s.shop_discuss_reply_createdate, '%d %M %Y, %H:%i') separator '~')
												FROM 
													shop_discuss_reply s 
												WHERE 
													s.shop_discuss_id = shop_discuss.shop_discuss_id
											),'') AS reply_comment_date,
											IFNULL((
												SELECT 
													GROUP_CONCAT(sr.username separator '~')
												FROM 
													shop_discuss_reply s,
													`user` AS sr
												WHERE 
													s.shop_discuss_id = shop_discuss.shop_discuss_id
													AND
													sr.user_id = s.user_id
											),'') AS reply_username,
											fullname,
											shop.user_id
                                        FROM
                                            `shop`
                                            LEFT JOIN shop_discuss ON shop_discuss.shop_id = `shop`.shop_id
                                            LEFT JOIN `user` ON `user`.user_id = shop_discuss.user_id
                                        WHERE
                                            shop.shop_name = ?
                                        ORDER BY 
                                            shop_discuss.shop_discuss_id
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