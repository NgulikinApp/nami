<?php include 'web/system/minify.php';?>
<!DOCTYPE html>
<html class="qp-ui">
    <head>
		<meta charset="utf-8">
		<meta name="viewport" content="initial-scale=1, width=device-width">
		<title>Lupa Password | Ngulikin</title>
		<?php include './web/library.php';?>
    </head>
    <body>
        <?php include './web/nav/mainMenu.php';?>
		<?php include 'section_body.php';?>
		<?php include './web/nav/footerMenu.php';?>
		<?php include 'web/body/general/init_questioner.php';?>
		<script src="js/module-general.js?jsr=<?php echo $jsversionstring; ?>"></script>
		<script>
			$( document ).ready(function() {
			    initGeneral();
			});
		</script>
	</body>
</html>