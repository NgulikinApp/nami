<?php
    /*
        This API used in ngulikin.com/js/module-rate.js
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
    
    $con->begin_transaction(MYSQLI_TRANS_START_READ_WRITE);
    
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
            
            $count_invoice = count($request);
            
            for($i=0;$i<$count_invoice;$i++){
                $sql = "UPDATE 
                            invoice
                            LEFT JOIN invoice_shop_detail ON invoice_shop_detail.invoice_id = invoice.invoice_id
    						LEFT JOIN shop ON shop.shop_id = invoice_shop_detail.shop_id
    						LEFT JOIN delivery ON delivery.delivery_id = invoice_shop_detail.delivery_id
    						LEFT JOIN invoice_brand_detail ON invoice_brand_detail.invoice_shop_detail_id = invoice_shop_detail.invoice_shop_detail_id
    						LEFT JOIN brand ON brand.brand_id = invoice_brand_detail.brand_id
    						LEFT JOIN invoice_product_detail ON invoice_product_detail.invoice_brand_detail_id = invoice_brand_detail.invoice_brand_detail_id 
                            SET invoice_product_detail_israted='1'
    					WHERE
                            invoice.invoice_id = ?";
               
                $stmt = $con->prepare($sql);
                $stmt->bind_param("i", $request[$i]['invoice_id']);
                $stmt->execute();
                $stmt->close();
                
                $sql = "INSERT INTO product_rate(product_id,user_id,product_rate_value) VALUES(?,?,?)";
                
                $stmt = $con->prepare($sql);
                $stmt->bind_param("isi", $request[$i]['product_id'],$user_id,$request[$i]['rate']);
                $stmt->execute();
                $stmt->close();
                
                $sql = "SELECT 
                            SUM(product_rate_value)/COUNT(product_rate_id) AS average_rate,
                            COUNT(product_rate_id) AS count_rate 
                        FROM 
                            product_rate 
                        WHERE 
                            product_id=? 
                            AND 
                            user_id=?";
                
                $stmt = $con->prepare($sql);
                $stmt->bind_param("is", $request[$i]['product_id'],$user_id);
                $stmt->execute();
                $stmt->bind_result($col1, $col2);
                $stmt->fetch();
                
                $average_rate = $col1;
                $count_rate = $col2;
                
                $stmt->close();
                
                $sql = "UPDATE 
                            product 
                        SET 
                            product_average_rate=?,
                            product_count_rate=?
    					WHERE
                            product_id = ?
                           ";
                
                $stmt = $con->prepare($sql);
                $stmt->bind_param("iii", $average_rate,$count_rate,$request[$i]['product_id']);
                $stmt->execute();
                $stmt->close();
            }
            
            /*
                Function location in : functions.php
            */
            
            rateItem();
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