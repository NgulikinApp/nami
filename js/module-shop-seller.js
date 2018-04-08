var shopProductPage = new Object(),
    shopBrandPage = new Object(),
    layerAccountBank = new Object(),
    dataAccount = new Object();

function initShopSetting(){
    $('#profile-shop-seller').on( 'click', function( e ){
	   $('.grid-shop-seller-menu nav div').removeClass("bluesky").removeClass('border-yellow');
	   $(this).addClass("bluesky").addClass('border-yellow');
	   $('.grid-shop-seller-content').addClass("hidden");
	   $('#profile-shop-seller-content').removeClass("hidden");
	});
	$('#brand-shop-seller').on( 'click', function( e ){
	   $('.grid-shop-seller-menu nav div').removeClass("bluesky").removeClass('border-yellow');
	   $(this).addClass("bluesky").addClass('border-yellow');
	   $(this).parent('a').css('margin-left','-5px');
	   $('.grid-shop-seller-content').addClass("hidden");
	   $('#brand-shop-seller-content').removeClass("hidden");
	});
	$('#account-shop-seller').on( 'click', function( e ){
	   $('.grid-shop-seller-menu nav div').removeClass("bluesky").removeClass('border-yellow');
	   $(this).addClass("bluesky").addClass('border-yellow');
	   $(this).parent('a').css('margin-left','-5px');
	   $('.grid-shop-seller-content').addClass("hidden");
	   $('#account-shop-seller-content').removeClass("hidden");
	});
	$('#delivery-shop-seller').on( 'click', function( e ){
	   $('.grid-shop-seller-menu nav div').removeClass("bluesky").removeClass('border-yellow');
	   $(this).addClass("bluesky").addClass('border-yellow');
	   $(this).parent('a').css('margin-left','-5px');
	   $('.grid-shop-seller-content').addClass("hidden");
	   $('#delivery-shop-seller-content').removeClass("hidden");
	});
	
	$('#day-line').milestones({
		stage: 7,
		checks: 7,
		checkclass: 'checks',
		labels: ["Senin","Selasa","Rabu","Kamis","Jumat","Sabtu","Minggu"]
	});
    
    detail();
    brandShop();
    productShop();
    listaccount();
    listdelivery();
    
    $('.add-bank-button').on( 'click', function( e ){
        layerAccountBank.action = "add";
        accountBank();
    });
}

function detail(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(detail);
    }else{
        
        $.ajax({
            type: 'GET',
            url: SHOP_API,
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.status == "OK"){
                    if($.isEmptyObject(data.result) === false){
                        var shop = '<div class="grid-shop-head">';
                            shop += '   <div class="grid-shop-head-left">';
                            shop += '       <div>';
                            shop += '           <img src="'+data.result.shop_icon+'"/>';
                            shop += '       </div>';
                            shop += '       <div>';
                            shop += '           <span class="shop-name">'+data.result.shop_name+'</span>';
                            shop += '           <span class="shop-desc">'+data.result.shop_description+'</span>';
                            shop += '       </div>';
                            shop += '   </div>';
                            shop += '   <div class="grid-shop-head-right">';
                            shop += '       <input type="button" value="Ganti" id="edit-shop-profile"/>';
                            shop += '   </div>';
                            shop += '</div>';
                            shop += '<div class="grid-shop-banner"></div>';
                            
                            $('.grid-shop-seller-body .profile .profile-seller-grid1').html(shop);
                        
                        var shop = '<div class="profile-seller-grid1">';
                            shop += '   <div class="grid-shop-banner"></div>';
                            shop += '   <div class="grid-shop-content-menu">';
                            shop += '       <div class="grid">';
                            shop += '           <div class="shop-logo">';
                            shop += '               <img src="'+data.result.shop_icon+'" height="130" width="130"/>';
                            shop += '           </div>';
                            shop += '           <div class="shop-name">'+data.result.shop_name+'</div>';
                            shop += '           <div class="shop-sum-text-brand">jumlah produk</div>';
                            shop += '           <div class="shop-sum-brand">'+data.result.shop_total_product+'</div>';
                            shop += '       </div>';
                            shop += '   </div>';
                            shop += '</div>';
                            shop += '<div class="note-footer brand">';
                            shop += '   <span>Terakhir diganti tanggal 23 Januari 2018, pukul 12.00</span>';
                            shop += '   <input type="button" value="Ganti"/>';
                            shop += '</div>';
                            
                            $('.grid-shop-seller-body .profile.menu').html(shop);
                    }
                    $('.loaderProgress').addClass('hidden');
                    
                    $('#edit-shop-profile').on( 'click', function( e ){
                	   editProfile();
                	});
                }else{
                    generateToken(detail);
                }
            } 
        });
    }
}

function editProfile(){
    var editProfile = '<div class="layerPopup">';
	    editProfile += '     <div class="editProfileSellerContainer">';
	    editProfile += '         <div class="title">Pengaturan profil toko</div>';
	    editProfile += '         <div style="overflow-y:auto;height: 402px;"><div class="body">';
	    editProfile += '            <div class="content">';
	    editProfile += '                <div class="left">';
	    editProfile += '                    <img src="/img/no-photo.jpg" id="previewLogoSeller" width="150" height="150"/>';
	    editProfile += '                    <div>';
	    editProfile += '                        <label for="filesSeller">Unggah Foto</label>';
	    editProfile += '                        <input id="filesSeller" type="file">';
	    editProfile += '                    </div>';
	    editProfile += '                </div>';
	    editProfile += '                <div class="right">';
	    editProfile += '                    <div class="grid">';
	    editProfile += '                        <label>Nama Toko</label>';
	    editProfile += '                        <input id="name-seller-edit"/>';
	    editProfile += '                    </div>';
	    editProfile += '                    <div class="grid">';
	    editProfile += '                        <label>Deskripsi Toko</label>';
	    editProfile += '                        <textarea id="desc-seller-edit" cols="58" rows="5"></textarea>';
	    editProfile += '                    </div>';
	    editProfile += '                </div>';
	    editProfile += '            </div>';
	    editProfile += '            <div class="banner">';
	    editProfile += '                <div id="drop_zone" class="drop-zone">';
	    editProfile += '                   <p class="title">Ganti Banner</p>';
	    editProfile += '                   <div class="preview-container"></div>';
	    editProfile += '                </div>';
	    editProfile += '                <input class="file_input" accept="image/*" type="file" multiple="" name="file">';
	    editProfile += '            </div>';
	    editProfile += '         </div></div>';
	    editProfile += '         <div class="footer">';
	    editProfile += '            <input type="button" value="Batal" id="cancel"/>';
	    editProfile += '            <input type="button" value="Simpan" id="save"/>';
	    editProfile += '         </div>';
	    editProfile += '     </div>';
	    editProfile += '</div>';
	       
	$("body").append(editProfile);
	
	var shop_name = $('.grid-shop-seller-body .profile.menu .profile-seller-grid1 .grid-shop-content-menu .grid .shop-name').text();
	
	$("#name-seller-edit").val(shop_name);
	
	var shop_desc = $('.shop-desc').text();
	
	$("#desc-seller-edit").val(shop_desc);
	
	var imgsrc = $('.grid-shop-head .grid-shop-head-left div img').attr('src');
	
	$('#previewLogoSeller').attr('src',imgsrc);
	
	$(".file_input").withDropZone("#drop_zone", {
      action: {
        name: "image",
        params: {
          preview: true,
        }
      },
    });
	
	$('.editProfileSellerContainer .footer #save').on( 'click', function( e ){
	    doEditProfile();
	});
	
	$('.editProfileSellerContainer .footer #cancel').on( 'click', function( e ){
	    $(".layerPopup").fadeOut();
	    $(".layerPopup").remove();
	});
	
	$("#filesSeller").change(function(){
        readURL(this);
    });
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $("#previewLogoSeller").attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function doEditProfile(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(doEditProfile);
    }else{
        var shop_name = $("#name-seller-edit").val(),
            shop_desc = $("#desc-seller-edit").val(),
            shop_icon = $('#previewLogoSeller').attr('src');
            
        $.ajax({
            type: 'POST',
            url: SHOP_EDITDETAIL_API,
            data:JSON.stringify({ 
                    shop_name: shop_name,
                    shop_desc : shop_desc,
                    shop_icon : shop_icon
            }),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                        generateToken(doEditProfile);
                }else{
                    $('.shop-name').html(data.result.shop_name);
                    $('.shop-desc').html(data.result.shop_description);
                    $('.shop-logo img').attr('src',data.result.shop_icon);
                    $('.grid-shop-head .grid-shop-head-left div img').attr('src',data.result.shop_icon);
                    
                    
                    $(".layerPopup").fadeOut();
            	    $(".layerPopup").remove();
            	    notif("info","Data sudah diubah","center","top");
                }
            }
        });
    }
}

function brandShop(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(brandShop);
    }else{
        
        $('#pagingShopSellerBrand').removeData("twbs-pagination");
        $('#pagingShopSellerBrand').unbind("page");
        
        $(".grid-shop-seller-body .brand .left").empty();
        
        if (typeof shopProductPage.page === 'undefined') {
            shopBrandPage.page = 1;
        }
        
        $.ajax({
            type: 'GET',
            url: SHOP_BRAND_API,
            data:{ 
                    page : shopBrandPage.page-1,
                    pagesize : 10
            },
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.status == "OK"){
                    var response = data.response;
                    if(response.length > 0){
                        var listProduct = '';
                        $.each( response, function( key, val ) {
                            listProduct += '<div class="list-brandseller">';
                            listProduct += '    <img src="'+val.brand_image+'" height="150" width="150"/>';
                            listProduct += '    <div>'+val.brand_name+'</div>';
                            listProduct += '    <div class="hover">';
                            listProduct += '        <img src="/img/edit-pencil.png" height="20" width="20"/>';
                            listProduct += '        <span>Ubah Produk</span>';
                            listProduct += '    </div>';
                            listProduct += '</div>';
                        });
                        
                        $(".grid-shop-seller-body .brand .left").html(listProduct);
                        
                        if(response.length > 6){
                            $('.grid-shop-seller-body .brand .left').tosrus({
                                infinite	: true,
                                slides		: {
                                    visible		: 6
                                }
                            });
                            
                            $('#pagingShopSellerBrand').twbsPagination({
                                totalPages: data.total_page,
                                visiblePages: 10,
                                startPage: shopBrandPage.page
                            }).on('page', function (event, page) {
                                shopBrandPage.page = page;
                                productShop();
                            });
                        }
                        
                        $(".grid-shop-seller-body .brand .image div").mouseover(function(){
                            $(this).children('.hover').show();
                        });
                        $(".grid-shop-seller-body .brand .image div").mouseout(function(){
                            $(this).children('.hover').hide();
                        });
                    }
                }else{
                    generateToken(brandShop);
                }
            }
        });
    }
}

function productShop(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(productShop);
    }else{
        $('#pagingShopSellerProduct').removeData("twbs-pagination");
        $('#pagingShopSellerProduct').unbind("page");
        
        $(".grid-shop-seller-body .product .right").empty();
        
        if (typeof shopProductPage.page === 'undefined') {
            shopProductPage.page = 1;
        }
        
        $.ajax({
            type: 'GET',
            url: SHOP_PRODUCT_API,
            data:{ 
                    page : shopProductPage.page-1,
                    pagesize : 10
            },
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.status == "OK"){
                    var response = data.response;
                    if(response.length > 0){
                        var listProduct = '';
                        $.each( response, function( key, val ) {
                            listProduct += '<div class="list-productseller">';
                            listProduct += '    <img src="'+val.product_image+'" height="150" width="150"/>';
                            listProduct += '    <div>';
                            listProduct += '        <label>'+val.product_name+'</label>';
                            listProduct += '        <label>IDR '+val.product_price+'</label>';
                            listProduct += '    </div>';
                            listProduct += '    <div class="hover">';
                            listProduct += '        <img src="/img/edit-pencil.png" height="20" width="20"/>';
                            listProduct += '        <span>Ubah Produk</span>';
                            listProduct += '    </div>';
                            listProduct += '</div>';
                        });
                        
                        $(".grid-shop-seller-body .product .right").html(listProduct);
                        
                        if(response.length > 6){
                            $('.grid-shop-seller-body .product .right').tosrus({
                                infinite	: true,
                                slides		: {
                                    visible		: 6
                                }
                            });
                            
                            $('#pagingShopSellerProduct').twbsPagination({
                                totalPages: data.total_page,
                                visiblePages: 10,
                                startPage: shopProductPage.page
                            }).on('page', function (event, page) {
                                shopProductPage.page = page;
                                productShop();
                            });
                        }
                        
                        $(".grid-shop-seller-body .product .image div").mouseover(function(){
                            $(this).children('.hover').show();
                        });
                        $(".grid-shop-seller-body .product .image div").mouseout(function(){
                            $(this).children('.hover').hide();
                        });
                    }
                }else{
                    generateToken(productShop);
                }
            }
        });
    }
}

function accountBank(){
    var accountBank = '<div class="layerPopup">';
	    accountBank += '    <div class="accountSellerContainer">';
	    accountBank += '        <div class="loaderProgress">';
        accountBank += '            <img src="/img/loader.gif" />';
        accountBank += '        </div>';
	    accountBank += '        <div class="title">Rekening Bank</div>';
	    accountBank += '        <div class="body">';
	    accountBank += '            <table>';
	    accountBank += '                <tr>';
	    accountBank += '                    <td>Nama Bank</td>';
	    accountBank += '                    <td>';
	    accountBank += '                        <div class="select" id="bankname_con">';
	    accountBank += '                            <select id="bankname"></select>';
	    accountBank += '                        </div>';
	    accountBank += '                    </td>';
	    accountBank += '                </tr>';
	    accountBank += '                <tr>';
	    accountBank += '                    <td>Nama Pemilik Rekening</td>';
	    accountBank += '                    <td><input type="text" id="recname"/></td>';
	    accountBank += '                </tr>';
	    accountBank += '                <tr>';
	    accountBank += '                    <td>Nomor Rekening</td>';
	    accountBank += '                    <td><img src="/img/bca.png" id="recbanking"/><input type="text" id="recno"/></td>';
	    accountBank += '                </tr>';
	    accountBank += '                <tr>';
	    accountBank += '                    <td>Password</td>';
	    accountBank += '                    <td><input type="password" id="recpass"/></td>';
	    accountBank += '                </tr>';
	    accountBank += '            </table>';
	    accountBank += '         </div>';
	    accountBank += '         <div class="warning">';
	    accountBank += '            <div class="note-warning"></div>';
	    accountBank += '            <div class="note-seller">Catatan Pelapak diperuntukkan bagi pelapak yang ingin memberikan catatan tambahan yang tidak terkait dengan deskripsi barang kepada calon pembeli. Catatan Pelapak tetap tunduk terhadap Aturan penggunaan Ngulikin.</div>';
	    accountBank += '         </div>';
	    accountBank += '         <div class="footer">';
	    accountBank += '            <input type="button" value="Batal" id="cancel"/>';
	    accountBank += '            <input type="button" value="Simpan" id="save"/>';
	    accountBank += '         </div>';
	    accountBank += '    </div>';
	    accountBank += '</div>';
	       
	$("body").append(accountBank);
	
	listbank();
	
	$('.accountSellerContainer .footer #cancel').on( 'click', function( e ){
	    $(".layerPopup").fadeOut();
	    $(".layerPopup").remove();
	});
	$('.accountSellerContainer .footer #save').on( 'click', function( e ){
	    actionAccount();
	});
	$('#bankname').on( 'change', function( e ){
	    var bankname_selected = $("#bankname option:selected").text();
	    $('#recbankimg').attr('src','/img/'+bankname_selected.toLowerCase()+'.png');
	});
}

function listbank(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(listbank);
    }else{
        $.ajax({
            type: 'GET',
            url: SHOP_BANK_API,
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.status == "OK"){
                    var bank_id = 0;
                    if(layerAccountBank.action == 'edit'){
                        var dataAccountArray = (dataAccount.data).split("~");
                        $("#recname").val(dataAccountArray[1]);
                        $('#recno').val(dataAccountArray[2]);
                        bank_id = parseInt(dataAccountArray[3]);
                        $('#recbanking').attr('src',dataAccountArray[4]);
                    }
                    
                    var listbank = '';
                    $.each( data.result, function( key, val ) {
                        var selectedbank = (parseInt(val.bank_id) == bank_id)?'selected':'';
                        listbank += '<option value="'+val.bank_id+'" '+selectedbank+'>'+val.bank_name+'</option>';
                    });
                    $('#bankname').append(listbank);
                    
                    $('.loaderProgress').addClass('hidden');
                }else{
                    generateToken(listbank);
                }
            }
        });    
    }
}

function listaccount(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(listaccount);
    }else{
            
        $.ajax({
            type: 'GET',
            url: SHOP_ACCOUNT_API,
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.status == "OK"){
                    var listaccount = '<table>';
                    $.each( data.result, function( key, val ) {
                        listaccount += '<tr>';
                        listaccount += '    <td>';
                        listaccount += '        <div class="list-bank-name">';
                        listaccount += '            <div class="left"></div>';
                        listaccount += '            <div class="right">';
                        listaccount += '                <div>ATAS NAMA</div>';
                        listaccount += '                <div id="account-name">'+val.account_name+'</div>';
                        listaccount += '            </div>';
                        listaccount += '        </div>';
                        listaccount += '    </td>';
                        listaccount += '    <td>';
                        listaccount += '        <div class="list-bank-com">'+val.bank_name+'</div>';
                        listaccount += '    </td>';
                        listaccount += '    <td>';
                        listaccount += '        <div class="list-bank-img">';
                        listaccount += '            <img src="'+val.bank_icon+'"/>';
                        listaccount += '        </div>';
                        listaccount += '    </td>';
                        listaccount += '    <td>';
                        listaccount += '        <div class="list-bank-account">';
                        listaccount += '            <div class="account-title">NOMOR REKENING</div>';
                        listaccount += '            <div class="no">'+val.account_no+'</div>';
                        listaccount += '        </div>';
                        listaccount += '    </td>';
                        listaccount += '    <td>';
                        listaccount += '        <div class="list-bank-button" datainternal-id="'+val.account_id+'~'+val.account_name+'~'+val.account_no+'~'+val.bank_id+'~'+val.bank_icon+'">';
                        listaccount += '            Ganti Rekening Bank';
                        listaccount += '        </div>';
                        listaccount += '    </td>';
                        listaccount += '</tr>';
                    });
                    listaccount += '</table>';
                    $('.list-bank').html(listaccount);
                    
                    $('.list-bank-button').on( 'click', function( e ){
                        layerAccountBank.action = "edit";
                        dataAccount.data = $(this).attr('datainternal-id');
                        accountBank();
                    });
                }else{
                    generateToken(listaccount);
                }
            }
        });    
    }
}

function actionAccount(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(actionAccount);
    }else{
        $('.accountSellerContainer .loaderProgress').removeClass('hidden');
        
        var bank_id = $("#bankname").val(),
            account_name = $("#recname").val(),
            account_no = $('#recno').val(),
            password = $('#recpass').val(),
            bank_name = $("#bankname option:selected").text(),
            bank_icon = $('#recbanking').attr('src');
            
            password = (SHA256(password)).toUpperCase();
            
            var account_id = '0';
            if(layerAccountBank.action == 'edit'){
                var dataAccountArray = (dataAccount.data).split("~");
                account_id = dataAccountArray[0];
            }
            
        $.ajax({
            type: 'POST',
            url: SHOP_ACCOUNT_ACTION_API,
            data:JSON.stringify({ 
                    method: layerAccountBank.action,
                    bank_id : bank_id,
                    account_name : account_name,
                    account_no : account_no,
                    password : password,
                    bank_name : bank_name,
                    bank_icon : bank_icon,
                    account_id : account_id
            }),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                        generateToken(actionAccount);
                }else if(data.message == 'Password is wrong'){
                    notif("error","Password tidak benar","center","top");
                }else{
                    listaccount();
                    
                    $(".layerPopup").fadeOut();
            	    $(".layerPopup").remove();
            	    notif("info","Data sudah disimpan","center","top");
                }
            }
        });
    }
}

function listdelivery(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(listdelivery);
    }else{
            
        $.ajax({
            type: 'GET',
            url: SHOP_DELIVERY_API,
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.status == "OK"){
                    var listdelivery = '<table>';
                    $.each( data.result, function( key, val ) {
                        var delivery_ismid = (val.delivery_ismid == 1)?'middle':'';
                        var is_choose = (val.is_choose == '')?'':'checked';
                        
                        listdelivery += '<div class="delivery-list '+delivery_ismid+'" datainternal-id="'+val.delivery_id+'">';
                        listdelivery += '   <input type="checkbox" class="delivery-check" value="'+val.delivery_name+'" '+is_choose+'/>';
                        listdelivery += '   <img src="/img/delivery/'+val.delivery_icon+'"/>';
                        listdelivery += '</div>';
                    });
                    $('.delivery .body').html(listdelivery);
                }else{
                    generateToken(listdelivery);
                }
            }
        });    
    }
}