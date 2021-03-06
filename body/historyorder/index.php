<?php
    include 'web/system/checkDevice.php';
    session_start();
    if(!isset($_SESSION['user'])){
        header("Location: ..");
    }
    include 'web/system/minify.php';
    include 'web/system/getUrl.php';
    $actual_link = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
    $currurl = substr($actual_link, strrpos($actual_link, '/') + 1);
    $notrans = explode('?',str_replace("-"," ",$currurl));
?>
<!DOCTYPE html>
<html class="qp-ui">
    <head>
		<meta charset="utf-8">
		<meta name="viewport" content="initial-scale=1, width=device-width">
		<title>Histori Pengiriman | Ngulikin</title>
		<?php include './web/library_detail.php';?>
    </head>
    <body class="hiddenoverflow">
        <div class="loaderProgress">
            <img src="../img/loader.gif" />
        </div>
		<?php 
		      include './web/nav/mainMenu.php';
		      include 'section_body.php';
		      include './web/nav/footerMenu.php';
		      include 'web/nav/footerFloatMenu.php';
		      include 'web/nav/generalInput.php';
		?>
		<input type="hidden" id="notrans" value="<?php echo $notrans[0];?>"/>
		<input type="hidden" id="delivery_id" value="<?php echo $_GET['delivery'];?>"/>
		<script src="../js/module-general.js?jsr=<?php echo $jsversionstring; ?>"></script>
		<script src="../js/module-historyorder.js?jsr=<?php echo $jsversionstring; ?>"></script>
	</body>
</html>