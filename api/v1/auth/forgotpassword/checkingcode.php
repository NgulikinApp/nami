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
    
    /*
        Parameters
    */
    $code = param($request['code']);
    $email = param($request['email']);
    
    $con->begin_transaction(MYSQLI_TRANS_START_READ_ONLY);
    
    if($token == ''){
        /*
            Function location in : /model/general/functions.php
        */
        invalidCredential();
    }else{
        try{
            //secretKey variabel got from : /model/jwt.php
            $exp = JWT::decode($token, $secretKey, array('HS256'));
            
            $stmt = $con->prepare("SELECT 
                                        user_id
                                    FROM 
                                        user 
                                    WHERE 
                                        email=? 
                                        AND
                                        code_forgotpassword=?");
            
            $stmt->bind_param("ss", $email, $code);
            /*
                Function location in : /v1/auth/functions.php
            */
            $verified = code_verified($stmt);
            
            if($verified[0] == "" || $code == ""){
                /*
                    Function location in : /v1/auth/functions.php
                */
                wrong_code_verified();
            }else{
                $result = array(
            			'email' => $email
            	);
            	$data = array(
            			'status' => "OK",
            			'message' => "Valid code",
            			'response' => $result
            	);
            	
            	/*
                    Function location in : /model/generatejson.php
                */
            	generateJSON($data);
            }
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