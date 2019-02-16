var search = {};

$( document ).ready(function() {
    initGeneral();
    initCart();
    handleClientLoad();
});

function initCart(){
    var cartNgulikin = 0,
        loginsession = sessionStorage.getItem('loginNgulikin');
    
    if(loginsession !== null){
        var fullname_popup = $('.fullname_popup').val();
        notif("info","Anda telah login sebagai "+fullname_popup,"center","center");
        sessionStorage.removeItem('loginNgulikin');
    }
    
    if($('.isSignin').val() !== '1'){
        $('.cartSignin').on('click', function (e) {
            location.href= url+'/signin';
        });
        
        $('#buttonCartAddress').on('click', function (e) {
            actionAddress();
        });
    }
    
    detailCart();
        
    $('#cart-filledlist').show();
    
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
                var response = data.result.listshops,
                    listElement = '',
                    totalPrice = 0;
                
                $.each( response, function( key, val ) {
                    var list_delivery = val.product_delivery,
                        list_products = val.products,
                        listlen_products = list_products.length-1;
                    
                    listElement += '<div class="detail-shopping-body-title">';
                    listElement += '    <div class="detail-shopping-choose">';
                    listElement += '        <input type="checkbox" id="shopcart'+key+'" class="chooseShopCart chooseProductCart"/> Pilih yang dibayar';
                    listElement += '    </div>';
                    listElement += '    <div class="detail-shopping-icon">';
                    listElement += '        <i class="fa fa-shopping-cart"></i>';
                    listElement += '    </div>';
                    listElement += '    <div class="detail-shopping-sellername">'+val.shop_name+'</div>';
                    listElement += '</div>';
                    listElement += '<div class="detail-shopping-body-content">';
                    
                    $.each( list_products, function(keyproduct , valproduct ) {
                        cartNgulikin = valproduct.sum_product;
                        var second_product_style = (keyproduct === 0) ? "" : 'margin-top: 15px;border-top: 1px solid #F5F5F5;';
                        
                        listElement += '<div style="overflow:auto;'+second_product_style+'">';
                        listElement += '    <div class="detail-shopping-body-content1">';
                        listElement += '        <div class="chooseProductCartTemp">';
                        listElement += '            <input type="checkbox" class="chooseProductCart productcart'+key+'"/>';
                        listElement += '        </div>';
                        listElement += '        <div class="disaligner">';
                        listElement += '            <img src="'+valproduct.product_image+'" width="100" height="100"/>';
                        listElement += '        </div>';
                        listElement += '        <div class="aligner">';
                        listElement += '            <div>'+valproduct.product_name+'</div>';
                        listElement += '        </div>';
                        listElement += '        <div class="aligner">';
                        listElement += '            <div class="productPriceCart" id="productPriceCart'+keyproduct+'" datainternal-id="'+valproduct.product_price+'">'+numberFormat(valproduct.product_price)+'</div>';
                        listElement += '        </div>';
                        listElement += '    </div>';
                        listElement += '    <div class="detail-shopping-body-content2">';
                        if(parseInt(valproduct.cart_sumproduct) === 1){
                            listElement += '        <div class="minCart" id="productmincart'+keyproduct+'">';
                            listElement += '            <button style="opacity:0.5;" disabled>-</button>';
                            listElement += '        </div>';
                        }else{
                            listElement += '        <div class="minCart" id="productmincart'+keyproduct+'">';
                            listElement += '            <button>-</button>';
                            listElement += '        </div>';
                        }
                        listElement += '        <div class="inputSumCartTemp">';
                        listElement += '            <input type="text" id="sumProductCart'+keyproduct+'" value="'+valproduct.cart_sumproduct+'"/>';
                        listElement += '        </div>';
                        listElement += '        <div class="plusCart" id="productmaxcart'+keyproduct+'">';
                        listElement += '            <button>+</button>';
                        listElement += '        </div>';
                        listElement += '    </div>';
                        if(keyproduct == listlen_products){
                            listElement += '    <hr/>';
                            listElement += '    <div class="detail-shopping-body-content3">';
                            listElement += '        <div class="title cart">Deskripsi Barang</div>';
                            listElement += '        <div class="inputDesc">';
                            listElement += '            <textarea id="descProductCart'+key+'" placeholder="Contoh:Warna, Jenis, Ukuran" rows="7"></textarea>';
                            listElement += '        </div>';
                            listElement += '    </div>';
                            listElement += '    <div class="detail-shopping-body-content4">';
                            listElement += '        <div class="title cart">Kurir</div>';
                            listElement += '        <div class="inputDesc">';
                            listElement += '            <div class="select">';
                            listElement += '                <select id="senderProductCart'+key+'">';
                            var delivery_id = '0';
                            var delivery_idflag = 0;
                            $.each( list_delivery, function( keydelivery, valdelivery ) {
                                if(delivery_idflag === 0)delivery_id = valdelivery.delivery_id;
                                listElement += '        <option value="'+valdelivery.delivery_id+'">'+valdelivery.delivery_name+'</option>';
                                delivery_idflag++;
                            });
                            listElement += '                </select>';
                            listElement += '            </div>';
                            listElement += '            <div>';
                            listElement += '                <span class="senderPriceProductCart">Rp 18.000</span>';
                            listElement += '            </div>';
                            listElement += '        </div>';
                            listElement += '    </div>';
                        }
                        listElement += '</div>';
                        
                        totalPrice = totalPrice + (valproduct.product_price * valproduct.cart_sumproduct);
                        var price = senderPriceCart(delivery_id).toString();
                        
                        $('#sumProductSummaryCart').html(numberFormat(price));
                        var totalPriceCart = valproduct.cart_sumproduct * parseInt(totalPrice);
                        var totalShoppingCart = totalPriceCart + senderPriceCart(delivery_id);
                                
                        $('.totalPriceCart').html(numberFormat(totalPriceCart.toString()));
                        $('.totalShoppingCart').html(numberFormat(totalShoppingCart.toString()));
                    });
                    listElement += '</div>';
                });
                
                $(".detail-shopping-body").html(listElement);
                $('.loaderProgress').addClass('hidden');
                $('body').removeClass('hiddenoverflow');
                
                $.each( response, function( key, val ) {
                    $('#shopcart'+key).on('click', function (e) {
                        if ($(this).prop("checked")) {
                            $('.productcart'+key).prop("checked",true);
                        }else{
                            $('.productcart'+key).prop("checked",false);
                        }
                    });
                    $.each( val.products, function( keyproduct, valproduct ) {
                        $('#productmincart'+keyproduct).on('click', function (e) {
                            cartNgulikin = parseInt($('#sumProductCart'+keyproduct).val()) - 1;
                            if(cartNgulikin == 1){
                                minCart(cartNgulikin);
                            }
                            $('#sumProductCart'+keyproduct).val(cartNgulikin);
                            
                            var totalsumcart = 0;
                            $(".inputSumCartTemp input").each(function(key,val) {
                                var sumcartval = parseInt($(this).val()) * parseInt($('#productPriceCart'+key).attr('datainternal-id'));
                                totalsumcart = totalsumcart + sumcartval;
                            });
                            var totalPriceCart = cartNgulikin * parseInt(totalPrice);
    
                            var totalShoppingCart = totalsumcart + senderPriceCart($('#senderProductCart'+key).val());
                                
                            $('.totalPriceCart').html(numberFormat(totalsumcart.toString()));
                            $('.totalShoppingCart').html(numberFormat(totalShoppingCart.toString()));
                        });
                        
                        $('#productmaxcart'+keyproduct).on('click', function (e) {
                            cartNgulikin = parseInt($('#sumProductCart'+keyproduct).val()) + 1;
                            $('#productmincart'+keyproduct+' button').prop('disabled',false);
                            $('#productmincart'+keyproduct+' button').css('opacity','1');
                            $('#sumProductCart'+keyproduct).val(cartNgulikin);
                            //$('#sumProductSummaryCart').val(cartNgulikin);
                            
                            var totalsumcart = 0;
                            $(".inputSumCartTemp input").each(function(key,val) {
                                var sumcartval = parseInt($(this).val()) * parseInt($('#productPriceCart'+key).attr('datainternal-id'));
                                totalsumcart = totalsumcart + sumcartval;
                            });
                            var totalPriceCart = cartNgulikin * parseInt(totalPrice);
    
                            var totalShoppingCart = totalsumcart + senderPriceCart($('#senderProductCart'+key).val());
                                
                            $('.totalPriceCart').html(numberFormat(totalsumcart.toString()));
                            $('.totalShoppingCart').html(numberFormat(totalShoppingCart.toString()));
                        });
                    });
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
                
                $('#chooseallCart').on('click', function (e) {
                    if ($(this).prop("checked")) {
                        $('.chooseProductCart').prop("checked",true);
                    }else{
                        $('.chooseProductCart').prop("checked",false);
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
        var authorizeButton = document.getElementById('iconSigninGplus');
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

function provinces(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(provinces);
    }else{
        $.ajax({
            type: 'GET',
            url: ADMINISTRATIVE_API,
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.status == "OK"){
                    var response = data.result;
                    
                    var listElement = '';
                    $.each( response, function( key, val ) {
                        listElement += '<option value="'+val.id+'">'+val.name+'</option>';
                    });
                    
                    $("#cart_province").html(listElement);
                }else{
                    generateToken(provinces);
                }
            } 
        });
    }
}

function regencies(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(regencies);
    }else{
        $.ajax({
            type: 'GET',
            url: ADMINISTRATIVE_API,
            data:{
                id : search.province
            },
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.status == "OK"){
                    var response = data.result;
                    
                    var listElement = '';
                    $.each( response, function( key, val ) {
                        listElement += '<option value="'+val.id+'">'+val.name+'</option>';
                        
                        if(search.regency === ''){
                            search.regency = val.id;
                            districts();   
                        }
                    });
                    
                    $("#cart_regency").html(listElement);
                }else{
                    generateToken(regencies);
                }
            } 
        });
    }
}

function districts(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(districts);
    }else{
        $.ajax({
            type: 'GET',
            url: ADMINISTRATIVE_API,
            data:{
                id : search.regency
            },
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.status == "OK"){
                    var response = data.result;
                    
                    var listElement = '';
                    $.each( response, function( key, val ) {
                        listElement += '<option value="'+val.id+'">'+val.name+'</option>';
                        
                        if(search.district === ''){
                            search.district = val.id;
                            villages();   
                        }
                    });
                    
                    $("#cart_district").html(listElement);
                }else{
                    generateToken(districts);
                }
            } 
        });
    }
}

function villages(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(villages);
    }else{
        $.ajax({
            type: 'GET',
            url: ADMINISTRATIVE_API,
            data:{
                id : search.district
            },
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.status == "OK"){
                    var response = data.result;
                    
                    var listElement = '';
                    $.each( response, function( key, val ) {
                        listElement += '<option value="'+val.id+'">'+val.name+'</option>';
                    });
                    
                    $("#cart_village").html(listElement);
                }else{
                    generateToken(villages);
                }
            } 
        });
    }
}

function doAddress(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(actionAddress);
    }else{
        
        $.ajax({
            type: 'POST',
            url: PROFILE_ADDRESS_ACTION_API,
            data:JSON.stringify({ 
                    provinces_id : $('#cart_province').val(),
                    regencies_id : $('#cart_regency').val(),
                    districts_id : $('#cart_district').val(),
                    villages_id : $('#cart_village').val(),
                    address : $('#cart_address').val(),
                    type : 'insert'
            }),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                    generateToken(actionAddress);
                }else if(data.message == 'Invalid key'){
                    localStorage.removeItem('emailNgulikin');
                    sessionStorage.setItem("logoutNgulikin", 1);
                    localStorage.removeItem('authNgulikin');
                    location.href = url;
                    localStorage.getItem('authNgulikin');
                }else{
                    notif("success","Data sudah disimpan","center","top");
                }
            } 
        });
    }
}

function actionAddress(){
     var actionAddress = '<div class="layerPopup">';
         actionAddress += '     <div class="editProfileSellerContainer" style="height: 560px;margin-top: -290px;">';
         actionAddress += '         <div class="title">Masukan Alamat</div>';
         actionAddress += '         <div style="overflow-y:auto;height: 475px;">';
         actionAddress += '             <div class="body">';
         actionAddress += '                 <div class="content">';
         actionAddress += '                     <label class="addressLabel">Nama Penerima</label>';
         actionAddress += '                     <input type="text" id="recipientname" class="addressInput"/>';
         actionAddress += '                 </div>';
         actionAddress += '                 <div class="content">';
         actionAddress += '                     <label class="addressLabel">Telepon/Handphone</label>';
         actionAddress += '                     <input type="text" id="notlp" class="addressInput"/>';
         actionAddress += '                 </div>';
         actionAddress += '                 <div class="content">';
         actionAddress += '                     <label class="addressLabel">Alamat Lengkap</label>';
         actionAddress += '                     <textarea id="completeaddress" class="addressInput"></textarea>';
         actionAddress += '                 </div>';
         actionAddress += '                 <div class="content">';
         actionAddress += '                     <label class="addressLabel">Pilih Provinsi</label>';
         actionAddress += '                     <select id="cart_province"></select>';
         actionAddress += '                 </div>';
         actionAddress += '                 <div class="content">';
         actionAddress += '                     <label class="addressLabel">Pilih Kota</label>';
         actionAddress += '                     <select id="cart_regency"></select>';
         actionAddress += '                 </div>';
         actionAddress += '                 <div class="content">';
         actionAddress += '                     <label class="addressLabel">Pilih Kecamatan</label>';
         actionAddress += '                     <select id="cart_district"></select>';
         actionAddress += '                 </div>';
         actionAddress += '                 <div class="content">';
         actionAddress += '                     <label class="addressLabel">Pilih Kelurahan</label>';
         actionAddress += '                     <select id="cart_village"></select>';
         actionAddress += '                 </div>';
         actionAddress += '             </div>';
         actionAddress += '         </div>';
         actionAddress += '         <div class="footer">';
	     actionAddress += '            <input type="button" value="Batal" id="cancel"/>';
	     actionAddress += '            <input type="button" value="Simpan" id="save"/>';
	     actionAddress += '         </div>';
         actionAddress += '     </div>';
         actionAddress += '</div>';
         
    $("body").append(actionAddress);
    
    provinces();
    search.province = 11;
    regencies();
    search.regency = 1101;
    districts();
    search.district = 1101010;
    villages();
    
    $('#cart_province').on('change', function (e) {
	    search.province = $(this).val();
	    search.regency = '';
	    search.district = '';
	    regencies();
	});
	
	$('#cart_regency').on('change', function (e) {
	    search.regency = $(this).val();
	    search.district = '';
	    districts();
	});
	
	$('#cart_district').on('change', function (e) {
	    search.district = $(this).val();
	    villages();
	});
    
    $('.editProfileSellerContainer .footer #save').on( 'click', function( e ){
        doAddress();
	});
	
	$('.editProfileSellerContainer .footer #cancel').on( 'click', function( e ){
	    $(".layerPopup").fadeOut();
	    $(".layerPopup").remove();
	});
}