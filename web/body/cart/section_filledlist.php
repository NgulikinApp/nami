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
                <select id="cart_province"></select>
                <select id="cart_regency"></select>
                <select id="cart_district"></select>
                <select id="cart_village"></select>
    			<textarea id="cart_address" placeholder="Alamat Lengkap"rows="7" cols="83"></textarea>
    			<input type="button" id="cartadd_btn" value="Simpan"/>
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