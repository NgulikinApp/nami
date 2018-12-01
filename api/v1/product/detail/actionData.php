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
                $username = $_SESSION['user']["username"];
            }else{
                $user_id = '';
                $key = '';
                $username = '';
            }
            
            /*
                Function location in : /model/general/functions.php
            */
            if(checkingAuthKey($con,$user_id,$key,0) == 0){
                return invalidKey();
            }
            
            $product_photo_nameList = "";
            $product_photo_nameMain = "";
            if (isset($_SESSION['file'])){
                
                $source_dir = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username.'/temp';
                $dest_dir = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username.'/product';
                
                $sumFiles = count($_SESSION['file']);
                
                for($i=0;$i<=count($sumFiles);$i++){
                    $product_photo_name = $_SESSION['file'][$i];
                
                    $source = $source_dir.'/'.$product_photo_name;
                    $dest = $dest_dir.'/'.$product_photo_name;
                
                    rename($source,$dest);
                    
                    if($i==0){
                        $product_photo_nameList = $product_photo_name;
                        $product_photo_nameMain = $product_photo_name;
                    }else{
                        $product_photo_nameList = $product_photo_nameList.','.$product_photo_name;
                    }
                }
                
                unset($_SESSION['file']);
            }
            
            if($request['method'] == 'add'){
                $stmt = $con->query("INSERT INTO product(product_name,product_description,product_price,product_weight,product_stock,product_minimum,product_condition,product_image,category_id,subcategory_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                
                $stmt->bind_param("ssiiiiisii", $request['product_name'], $request['product_description'], $request['product_price'], $request['product_weight'], $request['product_stock'],$request['product_minimum'],$request['product_condition'],$product_photo_nameList,$request['product_category'],$request['product_subcategory']);
                
                $stmt->execute();
                
                $product_id = runQuery_returnId($stmt);
            }else{
                if($product_photo_nameList == ''){
                    $stmt = $con->prepare("UPDATE product SET product_name=?, product_description=?, product_price=?, product_weight=?,product_stock=?,product_minimum=?,product_condition=?,category_id=?,subcategory_id=? WHERE product_id=?");   
                
                    $stmt->bind_param("ssiiiiiiii", $request['product_name'], $request['product_description'], $request['product_price'], $request['product_weight'], $request['product_stock'],$request['product_minimum'],$request['product_condition'],$request['product_category'],$request['product_subcategory'],$request['product_id']);
                }else{
                    $stmt = $con->prepare("UPDATE product SET product_name=?, product_description=?, product_price=?, product_weight=?,product_stock=?,product_minimum=?,product_condition=?,product_image=?,category_id=?,subcategory_id=? WHERE product_id=?");   
                
                    $stmt->bind_param("ssiiiiisiii", $request['product_name'], $request['product_description'], $request['product_price'], $request['product_weight'], $request['product_stock'],$request['product_minimum'],$request['product_condition'],$product_photo_nameList,$request['product_category'],$request['product_subcategory'],$request['product_id']);
                }
                
                $stmt->execute();
                
                $stmt->close();
                
                $product_id = $request['product_id'];
            }
        
            /*
                Function location in : functions.php
            */
            actionData($request['product_name'],$request['product_description'],$product_photo_nameMain,$request['product_price'],$request['product_weight'],$request['product_stock'],$request['product_minimum'],$request['product_condition'],$request['product_category'],$request['product_subcategory'],$request['product_id']);
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