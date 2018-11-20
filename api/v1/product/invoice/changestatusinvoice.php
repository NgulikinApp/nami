<?php
    /*
        This API used in ngulikin.com/js/module-product.js, module-home.js
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
            if(checkingAuthKey($con,$user_id,$key) == 0){
                return invalidKey();
            }
            
            $stmt = $con->query("SELECT 
                                    1
                                    FROM 
                                        invoice 
                                    WHERE 
                                        invoice_id=".$request['invoice_id']." AND invoice_paid=0");
            
            /*
                Function location in : /model/general/functions.php
            */
            $count_rows = count_rows($stmt);
            
            if($count_rows > 0){
                $stmt = $con->prepare("UPDATE invoice SET invoice_paid=1 where invoice_id=?");
                
                $stmt->bind_param("i", $invoice_id);
                
                $stmt->execute();
                
                $stmt = $con->query("SELECT 
                                        product_id
                                        FROM 
                                            invoice_detail 
                                        WHERE 
                                            invoice_id=".$request['invoice_id']."");
                
                $row = $stmt->fetch_object();
                
                $stmt = $con->prepare("UPDATE product SET product_sold=product_sold+1 WHERE product_id IN(?)");
                
                $stmt->bind_param("s", list($product_id) = $row);
                
                $stmt->execute();
                
                changestatus();
            }else{
                changestatus();
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