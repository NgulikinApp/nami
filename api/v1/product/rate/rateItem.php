<?php
    /*
        This API used in ngulikin.com/js/module-product.js
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
    $rate = param($request['rate']);
    
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
                                    1
                                    FROM 
                                        product_rate 
                                    WHERE 
                                        product_id=? AND user_id=?");
               
            $stmt->bind_param("is", $product_id,$user_id);
            $stmt->execute();
            $stmt->store_result();
            
             /*
                Function location in : /model/general/functions.php
            */
            $count_rows = count_rows($stmt);
            
            if($count_rows > 0){
                return userDone("rate");
            }
            
            $stmt = $con->prepare("INSERT INTO product_rate(product_id,user_id,product_rate_value) VALUES(?,?,?)");
            
            $stmt->bind_param("isi", $product_id,$user_id,$rate);
                
            $stmt->execute();
            
            $stmt->close();
            
            $stmt = $con->prepare("UPDATE product SET product_average_rate=(product_average_rate+?)/(product_count_rate+1),product_count_rate=product_count_rate+1 where product_id=?");
            
            $stmt->bind_param("ii", $rate,$product_id);
                
            $stmt->execute();
            
            $stmt->close();
            
            $stmt = $con->prepare("SELECT 
                                        product_average_rate
                                    FROM 
                                        product 
                                    WHERE 
                                        product_id=?");
            
            $stmt->bind_param("i", $product_id);
            /*
                Function location in : /model/general/functions.php
            */
            $count_val = calc_val($stmt);
            
            rate($product_id,$user_id,$count_val);
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