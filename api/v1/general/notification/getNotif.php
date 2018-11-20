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
    $keyword = @$_GET['keyword'];
    
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
                        notification_id, 
                        notification_desc,
                        brand_name,
                        product_image,
                        DATE_FORMAT(notification_createdate, '%W, %d %M %Y') AS notification_createdate,
                        username
                    FROM 
                        notification
                        LEFT JOIN cart ON notification.cart_id=cart.cart_id
                        LEFT JOIN product ON product.product_id = cart.product_id
                        LEFT JOIN brand ON product.brand_id = brand.brand_id
                        LEFT JOIN shop ON shop.shop_id = brand.shop_id
                        LEFT JOIN `user` ON `user`.user_id = shop.user_id
                    WHERE
                        notification.user_id = '".$user_id."'";
            if($keyword != ''){
                $sql .= " AND notification_desc LIKE '%".$keyword."%'";
            }
            $sql .= " ORDER BY 
                        notification_id DESC";
            
            $stmt = $con->query($sql);
    
            /*
                Function location in : functions.php
            */
            notification($stmt);
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