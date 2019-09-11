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
    $keyword = @param($_GET['keyword']);
    
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
            
            $sql = "SELECT 
                        notifications_id, 
                        notifications_desc,
                        IFNULL(shop_icon,notification_photo) AS notifications_icon,
                        DATE_FORMAT(notifications_createdate, '%W, %d %M %Y') AS notifications_createdate,
                        IFNULL(username,'admin'),
						link_id,
						notifications_type,
						notifications_title,
						notifications_isread
                    FROM 
                        notifications
                        LEFT JOIN invoice ON invoice.invoice_no=notifications.link_id
                        LEFT JOIN invoice_shop_detail ON invoice_shop_detail.invoice_id = invoice.invoice_id
						LEFT JOIN shop ON shop.shop_id = invoice_shop_detail.shop_id
						LEFT JOIN user ON user.user_id = shop.user_id
                    WHERE
                        notifications.user_id = ?";
            
            if($keyword != ''){
                $sql .= " AND notifications_desc LIKE '%?%'";
            }
            $sql .= " ORDER BY 
                        notifications_id DESC";
            
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
    
    $con->commit();
    
    /*
        Function location in : /model/connection.php
    */
    conn_close($con);
    
?>