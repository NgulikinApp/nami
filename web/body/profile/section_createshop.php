<div class="myprofile" id="createshop">
    <div class="headerMyprofileTransaction fn-15">Buat Toko</div>
    <div class="bodyMyprofile">
        <div class="head">Detail</div>
        <div class="body">
            <div>
                <span>Nama</span>
            </div>
            <input type="text" id="shopname" class="inputCreateShopPrivate"/>
            <div>
                <span>Logo</span>
            </div>
            <div style="position: relative;">
                <img src="../../img/no-photo.jpg" id="previewImageCreateShopPrivate" width="150" height="150"/>
                <label for="filesCreateShopPrivate" class="editPhoto"><i class="fa fa-pencil"></i></label>
                <input id="filesCreateShopPrivate" type="file" class="btnFilePhoto" style="display: inline-block;">
            </div>
            <div>
                <span>Deskripsi</span>
            </div>
            <div>
                <textarea id="shopdesc" class="inputCreateShopPrivate" cols="100" rows="5"></textarea>
            </div>
        </div>
        <div class="head">Lokasi</div>
        <div class="body">
            <div>
                <span>Provinsi</span>
            </div>
            <div style="margin: 0px;">
                <div class="select createshop_con" id="province_con" style="width: 346.833px;overflow: hidden;">
                    <select id="shopprovince"></select>
                </div>
            </div>
            <div>
                <span>Kota</span>
            </div>
            <div style="margin: 0px;">
                <div class="select createshop_con" id="city_con" style="width: 346.833px;overflow: hidden;">
                    <select id="shopcity"></select>
                </div>
            </div>
            <div>
                <span>Alamat</span>
            </div>
            <div>
                <textarea id="shopaddress" class="inputCreateShopPrivate" cols="100" rows="5"></textarea>
            </div>
        </div>
        <div class="head">Rekening</div>
        <div class="body">
            <div>
                <span style="line-height: 30px;">Nama Bank</span>
            </div>
            <div style="margin: 0px;">
                <div class="select createshop_con" id="bankname_con" style="width: 346.833px;overflow: hidden;">
                    <select id="bank_id"></select>
                </div>
            </div>
            <div>
                <span style="line-height: 30px;">Nama Pemilik</span>
            </div>
            <input type="text" id="recname" class="inputCreateShopPrivate" style="width: 346.833px;"/>
            <div>
                <span>No. Rekening</span>
            </div>
            <img src="/img/bca.png" id="recbanking" style="height:38px;"/>
            <input type="text" id="recno" class="inputCreateShopPrivate"/>
        </div>
    </div>
    <div class="footerMyprofile">
        <button id="btnSubmitCreateShop" class="fn-12">Simpan</button>
    </div>
</div>