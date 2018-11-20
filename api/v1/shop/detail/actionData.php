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
            if(checkingAuthKey($con,$user_id,$key) == 0){
                return invalidKey();
            }
            
            //if the data file is not binary string
            $shop_photo_data = $request['shop_image'];
            
            if (substr($brand_photo_data,0,4) != 'data'){
                $shop_photo_data_array = explode('/',$shop_photo_data);
                $shop_photo_name = end($shop_photo_data_array);
                $shop_photo_name = base64_decode(urldecode ($shop_photo_name));
                $shop_photo_name_array = explode('/',$shop_photo_name);
                $shop_photo_name = end($shop_photo_name_array);
            }else{
                /*
                    Function location in : /model/general/functions.php
                */
                $shop_photo_name = getID(16).'.png';
                
                list($type, $shop_photo_data) = explode(';', $shop_photo_data);
                list(, $shop_photo_data)      = explode(',', $shop_photo_data);
                $data_photo = base64_decode($shop_photo_data);
                
                $path_photo = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username.'/brand';
                
                $shop_photo = $path_photo.'/'.$shop_photo_name;
                //write image into directory
                file_put_contents($shop_photo, $data_photo);
                
                //Resize image
                $imageresize = new ImageResize($shop_photo);
                $imageresize->resizeToBestFit(150, 150);
                $imageresize->save($shop_photo);
            }
            
            $stmt = $con->prepare("INSERT INTO shop(shop_name,shop_icon,shop_description) VALUES(?,?,?)");
                
            $stmt->bind_param("sss", $request['shop_name'], $shop_photo_name, $request['shop_desc']);
                
            $stmt->execute();
            
            $stmt->close();    
            /*
                Function location in : /model/general/functions.php
            */
            $shop_id = runQuery_returnId($con);
                
            $_SESSION['user']["shop_id"]=$shop_id;
        
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