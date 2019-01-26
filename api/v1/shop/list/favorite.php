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
    $page = param($_GET['page']);
    $pagesize = param($_GET['pagesize']);
    
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
            if(checkingAuthKey($con,$user_id,$key,0,$cache) == 0){
                return invalidKey();
            }
            
            $stmt = $con->prepare("SELECT 
                                    shop.shop_id, 
                                    shop_name,
                                    shop_icon,
                                    username,
                                    DATEDIFF(CURDATE(),CAST(shop_createdate AS DATE)) AS difdate,
                                    user_shop_favorites AS count_shop
                        FROM 
                                    shop_favorite
                                    LEFT JOIN shop ON shop.shop_id = shop_favorite.shop_id
                                    LEFT JOIN `user` ON `user`.user_id = shop.user_id
                                WHERE
                                    shop_favorite.user_id = ?
                        		ORDER BY 
                                    shop_favorite.shop_id DESC
                        		LIMIT ?,?");
            
            $stmt->bind_param("sii", $user_id,$page,$pagesize);
            /*
                Function location in : functions.php
            */
            
            favorite($stmt,$pagesize);
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