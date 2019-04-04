<?php
    /*
        This API used in ngulikin.com/js/module-shop-mysales.js
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
    $listinvoice_id = param($request['listinvoice_id']);
    $listinvoice_no = param($request['listinvoice_no']);
    $listuser_id = param($request['listuser_id']);
    $action = param($request['action']);
    
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
            
            $status = ($action =="confirm")?3:7;
            $type = ($action =="confirm")?1:2;
            $title = ($action =="confirm")?"Pesanan anda dikonfirmasi":"Pesanan anda dibatalkan";
            
            $stmt = $con->prepare("UPDATE invoice SET invoice_current_status=? WHERE invoice_id IN(?)");   
                
            $stmt->bind_param("ii", $status,$listinvoice_id);
                
            $stmt->execute();
            
            $stmt->close();
            
            $invoice_no_array = explode(',',$listinvoice_no);
            $invoice_no_count = count($invoice_no_array);
            $user_id_array = explode(',',$listuser_id);
            
            for($i=0;$i<$invoice_no_count;$i++){
                $desc = ($action =="confirm")?"No. Tagihan #".$invoice_no_array[$i]." telah dikonfirmasi oleh penjual":"No. Tagihan #".$invoice_no_array[$i]." telah dibatalkan oleh penjual";
                $stmt = $con->prepare("INSERT INTO notifications(user_id,data_id,notifications_type,notifications_title,notifications_desc) VALUES(?,?,?,?,?)");   
                
                $stmt->bind_param("ssiss", $user_id_array[$i],$invoice_no_array[$i],$type,$title,$desc);
                    
                $stmt->execute();
                
                $stmt->close();
                
                $stmt = $con->prepare("SELECT 
                                            email,
                                            fullname
                                        FROM 
                                            user
                                        WHERE
                                            user_id = ?");
                                        
                $stmt->bind_param("s", $user_id_array[$i]);
                
                $stmt->execute();
        
                $stmt->bind_result($col1, $col2);
    
                $stmt->fetch();
                
                /*
                    Function location in : /model/general/functions.php
                */
                sendEmail("info@ngulikin.com","Ngulikin",$col1,$col2,$title,$desc);
                
                $stmt->close();
            }
            
            /*
                Function location in : functions.php
            */
            actionorder($listinvoice_id,$action);
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