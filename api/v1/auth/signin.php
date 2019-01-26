<?php
    /*
        This API used in ngulikin.com/js/module-signin.js
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
    $auth = basic_auth();
    
    /*
        Function location in : /model/general/postraw.php
    */
    $request = postraw();
    
    /*
        Parameters
    */
    $token = param($request['token']);
    $manual = param($request['manual']);
    $socmed = param(@$request['socmed']);
    $id_socmed = param(@$request['id_socmed']);
    
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
            
            $param = '';
            $password = '';
            if(intval($manual) == 1){
                $stmt = $con->prepare("SELECT 
                                        user_id,
                                        user_isactive,
                                        password
                                    FROM 
                                        user 
                                    WHERE 
                                        (email=? OR username=?)");
                $stmt->bind_param("ss", $auth[0],$auth[0]);
            }else{
                $stmt = $con->prepare("SELECT 
                                        user_id,
                                        user_isactive,
                                        IFNULL(password_".$socmed.",'') AS password
                                    FROM 
                                        user 
                                    WHERE 
                                        (email=? OR id_".$socmed."=?)");
                $stmt->bind_param("ss", $auth[0],$id_socmed);
            }
                
            /*
                Function location in : functions.php
            */
            $verified = account_verify($stmt);
            if($verified[0] == ""){
                /*
                    Function location in : functions.php
                */
                notexist_account();
            }else if($verified[2] == ""){
                $key = encrypt_hash('ngulik_'.$verified[0].date('Y-m-d H:i:s'));
                
                $stmt = $con->prepare("UPDATE 
                                                user
                                            set
                                                time_signin = NOW(),
                                                password_".$socmed." = ?,
                                                id_".$socmed." = ?,
                                                user_key = ?
                                            WHERE 
                                                user_id=?");
                    
                $stmt->bind_param("ssss", $auth['1'], $id_socmed, $key, $verified[0]);
                    
                $stmt->execute();
                /*
                    Function location in : functions.php
                */
                returndata_signin($verified[0],$con);
            }else if($auth[1] != $verified[2]){
                /*
                    Function location in : functions.php
                */
                wrongpassoremail_account(1);
            }else if($verified[1] == 0){
                /*
                    Function location in : functions.php
                */
                incative_account();
            }else{
                $key = encrypt_hash('ngulik_'.$verified[0].date('Y-m-d H:i:s'));
                
                $stmt = $con->prepare("UPDATE 
                                            user
                                        set
                                            time_signin = NOW(),
                                            user_key = ?
                                        WHERE 
                                            user_id=?");
                $stmt->bind_param("ss", $key, $verified[0]);
                
                $stmt->execute();
                
                /*
                    Function location in : functions.php
                */
                returndata_signin($verified[0],$con,$cache);
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