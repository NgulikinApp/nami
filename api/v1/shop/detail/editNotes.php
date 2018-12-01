<?php
    /*
        This API used in ngulikin.com/js/module-shop-seller.js
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
            $exp = JWT::decode($token, $secretKey, array('HS256'));
            
            if(isset($_SESSION['user'])){
                $user_id = $_SESSION['user']["user_id"];
                $key = $_SESSION['user']["key"];
                $shop_id = $_SESSION['user']["shop_id"];
                $username = $_SESSION['user']["username"];
            }else{
                $user_id = '';
                $key = '';
                $shop_id = '';
                $username = '';
            }
            
            /*
                Function location in : /model/general/functions.php
            */
            if(checkingAuthKey($con,$user_id,$key,0) == 0){
                return invalidKey();
            }
            
            $notes_photo_nameList = "";
            if (isset($_SESSION['file'])){
                
                $source_dir = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username.'/temp';
                $dest_dir = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username.'/shop/notes';
                
                $sumFiles = count($_SESSION['file']);
                
                for($i=0;$i<=count($sumFiles);$i++){
                    $notes_photo_name = $_SESSION['file'][$i];
                
                    $source = $source_dir.'/'.$notes_photo_name;
                    $dest = $dest_dir.'/'.$notes_photo_name;
                
                    rename($source,$dest);
                    
                    if($i==0){
                        $notes_photo_nameList = $notes_photo_name;
                    }else{
                        $notes_photo_nameList = $notes_photo_nameList.','.$notes_photo_name;
                    }
                }
                
                unset($_SESSION['file']);
            }
            
            if($notes_photo_nameList != ''){
                $stmt = $con->prepare("UPDATE shop SET shop_op_from= ?,shop_op_to=?,shop_sunday=?,shop_monday=?,shop_tuesday=?,shop_wednesday=?,shop_thursday=?,shop_friday=?,shop_saturday=?,shop_desc=?,shop_close=?,shop_open=?,shop_closing_notes=?,shop_location=?,shop_image_location=? where shop_id=?");
            
                $stmt->bind_param("iiiiiiiiissssssi", $request['shop_op_from'], $request['shop_op_to'], $request['shop_sunday'], $request['shop_monday'], $request['shop_tuesday'], $request['shop_wednesday'], $request['shop_thursday'], $request['shop_friday'], $request['shop_saturday'], $request['shop_desc'], $request['shop_close'], $request['shop_open'], $request['shop_closing_notes'], $request['shop_location'],$notes_photo_nameList, $shop_id);   
            }else{
                $stmt = $con->prepare("UPDATE shop SET shop_op_from= ?,shop_op_to=?,shop_sunday=?,shop_monday=?,shop_tuesday=?,shop_wednesday=?,shop_thursday=?,shop_friday=?,shop_saturday=?,shop_desc=?,shop_close=?,shop_open=?,shop_closing_notes=?,shop_location=? where shop_id=?");
            
                $stmt->bind_param("iiiiiiiiisssssi", $request['shop_op_from'], $request['shop_op_to'], $request['shop_sunday'], $request['shop_monday'], $request['shop_tuesday'], $request['shop_wednesday'], $request['shop_thursday'], $request['shop_friday'], $request['shop_saturday'], $request['shop_desc'], $request['shop_close'], $request['shop_open'], $request['shop_closing_notes'], $request['shop_location'], $shop_id);
            }
            
            $stmt->execute();
                
            $stmt->close();
            
            /*
                Function location in : functions.php
            */
            editNotes($shop_id,$username,$request['shop_op_from'],$request['shop_op_to'],$request['shop_sunday'],$request['shop_monday'],$request['shop_tuesday'],$request['shop_wednesday'],$request['shop_thursday'], $request['shop_friday'], $request['shop_saturday'], $request['shop_desc'], $request['shop_close'], $request['shop_open'], $request['shop_closing_notes'], $request['shop_location']);
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