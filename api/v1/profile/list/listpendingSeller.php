<?php
    /*
        This API used in ngulikin.com/js/module-home.js
    */
    
    //--------------------------------------------------------------------------
	// Link to File
	//--------------------------------------------------------------------------
    include './api/model/general/get_auth.php';
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
    $filter = param($_GET['filter']);
    $page = param(@$_GET['page']);
    $pagesize = param(@$_GET['pagesize']);
    
    /*
        Function location in : /model/general/get_auth.php
    */
    $token = bearer_auth();
    
    $con->begin_transaction(MYSQLI_TRANS_START_READ_ONLY);
    
    if($token == ''){
        /*
            Function location in : /model/general/functions.php
        */
        invalidCredential();
    }else{
        try{
            //secretKey variabel getting from : /model/jwt.php
            $exp = JWT::decode($token, $secretKey, array('HS256'));
            
            if(isset($_SESSION['user_admin'])){
                $user_id = $_SESSION['user_admin']["user_id"]; 
                $key = $_SESSION['user_admin']["key"];
            }else{
                $user_id = '';
                $key = '';
            }
            
            /*
                Function location in : /model/general/functions.php
            */
            if(checkingAuthKey($con,$user_id,$key,1,$cache) == 0){
                return invalidKey();
            }
            
            $sql = "SELECT 
                        COUNT(1) as count_user
                    FROM 
                        `user`
                    WHERE
                        user_seller='1'";
            
            $stmtCount = $con->prepare($sql);
            
            $sql = "SELECT 
                        user_id,
                        username,
                        photo_card,
                        photo_selfie,
                        user_asked_seller_date,
                        email,
                        fullname
                    FROM 
                        `user`
                    WHERE 
                        user_seller='1'
                    LIMIT ?,?";
            
            $stmt = $con->prepare($sql);
            $stmt->bind_param("ii", $page,$pagesize);
            /*
                Function location in : functions.php
            */
            listPendingUser($stmt,$stmtCount,$pagesize);
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