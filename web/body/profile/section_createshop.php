<div class="myprofile" id="createshop">
    <div class="headerMyprofileTransaction">Buat Toko</div>
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
                <input id="filesCreateShopPrivate" type="file" class="btnFilePhoto">
            </div>
            <div>
                <span>Deskripsi</span>
            </div>
            <div>
                <textarea id="shopdesc" class="inputCreateShopPrivate" cols="50" rows="5"></textarea>
            </div>
        </div>
        <div class="head">Rekening</div>
        <div class="body">
            <div>
                <span style="line-height: 30px;">Nama Bank</span>
            </div>
            <div style="margin: 0px;">
                <div class="select" id="bankname_con" style="width: 15%;overflow: hidden;">
                    <select id="bank_id"></select>
                </div>
            </div>
            <div>
                <span style="line-height: 30px;">Nama Pemilik</span>
            </div>
            <input type="text" id="recname" class="inputCreateShopPrivate" style="width: 33.5%;"/>
            <div>
                <span>No. Rekening</span>
            </div>
            <img src="/img/bca.png" id="recbanking" style="height:38px;"/>
            <input type="text" id="recno" class="inputCreateShopPrivate" style="width: 20%;"/>
        </div>
    </div>
    <div class="footerMyprofile">
        <button id="btnSubmitCreateShop">Simpan</button>
    </div>
</div>