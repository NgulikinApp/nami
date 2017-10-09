<!DOCTYPE html>
<html class="qp-ui">
    <head>
		<meta charset="utf-8">
		<meta name="viewport" content="initial-scale=1, width=device-width">
		<title>Jual Beli Online | Ngulikin</title>
		<?php include 'web/library.php';?>
    </head>
    <body>
		<?php include 'web/nav/mainMenu.php';?>
		<?php include 'web/body/home.php';?>
		<?php include 'web/popup/signin.php';?>
		<?php include 'web/nav/footerMenu.php';?>
		<?php include 'web/body/general/init_questioner.php';?>
		
		<script src="js/module-general.js?jsr=<?php echo $jsversionstring; ?>"></script>
		<script src="js/module-home.js?jsr=<?php echo $jsversionstring; ?>"></script>
		<script src="js/custom-file-input.js?jsr=<?php echo $jsversionstring; ?>"></script>
		<script src="https://apis.google.com/js/api.js"></script>
		<script>
			$( document ).ready(function() {
			    initGeneral();
				initHome();
				
				$.tosrus.defaults.media.image = {
					filterAnchors: function( $anchor ) {
						return $anchor.attr( 'href' ).indexOf( 'www.zaskiasungkarhijab.com' ) > -1;
					}
				};
				
				$('#promo').tosrus({
					infinite	: true,
					slides		: {
						visible		: 3
					}
				});
				
				$('#best-selling').tosrus({
					infinite	: true,
					slides		: {
						visible		: 3
					}
				});
				
				$("#cslide-slides").cslide();
				
				handleClientLoad();
			});
		</script>
	</body>
</html>