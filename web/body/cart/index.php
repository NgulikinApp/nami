<!DOCTYPE html>
<html class="qp-ui">
    <head>
		<meta charset="utf-8">
		<meta name="viewport" content="initial-scale=1, width=device-width">
		<title>Cart | Ngulikin</title>
		<?php include $_SERVER['DOCUMENT_ROOT'].'/web/library.php';?>
    </head>
    <body>
		<?php include $_SERVER['DOCUMENT_ROOT'].'/web/nav/mainMenu.php';?>
		<?php include 'section_body.php';?>
		<?php include $_SERVER['DOCUMENT_ROOT'].'/web/nav/footerMenu.php';?>
		<?php include 'web/body/general/init_questioner.php';?>
		<script src="js/module-general.js?jsr=<?php echo $jsversionstring; ?>"></script>
		<script src="js/module-cart.js?jsr=<?php echo $jsversionstring; ?>"></script>
		<script>
			$( document ).ready(function() {
			    initGeneral();
			    initCart();
			});
		</script>
	</body>
</html>