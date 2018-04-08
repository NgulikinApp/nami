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
            
            $stmt = $con->prepare("UPDATE user SET fullname=?, dob=?, gender=?, phone=?,user_photo=? WHERE user_id=?");
            
            //if the data file is not binary string
            $user_photo_data = $request['user_photo'];
            
            if (substr($user_photo_data,0,4) != 'data'){
                $user_photo_data_array = explode('/',$user_photo_data);
                $user_photo_name = end($user_photo_data_array);
                if($user_photo_name == 'no-photo.jpg'){
                    $user_photo = "http://".INIT_URL."/img/".$user_photo_name;
                }else{
                    $user_photo = $shop_photo_data; 
                }
            }else{
                /*
                    Function location in : /model/general/functions.php
                */
                $user_photo_name = getID(16).'.png';
                
                list($type, $user_photo_data) = explode(';', $user_photo_data);
                list(, $user_photo_data)      = explode(',', $user_photo_data);
                $data_photo = base64_decode($user_photo_data);
                
                $path_photo = dirname($_SERVER["DOCUMENT_ROOT"]).'/'.IMAGES_URL.'/'.$username;
                
                //delete all file
                $files = glob($path_photo.'/*'); // get all file names
                foreach($files as $file){ // iterate files
                  if(is_file($file))
                    unlink($file); // delete file
                }
                
                $user_photo = $path_photo.'/'.$user_photo_name;
                
                //write image into directory
                file_put_contents($user_photo, $data_photo);
                
                
                //Resize image
                $imageresize = new ImageResize($user_photo);
                $imageresize->resizeToBestFit(150, 150);
                $imageresize->save($user_photo);
                
                $user_photo = str_replace(dirname($_SERVER["DOCUMENT_ROOT"]),"http:/",$user_photo);
            }
               
            $stmt->bind_param("ssssss", $request['fullname'],$request['dob'],$request['gender'],$request['phone'],$user_photo_name,$user_id);
            
            /*
                Function location in : /model/general/functions.php
            */
            runQuery($stmt);
            
            /*
                Function location in : functions.php
            */
            updateUser($user_id,$con);
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