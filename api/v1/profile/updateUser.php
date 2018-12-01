<?php
    /*
        This API used in ngulikin.com/js/module-profile.js
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
                $username = $_SESSION['user']["username"];
            }else{
                $user_id = '';
                $key = '';
                $username = '';
            }
            
            /*
                Function location in : /model/general/functions.php
            */
            if(checkingAuthKey($con,$user_id,$key,0) == 0){
                return invalidKey();
            }
            
            $user_photo_name = '';
            if (isset($_SESSION['file'])){
                
                $source_dir = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username.'/temp';
                $dest_dir = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username;
                $user_photo_name = $_SESSION['file'][0];
                
                $source = $source_dir.'/'.$user_photo_name;
                $dest = $dest_dir.'/'.$user_photo_name;
                
                /*
                    Function location in : /model/general/functions.php
                */
                emptyFolder($dest_dir);
                
                rename($source,$dest);
            }
            
            if ($user_photo_name != ''){
                $stmt = $con->prepare("UPDATE user SET fullname=?, dob=?, gender=?, phone=?,user_photo=? WHERE user_id=?");   
                
                $stmt->bind_param("ssssss", $request['fullname'],$request['dob'],$request['gender'],$request['phone'],$user_photo_name,$user_id);
            }else{
                $stmt = $con->prepare("UPDATE user SET fullname=?, dob=?, gender=?, phone=? WHERE user_id=?");   
                
                $stmt->bind_param("ssssss", $request['fullname'],$request['dob'],$request['gender'],$request['phone'],$user_id);
            }
                
            $stmt->execute();
            
            $stmt->close();
            
            /*
                Function location in : functions.php
            */
            updateUser($user_id,$con);
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