<?php
    /*
        This API used in ngulikin.com/js/module-shop.js
    */
    
    //--------------------------------------------------------------------------
	// Link to File
	//--------------------------------------------------------------------------
	include $_SERVER['DOCUMENT_ROOT'].'/api/model/general/get_auth.php';
	include $_SERVER['DOCUMENT_ROOT'].'/api/model/general/postraw.php';
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
    
    /*
        Function location in : /model/general/postraw.php
    */
    $request = postraw();
    
    /*
        Parameters
    */
    $user_address_id = param(@$request['user_address_id']);
    $type = param($request['type']);
    $address = param($request['address']);
    $provinces_id = param($request['provinces_id']);
    $regencies_id = param($request['regencies_id']);
    $districts_id = param($request['districts_id']);
    $villages_id = param($request['villages_id']);
    $notlp = param($request['phone']);
    
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
            
            if($type == "edit"){
                $stmt = $con->prepare("UPDATE user_address SET address=?,provinces_id=?,regencies_id=?,districts_id=?,villages_id=?,user_address_phone=?,user_address_modifydate=NOW() where user_address_id=?");
                
                $stmt->bind_param("ssssssi", $address,$provinces_id,$regencies_id,$districts_id,$villages_id,$notlp,$user_address_id);
            
                $stmt->execute();
                
                $stmt->close();
            }else if($type == "delete"){
                $stmt = $con->prepare("UPDATE user_address SET user_address_isactive=0,user_address_modifydate=NOW() where user_address_id=?");
                
                $stmt->bind_param("i", $user_address_id);
            
                $stmt->execute();
                
                $stmt->close();
            }else{
                $stmt = $con->prepare("UPDATE user_address SET priority=0 where user_id=?");
                
                $stmt->bind_param("s", $user_id);
            
                $stmt->execute();
                
                $stmt->close();
                
                $stmt = $con->prepare("INSERT INTO user_address(address,provinces_id,regencies_id,districts_id,villages_id,user_id,user_address_phone) VALUES(?,?,?,?,?,?,?)");
                
                $stmt->bind_param("ssssss", $address, $provinces_id,$regencies_id,$districts_id,$villages_id,$user_id,$notlp);
            
                $stmt->execute();
                
                $user_address_id = $con->insert_id;
            }
            /*
                Function location in : functions.php
            */
            actionData($user_address_id,$address,$provinces_id,$regencies_id,$districts_id,$villages_id,$notlp);
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