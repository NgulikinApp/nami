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
    
    //Parameters
    $page = $_GET['page'];
    $pagesize = $_GET['pagesize'];
    
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
                $key = $_SESSION['user']["key"];
                $shop_id = $_SESSION['user']["shop_id"];
            }else{
                $user_id = '';
                $key = '';
                $shop_id = '';
            }
            
            /*
                Function location in : /model/general/functions.php
            */
            if(checkingAuthKey($con,$user_id,$key) == 0){
                return invalidKey();
            }
            
            $stmt = $con->prepare("SELECT 
                                        brand_id,
                                        brand_name,
                                        brand_image,
                                        username,
                                        shop_total_brand
                                    FROM 
                                        shop
                                        LEFT JOIN `user` ON `user`.user_id = shop.user_id
                                        LEFT JOIN brand ON brand.shop_id = shop.shop_id
                                    WHERE
                                        brand.shop_id = ?
                                    ORDER BY 
                                        brand_id DESC
                                    LIMIT ?,?");
            
            $stmt->bind_param("iii", $shop_id,$page,$pagesize);
            
            /*
                Function location in : function.php
            */
            brand($stmt,$pagesize);
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