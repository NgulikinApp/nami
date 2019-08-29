<?php
    /*
        This API used in ngulikin.com/js/module-signin.js
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
    $auth = basic_auth();
    
    /*
        Function location in : /model/general/postraw.php
    */
    $request = postraw();
    
    $con->begin_transaction(MYSQLI_TRANS_START_READ_WRITE);
    
    if($request['token'] == ''){
        /*
            Function location in : /model/general/functions.php
        */
        invalidCredential();
    }else{
        try{
            //secretKey variabel got from : /model/jwt.php
            $exp = JWT::decode($request['token'], $secretKey, array('HS256'));
            
            $stmt = $con->query("SELECT
                                    user_id,
                                    password,
                                    user_admin
                                FROM 
                                    user 
                                WHERE 
                                    (email='".$auth[0]."' OR username='".$auth[0]."')");
                
            /*
                Function location in : functions.php
            */
            $verified = account_verify_admin($stmt);
            if($verified[0] == ""){
                /*
                    Function location in : functions.php
                */
                notexist_account();
            }else if($auth[1] != $verified[1]){
                /*
                    Function location in : functions.php
                */
                wrongpassoremail_account(1);
            }else if($verified[2] == 0){
                /*
                    Function location in : functions.php
                */
                access_denied();
            }else{
                $key = encrypt_hash('ngulik_admin_'.$verified[0].date('Y-m-d H:i:s'));
                
                $stmt = $con->prepare("UPDATE 
                                            user
                                        set
                                            time_signin_admin = NOW(),
                                            user_key_admin = ?
                                        WHERE 
                                            user_id=?");
                $stmt->bind_param("ss", $key, $verified[0]);
                
                $stmt->execute();
                
                setMemcached("m_user_".$verified[0]."_".$key."_1",$cache,1,3600);
                
                /*
                    Function location in : functions.php
                */
                returndata_signin_admin($verified[0],$key);
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