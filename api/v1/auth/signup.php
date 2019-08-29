<?php
    /*
        This API used in ngulikin.com/js/module-signup.js
    */
    
    //--------------------------------------------------------------------------
	// Link to File
	//--------------------------------------------------------------------------
    include './api/model/beanoflink.php';
    include './api/model/general/get_auth.php';
	include './api/model/general/postraw.php';
    include 'functions.php';
    
    /*
        Function location in : /model/jwt.php
    */
    use \Firebase\JWT\JWT;
    
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
    $type = param($request['type']);
    $email = param($request['email']);
    
    if($token == ''){
        /*
            Function location in : /model/general/functions.php
        */
        invalidCredential();
    }else{
        try{
            //secretKey variabel got from : /model/jwt.php
            $exp = JWT::decode($token, $secretKey, array('HS256'));
            
            $data = array();
            $arrayCheck = true;
            
            /*
                * type 0 : manual register
                * type 1 : get code register
                * type 2 : check code register
                * type 3 : finishing register
            */
            
            if($type == 0){
                if($email == ""){
                    $data = "invalid";
                    $arrayCheck = false;
                }else if(check_email_address($email) == false){
                    $data = "invalid";
                    $arrayCheck = false;
                }else{
                    $stmt = $con->prepare("SELECT user_isactive FROM user WHERE email=?");
                    $stmt->bind_param("s", $email);
                    $stmt->execute();
                    $stmt->bind_result($col1);
                    
                    $stmt->fetch();
                    $user_isactive = $col1;
                    
                    /*
                        Function location in : /model/general/functions.php
                    */
                    if(count_rows($stmt)){
                        $data = "inactive";
                        $arrayCheck = false;
                    }else if(intval($user_isactive) == 1){
                        $data = "exist";
                        $arrayCheck = false;
                    }else{
                        $data = "valid";
                    }
                }
                
                if($arrayCheck){
                    $source = param($request['source']);
                    /*
                        Function location in : /model/general/functions.php
                    */
                    $user_id = getID(16);
                    
                    /*
                        Function location in : /model/general/functions.php
                    */
                    $code = generateRandomString();
                    
                    $user_photo = 'no-photo.jpg';
                    
                    $stmt = $con->prepare("INSERT INTO 
                                                    user(
                                                        user_id,
                                                        email,
                                                        source,
                                                        user_key
                                                    ) 
                                                    VALUES (?, ?, ?, ?)");
                
                    $stmt->bind_param("ssss", $user_id, $email, $source, $code);
                    
                    $stmt->execute();
                
                    $stmt->close();
                    
                    /*
                        Function location in : /model/general/functions.php
                    */
                    sendEmail("info@ngulikin.com","Ngulikin",$email,"User","Aktifasi Akun","Peringatan, jangan memberi tahu code berikut untuk menjaga kerahasiaan privasi anda.<br><br>Kode anda adalah <div style='background-color:#004E82;border-radius: 10px;width: 30px;font-weight: bold;padding:8px;color:#FFFFFF;'>".$code."</div>");
                    
                    $data = array(
            			'status' => "OK",
            			'message' => "The code sended to your email",
            			'response' => $data
            		);
                }else{
            		$data = array(
            			'status' => "NO",
            			'message' => "Invalid format",
            			'response' => $data
            		);
                }
            }else if($type == 1){
                /*
                    Function location in : /model/general/functions.php
                */
                $code = generateRandomString();
                
                $stmt = $con->prepare("UPDATE user SET user_key=? WHERE email=?");
            
                $stmt->bind_param("ss", $code, $email);
                
                $stmt->execute();
            
                $stmt->close();
                
                /*
                    Function location in : /model/general/functions.php
                */
                sendEmail("info@ngulikin.com","Ngulikin",$email,"User","Aktifasi Akun","Peringatan, jangan memberi tahu code berikut untuk menjaga kerahasiaan privasi anda.<br><br>Kode anda adalah <div style='background-color:#004E82;border-radius: 10px;width: 30px;font-weight: bold;padding:8px;color:#FFFFFF;'>".$code."</div>");
            
                $data = array(
            			'status' => "OK",
            			'message' => "The code sended to your email",
            			'response' => $data
            	);
            }else if($type == 2){
                $code = param($request['code']);
                
                $stmt = $con->prepare("SELECT 1 FROM user WHERE email=? AND user_key=?");
                $stmt->bind_param("ss", $email, $code);
                $stmt->execute();
                $stmt->store_result();
                
                /*
                    Function location in : /model/general/functions.php
                */
                $countrow = count_rows($stmt);
                if($countrow){
                    $data = array(
                			'status' => "OK",
                			'message' => "The code was verified",
                			'response' => $data
                	);
                }else{
                    $data = array(
                			'status' => "NO",
                			'message' => "The code was wrong",
                			'response' => $data
                	);
                }
            }else if($type == 3){
                $username = param($request['username']);
                $name = param($request['name']);
                $password = param($request['password']);
                $nohp = param($request['nohp']);
                
                $data = array();
                $arrayCheck = true;
                foreach ($request as $key => $value){
                     if($value == "" && $key != 'socmed' && $key != 'id_socmed' && $key != 'email'){
                        $data[$key] = "empty";
                        $arrayCheck = false;
                    }else if($key == 'username'){
                        $stmt = $con->prepare("SELECT 1 FROM user WHERE username=?");
                        $stmt->bind_param("s", $username);
                        $stmt->execute();
                        $stmt->store_result();
                        
                        if(preg_match('/^[a-z0-9]{3,100}$/i',$username) == false){
                            $data[$key] = "invalid";
                            $arrayCheck = false;
                        /*
                            Function location in : /model/general/functions.php
                        */
                        }else if(count_rows($stmt)){
                            $data[$key] = "exist";
                            $arrayCheck = false;
                        }else{
                            $data[$key] = "valid";
                        }
                    }else{
                        $data[$key] = "valid";
                    }
                }
                
                if($arrayCheck){
                    /*
                        Function location in : /v1/auth/function.php
                    */
                    $key = encrypt_hash('ngulik_'.$username.date('Y-m-d H:i:s'));
                    $user_photo = 'no-photo.jpg';
                    
                    $stmt = $con->prepare("UPDATE user SET user_key=?,username=?,fullname=?,password=?,phone=?,user_isactive=1 WHERE email=?");
            
                    $stmt->bind_param("ssssss", $key, $username, $name, $password, $nohp, $email);
                    
                    $stmt->execute();
                
                    $stmt->close();
                    
                    $stmt = $con->prepare("SELECT user_id FROM user WHERE username=?");
                    $stmt->bind_param("s", $username);
                    $stmt->execute();
                    $stmt->bind_result($col1, $col2);
                    $stmt->fetch();
                    
                    $result = array(
                                    "user_id"=>$col1,
                                    "username"=>$username,
                                    "fullname"=>$name,
                                    "email"=>$email,
                                    "nohp"=>$nohp,
                                    "dob"=>'',
                                    "gender"=>'male',
                                    "key"=>$key,
                                    "user_photo"=>INIT_URL."/img/".$user_photo,
                                    "user_seller"=>'0',
                                    "shop_id"=>0,
                                    "shop_name"=>'',
                                    "shop_icon"=>'',
                                    "shop_banner"=>'',
                                    "brand_id"=>0,
                                    "delivery_id"=>'1,2',
                                    "time_signup"=>"1 hari bergabung"
                                );
                    
                    $_SESSION['user'] = $result;
                    
                    setMemcached("m_user_".$user_id."_".$key."_0",$cache,1,3600);
                    
                    session_regenerate_id();
                    session_regenerate_id(true);
                    
                    $path = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username;
                    mkdir($path, 0700, true);
                    
                    $path = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username.'/temp';
                    mkdir($path, 0700, true);
                    
                    $path = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username.'/shop';
                    mkdir($path, 0700, true);
                    
                    $path = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username.'/shop/icon';
                    mkdir($path, 0700, true);
                    
                    $path = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username.'/shop/banner';
                    mkdir($path, 0700, true);
                    
                    $path = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username.'/product';
                    mkdir($path, 0700, true);
                    
                    $path = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username.'/brand';
                    mkdir($path, 0700, true);
                    
                    $path = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username.'/shop/notes';
                    mkdir($path, 0700, true);
                    
                    $path = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username.'/seller';
                    mkdir($path, 0700, true);
                    
                    $path = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username.'/seller/card';
                    mkdir($path, 0700, true);
                    
                    $path = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username.'/seller/selfie';
                    mkdir($path, 0700, true);
                    
                    $data = array(
            			'status' => "OK",
            			'message' => "Signup successfully",
            			'response' => $data,
            			'data'=>(object)array()
            		);
                }else{
            		$data = array(
            			'status' => "NO",
            			'message' => "Invalid format",
            			'response' => $data
            		);
                }
            }else{
                if($email == ""){
                    $data = "invalid";
                    $arrayCheck = false;
                }else if(check_email_address($email) == false){
                    $data = "invalid";
                    $arrayCheck = false;
                }else{
                    $stmt = $con->prepare("SELECT user_isactive FROM user WHERE email=? ");
                    $stmt->bind_param("s", $email);
                    $stmt->execute();
                    $stmt->bind_result($col1);
                    
                    $stmt->fetch();
                    $user_isactive = $col1;
                    
                    /*
                        Function location in : /model/general/functions.php
                    */
                    if(count_rows($stmt) && intval($user_isactive) == 0){
                        $data = "valid";
                    }else{
                        
                        $data = "exist";
                        $arrayCheck = false;
                    }
                }
                
                if($arrayCheck){
                    /*
                        Function location in : /model/general/functions.php
                    */
                    $code = generateRandomString();
                    
                    $stmt = $con->prepare("UPDATE user SET user_key=? WHERE email=?");
            
                    $stmt->bind_param("ss", $code, $email);
                    
                    $stmt->execute();
                
                    $stmt->close();
                    
                    /*
                        Function location in : /model/general/functions.php
                    */
                    sendEmail("info@ngulikin.com","Ngulikin",$email,"User","Aktifasi Akun","Peringatan, jangan memberi tahu code berikut untuk menjaga kerahasiaan privasi anda.<br><br>Kode anda adalah <div style='background-color:#004E82;border-radius: 10px;width: 30px;font-weight: bold;padding:8px;color:#FFFFFF;'>".$code."</div>");
                    
                    $data = array(
            			'status' => "OK",
            			'message' => "The code sended to your email",
            			'response' => $data
            		);
                }else{
            		$data = array(
            			'status' => "NO",
            			'message' => "Invalid format",
            			'response' => $data
            		);
                }
            }
            
            /*
                Function location in : /model/generatejson.php
            */
        	generateJSON($data);
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