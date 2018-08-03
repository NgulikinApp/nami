<div class="home_container">
    <section class="container search">
        <div class="filter-content">
    	    <div class="content">
    	        <span id="categorySearch"></span>
    	        <span>Urutkan</span>
    	        <div class="select search">
        			<select id="sortingSearch">
        			    <option value="1">Terbaru</option>
        			    <option value="2">Termurah</option>
        			    <option value="3">Terlama</option>
        			    <option value="4">Termahal</option>
        			</select>
    			</div>
    			<span>Lokasi</span>
    			<div class="select search">
    			    <select id="locSearch">
        			    <option>- Pilih Lokasi -</option>
        			    <option>Aceh</option>
        			    <option>Bali</option>
        			    <option>Banten</option>
        			    <option>Bengkulu</option>
        			    <option>Gorontalo</option>
        			            <option>Jakarta</option>
        			            <option>Jambi</option>
        			            <option>Jawa Barat</option>
        			            <option>Jawa Tengah</option>
        			            <option>Jawa Timur</option>
        			            <option>Kalimantan Barat</option>
        			            <option>Kalimantan Selatan</option>
        			            <option>Kalimantan Tengah</option>
        			            <option>Kalimantan Timur</option>
        			            <option>Kalimantan Utara</option>
        			            <option>Kepulauan Bangka Belitung</option>
        			            <option>Kepulauan Riau</option>
        			            <option>Bali</option>
        			            <option>Lampung</option>
        			            <option>Maluku</option>
        			            <option>Maluku Utara</option>
        			            <option>Nusa Tenggara Barat</option>
        			            <option>Nusa Tenggara Timur</option>
        			            <option>Papua</option>
        			            <option>Papua Barat</option>
        			            <option>Riau</option>
        			            <option>Sulawesi Barat</option>
        			            <option>Sulawesi Selatan</option>
        			            <option>Sulawesi Tengah</option>
        			            <option>Sulawesi Tenggara</option>
        			            <option>Sulawesi Utara</option>
        			            <option>Sumatra Barat</option>
        			            <option>Sumatra Selatan</option>
        			            <option>Sumatra Utara</option>
        			            <option>Yogyakarta</option>
        			 </select>
    			</div>
    		</div>
    		<div class="content price">
    			<span>Harga</span>
    			<input type="text" id="minPriceSearch" class="content-search" placeholder="Harga Minimum"/>
    			<input type="text" id="maxPriceSearch" class="content-search" placeholder="Harga Maksimum"/>
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
                <div class="tab active tooltip" id="product">
                    <i class="tab-icons icon-product active"></i>
                    Produk
                    <span class="tooltiptext tooltip-bottom">Pencarian bersadarkan Produk</span>
                </div>
                <div class="tab tooltip" id="shop">
                    <i class="tab-icons icon-shop"></i>
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