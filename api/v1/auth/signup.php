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
    $username = param($request['username']);
    $socmed = param($request['socmed']);
    $name = param($request['name']);
    $password = param($request['password']);
    $email = param($request['email']);
    $nohp = param($request['nohp']);
    $dob = param($request['dob']);
    $gender = param($request['gender']);
    $source = param($request['source']);
    $id_socmed = param($request['id_socmed']);
    
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
            
            $data = array();
            $arrayCheck = true;
            foreach ($request as $key => $value){
                if($value == "" && $key != 'manual' && $key != 'id_socmed'){
                    $data[$key] = "empty";
                    $arrayCheck = false;
                }else if($key == 'username'){
                    $stmt = $con->prepare("SELECT 1 FROM user WHERE username=?");
                    $stmt->bind_param("s", $value);
                    $stmt->execute();
                    $stmt->store_result();
                    
                    if(strlen($value) <= 3){
                        $data[$key] = "invalid";
                        $arrayCheck = false;
                    /*
                        Function location in : /model/general/functions.php
                    */
                    }else if(count_rows($stmt) > 0){
                        $data[$key] = "exist";
                        $arrayCheck = false;
                    }else{
                        $data[$key] = "valid";
                    }
                }else if($key == 'email'){
                    $stmt = $con->prepare("SELECT 1 FROM user WHERE email=?");
                    $stmt->bind_param("s", $value);
                    $stmt->execute();
                    $stmt->store_result();
                    
                    /*
                        Function location in : /model/general/functions.php
                    */
                    if(check_email_address($value) == false){
                        $data[$key] = "invalid";
                        $arrayCheck = false;
                    /*
                        Function location in : /model/general/functions.php
                    */
                    }else if(count_rows($stmt) > 0){
                        $data[$key] = "exist";
                        $arrayCheck = false;
                    }else{
                        $data[$key] = "valid";
                    }
                }else if($key == 'dob' && checkdate(explode("-", $value)[1], explode("-", $value)[2], explode("-", $value)[0]) == false){
                    $data[$key] = "invalid";
                    $arrayCheck = false;
                }else{
                    $data[$key] = "valid";
                }
            }
            
            if($arrayCheck){
                /*
                    Function location in : /v1/auth/function.php
                */
                $key = encrypt_hash('ngulik_'.$username.date('Y-m-d H:i:s'));
                /*
                    Function location in : /model/general/functions.php
                */
                $user_id = getID(16);
                $ismanual = intval($request['manual']);
                
                $passwordSocmed = '';
                $user_isactive = 0;
                if($socmed == 'facebook'){
                    $user_isactive = 1;
                    $passwordSocmed = encrypt_hash('Facebook_Ngulikin');
                }else if($socmed == 'googleplus'){
                    $user_isactive = 1;
                    $passwordSocmed = encrypt_hash('GooglePlus_Ngulikin');
                }
                $user_photo = 'no-photo.jpg';
                
                if($source != "web"){
                    $stmt = $con->prepare("INSERT INTO 
                                                    user(
                                                        user_id,
                                                        username,
                                                        fullname,
                                                        password,
                                                        email,
                                                        phone,
                                                        dob,
                                                        gender,
                                                        user_key,
                                                        source,
                                                        password_".$socmed.",
                                                        user_isactive,
                                                        id_".$socmed.",
                                                        user_photo
                                                    ) 
                                                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                
                    $stmt->bind_param("ssssssssssssss", $user_id, $username, $name, $password, $email, $nohp, $dob, $gender, $key, $source, $passwordSocmed, $user_isactive,$id_socmed,$user_photo);
                }else{
                    $stmt = $con->prepare("INSERT INTO 
                                                    user(
                                                        user_id,
                                                        username,
                                                        fullname,
                                                        password,
                                                        email,
                                                        phone,
                                                        dob,
                                                        gender,
                                                        user_key,
                                                        source,
                                                        user_isactive,
                                                        user_photo
                                                    ) 
                                                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                
                    $stmt->bind_param("ssssssssssss", $user_id, $username, $name, $password, $email, $nohp, $dob, $gender, $key, $source, $user_isactive,$user_photo);
                }

                $stmt->execute();
                
                $stmt->close();
                
                $param = base64_encode($user_id.'~'.$key);
                
                if($user_isactive == 0){
                    /*
                        Function location in : /model/general/functions.php
                    */
                    sendEmail("info@ngulikin.com","Ngulikin",$email,$name,"Aktifasi Akun","Klik tombol aktif dibawah ini, untuk mengaktifkan akun anda.<br><br><a href='".INIT_URL."/v1/activeAccount?q=".$param."'><div style='background-color:#004E82;border-radius: 10px;width: 30px;font-weight: bold;padding:8px;color:#FFFFFF;'>Aktif</div></a>");
                }else{
                    sessionCart($user_id,$con);
                
                    $result = array(
                                    "user_id"=>$user_id,
                                    "username"=>$username,
                                    "fullname"=>$name,
                                    "email"=>$email,
                                    "nohp"=>$nohp,
                                    "dob"=>$dob,
                                    "gender"=>$gender,
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
                }
                
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