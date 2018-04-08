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
    
    //Parameters
    $linkArray = explode('/',$actual_link);
    $id = intval(array_values(array_slice($linkArray, -1))[0]);
    $page = $_GET['page'];
    $pagesize = $_GET['pagesize'];
    
    /*
        Function location in : /model/general/get_auth.php
    */
    $token = bearer_auth();
    
    if($token == ''){
        /*
            Function location in : /model/general/functions.php
        */
        invalidCredential();
    }else{
        try{
            $exp = JWT::decode($token, $secretKey, array('HS256'));
            
            if($id == "product"){
                if(isset($_SESSION['user'])){
                    $id = $_SESSION['user']["shop_id"];
                }else{
                    $id = '';
                }
            }
            
            $stmt = $con->prepare("SELECT 
                                        product.product_id,
                                        product_name,
                                        product_image,
                                        username,
                                        shop_total_product,
                                        product_price
                                    FROM 
                                        shop
                                        LEFT JOIN `user` ON `user`.user_id = shop.user_id
                                        LEFT JOIN brand ON brand.shop_id = shop.shop_id
                                        LEFT JOIN product ON brand.brand_id = product.brand_id
                                    WHERE
                                        shop.shop_id = ?
                                    ORDER BY 
                                        product_id DESC
                                    LIMIT ?,?");
            
            $stmt->bind_param("iii", $id,$page,$pagesize);
            
            /*
                Function location in : function.php
            */
            product($stmt,$pagesize);
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