<?php
    /*
        This API used in ngulikin.com/js/module-home.js
    */
    
    //--------------------------------------------------------------------------
	// Link to File
	//--------------------------------------------------------------------------
    include $_SERVER['DOCUMENT_ROOT'].'/api/model/general/get_auth.php';
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
    $keyword = $_GET['keyword'];
    
    /*
        Function location in : /model/general/get_auth.php
    */
    $token = bearer_auth();
    
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
            
            $sql = "SELECT 
                        notification_id, 
                        sender_id AS user_id,
                        notification_desc,
                        notification_photo,
                        DATE_FORMAT(notification_createdate, '%W, %d %M %Y') AS notification_createdate,
                        username
                    FROM 
                        notification
                        LEFT JOIN `user` ON notification.user_id=`user`.user_id
                    WHERE
                        notification.user_id = ?";
            if($keyword != ''){
                $sql .= " AND notification_desc LIKE '%?%'";
            }
            $sql .= " ORDER BY 
                        notification_id DESC";
            $stmt = $con->prepare($sql);
            
            if($keyword != ''){
                $stmt->bind_param("ss", $user_id,$keyword);
            }else{
                $stmt->bind_param("s", $user_id);
            }
            /*
                Function location in : functions.php
            */
            notification($stmt);
        }catch(Exception $e){
            /*
                Function location in : /model/general/functions.php
            */
            tokenExpired();
        }
    }
    
    /*
        Function location in : /model/connection.php
    */
    conn_close($con);
?>