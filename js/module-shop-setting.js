var shopProductPage = {},
    layerAccountBank = {},
    dataAccount = {},
    delivery_id = {},
    selectedBrand = {},
    productLayerAction = {},
    productLayerId = {},
    productLayerData = {},
    brandLayerAction = {},
    productList = [],
    productListUrl = [];

$( document ).ready(function() {
    initGeneral();
    initShopSetting();
});

function initShopSetting(){
    var notessession = sessionStorage.getItem('notesNgulikin');
    
    if(notessession !== null){
        notif("info","Data sudah diubah","center","center");
        sessionStorage.removeItem('notesNgulikin');
    }
    
    selectedBrand.brand_id = 0;
    //setting shop
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
	
	var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    
    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
    today = yyyy+'-'+mm+'-'+dd;
	
	$('#filterMysalesDate').val(today);
    
    detail();
    detailBrand();
    brandShop();
    productShop();
    listaccount();
    listdelivery();
    
    $('.add-bank-button').on( 'click', function( e ){
        layerAccountBank.action = "add";
        accountBank();
    });
    
    $('.ui-loader').remove();
    
    $("#create-product").on( 'click', function( e ){
        productLayerAction.do = "add";
        productLayer();
        productList = [];
        productListUrl = [];
    });
    
    $("#create-brand").on( 'click', function( e ){
        brandLayerAction.do = "add";
        brandLayer();
    });
    
    $(".note input[type='button']").on( 'click', function( e ){
        location.href = url+"/shop/n";
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
                            shop += '<div class="grid-shop-banner">';
                            shop += '   <i class="fa fa-pencil"></i>';
                            shop += '</div>';
                            
                            $('#profile_shop').html(shop);
                            
                            $('#day-line').milestones({
                        		stage: 7,
                        		checkclass: 'checks',
                        		labels: ["Senin","Selasa","Rabu","Kamis","Jumat","Sabtu","Minggu"],
                        		monday:data.result.shop_monday,
                                tuesday:data.result.shop_tuesday,
                                wednesday:data.result.shop_wednesday,
                                thursday:data.result.shop_thursday,
                                friday:data.result.shop_friday,
                                saturday:data.result.shop_saturday,
                                sunday:data.result.shop_sunday
                        	});
                        	
                        	$('#time_op_from').html('Jam '+sectohour(data.result.shop_op_from));
                        	$('#time_op_to').html('Jam '+sectohour(data.result.shop_op_to));
                        	
                        	var shop_desc = (data.result.shop_desc !== '')?data.result.shop_description:'Tidak ada keterangan';
                        	$('#note-seller-info').html(shop_desc);
                        	
                        	$('.note-footer span').html(data.result.shop_notes_modifydate);
                        	
                        	var shop_closing_notes = (data.result.shop_closing_notes !== '')?data.result.shop_closing_notes:'Tidak ada keterangan';
                        	$('#close-info').html(shop_closing_notes);
                        	
                        	if(data.result.shop_close !== ''){
                        	    $('#shop_close_filled').html(data.result.shop_close);
                        	    $('#shop_close_filled').removeClass('hidden');
                        	    $('#shop_close_empty').addClass('hidden');
                        	}
                        	
                        	if(data.result.shop_open !== ''){
                        	    $('#shop_open_filled').html(data.result.shop_open);
                        	    $('#shop_open_filled').removeClass('hidden');
                        	    $('#shop_open_empty').addClass('hidden');
                        	}
                        	
                        	$('#shop_close_date').html(data.result.shop_close);
                        	$('#shop_open_date').html(data.result.shop_open);
                        	
                        	var shop_location = (data.result.shop_location !== '')?data.result.shop_location:'Belum diisi';
                        	$('#address-shop').html(shop_location);
                        	
                        	$('#owner-shop').html(data.result.fullname);
                        	$('#hp-shop').html(data.result.phone);
                        	
                        	var shop_image_location_len = data.result.shop_image_location.length;
                        	if(shop_image_location_len > 0){
                        	    var imageLocation = '<div class="image">';
                        	        imageLocation += '      <img src="'+data.result.shop_image_location[0]+'" width="200" height="200"/>';
                        	        imageLocation += '</div>';
                        	        if(shop_image_location_len > 1){
                        	            imageLocation += '<div class="listimage" style="margin-top:10px;">';
                        	            imageLocation += '      <nav>';
                        	            for(var i=0;i<shop_image_location_len;i++){
                                	        imageLocation += '      <a href="'+data.result.shop_image_location[i]+'">';
                                            imageLocation += '          <img src="'+data.result.shop_image_location[i]+'" width="50" height="50"/>';
                                            imageLocation += '      </a>';
                        	            }
                                	    imageLocation += '      </nav>';
                        	            imageLocation += '</div>';
                        	        }
                        	        
                        	    $('.list-photo-location').html(imageLocation);
                        	    
                        	    $.tosrus.defaults.media.image = {
                            		filterAnchors: function( $anchor ) {
                            			return $anchor.attr( 'href' ).indexOf( 'images.ngulikin.com' ) > -1;
                            		}
                            	};
                            	
                        	    $('.listimage a').tosrus({
                            		buttons: 'inline',
                            		pagination	: {
                            			add			: true,
                            			type		: 'thumbnails'
                            		}
                            	});
                        	}
                    }
                    
                    $('.loaderProgress').addClass('hidden');
                    $('body').removeClass('hiddenoverflow');
                    
                    var shop_banner = data.result.shop_banner;
                    if(shop_banner !== ''){
                        $(".grid-shop-banner").css("background","url("+shop_banner+")");
                    }
                    
                    $('#edit-shop-profile').on( 'click', function( e ){
                	   editProfile();
                	});
                	
                	$('.grid-shop-banner i').on( 'click', function( e ){
                	   editBanner();
                	});
                }else{
                    generateToken(detail);
                }
            } 
        });
    }
}

function detailBrand(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(detailBrand);
    }else{
        
        $.ajax({
            type: 'GET',
            url: PRODUCT_BRAND_API,
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.status == "OK"){
                    if($.isEmptyObject(data.result) === false){
                        var text_sum_product = (data.result.brand_product_count !== '')?'jumlah produk':'';
                        
                        var brand = '<div class="profile-seller-grid1">';
                            brand += '   <div class="grid-shop-banner"></div>';
                            brand += '   <div class="grid-shop-content-menu">';
                            brand += '       <div class="grid">';
                            brand += '           <div class="shop-logo">';
                            brand += '               <img src="'+data.result.brand_image+'" id="brand_image" height="130" width="130"/>';
                            brand += '           </div>';
                            brand += '           <div class="shop-name" id="brand_name">'+data.result.brand_name+'</div>';
                            brand += '           <div class="shop-sum-text-brand">'+text_sum_product+'</div>';
                            brand += '           <div class="shop-sum-brand">'+data.result.brand_product_count+'</div>';
                            brand += '       </div>';
                            brand += '   </div>';
                            brand += '</div>';
                            brand += '<div class="note-footer">';
                            brand += '   <span>'+data.result.brand_createdate+'</span>';
                            brand += '   <input type="button" value="Ganti" id="edit-brand"/>';
                            brand += '</div>';
                            
                            $('#brand_shop').html(brand);
                    }
                    $('.loaderProgress').addClass('hidden');
                    
                    var shop_banner = data.result.shop_banner;
                    if(shop_banner !== ''){
                        $(".grid-shop-banner").css("background","url("+shop_banner+")");
                    }
                    
                    $("#edit-brand").on( 'click', function( e ){
                        brandLayerAction.do = "edit";
                        brandLayer();
                    });
                }else{
                    generateToken(detailBrand);
                }
            } 
        });
    }
}

function editProfile(){
    var editProfile = '<div class="layerPopup">';
	    editProfile += '     <div class="editProfileSellerContainer">';
	    editProfile += '         <div class="title">Pengaturan profil toko</div>';
	    editProfile += '         <div style="height: 210px;"><div class="body">';
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
	    editProfile += '         </div></div>';
	    editProfile += '         <div class="footer">';
	    editProfile += '            <input type="button" value="Batal" id="cancel"/>';
	    editProfile += '            <input type="button" value="Simpan" id="save"/>';
	    editProfile += '         </div>';
	    editProfile += '        <div class="loaderPopup hidden">';
	    editProfile += '            <img src="../img/loader.gif"/>';
	    editProfile += '        </div>';
	    editProfile += '     </div>';
	    editProfile += '</div>';
	       
	$("body").append(editProfile);
	
	var shop_name = $('.grid-shop-seller-body .profile.menu .profile-seller-grid1 .grid-shop-content-menu .grid .shop-name').text();
	
	$("#name-seller-edit").val(shop_name);
	
	var shop_desc = $('.shop-desc').text();
	
	$("#desc-seller-edit").val(shop_desc);
	
	var imgsrc = $('.grid-shop-head .grid-shop-head-left div img').attr('src');
	
	$('#previewLogoSeller').attr('src',imgsrc);
	
	$('.editProfileSellerContainer .footer #save').on( 'click', function( e ){
	    doEditProfile();
	});
	
	$('.editProfileSellerContainer .footer #cancel').on( 'click', function( e ){
	    $(".layerPopup").fadeOut();
	    $(".layerPopup").remove();
	});
	
	$("#filesSeller").change(function(){
        uploadPhotoShop();
    });
}

function uploadPhotoShop(){
    var data = new FormData(),
        filePath = $('#filesSeller').val(),
        fileExt = (filePath.substr(filePath.lastIndexOf('\\') + 1).split('.')[1]).toLowerCase(),
        filePhoto = $('#filesSeller')[0].files[0],
        fileSize = filePhoto.size/ 1024 / 1024;
        
        data.append('type', 'shop');
        data.append('file', filePhoto);
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(uploadPhotoShop);
    }else{
        if(fileSize < 2){
            if(fileExt === 'jpg' || fileExt === 'png'){
                $('.loaderPopup').removeClass('hidden');
                $.ajax({
                    type: 'POST',
                    url: PUTFILE_API,
                    data: data,
                    async: true,
                    contentType: false, 
                    processData: false,
                    dataType: 'json',
                    beforeSend: function(xhr, settings) { 
                        xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
                    },
                    success: function(result){
                        $('#previewLogoSeller').attr('src',result.src);
                        $('.loaderPopup').addClass('hidden');
                    }
                });
            }else{
                notif("error","Format file hanya boleh jpg atau png","center","top");
            }
        }else{
            notif("error","File tidak boleh lebih dari 2 MB","center","top");
        }
    }
}

function doEditProfile(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(doEditProfile);
    }else{
        var shop_name = $("#name-seller-edit").val(),
            shop_desc = $("#desc-seller-edit").val();
            
        $.ajax({
            type: 'POST',
            url: SHOP_ACTION_API,
            data:JSON.stringify({ 
                    shop_name: shop_name,
                    shop_desc : shop_desc
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

function editBanner(){
    var editBanner = '<div class="layerPopup">';
	    editBanner += '     <div class="editProfileSellerContainer" style="height: 270px;">';
	    editBanner += '         <div class="title">Ubah foto sampul</div>';
	    editBanner += '         <div style="overflow-y:auto;height: 180px;"><div class="body">';
	    editBanner += '            <div class="banner">';
	    editBanner += '                <div id="drop_zone" class="drop-zone">';
	    editBanner += '                   <p class="title">Ubah Foto Sampul</p>';
	    editBanner += '                   <div class="preview-container"></div>';
	    editBanner += '                </div>';
	    editBanner += '                <input class="file_input" id="filebanner" accept="image/*" type="file" multiple="" name="file">';
	    editBanner += '                <img src="" id="tempBanner" style="display:none;">';
	    editBanner += '            </div>';
	    editBanner += '         </div></div>';
	    editBanner += '         <div class="footer">';
	    editBanner += '            <input type="button" value="Batal" id="cancel"/>';
	    editBanner += '            <input type="button" value="Simpan" id="save"/>';
	    editBanner += '         </div>';
	    editBanner += '        <div class="loaderPopup hidden">';
	    editBanner += '            <img src="../img/loader.gif"/>';
	    editBanner += '        </div>';
	    editBanner += '     </div>';
	    editBanner += '</div>';
	       
	$("body").append(editBanner);
	
	$(".file_input").withDropZone("#drop_zone", {
      action: {
        name: "image",
        params: {
          preview: true,
        }
      },
    });
    
    $('#filebanner').on( 'change', function( e ){
        if (this.files && this.files[0]) {
            var reader = new FileReader();
                reader.onload = (function(theFile) {
                    var image = new Image();
                        image.src = theFile.target.result;
                    
                        image.onload = function() {
                            if(this.width <= 1055 || this.height <= 247){
                                notif("info","ukuran foto sampul minimal 1056x248","center","top");
                                $('.preview-container').remove();
                                $('#drop_zone .title').show();
                            }else{
                                uploadPhotoBanner();
                                $("#tempBanner").attr('src', this.src);
                            }
                        };
                });
            reader.readAsDataURL(this.files[0]);
        }
    });
    
    $('.editProfileSellerContainer .footer #save').on( 'click', function( e ){
	    doEditBanner();
	});
	
	$('.editProfileSellerContainer .footer #cancel').on( 'click', function( e ){
	    $(".layerPopup").fadeOut();
	    $(".layerPopup").remove();
	});
}

function uploadPhotoBanner(){
    var data = new FormData(),
        filePath = $('#filebanner').val(),
        fileExt = (filePath.substr(filePath.lastIndexOf('\\') + 1).split('.')[1]).toLowerCase(),
        filePhoto = $('#filebanner')[0].files[0],
        fileSize = filePhoto.size/ 1024 / 1024;
        
        data.append('type', 'banner');
        data.append('file', filePhoto);
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(uploadPhotoBanner);
    }else{
        if(fileSize < 2){
            if(fileExt === 'jpg' || fileExt === 'png'){
                $('.loaderPopup').removeClass('hidden');
                $.ajax({
                    type: 'POST',
                    url: PUTFILE_API,
                    data: data,
                    async: true,
                    contentType: false, 
                    processData: false,
                    dataType: 'json',
                    beforeSend: function(xhr, settings) { 
                        xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
                    },
                    success: function(result){
                        $('.loaderPopup').addClass('hidden');
                    }
                });
            }else{
                notif("error","Format file hanya boleh jpg atau png","center","top");
            }
        }else{
            notif("error","File tidak boleh lebih dari 2 MB","center","top");
        }
    }
}

function doEditBanner(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(doEditBanner);
    }else{
        $.ajax({
            type: 'POST',
            url: SHOP_EDITBANNER_API,
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                        generateToken(doEditBanner);
                }else{
                    $(".layerPopup").fadeOut();
            	    $(".layerPopup").remove();
            	    
            	    if(data.result.shop_banner !== ''){
            	        notif("info","Data sudah diubah","center","top");
            	    
            	        $(".grid-shop-banner").css("background","url("+data.result.shop_banner+")");
            	    }
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
        
        $(".grid-shop-seller-body .brand .right").empty();
        
        $.ajax({
            type: 'GET',
            url: SHOP_BRAND_API,
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.status == "OK"){
                    var response = data.result;
                    if(response.length > 0){
                        var listBrand = '';
                        $.each( response, function( key, val ) {
                            var isSelected = val.shop_current_brand === val.brand_id ? 'chosen' : '';
                            listBrand += '<div class="list-brandseller brand'+val.brand_id+' '+isSelected+'" title="'+val.brand_name+'" datainternal-id="'+val.brand_id+'">';
                            listBrand += '    <img src="'+val.brand_image+'" height="150" width="150"/>';
                            listBrand += '    <div>'+val.brand_name+'</div>';
                            listBrand += '</div>';
                        });
                        
                        $(".grid-shop-seller-body .brand .right").html(listBrand);
                        
                        $(".grid-shop-seller-body .brand .image div").mouseover(function(){
                            $(this).children('.hover').show();
                        });
                        $(".grid-shop-seller-body .brand .image div").mouseout(function(){
                            $(this).children('.hover').hide();
                        });
                        
                        $(".list-brandseller").click(function(){
                            var brand_id = $(this).attr('datainternal-id');
                            selectedBrand.brand_id = brand_id;
                            selectBrand();
                        });
                    }
                }else{
                    generateToken(brandShop);
                }
            }
        });
    }
}

function selectBrand(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(selectBrand);
    }else{
        $.ajax({
            type: 'POST',
            url: SHOP_BRAND_SELECT_API,
            data:JSON.stringify({ 
                    brand_id : selectedBrand.brand_id
            }),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                        generateToken(selectBrand);
                }else{
                    $(".list-brandseller").removeClass('chosen');
                    $(".brand"+data.result.brand_id).addClass('chosen');
                    $("#brand_name").html(data.result.brand_name);
                    $("#brand_image").attr('src',data.result.brand_image);
                    $(".shop-sum-brand").html(data.result.brand_product_count);
                    
                    productShop();
                }
            }
        });
    }
}

function brandLayer(){
    var brandLayer = '<div class="layerPopup">';
        brandLayer += '    <div class="accountSellerContainer productLayer" style="width:550px;height: 330px;">';
        if(brandLayerAction.do === 'edit'){
            brandLayer += '        <div class="title">Ubah Brand</div>';
        }else{
            brandLayer += '        <div class="title">Buat Brand</div>';   
        }
        brandLayer += '        <div class="body" style="padding: 25px;">';
        brandLayer += '           <div class="left" style="width: 40%;">';
        brandLayer += '               <div class="midProductLayer">';
        var brand_image = '/img/uploadPhoto.png';
        if(brandLayerAction.do === 'edit'){
            brand_image = $('#brand_image').attr('src');   
        }
        brandLayer += '                   <img id="brandImageLayer" src="'+brand_image+'" width="150" height="150"/>';
        brandLayer += '                   <div>';
        brandLayer += '                         <label for="filesBrand">Unggah logo brand</label>';
        brandLayer += '                         <input id="filesBrand" type="file">';
        brandLayer += '                   </div>';
        brandLayer += '               </div>';
        brandLayer += '           </div>';
        brandLayer += '           <div class="right">';
        brandLayer += '               <div class="midProductLayer">';
        brandLayer += '                   <table class="uploadProductCont" id="dataProductCont" style="width:325px;margin: 0;">';
        brandLayer += '                       <tr>';
        brandLayer += '                           <td>Nama Brand</td>';
        var brand_name = '';
        if(brandLayerAction.do === 'edit'){
            brand_name = $('#brand_name').text();   
        }
        brandLayer += '                           <td>';
        brandLayer += '                                 <input type="text" id="brandNameLayer" value="'+brand_name+'" style="width: 200px;"/>';
        brandLayer += '                           </td>';
        brandLayer += '                       </tr>';
        brandLayer += '                   </table>';
        brandLayer += '               </div>';
        brandLayer += '           </div>';
        brandLayer += '        </div>';
        brandLayer += '        <div class="footer" style="margin-top: -40px;">';
	    brandLayer += '            <input type="button" value="Batal" id="cancel"/>';
	    brandLayer += '            <input type="button" value="Simpan" id="save"/>';
	    brandLayer += '        </div>';
	    brandLayer += '        <div class="loaderPopup hidden">';
	    brandLayer += '            <img src="../img/loader.gif"/>';
	    brandLayer += '        </div>';
        brandLayer += '     </div>';
        brandLayer += '</div>';
        
        $("body").append(brandLayer);
        
        $("#filesBrand").change(function(){
            uploadPhotoBrand();
        });
        
        $('.accountSellerContainer .footer #save').on( 'click', function( e ){
            if($('#brandNameLayer').val() !== ''){
                doActionBrand();   
            }
    	});
        
        $('.accountSellerContainer .footer #cancel').on( 'click', function( e ){
    	    $(".layerPopup").fadeOut();
    	    $(".layerPopup").remove();
    	});
}

function uploadPhotoBrand(){
    var data = new FormData(),
        filePath = $('#filesBrand').val(),
        fileExt = (filePath.substr(filePath.lastIndexOf('\\') + 1).split('.')[1]).toLowerCase(),
        filePhoto = $('#filesBrand')[0].files[0],
        fileSize = filePhoto.size/ 1024 / 1024;
        
        data.append('type', 'brand');
        data.append('file', filePhoto);
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(uploadPhotoBrand);
    }else{
        if(fileSize < 2){
            if(fileExt === 'jpg' || fileExt === 'png'){
                $('.loaderPopup').removeClass('hidden');
                $.ajax({
                    type: 'POST',
                    url: PUTFILE_API,
                    data: data,
                    async: true,
                    contentType: false, 
                    processData: false,
                    dataType: 'json',
                    beforeSend: function(xhr, settings) { 
                        xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
                    },
                    success: function(result){
                        $('#brandImageLayer').attr('src',result.src);
                        $('.loaderPopup').addClass('hidden');
                    }
                });
            }else{
                notif("error","Format file hanya boleh jpg atau png","center","top");
            }
        }else{
            notif("error","File tidak boleh lebih dari 2 MB","center","top");
        }
    }
}

function doActionBrand(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(doActionBrand);
    }else{
        $.ajax({
            type: 'POST',
            url: PRODUCT_BRAND_ACTION_API,
            data:JSON.stringify({
                    method : brandLayerAction.do,
                    //brand_image: $('#brandImageLayer').attr('src'),
                    brand_name : $("#brandNameLayer").val()
            }),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                        generateToken(doActionBrand);
                }else{
                    $(".layerPopup").fadeOut();
    	            $(".layerPopup").remove();
                    brandShop();
                    if(brandLayerAction.do === 'edit'){
                        $('#brand_image').attr('src',data.result.brand_image);
                        $('#brand_name').html(data.result.brand_name);
                    }
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
                            listProduct += '<div class="list-productseller" data-shopname="'+val.shop_name+'" data-productname="'+val.product_name+'">';
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
                        
                        $(".list-productseller").on( 'click', function( e ){
                            productLayerAction.do = "edit";
                            
                            var shopname = ($(this).data("shopname")).split(' ').join('-'),
                            productname = ($(this).data("productname")).split(' ').join('-');
                        
                            productLayerId.id = shopname+"/"+productname;
                            productLayer();
                            productList = [];
                            productListUrl = [];
                        });
                    }
                }else{
                    generateToken(productShop);
                }
            }
        });
    }
}

function productLayer(){
    var stockNgulikin = 1,
        minNgulikin = 1;
    
    var productLayer = '<div class="layerPopup">';
        productLayer += '    <div class="accountSellerContainer productLayer">';
        productLayer += '        <div class="title">Upload Gambar</div>';
        productLayer += '        <div class="body">';
        productLayer += '           <div class="left">';
        productLayer += '               <div class="titleProductLayer">';
        productLayer += '                   UPLOAD/DRAG FOTO';
        productLayer += '               </div>';
        productLayer += '               <div class="midProductLayer">';
        productLayer += '                   <label for="filesProduct">';
        productLayer += '                       <img id="productImageLayer" src="/img/uploadPhoto.png" width="250" height="250" align="right"/>';
        productLayer += '                   <label>';
        productLayer += '                   <input type="file" id="filesProduct" name="file[]" multiple="multiple"/>';
        productLayer += '               </div>';
        productLayer += '               <div class="footerProductLayer">';
        productLayer += '                   <div id="photoProductList"></div>';
        productLayer += '               </div>';
        productLayer += '           </div>';
        productLayer += '           <div class="right">';
        productLayer += '               <div class="titleProductLayer">';
        productLayer += '                   <div id="dataProductLayer" class="titleProductLayerTab border-yellow bluesky">';
        productLayer += '                       DATA PRODUK';
        productLayer += '                   </div>';
        productLayer += '                   <div id="detailProductLayer" class="titleProductLayerTab">';
        productLayer += '                       DETAIL PRODUK';
        productLayer += '                   </div>';
        productLayer += '               </div>';
        productLayer += '               <div class="midProductLayer">';
        productLayer += '                   <table class="uploadProductCont" id="dataProductCont">';
        productLayer += '                       <tr>';
        productLayer += '                           <td>Nama Produk</td>';
        productLayer += '                           <td><input type="text" id="productNameLayer"/></td>';
        productLayer += '                       </tr>';
        productLayer += '                       <tr>';
        productLayer += '                           <td>Kategori Produk</td>';
        productLayer += '                           <td id="categoryProductLayerCont">';
        productLayer += '                               <div class="select">';
        productLayer += '                                   <select id="categoryProductLayer"></select>';
        productLayer += '                               </div>';
        productLayer += '                           </td>';
        productLayer += '                       </tr>';
        productLayer += '                       <tr>';
        productLayer += '                           <td>Subkategori Produk</td>';
        productLayer += '                           <td id="subcategoryProductLayerCont">';
        productLayer += '                               <div class="select">';
        productLayer += '                                   <select id="subcategoryProductLayer"></select>';
        productLayer += '                               </div>';
        productLayer += '                           </td>';
        productLayer += '                       </tr>';
        productLayer += '                       <tr>';
        productLayer += '                           <td id="descLabel">Deskripsi Produk</td>';
        productLayer += '                           <td><textarea id="descProductLayer" cols="35" rows="7"></textarea></td>';
        productLayer += '                       </tr>';
        productLayer += '                   </table>';
        productLayer += '                   <table class="uploadProductCont hidden" id="detailProductCont">';
        productLayer += '                       <tr>';
        productLayer += '                           <td style="width:">Harga Produk</td>';
        productLayer += '                           <td>';
        productLayer += '                               <div class="blueCont" id="rpProductPrice">Rp</div>';
        productLayer += '                               <div style="margin-left: -3px;"><input type="text" id="productPriceLayer" placeholder="20000000"/></div>';
        productLayer += '                           </td>';
        productLayer += '                       </tr>';
        productLayer += '                       <tr>';
        productLayer += '                           <td>Perkiraan Berat</td>';
        productLayer += '                           <td>';
        productLayer += '                               <div><input type="text" id="productWeight" placeholder="1"/></div><div class="blueCont" id="productWeightLayer">gram</div>';
        productLayer += '                           </td>';
        productLayer += '                       </tr>';
        productLayer += '                       <tr>';
        productLayer += '                           <td>Stok Barang</td>';
        productLayer += '                           <td>';
        productLayer += '                               <div class="redCont productCalcMin" id="minStock">-</div><div><input type="text" class="productCalc" id="productStockLayer" value="1"/></div><div class="blueCont productCalcPlus" id="plusStock">+</div>';
        productLayer += '                           </td>';
        productLayer += '                       </tr>';
        productLayer += '                       <tr>';
        productLayer += '                           <td>Pembelian Minimum</td>';
        productLayer += '                           <td>';
        productLayer += '                               <div class="redCont productCalcMin" id="minMin">-</div><div><input type="text" class="productCalc" id="productMiniLayer" value="1"/></div><div class="blueCont productCalcPlus" id="plusMin">+</div>';
        productLayer += '                           </td>';
        productLayer += '                       </tr>';
        productLayer += '                       <tr>';
        productLayer += '                           <td>Kondisi Barang</td>';
        productLayer += '                           <td>';
        productLayer += '                               <input type="radio" name="productCondLayer" id="newProduct" value="0"/><label style="margin-right: 40px;">Baru</label>';
        productLayer += '                               <input type="radio" name="productCondLayer" id="oldProduct" value="1"/><label>Bekas</label>';
        productLayer += '                           </td>';
        productLayer += '                       </tr>';
        productLayer += '                   </table>';
        productLayer += '               </div>';
        productLayer += '           </div>';
        productLayer += '        </div>';
        productLayer += '        <div class="footer">';
	    productLayer += '            <input type="button" value="Batal" id="cancel"/>';
	    productLayer += '            <input type="button" value="Simpan" id="save"/>';
	    productLayer += '        </div>';
	    productLayer += '        <div class="loaderPopup hidden">';
	    productLayer += '            <img src="../img/loader.gif"/>';
	    productLayer += '        </div>';
        productLayer += '    </div>';
        productLayer += '</div>';
    
    $("body").append(productLayer);
	
	if(productLayerAction.do === "edit"){
	    detailProduct();
	}else{
	    getcategory(1,0);
	    $('#newProduct').attr('checked','checked');
	}
    
    $('.accountSellerContainer .footer #cancel').on( 'click', function( e ){
	    $(".layerPopup").fadeOut();
	    $(".layerPopup").remove();
	    productList = [];
	});
	
	$('#categoryProductLayer').on( 'change', function( e ){
	    var categoryProductStorage = sessionStorage.getItem("categoryProduct"),
	        listsubcategory = ''
	        category_id = parseInt($(this).val());
        
        $.each( JSON.parse(categoryProductStorage) , function( key, val ) {
            if(val.category_id === category_id){
                $.each( val.subcategory , function( subkey, subval ) {
                    listsubcategory += '<option value="'+subval.subcategory_id+'">'+subval.subcategory_name+'</option>';
                });
            }
        });
                        
        $("#subcategoryProductLayer").html(listsubcategory);
    });
	
	$("#productPriceLayer,#productWeight,#productStockLayer,#productMiniLayer").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl/cmd+A
            (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
             // Allow: Ctrl/cmd+C
            (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
             // Allow: Ctrl/cmd+X
            (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
	
	$('#dataProductLayer').on( 'click', function( e ){
	    $('.titleProductLayerTab').removeClass("bluesky").removeClass('border-yellow');
	    $(this).addClass("bluesky").addClass('border-yellow');
	    $('#detailProductCont').addClass('hidden');
	    $('#dataProductCont').removeClass('hidden');
	});
	
	$('#detailProductLayer').on( 'click', function( e ){
	    $('.titleProductLayerTab').removeClass("bluesky").removeClass('border-yellow');
	    $(this).addClass("bluesky").addClass('border-yellow');
	    $('#dataProductCont').addClass('hidden');
	    $('#detailProductCont').removeClass('hidden');
	});
    
    $('#minStock').css('opacity','0.5');
    $('#minMin').css('opacity','0.5');
    
    
    $('#minStock').on('click', function (e) {
        stockNgulikin = stockNgulikin - 1;
        if(stockNgulikin <= 0){
            stockNgulikin = 1
        }
        if(stockNgulikin === 1){
            $(this).css('opacity','0.5');
        }
        $('#productStockLayer').val(stockNgulikin);
    });
    
    $('#plusStock').on('click', function (e) {
        stockNgulikin = stockNgulikin + 1;
        if(stockNgulikin !== 1){
            $('#minStock').css('opacity','1');
        }
        $('#productStockLayer').val(stockNgulikin);
    });
    
    $('#minMin').on('click', function (e) {
        minNgulikin = minNgulikin - 1;
        if(minNgulikin <= 0){
            minNgulikin = 1
        }
        if(minNgulikin === 1){
            $(this).css('opacity','0.5');
        }
        $('#productMiniLayer').val(minNgulikin);
    });
    
    $('#plusMin').on('click', function (e) {
        minNgulikin = minNgulikin + 1;
        if(minNgulikin !== 1){
            $('#minMin').css('opacity','1');
        }
        $('#productMiniLayer').val(minNgulikin);
    });
    
    $("#filesProduct").change(function(){
        uploadPhotoProduct();
    });
    
    $('.productLayer #save').on('click', function (e) {
        productLayerData.product_name = $('#productNameLayer').val();
        productLayerData.product_description = $('#descProductLayer').val();
        productLayerData.product_price = $('#productPriceLayer').val();
        productLayerData.product_category = $('#categoryProductLayer').val();
        productLayerData.product_subcategory = $('#subcategoryProductLayer').val();
        productLayerData.product_weight = $('#productWeight').val();
        productLayerData.product_stock = $('#productStockLayer').val();
        productLayerData.product_minimum = $('#productMiniLayer').val();
        productLayerData.product_condition = $('input[name="productCondLayer"]:checked').val();
        actionProductLayer();
    });
}

function uploadPhotoProduct(){
    var data = new FormData(),
        filePath = $('#filesProduct').val(),
        fileExt = (filePath.substr(filePath.lastIndexOf('\\') + 1).split('.')[1]).toLowerCase(),
        filePhoto = $('#filesProduct')[0].files[0],
        fileSize = filePhoto.size/ 1024 / 1024;
        
        data.append('type', 'product');
        data.append('file', filePhoto);
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(uploadPhotoProduct);
    }else{
        if(fileSize < 2){
            if(fileExt === 'jpg' || fileExt === 'png'){
                $('.loaderPopup').removeClass('hidden');
                $.ajax({
                    type: 'POST',
                    url: PUTFILE_API,
                    data: data,
                    async: true,
                    contentType: false, 
                    processData: false,
                    dataType: 'json',
                    beforeSend: function(xhr, settings) { 
                        xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
                    },
                    success: function(result){
                        productList.push(result.src);
                        $('.loaderPopup').addClass('hidden');
                        
                        readProductURL();
                    }
                });
            }else{
                notif("error","Format file hanya boleh jpg atau png","center","top");
            }
        }else{
            notif("error","File tidak boleh lebih dari 2 MB","center","top");
        }
    }
}

function readProductURL() {
    var fileListDisplay = document.getElementById('photoProductList');
    fileListDisplay.innerHTML = '';
    productList.forEach(function (file, index) {
        
        var img = document.createElement("img");
            img.setAttribute("src", file);
            img.setAttribute("width", "60");
            img.setAttribute("height", "60");
          
          fileListDisplay.appendChild(img);
    });
    
    $('#photoProductList').tosrus({
        infinite	: true,
            slides		: {
            visible		: 3
        }
    });
}

function getcategory(category_id,subcategory_id){
    var categoryProductStorage = sessionStorage.getItem("categoryProduct");
	if(categoryProductStorage === null){
	    categoryProductLayer(category_id,subcategory_id);
	}else{
	    bindCategoryProductLayer(JSON.parse(categoryProductStorage),category_id,subcategory_id);
	}
}

function categoryProductLayer(category_id){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(categoryProductLayer);
    }else{
        $.ajax({
            type: 'GET',
            url: PRODUCT_CATEGORY_API,
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.status == "OK"){
                	sessionStorage.setItem("categoryProduct",JSON.stringify(data.result));
                	bindCategoryProduct(data.result);
                }else{
                    generateToken(categoryProductLayer);
                }
            } 
        });
    }
}

function bindCategoryProductLayer(data,category_id,subcategory_id){
    var listcategory = '';
    var listsubcategory = '';
    
    $.each( data , function( key, val ) {
        var selectedcategory = (val.category_id === category_id) ? 'selected' : '';
        listcategory += '<option value="'+val.category_id+'" '+selectedcategory+'>'+val.category_name+'</option>';
        if(val.category_id === category_id){
            $.each( val.subcategory , function( subkey, subval ) {
                var selectedsubcategory = (subval.subcategory_id === subcategory_id) ? 'selected' : '';
                listsubcategory += '<option value="'+subval.subcategory_id+'" '+selectedsubcategory+'>'+subval.subcategory_name+'</option>';
            });
        }
    });
                    
    $("#categoryProductLayer").html(listcategory);
    $("#subcategoryProductLayer").html(listsubcategory);
}

function detailProduct(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(detailProduct);
    }else{
        $.ajax({
            type: 'GET',
            url: PRODUCT_API+'/'+productLayerId.id,
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.status == "OK"){
                    $('#productNameLayer').val(data.result.product_name);
                    $('#descProductLayer').val(data.result.product_description);
                    $('#productPriceLayer').val(data.result.product_price);
                    $('#productStockLayer').val(data.result.product_stock);
                    $('#productMiniLayer').val(data.result.product_minimum);
                    $('#productWeight').val(data.result.product_weight);
                    
                    if(parseInt(data.result.product_condition) === 0){
                        $('#newProduct').attr('checked','checked');
                    }else{
                        $('#oldProduct').attr('checked','checked');
                    }
                    
                    getcategory(data.result.category_id,data.result.subcategory_id);
                    
                    var product_images_len = data.result.product_image.length;
                    
                    var product = '';
                    for(var i=0;i<product_images_len;i++){
                        product += '<div class="col-md-9">';
                        product += '    <img src="'+data.result.product_image[i]+'"/>';
                        product += '</div>';
                    }
                    
                    $('#photoProductList').html(product);
                    
                    $('#photoProductList').tosrus({
                        infinite	: true,
                        slides		: {
                            visible		: 3
                        }
                    });
                }else{
                    generateToken(detailProduct);
                }
            } 
        });
    }
}

function actionProductLayer(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(actionProductLayer);
    }else{
        $.ajax({
            type: 'POST',
            url: PRODUCT_ACTION_API,
            async: true,
            contentType: false, 
            processData: false,
            data:JSON.stringify({
                    method : productLayerAction.do,
                    product_id : productLayerId.id,
                    product_name : productLayerData.product_name,
                    product_description : productLayerData.product_description,
                    product_price : productLayerData.product_price ,
                    product_weight : productLayerData.product_weight,
                    product_stock : productLayerData.product_stock,
                    product_minimum : productLayerData.product_minimum,
                    product_condition : productLayerData.product_condition
            }),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                    generateToken(actionProductLayer);
                }else{
                    productShop();
                    
                    $(".layerPopup").fadeOut();
	                $(".layerPopup").remove();
                    
            	    notif("info","Data sudah disimpan","center","top");
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
	    $('#recbanking').attr('src','/img/'+bankname_selected.toLowerCase()+'.png');
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
                        listbank += '<option value="'+val.bank_id+'" '+selectedbank+'>'+(val.bank_name).toUpperCase()+'</option>';
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
                    $('.loaderProgress').addClass('hidden');
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
                    $.each( data.result.list, function( key, val ) {
                        var delivery_ismid = (val.delivery_ismid == 1)?'middle':'';
                        var is_choose = (val.is_choose)?'checked':'';
                        
                        listdelivery += '<div class="delivery-list '+delivery_ismid+'" datainternal-id="'+val.delivery_id+'">';
                        listdelivery += '   <input type="checkbox" class="delivery-check" value="'+val.delivery_id+'" '+is_choose+'/>';
                        listdelivery += '   <img src="/img/delivery/'+val.delivery_icon+'"/>';
                        listdelivery += '</div>';
                    });
                    $('.delivery .body').html(listdelivery);
                    $('.delivery .footer span').html(data.result.modify_date);
                    
                    $('#editDelivery').on( 'click', function( e ){
                        var delivery_idlist = '';
                            var i = 0;
                        $('.delivery-check:checked').each(function() {
                            if(i === 0){
                               delivery_idlist += this.value; 
                            }else{
                               delivery_idlist += ','+this.value;  
                            }
                            i++;
                        });
                        delivery_id.list = delivery_idlist;
                        actionDelivery();
                    });
                }else{
                    generateToken(listdelivery);
                }
            }
        });    
    }
}

function actionDelivery(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(actionDelivery);
    }else{
        $.ajax({
            type: 'POST',
            url: SHOP_DELIVERY_ACTION_API,
            data:JSON.stringify({ 
                    shop_delivery: delivery_id.list
            }),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                        generateToken(actionDelivery);
                }else{
            	    notif("info","Data sudah disimpan","center","top");
                }
            }
        });
    }
}