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
		<?php include './web/library.php';?>
		<title>
		    <?php
		        $currurl = substr($actual_link, strrpos($actual_link, '/') + 1);
		        $rulesSelect = "class ='rulesSelect'";
		        switch($currurl){
		            case "terms" : echo "Persyaratan";break;
		            case "privacy" : echo "Privasi";break;
		            default:echo "Faq";
		        }
		    ?>
		     | Ngulikin
		</title>
    </head>
    <body>
        <?php 
            include './web/nav/mainMenu.php';
            include 'section_body.php';
            include './web/nav/footerMenu.php';
            include 'web/nav/footerFloatMenu.php';
            include 'web/nav/generalInput.php';
            
            if(isset($_SESSION['user'])){
		        $isSignin = true;
		    }else{
		        $isSignin = false;
		    }
        ?>
		<script src="js/module-general.js?jsr=<?php echo $jsversionstring; ?>"></script>
		<script src="js/module-rules.js?jsr=<?php echo $jsversionstring; ?>"></script>
	</body>
</html>