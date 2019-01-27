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
    $linkArray = explode('/',$actual_link);
    $shop_name = array_values(array_slice($linkArray, -1))[0];
    
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
            
            if($shop_name == "brand"){
                if(isset($_SESSION['user'])){
                    $user_id = $_SESSION['user']["user_id"];
                    $key = $_SESSION['user']["key"];
                    $shop_name = $_SESSION['user']["shop_name"];
                }else{
                    $user_id = '';
                    $key = '';
                    $shop_name = '';
                }
            }    
            
            if($shop_name == "brand"){
                /*
                    Function location in : /model/general/functions.php
                */
                if(checkingAuthKey($con,$user_id,$key,0,$cache) == 0){
                    return invalidKey();
                }
            }
            
            $stmt = $con->prepare("SELECT 
                                        brand_id,
                                        brand_name,
                                        brand_image,
                                        username,
                                        shop_current_brand,
                                        shop_total_brand
                                    FROM 
                                        shop
                                        LEFT JOIN `user` ON `user`.user_id = shop.user_id
                                        LEFT JOIN brand ON brand.shop_id = shop.shop_id
                                    WHERE
                                        shop.shop_name = ?
                                    ORDER BY 
                                        brand_id DESC");
       
            $stmt->bind_param("s", $shop_name);
            /*
                Function location in : function.php
            */
            brand($stmt);
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