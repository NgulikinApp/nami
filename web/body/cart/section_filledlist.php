<div id="cart-filledlist">
    <div class="grid-cartsum-left">
        <div id="detail-shopping">
            <div class="detail-shopping-header">
                Detail Belanja
            </div>
            <div class="detail-shopping-body"></div>
        </div>
        <div id="detail-shoppingaccount">
            <?php
                $css = "";
                $loginhide = "";
                if(!isset($_SESSION['user'])){
                    $css = 'style="background:#FFFFFF;border-bottom:2px solid #F5F5F5;"';
                }
            ?>
            <div id="RegisOrNotCart">
                <h3 class="detail-shoppingaccount-header">
                    Login
                </h3>
                <div class="detail-shoppingaccount-body">
                    <input class="inputShoppingAccountCart" id="emailSigninCart" placeholder="Username atau Email">
                    <input class="inputShoppingAccountCart" id="passSigninCart" placeholder="Password">
                    <input type="button" id="buttonSignInCart" value="Login"/>
                    <div class="socmedCart" id="signinFbCart">
                        <div>
                           <span id="iconSigninFb" class="iconSigninSocmed"></span>
                           <font>Login Facebook</font> 
                        </div>
                    </div>
                    <div class="socmedCart" id="signinGPlusCart">
                        <div>
                            <span id="iconSigninGplus" class="iconSigninSocmed"></span>
                            <font>Login Google</font>
                        </div>
                    </div>
                </div>
                <h3 class="detail-shoppingaccount-header">
                    Beli Tanpa Daftar
                </h3>
                <div class="detail-shoppingaccount-body">
                    <input class="inputShoppingAccountCart" placeholder="Nama Lengkap">
                    <input class="inputShoppingAccountCart" placeholder="Email">
                    <input class="inputShoppingAccountCart" placeholder="Telepon/Handphone">
                </div>
            </div>
            <div class="detail-shoppingaccount-footer" <?php echo $css;?>>
                <div class="title">
                    Isi Alamat Pengiriman
                </div>
                <select>
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
    			 <textarea id="descProductCart" placeholder="Alamat Lengkap"rows="7" cols="83"></textarea>
            </div>
        </div>
    </div>
    <div class="grid-cartsum-right">
        <div id="detail-summary">
            <div class="detail-summary-header" >
                Ringkasan Belanja
            </div>
            <div class="detail-summary-body">
                <div>
                    <span class="left">Total Harga Barang</span>
                    <span class="right totalPriceCart"></span>
                </div>
                <div>
                    <span class="left">Biaya Kirim</span>
                    <span class="right" id="sumProductSummaryCart"></span>
                </div>
                <hr/>
                <div>
                    <span class="left">Total Belanja</span>
                    <span class="right totalShoppingCart"></span>
                </div>
            </div>
            <div class="detail-summary-footer">
                Pilih Metode Pembayaran
            </div>
        </div>
    </div>
</div>