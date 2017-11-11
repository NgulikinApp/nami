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
	       $('.signinBodySub').addClass('hide');
	       $('.signinBodySub.codeVerification').removeClass('hide').addClass('show');
	       $('#codeForgotPass').attr('autofocus','autofocus');
	       $('.grid-signin-header.forgotpassword h1:last-child').html('');
	   }
    });
    
    $('#nameForgotPass').keypress(function(e) {
	    if(e.which == 13) {
    	    $('#buttonForgotSend').trigger('click');
	    }
	});
    
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
            $('.signinBodySub.codeVerification').removeClass('show');
            $('.signinBodySub.resetPass').addClass('show');
            $('#passNewForgot').attr('autofocus','autofocus');
            $('#codeForgotPass').removeAttr('autofocus','autofocus');
        }
    });
    
    $('#codeForgotPass').keypress(function(e) {
	    if(e.which == 13) {
    	    $('#buttonForgotVerified').trigger('click');
	    }
	});
    
    $('#buttonForgotChange').on( 'click', function( e ){
        var pass = $('#passNewForgot').val();
        var passNew = $('#passNewVerifiedForgot').val();
        
        if(pass === '' || passNew === ''){
            $('.error_message').removeClass('show').removeClass('green');
            $('.error_message').addClass('show');
            $('.error_message').html('Password baru harus diisi');
        }else if(pass !== passNew){
            $('.error_message').removeClass('show').removeClass('green');
            $('.error_message').addClass('show');
            $('.error_message').html('Password baru yang dimasukan kembali salah');
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