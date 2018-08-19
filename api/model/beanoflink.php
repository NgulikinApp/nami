<?php
    session_start();
    //--------------------------------------------------------------------------
	// Link to File
	//--------------------------------------------------------------------------
	include 'connection.php';
    include 'memcached.php';
    include 'jwt.php';
    include 'getUrl.php';
    include 'ipaddress.php';
    //include 'checkajax.php';
	include $_SERVER['DOCUMENT_ROOT'].'/api/model/mail/PHPMailerAutoload.php';
    include $_SERVER['DOCUMENT_ROOT'].'/api/model/general/functions.php';
    
    define("INIT_URL", "https://www.ngulikin.com");
    define("IMAGES_URL", "https://www.images.ngulikin.com");
?>