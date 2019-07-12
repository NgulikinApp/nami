<?php
    /*
        This API used in ngulikin.com/js/module-home.js
    */
    
    //--------------------------------------------------------------------------
	// Link to File
	//--------------------------------------------------------------------------
    include './api/model/general/get_auth.php';
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
    
    $con->begin_transaction(MYSQLI_TRANS_START_READ_ONLY);
    
    if($token == ''){
        /*
            Function location in : /model/general/functions.php
        */
        invalidCredential();
    }else{
        try{
            //secretKey variabel getting from : /model/jwt.php
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
            
            $sql = "SELECT
                        user_address_id,
                        address,
                        provinces_id,
                        regencies_id,
                        districts_id,
                        villages_id,
                        recipientname,
                        user_address_phone,
                        provinces.name AS province_name,
                        regencies.name AS regency_name,
                        districts.name AS district_name,
                        villages.name AS village_name,
                        courier_id
                    FROM 
                        `user_address`
                        LEFT JOIN provinces ON `user_address`.provinces_id=provinces.id
                        LEFT JOIN regencies ON `user_address`.regencies_id=regencies.id
                        LEFT JOIN districts ON `user_address`.districts_id=districts.id
                        LEFT JOIN villages ON `user_address`.villages_id=villages.id
                    WHERE 
                        user_id=?
                        AND
                        priority='1'
                        AND
                        user_address_isactive=1";
            
            $stmt = $con->prepare($sql);
            $stmt->bind_param("s", $user_id);
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