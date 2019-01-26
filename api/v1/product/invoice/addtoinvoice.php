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
        Parameters
    */
    $user_address_id = param($request['user_address_id']);
    $delivery_id = param($request['delivery_id']);
    $delivery_price = param($request['delivery_price']);
    $invoice_total_price = param($request['invoice_total_price']);
    $product_id = param($request['product_id']);
    $invoice_detail_sumproduct = param($request['invoice_detail_sumproduct']);
    $invoice_detail_notes = param($request['invoice_detail_notes']);
    
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
            
            $user_address_idarray = explode(',',$user_address_id);
            $delivery_idarray = explode(',',$delivery_id);
            $product_idarray = explode(',',$product_id);
            $invoice_detail_notesarray = explode('~',$invoice_detail_notes);
            
            $product_idlen = count($product_idarray);
            for($i=0;$i<$product_idlen;$i++){
                $stmt = $con->prepare("INSERT INTO invoice(user_id,invoice_total_price) VALUES(?,?)");
            
                $stmt->bind_param("si", $user_id,$invoice_total_price);
                
                $stmt->execute();
                
                $invoice_id = $con->insert_id;
                
                $stmt->close();
                
                $stmt = $con->prepare("INSERT INTO invoice_detail(invoice_id,product_id,delivery_id,user_address_id,invoice_detail_sumproduct,invoice_detail_notes,invoice_detail_delivery_price) VALUES(?,?,?,?,?,?,?)");
                
                $stmt->bind_param("iiiiisi", $invoice_id,$product_idarray[$i],$user_address_idarray[$i],$user_address_idarray[$i],$invoice_detail_sumproduct,$invoice_detail_notesarray[$i],$delivery_price);
                
                $stmt->execute();
                
                $stmt->close();
                
                $stmt = $con->prepare("INSERT INTO invoice_status_detail(invoice_id) VALUES(?)");
                
                $stmt->bind_param("i", $invoice_id);
                
                $stmt->execute();
                
                $stmt->close();
            }
            
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