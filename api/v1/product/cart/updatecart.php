<?php
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
        Function location in : /model/general/postraw.php
    */
    $request = postraw();
    
    /*
        Parameters
    */
    $product_id = param($request['product_id']);
    $cart_sumproduct = param($request['cart_sumproduct']);
    
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
                
                $stmt = $con->prepare("UPDATE cart SET cart_sumproduct=? where user_id=? and product_id=? and cart_isactive='1'");
                   
                $stmt->bind_param("isi", $cart_sumproduct,$user_id,$product_id);
                    
                $stmt->execute();
                
                $stmt->close();
            }else{
                $productcart = $_SESSION['productcart'];
                
                $i=0;
                foreach($productcart as $value){
                    if($value['product_id'] == $product_id){
                        $productcart[$i]['sum'] = $cart_sumproduct;
                        $_SESSION['productcart'] = $data;
                        break;
                    }
                    $i++;
                }
            }
            
            /*
                Function location in : functions.php
            */
            updatecart($product_id,$cart_sumproduct);
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