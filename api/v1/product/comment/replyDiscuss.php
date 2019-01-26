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
    
    /*
        Parameters
    */
    $comment = param($request['comment']);
    
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
                $user_photo = '';
                $fullname = '';
            }
            
            /*
                Function location in : /model/general/functions.php
            */
            if(checkingAuthKey($con,$user_id,$key,0,$cache) == 0){
                return invalidKey();
            }
            
            $stmt = $con->prepare("INSERT INTO product_discuss_reply(product_discuss_id,user_id,product_discuss_reply_comment) VALUES(?,?,?)");
               
            $stmt->bind_param("iss", $id,$user_id,$comment);
            
            $stmt->execute();
            
            $shop_discuss_reply_id = $con->insert_id;
            
            $stmt = $con->prepare("SELECT 
                                        DATE_FORMAT(product_discuss_reply_createdate, '%W, %d %M %Y') AS comment_date
                                    FROM 
                                        product_discuss_reply
                                    WHERE
                                        product_discuss_reply_id = ?");
                                        
            $stmt->bind_param("i", $product_discuss_reply_id);
            
            commentreply($stmt,$product_discuss_reply_id,$id,$user_id,$comment,$user_photo,$fullname);
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