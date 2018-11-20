<?php
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
        Function location in : /model/general/postraw.php
    */
    $request = postraw();
    
    /*
        Function location in : /model/general/get_auth.php
    */
    $token = bearer_auth();
    
    $con->begin_transaction(MYSQLI_TRANS_START_READ_WRITE);
    
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
            }else{
                $user_id = '';
            }
            
            $stmt = $con->prepare("INSERT INTO invoice(user_id,delivery_id,invoice_delivery_price,invoice_total_price) VALUES(?,?,?,?)");
            
            $stmt->bind_param("siii", $user_id,$request['delivery_id'],$request['delivery_price'],$request['invoice_total_price']);
            
            $stmt->execute();
            
            $invoice_id = $con->insert_id;
            
            $stmt = $con->prepare("INSERT INTO invoice_detail(invoice_id,product_id,invoice_detail_sumproduct,invoice_detail_notes) VALUES(?,?,?,?)");
            
            $stmt->bind_param("iiis", $invoice_id,$request['product_id'],$request['invoice_detail_sumproduct'],$request['invoice_detail_notes']);
            
            $stmt->execute();
            
            $stmt = $con->prepare("INSERT INTO invoice_status_detail(invoice_id) VALUES(?)");
            
            $stmt->bind_param("i", $invoice_id);
            
            $stmt->execute();
            
            addtoinvoice($invoice_id);
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