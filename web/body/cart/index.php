<?php
    include 'web/system/checkDevice.php';
    session_start();
    include 'web/system/minify.php';
    include 'web/system/getUrl.php';
    $actual_link = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
?>
<!DOCTYPE html>
<html class="qp-ui">
    <head>
		<meta charset="utf-8">
		<meta name="viewport" content="initial-scale=1, width=device-width">
		<title>Cart | Ngulikin</title>
		<?php include './web/library.php';?>
		<script src="js/library/FBsdk.js?jsr=<?php echo $jsversionstring; ?>"></script>
		<script src="https://apis.google.com/js/api.js?jsr=<?php echo $jsversionstring; ?>"></script>
    </head>
    <body class="hiddenoverflow">
        <div class="loaderProgress">
            <img src="img/loader.gif" />
        </div>
		<?php 
		      include $_SERVER['DOCUMENT_ROOT'].'/web/nav/mainMenu.php';
		      include 'section_body.php';
		      include 'web/nav/footerFloatMenu.php';
		      include $_SERVER['DOCUMENT_ROOT'].'/web/nav/footerMenu.php';
		      include 'web/nav/generalInput.php';
		?>
		
		<input type="hidden" id="addressFullname" value=""/>
		<input type="hidden" id="addressLocation" value=""/>
		<input type="hidden" id="addressNohp" value=""/>
		<input type="hidden" id="addressProvince" value=""/>
		<input type="hidden" id="addressRegency" value=""/>
		<input type="hidden" id="addressDistrict" value=""/>
		<input type="hidden" id="addressVillage" value=""/>
		<input type="hidden" id="addressId" value=""/>
		<script src="js/module-general.js?jsr=<?php echo $jsversionstring; ?>"></script>
		<script src="js/module-cart.js?jsr=<?php echo $jsversionstring; ?>"></script>
	</body>
</html>