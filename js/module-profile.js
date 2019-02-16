$( document ).ready(function() {
    initGeneral();
    initProfile();
});

function initProfile(){
    var trackordertab = sessionStorage.getItem('track_orderNgulikin'),
        createshoptab = sessionStorage.getItem('create_shopNgulikin');
    
    $( "#accordionMyprofile" ).accordion();
    
    profile();
    if($('.ishasShop').val() === '0'){
        listbank();
        $('#bankname_con span').remove();
        $('.ui-select').css("width","100%");
        
        var cnt = $("#bankname").parent().contents();
        $("#bankname").parent().replaceWith(cnt);
        var cnt = $("#recno").parent().contents();
        $("#recno").parent().replaceWith(cnt);
        var cnt = $("#filesSelfieCreateShopPrivate").parent().contents();
        $("#filesSelfieCreateShopPrivate").parent().replaceWith(cnt);
        var cnt = $("#filesCardCreateShopPrivate").parent().contents();
        $("#filesCardCreateShopPrivate").parent().replaceWith(cnt);
        
        $('#bank_id-button').css({"width":"100%","margin":"-5px 0px"});
        
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
            }else if($('#filesCardCreateShopPrivate').val() === ''){
                notif("error","Foto KTP/Kartu Pelajar/SIM harus dilampirkan ","center","top");
            }else if($('#filesSelfieCreateShopPrivate').val() === ''){
                notif("error","Foto selfie dengan KTP/Kartu Pelajar/SIM harus dilampirkan ","center","top");
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
        $('.menuProfile ul li').removeClass('greytab');
        $(this).addClass('greytab');
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
    
    $('#accordionMyprofile h3').on( 'click', function( e ){
        $('#accordionMyprofile h3').css('background-image','url(/img/arrow_down.png)');
        $(this).css('background-image','url(/img/arrow_up.png)');
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

function uploadPhoto(){
    var data = new FormData(),
        filePath = $('#filesPrivate').val(),
        fileExt = (filePath.substr(filePath.lastIndexOf('\\') + 1).split('.')[1]).toLowerCase(),
        filePhoto = $('#filesPrivate')[0].files[0],
        fileSize = filePhoto.size/ 1024 / 1024;
        
        data.append('type', 'profile');
        data.append('file', filePhoto);
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(uploadPhoto);
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
        generateToken(profile);
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
                        
                        if(data.result.fullname !== ''){
                            document.title = (data.result.fullname).toUpperCase() + ' | Ngulikin';
                        }
                        $('.loaderProgress').addClass('hidden');
                    }
                }else{
                    generateToken(profile);
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
        generateToken(updateProfile);
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
                    generateToken(updateProfile);
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
        generateToken(updatePassword);
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
                    generateToken(updatePassword);
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
        generateToken(transaction);
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
                            listtransaction += '<div class="listMyprofileTransaction">';
                            listtransaction += '    <div class="dataTransaction">';
                            listtransaction += '        <img src="'+val.product_image+'" height="70" width="70"/>';
                            listtransaction += '    </div>';
                            listtransaction += '    <div class="dataTransaction">';
                            listtransaction += '        <div class="header">barang</div>';
                            listtransaction += '        <div class="detail">"'+val.product_name+'"</div>';
                            listtransaction += '    </div>';
                            listtransaction += '    <div class="dataTransaction">';
                            listtransaction += '        <div class="header">status pengiriman</div>';
                            listtransaction += '        <div class="detail statusTransaction">"'+val.status_name+'"</div>';
                            listtransaction += '    </div>';
                            listtransaction += '    <div class="dataTransaction">';
                            listtransaction += '        <div class="header">tanggal transaksi</div>';
                            listtransaction += '        <div class="detail">"'+val.transaction_date+'"</div>';
                            listtransaction += '    </div>';
                            listtransaction += '    <div class="dataTransaction">';
                            listtransaction += '        <div class="header">total tagihan</div>';
                            listtransaction += '        <div class="detail">"'+val.product_name+'"</div>';
                            listtransaction += '    </div>';
                            listtransaction += '    <div class="dataTransaction viewDetailTransaction">';
                            listtransaction += '        <i class="fa fa-eye"></i> Lihat';
                            listtransaction += '    </div>';
                            listtransaction += '</div>';
                        });
                    }else{
                        listtransaction += '<div class="grid-favorite-body"></div>';
                        listtransaction += '     <div class="grid-favorite-footer">';
                        listtransaction += '         <div>';
                        listtransaction += '             Belum ada data transaksi';
                        listtransaction += '         </div>';
                        listtransaction += '     </div>';
                    }
                    $(".bodyProfileTransaction").html(listtransaction);
                }else{
                    generateToken(transaction);
                }
            } 
        });
    }
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
                    
                    var listbank = '';
                    $.each( data.result, function( key, val ) {
                        listbank += '<option value="'+val.bank_id+'">'+(val.bank_name).toUpperCase()+'</option>';
                    });
                    $('#bank_id').append(listbank);
                }else{
                    generateToken(listbank);
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
        generateToken(uploadPhotoShop);
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
        generateToken(uploadCardPhotoShop);
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
        generateToken(uploadSelfiePhotoShop);
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
        generateToken(doEditProfile);
    }else{
        var shop_name = $("#shopname").val(),
            shop_desc = $("#shopdesc").val(),
            bank_id = $("#bank_id").val(),
            recname = $("#recname").val(),
            recno = $("#recno").val();
            
        $.ajax({
            type: 'POST',
            url: SHOP_ACTION_API,
            data:JSON.stringify({ 
                    shop_name: shop_name,
                    shop_desc : shop_desc,
                    account_name : recname,
                    account_no : recno,
                    bank_id : bank_id
            }),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                    generateToken(doCreateShop);
                }else{
            	    notif("success","Silahkan tunggu konfirmasi dari admin","center","top");
                }
            }
        });
    }
}