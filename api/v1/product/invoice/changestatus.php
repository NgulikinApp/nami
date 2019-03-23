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
    
    /*
        Parameters
    */
    $invoice_id = param($request['invoice_id']);
    $noresi = param($request['noresi']);
    
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
            
            $stmt = $con->query("
                                    SELECT 
                                        invoice_current_status,
                                        email,
                                        fullname
                                    FROM 
                                        invoice
                                        LEFT JOIN `user` ON `user.user_id=invoice.user_id
                                    WHERE 
                                        invoice_id=".$invoice_id."");
            
            $stmt->bind_param("i", $invoice_id);
            $stmt->execute();
            $stmt->bind_result($col1,$col2,$col3);
            
            $stmt->store_result();
            /*
                Function location in : /model/general/functions.php
            */
            $count_rows = count_rows($stmt);
            
            if($count_rows > 0){
            
                $stmt->fetch();
            
                if($col1 == '1'){
                    $status = 2;
                    $stmt = $con->query("SELECT 
                                            product_id
                                            FROM 
                                                invoice_detail 
                                            WHERE 
                                                invoice_id=".$request['invoice_id']."");
                    
                    $row = $stmt->fetch_object();
                    
                    $stmt = $con->prepare("UPDATE product SET product_stock=product_stock-1,product_sold=product_sold+1 WHERE product_id IN(?)");
                    
                    $stmt->bind_param("s", list($product_id) = $row);
                    
                    $stmt->execute();
                    
                    $subject = "Hore, Barang sedang diproses penjual";
                }else{
                    $status = 3;
                    
                    $stmt = $con->prepare("UPDATE invoice SET invoice_noresi=? where invoice_id=?");
                
                    $stmt->bind_param("si", $noresi,$invoice_id);
                        
                    $stmt->execute();
                    
                    $subject = "Hore, Barang telah Dikirim";
                }
                $body = "Hai ".$col3."</br>".$subject;
                /*
                    Function location in : /model/general/functions.php
                */
                $sendemail = sendEmail("info@ngulikin.com","Ngulikin",$col2,$verified[3],$subject,$body);
                
                $stmt = $con->prepare("UPDATE invoice SET invoice_current_status=? where invoice_id=?");
                
                $stmt->bind_param("ii", $status,$invoice_id);
                    
                $stmt->execute();
                    
                $stmt = $con->prepare("INSERT INTO invoice_status_detail(invoice_id,status_id) VALUES(?,?)");
                
                $stmt->bind_param("ii", $invoice_id,$status);
                    
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