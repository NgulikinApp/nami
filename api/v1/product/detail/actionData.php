<?php
    /*
        This API used in ngulikin.com/js/module-profile.js
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
    
    use \Gumlet\ImageResize;
    use \Gumlet\ImageResizeException;
    
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
            if(checkingAuthKey($con,$user_id,$key) == 0){
                return invalidKey();
            }
            
            if($request['method'] == 'add'){
                $stmt = $con->query("INSERT INTO product(product_name,product_description,product_price,product_weight,product_stock,product_minimum,product_condition) VALUES('".$request['product_name']."','".$request['product_description']."',".$request['product_price'].",".$request['product_weight'].",".$request['product_stock'].",".$request['product_minimum'].",".$request['product_condition'].")");
            
                $product_id = runQuery_returnId($stmt);
            }else{
                $con->query("UPDATE product SET product_name='".$request['product_name']."', product_description='".$request['product_description']."', product_price=".$request['product_price'].", product_weight=".$request['product_weight'].",product_stock=".$request['product_stock'].",product_minimum=".$request['product_minimum'].",product_condition=".$request['product_condition']." WHERE product_id=".$request['product_id']."");   
            
                $product_id = $request['product_id'];
            }
        
            /*
                Function location in : functions.php
            */
            actionData($request['product_name'],$request['product_description'],$request['product_price'],$request['product_weight'],$request['product_stock'],$request['product_minimum'],$request['product_condition'],$request['product_id']);
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