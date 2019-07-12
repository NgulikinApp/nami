<?php
    /*
        This API used in ngulikin.com/js/module-general.js
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
    $date = param($_GET['date']);
    $delivery = param($_GET['delivery']);
    $search = param($_GET['search']);
    
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
            
            $sql = "SELECT 
                        invoice.invoice_id,
                        delivery_name,
                        invoice_delivery_price,
                        invoice_noresi,
                        invoice_total_price,
                        invoice_createdate,
                        fullname,
                        email,
                        phone,
                        user_photo,
                        username,
                        GROUP_CONCAT(invoice_detail_sumproduct separator '~') AS invoice_detail_sumproduct,
                        GROUP_CONCAT(invoice_detail_notes separator '~') AS invoice_detail_notes,
                        GROUP_CONCAT(product_name separator '~') AS product_names,
                        GROUP_CONCAT(SUBSTRING_INDEX(product_image,',',1) separator '~') AS product_images,
                        GROUP_CONCAT(brand_name separator '~') AS brand_names
                    FROM
                        invoice
                        LEFT JOIN `user` ON `user`.user_id=invoice.user_id
                        LEFT JOIN invoice_detail ON invoice.invoice_id=invoice_detail.invoice_id
                        LEFT JOIN product ON product.product_id=invoice_detail.product_id
                        LEFT JOIN brand ON brand.brand_id=product.brand_id
                        LEFT JOIN delivery ON delivery.delivery_id=invoice.delivery_id
                    WHERE
                        seller_id = '".$user_id."'
                        AND invoice_current_status=3";
                                    
            if($date != ''){
                $sql .= " AND CAST(invoice_createdate AS DATE) = ".date("Y-m-d");
            }
            
            if($delivery != '0'){
                $sql .= " AND invoice.delivery_id = ".$delivery;
            }
            
            if($search != ''){
                if(is_numeric ($search)){
                    $sql .= " AND invoice.delivery_id = ".$search;
                }else{
                    $sql .= " AND invoice.fullname = '".$search."'";
                }
            }
        
            $stmt = $con->query($sql);
            
            /*
                Function location in : functions.php
                Cache variabel got from : /model/memcache.php
            */
            pendinginvoice($stmt);
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