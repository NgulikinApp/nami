<?php
    /*
        This API used in ngulikin.com/js/module-shop.js, ngulikin.com/js/module-shop-seller.js
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
            
            if($id == "shop"){
                if(isset($_SESSION['user'])){
                    $id = $_SESSION['user']["shop_id"];
                }else{
                    $id = '';
                }
            }
            
            $stmt = $con->query("SELECT 
                                                    shop.shop_id,
                                                    `user`.user_id,
                                                    username,
                                                    shop_name,
                                                    shop_icon,
                                                    shop_description,
                                                    shop_banner,
                                                    IFNULL(university,'') AS university,
                                        			user_photo
                                            FROM 
                                                    shop
                                                    LEFT JOIN `user` ON `user`.user_id = shop.user_id
                                            WHERE
                                                    shop.shop_id=".$id."");
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