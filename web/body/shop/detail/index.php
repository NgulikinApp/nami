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
		<?php include './web/library_detail.php';?>
		<title>
		    <?php
		        $currurl = substr($actual_link, strrpos($actual_link, '/') + 1);
                echo $title = str_replace("-"," ",$currurl); 
		    ?> | Ngulikin
		</title>
		
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
        <input type="hidden" id="shop_id" value=""/>
        <input type="hidden" id="shop_discuss_id" value=""/>
		<script src="../../js/module-general.js?jsr=<?php echo $jsversionstring; ?>"></script>
		<script src="../../js/module-shop.js?jsr=<?php echo $jsversionstring; ?>"></script>
	</body>
</html>