<?php
    /*
        This API used in ngulikin.com/js/module-home.js
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
        Parameters
    */
    $linkArray = explode('/',$actual_link);
    $id = intval(array_values(array_slice($linkArray, -1))[0]);
    
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
            //secretKey variabel getting from : /model/jwt.php
            $exp = JWT::decode($token, $secretKey, array('HS256'));
            
            if(isset($_SESSION['user'])){
                $user_id = $_SESSION['user']["user_id"];
                $key = $_SESSION['user']["key"];
                $user_photo = $_SESSION['user']["user_photo"];
                $fullname = $_SESSION['user']["fullname"];
            }else{
                $user_id = '';
                $key = '';
                $user_photo = $_SESSION['user']["user_photo"];
                $fullname = $_SESSION['user']["fullname"];
            }
            
            /*
                Function location in : /model/general/functions.php
            */
            if(checkingAuthKey($con,$user_id,$key,0) == 0){
                return invalidKey();
            }
            
            $stmt = $con->prepare("INSERT INTO shop_discuss(shop_id,user_id,shop_discuss_comment) VALUES(?,?,?)");
               
            $stmt->bind_param("iss", $id,$user_id,$request['comment']);
            
            $stmt->execute();
            
            $shop_discuss_id = $con->insert_id;
            
            $stmt = $con->prepare("UPDATE shop SET shop_total_discuss=shop_total_discuss+1 where shop_id=?");
               
            $stmt->bind_param("i", $id);
            
            $stmt->execute();
            
            $stmt = $con->query("SELECT 
                                        DATE_FORMAT(shop_discuss_createdate, '%W, %d %M %Y') AS comment_date
                                    FROM 
                                        shop_discuss
                                    WHERE
                                        shop_discuss_id = ".$shop_discuss_id."");
            
            comment($stmt,$shop_discuss_id,$id,$user_id,$request['comment'],$user_photo,$fullname);
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