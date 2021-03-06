<?php
    include 'web/system/checkDevice.php';
    session_start();
    if(!isset($_SESSION['user']) || intval($_SESSION['user']["shop_id"]) == 0 || $_SESSION['user']['user_seller'] != '2'){
        header("Location: ..");
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
		<?php include './web/library_detail.php';?>
		<title>
		    Penjualanku | Ngulikin
		</title>
		<link href="../../css/jquery.mobile.datepicker.css?jsr=<?php echo $jsversionstring; ?>" rel="stylesheet">
        <link href="../../css/jquery.mobile.datepicker.theme.css?jsr=<?php echo $jsversionstring; ?>" rel="stylesheet">
        
        <script src="../../js/library/jquery.mobile-git.js?jsr=<?php echo $jsversionstring; ?>"></script> 
        <script src="../../js/library/jquery.mobile.datepicker.js?jsr=<?php echo $jsversionstring; ?>"></script>
    </head>
    <body>
        <?php 
            include './web/nav/mainMenu.php';
            include 'section_body.php';
            include './web/nav/footerMenu.php';
            include 'web/nav/footerFloatMenu.php';
            include 'web/nav/generalInput.php';
        ?>
		<script src="../../js/module-general.js?jsr=<?php echo $jsversionstring; ?>"></script>
		<script src="../../js/module-shop-mysales.js?jsr=<?php echo $jsversionstring; ?>"></script>
	</body>
</html>