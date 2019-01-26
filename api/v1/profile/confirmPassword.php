<?php
    //--------------------------------------------------------------------------
	// Link to File
	//--------------------------------------------------------------------------
    include $_SERVER['DOCUMENT_ROOT'].'/api/model/beanoflink.php';
    include 'functions.php';
	
	/*
        Function location in : /model/connection.php
    */
    $con = conn();
    
    $q = base64_decode (param($_GET['q']));
    
    $qArray = explode('~',$q);
    $user_id = $qArray[0];
    $newpassword = $qArray[1];
    
    $con->begin_transaction(MYSQLI_TRANS_START_READ_WRITE);
            
    $stmt = $con->prepare("UPDATE 
                    user
                SET
                    password = ?
                WHERE 
                    user_id = ?");
    
    $stmt->bind_param("ss", $newpassword,$user_id);
                
    $stmt->execute();
    
    $stmt->close();
            
    $data = array(
                'status' => "OK",
            	'message' => "Password has been changed"
            );
            
    /*
        Function location in : /model/generatejson.php
    */
    generateJSON($data);
    
    $con->commit();
    conn_close($con);
?>