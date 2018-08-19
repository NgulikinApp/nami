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
            
            $stmt = $con->query("SELECT 
                                    shop_id, 
                                    shop_name,
                                    shop_icon,
                                    username
                            FROM 
                                    shop
                                    LEFT JOIN `user` ON `user`.user_id = shop.user_id
                            ORDER BY 
                                    shop_id DESC
                            LIMIT 4");
            
            /*
                Function location in : function.php
            */
            feed($stmt);
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