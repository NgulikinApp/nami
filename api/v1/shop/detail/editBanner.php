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
            if(checkingAuthKey($con,$user_id,$key) == 0){
                return invalidKey();
            }
            
            //if the data file is not binary string
            $shop_photo_data = $request['shop_banner'];
            if (substr($shop_photo_data,0,4) != 'data'){
                $shop_photo_data_array = explode('/',$shop_photo_data);
                $shop_banner_name = end($shop_photo_data_array);
                $shop_banner = $shop_photo_data;
            }else{
                /*
                    Function location in : /model/general/functions.php
                */
                $shop_banner_name = getID(16).'.png';
                
                list($type, $shop_photo_data) = explode(';', $shop_photo_data);
                list(, $shop_photo_data)      = explode(',', $shop_photo_data);
                $data_photo = base64_decode($shop_photo_data);
                
                $path_photo = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username.'/shop/banner';
                
                //delete all file
                $files = glob($path_photo.'/*'); // get all file names
                foreach($files as $file){ // iterate files
                  if(is_file($file))
                    unlink($file); // delete file
                }
                
                $shop_photo = $path_photo.'/'.$shop_banner_name;
                
                //write image into directory
                file_put_contents($shop_photo, $data_photo);
                
                
                //Resize image
                $imageresize = new ImageResize($shop_photo);
                $imageresize->resizeToBestFit(1056, 248);
                $imageresize->save($shop_photo);
                
                $shop_banner = IMAGES_URL.'/'.urlencode(base64_encode($username.'/shop/banner/'.$shop_banner_name));
            }
            
            $stmt = $con->prepare("UPDATE shop SET shop_banner= ? where shop_id=?");
            
            $stmt->bind_param("si", $shop_banner_name, $shop_id);
            
            $stmt->execute();
                
            $stmt->close();
            
            /*
                Function location in : functions.php
            */
            editBanner($shop_id,$shop_banner);
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