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
    
    //Parameters
    $linkArray = explode('/',$actual_link);
    $shop_id = intval(array_values(array_slice($linkArray, -1))[0]);
    
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
            if(checkingAuthKey($con,$user_id,$key) == 0){
                return invalidKey();
            }
            
            //if the data file is not binary string
            $shop_photo_data = $request['shop_icon'];
            if (substr($shop_photo_data,0,4) != 'data'){
                $shop_photo_data_array = explode('/',$shop_photo_data);
                $shop_photo_name = end($shop_photo_data_array);
                $shop_photo = $shop_photo_data;
            }else{
                /*
                    Function location in : /model/general/functions.php
                */
                $shop_photo_name = getID(16).'.png';
                
                list($type, $shop_photo_data) = explode(';', $shop_photo_data);
                list(, $shop_photo_data)      = explode(',', $shop_photo_data);
                $data_photo = base64_decode($shop_photo_data);
                
                $path_photo = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username.'/shop/icon';
                
                //delete all file
                $files = glob($path_photo.'/*'); // get all file names
                foreach($files as $file){ // iterate files
                  if(is_file($file))
                    unlink($file); // delete file
                }
                
                $shop_photo = $path_photo.'/'.$shop_photo_name;
                
                //write image into directory
                file_put_contents($shop_photo, $data_photo);
                
                
                //Resize image
                $imageresize = new ImageResize($shop_photo);
                $imageresize->resizeToBestFit(150, 150);
                $imageresize->save($shop_photo);
            }
            
            $con->query("UPDATE shop SET shop_name='".$request['shop_name']."'shop_description='".$request['shop_desc']."',shop_icon='".$shop_photo_name."' where shop_id=".$shop_id."");
            
            /*
                Function location in : functions.php
            */
            editDetail($shop_id,$request['shop_name'],$request['shop_desc'],$shop_photo);
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