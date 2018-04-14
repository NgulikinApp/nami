<?php
    session_start();
    include 'web/system/minify.php';
?>
<!DOCTYPE html>
<html class="qp-ui">
    <head>
		<meta charset="utf-8">
		<meta name="viewport" content="initial-scale=1, width=device-width">
		<?php include $_SERVER['DOCUMENT_ROOT'].'/web/library_detail.php';?>
    </head>
    <body>
        <div class="loaderProgress">
            <img src="../img/loader.gif" />
        </div>
		<?php 
		    include $_SERVER['DOCUMENT_ROOT'].'/web/nav/mainMenu.php';
		    include 'section_body.php';
		    include $_SERVER['DOCUMENT_ROOT'].'/web/nav/footerMenu.php';
		    include 'web/body/general/init_questioner.php';
		    
		    if(isset($_SESSION['user'])){
		        $isSignin = true;
		    }else{
		        $isSignin = false;
		    }
		?>
		<input type="hidden" class="isSignin" value="<?php echo $isSignin;?>"/>
		<script src="../../js/module-general.js?jsr=<?php echo $jsversionstring; ?>"></script>
		<script src="../../js/library/custom-file-input.js?jsr=<?php echo $jsversionstring; ?>"></script>
	    <script src="../../js/module-product.js?jsr=<?php echo $jsversionstring; ?>"></script>
	    <script src="../../js/module-onload.js?jsr=<?php echo $jsversionstring; ?>"></script>
	</body>
</html>