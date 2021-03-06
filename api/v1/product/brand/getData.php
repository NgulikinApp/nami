<?php
    /*
        This API used in ngulikin.com/js/module-product.js
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
                $brand_id = $_SESSION['user']["brand_id"];
            }else{
                $user_id = '';
                $brand_id = '';
            }
            
            $stmt = $con->prepare("
                                    SELECT 
                                            brand_name,
                                            brand_image,
                                            brand_product_count,
                                            CONCAT('Dibuat tanggal ',DATE_FORMAT(brand_createdate, '%d %M %Y'),', pukul ',DATE_FORMAT(brand_createdate, '%H.%i')) AS brand_createdate,
                                            username,
                                            shop_banner
                                        FROM 
                                            brand
                                            LEFT JOIN shop ON shop.shop_id=brand.shop_id
                                            LEFT JOIN `user` ON user.user_id=shop.user_id
                                        WHERE
                                            brand_id=?");
            $stmt->bind_param("i", $brand_id);
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