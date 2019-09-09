<?php
    /*
        This API used in ngulikin.com/js/module-shop-mysales.js
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
            
            $stmt = $con->prepare("SELECT
                                        invoice_no,
                                        email,
                                        fullname,
                                        invoice.user_id
                                    FROM 
                                        invoice
                                        LEFT JOIN `user` ON invoice.user_id=`user`.user_id
                                    WHERE
                                        invoice_id = ?");
                                        
            $stmt->bind_param("i", $invoice_id);
                
            $stmt->execute();
        
            $stmt->bind_result($col1, $col2, $col3, $col4);
    
            $stmt->fetch();
            
            $invoice_no = $col1;
            $email = $col2;
            $fullname = $col3;
            $user_id = $col4;
            
            $stmt->close();
            
            $status = 4;
            $type = 1;
            
            $stmt = $con->prepare("UPDATE invoice SET invoice_current_status=? WHERE invoice_id=?");   
                
            $stmt->bind_param("ii", $status,$invoice_id);
                
            $stmt->execute();
            
            $stmt->close();
            
            $stmt = $con->prepare("UPDATE invoice_shop_detail SET invoice_shop_detail_noresi=? WHERE invoice_id=?");   
                
            $stmt->bind_param("si", $noresi,$invoice_id);
                
            $stmt->execute();
            
            $stmt->close();
            
            $title = "Pesanan anda telah diproses";
            $desc = "No. Tagihan #".$invoice_no." telah dikirim oleh penjual";
            $stmt = $con->prepare("INSERT INTO notifications(user_id,link_id,notifications_type,notifications_title,notifications_desc) VALUES(?,?,?,?,?)");   
                
            $stmt->bind_param("ssiss", $user_id,$invoice_no,$type,$title,$desc);
                    
            $stmt->execute();
                
            $stmt->close();
                
            /*
                    Function location in : /model/general/functions.php
            */
            sendEmail("info@ngulikin.com","Ngulikin",$email,$fullname,$title,$desc);
            
            $action = "process";
            
            $stmt = $con->prepare("INSERT INTO invoice_status_detail(invoice_id,status_id) VALUES(?,?)");   
                
            $stmt->bind_param("ii", $invoice_id,$status);
                    
            $stmt->execute();
                
            $stmt->close();
            
            /*
                Function location in : functions.php
            */
            actionorder($invoice_id,$action);
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