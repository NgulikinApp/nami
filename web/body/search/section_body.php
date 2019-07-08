<div class="home_container">
    <section class="container search">
        <div class="filter-content">
    	    <div class="content">
    	        <span id="categorySearchText" class="hidden">Kategori</span>
    	        <i class="fa fa-angle-right hidden"></i>
    	        <span id="categorySearch"></span>
    	        <span id="sortingText">Urutkan</span>
    	        <div class="select search fn-13">
        			<select id="sortingSearch">
        			    <option value="1">Terbaru</option>
        			    <option value="2">Termurah</option>
        			    <option value="3">Terlama</option>
        			    <option value="4">Termahal</option>
        			</select>
    			</div>
    			<span>Provinsi</span>
    			<div class="select search">
    			    <select id="provSearch"></select>
    			</div>
    			<span class="fiter-reg hidden">Kabupaten</span>
    			<div class="select search fiter-reg hidden">
    			    <select id="regSearch" disabled="disabled">
    			        <option value= "">- Pilih Kabupaten -</option>
    			    </select>
    			</div>
    		</div>
    		<div class="content price">
    			<span>Harga</span>
    			<input type="text" id="minPriceSearch" class="content-search fn-12" placeholder="Harga Minimum"/>
    			<input type="text" id="maxPriceSearch" class="content-search fn-12" placeholder="Harga Maksimum"/>
    	    </div>
    	    <div class="content rate">
    	        <span>Rating</span>
    	        <ul>
    	            <li>
    	                <label>
    	                    <input type="checkbox" name="rt" value="0"/>
    	                    <span class="star_0"></span>
    	                </label>
    	            </li>
    	            <li>
    	                <label>
    	                    <input type="checkbox" name="rt" value="1"/>
    	                    <span class="star_1"></span>
    	                </label>
    	            </li>
    	            <li>
    	                <label>
    	                    <input type="checkbox" name="rt" value="2"/>
    	                    <span class="star_2"></span>
    	                </label>
    	            </li>
    	            <li>
    	                <label>
    	                    <input type="checkbox" name="rt" value="3"/>
    	                    <span class="star_3"></span>
    	                </label>
    	            </li>
    	            <li>
    	                <label>
    	                    <input type="checkbox" name="rt" value="4"/>
    	                    <span class="star_4"></span>
    	                </label>
    	            </li>
    	            <li>
    	                <label>
    	                    <input type="checkbox" name="rt" value="5"/>
    	                    <span class="star_5"></span>
    	                </label>
    	            </li>
    	        </ul>
    	    </div>
    	</div>
    	<div class="result-content">
    	    <div class="result-content-tab">
                <div class="tab active tooltip fn-13" id="product">
                    <i class="fa fa-gift" style="font-size: 25px;"></i>
                    Produk
                    <span class="tooltiptext tooltip-bottom">Pencarian bersadarkan Produk</span>
                </div>
                <div class="tab tooltip fn-13" id="shop">
                    <i class="fa fa-certificate" style="font-size: 25px;"></i>
                    Toko
                    <span class="tooltiptext tooltip-bottom">Pencarian bersadarkan Nama Toko</span>
                </div>
            </div>
    	    <?php 
    	        include 'section_item.php';
    	        include 'section_notfound.php';
    	    ?>
        </div>
	</section>
</div>