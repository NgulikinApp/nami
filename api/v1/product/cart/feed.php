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
        Function location in : /model/general/get_auth.php
    */
    $token = bearer_auth();
    
    /*
        Function location in : /model/connection.php
    */
    $con = conn();
    
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
                
                $stmt = $con->prepare("SELECT 
                                            cart.product_id, 
                                            product_name,
                                            brand_name,
                                            product_image,
                                            username,
                                            shop_name,
                                            product_price,
                                            shop_delivery,
                                            shop.shop_id,
                                            cart_sumproduct AS sum_product,
                                            cart_adddate
                                    FROM 
                                            cart
                                            LEFT JOIN product ON product.product_id = cart.product_id
                                            LEFT JOIN brand ON product.brand_id = brand.brand_id
                                            LEFT JOIN shop ON shop.shop_id = brand.shop_id
                                            LEFT JOIN `user` ON `user`.user_id = shop.user_id
                                    WHERE 
                                            cart.user_id = ?
                                            AND
                                            cart_isactive = '1'");
                
                $stmt->bind_param("s", $user_id);
                /*
                    Function location in : functions.php
                */
                feed($stmt,$con);
            }else{
                if(isset($_SESSION['productcart'])){
                    $data = @$_SESSION['productcart'];
                }else{
                    $data = array();
                }
                
                $i = 0;
                $list_productid = "";
                foreach($data as &$value){
                    $list_productid = ($i != 0)?','.$list_productid:'';
                    $list_productid = $list_productid.$value['product_id'];
                    $i++;
                }
                
                $list_productid = $list_productid == ""? "''":$list_productid;
                
                $stmt = $con->prepare("SELECT 
                                            product_id, 
                                            product_name,
                                            brand_name,
                                            product_image,
                                            username,
                                            shop_name,
                                            product_price,
                                            shop_delivery,
                                            shop.shop_id
                                    FROM 
                                            product
                                            LEFT JOIN brand ON product.brand_id = brand.brand_id
                                            LEFT JOIN shop ON shop.shop_id = brand.shop_id
                                            LEFT JOIN `user` ON `user`.user_id = shop.user_id
                                    WHERE 
                                            product_id IN (?)");
                
                $stmt->bind_param("s", $list_productid);
                /*
                    Function location in : functions.php
                */
                feed($stmt,$con); 
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