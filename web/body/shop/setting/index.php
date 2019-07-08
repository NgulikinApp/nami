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
		<?php include $_SERVER['DOCUMENT_ROOT'].'/web/library_detail.php';?>
		<title>
		    Pengaturan Toko | Ngulikin
		</title>
    </head>
    <body class="hiddenoverflow">
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
		<script src="../../js/module-shop-setting.js?jsr=<?php echo $jsversionstring; ?>"></script>
	</body>
</html>