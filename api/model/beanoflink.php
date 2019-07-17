<?php
    /*
        Modify php.ini
    */
    ini_set( 'session.use_only_cookies', TRUE );				
    ini_set( 'session.use_trans_sid', FALSE );
    ini_set( 'session.cookie_httponly', TRUE );				
    ini_set( 'session.cookie_secure', TRUE );
    ini_set( 'session.cookie_domain', "ngulikin.com" );
    
    session_start();
    date_default_timezone_set("Asia/Jakarta");
    //--------------------------------------------------------------------------
	// Link to File
	//--------------------------------------------------------------------------
	include 'connection.php';
    include 'memcached.php';
    include 'jwt.php';
    include 'getUrl.php';
    include 'ipaddress.php';
    include 'check_user_agent.php';
    //include 'checkajax.php';
	include './api/model/mail/PHPMailerAutoload.php';
    include './api/model/general/functions.php';
    
    define("INIT_URL", "https://www.ngulikin.com");
    define("IMAGES_URL", "https://www.images.ngulikin.com");
?>