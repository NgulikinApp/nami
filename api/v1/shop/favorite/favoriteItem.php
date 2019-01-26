<?php
    /*
        This API used in ngulikin.com/js/module-shop.js
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
    $shop_id = param($request['shop_id']);
    
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
                                        COUNT(shop_favorite_id) as count_favorite
                                    FROM 
                                        shop_favorite 
                                    WHERE 
                                        shop_id=? AND user_id=?");
            
            $stmt->bind_param("is", $shop_id,$user_id);
            $stmt->execute();
            
            $stmt->bind_result($col1);
            
            $stmt->fetch();
            
            $count_shop = $col1;
            
            $stmt->close();
            
            if(intval($count_shop) > 0){
                $stmt = $con->prepare("DELETE FROM shop_favorite WHERE shop_id = ? AND user_id = ?");
                
                $stmt->bind_param("is", $shop_id, $user_id);
            
                $stmt->execute();
                
                $stmt->close();
            
                $stmt = $con->prepare("UPDATE shop SET shop_count_favorite=shop_count_favorite-1 where shop_id=?");
                
                $stmt->bind_param("i", $shop_id);
            
                $stmt->execute();
                
                $stmt->close();
                
                $stmt = $con->prepare("UPDATE user SET user_shop_favorites=user_shop_favorites-1 where user_id=?");
                
                $stmt->bind_param("s", $user_id);
            
                $stmt->execute();
                
                $stmt->close();
                
                /*
                    Function location in : functions.php
                */
                $count_val = count_shop($con,$shop_id);
                
                /*
                    Function location in : functions.php
                */
                favorite($shop_id,$user_id,$count_val,0);
            }else{
                $stmt = $con->prepare("INSERT INTO shop_favorite(shop_id,user_id) VALUES(?,?)");
                
                $stmt->bind_param("is", $shop_id, $user_id);
            
                $stmt->execute();
                
                $stmt->close();
            
                $stmt = $con->prepare("UPDATE shop SET shop_count_favorite=shop_count_favorite+1 where shop_id=?");
                
                $stmt->bind_param("i", $shop_id);
            
                $stmt->execute();
                
                $stmt->close();
                
                $stmt = $con->prepare("UPDATE user SET user_shop_favorites=user_shop_favorites+1 where user_id=?");
                
                $stmt->bind_param("s", $user_id);
            
                $stmt->execute();
                
                $stmt->close();
                
                /*
                    Function location in : functions.php
                */
                $count_val = count_shop($con,$shop_id);
                
                /*
                    Function location in : functions.php
                */
                favorite($shop_id,$user_id,$count_val,1);
            }
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