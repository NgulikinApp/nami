<?php

if(count(get_included_files()) ==1) exit("Error , Contact Khalil@khalil-shreateh.com");

?>
<!DOCTYPE html>
<html class="qp-ui">
    <head>
		<meta charset="utf-8">
		<meta name="viewport" content="initial-scale=1, width=device-width">
		<title>Sign In | Ngulikin</title>
		<?php include $_SERVER['DOCUMENT_ROOT'].'/web/library.php';?>
		<script src="js/library/FBsdk.js?jsr=<?php echo $jsversionstring; ?>"></script>
		<script src="https://apis.google.com/js/api.js?jsr=<?php echo $jsversionstring; ?>"></script>
    </head>
    <body>
        <?php
            include 'web/nav/mainMenu.php';
            include 'section_body.php';
            include 'web/nav/footerMenu.php';
            include 'web/nav/footerFloatMenu.php';
        ?>
		<script src="js/module-general.js?jsr=<?php echo $jsversionstring; ?>"></script>
		<script src="js/module-signin.js?jsr=<?php echo $jsversionstring; ?>"></script>
		<script src="js/module-onload.js?jsr=<?php echo $jsversionstring; ?>"></script>
    </script>
	</body>
</html>