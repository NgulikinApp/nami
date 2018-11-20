<?php
    session_start();
    include 'web/system/minify.php';
?>
<!DOCTYPE html>
<html class="qp-ui">
    <head>
		<meta charset="utf-8">
		<meta name="viewport" content="initial-scale=1, width=device-width">
		<title>Search | Ngulikin</title>
		<?php include $_SERVER['DOCUMENT_ROOT'].'/web/library_detail.php';?>
    </head>
    <body>
		<?php 
		    include $_SERVER['DOCUMENT_ROOT'].'/web/nav/mainMenu.php';
		    include 'section_body.php';
		    include $_SERVER['DOCUMENT_ROOT'].'/web/nav/footerMenu.php';
		    include 'web/nav/footerFloatMenu.php';
		    include 'web/nav/generalInput.php';
		?>
		<script src="../../js/module-general.js?jsr=<?php echo $jsversionstring; ?>"></script>
		<script src="../../js/module-onload.js?jsr=<?php echo $jsversionstring; ?>"></script>
		<script src="../../js/module-search.js?jsr=<?php echo $jsversionstring; ?>"></script>
	</body>
</html>