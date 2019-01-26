<?php
    /*
        This API used in ngulikin.com/js/module-forgotpassword.js
    */
    
    date_default_timezone_set('Etc/UTC');
    
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
    $email = param($request['email']);
    
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
            
            $stmt = $con->prepare("SELECT 
                                        user_id,
                                        user_isactive,
                                        email,
                                        fullname
                                    FROM 
                                            user 
                                    WHERE 
                                            (email=? OR username=?)");
            $stmt->bind_param("ss", $email, $email);
            /*
                Function location in : /model/auth/function.php
            */
            $verified = get_account_forgotpassword($stmt);
            
            if($verified[0] == ""){
                /*
                    Function location in : /model/auth/function.php
                */
                wrongpassoremail_account(0);
            }else if($verified[1] == 0){
                /*
                    Function location in : /model/auth/function.php
                */
                incative_account();
            }else{
                /*
                    Function location in : /model/general/functions.php
                */
                $code = generateRandomString();
                
                $stmt = $con->prepare("UPDATE 
                                            user
                                        SET
                                            code_forgotpassword = ?,
                                            time_code_forgotpassword = NOW()
                                        WHERE 
                                            user_id = ?");
                
                $stmt->bind_param("ss", $code, $verified[0]);
                
                $stmt->execute();
                
                $stmt->close();
                
                /*
                    Function location in : /model/general/functions.php
                */
                $sendemail = sendEmail("info@ngulikin.com","Ngulikin",$verified[2],$verified[3],"Lupa Password","Peringatan, jangan memberi tahu code berikut untuk menjaga kerahasiaan privasi anda.<br><br>Kode anda adalah <b>".$code."</b>");
                
            	if ($sendemail) {
            	    $result = array(
            			'email' => $verified[2]
            		);
            		$data = array(
            			'status' => "OK",
            			'message' => "Email has been sent successfully",
            			'response' => $result
            		);
            	} else {
            		$result = (object)array();
            		$data = array(
            			'status' => "NO",
            			'message' => "Email has not been sent",
            			'response' => $result
            		);
            	}
            	
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