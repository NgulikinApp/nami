var search = {},
    cartData = {},
    doAddress = {},
    doDeleteAddress = {},
    updateProduct = {},
    chosenProduct = {},
    shipping = {},
    courier_id,
    senderPriceProductCart = 0,
    senderPriceArray = [],
    totalPrice = 0,
    senderPriceTotalTemp = 0;
    
$( document ).ready(function() {
    initGeneral();
    initCart();
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
    
    if($('.isSignin').val() === '1'){
        detailAddress();
        $('#buttonCartAddress').on('click', function (e) {
            doAddress.action = "add";
            actionAddress();
        });
    }else{
        handleClientLoad();
    }
        
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
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("detailCart");
    }else{
        $.ajax({
            type: 'GET',
            url: PRODUCT_CART_API,
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.status == "OK"){
                    if(data.result.totalproducts > 0){
                        var response = data.result.listshops,
                            listElement = '';
                        
                        $.each( response, function( key, val ) {
                            var list_delivery = val.product_delivery,
                                list_products = val.products,
                                sum_productweights = 0,
                                shop_delivery = 0,
                                listlen_products = list_products.length-1;
                            
                            listElement += '<div class="detail-shopping-body-title" style="border-bottom: 0;">';
                            listElement += '    <div class="detail-shopping-choose">';
                            listElement += '        <input type="checkbox" id="shopcart'+key+'" class="chooseShopCart chooseProductCart" checked="checked"/> Pilih yang dibayar';
                            listElement += '    </div>';
                            listElement += '    <div class="detail-shopping-icon">';
                            listElement += '        <i class="fa fa-shopping-cart"></i>';
                            listElement += '    </div>';
                            listElement += '    <div class="detail-shopping-sellername">'+val.shop_name+'</div>';
                            listElement += '</div>';
                            listElement += '<div class="detail-shopping-body-content">';
                            
                            $.each( list_products, function(keyproduct , valproduct ) {
                                sum_productweights = valproduct.product_weight;
                                cartNgulikin = valproduct.sum_product;
                                var second_product_style = (keyproduct === 0) ? "" : 'margin-top: 15px;border-top: 1px solid #F5F5F5;';
                                
                                listElement += '<div style="overflow:auto;'+second_product_style+'">';
                                listElement += '    <div class="detail-shopping-body-content1">';
                                listElement += '        <div class="chooseProductCartTemp">';
                                listElement += '            <input type="checkbox" class="chooseProductCart chkproduct productcart'+key+' shopndx" datainternal-id="'+valproduct.product_id+'" checked="checked"/>';
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
                                listElement += '        <div class="aligner">';
                                listElement += '            <span class="deleteCart" id="deleteCart'+keyproduct+'" datainternal-id="'+valproduct.product_id+'"><img src="/img/note-delete.png"/> Hapus</span>';
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
                                listElement += '            <input type="text" class="sumProduct" id="sumProductCart'+keyproduct+'" datainternal-id="'+valproduct.product_id+'" value="'+valproduct.cart_sumproduct+'" maxlength="3"/>';
                                listElement += '        </div>';
                                listElement += '        <div class="plusCart" id="productmaxcart'+keyproduct+'">';
                                listElement += '            <button>+</button>';
                                listElement += '        </div>';
                                listElement += '    </div>';
                                if(keyproduct == listlen_products){
                                    listElement += '    <hr/>';
                                    listElement += '    <div class="detail-shopping-body-content4">';
                                    listElement += '        <div class="title cart">Kurir</div>';
                                    listElement += '        <div class="inputDesc">';
                                    listElement += '            <div class="select">';
                                    listElement += '                <select class="senderProductCart" id="senderProductCart'+key+'" data-courier_id="'+courier_id+'" data-shop_courier_id="'+val.shop_courier_id+'" data-sum_productweights="'+sum_productweights+'" data-shop_delivery="'+shop_delivery+'">';
                                    var delivery_id = '0';
                                    var delivery_idflag = 0;
                                    $.each( list_delivery, function( keydelivery, valdelivery ) {
                                        if(delivery_idflag === 0)delivery_id = valdelivery.delivery_id;
                                        if(delivery_idflag === 0)shop_delivery = valdelivery.delivery_id;
                                        listElement += '        <option value="'+valdelivery.delivery_id+'">'+valdelivery.delivery_name+'</option>';
                                        delivery_idflag++;
                                    });
                                    listElement += '                </select>';
                                    listElement += '            </div>';
                                    listElement += '            <div>';
                                    listElement += '                <span class="senderPriceProductCart" id="senderPriceProductCart'+key+'">Rp 18.000</span>';
                                    listElement += '            </div>';
                                    listElement += '        </div>';
                                    listElement += '    </div>';
                                    listElement += '    <div class="detail-shopping-body-content3">';
                                    listElement += '        <div class="title cart">Deskripsi Barang</div>';
                                    listElement += '        <div class="inputDesc">';
                                    listElement += '            <textarea class="descProductCart" id="descProductCart'+key+'" placeholder="Contoh:Warna, Jenis, Ukuran" rows="7"></textarea>';
                                    listElement += '        </div>';
                                    listElement += '    </div>';
                                }
                                listElement += '</div>';
                                
                                totalPrice = totalPrice + (valproduct.product_price * valproduct.cart_sumproduct);
                                var price = senderPriceCart(delivery_id).toString();
                                
                                var totalPriceCart = valproduct.cart_sumproduct * parseInt(totalPrice);
                                var totalShoppingCart = totalPriceCart + senderPriceCart(delivery_id);
                                        
                                $('.totalPriceCart').html(numberFormat(totalPriceCart.toString()));
                            });
                            listElement += '</div>';
                            
                            senderPriceProductCart = key;
                            
                            shipping.origin = courier_id;
                            shipping.destination = val.shop_courier_id;
                            shipping.weight = sum_productweights;
                            shipping.courier = shop_delivery;
                            shippingcost();
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
                            $('.productcart'+key).on('click', function (e) {
                                var chkproduct = $(this),
                                    chkproductLen = chkproduct.length;
                                $('#shopcart'+key).prop("checked",false);
                                    
                                for(var i = 0; i < chkproductLen; i++){
                                    if($(chkproduct[i]).prop("checked")){
                                        $('#shopcart'+key).prop("checked",true);
                                    }
                                }
                            });
                            $.each( val.products, function( keyproduct, valproduct ) {
                                $('#productmincart'+keyproduct).on('click', function (e) {
                                    cartNgulikin = parseInt($('#sumProductCart'+keyproduct).val()) - 1;
                                    minCart(cartNgulikin);
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
                                    
                                    updateProduct.product_id = $('#sumProductCart'+keyproduct).attr('datainternal-id');
                                    updateProduct.sum = cartNgulikin;
                                    
                                    updateCartProduct();
                                });
                                
                                $('#productmaxcart'+keyproduct).on('click', function (e) {
                                    if(parseInt($('#sumProductCart'+keyproduct).val()) < valproduct.product_stock){
                                        cartNgulikin = parseInt($('#sumProductCart'+keyproduct).val()) + 1;
                                    
                                        if(cartNgulikin > 123){
                                            cartNgulikin = 123;
                                            $(this).val(cartNgulikin);
                                        }
                                        
                                        $('#productmincart'+keyproduct+' button').prop('disabled',false);
                                        $('#productmincart'+keyproduct+' button').css('opacity','1');
                                        $('#sumProductCart'+keyproduct).val(cartNgulikin);
                                        
                                        var totalsumcart = 0;
                                        $(".inputSumCartTemp input").each(function(key,val) {
                                            var sumcartval = parseInt($(this).val()) * parseInt($('#productPriceCart'+key).attr('datainternal-id'));
                                            totalsumcart = totalsumcart + sumcartval;
                                        });
                                        var totalPriceCart = cartNgulikin * parseInt(totalPrice);
                
                                        var totalShoppingCart = totalsumcart + senderPriceTotalTemp;
                                            
                                        $('.totalPriceCart').html(numberFormat(totalsumcart.toString()));
                                        $('.totalShoppingCart').html(numberFormat(totalShoppingCart));
                                        
                                        updateProduct.product_id = $('#sumProductCart'+keyproduct).attr('datainternal-id');
                                        updateProduct.sum = cartNgulikin;
                                        
                                        updateCartProduct();
                                    }
                                });
                                
                                $('#sumProductCart'+keyproduct).on('change', function (e) {
                                    if(parseInt($(this).val()) < valproduct.product_stock){
                                        if($(this).val() == ''){
                                            $(this).val(1);
                                        }
                                        
                                        if(parseInt($(this).val()) > 123){
                                            $(this).val(123);
                                        }
                                        cartNgulikin = parseInt($('#sumProductCart'+keyproduct).val());
                                        minCart(cartNgulikin);
                                        
                                        var totalsumcart = 0;
                                        $(".inputSumCartTemp input").each(function(key,val) {
                                            var sumcartval = parseInt($(this).val()) * parseInt($('#productPriceCart'+key).attr('datainternal-id'));
                                            totalsumcart = totalsumcart + sumcartval;
                                        });
                                        var totalPriceCart = cartNgulikin * parseInt(totalPrice);
                
                                        var totalShoppingCart = totalsumcart + senderPriceTotalTemp;
                                            
                                        $('.totalPriceCart').html(numberFormat(totalsumcart.toString()));
                                        $('.totalShoppingCart').html(numberFormat(totalShoppingCart));
                                        
                                        updateProduct.product_id = $('#sumProductCart'+keyproduct).attr('datainternal-id');
                                        updateProduct.sum = cartNgulikin;
                                        
                                        updateCartProduct();
                                    }else{
                                        $(this).val(valproduct.cart_sumproduct);
                                    }
                                });
                                
                                $('#sumProductCart'+keyproduct).keydown(function (e) {
                                    // Allow: backspace, delete, tab, escape, enter and .
                                    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                                         // Allow: Ctrl/cmd+A
                                        (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                                         // Allow: Ctrl/cmd+C
                                        (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
                                         // Allow: Ctrl/cmd+X
                                        (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
                                         // Allow: home, end, left, right
                                        (e.keyCode >= 35 && e.keyCode <= 39)) {
                                             // let it happen, don't do anything
                                             return;
                                    }
                                    // Ensure that it is a number and stop the keypress
                                    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                                        e.preventDefault();
                                    }
                                });
                                
                                $('#deleteCart'+keyproduct).on('click', function (e) {
                                    var productid = $(this).attr('datainternal-id');
                                    $.confirm({
                                        title: 'Konfirmasi',
                                        icon: 'fa fa-warning',
                                        content: 'Yakin dihapus?',
                                        buttons: {
                                            ya: function () {
                                                cartData.product_id = productid;
                                                deletecartProduct();
                                            },
                                            tidak: function () {
                                            }
                                        }
                                    });
                                });    
                            });
                            
                            $('#senderProductCart'+key).on('change', function (e) {
                                senderPriceProductCart = key;
                            
                                shipping.origin = $(this).data('courier_id');
                                shipping.destination = $(this).data('shop_courier_id');
                                shipping.weight = $(this).data('sum_productweights');
                                shipping.courier = $(this).data('shop_delivery');
                                shippingcost();
                            });
                        });
                        
                        $('.detail-summary-footer').on('click', function (e) {
                            var chkproduct = $(".chkproduct"),
                                chkproductList = '',
                                chkproductLen = chkproduct.length;
                                
                            for(var i = 0; i < chkproductLen; i++){
                                if($(chkproduct[i]).prop("checked")){
                                    if(chkproductList === ''){
                                        chkproductList += $(chkproduct[i]).attr('datainternal-id');
                                    }else{
                                        chkproductList += ','+$(chkproduct[i]).attr('datainternal-id');
                                    }
                                }
                            }
                            
                            if($('.isSignin').val() !== '1'){
                                notif("error","Harap login terlebih dahulu","right","top");
                            }else if(chkproductList === ''){
                                notif("error","Pilih salah satu produk yang ingin dibeli","right","top");
                            }else if($('#addressId').val() === ''){
                                notif("error","Pilih alamat terlebih dahulu","right","top");
                            }else{
                                chosenProduct.listproduct = chkproductList;
                                chosenCart();
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
                        var listElement = '<div id="cart-emptylist">';
                            listElement += '    <div class="grid-cart-header fn-15">Detail Belanja</div>';
                            listElement += '    <div class="grid-cart-body"></div>';
                            listElement += '    <div class="grid-cart-footer">';
                            listElement += '        <div>Keranjang kosong</div>';
                            listElement += '    </div>';
                            listElement += '</div>';
                        
                        $('.cart-detail').html(listElement);
                        $('.loaderProgress').addClass('hidden');
                        $('body').removeClass('hiddenoverflow');
                    }
                }else{
                    generateToken("detailCart");
                }
            } 
        });
    }
}

function minCart(cartNgulikin){
    if(cartNgulikin === 1){
        $('.minCart button').prop('disabled',true);
        $('.minCart button').css('opacity','0.5');
    }else{
        $('.minCart button').prop('disabled',false);
        $('.minCart button').css('opacity','1');
    }
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

function updateCartProduct(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("addtocartProduct");
    }else{
        $.ajax({
            type: 'POST',
            url: PRODUCT_CART_UPDATE_API,
            data:JSON.stringify({ 
                    product_id: updateProduct.product_id,
                    cart_sumproduct: updateProduct.sum
            }),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                    generateToken("updateCartProduct");
                }
            }
        });
    }
}

function chosenCart(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("chosenCart");
    }else{
        var chsshop = $(".chooseShopCart"),
            senderProductCart = '',
            senderProductPriceCart = '',
            descProductCart = '';
                        
            for(var i = 0; i < chsshop.length; i++){
                if($(chsshop[i]).prop("checked")){
                    if(senderProductCart === ''){
                        senderProductCart += $('#senderProductCart'+i).val();
                        descProductCart += $('#descProductCart'+i).val();
                        senderProductPriceCart += senderPriceCart($('#senderProductCart'+i).val());
                    }else{
                        senderProductCart += ',' + $('#senderProductCart'+i).val();
                        descProductCart += '~' + $('#descProductCart'+i).val();
                        senderProductPriceCart += ',' + senderPriceCart($('#senderProductCart'+i).val());
                    }
                }
            }
            
        $.ajax({
            type: 'POST',
            url: PRODUCT_CART_CHOSEN_API,
            data:JSON.stringify({ 
                list_productid: chosenProduct.listproduct,
                user_address_id: $('#addressId').val(),
                list_delivery_id: senderProductCart,
                list_notes: descProductCart,
                list_delivery_price: senderProductPriceCart
            }),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                    generateToken("chosenCart");
                }else{
                    location.href = url+"/payment/"+data.result.invoice_no;
                }
            }
        });
    }
}

function detailAddress(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("detailAddress");
    }else{
        $.ajax({
            type: 'GET',
            url: PROFILE_ADDRESS_API,
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.status == "OK"){
                    if($.isEmptyObject(data.result) === false){
                        courier_id = data.result.courier_id;
                        
                        var detailAddress = '<div class="cart-menu-grid">';
                            detailAddress +=    data.result.fullname;
                            detailAddress += '</div>';
                            detailAddress += '<div class="cart-menu-grid">';
                            detailAddress += '  <div class="address-grid">';
                            detailAddress += '      <div id="addressLoc">';
                            detailAddress += '          <img src="/img/marker.png" style="margin-left: -3.5px;"/>';
                            detailAddress +=            data.result.address+' , '+data.result.village_name+' '+data.result.district_name+' '+data.result.regency_name+' '+data.result.province_name;
                            detailAddress += '      </div>';
                            detailAddress += '  </div>';
                            detailAddress += '  <div class="address-grid">';
                            detailAddress += '      <img src="/img/hp.png" style="margin-right: 12px;"/>';
                            detailAddress +=        data.result.nohp;
                            detailAddress += '  </div>';
                            detailAddress += '  <div class="address-grid">';
                            detailAddress += '      <img src="/img/envelope.png"/>';
                            detailAddress +=        data.result.email;
                            detailAddress += '  </div>';
                            detailAddress += '</div>';
                            
                            $(".cart-menu:first-child").html(detailAddress);
                            
                        var detailAddress = '  <div class="address-grid">';
                            detailAddress += '      <i class="fa fa-pencil"></i> Pilih alamat';
                            detailAddress += '  </div>';
                            detailAddress += '  <div class="address-grid">';
                            detailAddress += '      <i class="fa fa-check"></i> Ubah alamat';
                            detailAddress += '  </div>';
                            detailAddress += '  <div class="address-grid">';
                            detailAddress += '      <i class="fa fa-plus"></i> Tambah alamat';
                            detailAddress += '  </div>';
                        
                            $(".cart-menu:last-child").html(detailAddress);
                        
                        $("#addressFullname").val(data.result.fullname);
                        $("#addressLocation").val(data.result.address);
                        $("#addressNohp").val(data.result.nohp);
                        $("#addressProvince").val(data.result.provinces_id);
                        $("#addressRegency").val(data.result.regencies_id);
                        $("#addressDistrict").val(data.result.districts_id);
                        $("#addressVillage").val(data.result.villages_id);
                        $("#addressId").val(data.result.user_address_id);
                        
                        $('.cart-menu:last-child .address-grid:first-child').on('click', function (e) {
                            selectAddress();
                        });
                        
                        $('.cart-menu:last-child .address-grid:nth-child(2)').on('click', function (e) {
                            doAddress.action = "edit";
                            actionAddress();
                        });
                        
                        $('.cart-menu:last-child .address-grid:last-child').on('click', function (e) {
                            doAddress.action = "add";
                            actionAddress();
                        });
                    }
                    
                    detailCart();
                }else{
                    generateToken("detailAddress");
                }
            } 
        });
    }
}

function selectAddress(){
    var selectAddress = '<div class="layerPopup">';
        selectAddress += '    <div class="accountSellerContainer productLayer" style="width:550px;height: 330px;">';
        selectAddress += '        <div class="title">Daftar Alamat</div>';
        selectAddress += '        <div class="body" style="min-height: 250px;padding: 0px 15px;">';
        selectAddress += '        </div>';
        selectAddress += '        <div class="footer">';
	    selectAddress += '            <input type="button" value="Batal" id="cancel"/>';
	    selectAddress += '            <input type="button" value="Simpan" id="save"/>';
	    selectAddress += '        </div>';
	    selectAddress += '        <div class="loaderPopup hidden">';
	    selectAddress += '            <img src="../img/loader.gif"/>';
	    selectAddress += '        </div>';
        selectAddress += '     </div>';
        selectAddress += '</div>';
    
    $("body").append(selectAddress);
    
    listAddress();
    
    $('.accountSellerContainer .footer #save').on( 'click', function( e ){
        chooseAddress();
    });
        
    $('.accountSellerContainer .footer #cancel').on( 'click', function( e ){
    	$(".layerPopup").fadeOut();
    	$(".layerPopup").remove();
    });
}

function listAddress(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("listAddress");
    }else{
        $.ajax({
            type: 'GET',
            url: PROFILE_ADDRESS_LIST_API,
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.status == "OK"){
                    var response = data.result;
                    
                    var listElement = '';
                        listElement += '<table style="width: 100%;margin: 0px;">';
                        listElement += '    <tr>';
                        listElement += '        <td>Pilih</td>';
                        listElement += '        <td>Penerima</td>';
                        listElement += '        <td>Alamat</td>';
                        listElement += '        <td>Hapus</td>';
                        listElement += '    </tr>';
                    $.each( response, function( key, val ) {
                        var checked = val.priority === '1'? 'checked' : '';
                        listElement += '    <tr>';
                        listElement += '        <td>';
                        listElement += '            <input type="radio" name="addressid" value="'+val.user_address_id+'" '+checked+'/> ';
                        listElement += '        </td>';
                        listElement += '        <td>';
                        listElement +=              val.recipientname;
                        listElement += '        </td>';
                        listElement += '        <td>';
                        listElement +=              val.address;
                        listElement += '        </td>';
                        listElement += '        <td>';
                        if(checked === ''){
                            listElement += '            <i class="fa fa-trash deleteAddress" datainternal-id="'+val.user_address_id+'"></i>';
                        }else{
                            listElement += 'Prioritas';
                        }
                        listElement += '        </td>';
                        listElement += '    </tr>';
                    });
                    listElement += '</table>';
                    
                    $(".accountSellerContainer .body").html(listElement);
                    
                    $('.deleteAddress').on( 'click', function( e ){
                        var deleteAddressid = $(this).attr('datainternal-id');
                        $.confirm({
                            title: 'Konfirmasi',
                            icon: 'fa fa-warning',
                            content: 'Yakin dihapus?',
                            buttons: {
                                ya: function () {
                                    doAddress.action = "delete";
                                    doDeleteAddress.id = deleteAddressid;
                                    deleteAddress();
                                },
                                tidak: function () {
                                }
                            }
                        });
                    });
                }else{
                    generateToken("listAddress");
                }
            } 
        });
    }
}

function deleteAddress(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("deleteAddress");
    }else{
        $.ajax({
            type: 'POST',
            url: PROFILE_ADDRESS_ACTION_API,
            data:JSON.stringify({
                user_address_id : doDeleteAddress.id,
                type : doAddress.action
            }),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                    generateToken("deleteAddress");
                }else{
                    listAddress();
                }
            }
        });
    }
}

function chooseAddress(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("chooseAddress");
    }else{
        $.ajax({
            type: 'POST',
            url: PROFILE_ADDRESS_SELECT_API,
            data:JSON.stringify({ 
                    user_address_id: $('input[name="addressid"]:checked').val(),
            }),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                    generateToken("chooseAddress");
                }else{
    	            var detailAddress = '<div class="cart-menu-grid">';
                        detailAddress +=    data.result.fullname;
                        detailAddress += '</div>';
                        detailAddress += '<div class="cart-menu-grid">';
                        detailAddress += '  <div class="address-grid">';
                        detailAddress += '      <img src="/img/marker.png"/>';
                        detailAddress +=        data.result.address;
                        detailAddress += '  </div>';
                        detailAddress += '  <div class="address-grid">';
                        detailAddress += '      <img src="/img/hp.png"/>';
                        detailAddress +=        data.result.nohp;
                        detailAddress += '  </div>';
                        detailAddress += '  <div class="address-grid">';
                        detailAddress += '      <img src="/img/envelope.png"/>';
                        detailAddress +=        data.result.email;
                        detailAddress += '  </div>';
                        detailAddress += '</div>';
                        
                    $(".cart-menu:first-child").html(detailAddress);
                    
                    $("#addressFullname").val(data.result.fullname);
                    $("#addressLocation").val(data.result.address);
                    $("#addressNohp").val(data.result.nohp);
                    $("#addressProvince").val(data.result.provinces_id);
                    $("#addressRegency").val(data.result.regencies_id);
                    $("#addressDistrict").val(data.result.districts_id);
                    $("#addressVillage").val(data.result.villages_id);
			        $('#addressId').val(data.result.user_address_id);
                    
                    $(".layerPopup").fadeOut();
    	            $(".layerPopup").remove();
                }
            }
        });
    }
}

function deletecartProduct(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("deletecartProduct");
    }else{
        $.ajax({
            type: 'POST',
            url: PRODUCT_CART_DELETE_API,
            data:JSON.stringify({ 
                    product_id: cartData.product_id,
            }),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                    generateToken("deletecartProduct");
                }else{
                    location.reload();
                }
            }
        });
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
        generateToken("provinces");
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
                    generateToken("provinces");
                }
            } 
        });
    }
}

function regencies(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("regencies");
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
                    generateToken("regencies");
                }
            } 
        });
    }
}

function districts(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("districts");
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
                    generateToken("districts");
                }
            } 
        });
    }
}

function villages(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("villages");
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
                    generateToken("villages");
                }
            } 
        });
    }
}

function doActionAddress(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("doActionAddress");
    }else{
        $.ajax({
            type: 'POST',
            url: PROFILE_ADDRESS_ACTION_API,
            data:JSON.stringify({
                    recipientname : $('#recipientname').val(),
                    provinces_id : $('#cart_province').val(),
                    regencies_id : $('#cart_regency').val(),
                    districts_id : $('#cart_district').val(),
                    villages_id : $('#cart_village').val(),
                    address : $('#completeaddress').val(),
                    phone : $('#notlp').val(),
                    type : doAddress.action,
                    user_address_id : $('#addressId').val()
            }),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                    generateToken("doActionAddress");
                }else if(data.message == 'Invalid key'){
                    localStorage.removeItem('emailNgulikin');
                    sessionStorage.setItem("logoutNgulikin", 1);
                    localStorage.removeItem('authNgulikin');
                    location.href = url;
                    localStorage.getItem('authNgulikin');
                }else{
                    detailAddress();
                    $(".layerPopup").fadeOut();
	                $(".layerPopup").remove();
                    notif("success","Data sudah disimpan","center","top");
                }
            } 
        });
    }
}

function actionAddress(){
     var actionAddress = '<div class="layerPopup">';
         actionAddress += '     <div class="editProfileSellerContainer" style="height: 550px;width: 500px;margin-top: -290px;">';
         actionAddress += '         <div class="title">Masukan Alamat</div>';
         actionAddress += '         <div style="height: 455px;">';
         actionAddress += '             <div class="body">';
         actionAddress += '                 <div class="content">';
         actionAddress += '                     <span class="addressLabel">Nama Penerima</span>';
         actionAddress += '                     <input type="text" id="recipientname" class="addressInput"/>';
         actionAddress += '                 </div>';
         actionAddress += '                 <div class="content">';
         actionAddress += '                     <span class="addressLabel">Telepon/Handphone</span>';
         actionAddress += '                     <input type="text" id="notlp" class="addressInput"/>';
         actionAddress += '                 </div>';
         actionAddress += '                 <div class="content">';
         actionAddress += '                     <span class="addressLabel">Alamat Lengkap</span>';
         actionAddress += '                     <textarea id="completeaddress" class="addressInput"></textarea>';
         actionAddress += '                 </div>';
         actionAddress += '                 <div class="content">';
         actionAddress += '                     <span class="addressLabel">Pilih Provinsi</span>';
         actionAddress += '                     <div class="select">';
         actionAddress += '                         <select id="cart_province"></select>';
         actionAddress += '                     </div>';
         actionAddress += '                 </div>';
         actionAddress += '                 <div class="content">';
         actionAddress += '                     <span class="addressLabel">Pilih Kota</span>';
         actionAddress += '                     <div class="select">';
         actionAddress += '                         <select id="cart_regency"></select>';
         actionAddress += '                     </div>';
         actionAddress += '                 </div>';
         actionAddress += '                 <div class="content">';
         actionAddress += '                     <span class="addressLabel">Pilih Kecamatan</span>';
         actionAddress += '                     <div class="select">';
         actionAddress += '                         <select id="cart_district"></select>';
         actionAddress += '                     </div>';
         actionAddress += '                 </div>';
         actionAddress += '                 <div class="content">';
         actionAddress += '                     <span class="addressLabel">Pilih Kelurahan</span>';
         actionAddress += '                     <div class="select">';
         actionAddress += '                         <select id="cart_village"></select>';
         actionAddress += '                     </div>';
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
    
    if(doAddress.action === "add"){
        provinces();
        search.province = 11;
        regencies();
        search.regency = 1101;
        districts();
        search.district = 1101010;
        villages(); 
    }else{
        var fullname = $("#addressFullname").val(),
            address = $("#addressLocation").val(),
            nohp = $("#addressNohp").val(),
            provinces_id = parseInt($("#addressProvince").val()),
            regencies_id = parseInt($("#addressRegency").val()),
            districts_id = parseInt($("#addressDistrict").val()),
            villages_id = parseInt($("#addressVillage").val());
                    
        $("#recipientname").val(fullname);
        $("#completeaddress").val(address);
        $("#notlp").val(nohp);
        
        provinces();
        search.province = provinces_id;
        regencies();
        search.regency = regencies_id;
        districts();
        search.district = districts_id;
        villages(); 
    }
    
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
        doActionAddress();
	});
	
	$('.editProfileSellerContainer .footer #cancel').on( 'click', function( e ){
	    $(".layerPopup").fadeOut();
	    $(".layerPopup").remove();
	});
}

function shippingcost(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("shippingcost");
    }else{
        $.ajax({
            type: 'GET',
            url: SHIPPINGCOST_API,
            data:{
                origin : shipping.origin,
                destination : shipping.destination,
                weight : shipping.weight,
                courier : shipping.courier
            },
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                var cost = numberFormat(data.rajaongkir.results[0].costs[0].cost[0].value);
                senderPriceArray[senderPriceProductCart] = data.rajaongkir.results[0].costs[0].cost[0].value;
                $("#senderPriceProductCart"+senderPriceProductCart).html(cost);
                
                var senderPriceArrayCount = senderPriceArray.length;
                var senderPriceTotal = 0;
                for(var i=0;i<senderPriceArrayCount;i++){
                    senderPriceTotal = senderPriceTotal + senderPriceArray[i];
                }
                senderPriceTotalTemp = senderPriceTotal;
                $("#sumProductSummaryCart").html(numberFormat(senderPriceTotal));
                $('.totalShoppingCart').html(numberFormat(totalPrice+senderPriceTotal));
                
                /*if(data.status == "OK"){
                    
                }else{
                    generateToken("shippingcost");
                }*/
            } 
        });
    }
}