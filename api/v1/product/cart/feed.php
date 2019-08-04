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
                                            GROUP_CONCAT(cart.product_id separator '~') AS product_id, 
                                            GROUP_CONCAT(product_name separator '~') AS product_name,
                                            GROUP_CONCAT(brand_name separator '~') AS brand_name,
                                            GROUP_CONCAT(SUBSTRING_INDEX(product_image,',',1) separator '~') AS product_images,
                                            username,
                                            shop_name,
                                            GROUP_CONCAT(product_price separator '~') AS product_price,
                                            shop_delivery,
                                            shop.shop_id,
                                            GROUP_CONCAT(cart_sumproduct separator '~') AS cart_sumproduct,
                                            GROUP_CONCAT(cart_adddate separator '~') AS cart_adddate,
                                            shop_courier_id,
                                            GROUP_CONCAT(product_weight separator '~') AS product_weight,
                                            GROUP_CONCAT(product_stock separator '~') AS product_stock
                                    FROM 
                                            cart
                                            LEFT JOIN product ON product.product_id = cart.product_id
                                            LEFT JOIN brand ON product.brand_id = brand.brand_id
                                            LEFT JOIN shop ON shop.shop_id = brand.shop_id
                                            LEFT JOIN `user` ON `user`.user_id = shop.user_id
                                    WHERE 
                                            cart.user_id = ?
                                            AND
                                            cart_isactive = '1'
                                    GROUP BY 
                                            shop.shop_id
                                    ORDER BY 
                                            shop.shop_id");
                
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
                foreach($data as $value){
                    $list_productid = ($i != 0)?$list_productid.',':'';
                    $list_productid = $list_productid.$value['product_id'];
                    $i++;
                }
                $list_productid = $list_productid == ""? "''":$list_productid;
                
                $stmt = $con->query("SELECT 
                                            GROUP_CONCAT(product_id separator '~') AS product_id, 
                                            GROUP_CONCAT(product_name separator '~') AS product_name,
                                            GROUP_CONCAT(brand_name separator '~') AS brand_name,
                                            GROUP_CONCAT(SUBSTRING_INDEX(product_image,',',1) separator '~') AS product_images,
                                            username,
                                            shop_name,
                                            GROUP_CONCAT(product_price separator '~') AS product_price,
                                            shop_delivery,
                                            shop.shop_id,
                                            shop_courier_id,
                                            GROUP_CONCAT(product_weight  separator '~') AS product_weight,
                                            GROUP_CONCAT(product_stock separator '~') AS product_stock
                                    FROM 
                                            product
                                            LEFT JOIN brand ON product.brand_id = brand.brand_id
                                            LEFT JOIN shop ON shop.shop_id = brand.shop_id
                                            LEFT JOIN `user` ON `user`.user_id = shop.user_id
                                    WHERE 
                                            product_id IN (".$list_productid.")
                                    GROUP BY 
                                            shop.shop_id
                                    ORDER BY 
                                            shop.shop_id");
                
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