<?php include 'web/system/minify.php';?>
<!DOCTYPE html>
<html class="qp-ui">
    <head>
		<meta charset="utf-8">
		<meta name="viewport" content="initial-scale=1, width=device-width">
		<?php include './web/library_detail.php';?>
		<title>
		    <?php
		        $currurl = substr($actual_link, strrpos($actual_link, '/') + 1);
                echo $title = str_replace("-"," ",$currurl); 
		    ?> | Ngulikin
		</title>
		
    </head>
    <body>
        <?php 
            include './web/nav/mainMenu.php';
            include 'section_body.php';
            include './web/nav/footerMenu.php';
            include 'web/body/general/init_questioner.php';
        ?>
		<script src="../../js/module-general.js?jsr=<?php echo $jsversionstring; ?>"></script>
		<script src="../../js/custom-file-input.js?jsr=<?php echo $jsversionstring; ?>"></script>
		<script src="../../js/module-shop.js?jsr=<?php echo $jsversionstring; ?>"></script>
		<script src="../../js/module-onload.js?jsr=<?php echo $jsversionstring; ?>"></script>
	</body>
</html>