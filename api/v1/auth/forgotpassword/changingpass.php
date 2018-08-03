<?php
    /*
        This API used in ngulikin.com/js/module-forgotpassword.js
    */
    
    //--------------------------------------------------------------------------
	// Link to File
	//--------------------------------------------------------------------------
    include $_SERVER['DOCUMENT_ROOT'].'/api/model/beanoflink.php';
    include $_SERVER['DOCUMENT_ROOT'].'/api/v1/auth/functions.php';
    include $_SERVER['DOCUMENT_ROOT'].'/api/model/general/get_auth.php';
	include $_SERVER['DOCUMENT_ROOT'].'/api/model/general/postraw.php';
	
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
    
    if($token == ''){
        /*
            Function location in : /model/general/functions.php
        */
        invalidCredential();
    }else{
        try{
            //secretKey variabel got from : /model/jwt.php
            $exp = JWT::decode($token, $secretKey, array('HS256'));
            
            $con->query("UPDATE 
                                        user
                                    SET
                                        password = '".$request['password']."'
                                    WHERE 
                                        email = '".$request['email']."'");
            
            
            $data = array(
            			'status' => "OK",
            			'message' => "Password has been changed, you can login now"
            );
            
            /*
                Function location in : /model/generatejson.php
            */
            generateJSON($data);
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