<?php
    /*
        This API used in ngulikin.com/js/module-shop-seller.js
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
            $exp = JWT::decode($token, $secretKey, array('HS256'));
            
            if(isset($_SESSION['user'])){
                $user_id = $_SESSION['user']["user_id"];
                $key = $_SESSION['user']["key"];
                $shop_id = $_SESSION['user']["shop_id"];
                $delivery_id = $_SESSION['user']["delivery_id"];
            }else{
                $user_id = '';
                $key = '';
                $shop_id = '';
                $delivery_id = '';
            }
            
            /*
                Function location in : /model/general/functions.php
            */
            if(checkingAuthKey($con,$user_id,$key,0) == 0){
                return invalidKey();
            }
            
            $stmt = $con->query("SELECT 
                                        delivery_id,
                                        delivery_icon,
                                        delivery_ismid,
                                        delivery_name
                                    FROM 
                                        delivery");
            
            $stmtdel = $con->query(" SELECT
                                            CONCAT('Terakhir diganti tanggal ',DATE_FORMAT(shop_delivery_modifydate, '%d %M %Y'),', pukul ',DATE_FORMAT(shop_delivery_modifydate, '%H.%i')) AS modify_date
                                        FROM 
                                            shop 
                                        WHERE 
                                            shop_id=".$shop_id."");
            
            /*
                Function location in : function.php
            */
            delivery($stmt,$stmtdel,$delivery_id,$shop_id);
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