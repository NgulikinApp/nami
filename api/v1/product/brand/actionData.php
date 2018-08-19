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
            if(checkingAuthKey($con,$user_id,$key) == 0){
                return invalidKey();
            }
            
            //if the data file is not binary string
            $brand_photo_data = $request['brand_image'];
            
            if (substr($brand_photo_data,0,4) != 'data'){
                $brand_photo_data_array = explode('/',$brand_photo_data);
                $brand_photo_name = end($brand_photo_data_array);
                $brand_photo_name = base64_decode(urldecode ($brand_photo_name));
                $brand_photo_name_array = explode('/',$brand_photo_name);
                $brand_photo_name = end($brand_photo_name_array);
            }else{
                /*
                    Function location in : /model/general/functions.php
                */
                $brand_photo_name = getID(16).'.png';
                
                list($type, $brand_photo_data) = explode(';', $brand_photo_data);
                list(, $brand_photo_data)      = explode(',', $brand_photo_data);
                $data_photo = base64_decode($brand_photo_data);
                
                $path_photo = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username.'/brand';
                
                $brand_photo = $path_photo.'/'.$brand_photo_name;
                //write image into directory
                file_put_contents($brand_photo, $data_photo);
                
                //Resize image
                $imageresize = new ImageResize($brand_photo);
                $imageresize->resizeToBestFit(150, 150);
                $imageresize->save($brand_photo);
            }
            
            if($request['method'] == 'add'){
                $stmt = $con->prepare("INSERT INTO brand(brand_name,brand_image,shop_id) VALUES(?,?,?)");
                
                $stmt->bind_param("ssi", $request['brand_name'], $brand_photo_name, $shop_id);
                
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
                
                $stmt->bind_param("ssi", $request['brand_name'], $brand_photo_name,$brand_id);
                
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