<?php
    /*
        This API used in ngulikin.com/js/module-general.js
    */
    
    //--------------------------------------------------------------------------
	// Link to File
	//--------------------------------------------------------------------------
	include $_SERVER['DOCUMENT_ROOT'].'/api/model/general/get_auth.php';
    include $_SERVER['DOCUMENT_ROOT'].'/api/model/beanoflink.php';
    
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
    
    $con->begin_transaction(MYSQLI_TRANS_START_READ_ONLY);
    
    /*
        Get parameter with from ajax form
        list parameter:
        1. file
    */
    
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
            if(checkingAuthKey($con,$user_id,$key,0,$cache) == 0){
                return invalidKey();
            }
        	
        	$target_dir = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username.'/temp';
        	
        	if(!is_dir($target_dir))
            {
                mkdir($target_dir, 0700, true);
            }
        	
        	$target_file = "";
        	$filename = "";
        	
        	if(!empty($_FILES["file"])){
        	    if(intval($_FILES["file"]["size"]) / 1024 / 1024 < 2){
        	        $path = $_FILES['file']['name'];
                    $ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
                    
                    if($ext == 'jpg' || $ext == 'png'){
                        
                        if(param(@$_POST['type']) != 'product'){
                            $path = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username.'/temp';
                            
                            //delete all file
                            $files = glob($path.'/*'); // get all file names
                            foreach($files as $file){ // iterate files
                                 if(is_file($file))
                                    unlink($file); // delete file
                            }
                            
                            unset($_SESSION['file']);
                        }
                        
                        $filename = uniqid().".jpg";
                	    $target_file = $target_dir ."/". $filename;
                	    
                        //upload file into 'temp' directory
                        move_uploaded_file($_FILES["file"]["tmp_name"], $target_file);
                        
                        $_SESSION['file'][] = $filename;
                        
                        $data = array(
            			    'status' => "OK",
                    		'message' => "uploaded file successfully",
                    		'src' => IMAGES_URL.'/'.urlencode(base64_encode($username.'/temp/'.$filename))
                    	);
                    }else{
                        $data = array(
                			'status' => "OK",
                			'message' => "file should be jpg or png format",
                    		'src' => ''
                	    );
                    }
        	    }else{
        	        $data = array(
                			'status' => "OK",
                			'message' => "file should be least than 2 MB",
                    		'src' => ''
                	);
        	    }
        	}else{
        	    $data = array(
        			'status' => "OK",
        			'message' => "file is empty",
                    'src' => ''
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