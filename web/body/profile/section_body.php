<div class="home_container">
	<section class="container profile">
	    <div class="menuProfile">
	        <ul>
	            <li id="myaccounttab" class="greytab">Akun Saya</li>
	            <li id="trackorderstab">Lacak Pesanan</li>
	            <li id="changepasswordtab">Ubah Kata Sandi</li>
	            <li id="transactiontab">Transaksi</li>
	            <?php
	                if(intval($_SESSION['user']["shop_id"]) == 0){
	            ?>  
	                    <li id="createshoptab">Buat Toko</li>
	            <?php
	                }
	            ?>
	            
	        </ul>
	    </div>
	    <div class="contentProfile">
	        <?php 
	            include 'myaaccount/index.php';
	            include 'section_changepassword.php';
	            include 'section_transaction.php';
	            if(intval($_SESSION['user']["shop_id"]) == 0){
	                include 'section_createshop.php';
	        ?>
	        <?php
	            }
	        ?>
	    </div>
	</section>
</div>