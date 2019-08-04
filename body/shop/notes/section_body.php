<div class="home_container">
	<section class="container shop-seller">
	    <div class="grid-shop-seller-head">
	        Catatan Toko
	    </div>
	    <div class="grid-shop-seller-menu">
	        <nav>
	            <a>
	                <div id="operational-shop-notes" class="bluesky border-yellow">Jam Operasional</div>
	            </a>
	            <a>
	                <div id="info-shop-notes">Keterangan Penjual</div>
	            </a>
	            <a>
	                <div id="close-shop-notes">Tutup Toko</div>
	            </a>
	            <a>
	                <div id="location-shop-notes">Lokasi Toko</div>
	            </a>
	            <a>
	                <div id="upload-shop-notes">Upload Foto Toko</div>
	            </a>
	        </nav>
	    </div>
	    <div class="grid-shop-seller-body">
	        <div id="operational-shop-notes-content" class="grid-shop-seller-content">
	            <?php include 'section_operational.php';?>
	        </div>
	        <div id="info-shop-notes-content" class="grid-shop-seller-content hidden">
	            <?php include 'section_info.php';?>
	        </div>
	        <div id="close-shop-notes-content" class="grid-shop-seller-content hidden">
	            <?php include 'section_close.php';?>
	        </div>
	        <div id="location-shop-notes-content" class="grid-shop-seller-content hidden">
	            <?php include 'section_location.php';?>
	        </div>
	        <div id="upload-shop-notes-content" class="grid-shop-seller-content hidden">
	            <?php include 'section_upload.php';?>
	        </div>
	    </div>
	    <div class="grid-shop-seller-footer">
	        <input type="button" value="Batal" id="cancel"/>
	        <input type="button" value="Simpan" id="save"/>
	    </div>
	</section>
</div>