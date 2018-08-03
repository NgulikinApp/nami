function initCart(){
    var cartNgulikin = localStorage.getItem('cartNgulikin'),
        productPrice = "1000000",
        emailsession = localStorage.getItem('emailNgulikin'),
        loginsession = sessionStorage.getItem('loginNgulikin');
        
        cartNgulikin = parseInt(cartNgulikin);
    
    $( "#RegisOrNotCart" ).accordion();
    
    if(emailsession !== null){
        $( "#RegisOrNotCart" ).hide();
        $( ".detail-shoppingaccount-footer .title" ).css({"background":"#FFFFFF","border-bottom":"2px solid #F5F5F5"});
    }
    
    if(loginsession !== null && emailsession !== null){
        notif("info","Anda telah login sebagai "+emailsession,"center","center");
        sessionStorage.removeItem('loginNgulikin');
    }
        
    var productPriceCalc = numberFormat(productPrice);
    $('.productPriceCart').html(productPriceCalc);
        
    if(cartNgulikin !== null && cartNgulikin){
        $('#cart-filledlist').show();
        $('#cart-emptylist').hide();
        $('.container').addClass('cart');
        
        $('#sumProductCart').val(cartNgulikin);
    }else{
        localStorage.removeItem('cartNgulikin');
        $('#cart-filledlist').hide();
        $('#cart-emptylist').show();
        $('.container').removeClass('cart');
    }
    
    minCart(cartNgulikin);
    
    $('.minCart button').on('click', function (e) {
        cartNgulikin = cartNgulikin - 1;
        if(cartNgulikin == 1){
            minCart(cartNgulikin);
        }
        $('#sumProductCart').val(cartNgulikin);
        
        totalCartText(cartNgulikin,productPrice,$('#senderProductCart').val());
    });
    
    $('.plusCart button').on('click', function (e) {
        cartNgulikin = cartNgulikin + 1;
        $('.minCart button').prop('disabled',false);
        $('.minCart button').css('opacity','1');
        $('#sumProductCart').val(cartNgulikin);
        $('#sumProductSummaryCart').val(cartNgulikin);
        
        totalCartText(cartNgulikin,productPrice,$('#senderProductCart').val());
    });
    
    $('#senderProductCart').on('change', function (e) {
        var price = senderPriceCart($(this).val()).toString();
        $('.senderPriceProductCart').html(numberFormat(price));
        $('#sumProductSummaryCart').html(numberFormat(price));
        
        totalCartText(cartNgulikin,productPrice,$(this).val());
    });
    
    $('#buttonSignInCart').on( 'click', function( e ){
	   var email = $('#emailSigninCart').val();
	   var pass = $('#passSigninCart').val();
	   localStorage.setItem('emailNgulikin',email);
	   sessionStorage.setItem('loginNgulikin',1);
	   location.href = url+'/cart';
	   //var pass = (SHA256($('#passwordSignin').val())).toUpperCase();
	   //var signFlag = $('.signFlag').val();
	   //ajax_auth(urlAPI+'user/signin',email+':'+pass,url+"/signin",signFlag);
	});
	
	$('#emailSigninCart,#passSigninCart').keypress(function(e) {
	    if(e.which == 13) {
    	    $('#buttonSignInCart').trigger('click');
	    }
	});
    
    $('#iconSigninFb').on('click', function (e) {
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
    
    $('.detail-summary-footer').on('click', function (e) {
        sessionStorage.setItem('paymentNgulikin',1);
        location.href = url+"/payment";
    });
}

function minCart(cartNgulikin){
    if(cartNgulikin == 1){
        $('.minCart button').prop('disabled',true);
        $('.minCart button').css('opacity','0.5');
    }
}

function totalCartText(cartNgulikin,productPrice,senderProductCart){
    var totalPriceCart = cartNgulikin * parseInt(productPrice);
        
    var totalShoppingCart = totalPriceCart + senderPriceCart(senderProductCart);
        
    $('.totalPriceCart').html(numberFormat(totalPriceCart.toString()));
    $('.totalShoppingCart').html(numberFormat(totalShoppingCart.toString()));
}

function senderPriceCart(val){
    var price = 0;
    if(val == 'JNE'){
        price = 18000;
    }else{
        price = 208000;
    }
    return price;
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
        var authorizeButton = document.getElementById('signinGPlusCart');
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
        	location.href = url+"/cart";
        			     
        	gapi.auth2.getAuthInstance().signOut();
        });
    });
}

function getUserData() {
	FB.api('/me?fields=name,email', function(response) {
		localStorage.setItem('emailNgulikin', response.email);
		sessionStorage.setItem('loginNgulikin',1);
        location.href = url+"/cart";
	});
}