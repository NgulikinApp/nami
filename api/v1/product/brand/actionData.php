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
    $brand_name = param($request['brand_name']);
    
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
                $shop_id = $_SESSION['user']["shop_id"];
                $brand_id = $_SESSION['user']["brand_id"];
                $username = $_SESSION['user']["username"];
            }else{
                $user_id = '';
                $key = '';
                $shop_id = '';
                $brand_id = '';
                $username = '';
            }
            
            /*
                Function location in : /model/general/functions.php
            */
            if(checkingAuthKey($con,$user_id,$key,0,$cache) == 0){
                return invalidKey();
            }
            
            $brand_photo_name = "";
            if (isset($_SESSION['file'])){
                
                $source_dir = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username.'/temp';
                $dest_dir = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username.'/brand';
                $brand_photo_name = $_SESSION['file'][0];
                
                $source = $source_dir.'/'.$brand_photo_name;
                $dest = $dest_dir.'/'.$brand_photo_name;
                
                rename($source,$dest);
                unset($_SESSION['file']);
            }
            
            if($request['method'] == 'add'){
                $stmt = $con->prepare("INSERT INTO brand(brand_name,brand_image,shop_id) VALUES(?,?,?)");
                
                $stmt->bind_param("ssi", $brand_name, $brand_photo_name, $shop_id);
                
                $stmt->execute();
                
                /*
                    Function location in : /model/general/functions.php
                */
                $brand_id = runQuery_returnId($con);
                
                $stmt = $con->prepare("UPDATE 
                                        shop 
                                    SET 
                                        shop_current_brand=?,
                                        shop_current_brand_modifydate=NOW() 
                                    WHERE 
                                        shop_id=?");
                $stmt->bind_param("ii", $brand_id, $shop_id);
                
                $stmt->execute();
                
                $stmt->close();
                
                $_SESSION['user']["brand_id"]=$brand_id;
            }else{
                $stmt = $con->prepare("UPDATE brand SET brand_name=?, brand_image=? WHERE brand_id=?");
                
                $stmt->bind_param("ssi", $brand_name, $brand_photo_name,$brand_id);
                
                $stmt->execute();
                
                $stmt->close();
            }
        
            /*
                Function location in : functions.php
            */
            actionData($brand_id,$con);
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