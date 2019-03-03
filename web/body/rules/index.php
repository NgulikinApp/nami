<?php
    session_start();
    include 'web/system/minify.php';
?>
<!DOCTYPE html>
<html class="qp-ui">
    <head>
		<meta charset="utf-8">
		<meta name="viewport" content="initial-scale=1, width=device-width">
		<?php include $_SERVER['DOCUMENT_ROOT'].'/web/library.php';?>
		<title>
		    <?php
		        $currurl = substr($actual_link, strrpos($actual_link, '/') + 1);
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
            include $_SERVER['DOCUMENT_ROOT'].'/web/nav/mainMenu.php';
            include 'section_body.php';
            include $_SERVER['DOCUMENT_ROOT'].'/web/nav/footerMenu.php';
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