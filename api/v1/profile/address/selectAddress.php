<?php
    /*
        This API used in ngulikin.com/js/module-shop.js
    */
    
    //--------------------------------------------------------------------------
	// Link to File
	//--------------------------------------------------------------------------
	include './api/model/general/get_auth.php';
	include './api/model/general/postraw.php';
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
    
    /*
        Function location in : /model/general/get_auth.php
    */
    $token = bearer_auth();
    
    /*
        Function location in : /model/general/postraw.php
    */
    $request = postraw();
    
    /*
        Parameters
    */
    $user_address_id = param(@$request['user_address_id']);
    
    $con->begin_transaction(MYSQLI_TRANS_START_READ_WRITE);
    
    if($token == ''){
        /*
            Function location in : /model/general/functions.php
        */
        invalidCredential();
    }else{
        try{
            //secretKey variabel got from : /model/jwt.php
            $exp = JWT::decode($token, $secretKey, array('HS256'));
            
            if(isset($_SESSION['user'])){
                $user_id = $_SESSION['user']["user_id"];
                $key = $_SESSION['user']["key"];
            }else{
                $user_id = '';
                $key = '';
            }
            
            /*
                Function location in : /model/general/functions.php
            */
            if(checkingAuthKey($con,$user_id,$key,0,$cache) == 0){
                return invalidKey();
            }
            
            $stmt = $con->prepare("UPDATE user_address SET priority='0' WHERE user_id=?");
            $stmt->bind_param("s", $user_id);
            $stmt->execute();
            $stmt->close();
            
            $stmt = $con->prepare("UPDATE user_address SET priority='1' WHERE user_address_id=?");
            $stmt->bind_param("i", $user_address_id);
            $stmt->execute();
            $stmt->close();
            
            $sql = "SELECT
                        user_address_id,
                        address,
                        provinces_id,
                        regencies_id,
                        districts_id,
                        villages_id,
                        recipientname,
                        user_address_phone
                    FROM 
                        `user_address`
                    WHERE 
                        user_address_id=?";
            
            $stmt = $con->prepare($sql);
            $stmt->bind_param("i", $user_address_id);
            
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
    
    $con->commit();
    
    /*
        Function location in : /model/connection.php
    */
    conn_close($con);
?>