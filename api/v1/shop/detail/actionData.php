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
    
    /*
        Parameters
    */
    $shop_name = param($request['shop_name']);
    $shop_desc = param($request['shop_desc']);
    
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
            if(checkingAuthKey($con,$user_id,$key,0,$cache) == 0){
                return invalidKey();
            }
            
            $shop_photo_name = "";
            if (isset($_SESSION['file'])){
                
                $source_dir = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username.'/temp';
                $dest_dir = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username.'/shop/icon';
                $shop_photo_name = $_SESSION['file'][0];
                if($shop_id == ''){
                    $card_photo_name = $_SESSION['file'][1];
                    $selfie_photo_name = $_SESSION['file'][2];
                }
                
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
                    
                    $stmt->bind_param("sssi", $shop_name, $shop_desc, $shop_photo_name, $shop_id);
                }else{
                    $stmt = $con->prepare("UPDATE shop SET shop_name= ?,shop_description=? where shop_id=?");
                    
                    $stmt->bind_param("ssi", $shop_name, $shop_desc, $shop_id);
                }
                
                $stmt->execute();
            
                $stmt->close();
            }else{
                $account_name = param($request['account_name']);
                $account_no = param($request['account_no']);
                $bank_id = intval(param($request['bank_id']));
                
                $stmt = $con->prepare("INSERT INTO account(user_id,bank_id,account_name,account_no) VALUES(?,?,?,?)");
                
                $stmt->bind_param("siss", $user_id, $bank_id, $account_name, $account_no);
            
                $stmt->execute();
                
                $stmt->close();
                
                $status_seller = '2';
                $stmt = $con->prepare("UPDATE `user` SET photo_card=?,photo_selfie=?,user_seller=? WHERE user_id=?");
                
                $stmt->bind_param("ssss", $card_photo_name,$selfie_photo_name,$status_seller,$user_id);
            
                $stmt->execute();
                
                $stmt->close();
                
                $shop_current_brand = 0;
                $stmt = $con->prepare("INSERT INTO shop(user_id,shop_name,shop_icon,shop_description,shop_current_brand) VALUES(?,?,?,?,?)");
                
                $stmt->bind_param("ssssi", $user_id, $shop_name, $shop_photo_name, $shop_desc, $shop_current_brand);
                
                $stmt->execute();
            
                $stmt->close();
            }
            
            if($shop_id == ''){
                /*
                    Function location in : /model/general/functions.php
                */
                $shop_id = runQuery_returnId($con);
            }
        
            /*
                Function location in : functions.php
            */
            editDetail($shop_id,$shop_name,$shop_desc,$shop_photo_name,$username);
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