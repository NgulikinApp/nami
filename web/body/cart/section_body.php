<div class="home_container">
    <?php
        $cartclass = isset($_SESSION['productcart']) ? 'cart' : '';
	?>
	<section class="container <?php echo $cartclass;?>">
	    <div class="grid-shop-seller-head">
	        Keranjang Belanja
	    </div>
	    <div class="grid-shop-seller-menu fn-13">
	        <div class="cart-menu">
	            <?php
	                if(!isset($_SESSION['user'])){
	            ?>
    	            <p>Sudah punya akun ngulikin <font class="bluesky cartSignin">klik disini</font> atau masuk dengan</p>
    	            <p>
    	                <div class="iconSosmedCart fb">
    	                    <span id="iconSigninFb"></span>
    	                </div>
    	                <div class="iconSosmedCart">
    	                    <span id="iconSigninGplus"></span>
    	                </div>
    	            </p>
	            <?php
	                }else{
	            ?>
	                <p class="noaddress">Belum pernah memasukan alamat yang dituju</p>
	            <?php
	                }
	            ?>
	        </div>
	        <div class="cart-menu">
	            <p>Masukan alamat tujuan kirim dengan mengklik tombol dibawah ini</p>
	            <p><input type="button" id="buttonCartAddress" value="Masukan alamat"/></p>
	        </div>
	    </div>
	    <div class="grid-shop-seller-body cart-detail">
    	    <?php
    	        if(isset($_SESSION['productcart'])){
    	            include 'section_filledlist.php';
    	        }else{
    	            include 'section_empty.php';
    	        }
    	    ?>
	    </div>
	</section>
</div>