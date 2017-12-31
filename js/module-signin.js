function initSignin(){
    var signinSessionEmail = sessionStorage.getItem('signinEmailNgulikin'),
        emailsession = sessionStorage.getItem('emailNgulikin'),
        url = 'http://init.ngulikin.com',
        urlAPI 	= 'http://api.ngulikin.com/v1/';
        
	if(signinSessionEmail !== null){
	    $('#emailSignin').val(signinSessionEmail);
	}
    
    $('#buttonSignIn').on( 'click', function( e ){
	   ajax_auth();
	});
	
	$('#emailSignin,#passwordSignin').keypress(function(e) {
	    if(e.which == 13) {
    	    $('#buttonSignIn').trigger('click');
	    }
	});
	
	$('#buttonSigninFb').on('click', function (e) {
        FB.init({
    		appId      : '1757942561184229',
    		xfbml      : true,
    		version    : 'v2.8'
    	});
    	//do the login
    	FB.login(function(response) {
    		if (response.authResponse) {
    			//user just authorized your app
    			getUserData();
    		}
    	}, {scope: 'email,public_profile', return_scopes: true});
    });
    
    $('#regisPopUpSignin').on( 'click', function( e ){
	   location.href = url+'/signup';
	});
	
	$('.signinBodyForgot').on( 'click', function( e ){
	   location.href = url+'/forgotpassword';
	});
}

function ajax_auth(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(ajax_auth);
    }else{
        var email = $('#emailSignin').val(),
	        pass = (SHA256($('#passwordSignin').val())).toUpperCase();
	    
	    if(email === '' || pass === ''){
	       $('.error_message').removeClass('show');
	       $('.error_message').addClass('show').html('Username dan password harus diisi');
	    }else{
    	   $.ajax({
                type: 'POST',
                data: JSON.stringify({ manual: 1,token: sessionStorage.getItem('tokenNgulikin')}),
                crossDomain: true,
                async: true,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(email+':'+pass)),
                    xhr.withCredentials = true;
                },
                url: SIGNIN_API,
                contentType: "application/json",
                dataType: "json",
                success: function(result) {
                    if(result.message == 'Invalid credential' || result.message == 'Token expired'){
                        generateToken(ajax_auth);
                    }else if(result.message ==  'Email or password is wrong'){
                        $('.error_message').removeClass('show');
	                    $('.error_message').addClass('show').html('Username atau password salah');
                    }else if(result.message ==  'Account has not activated, check your email'){
                        $('.error_message').removeClass('show');
	                    $('.error_message').addClass('show').html('Akun belum aktif, cek email anda.');
                    }else{
                        sessionStorage.setItem('loginNgulikin',1);
                        localStorage.setItem('emailNgulikin', email);
                        location.href = 'http://init.ngulikin.com';
                    }
                }
            });
	   }
    }
}

var CLIENT_ID = '279558050364-cp3evjt1fi39uh82cl304vq5orqob038.apps.googleusercontent.com';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];
var SCOPES = 'https://www.googleapis.com/auth/userinfo.profile';
            
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}
        
function initClient() {
    gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
    }).then(function () {
        var authorizeButton = document.getElementById('buttonSigninGplus');
        authorizeButton.onclick = handleAuthClick;
    });
}
        
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        listLabels();
    }
}
        
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
}
        
function listLabels() {
    gapi.client.load('plus','v1', function(){
        var request = gapi.client.plus.people.get({
        	'userId': 'me'
        });
        request.execute(function(resp) {
        	localStorage.setItem('emailNgulikin', resp.emails[0].value);
        	sessionStorage.setItem('loginNgulikin',1);
        	location.href = "http://init.ngulikin.com";
        			     
        	gapi.auth2.getAuthInstance().signOut();
        });
    });
}

function getUserData() {
	FB.api('/me?fields=name,email', function(response) {
		localStorage.setItem('emailNgulikin', response.email);
		sessionStorage.setItem('loginNgulikin',1);
        location.href = "http://init.ngulikin.com";
	});
}