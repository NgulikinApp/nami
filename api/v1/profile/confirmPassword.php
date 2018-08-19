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
    $newpassword = $qArray[1];
            
    $con->query("UPDATE 
                    user
                SET
                    password = '".$newpassword."'
                WHERE 
                    user_id = '".$user_id."'");
            
    $data = array(
                'status' => "OK",
            	'message' => "Password has been changed"
            );
            
    /*
        Function location in : /model/generatejson.php
    */
    generateJSON($data);
    conn_close($con);
?>