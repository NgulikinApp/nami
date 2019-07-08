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
    $fullname = param($request['fullname']);
    $dob = param($request['dob']);
    $gender = param($request['gender']);
    $phone = param($request['phone']);
    $status = param($request['status']);
    
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
            if(checkingAuthKey($con,$user_id,$key,0,$cache) == 0){
                return invalidKey();
            }
            
            $user_photo_name = '';
            if (isset($_SESSION['file'])){
                
                $source_dir = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username.'/temp';
                $dest_dir = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username;
                $user_photo_name = $_SESSION['file'][0];
                
                $source = $source_dir.'/'.$user_photo_name;
                $dest = $dest_dir.'/'.$user_photo_name;
                
                /*
                    Function location in : /model/general/functions.php
                */
                emptyFolder($dest_dir);
                
                rename($source,$dest);
            }
            
            $user_card_name = '';
            if (isset($_SESSION['card'])){
                
                $source_dir = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username.'/temp';
                $dest_dir = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username.'/seller/card';
                $user_card_name = $_SESSION['card'];
                
                $source = $source_dir.'/'.$user_card_name;
                $dest = $dest_dir.'/'.$user_card_name;
                
                /*
                    Function location in : /model/general/functions.php
                */
                emptyFolder($dest_dir);
                
                rename($source,$dest);
            }
            
            $user_selfie_name = '';
            if (isset($_SESSION['selfie'])){
                
                $source_dir = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username.'/temp';
                $dest_dir = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username.'/seller/selfie';
                $user_selfie_name = $_SESSION['selfie'];
                
                $source = $source_dir.'/'.$user_selfie_name;
                $dest = $dest_dir.'/'.$user_selfie_name;
                
                /*
                    Function location in : /model/general/functions.php
                */
                emptyFolder($dest_dir);
                
                rename($source,$dest);
            }
            
            $a_param_type = array();
            $a_bind_params = array();
            
            $sql = "UPDATE user SET fullname=?, dob=?, gender=?, phone=?,user_status_id=?";
            
            array_push($a_param_type,"s");
            array_push($a_param_type,"s");
            array_push($a_param_type,"s");
            array_push($a_param_type,"s");
            array_push($a_param_type,"i");
            
            array_push($a_bind_params,$fullname);
            array_push($a_bind_params,$dob);
            array_push($a_bind_params,$gender);
            array_push($a_bind_params,$phone);
            array_push($a_bind_params,$status);
            
            if ($user_photo_name != ''){
                $sql .= ",user_photo=?";
                
                array_push($a_param_type,"s");
                array_push($a_bind_params,$user_photo_name);
            }
            
            if ($user_card_name != ''){
                $sql .= ",photo_card=?";
                
                array_push($a_param_type,"s");
                array_push($a_bind_params,$user_card_name);
            }
            
            if ($user_selfie_name != ''){
                $sql .= ",photo_selfie=?";
                
                array_push($a_param_type,"s");
                array_push($a_bind_params,$user_selfie_name);
            }
            
            $sql .= " WHERE user_id=?";
            
            
            array_push($a_param_type,"s");
            array_push($a_bind_params,$user_id);
            
            $a_params = array();
 
            $param_type = '';
            $n = count($a_param_type);
            for($i = 0; $i < $n; $i++) {
              $param_type .= $a_param_type[$i];
            }
             
            /* with call_user_func_array, array params must be passed by reference */
            $a_params[] = & $param_type;
             
            for($i = 0; $i < $n; $i++) {
              /* with call_user_func_array, array params must be passed by reference */
              $a_params[] = & $a_bind_params[$i];
            }
             
            /* Prepare statement */
            $stmt = $con->prepare($sql);
             
            /* use call_user_func_array, as $stmt->bind_param('s', $param); does not accept params array */
            call_user_func_array(array($stmt, 'bind_param'), $a_params);
                
            $stmt->execute();
            
            $stmt->close();
            
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
    
    $con->commit();
    
    /*
        Function location in : /model/connection.php
    */
    conn_close($con);
?>