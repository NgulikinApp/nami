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
            }else{
                $user_id = '';
                $key = '';
            }
            
            /*
                Function location in : /model/general/functions.php
            */
            if(checkingAuthKey($con,$user_id,$key) == 0){
                return invalidKey();
            }
            
            $stmt = $con->prepare("INSERT INTO shop_review(shop_id,user_id,shop_review_comment) VALUES(?,?,?)");
            
            $stmt->bind_param("iss", $id, $user_id, $request['comment']);
            
            $stmt->execute();
            
            $shop_review_id = $con->insert_id;
            
            $stmt = $con->prepare("UPDATE shop SET shop_total_review=shop_total_review+1 where shop_id=".$id."");
            
            $stmt->bind_param("i", $id);
            
            $stmt->execute();
            
            $stmt = $con->query("SELECT 
                                        username,
                                        user_photo,
                                        fullname,
                                        DATE_FORMAT(shop_review_createdate, '%W, %d %M %Y') AS comment_date
                                    FROM 
                                        shop_review
                                        LEFT JOIN `user` ON `user`.user_id = shop_review.user_id
                                        LEFT JOIN `shop` ON `shop`.shop_id = shop_review.shop_id
                                    WHERE
                                        shop_review_id = ".$shop_review_id."");
            
            comment($stmt,$shop_review_id,$id,$user_id,$request['comment']);
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