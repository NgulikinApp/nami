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
                
                $stmt = $con->query("SELECT 
                                            cart.product_id, 
                                            product_name,
                                            brand_name,
                                            product_image,
                                            cart_adddate,
                                            username,
                                            sum_product,
                                            shop_name,
                                            product_price
                                    FROM 
                                            product
                                            LEFT JOIN brand ON product.brand_id = brand.brand_id
                                            LEFT JOIN cart ON product.product_id = cart.product_id
                                            LEFT JOIN shop ON shop.shop_id = brand.shop_id
                                            LEFT JOIN `user` ON `user`.user_id = shop.user_id
                                    WHERE 
                                            cart.user_id = '".$user_id."'
                                            AND
                                            cart_isactive = '1'");
                /*
                    Function location in : functions.php
                */
                feed($stmt);
            }else{
                $data = @$_SESSION['productcart'];
                $i = 0;
                $list_productid = "";
                foreach($data as &$value){
                    $list_productid = ($i != 0)?','.$list_productid:'';
                    $list_productid = $list_productid.$value['product_id'];
                    $i++;
                }
                
                $list_productid = $list_productid == ""? "''":$list_productid;
                
                $stmt = $con->query("SELECT 
                                            product_id, 
                                            product_name,
                                            brand_name,
                                            product_image,
                                            username,
                                            shop_name,
                                            product_price
                                    FROM 
                                            product
                                            LEFT JOIN brand ON product.brand_id = brand.brand_id
                                            LEFT JOIN shop ON shop.shop_id = brand.shop_id
                                            LEFT JOIN `user` ON `user`.user_id = shop.user_id
                                    WHERE 
                                            product_id IN (".$list_productid.")");
                
                /*
                    Function location in : functions.php
                */
                feed($stmt); 
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