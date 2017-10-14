<?php include 'web/system/minify.php';?>
<!DOCTYPE html>
<html class="qp-ui">
    <head>
		<meta charset="utf-8">
		<meta name="viewport" content="initial-scale=1, width=device-width">
		<title>Sign In | Ngulikin</title>
		<?php include $_SERVER['DOCUMENT_ROOT'].'/web/library.php';?>"></script>
		<script src="js/library/FBsdk.js?jsr=<?php echo $jsversionstring; ?>"></script>
		<script src="https://apis.google.com/js/api.js?jsr=<?php echo $jsversionstring; ?>"></script>
    </head>
    <body>
        <?php include 'web/nav/mainMenu.php';?>
		<?php include 'section_body.php';?>
		<?php include 'web/nav/footerMenu.php';?>
		<?php include 'web/body/general/init_questioner.php';?>
		<script src="js/module-general.js?jsr=<?php echo $jsversionstring; ?>"></script>
		<script src="js/module-signin.js?jsr=<?php echo $jsversionstring; ?>"></script>
		<script src="js/module-onload.js?jsr=<?php echo $jsversionstring; ?>"></script>
	</body>
</html>