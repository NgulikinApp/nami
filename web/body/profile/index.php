<?php
    session_start();
    if(!isset($_SESSION['user'])){
        header("Location: .");
    }
    include 'web/system/minify.php';
    include 'web/system/getUrl.php';
    $actual_link = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
?>
<!DOCTYPE html>
<html class="qp-ui">
    <head>
		<meta charset="utf-8">
		<meta name="viewport" content="initial-scale=1, width=device-width">
		<?php include $_SERVER['DOCUMENT_ROOT'].'/web/library_detail.php';?>
		<title>Profil | Ngulikin</title>
		<link href="../../css/jquery.mobile.datepicker.css?jsr=<?php echo $jsversionstring; ?>" rel="stylesheet">
        <link href="../../css/jquery.mobile.datepicker.theme.css?jsr=<?php echo $jsversionstring; ?>" rel="stylesheet">
        
        <script src="../../js/library/jquery.mobile-git.js?jsr=<?php echo $jsversionstring; ?>"></script> 
        <script src="../../js/library/jquery.mobile.datepicker.js?jsr=<?php echo $jsversionstring; ?>"></script>
    </head>
    <body>
        <div class="loaderProgress">
            <img src="../img/loader.gif" />
        </div>
		<?php
		    include $_SERVER['DOCUMENT_ROOT'].'/web/nav/mainMenu.php';
		    include 'section_body.php';
		    include $_SERVER['DOCUMENT_ROOT'].'/web/nav/footerMenu.php';
		    include 'web/nav/footerFloatMenu.php';
		    include 'web/nav/generalInput.php';
		?>
		<script src="../../js/module-general.js?jsr=<?php echo $jsversionstring; ?>"></script>
	    <script src="../../js/module-profile.js?jsr=<?php echo $jsversionstring; ?>"></script>
	</body>
</html>