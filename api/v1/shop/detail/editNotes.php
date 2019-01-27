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
    
    /*
        Parameters
    */
    $shop_open = param($request['shop_open']);
    $shop_close = param($request['shop_close']);
    $shop_op_from = param($request['shop_op_from']);
    $shop_op_to = param($request['shop_op_to']);
    $shop_sunday = param($request['shop_sunday']);
    $shop_monday = param($request['shop_monday']);
    $shop_tuesday = param($request['shop_tuesday']);
    $shop_wednesday = param($request['shop_wednesday']);
    $shop_thursday = param($request['shop_thursday']);
    $shop_friday = param($request['shop_friday']);
    $shop_saturday = param($request['shop_saturday']);
    $shop_desc = param($request['shop_desc']);
    $shop_closing_notes = param($request['shop_closing_notes']);
    $shop_location = param($request['shop_location']);
    
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
            if(checkingAuthKey($con,$user_id,$key,0,$cache) == 0){
                return invalidKey();
            }else if(!is_numeric($shop_op_from) || !is_numeric($shop_op_to) || intval($shop_op_from) > intval($shop_op_to)){
                $response = array();
                $data = array(
        			'status' => "NO",
        			'message' => "Operational hours is not valid",
        			'response' => $response
        		);
                return generateJSON($data);
            }else if(date("Y-m-d", strtotime($shop_close)) > date("Y-m-d", strtotime($shop_open))){
                $response = array();
                $data = array(
        			'status' => "NO",
        			'message' => "Operational dates is not valid",
        			'response' => $response
        		);
                return generateJSON($data);
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
                $stmt = $con->prepare("UPDATE shop SET shop_op_from= ?,shop_op_to=?,shop_sunday=?,shop_monday=?,shop_tuesday=?,shop_wednesday=?,shop_thursday=?,shop_friday=?,shop_saturday=?,shop_description=?,shop_close=?,shop_open=?,shop_closing_notes=?,shop_location=?,shop_image_location=? where shop_id=?");
            
                $stmt->bind_param("iiiiiiiiissssssi", $shop_op_from, $shop_op_to, $shop_sunday, $shop_monday, $shop_tuesday, $shop_wednesday, $shop_thursday, $shop_friday, $shop_saturday, $shop_desc, $shop_close, $shop_open, $shop_closing_notes, $shop_location,$notes_photo_nameList, $shop_id);   
            }else{
                $stmt = $con->prepare("UPDATE shop SET shop_op_from= ?,shop_op_to=?,shop_sunday=?,shop_monday=?,shop_tuesday=?,shop_wednesday=?,shop_thursday=?,shop_friday=?,shop_saturday=?,shop_description=?,shop_close=?,shop_open=?,shop_closing_notes=?,shop_location=? where shop_id=?");
            
                $stmt->bind_param("iiiiiiiiisssssi", $shop_op_from, $shop_op_to, $shop_sunday, $shop_monday, $shop_tuesday, $shop_wednesday, $shop_thursday, $shop_friday, $shop_saturday, $shop_desc, $shop_close, $shop_open, $shop_closing_notes, $shop_location, $shop_id);
            }
            
            $stmt->execute();
                
            $stmt->close();
            
            /*
                Function location in : functions.php
            */
            editNotes($shop_id,$username,$shop_op_from,$shop_op_to,$shop_sunday,$shop_monday,$shop_tuesday,$shop_wednesday,$shop_thursday, $shop_friday, $shop_saturday, $shop_desc, $shop_close, $shop_open, $shop_closing_notes, $shop_location);
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