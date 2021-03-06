var search = {};

$( document ).ready(function() {
    initGeneral();
    initProfile();
});

function initProfile(){
    var trackordertab = sessionStorage.getItem('track_orderNgulikin'),
        createshoptab = sessionStorage.getItem('create_shopNgulikin');
    
    profile();
    if($('.ishasShop').val() === '0'){
        $('.ui-select').css("width","100%");
        
        provinces();
        search.province = 11;
        regencies();
        
        listbank();
        
        $('#province_con span').remove();
        $('#city_con span').remove();
        $('#bankname_con span').remove();
        
        var cnt = $("#recno").parent().contents();
        $("#recno").parent().replaceWith(cnt);
        
        $('#bank_id-button,#shopprovince-button,#shopcity-button').css({"width":"100%","margin":"5px 0px"});
        
        $('#bank_id').on( 'change', function( e ){
            $('#bank_id-button span').remove();
            
            var bankname_selected = $("#bank_id option:selected").text();
    	    $('#recbanking').attr('src','/img/'+bankname_selected.toLowerCase()+'.png');
        });
        
        $("#filesCardCreateShopPrivate").change(function(){
            uploadCardPhotoShop();
        });
        
        $("#filesSelfieCreateShopPrivate").change(function(){
            uploadSelfiePhotoShop();
        });
        
        $('#btnSubmitCreateShop').on( 'click', function( e ){
            if($('#recno').val() === ''){
                notif("error","Nomor rekening harus diisi","center","top");
            }else if($('#recname').val() === ''){
                notif("error","Nama pemilik rekening harus diisi","center","top");
            }else if($('#filesCreateShopPrivate').val() === ''){
                notif("error","Nama toko harus diisi","center","top");
            }else if($('#filesCreateShopPrivate').val() === ''){
                notif("error","Logo toko harus dilampirkan","center","top");
            }else if($('#previewCardCreateShopPrivate').attr('src') === url+'/img/ktp.png'){
                $('#myaccounttab').trigger('click');
                $('#ui-id-2').trigger('click');
                notif("error","Foto KTP/Kartu Pelajar/SIM harus diupdate dahulu","center","top");
            }else if($('#previewSelfieCreateShopPrivate').attr('src') === url+'/img/selfie.png'){
                $('#myaccounttab').trigger('click');
                $('#ui-id-2').trigger('click');
                notif("error","Foto selfie dengan KTP/Kartu Pelajar/SIM harus diupdate dahulu","center","top");
            }else{
                doCreateShop();
            }
        });
    }
    
    $('#myaccounttab').on( 'click', function( e ){
        $('.myprofile').removeClass('active');
        $('#myaccount').addClass('active');
        
        $('.menuProfile ul li').removeClass('greytab');
        $(this).addClass('greytab');
    });
    
    $('#trackorderstab').on( 'click', function( e ){
        $('.myprofile').removeClass('active');
        $('#orderprocess').addClass('active');
        
        $('.menuProfile ul li').removeClass('greytab');
        $(this).addClass('greytab');
        orderprocess();
    });
    
    $('#filterOrderProcessDate').on( 'change', function( e ){
        orderprocess();
    });
    
    $('#filterOrderProcessInput').keypress(function(e) {
	    if(e.which == 13) {
    	    orderprocess();
	    }
	});
	
	$('#search-orderprocess').on( 'click', function( e ){
	    orderprocess();
	});
    
    $('#changepasswordtab').on( 'click', function( e ){
        $('.myprofile').removeClass('active');
        $('#changepassword').addClass('active');
        
        $('.menuProfile ul li').removeClass('greytab');
        $(this).addClass('greytab');
    });
    
    $('#transactiontab').on( 'click', function( e ){
        $('.myprofile').removeClass('active');
        $('#transaction').addClass('active');
        
        $('.menuProfile ul li').removeClass('greytab');
        $(this).addClass('greytab');
        transaction();
    });
    
    $('#filterMysalesDate').on( 'change', function( e ){
        transaction();
    });
    
    $('#filterMysalesInput').keypress(function(e) {
	    if(e.which == 13) {
    	    transaction();
	    }
	});
	
	$('#search-transaction').on( 'click', function( e ){
	    transaction();
	});
    
    $('#createshoptab').on( 'click', function( e ){
        $('.myprofile').removeClass('active');
        $('#createshop').addClass('active');
        
        $('.menuProfile ul li').removeClass('greytab');
        $(this).addClass('greytab');
    });
    
    $('#btnSubmitMyprofile').on( 'click', function( e ){
        updateProfile();
    });
    
    $("#filesCreateShopPrivate").change(function(){
        uploadPhotoShop();
    });
    
    var cnt = $("#fullnameField").contents();
    $("#fullnameField").replaceWith(cnt);
    var cnt = $("#dobField").contents();
    $("#dobField").replaceWith(cnt);
    var cnt = $("#usernameField").contents();
    $("#usernameField").replaceWith(cnt);
    var cnt = $("#phoneField").contents();
    $("#phoneField").replaceWith(cnt);
    var cnt = $("#emailField").contents();
    $("#emailField").replaceWith(cnt);
    var cnt = $("#malePrivate").parent().contents();
    $("#malePrivate").parent().replaceWith(cnt);
    var cnt = $("#femalePrivate").parent().contents();
    $("#femalePrivate").parent().replaceWith(cnt);
    var cnt = $("#studentPrivate").parent().contents();
    $("#studentPrivate").parent().replaceWith(cnt);
    var cnt = $("#othersPrivate").parent().contents();
    $("#othersPrivate").parent().replaceWith(cnt);
    var cnt = $("#filesCreateShopPrivate").parent().contents();
    $("#filesCreateShopPrivate").parent().replaceWith(cnt);
    var cnt = $("#filesCardCreateShopPrivate").parent().contents();
    $("#filesCardCreateShopPrivate").parent().replaceWith(cnt);
    var cnt = $("#filesSelfieCreateShopPrivate").parent().contents();
    $("#filesSelfieCreateShopPrivate").parent().replaceWith(cnt);
    
    $('.ui-loader').remove();
    
    $('#emailSignin,#passwordSignin').keypress(function(e) {
	    if(e.which == 13) {
    	    $('#btnSubmitPassMyprofile').trigger('click');
	    }
	});
    
    $('#btnSubmitPassMyprofile').on( 'click', function( e ){
        if($('#oldpassword').val() === '' || $('#newpassword').val() === '' || $('#newpassword_confirm').val() === ''){
            notif("error","Semua input harus diisi","center","top");
        }else if($('#newpassword').val() !== $('#newpassword_confirm').val()){
            notif("error","Password baru dan konfirmasi password baru tidak sama","center","top");
        }else{
            updatePassword();
        }
    });
    
    $('#filesPrivate').on( 'change', function( e ){
        uploadPhoto();
    });
    
    if(trackordertab !== null){
        $('#trackorderstab').trigger('click');
        sessionStorage.removeItem('track_orderNgulikin');
	}
	
	if(createshoptab !== null){
	    $('#createshoptab').trigger('click');
        sessionStorage.removeItem('create_shopNgulikin');
	}
}

function provinces(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("provinces");
    }else{
        $.ajax({
            type: 'GET',
            url: ADMINISTRATIVE_API,
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.status == "OK"){
                    var response = data.result;
                    
                    var listElement = '';
                    $.each( response, function( key, val ) {
                        listElement += '<option value="'+val.id+'">'+val.name+'</option>';
                    });
                    
                    $("#shopprovince").html(listElement);
                }else{
                    generateToken("provinces");
                }
            } 
        });
    }
}

function regencies(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("regencies");
    }else{
        $.ajax({
            type: 'GET',
            url: ADMINISTRATIVE_API,
            data:{
                id : search.province
            },
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.status == "OK"){
                    var response = data.result;
                    
                    var listElement = '';
                    $.each( response, function( key, val ) {
                        listElement += '<option value="'+val.id+'">'+val.name+'</option>';
                        
                        if(search.regency === ''){
                            search.regency = val.id;
                            districts();   
                        }
                    });
                    
                    $("#shopcity").html(listElement);
                }else{
                    generateToken("regencies");
                }
            } 
        });
    }
}

function uploadPhoto(){
    var data = new FormData(),
        filePath = $('#filesPrivate').val(),
        fileExt = (filePath.substr(filePath.lastIndexOf('\\') + 1).split('.')[1]).toLowerCase(),
        filePhoto = $('#filesPrivate')[0].files[0],
        fileSize = filePhoto.size/ 1024 / 1024;
        
        data.append('type', 'profile');
        data.append('file', filePhoto);
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("uploadPhoto");
    }else{
        if(fileSize < 2){
            if(fileExt === 'jpg' || fileExt === 'png'){
                $('.loaderProgress').removeClass('hidden');
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
                        $('#previewImagePrivate').attr('src',result.src);
                        $('.loaderProgress').addClass('hidden');
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

function profile(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("profile");
    }else{
        
        $.ajax({
            type: 'GET',
            url: PROFILE_API,
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.status == "OK"){
                    if($.isEmptyObject(data.result) === false){
                        $('#fullnamePrivate').val(data.result.fullname);
                        $('#dobPrivate').val(data.result.dob);
                        $('#usernamePrivate').val(data.result.username);
                        if(data.result.gender == 'male'){
                            $('#malePrivate').attr("checked","checked");
                        }else{
                            $('#femalePrivate').attr("checked","checked");
                        }
                        if(data.result.user_status_id == '1'){
                            $('#studentPrivate').attr("checked","checked");
                        }else{
                            $('#othersPrivate').attr("checked","checked");
                        }
                        $('#phonePrivate').val(data.result.phone);
                        $('#emailPrivate').val(data.result.email);
                        $('#previewImagePrivate').attr("src",data.result.user_photo);
                        $('#previewCardCreateShopPrivate').attr("src",data.result.user_card);
                        $('#previewSelfieCreateShopPrivate').attr("src",data.result.user_selfie);
                        
                        if(data.result.fullname !== ''){
                            document.title = (data.result.fullname).toUpperCase() + ' | Ngulikin';
                        }
                        $('.loaderProgress').addClass('hidden');
                    }
                }else{
                    generateToken("profile");
                }
            } 
        });
    }
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $("#previewImagePrivate").attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function updateProfile(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("updateProfile");
    }else{
        
        $('.loaderProgress').removeClass('hidden');
        $.ajax({
            type: 'POST',
            url: PROFILE_UPDATE_API,
            data:JSON.stringify({ 
                    fullname : $('#fullnamePrivate').val(),
                    dob : $('#dobPrivate').val(),
                    gender : $('input[name=sexPrivate]:checked').val(),
                    phone : $('#phonePrivate').val(),
                    status : $('input[name=statusPrivate]:checked').val()
            }),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                    generateToken("updateProfile");
                }else if(data.message == 'Invalid key'){
                    localStorage.removeItem('emailNgulikin');
                    sessionStorage.setItem("logoutNgulikin", 1);
                    localStorage.removeItem('authNgulikin');
                    location.href = url;
                    localStorage.getItem('authNgulikin')
                }else{
                    $('.loaderProgress').addClass('hidden');
                    $('#iconProfile').css('background-image','url('+data.result.user_photo+')');
                    notif("success","Data anda sudah diperbarui","center","top");
                    
                    localStorage.setItem('authNgulikin', JSON.stringify(data.result));
                }
            } 
        });
    }
}

function updatePassword(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("updatePassword");
    }else{
        var oldpassword = (SHA256($('#oldpassword').val())).toUpperCase();
        var newpassword = (SHA256($('#newpassword').val())).toUpperCase();
        
        $.ajax({
            type: 'POST',
            url: PROFILE_UPDATEPASSWORD_API,
            data:JSON.stringify({ 
                    oldpassword : oldpassword,
                    newpassword : newpassword
            }),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                    generateToken("updatePassword");
                }else if(data.message === 'Invalid key'){
                    localStorage.removeItem('emailNgulikin');
                    sessionStorage.setItem("logoutNgulikin", 1);
                    localStorage.removeItem('authNgulikin');
                    location.href = url;
                    localStorage.getItem('authNgulikin');
                }else if(data.message === 'Password is wrong'){
                    notif("error","Password saat ini tidak benar","center","top");
                }else{
                    $('.loaderProgress').addClass('hidden');
                    notif("success","Cek email anda untuk konfirmasi ubah password","center","top");
                }
            } 
        });
    }
}

function transaction(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("transaction");
    }else{
        $.ajax({
            type: 'GET',
            url: LIST_MYPURCHASES_API,
            data: { 
                date: $('#filterMysalesDate').val(),
                search: $('#filterMysalesInput').val()
            },
            dataType: 'json',
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.status == "OK"){
                    var listtransaction = '';
                    if(data.result.length > 0){
                        $.each( data.result, function( key, val ) {
                            var expired = (val.status_name!=="Kadaluarsa")?'':'expired';
                            listtransaction += '<div class="listMyprofileTransaction">';
                            listtransaction += '    <div class="dataTransaction">';
                            listtransaction += '        <img src="'+val.product_image+'" height="70" width="70"/>';
                            listtransaction += '    </div>';
                            listtransaction += '    <div class="dataTransaction">';
                            listtransaction += '        <div class="header">barang</div>';
                            listtransaction += '        <div class="detail">'+val.product_name+'</div>';
                            listtransaction += '    </div>';
                            listtransaction += '    <div class="dataTransaction">';
                            listtransaction += '        <div class="header">status pengiriman</div>';
                            listtransaction += '        <div class="detail statusTransaction '+expired+'">'+val.status_name+'</div>';
                            listtransaction += '    </div>';
                            listtransaction += '    <div class="dataTransaction">';
                            listtransaction += '        <div class="header">tanggal transaksi</div>';
                            listtransaction += '        <div class="detail">'+val.transaction_date+'</div>';
                            listtransaction += '    </div>';
                            listtransaction += '    <div class="dataTransaction">';
                            listtransaction += '        <div class="header">total tagihan</div>';
                            listtransaction += '        <div class="detail">'+val.total_price+'</div>';
                            listtransaction += '    </div>';
                            listtransaction += '    <div class="dataTransaction viewDetailTransaction" datainternal-id="'+val.invoice_no+'">';
                            listtransaction += '        <i class="fa fa-eye"></i> Lihat';
                            listtransaction += '    </div>';
                            listtransaction += '</div>';
                        });
                    }else{
                        listtransaction += '<div class="grid-favorite-body"></div>';
                        listtransaction += '<div class="grid-favorite-footer">';
                        listtransaction += '    <div>Tidak ada data transaksi</div>';
                        listtransaction += '</div>';
                    }
                    $(".bodyProfileTransaction").html(listtransaction);
                    
                    $(".viewDetailTransaction").on( 'click', function( e ){
                        var invoiceno = $(this).attr('datainternal-id');
                        location.href = url+"/invoice/"+invoiceno;
                    });
                }else{
                    generateToken("transaction");
                }
            } 
        });
    }
}

function listbank(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("listbank");
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
                    
                    var listbank = '';
                    $.each( data.result, function( key, val ) {
                        listbank += '<option value="'+val.bank_id+'">'+(val.bank_name).toUpperCase()+'</option>';
                    });
                    $('#bank_id').append(listbank);
                }else{
                    generateToken("listbank");
                }
            }
        });    
    }
}

function uploadPhotoShop(){
    var data = new FormData(),
        filePath = $('#filesCreateShopPrivate').val(),
        fileExt = (filePath.substr(filePath.lastIndexOf('\\') + 1).split('.')[1]).toLowerCase(),
        filePhoto = $('#filesCreateShopPrivate')[0].files[0],
        fileSize = filePhoto.size/ 1024 / 1024;
        
        data.append('type', 'createshop');
        data.append('file', filePhoto);
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("uploadPhotoShop");
    }else{
        if(fileSize < 2){
            if(fileExt === 'jpg' || fileExt === 'png'){
                $('.loaderProgress').removeClass('hidden');
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
                        $('#previewImageCreateShopPrivate').attr('src',result.src);
                        $('.loaderProgress').addClass('hidden');
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

function uploadCardPhotoShop(){
    var data = new FormData(),
        filePath = $('#filesCardCreateShopPrivate').val(),
        fileExt = (filePath.substr(filePath.lastIndexOf('\\') + 1).split('.')[1]).toLowerCase(),
        filePhoto = $('#filesCardCreateShopPrivate')[0].files[0],
        fileSize = filePhoto.size/ 1024 / 1024;
        
        data.append('type', 'uploadcard');
        data.append('file', filePhoto);
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("uploadCardPhotoShop");
    }else{
        if(fileSize < 2){
            if(fileExt === 'jpg' || fileExt === 'png'){
                $('.loaderProgress').removeClass('hidden');
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
                        $('#previewCardCreateShopPrivate').attr('src',result.src);
                        $('.loaderProgress').addClass('hidden');
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

function uploadSelfiePhotoShop(){
    var data = new FormData(),
        filePath = $('#filesSelfieCreateShopPrivate').val(),
        fileExt = (filePath.substr(filePath.lastIndexOf('\\') + 1).split('.')[1]).toLowerCase(),
        filePhoto = $('#filesSelfieCreateShopPrivate')[0].files[0],
        fileSize = filePhoto.size/ 1024 / 1024;
        
        data.append('type', 'uploadselfie');
        data.append('file', filePhoto);
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("uploadSelfiePhotoShop");
    }else{
        if(fileSize < 2){
            if(fileExt === 'jpg' || fileExt === 'png'){
                $('.loaderProgress').removeClass('hidden');
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
                        $('#previewSelfieCreateShopPrivate').attr('src',result.src);
                        $('.loaderProgress').addClass('hidden');
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

function doCreateShop(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("doEditProfile");
    }else{
        var shop_name = $("#shopname").val(),
            shop_desc = $("#shopdesc").val(),
            bank_id = $("#bank_id").val(),
            recname = $("#recname").val(),
            recno = $("#recno").val(),
            shopprovince = $("#shopprovince").val(),
            shopcity = $("#shopcity").val(),
            shopaddress = $("#shopaddress").val();
            
        $.ajax({
            type: 'POST',
            url: SHOP_ACTION_API,
            data:JSON.stringify({ 
                    shop_name: shop_name,
                    shop_desc : shop_desc,
                    account_name : recname,
                    account_no : recno,
                    bank_id : bank_id,
                    shopprovince : shopprovince,
                    shopcity : shopcity,
                    shopaddress : shopaddress
            }),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                    generateToken("doEditProfile");
                }else{
            	    notif("success","Silahkan tunggu konfirmasi dari admin","center","top");
                }
            }
        });
    }
}

function orderprocess(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("orderprocess");
    }else{
        $.ajax({
            type: 'GET',
            url: LIST_TRACKORDER_API,
            data: { 
                date: $('#filterOrderProcessDate').val(),
                search: $('#filterOrderProcessInput').val()
            },
            dataType: 'json',
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.status == "OK"){
                    var orderprocess = '';
                    if(data.result.length > 0){
                        $.each( data.result, function( key, val ) {
                            orderprocess += '<div>';
                            orderprocess += '    <div class="orderprocess_head">';
                            orderprocess += '        <div class="detail-shopping-icon">';
                            orderprocess += '           <i class="fa fa-shopping-cart"></i>';
                            orderprocess += '        </div>';
                            orderprocess += '        <div style="width: 420px;margin-left: 50px;">'+val.shop_name+'</div>';
                            orderprocess += '        <div><img src="/img/bubble.png"/></div>';
                            orderprocess += '        <div style="width: 325px;">Tanya Pembeli</div>';
                            orderprocess += '        <div><img src="/img/truck.png"/></div>';
                            orderprocess += '        <div>Dikirim</div>';
                            orderprocess += '    </div>';
                            orderprocess += '    <div class="orderprocess_body">';
                            orderprocess += '        <div class="orderprocess_left">';
                            orderprocess += '           <div class="orderprocess_grid">';
                            orderprocess += '               <div class="left" style="margin-right: 40px;">';
                            orderprocess += '                   <img src="'+val.product_image+'">';
                            orderprocess += '               </div>';
                            orderprocess += '               <div class="right">';
                            orderprocess += '                   <div class="head" style="margin-top: 5px;">BARANG</div>';
                            orderprocess += '                   <div>'+val.product_name+'</div>';
                            orderprocess += '               </div>';
                            orderprocess += '           </div>';
                            orderprocess += '           <div class="orderprocess_grid" style="margin-top: 10px;">';
                            orderprocess += '               <div class="head">CATATAN UNTUK PENJUAL</div>';
                            orderprocess += '               <div>'+val.notes+'</div>';
                            orderprocess += '           </div>';
                            orderprocess += '       </div>';
                            orderprocess += '       <div class="orderprocess_right">';
                            orderprocess += '           <div class="orderprocess_grid">';
                            orderprocess += '               <div class="left" style="margin-right: 40px;">';
                            orderprocess += '                   <div class="head">JUMLAH</div>';
                            orderprocess += '                   <div>'+val.sum_products+'</div>';
                            orderprocess += '               </div>';
                            orderprocess += '               <div class="right" style="float: right;">';
                            orderprocess += '                   <div class="head">TOTAL TAGIHAN</div>';
                            orderprocess += '                   <div style="text-align: right;">'+val.total_price+'</div>';
                            orderprocess += '               </div>';
                            orderprocess += '           </div>';
                            orderprocess += '           <div class="orderprocess_grid" style="border-bottom: 1px solid #F5F5F5;">';
                            orderprocess += '               <div class="left" style="margin-right: 40px;">';
                            orderprocess += '                   <div class="head">Biaya Pengiriman</div>';
                            orderprocess += '                   <div class="bluesky">JNE</div>';
                            orderprocess += '               </div>';
                            orderprocess += '               <div class="right" style="float: right;">';
                            orderprocess += '                   <div>'+val.delivery_price+'</div>';
                            orderprocess += '               </div>';
                            orderprocess += '           </div>';
                            orderprocess += '           <div class="orderprocess_grid">';
                            orderprocess += '               <div class="left" style="margin-right: 40px;">';
                            orderprocess += '                   <div>Total Pesanan</div>';
                            orderprocess += '               </div>';
                            orderprocess += '               <div class="right" style="float: right;">';
                            orderprocess += '                   <div style="text-align: right;">'+val.total+'</div>';
                            orderprocess += '               </div>';
                            orderprocess += '           </div>';
                            orderprocess += '           <div class="orderprocess_grid">';
                            orderprocess += '               <div class="left" style="margin-right: 40px;">';
                            orderprocess += '                   <div>Pembayaran</div>';
                            orderprocess += '               </div>';
                            orderprocess += '               <div class="right" style="float: right;">';
                            orderprocess += '                   <div class="bluesky" style="text-align: right;">Manual - Transfer BCA</div>';
                            orderprocess += '               </div>';
                            orderprocess += '           </div>';
                            orderprocess += '       </div>';
                            orderprocess += '   </div>';
                            orderprocess += '   <div class="orderprocess_footer">';
                            orderprocess += '       <div>';
                            orderprocess += '           <button class="btn_trackorder" data-notrans="'+val.notrans+'">Lacak Pesanan</button>';
                            orderprocess += '       </div>';
                            orderprocess += '   </div>';
                            orderprocess += '</div>';
                        });
                    }else{
                        orderprocess += '<div class="grid-favorite-body"></div>';
                        orderprocess += '<div class="grid-favorite-footer">';
                        orderprocess += '    <div>Tidak ada data pesanan</div>';
                        orderprocess += '</div>';
                    }
                    $(".bodyProfileOrderProcess").html(orderprocess);
                    
                    $(".btn_trackorder").on( 'click', function( e ){
                        var notrans = $(this).data( "notrans" );
                            
                        location.href = url+"/shippinghistory/"+notrans;
                    });
                }else{
                    generateToken("orderprocess");
                }
            } 
        });
    }
}