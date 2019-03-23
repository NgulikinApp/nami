$( document ).ready(function() {
    initGeneral();
    initForgotPassword();
});

function initForgotPassword(){
    $('#backLogin').on('click', function (e) {
        location.href = url+"/signin";
    });
    $('#backRegis').on('click', function (e) {
        location.href = url+"/signup";
    });
    
    $('#buttonForgotSend').on( 'click', function( e ){
	   sendingCode();
    });
    
    $('#nameForgotPass').keypress(function(e) {
	    if(e.which == 13) {
    	    $('#buttonForgotSend').trigger('click');
	    }
	});
}

function buttonverified(){
    $('#buttonForgotVerified').on( 'click', function( e ){
        var code = $('#codeForgotPass').val();
        var email = $('#codeForgotEmail').val();
        if(code === ''){
            $('.error_message').removeClass('green');
	        $('.error_message').html('Kode harus diisi');
        }else if(sessionStorage.getItem('tokenNgulikin') === null){
            generateToken("buttonverified");
        }else{
            $.ajax({
                type: 'POST',
                data: JSON.stringify({ code: code, email: email}),
                crossDomain: true,
                async: true,
                beforeSend: function(xhr) { 
                    xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
                },
                url: FORGOTPASSWORD_CHECKINGCODE_API,
                contentType: "application/json",
                dataType: 'json',
                success: function(result) {
                    if(result.message == 'Invalid credential' || result.message == 'Token expired'){
                        generateToken("buttonverified");
                    }else if(result.status ==  'NO'){
                        $('.error_message').removeClass('show');
    	                $('.error_message').addClass('show').html('Invalid code');
                    }else{
                        $('.error_message').removeClass('show');
                        var resetPassElem = '<input type="password" id="passNewForgot" class="inputSignin" placeholder="Masukan password baru"/>';
            	            resetPassElem += '<i class="fa fa-lock"></i>';
            	            resetPassElem += '<input type="hidden" id="codeForgotEmail" value="'+result.response.email+'"/>';
            	           $('.grid-signin-body .signinBodySub:first-child').html(resetPassElem);
            	        
            	        var buttonElem = '<input type="button" id="buttonForgotChange" value="Ganti"/>';
            	        $('.signinBodySub.signupButton').html(buttonElem);
            	        
            	        buttonnewpass();
                    }
                } 
            });
        }
        
    });
    
    $('#codeForgotPass').keypress(function(e) {
	    if(e.which == 13) {
    	    $('#buttonForgotVerified').trigger('click');
	    }
	});
}

function buttonnewpass(){
    $('#buttonForgotChange').on( 'click', function( e ){
        var password = $('#passNewForgot').val();
        var email = $('#codeForgotEmail').val();
        if(password === ''){
            $('.error_message').removeClass('show').removeClass('green');
            $('.error_message').addClass('show');
            $('.error_message').html('Password baru harus diisi');
        }else if(sessionStorage.getItem('tokenNgulikin') === null){
            generateToken("buttonnewpass");
        }else{
            password = (SHA256(password)).toUpperCase();
            $.ajax({
                type: 'POST',
                data: JSON.stringify({ password: password, email: email}),
                crossDomain: true,
                async: true,
                beforeSend: function(xhr) { 
                    xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
                },
                url: FORGOTPASSWORD_CHANGINGPASS_API,
                contentType: "application/json",
                dataType: 'json',
                success: function(result) {
                    if(result.message == 'Invalid credential' || result.message == 'Token expired'){
                        generateToken("buttonnewpass");
                    }else{
                        $('.error_message').removeClass('show').addClass('show').addClass('green');
                        $('.error_message').html('Password telah diubah, silahkan login kembali');
                    }
                } 
            });
        }
    });
	
    $('#passNewForgot').keypress(function(e) {
	    if(e.which == 13) {
    	    $('#buttonForgotChange').trigger('click');
	    }
	});
}

function sendingCode(){
    var name = $('#nameForgotPass').val();
    if(name === ''){
	       $('.error_message').removeClass('show');
	       $('.error_message').addClass('show').html('Username atau email harus diisi');
    }else if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("sendingCode");
    }else{
        $.ajax({
            type: 'POST',
            data: JSON.stringify({ email: name}),
            crossDomain: true,
            async: true,
            beforeSend: function(xhr) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            url: FORGOTPASSWORD_ASKINGCODE_API,
            contentType: "application/json",
            dataType: 'json',
            success: function(result) {
                if(result.message == 'Invalid credential' || result.message == 'Token expired'){
                    generateToken("sendingCode");
                }else if(result.message ==  'Email or username is wrong'){
                    $('.error_message').removeClass('show');
	                $('.error_message').addClass('show').html('Username atau email salah');
                }else if(result.message ==  'Account has not activated, check your email'){
                    $('.error_message').removeClass('show');
	                $('.error_message').addClass('show').html('Akun belum aktif, cek email anda.');
                }else{
                    $('.error_message').removeClass('show');
        	        $('.error_message').addClass('show').addClass('green').html('Cek email anda, dan masukan kode yang terlampir didalamnya');
        	        var codeVerificationElem = '<input type="text" id="codeForgotPass" class="inputSignin" placeholder="Masukan kode"/>';
        	            codeVerificationElem += '<i class="fa fa-user"></i>';
        	            codeVerificationElem += '<input type="hidden" id="codeForgotEmail" value="'+result.response.email+'"/>';
        	        $('.grid-signin-body .signinBodySub:first-child').html(codeVerificationElem);
        	       
        	        var buttonElem = '<input type="button" id="buttonForgotVerified" value="Masukan"/>';
        	        $('.signinBodySub.signupButton').html(buttonElem);
        	        $('.grid-signin-header.forgotpassword h1:last-child').html('');
        	       
        	       buttonverified();
                }
            } 
        });
    }
}