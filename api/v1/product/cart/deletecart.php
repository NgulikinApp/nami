<?php
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
        Function location in : /model/general/postraw.php
    */
    $request = postraw();
    
    /*
        Parameters
    */
    $product_id = param($request['product_id']);
    
    /*
        Function location in : /model/general/get_auth.php
    */
    $token = bearer_auth();
    
    $con->begin_transaction(MYSQLI_TRANS_START_READ_WRITE);
    
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
                
                $stmt = $con->prepare("UPDATE cart SET cart_isactive=0 where product_id=? and user_id=?");
               
                $stmt->bind_param("is", $product_id,$user_id);
                
                $stmt->execute();
                
                $stmt->close();
            }
            
            if(isset($_SESSION['productcart'])){
                $productcart = $_SESSION['productcart'];
                if(in_array($product_id, array_column($productcart, 'product_id'))) {
                    $i=0;
                    foreach($productcart as $value){
                        if($value['product_id'] == $product_id){
                            unset($productcart[$i]);
                            if(count($productcart) > 0){
                                $_SESSION['productcart'] = $productcart;   
                            }else{
                                unset($_SESSION['productcart']);
                            }
                            break;
                        }
                        $i++;
                    }
                }    
            }
            
            deletecart($product_id);
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