var dataSignUp = {};

$( document ).ready(function() {
    initGeneral();
    initSignup();
});

function initSignup(){
    var signinSessionEmail    = sessionStorage.getItem('signinEmailNgulikin');
	
	if(signinSessionEmail !== null){
	    dataSignUp.email    = signinSessionEmail;
		
		verifiedForm();
	}
	
	$('.ui-loader').remove();
    
    /*signup button on header menu action*/
	$('#regisPopUpSignin').on( 'click', function( e ){
	   location.href = url+"/signup";
	});
	$('#buttonSignup').on( 'click', function( e ){
	    buttonSignup();
	});
	$('#emailSignUp').keypress(function(e) {
	    if(e.which == 13) {
    	   $('#buttonSignup').trigger('click');
	    }
	});
}

function buttonSignup(){
    $('#emailSignUp').removeClass('invalidFormat');
    $('#emailSignUp').parent().next().next().html('*Wajib diisi').removeClass('invalidFormat');
    
    var emailSignUp = $('#emailSignUp').val();
    
    var inputFlag = true;
    if(emailSignUp === ''){
        inputFlag = false;
        $('#emailSignUp').addClass('invalidFormat');
        $('#emailSignUp').parent().next().next().html('Harus diisi').addClass('invalidFormat');
    }else if(validateEmail(emailSignUp) === false){
        inputFlag = false;
        $('#emailSignUp').addClass('invalidFormat');
        $('#emailSignUp').parent().next().next().html('Format email tidak benar').addClass('invalidFormat');
    }
    
    if(inputFlag){
        dataSignUp.email = emailSignUp;
        if(sessionStorage.getItem('tokenNgulikin') === null){
            generateToken("buttonSignup");
        }else{
            $.ajax({
                type: 'POST',
                data: JSON.stringify({ 
	                        "email": emailSignUp,
	                        "type": 0,
	                        "source" : "web"
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
                    if(result.message === 'Invalid credential' || result.message === 'Token expired'){
                        generateToken("buttonSignup");
                    }else if(result.status === 'NO'){
                        if(result.response === 'invalid'){
                            $('#emailSignUp').addClass('invalidFormat');
                            $('#emailSignUp').parent().next().next().html('Format email tidak benar').addClass('invalidFormat');
                        }else if(result.response === 'exist'){
                            $('#emailSignUp').addClass('invalidFormat');
                            $('#emailSignUp').parent().next().next().html('Email sudah ada').addClass('invalidFormat');
                        }else{
                            $('#emailSignUp').addClass('invalidFormat');
                            $('#emailSignUp').parent().next().next().html('User belum aktif').addClass('invalidFormat');
                        }
                    }else{
                        var element = '<div class="grid-signup-bodyhead">registrasi</div>';
                            element += '<div class="grid-signup-bodyfooter fn-15">Kode verifikasi telah dikirimkan melalui email ke <strong>'+emailSignUp+'</strong></div>';
                            element += '<div class="signupBodySub">Kode Verifikasi</div>';
                            element += '<div class="signupBodySub">';
                            element += '    <input type="tel" id="otp-number-input-1" class="otp-number-input mr-10" maxlength="1">';
                            element += '    <input type="tel" id="otp-number-input-2" class="otp-number-input mr-10" maxlength="1">';
                            element += '    <input type="tel" id="otp-number-input-3" class="otp-number-input mr-10" maxlength="1">';
                            element += '    <input type="tel" id="otp-number-input-4" class="otp-number-input mr-10" maxlength="1">';
                            element += '</div>';
                            element += '<div class="signupBodySub">';
                            element += '    <div id="signup_message"></div>';
                            element += '    <button type="button" id="buttonVerifi" class="btn-disabled">Verifikasi</button>';
                            element += '</div>';
                            element += '<div class="signupBodySub" style="padding: 0;">';
                            element += '    Tidak menerima kode? <font id="resendCode">Kirim Ulang</font>';
                            element += '</div>';
                            
                        $('.grid-signup-body').html(element);
                        
                        $('.otp-number-input').on( 'click', function( e ){
                    	     $('.otp-number-input').each(function() {
                    	        if($(this).val() === ''){
                    	            $(this).removeClass('press');
                    	         }else{
                    	            $(this).addClass('press');
                    	         }
                    	     });
                    	     $(this).addClass('press');
                    	});
                    	
                    	$('#resendCode').on( 'click', function( e ){
                    	     resendCode();
                    	});
                    	
                    	$( '.otp-number-input' ).keyup(function( e ) {
                    	     var btnver = true;
                    	     $('.otp-number-input').each(function() {
                    	        if($(this).val() === ''){
                    	            btnver = false;
                    	        }
                    	    });
                    	    if(btnver){
                    	        $('#buttonVerifi').removeClass('btn-disabled');
                    	    }else{
                    	        $('#buttonVerifi').addClass('btn-disabled');
                    	    }
                    	    if (e.which == 8){
                    	        $(this).removeClass('press');
                                //backspace
                                $(this).prevAll('input:first').focus().addClass('press');
                            }
                            else if(e.which > 47 && e.which < 91){
                                $(this).nextAll('.otp-number-input:first').focus().addClass('press');
                            }
                            else{
                                return false;
                            }
                    	});
                    	
                    	$('#buttonVerifi').on( 'click', function( e ){
                    	    dataSignUp.code = $('#otp-number-input-1').val()+$('#otp-number-input-2').val()+$('#otp-number-input-3').val()+$('#otp-number-input-4').val();
                    	    verifiedCode();
                    	});
                    	
                    	$('#otp-number-input-1,#otp-number-input-2,#otp-number-input-3,#otp-number-input-4').keypress(function(e) {
                    	    if(e.which == 13) {
                        	   $('#buttonVerifi').trigger('click');
                    	    }
                    	});
                    }
                }
            });
        }
    }
}

function resendCode(){
    $.ajax({
        type: 'POST',
        data: JSON.stringify({
                    "type": 1,
                    "email": dataSignUp.email
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
            if(result.message === 'Invalid credential' || result.message === 'Token expired'){
                generateToken("resendCode");
            }else{
                notif("info","Kode sudah terkirim","center","top");
            }
        }
    });
}

function verifiedCode(){
    $.ajax({
        type: 'POST',
        data: JSON.stringify({
                    "type": 2,
                    "email": dataSignUp.email,
                    "code": dataSignUp.code
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
            if(result.message === 'Invalid credential' || result.message === 'Token expired'){
                generateToken("verifiedCode");
            }else if(result.status === 'NO'){
                $('#signup_message').html('Kode tidak benar');
            }else{
                verifiedForm();
            }
        }
    });
}

function verifiedForm(){
    var element = '<div class="grid-signup-bodyhead">registrasi</div>';
        element += '<div class="grid-signup-bodyfooter fn-15">Email anda <strong>'+dataSignUp.email+'</strong></div>';
        element += '<div class="grid-signup-bodyfooter fn-15">Register Verifikasi</div>';
        element += '<div class="signupBodySub">';
        element += '    <input type="text" id="usernameSignUp" class="inputSignup" placeholder="Username"/>';
        element += '    <i class="fa fa-user"></i>';
        element += '    <span>*Wajib diisi</span>';
        element += '</div>';
        element += '<div class="signupBodySub">';
        element += '    <input type="text" id="nameSignUp" class="inputSignup" placeholder="Fullname"/>';
        element += '    <i class="fa fa-user"></i>';
        element += '    <span>*Wajib diisi</span>';
        element += '</div>';
        element += '<div class="signupBodySub">';
        element += '    <input type="password" id="passSignUp" class="inputSignup" placeholder="Password" onKeyUp="checkPasswordStrength();"/>';
        element += '    <label id="passtrength" class="weak">Weak</label>';
        element += '    <i class="fa fa-lock"></i>';
        element += '    <span>*Wajib diisi</span>';
        element += '</div>';
        element += '<div class="signupBodySub">';
        element += '    <input type="text" id="nohpSignUp" class="inputSignup" placeholder="Nomor Handphone"/>';
        element += '    <i class="fa fa-mobile-phone"></i>';
        element += '    <span>*Wajib diisi</span>';
        element += '</div>';
        element += '<div class="signupBodySub" style="height: 400px;">';
        element += '    <label>Are you a human?</label>';
        element += '    <div id="PuzzleCaptcha"></div>';
        element += '</div>';
        element += '<div class="signupBodySub">';
        element += '    <button type="button" id="buttonVerified" class="btn-disabled" disabled="true">Daftar</button>';
        element += '</div>';
                
    $('.grid-signup-body').html(element);
    
    $('#buttonVerified').on( 'click', function( e ){
	    signUp();
	});
	
	$("#PuzzleCaptcha").PuzzleCAPTCHA({
		targetButton:'#buttonVerified'
	});
}

function checkPasswordStrength() {
	var number = /([0-9])/;
	var alphabets = /([a-zA-Z])/;
	var special_characters = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;
	
	if($('#passSignUp').val().length<6) {
		$('#passtrength').removeClass();
		$('#passtrength').addClass('weak');
		$('#passtrength').html("Weak");
	} else {  	
	    if($('#passSignUp').val().match(number) && $('#passSignUp').val().match(alphabets) && $('#passSignUp').val().match(special_characters)) {            
			$('#passtrength').removeClass();
		    $('#passtrength').addClass('strong');
		    $('#passtrength').html("Strong");
        } else {
			$('#passtrength').removeClass();
		    $('#passtrength').addClass('medium');
		    $('#passtrength').html("Medium");
        } 
	}
}

function signUp(){
    var nameSignUp     = $('#nameSignUp').val(),
        nohpSignUp     = $('#nohpSignUp').val(),
        usernameSignUp = $('#usernameSignUp').val(),
        passSignUp     = (SHA256($('#passSignUp').val())).toUpperCase(),
        usernameRegex = /^[a-zA-Z0-9\_\-]{3,100}$/;
        
    var inputFlag = true;
    $('.inputSignup').each(function() {
        if($(this).attr('id') != 'passSignUp' && !$(this).val()){
            inputFlag = false;
            $(this).addClass('invalidFormat');
            $(this).next().next().html('Harus diisi').addClass('invalidFormat');
        }else if($(this).attr('id') == 'usernameSignUp' && !usernameRegex.test(usernameSignUp)){
            inputFlag = false;
            $(this).addClass('invalidFormat');
            $(this).next().next().html('Username hanya boleh terdiri angka dan huruf dan minimal 3 karakter').addClass('invalidFormat');
        }else if($(this).attr('id') == 'passSignUp' && !$(this).val()){
            inputFlag = false;
            $(this).addClass('invalidFormat');
            $(this).next().next().next().html('Harus diisi').addClass('invalidFormat');
        }
    });
    
    if(inputFlag){
	    if(sessionStorage.getItem('tokenNgulikin') === null){
            generateToken("signUp");
        }else{
            $.ajax({
                type: 'POST',
                data: JSON.stringify({ 
                            "type"      : 3,
	                        "name"      : nameSignUp, 
	                        "email"     : dataSignUp.email, 
	                        "username"  : usernameSignUp,
	                        "nohp"      : nohpSignUp,
	                        "password"  : passSignUp
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
                        generateToken("signUp");
                    }else if(result.status == 'NO'){
                        if(result.response.username == 'invalid'){
                            $('#usernameSignUp').addClass('invalidFormat');
                            $('#usernameSignUp').next().next().html('Username hanya boleh terdiri angka dan huruf dan minimal 3 karakter').addClass('invalidFormat');
                        }else if(result.response.username == 'exist'){
                            $('#usernameSignUp').addClass('invalidFormat');
                            $('#usernameSignUp').next().next().html('Username sudah ada').addClass('invalidFormat');
                        }
                    }else{
                        sessionStorage.setItem('loginNgulikin',1);
                        location.href = url;
                    }
                } 
            });
        }
    }
}