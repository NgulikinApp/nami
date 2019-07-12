<?php
    /*
        This API used in ngulikin.com/js/module-shop-mysales.js
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
    $oldpassword = param($request['oldpassword']);
    $newpassword = param($request['newpassword']);
    
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
            
            if(isset($_SESSION['user'])){
                $user_id = $_SESSION['user']["user_id"];
                $key = $_SESSION['user']["key"];
                $fullname = $_SESSION['user']["fullname"];
                $email = $_SESSION['user']["email"];
            }else{
                $user_id = '';
                $key = '';
                $fullname = '';
                $email = '';
            }
            
            /*
                Function location in : /model/general/functions.php
            */
            if(checkingAuthKey($con,$user_id,$key,0,$cache) == 0){
                return invalidKey();
            }
            
            $stmt = $con->prepare("SELECT 
                                    1
                                FROM 
                                    user 
                                WHERE 
                                    user_id=? and password=?");
            
            $stmt->bind_param("ss", $user_id,$oldpassword);
            
            $stmt->execute();
            
            $stmt->store_result();
            /*
                Function location in : /model/general/functions.php
            */
            $verified = count_rows($stmt);
            
            if(intval($verified) === 0){
                /*
                    Function location in : functions.php
                */
                password_notcorrect();
            }else{
                $param = base64_encode($user_id.'~'.$newpassword);
                
                /*
                    Function location in : /model/general/functions.php
                */
                sendEmail("info@ngulikin.com","Ngulikin",$email,$fullname,"Ganti Password","Klik tombol aktif dibawah ini, untuk mengubah password anda.<br><br><a href='".INIT_URL."/v1/profile/cm?q=".$param."'><div style='background-color:#004E82;border-radius: 5px;width: 35px;font-weight: bold;padding:8px;color:#FFFFFF;'>Ubah</div></a>");
                
                /*
                    Function location in : functions.php
                */
                confirm_password();
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