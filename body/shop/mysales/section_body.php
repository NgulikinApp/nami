<div class="home_container">
	<section class="container shop-seller">
	    <div class="grid-shop-seller-head">
	        Penjualanku
	    </div>
	    <div class="grid-shop-seller-menu">
	        <nav>
	            <a>
	                <div id="order-shop-seller" class="bluesky border-yellow">Pesanan baru<span class="newordersum">0</span></div>
	            </a>
	            <a>
	                <div id="confirm-shop-seller">Konfirmasi Pengiriman</div>
	            </a>
	            <a>
	                <div id="status-shop-seller">Status Pengiriman</div>
	            </a>
	            <a>
	                <div id="transaction-shop-seller">Daftar Transaksi Penjualan</div>
	            </a>
	        </nav>
	    </div>
	    <div class="grid-shop-seller-body">
	        <div id="order-shop-seller-content" class="grid-shop-seller-content">
	            <?php include 'section_order.php';?>
	        </div>
	        <div id="confirm-shop-seller-content" class="grid-shop-seller-content hidden">
	            <?php include 'section_confirm.php';?>
	        </div>
	        <div id="status-shop-seller-content" class="grid-shop-seller-content hidden">
	            <?php include 'section_status.php';?>
	        </div>
	        <div id="transaction-shop-seller-content" class="grid-shop-seller-content hidden">
	            <?php include 'section_transaction.php';?>
	        </div>
	    </div>
	</section>
</div>