<?php
    /*
        This API used in ngulikin.com/js/module-home.js
    */
    
    //--------------------------------------------------------------------------
	// Link to File
	//--------------------------------------------------------------------------
    include $_SERVER['DOCUMENT_ROOT'].'/api/model/general/get_auth.php';
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
            
            if(isset($_SESSION['user_admin'])){
                $user_id = $_SESSION['user_admin']["user_id"]; 
                $key = $_SESSION['user_admin']["key"];
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
                        provinces.`name` AS province_name,
                        regencies.`name` AS regency_name,
                        districts.`name` AS district_name,
                        villages.`name` AS village_name
                    FROM 
                        `user_address`
                        LEFT JOIN provinces ON provinces.`id`=`user_address`.provinces_id
                        LEFT JOIN regencies ON regencies.`id`=`user_address`.regencies_id
                        LEFT JOIN districts ON districts.`id`=`user_address`.districts_id
                        LEFT JOIN villages ON villages.`id`=`user_address`.villages_id
                    WHERE 
                        user_id=?
                        AND
                        user_address_isactive=1";
            
            $stmt = $con->prepare($sql);
            $stmt->bind_param("s", $user_id);
            /*
                Function location in : functions.php
            */
            listaddress($stmt);
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