function initCart(){
    var cartNgulikin = 0,
        loginsession = sessionStorage.getItem('loginNgulikin');
    
    $( "#RegisOrNotCart" ).accordion();
    
    if(loginsession !== null){
        var fullname_popup = $('.fullname_popup').val();
        notif("info","Anda telah login sebagai "+fullname_popup,"center","center");
        sessionStorage.removeItem('loginNgulikin');
    }
    
    if($('.isSignin').val() === '1'){
        $('#RegisOrNotCart').hide();
    }
    
    detailCart();
        
    $('#cart-filledlist').show();
    $('.container').addClass('cart');
    
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
}

function detailCart(){
    $.ajax({
        type: 'GET',
        url: PRODUCT_CART_API,
        dataType: 'json',
        beforeSend: function(xhr, settings) { 
            xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
        },
        success: function(data, status) {
            if(data.status == "OK"){
                var response = data.result;
                var listElement = '';
                
                var totalPrice = 0;
                $.each( response, function( key, val ) {
                    cartNgulikin = val.sum_product;
                    var list_delivery = val.product_delivery;
                    
                    listElement += '<div class="detail-shopping-body-title">';
                    listElement += '    <div id="detail-shopping-icon">';
                    listElement += '        <i class="fa fa-shopping-cart"></i>';
                    listElement += '    </div>';
                    listElement += '    <div id="detail-shopping-sellername">'+val.shop_name+'</div>';
                    listElement += '</div>';
                    listElement += '<div class="detail-shopping-body-content">';
                    listElement += '    <div class="detail-shopping-body-content1">';
                    listElement += '        <div class="disaligner">';
                    listElement += '            <img src="'+val.product_image+'" width="100" height="100"/>';
                    listElement += '        </div>';
                    listElement += '        <div class="aligner">';
                    listElement += '            <div>'+val.product_name+'</div>';
                    listElement += '        </div>';
                    listElement += '        <div class="aligner">';
                    listElement += '            <div class="productPriceCart">'+numberFormat(val.product_price)+'</div>';
                    listElement += '        </div>';
                    listElement += '    </div>';
                    listElement += '    <div class="detail-shopping-body-content2">';
                    if(parseInt(val.sum_product) === 1){
                        listElement += '        <div class="minCart">';
                        listElement += '            <button style="opacity:0.5;" disabled>-</button>';
                        listElement += '        </div>';
                    }else{
                        listElement += '        <div class="minCart">';
                        listElement += '            <button>-</button>';
                        listElement += '        </div>';
                    }
                    listElement += '        <div class="inputSumCartTemp">';
                    listElement += '            <input type="text" id="sumProductCart" value="'+val.sum_product+'"/>';
                    listElement += '        </div>';
                    listElement += '        <div class="plusCart">';
                    listElement += '            <button>+</button>';
                    listElement += '        </div>';
                    listElement += '    </div>';
                    listElement += '    <hr/>';
                    listElement += '    <div class="detail-shopping-body-content3">';
                    listElement += '        <div class="title">Catatan</div>';
                    listElement += '        <div class="inputDesc">';
                    listElement += '            <textarea id="descProductCart" placeholder="Contoh:Warna, Jenis, Ukuran" rows="7" cols="86"></textarea>';
                    listElement += '        </div>';
                    listElement += '    </div>';
                    listElement += '    <div class="detail-shopping-body-content4">';
                    listElement += '        <div class="title">Pilih Jasa Pengiriman</div>';
                    listElement += '        <div class="inputDesc">';
                    listElement += '            <select id="senderProductCart">';
                    var delivery_id = '0';
                    var delivery_idflag = 0;
                    $.each( list_delivery, function( key, val ) {
                        if(delivery_idflag === 0)delivery_id = val.delivery_id;
                        listElement += '        <option value="'+val.delivery_id+'">'+val.delivery_name+'</option>';
                        delivery_idflag++;
                    });
                    listElement += '            </select>';
                    listElement += '            <span class="senderPriceProductCart">Rp 18.000</span>';
                    listElement += '        </div>';
                    listElement += '    </div>';
                    listElement += '</div>';
                    
                    totalPrice = totalPrice + (val.product_price * val.sum_product);
                    var price = senderPriceCart(delivery_id).toString();
                    $('#sumProductSummaryCart').html(numberFormat(price));
                    totalCartText(val.sum_product,totalPrice,delivery_id);
                });
                
                $(".detail-shopping-body").html(listElement);
                $('.loaderProgress').addClass('hidden');
                
                $('.minCart button').on('click', function (e) {
                    cartNgulikin = parseInt($('#sumProductCart').val()) - 1;
                    if(cartNgulikin == 1){
                        minCart(cartNgulikin);
                    }
                    $('#sumProductCart').val(cartNgulikin);
                    
                    totalCartText(cartNgulikin,totalPrice,$('#senderProductCart').val());
                });
                
                $('.plusCart button').on('click', function (e) {
                    cartNgulikin = parseInt($('#sumProductCart').val()) + 1;
                    $('.minCart button').prop('disabled',false);
                    $('.minCart button').css('opacity','1');
                    $('#sumProductCart').val(cartNgulikin);
                    $('#sumProductSummaryCart').val(cartNgulikin);
                    
                    totalCartText(cartNgulikin,totalPrice,$('#senderProductCart').val());
                });
                
                $('#senderProductCart').on('change', function (e) {
                    var price = senderPriceCart($(this).val()).toString();
                    $('.senderPriceProductCart').html(numberFormat(price));
                    $('#sumProductSummaryCart').html(numberFormat(price));
                    
                    totalCartText(cartNgulikin,totalPrice,$(this).val());
                });
                
                $('.detail-summary-footer').on('click', function (e) {
                    if($('.isSignin').val() === '1'){
                        location.href = url+"/payment";
                    }else{
                        notif("error","Harap login terlebih dahulu","right","top");
                    }
                });
            }else{
                generateToken(detailCart);
            }
        } 
    });
}

function minCart(cartNgulikin){
    if(cartNgulikin === 1){
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
    sessionStorage.setItem('cartDelivery',val);
    if(val == '1'){
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