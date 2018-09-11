<?php
    session_start();
    if(!isset($_SESSION['productcart'])){
        header("Location: .");
    }
    include 'web/system/minify.php';
?>
<!DOCTYPE html>
<html class="qp-ui">
    <head>
		<meta charset="utf-8">
		<meta name="viewport" content="initial-scale=1, width=device-width">
		<title>Cart | Ngulikin</title>
		<?php include $_SERVER['DOCUMENT_ROOT'].'/web/library.php';?>
		<script src="js/library/FBsdk.js?jsr=<?php echo $jsversionstring; ?>"></script>
		<script src="https://apis.google.com/js/api.js?jsr=<?php echo $jsversionstring; ?>"></script>
    </head>
    <body>
		<?php 
		      include $_SERVER['DOCUMENT_ROOT'].'/web/nav/mainMenu.php';
		      include 'section_body.php';
		      include 'web/nav/footerFloatMenu.php';
		      include $_SERVER['DOCUMENT_ROOT'].'/web/nav/footerMenu.php';
		      
		      if(isset($_SESSION['user'])){
		          $isSignin = true;
		          $fullname = $_SESSION['user']["fullname"];
		      }else{
		          $fullname = '';
		          $isSignin = false;
		      }
		?>
		<input type="hidden" class="isSignin" value="<?php echo $isSignin;?>"/>
		<input type="hidden" class="fullname_popup" value="<?php echo $fullname; ?>"/>
		<script src="js/module-general.js?jsr=<?php echo $jsversionstring; ?>"></script>
		<script src="js/module-cart.js?jsr=<?php echo $jsversionstring; ?>"></script>
		<script src="js/module-onload.js?jsr=<?php echo $jsversionstring; ?>"></script>
	</body>
</html>