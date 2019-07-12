<?php
    /*
        This API used in ngulikin.com/js/module-product.js, module-home.js
    */
    
    //--------------------------------------------------------------------------
	// Link to File
	//--------------------------------------------------------------------------
	include './api/model/general/get_auth.php';
	include './api/model/general/postraw.php';
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
    
    /*
        Function location in : /model/general/postraw.php
    */
    $request = postraw();
    
    /*
        Parameters
    */
    $product_id = param($request['product_id']);
    
    $con->begin_transaction(MYSQLI_TRANS_START_READ_WRITE);
    
    if($token == ''){
        /*
            Function location in : /model/general/functions.php
        */
        invalidCredential();
    }else{
        try{
            //secretKey variabel got from : /model/jwt.php
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
            
            $stmt = $con->prepare("SELECT 
                                        COUNT(product_favorite_id) as count_favorite
                                    FROM 
                                        product_favorite 
                                    WHERE 
                                        product_id=? AND user_id=?");
            
            $stmt->bind_param("is", $product_id,$user_id);
            $stmt->execute();
            
            $stmt->bind_result($col1);
            
            $stmt->fetch();
            
            $count_product = $col1;
            
            $stmt->close();
            if(intval($count_product) > 0){
                $stmt = $con->prepare("DELETE FROM product_favorite WHERE product_id = ? AND user_id = ?");
                
                $stmt->bind_param("is", $product_id, $user_id);
                
                $stmt->execute();
                
                $stmt->close();
                
                $stmt = $con->prepare("UPDATE product SET product_count_favorite=product_count_favorite-1 WHERE product_id=?");
                
                $stmt->bind_param("i", $product_id);
                
                $stmt->execute();
                
                $stmt->close();
                
                $stmt = $con->prepare("UPDATE user SET user_product_favorites=user_product_favorites-1 WHERE user_id=?");
                
                $stmt->bind_param("s", $user_id);
                
                $stmt->execute();
                
                $stmt->close();
                
                $stmt = $con->prepare("SELECT 
                                            count(1) AS product_count
                                        FROM 
                                            product_favorite 
                                        WHERE 
                                            product_id=?");
                
                $stmt->bind_param("i", $product_id);
                /*
                    Function location in : /model/general/functions.php
                */
                $count_val = calc_val($stmt);
                
                favorite($product_id,$user_id,$count_val,0);
            }else{
                $stmt = $con->prepare("INSERT INTO product_favorite(product_id,user_id) VALUES(?,?)");
                
                $stmt->bind_param("is", $product_id,$user_id);
                
                $stmt->execute();
                
                $stmt->close();
                
                $stmt = $con->prepare("UPDATE product SET product_count_favorite=product_count_favorite+1 where product_id=?");
                
                $stmt->bind_param("i", $product_id);
                
                $stmt->execute();
                
                $stmt->close();
                
                $stmt = $con->prepare("UPDATE user SET user_product_favorites=user_product_favorites+1 where user_id=?");
                
                $stmt->bind_param("s", $user_id);
                
                $stmt->execute();
                
                $stmt->close();
                
                $stmt = $con->prepare("SELECT 
                                            count(1) AS product_count
                                        FROM 
                                            product_favorite 
                                        WHERE 
                                            product_id=?");
                                            
                $stmt->bind_param("i", $product_id);
                
                /*
                    Function location in : /model/general/functions.php
                */
                $count_val = calc_val($stmt);
                
                favorite($product_id,$user_id,$count_val,1);
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