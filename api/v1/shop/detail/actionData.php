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
                $shop_id = $_SESSION['user']["shop_id"];
            }else{
                $user_id = '';
                $key = '';
                $username = '';
                $shop_id = '';
            }
            
            /*
                Function location in : /model/general/functions.php
            */
            if(checkingAuthKey($con,$user_id,$key,0) == 0){
                return invalidKey();
            }
            
            $shop_photo_name = "";
            if (isset($_SESSION['file'])){
                
                $source_dir = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username.'/temp';
                $dest_dir = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username.'/shop/icon';
                $shop_photo_name = $_SESSION['file'][0];
                
                $source = $source_dir.'/'.$shop_photo_name;
                $dest = $dest_dir.'/'.$shop_photo_name;
                
                /*
                    Function location in : /model/general/functions.php
                */
                emptyFolder($dest_dir);
                
                rename($source,$dest);
            }
            
            if($shop_id != ''){
                if ($shop_photo_name != ''){
                    $stmt = $con->prepare("UPDATE shop SET shop_name= ?,shop_description=?,shop_icon=? where shop_id=?");
                    
                    $stmt->bind_param("sssi", $request['shop_name'], $request['shop_desc'], $shop_photo_name, $shop_id);
                }else{
                    $stmt = $con->prepare("UPDATE shop SET shop_name= ?,shop_description=? where shop_id=?");
                    
                    $stmt->bind_param("sssi", $request['shop_name'], $request['shop_desc'], $shop_id);
                }   
            }else{
                $stmt = $con->prepare("INSERT INTO shop(shop_name,shop_icon,shop_description) VALUES(?,?,?)");
                
                $stmt->bind_param("sss", $request['shop_name'], $shop_photo_name, $request['shop_desc']);   
            }
                
            $stmt->execute();
            
            $stmt->close();  
            
            if($shop_id == ''){
                /*
                    Function location in : /model/general/functions.php
                */
                $shop_id = runQuery_returnId($con);
                    
                $_SESSION['user']["shop_id"]=$shop_id;
            }
        
            /*
                Function location in : functions.php
            */
            editDetail($shop_id,$request['shop_name'],$request['shop_desc'],$shop_photo_name,$username);
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