<?php
    /*
        This API used in ngulikin.com/js/module-shop.js, ngulikin.com/js/module-shop-seller.js
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
    
    //Parameters
    $linkArray = explode('/',$actual_link);
    $id = array_values(array_slice($linkArray, -1))[0];
    
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
            
            if($id == "shop"){
                if(isset($_SESSION['user'])){
                    $id = intval($_SESSION['user']["shop_id"]);
                    $username = $_SESSION['user']["username"];
                    
                    $path = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username.'/temp';
            
                    /*
                        Function location in : /model/general/functions.php
                    */
                    emptyFolder($path);
                }else{
                    $id = 0;
                }
            }else{
                $id = preg_replace('/-/', ' ', $id);
            }
            
            $sql = "SELECT 
                        shop.shop_id,
                        `user`.user_id,
                        username,
                        fullname,
                        shop_name,
                        shop_icon,
                        shop_description,
                        shop_banner,
                        IFNULL(university,'') AS university,
                        user_photo,
                        shop_op_from,
                        shop_op_to,
                        shop_sunday,
                        shop_monday,
                        shop_tuesday,
                        shop_wednesday,
                        shop_thursday,
                        shop_friday,
                        shop_saturday,
                        IFNULL(DATE_FORMAT(shop_close, '%d %M %Y'),'') AS shop_close,
                        IFNULL(DATE_FORMAT(shop_open, '%d %M %Y'),'') AS shop_open,
                        IFNULL(shop_closing_notes,'') AS shop_closing_notes,
                        IFNULL(shop_address,'') AS shop_address,
                        shop_image_location,
                        CONCAT('Terakhir diganti tanggal ',DATE_FORMAT(shop_notes_modifydate, '%d %M %Y'),', pukul ',DATE_FORMAT(shop_notes_modifydate, '%H.%i')) AS shop_notes_modifydate,
                        shop_total_review,
                        shop_total_discuss,
                        phone
                    FROM 
                        shop
                        LEFT JOIN `user` ON `user`.user_id = shop.user_id
                    WHERE";
                                                    
            if(is_int($id)){
                $sql .= " shop.shop_id=?";
            }else{
                $sql .= " shop.shop_name=?";
            }
            $stmt = $con->prepare($sql);
            
            if(is_int($id)){
                $stmt->bind_param("i", $id);
            }else{
                $stmt->bind_param("s", $id);
            }
            
            /*
                Function location in : functions.php
            */
            detail($stmt);
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