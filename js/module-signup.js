function initSignup(){
    var signinSessionEmail = sessionStorage.getItem('signinEmailNgulikin'),
        signinSessionSocmed = sessionStorage.getItem('signinSocmedNgulikin'),
        signinSessionIdSocmed = sessionStorage.getItem('signinIdSocmedNgulikin');
    
    if(authData.data !== ''){
        sessionStorage.setItem('loginNgulikin',1);
        localStorage.setItem('emailNgulikin', JSON.parse(authData.data).username);
        location.href = url;
    }
        
	if(signinSessionEmail !== null){
		$('#emailSignUp').val(signinSessionEmail).attr('disabled','disabled').css("background-color","rgba(153,153,153,0.75)");
		sessionStorage.removeItem('signinEmailNgulikin');
		$('#socmedSignUp').val(signinSessionSocmed);
		sessionStorage.removeItem('signinSocmedNgulikin');
		$('#idsocmedSignUp').val(signinSessionIdSocmed);
		sessionStorage.removeItem('signinIdSocmedNgulikin');
	}
	
	$('.ui-loader,#sexSignup-button span').remove();
	$('#sexSignup-button').replaceWith(function() {
        return $('#sexSignup', this);
    });
    
    /*signup button on header menu action*/
	$('#regisPopUpSignin').on( 'click', function( e ){
	   location.href = url+"/signup";
	});
	$('#buttonSignup').on( 'click', function( e ){
	    buttonSignup();
	});
	$('#nameSignUp,#emailSignUp,#usernameSignUp,#passSignUp,#nohpSignUp').keypress(function(e) {
	    if(e.which == 13) {
    	   $('#buttonSignup').trigger('click');
	    }
	});
}

function buttonSignup(){
    $('.inputSignup').removeClass('invalidFormat');
    $('#signup_message').html('');
	var nameSignUp = $('#nameSignUp').val();
	var emailSignUp = $('#emailSignUp').val();
	var nohpSignUp = $('#nohpSignUp').val();
	var sexSignUp = $('#sexSignup').val();
	var usernameSignUp = $('#usernameSignUp').val();
	var dateSignUp = $('#dateSignUp').val();
	var passSignUp = (SHA256($('#passSignUp').val())).toUpperCase();
	var usernameRegex = /^[a-zA-Z0-9\_\-]{3,100}$/;
	var socmedSignUp = $('#socmedSignUp').val();
	var idsocmedSignUp = $('#idsocmedSignUp').val();
	
	var ismanual = false;
	if (typeof $('#emailSignUp').attr('disabled') === "undefined") {
	    ismanual = true;
	}
	    
	var inputFlag = true;
    $('.inputSignup').each(function() {
        if(!$(this).val() && $(this).attr('id') !== 'idsocmedSignUp'){
            inputFlag = false;
            if($(this).attr('id') == 'dateSignUp'){
                $(this).addClass('invalidFormat');
                $(this).parent().next().html('Harus diisi sesuai KTP').addClass('invalidFormat');
            }else{
                $(this).addClass('invalidFormat');
                $(this).parent().next().next().html('Harus diisi').addClass('invalidFormat');
            }
        }else if($(this).attr('id') == 'usernameSignUp' && !usernameRegex.test(usernameSignUp)){
            inputFlag = false;
            $(this).addClass('invalidFormat');
            $(this).parent().next().next().html('Username hanya boleh terdiri angka dan huruf dan minimal 3 karakter').addClass('invalidFormat');
        }else if($(this).attr('id') == 'emailSignUp' && validateEmail(emailSignUp) === false){
            inputFlag = false;
            $(this).addClass('invalidFormat');
            $(this).parent().next().next().html('Format email tidak benar').addClass('invalidFormat');
        }else if($(this).attr('id') == 'dateSignUp' && isDate(dateSignUp,'-',2,1,0) === false){
            inputFlag = false;
            $(this).addClass('invalidFormat');
            $(this).parent().next().html('Tanggal lahir tidak benar').addClass('invalidFormat');
        }else{
            if($(this).attr('id') == 'dateSignUp'){
                $(this).removeClass('invalidFormat');
                $(this).parent().next().html('*Wajib sesuai KTP').removeClass('invalidFormat');
            }else{
                $(this).removeClass('invalidFormat');
                $(this).parent().next().next().html('*Wajib diisi').removeClass('invalidFormat');
            }
        }
    });
        
	if(inputFlag){
	    if(sessionStorage.getItem('tokenNgulikin') === null){
            generateToken(buttonSignup);
        }else{
            $.ajax({
                type: 'POST',
                data: JSON.stringify({ 
	                        "name": nameSignUp, 
	                        "email": emailSignUp, 
	                        "username": usernameSignUp,
	                        "nohp": nohpSignUp,
	                        "dob": dateSignUp,
	                        "password": passSignUp, 
	                        "gender": sexSignUp, 
	                        "manual": ismanual, 
	                        "source" : "web", 
	                        "socmed" : socmedSignUp,
	                        "id_socmed" : idsocmedSignUp
	                    }),
                crossDomain: true,
                async: true,
                beforeSend: function(xhr) { 
                    xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
                },
                url: SIGNUP_API,
                contentType: "application/json",
                dataType: 'json',
                success: function(result) {
                    if(result.message == 'Invalid credential' || result.message == 'Token expired'){
                        generateToken(buttonSignup);
                    }else if(result.status == 'NO'){
                        $.each( result.response, function( i, item ) {
                            if(item.email == 'invalid'){
                                $('#emailSignUp').addClass('invalidFormat');
                                $('#emailSignUp').parent().next().next().html('Format email tidak benar').addClass('invalidFormat');
                            }else if(item.email == 'exist'){
                                $('#emailSignUp').addClass('invalidFormat');
                                $('#emailSignUp').parent().next().next().html('Email sudah ada').addClass('invalidFormat');
                            }
                            if(item.dob == 'invalid'){
                                $('#dateSignUp').addClass('invalidFormat');
                                $('#dateSignUp').parent().next().html('Harus diisi sesuai KTP').addClass('invalidFormat');
                            }
                            if(item.username == 'invalid'){
                                $('#usernameSignUp').addClass('invalidFormat');
                                $('#usernameSignUp').parent().next().next().html('Username hanya boleh terdiri angka dan huruf dan minimal 3 karakter').addClass('invalidFormat');
                            }else if(item.username == 'exist'){
                                $('#usernameSignUp').addClass('invalidFormat');
                                $('#usernameSignUp').parent().next().next().html('Username sudah ada').addClass('invalidFormat');
                            }
                        });
                    }else{
                        if(ismanual){
                            $('.inputSignup').removeClass('invalidFormat');
                            $('.inputSignup').parent().next().next().html('*Wajib diisi').removeClass('invalidFormat');
                            $('#dateSignUp').parent().next().html('*Wajib sesuai KTP').removeClass('invalidFormat');
                            $('#signup_message').html('Register berhasil, cek email untuk aktifasi akun anda');
                        }else{
                            sessionStorage.setItem('loginNgulikin',1);
                            localStorage.setItem('emailNgulikin', result.data.username);
                            localStorage.setItem('authNgulikin', JSON.stringify(result.data));
                            location.href = url;
                        }
                    }
                } 
            });
        }
    }
}