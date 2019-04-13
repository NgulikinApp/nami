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
    $brand_id = param($request['brand_id']);
    
    $con->begin_transaction(MYSQLI_TRANS_START_READ_WRITE);
    
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
                $username = $_SESSION['user']["username"];
            }else{
                $user_id = '';
                $key = '';
                $shop_id = '';
                $username = '';
            }
            
            /*
                Function location in : /model/general/functions.php
            */
            if(checkingAuthKey($con,$user_id,$key,0,$cache) == 0){
                return invalidKey();
            }
            
            $stmt = $con->prepare("UPDATE 
                                        shop 
                                    SET 
                                        shop_current_brand=?,
                                        shop_current_brand_modifydate=NOW() 
                                    WHERE 
                                        shop_id=?");
            
            $stmt->bind_param("ii", $brand_id, $shop_id);
            
            $stmt->execute();
            
            $stmt->close();
            
            $stmt = $con->prepare("SELECT
                                        shop_current_brand,
                                        CONCAT('Terakhir diganti tanggal ',DATE_FORMAT(shop_current_brand_modifydate, '%d %M %Y'),', pukul ',DATE_FORMAT(shop_current_brand_modifydate, '%H.%i')) AS modify_date,
                                        brand_image,
                                        brand_name,
                                        brand_product_count
                                    FROM 
                                        shop
                                        LEFT JOIN brand ON brand.brand_id=shop.shop_current_brand 
                                    WHERE 
                                        shop.shop_id=".$shop_id."");
            
            $stmt->bind_param("i", $shop_id);
            /*
                Function location in : functions.php
            */
            selectBrand($stmt,$username);
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