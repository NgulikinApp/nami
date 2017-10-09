<!DOCTYPE html>
<html class="qp-ui">
    <head>
		<meta charset="utf-8">
		<meta name="viewport" content="initial-scale=1, width=device-width">
		<title>Sign Up | Ngulikin</title>
		<?php include $_SERVER['DOCUMENT_ROOT'].'/web/library.php';?>
		<link href="css/jquery.mobile.datepicker.css?jsr=<?php echo $jsversionstring; ?>" rel="stylesheet">
        <link href="css/jquery.mobile.datepicker.theme.css?jsr=<?php echo $jsversionstring; ?>" rel="stylesheet">
        
        <script src="js/library/datepicker.js?jsr=<?php echo $jsversionstring; ?>"></script>
        <script src="js/library/jquery.mobile-git.js?jsr=<?php echo $jsversionstring; ?>"></script> 
        <script src="js/library/jquery.mobile.datepicker.js?jsr=<?php echo $jsversionstring; ?>"></script>
    </head>
    <body>
        <?php include 'web/nav/mainMenu.php';?>
		<?php include 'section_body.php';?>
		<?php include 'web/nav/footerMenu.php';?>
		<?php include 'web/body/general/init_questioner.php';?>
		<script src="js/module-general.js?jsr=<?php echo $jsversionstring; ?>"></script>
		<script src="js/module-signup.js?jsr=<?php echo $jsversionstring; ?>"></script>
		<script>
			$( document ).ready(function() {
			    initGeneral();
			    initSignup();
			});
		</script>
	</body>
</html>