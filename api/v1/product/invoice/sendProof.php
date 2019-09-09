<?php
    /*
        This API used in ngulikin.com/js/module-rate.js
    */
    
    //--------------------------------------------------------------------------
	// Link to File
	//--------------------------------------------------------------------------
    include './api/model/general/get_auth.php';
    include './api/model/general/postraw.php';
    include './api/model/beanoflink.php';
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
    $invoiceno = param($_POST['invoiceno']);
    
    /*
        Parameters
    */
    
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
            
            if (!empty($_FILES["file"])){
                
                $target_dir = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username.'/product';
                
                $payment_photo_name = uniqid().".jpg";
                $target_file = $target_dir ."/". $payment_photo_name;
                
                //upload file into 'temp' directory
                move_uploaded_file($_FILES["file"]["tmp_name"], $target_file);
                
                $sql = "UPDATE 
                                invoice 
                            SET 
                                invoice_photopayment=?,
                                invoice_isuploaded_payment='1'
        					WHERE
                                invoice_no = ?
                               ";
                    
                $stmt = $con->prepare($sql);
                $stmt->bind_param("ss", $payment_photo_name,$invoiceno);
                $stmt->execute();
                $stmt->close();
            }
            
            /*
                Function location in : functions.php
            */
            changestatus();
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