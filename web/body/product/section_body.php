<div class="home_container">
	<section class="container">
	    <div class="grid-product-container">
	        <?php include 'section_empty.php';?>
	    </div>
	    <div class="grid-product-container">
	        <div class="grid-product-body-head">
	            <span class="fn-15 info">Info</span>
	            <div id="btnFavorite" class="fn-12">
	                <i class="fa fa-heart-o"></i>
	                Tambah ke favorit
	           </div>
	        </div>
	        <div class="grid-product-body-head">
	            <div>
	                <div class="menu">
    	                <div>TERJUAL</div>
    	            </div>
    	            <div class="menu">
    	                <div>
    	                    DILIHAT
    	                </div>
    	            </div>
    	            <div class="menu">
    	                <div>
    	                    FAVORIT
    	                </div>
    	            </div>
    	            <div class="menu">
    	                <div>MERK PRODUK TOKO</div>
    	           </div>
    	           <div class="menu">
    	                <div>DIPERBARUI</div>
    	           </div>
	            </div>
	            <div>
	                <div class="menu">
    	                <div class="product_contentval" id="product_sold">0</div>
    	            </div>
    	            <div class="menu">
    	                <div class="product_contentval" id="product_viewed">0</div>
    	            </div>
    	            <div class="menu">
    	                <div class="product_contentval" id="product_liked">0</div>
    	            </div>
    	            <div class="menu">
    	                <div class="product_contentval" id="product_brand">0</div>
    	           </div>
    	           <div class="menu">
    	                <div class="product_contentval" id="modified_date">-</div>
    	           </div>
	            </div>
	        </div>
	    </div>
	    <div class="grid-shop-body">
	        <div class="grid-shop-body-head">
	            <div class="menu bluesky border-yellow">
	                <div>Deskripsi Produk</div>
	            </div>
	            <div class="menu">
	                <div>
	                    Diskusi
	                    <span id="product_total_discuss">0</span>
	                </div>
	            </div>
	            <div class="menu">
	                <div>
	                    Ulasan
	                    <span id="product_total_review">0</span>
	                </div>
	            </div>
	            <div class="menu">
	                <div>Info Ekspedisi</div>
	           </div>
	        </div>
	        <?php include 'section_desc.php';?>
	        <?php include 'section_discuss.php';?>
	        <?php include 'section_review.php';?>
	        <?php include 'section_info.php';?>
	    </div>
	    <div class="grid-product-container">
	        <?php include 'section_othersproduct.php';?>
	    </div>
	    <div class="grid-product-container">
	        <?php include 'section_recommended.php';?>
	    </div>
	</section>
</div>