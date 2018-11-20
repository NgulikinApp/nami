<div class="home_container">
	<section class="container profile">
	    <div class="menuProfile">
	        <ul>
	            <li id="myaccounttab" class="greytab">Akun Saya</li>
	            <li id="trackorderstab">Lacak Pesanan</li>
	            <li id="changepasswordtab">Ubah Kata Sandi</li>
	            <li id="historytab">History</li>
	            <li id="createshoptab">Buat Toko</li>
	        </ul>
	    </div>
	    <div class="contentProfile">
	        <?php 
	            include 'myaaccount/index.php';
	            include 'section_changepassword.php';
	            include 'section_createshop.php';
	        ?>
	    </div>
	</section>
</div>