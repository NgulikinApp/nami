<?php
    /*
        This API used in ngulikin.com/js/module-general.js
    */
    
    //--------------------------------------------------------------------------
	// Link to File
	//--------------------------------------------------------------------------
    include 'functions.php';
    
    unset($_SESSION['user']);
    unset($_SESSION['productcart']);
    signout();
?>