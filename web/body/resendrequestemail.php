<?php include 'web/system/minify.php';?>
<?php include 'web/system/crossFrame.php';?>
<?php include 'web/system/checkDevice.php';?>
<!DOCTYPE html>
<html class="qp-ui">
    <head>
		<meta charset="utf-8">
		<meta name="viewport" content="initial-scale=1, width=device-width">
		<title>Resend Request Email | Ngulikin</title>
		<?php include $_SERVER['DOCUMENT_ROOT'].'/web/library.php';?>
    </head>
    <body>
		<div>
			<section class="container">
			    <div id="layer-signin-cont">
    				<div class="grid-signin-header">
    					<div class="grid-signup-header-icon"></div>
    					<h1>Kirim Ulang Email Aktivasi</h1>
    				</div>
    				<div class="grid-signin-body">
    				    <div class="signinBodySub">
            				<input type="text" id="emailActivation" class="inputSignin" placeholder="Email"/>
            				<i class="fa fa-user"></i>
            				<span>Masukan email yang digunakan</span>
            			</div>
            			<div class="signinBodySub signupButton">
            				<input type="button" id="buttonReset" value="Kirim"/>
            			</div>
            			<div class="signinBodySub backHomeForgot">
            				<font id="backHomeSignin">Kembali ke Halaman Utama</font>
            			</div>
    				</div>
				</div>
			</section>
		</div>
		<script src="js/module-general.js?jsr=<?php echo $jsversionstring; ?>"></script>
		<script>
			$( document ).ready(function() {
			    initGeneral();
			});
		</script>
	</body>
</html>