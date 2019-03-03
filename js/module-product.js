var rateData = {},
    addtocartSum = {},
    productData = {};

$( document ).ready(function() {
    initGeneral();
    initProduct();
});

function initProduct(){
	detail();
}

function detail(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(detail);
    }else{
        var pathname = window.location.pathname,
            arraypathname = pathname.split("/"),
            shop_name = arraypathname[2],
            product_name = arraypathname[3];
        $.ajax({
            type: 'GET',
            url: PRODUCT_API+'/'+shop_name+'/'+product_name,
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.status == "OK"){
                    if($.isEmptyObject(data.result) === false){
                        var israte = data.result.product_israte;
                        
                        var product = '<div class="content">';
                            product += '    <div class="left">';
                            product += '        <div class="image">';
                            product += '            <img src="'+data.result.product_image[0]+'" width="300" height="300"/>';
                            product += '        </div>';
                            product += '        <div class="listimage">';
                            product += '            <nav>';
                            
                            var product_images_len = data.result.product_image.length;
                            if(product_images_len > 1){
                                for(var i=0;i<product_images_len;i++){
                                    product += '<a href="'+data.result.product_image[i]+'">';
                                    product += '    <img src="'+data.result.product_image[i]+'" width="50" height="50"/>';
                                    product += '</a>';
                                }
                            }
                            
                            product += '            </nav>';
                            product += '        </div>';
                            product += '    </div>';
                            product += '    <div class="right">';
                            product += '        <span>'+data.result.product_name+'</span>';
                            product += '        <span>IDR '+data.result.product_price+'</span>';
                            product += '        <span>'+data.result.product_description+'</span>';
                            product += '    </div>';
                            product += '</div>';
                            product += '<div class="content" id="right">';
                            product += '    <div class="top">';
                            product += '        <span>Jumlah stok tersedia <font>'+data.result.product_stock+'</font> pcs</span>';
                            product += '        <span>';
                            product += '            Jumlah Barang';
                            product += '            <input type="number" id="sumProduct" value="1" maxlength="3"/>';
                            product += '        </span>';
                            product += '        <span>';
                            product += '            <input type="button" id="btnCart" value="Tambah ke keranjang"/>';
                            product += '        </span>';
                            product += '        <span>';
                            product += '            <input type="button" id="btnFavorite" value="Tambah ke favorit"/>';
                            product += '        </span>';
                            product += '    </div>';
                            product += '    <div class="bottom">';
                            product += '        <div class="head">';
                            product += '            <div class="image">';
                            product += '                <img src="'+data.result.shop_icon+'" width="40" height="40"/>';
                            product += '            </div>';
                            product += '            <div class="content">';
                            product += '                <span>'+data.result.username+'</span>';
                            product += '                <span>'+data.result.shop_name+'</span>';
                            product += '            </div>';
                            product += '        </div>';
                            product += '        <hr/>';
                            product += '        <div class="body">';
                            product += '            <div class="tabel">';
                            product += '                <div class="tabelList">';
                            product += '                    <span>0</span>';
                            product += '                    <span>Terjual</span>';
                            product += '                </div>';
                            product += '                <div class="tabelList">';
                            product += '                    <span id="rate">'+data.result.product_rate_value+'</span>';
                            product += '                    <span>Penilaian</span>';
                            product += '                </div>';
                            product += '                <div class="tabelList">';
                            product += '                    <span id="like">'+data.result.product_count_favorite+'</span>';
                            product += '                    <span>Like</span>';
                            product += '                </div>';
                            product += '            </div>';
                            product += '            <div class="title">Rating</div>';
                            product += '            <div class="rateyo"></div>';
                            product += '        </div>';
                            product += '    </div>';
                            product += '</div>';
                        
                        
                    	productData.id = data.result.product_id;
                    	productData.shop_id = data.result.shop_id;
                        document.title = (data.result.product_name).toUpperCase() + ' | Ngulikin';
                        $('.grid-product-container:first-child').html(product);
                        
                        $.tosrus.defaults.media.image = {
                    		filterAnchors: function( $anchor ) {
                    			return $anchor.attr( 'href' ).indexOf( 'images.ngulikin.com' ) > -1;
                    		}
                    	};
                    				
                    	$('.listimage a').tosrus({
                    		buttons: 'inline',
                    		pagination	: {
                    			add			: true,
                    			type		: 'thumbnails'
                    		}
                    	});
                    	
                    	$(".rateyo").rateYo({rating: data.result.product_average_rate,readOnly: true});
                        
                        /*$(".rateyo").rateYo({fullStar: true}).on("rateyo.set", function (e, data) {
                            if($('.isSignin').val() === ''){
                    	        notif("error","Harap login terlebih dahulu","right","top");
                            }else if(israte == 1){
                    	        notif("error","Anda sudah memberikan penilaian produk ini","top");
                    	    }else{
                    	        rateData.value = data.rating;
                    	        rateProduct();
                    	    }
                        });*/
                        
                        $('#btnCart').on( 'click', function( e ){
                            addtocartSum.sumproduct = $('#sumProduct').val();
                            
                            addtocartProduct();
                    	});
                    	
                    	$('#sumProduct').keydown(function (e) {
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
                        
                        $('#sumProduct').on('change', function (e) {
                            if($(this).val() == ''){
                                $(this).val(1);
                            }
                            
                            if(parseInt($(this).val()) > 123){
                                $(this).val(123);
                            }
                        });
                    	
                    	$('#btnFavorite').on( 'click', function( e ){
                    	    if($('.isSignin').val() === ''){
                    	        notif("error","Harap login terlebih dahulu","right","top");
                    	    }else{
                    	        favoriteProduct();
                    	    }
                    	});
                    }
                    $('.loaderProgress').addClass('hidden');
                    $('body').removeClass('hiddenoverflow');
                }else{
                    generateToken(detail);
                }
            } 
        });
    }
}

function favoriteProduct(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(favoriteProduct);
    }else{
        $.ajax({
            type: 'POST',
            url: PRODUCT_FAVORITE_API,
            data:JSON.stringify({ 
                    product_id: productData.id
            }),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                        generateToken(favoriteProduct);
                }else{
                    $('.tabelList #like').html(data.result.product_count_favorite);
                    if(data.result.isfavorite){
                        notif("info","Product ditambah ke daftar favorit","right","top");   
                    }else{
                        notif("info","Product dihapus dari daftar favorit","right","top");
                    }
                }
            }
        });
    }
}

function rateProduct(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(rateProduct);
    }else{
        $.ajax({
            type: 'POST',
            url: PRODUCT_RATE_API,
            data:JSON.stringify({ 
                    product_id: productData.id,
                    rate : rateData.value
            }),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                        generateToken(rateProduct);
                }else if(data.message == 'You have rated this item'){
                    notif("error","Anda sudah memberikan penilaian produk ini","top");
                }else{
                    $('.tabelList #rate').html(data.result.product_avg_rate);
                    notif("info","Terima kasih sudah memberikan penilaian","right","top");
                }
            }
        });
    }
}

function addtocartProduct(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(addtocartProduct);
    }else{
        $.ajax({
            type: 'POST',
            url: PRODUCT_CART_ADD_API,
            data:JSON.stringify({ 
                    product_id: productData.id,
                    shop_id: productData.shop_id,
                    sum : addtocartSum.sumproduct
            }),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                    generateToken(addtocartProduct);
                }else{
                    $('#iconCartHeader').popover('hide');
                    bubbleCart();
                    notif("info","Product Ditambah ke keranjang","right","top");
                }
            }
        });
    }
}