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
    
    $q = base64_decode ($_GET['q']);
    
    $qArray = explode('~',$q);
    $user_id = $qArray[0];
    $key = $qArray[1];
    
    $con->query("UPDATE 
                        user
                SET
                        user_isactive = 1
                WHERE 
                        user_id='".$user_id."'
                        AND
                        user_key='".$key."'");
    
    echo "Akun anda sudah aktif, anda bisa login sekarang";
    
    /*
        Function location in : /model/connection.php
    */
    conn_close($con);
?>