<div class="home_container">
    <?php
        $cartclass = isset($_SESSION['productcart']) ? 'cart' : '';
	?>
	<section class="container <?php echo $cartclass;?>">
	    <?php
	        if(isset($_SESSION['productcart'])){
	            include 'section_filledlist.php';
	        }else{
	            include 'section_empty.php';
	        }
	    ?>
	</section>
</div>