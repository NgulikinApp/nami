<?php
    /*
        This API used in ngulikin.com/js/module-shop-seller.js
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
            if(checkingAuthKey($con,$user_id,$key,0,$cache) == 0){
                return invalidKey();
            }
            
            $i=1;
            $stmt = $con->prepare("SELECT 
                                        delivery_id,
                                        delivery_icon,
                                        delivery_ismid,
                                        delivery_name
                                    FROM 
                                        delivery
                                    WHERE
                                        1=?");
            $stmt->bind_param("i", $i);
            
            $stmtdel = $con->prepare(" SELECT
                                            CONCAT('Terakhir diganti tanggal ',DATE_FORMAT(shop_delivery_modifydate, '%d %M %Y'),', pukul ',DATE_FORMAT(shop_delivery_modifydate, '%H.%i')) AS modify_date
                                        FROM 
                                            shop 
                                        WHERE 
                                            shop_id=?");
            $stmtdel->bind_param("i", $shop_id);
            
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