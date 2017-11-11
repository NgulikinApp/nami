<?php include 'web/system/minify.php';?>
<!DOCTYPE html>
<html class="qp-ui">
    <head>
		<meta charset="utf-8">
		<meta name="viewport" content="initial-scale=1, width=device-width">
		<title>Jual Beli Online | Ngulikin</title>
		<?php include 'web/library.php';?>
    </head>
    <body>
		<?php 
		      include 'web/nav/mainMenu.php';
		      include 'web/body/home.php';
		      include 'web/nav/footerMenu.php';
		      include 'web/body/general/init_questioner.php';
		?>
		<script src="js/module-general.js?jsr=<?php echo $jsversionstring; ?>"></script>
		<script src="js/module-home.js?jsr=<?php echo $jsversionstring; ?>"></script>
		<script src="js/custom-file-input.js?jsr=<?php echo $jsversionstring; ?>"></script>
		<script src="https://apis.google.com/js/api.js"></script>
		<script src="js/module-onload.js?jsr=<?php echo $jsversionstring; ?>"></script>
	</body>
</html>