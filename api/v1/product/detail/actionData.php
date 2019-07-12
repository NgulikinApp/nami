<?php
    /*
        This API used in ngulikin.com/js/module-profile.js
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
    
    /*
        Parameters
    */
    $product_name = param($request['product_name']);
    $product_description = param($request['product_description']);
    $product_price = param($request['product_price']);
    $product_weight = param($request['product_weight']);
    $product_stock = param($request['product_stock']);
    $product_minimum = param($request['product_minimum']);
    $product_condition = param($request['product_condition']);
    $product_category = param($request['product_category']);
    $product_subcategory = param($request['product_subcategory']);
    
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
            if(checkingAuthKey($con,$user_id,$key,0,$cache) == 0){
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
                
                $stmt->bind_param("ssiiiiisii", $product_name, $product_description, $product_price, $product_weight, $product_stock,$product_minimum,$product_condition,$product_photo_nameList,$product_category,$product_subcategory);
                
                $stmt->execute();
                
                $product_id = runQuery_returnId($stmt);
            }else{
                $product_id = param($request['product_id']);
                
                if($product_photo_nameList == ''){
                    $stmt = $con->prepare("UPDATE product SET product_name=?, product_description=?, product_price=?, product_weight=?,product_stock=?,product_minimum=?,product_condition=?,category_id=?,subcategory_id=?,product_modifydate=NOW() WHERE product_id=?");   
                
                    $stmt->bind_param("ssiiiiiiii", $product_name, $product_description, $product_price, $product_weight, $product_stock,$product_minimum,$product_condition,$product_category,$product_subcategory,$product_id);
                }else{
                    $stmt = $con->prepare("UPDATE product SET product_name=?, product_description=?, product_price=?, product_weight=?,product_stock=?,product_minimum=?,product_condition=?,product_image=?,category_id=?,subcategory_id=?,product_modifydate=NOW() WHERE product_id=?");   
                
                    $stmt->bind_param("ssiiiiisiii", $product_name, $product_description, $product_price, $product_weight, $product_stock,$product_minimum,$product_condition,$product_photo_nameList,$product_category,$product_subcategory,$product_id);
                }
                
                $stmt->execute();
                
                $stmt->close();
                
                $product_id = $request['product_id'];
            }
        
            /*
                Function location in : functions.php
            */
            actionData($product_name,$product_description,$product_photo_nameMain,$product_price,$product_weight,$product_stock,$product_minimum,$product_condition,$product_category,$product_subcategory,$product_id);
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