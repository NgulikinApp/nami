$( document ).ready(function() {
    initGeneral();
    initProfile();
});

function initProfile(){
    var trackordertab = sessionStorage.getItem('track_orderNgulikin');
    
    $( "#accordionMyprofile" ).accordion();
    
    profile();
    
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
    
    $('#historytab').on( 'click', function( e ){
        $('.menuProfile ul li').removeClass('greytab');
        $(this).addClass('greytab');
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
                        $('#phonePrivate').val(data.result.phone);
                        $('#emailPrivate').val(data.result.email);
                        $('#previewImagePrivate').attr("src",data.result.user_photo);
                            
                        document.title = (data.result.fullname).toUpperCase() + ' | Ngulikin';
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
                    phone : $('#phonePrivate').val()
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