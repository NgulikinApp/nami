function initProfile(){
    var authsession = localStorage.getItem('authNgulikin');
    
    $( "#accordionMyprofile" ).accordion();
    if(authsession === null){
        location.href = url;
    }
    
    profile();
    
    $('#myaccounttab').on( 'click', function( e ){
        $('.myprofile').removeClass('active');
        $('#myaccount').addClass('active');
    });
    
    $('#changepasswordtab').on( 'click', function( e ){
        $('.myprofile').removeClass('active');
        $('#changepassword').addClass('active');
    });
    
    $('#accordionMyprofile h3').on( 'click', function( e ){
        $('#accordionMyprofile h3').css('background-image','url(/img/arrow_down.png)');
        $(this).css('background-image','url(/img/arrow_up.png)');
    });
    
    $("#filesPrivate").change(function(){
        readURL(this);
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
}

function profile(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(profile);
    }else{
        var user_id = authData.data !== ''? JSON.parse(authData.data).user_id : '';
        
        $.ajax({
            type: 'GET',
            url: PROFILE_API+'/'+user_id,
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
        var user_id = authData.data !== ''? JSON.parse(authData.data).user_id : '',
            username = authData.data !== ''? JSON.parse(authData.data).username : '';
        $('.loaderProgress').removeClass('hidden');
        $.ajax({
            type: 'POST',
            url: PROFILE_UPDATE_API,
            data:JSON.stringify({ 
                    user_id: user_id,
                    fullname : $('#fullnamePrivate').val(),
                    dob : $('#dobPrivate').val(),
                    gender : $('input[name=sexPrivate]:checked').val(),
                    phone : $('#phonePrivate').val(),
                    user_photo : $('#previewImagePrivate').attr('src'),
                    username : username
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
                }else{
                    $('.loaderProgress').addClass('hidden');
                    notif("success","Data anda sudah diperbarui","center","top");
                }
            } 
        });
    }
}