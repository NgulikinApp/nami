<?php
    /*
        This API used in ngulikin.com/js/module-home.js
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
    $shop_id = param($request['shop_id']);
    
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
                $username = $_SESSION['user']["username"];
                $user_shop_id = intval($_SESSION['user']["shop_id"]);
            }else{
                $user_id = '';
                $key = '';
                $user_photo = '';
                $username = '';
                $user_shop_id = 0;
            }
            
            /*
                Function location in : /model/general/functions.php
            */
            if(checkingAuthKey($con,$user_id,$key,0,$cache) == 0){
                return invalidKey();
            }
            
            if($id == 0 || $shop_id == 0||$shop_id == $user_shop_id){
                /*
                    Function location in : functions.php
                */
                unauthComment();
            }
            
            if($comment == ''){
                /*
                    Function location in : functions.php
                */
                emptyComment();
            }
            
            $stmt = $con->prepare("INSERT INTO product_review(shop_id,user_id,product_review_comment) VALUES(?,?,?)");
            
            $stmt->bind_param("iss", $id, $user_id, $comment);
            
            $stmt->execute();
            
            $product_review_id = $con->insert_id;
            
            $stmt = $con->prepare("UPDATE shop SET product_total_review=product_total_review+1 where product_id=".$id."");
            
            $stmt->bind_param("i", $id);
            
            $stmt->execute();
            
            $stmt = $con->prepare("SELECT 
                                        DATE_FORMAT(product_review_createdate, '%W, %d %M %Y') AS comment_date
                                    FROM 
                                        product_review
                                    WHERE
                                        product_review_id = ?");
            $stmt->bind_param("i", $product_review_id);
            
            comment($stmt,$product_review_id,$id,$user_id,$comment,$user_photo,$username);
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