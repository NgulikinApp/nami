<?php
    /*
        This API used in ngulikin.com/js/module-shop.js, ngulikin.com/js/module-shop-seller.js
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
            $exp = JWT::decode($token, $secretKey, array('HS256'));
            
            if(isset($_SESSION['user'])){
                $user_id = $_SESSION['user']["user_id"];
                $shop_id = $_SESSION['user']["shop_id"];
                $key = $_SESSION['user']["key"];
            }else{
                $user_id = '';
                $shop_id = '';
                $key = '';
            }
            
            /*
                Function location in : /model/general/functions.php
            */
            if(checkingAuthKey($con,$user_id,$key,0,$cache) == 0){
                return invalidKey();
            }
            
            $stmt = $con->prepare("SELECT 
                                                    username,
                                                    shop_op_from,
                                                    shop_op_to,
                                                    shop_sunday,
                                                    shop_monday,
                                                    shop_tuesday,
                                        			shop_wednesday,
                                        			shop_thursday,
                                        			shop_friday,
                                        			shop_saturday,
                                        			shop_description,
                                        			shop_close,
                                        			shop_open,
                                        			shop_closing_notes,
                                        			shop_address,
                                        			shop_image_location
                                            FROM 
                                                    shop
                                                    LEFT JOIN `user` ON `user`.user_id = shop.user_id
                                            WHERE
                                                    shop.shop_id=?");
            
            
            $stmt->bind_param("i", $shop_id);
            /*
                Function location in : functions.php
            */
            detailNotes($stmt);
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