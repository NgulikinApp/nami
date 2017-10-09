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
        <?php include $_SERVER['DOCUMENT_ROOT'].'/web/nav/sidebarMenu.php';?>
		<?php include $_SERVER['DOCUMENT_ROOT'].'/web/nav/mainMenu.php';?>
		<?php include 'section_body.php';?>
		<?php include $_SERVER['DOCUMENT_ROOT'].'/web/nav/footerMenu.php';?>
		<?php include 'web/body/general/init_questioner.php';?>
		<script src="js/module-general.js?jsr=<?php echo $jsversionstring; ?>"></script>
		<script>
			$( document ).ready(function() {
			    initGeneral();
	            $('.listTerms li[datainternal-id="terms"]').on('click', function (e) {
	                $('#termsMenu').show();
            	    $('#privacyMenu').hide();
            	    $('#faqMenu').hide();
            	    history.pushState(null, null, '/terms');
            	    
            	});
            	$('.listTerms li[datainternal-id="privacy"]').on('click', function (e) {
            	    $('#termsMenu').hide();
            	    $('#privacyMenu').show();
            	    $('#faqMenu').hide();
            	    history.pushState(null, null, '/privacy');
            	});
            	$('.listTerms li[datainternal-id="faq"]').on('click', function (e) {
            	    $('#termsMenu').hide();
            	    $('#privacyMenu').hide();
            	    $('#faqMenu').show();
            	    history.pushState(null, null, '/faq');
            	});
			});
		</script>
	</body>
</html>