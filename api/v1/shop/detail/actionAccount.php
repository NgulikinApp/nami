<?php
    /*
        This API used in ngulikin.com/js/module-shop-seller.js
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
    $password = $request['password'];
    $account_name = $request['account_name'];
    $account_no = $request['account_no'];
    $bank_id = intval($request['bank_id']);
    
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
            }else{
                $user_id = '';
                $key = '';
            }
            
            /*
                Function location in : /model/general/functions.php
            */
            if(checkingAuthKey($con,$user_id,$key) == 0){
                return invalidKey();
            }
            
            $stmt = $con->query("SELECT 
                                        1
                                    FROM 
                                        user 
                                    WHERE 
                                        user_id='".$user_id."' 
                                        AND
                                        password='".$password."'");
            
            /*
                Function location in : functions.php
            */
            $rowcount = account_verify($stmt);
            if(intval($rowcount) == 0){
                /*
                    Function location in : functions.php
                */
                return credential_failed();
            }
            
            if($request['method'] == "edit"){
                $account_id = $request['account_id'];
                $con->prepare("UPDATE account SET account_name='".$account_name."',account_no='".$account_no."',account_modifydate=NOW(),bank_id=".$bank_id." where account_id=".$account_id."");
            }else{
                $stmt = $con->query("INSERT INTO account(user_id,bank_id,account_name,account_no) VALUES('".$user_id."',".$bank_id.",'".$account_name."','".$account_no."')");
                
                /*
                    Function location in : /model/general/functions.php
                */
                $account_id = runQuery_returnId($stmt);
            }
            
            /*
                Function location in : functions.php
            */
            actionAccount($stmt,$account_id,$request['account_name'],$request['account_no'],$request['bank_name'],$request['bank_icon']);
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