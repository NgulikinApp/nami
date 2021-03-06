<?php
    //--------------------------------------------------------------------------
	// Link to File
	//--------------------------------------------------------------------------
    include './api/model/beanoflink.php';
    include 'functions.php';
    
    /*
        Function location in : /model/connection.php
    */
    $con = conn();
    
    $con->begin_transaction(MYSQLI_TRANS_START_READ_WRITE);
    
    $q = base64_decode (param($_GET['q']));
    
    $qArray = explode('~',$q);
    $user_id = $qArray[0];
    $key = $qArray[1];
    
    $stmt = $con->prepare("UPDATE 
                        user
                SET
                        user_isactive = 1
                WHERE 
                        user_id=?
                        AND
                        user_key=?");
                        
    $stmt->bind_param("ss", $user_id, $key);
                
    $stmt->execute();
    
    $stmt->close();
    
    echo "Akun anda sudah aktif, anda bisa login sekarang";
    
    $con->commit();
    
    /*
        Function location in : /model/connection.php
    */
    conn_close($con);
?>