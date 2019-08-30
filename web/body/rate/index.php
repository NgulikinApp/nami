<?php
    include 'web/system/checkDevice.php';
    session_start();
    if(!isset($_SESSION['user'])){
        header("Location: .");
    }
    include 'web/system/minify.php';
    include 'web/system/getUrl.php';
    $actual_link = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
?>
<!DOCTYPE html>
<html class="qp-ui">
    <head>
		<meta charset="utf-8">
		<meta name="viewport" content="initial-scale=1, width=device-width">
		<?php include './web/library.php';?>
		<title>Rate | Ngulikin</title>
    </head>
    <body>
        <div class="loaderProgress">
            <img src="../img/loader.gif" />
        </div>
        <input type="hidden" id="ratePage" value="1"/>
        <?php 
            include 'section_body.php';
            include 'web/nav/generalInput.php';
            
            if(isset($_SESSION['user'])){
		        $isSignin = true;
		    }else{
		        $isSignin = false;
		    }
        ?>
		<script src="js/module-general.js?jsr=<?php echo $jsversionstring; ?>"></script>
		<script src="js/module-rate.js?jsr=<?php echo $jsversionstring; ?>"></script>
	</body>
</html>