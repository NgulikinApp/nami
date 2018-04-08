<?php
    /*
        This API used in ngulikin.com/js/module-shop-seller.js
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
                                            delivery_id,
                                            delivery_icon,
                                            IFNULL(
                                                    (
                                                        SELECT 
                                                                shop_id 
                                                        FROM 
                                                                shop_delivery                   
                                                        WHERE 
                                                                shop_delivery.delivery_id=delivery.delivery_id 
                                                                AND 
                                                                shop_id = ?
                                                    )
                                            ,'') AS is_choose,
                                            delivery_ismid,
                                            delivery_name
                                    FROM 
                                        delivery");
            
            $stmt->bind_param("i", $shop_id);
            
            /*
                Function location in : function.php
            */
            delivery($stmt);
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