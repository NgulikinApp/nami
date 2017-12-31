function initForgotPassword(){
    var url = 'http://init.ngulikin.com';
    
    $('#backLogin').on('click', function (e) {
        location.href = url+"/signin";
    });
    $('#backRegis').on('click', function (e) {
        $location.href = url+"/signup";
    });
    
    $('#buttonForgotSend').on( 'click', function( e ){
	   var name = $('#nameForgotPass').val();
	   if(name === ''){
	       $('.error_message').removeClass('show');
	       $('.error_message').addClass('show').html('Username atau email harus diisi');
	   }else if(name !== 'admin'){
	       $('.error_message').removeClass('show');
	       $('.error_message').addClass('show').html('Username atau email tidak ada');
	   }else{
	       $('.error_message').removeClass('show');
	       $('.error_message').addClass('show').addClass('green').html('Cek email anda, dan masukan kode yang terlampir didalamnya');
	       var codeVerificationElem = '<input type="text" id="codeForgotPass" class="inputSignin" placeholder="Masukan kode"/>';
	           codeVerificationElem += '<i class="fa fa-user"></i>';
	       $('.grid-signin-body .signinBodySub:first-child').html(codeVerificationElem);
	       
	       var buttonElem = '<input type="button" id="buttonForgotVerified" value="Masukan"/>';
	       $('.signinBodySub.signupButton').html(buttonElem);
	       $('.grid-signin-header.forgotpassword h1:last-child').html('');
	       
	       buttonverified();
	   }
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
        if(code === ''){
            $('.error_message').removeClass('green');
	        $('.error_message').html('Kode harus diisi');
        }else if(code !== '1122'){
            $('.error_message').removeClass('green');
            $('.error_message').html('Kode yang dimasukan tidak benar');
        }else{
            $('.error_message').removeClass('show');
            var resetPassElem = '<input type="password" id="passNewForgot" class="inputSignin" placeholder="Masukan password baru"/>';
	            resetPassElem += '<i class="fa fa-lock"></i>';
	           $('.grid-signin-body .signinBodySub:first-child').html(resetPassElem);
	        
	        var buttonElem = '<input type="button" id="buttonForgotChange" value="Ganti"/>';
	        $('.signinBodySub.signupButton').html(buttonElem);
	        
	        buttonnewpass();
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
        var pass = $('#passNewForgot').val();
        
        if(pass === ''){
            $('.error_message').removeClass('show').removeClass('green');
            $('.error_message').addClass('show');
            $('.error_message').html('Password baru harus diisi');
        }else{
            $('.error_message').removeClass('show').addClass('show').addClass('green');
            $('.error_message').html('Password telah diubah, silahkan login kembali');
        }
    });
	
    $('#passNewForgot,#passNewVerifiedForgot').keypress(function(e) {
	    if(e.which == 13) {
    	    $('#buttonForgotChange').trigger('click');
	    }
	});
}