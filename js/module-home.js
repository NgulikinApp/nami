var favoriteData = {};

function initHome(){
    var logoutsession = sessionStorage.getItem('logoutNgulikin'),
        paymentfailedsession = sessionStorage.getItem('paymentFailedNgulikin'),
        loginsession = sessionStorage.getItem('loginNgulikin');
    
    if(loginsession !== null){
        var greeting = '<div class="layerPopup">';
            greeting += '   <div class="greetingContainer">';
            greeting += '       <div class="top">';
            greeting += '           <div class="icon"></div>';
            greeting += '           <div class="title">Hallo, <font></font></div>';
            greeting += '           <div class="desc">Ayo segera isi keranjang dengan barang kesukaanmu sekarang juga</div>';
            greeting += '       </div>';
            greeting += '       <div class="bottom">';
            greeting += '           <input type="button" value="LIHAT KERANJANG BELANJA"/>';
            greeting += '       </div>';
            greeting += '   </div>';
            greeting += '</div>';
                
        $("body").append(greeting);
        
        var fullname_popup = $('.fullname_popup').val();
        $('.title font').html(fullname_popup);
        
        $('.greetingContainer .bottom input').on( 'click', function( e ){
    	    location.href = url+"/cart";
    	});
    	
    	setTimeout(function(){ $(".layerPopup").fadeOut(); }, 3000);
        
        sessionStorage.removeItem('loginNgulikin');
    }
    
    if(logoutsession !== null){
        notif("info","Anda telah logout","center","center");
        sessionStorage.removeItem('logoutNgulikin');
    }
    
    if(paymentfailedsession !== null){
        notif("info","Halaman tidak ditemukan","center","center");
        sessionStorage.removeItem('paymentFailedNgulikin');
    }
    
	$.tosrus.defaults.media.image = {
		filterAnchors: function( $anchor ) {
			return $anchor.attr( 'href' ).indexOf( 'www.zaskiasungkarhijab.com' ) > -1;
		}
	};
	
	$('.slider').anyslider({
        animation: 'fade',
        interval: 3000,
        showControls: false,
        startSlide: 1
    });
    
    $('.grid-listmiddle-cont8').on('click', function (e) {
        var productTitle = $(this).attr('id');
        location.href = url+"/search/"+productTitle;
    });
    
    uptodate();
    
    promo();
    
    bestseller();
	
	$("#cslide-slides").cslide();
	
	shop();
}

function shop(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(shop);
    }else{
        $.ajax({
            type: 'GET',
            url: SHOP_FEED_API,
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.status == "OK"){
                    var listshop = '';
                    $.each( data.result, function( key, val ) {
                        listshop += '<div class="grid-list-cont4-item" title="'+val.shop_name+'">';
                        listshop += '   <img src="'+val.shop_icon+'" width="170"/>';
                        listshop += '   <input type="hidden" class="shopTitle" value="'+val.shop_id+'"/>';
                        listshop += '</div>';
                        
                    });
                    $('#loaderHomeShop').addClass('hidden');
                    $("#shoplist").html(listshop);
                    
                    $('.grid-list-cont4 .grid-list-cont4-item').on('click', function (e) {
                        var shopTitle = $(this).find('.shopTitle').val();
                        location.href = url+"/shop/"+shopTitle;
                    });
                }else{
                    generateToken(shop);
                }
            } 
        });
    }
}

function uptodate(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(uptodate);
    }else{
        $.ajax({
            type: 'GET',
            url: PRODUCT_FEED_API,
            data: { filter: "uptodate"},
            dataType: 'json',
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.status == "OK"){
                    var listproduct = '';
                    $.each( data.result, function( key, val ) {
                        if(key < 4){
                            listproduct += '<div class="grid_chapter_subcon">';
                            listproduct += '    <div class="grid_chapter_subcon_detail">';
                            listproduct += '        <div class="grid_chapter_subcon_head_detail">';
                            listproduct += '            <img src="'+val.product_image+'">';
                            listproduct += '        </div>';
                            listproduct += '        <div class="grid_chapter_subcon_body_detail">';
                            listproduct += '            <p>'+val.product_name+'</p>';
                            listproduct += '            <p>IDR '+val.product_price+'</p>';
                            listproduct += '        </div>';
                            listproduct += '    </div>';
                            listproduct += '        <input type="hidden" class="productCategory" value="furniture"/>';
                            listproduct += '        <input type="hidden" class="productId" value="'+val.product_id+'"/>';
                            listproduct += '</div>';
                        }
                    });
                    $(".grid_chapter .grid_chapter_con:last-child").html(listproduct);
                    
                    $('.grid_chapter_subcon').on('click', function (e) {
                        var productId = $(this).find('.productId').val();
                        location.href = url+"/product/"+productId;
                    });
                }else{
                    generateToken(uptodate);
                }
            } 
        });
    }
}

function bestseller(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(bestseller);
    }else{
        $.ajax({
            type: 'GET',
            url: PRODUCT_FEED_API,
            data: { 
                filter: "bestseller"
            },
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.status == "OK"){
                    var listproduct = '';
                    $.each( data.result, function( key, val ) {
                        listproduct += '<div class="col-md-9">';
                        listproduct += '   <img src="'+val.product_image+'">';
                        listproduct += '   <div class="grid-sub-cont9-body-list-hover">';
                        listproduct += '       <i class="fa fa-shopping-cart bestseller-cart"></i>';
                        listproduct += '       <i class="fa fa-thumbs-o-up bestseller-like"></i>';
                        listproduct += '       <div datainternal-id="'+val.product_id+'~'+val.product_isfavorite+'">Lihat</div>';
                        listproduct += '   </div>';
                        listproduct += '</div>';
                        
                    });
                    $('#loaderHomeProductBest').addClass('hidden');
                    $("#best-selling").html(listproduct);
                    
                    $('#best-selling').tosrus({
                		infinite	: true,
                		slides		: {
                			visible		: 3
                		}
                	});
                	
                	$(".tos-next").css('right','5px');
                	
                	$('.bestseller-cart').on('click', function (e) {
                        notif("success","Produk ditambah ke keranjang","center","top");
                    });
                                    
                    $('.bestseller-like').on('click', function (e) {
                        var productArray = ($(this).next('div').attr('datainternal-id')).split("~");
                        
                        if($('.isSignin').val() === '1'){
                    	   notif("error","Harap login terlebih dahulu","right","top");
                    	}else if(parseInt(productArray[1]) == 1){
                    	        notif("error","Anda sudah menyimpan produk ini","top");
                        }else{
                            favoriteData.product_id = parseInt(productArray[0]);
                            favoriteProduct();
                        }
                    });
                	
                	mousetosrushome(url);
                }else{
                    generateToken(bestseller);
                }
            } 
        });
    }
}

function promo(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(promo);
    }else{
        $.ajax({
            type: 'GET',
            url: PRODUCT_FEED_API,
            data: { 
                    filter: "promo"
            },
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.status == "OK"){
                    var listproduct = '';
                    $.each( data.result, function( key, val ) {
                        listproduct += '<div class="col-md-9">';
                        listproduct += '   <img src="'+val.product_image+'">';
                        listproduct += '   <div class="grid-sub-cont9-body-list-hover">';
                        listproduct += '       <i class="fa fa-shopping-cart promo-cart"></i>';
                        listproduct += '       <i class="fa fa-thumbs-o-up promo-like"></i>';
                        listproduct += '       <div datainternal-id="'+val.product_id+'~'+val.product_isfavorite+'">Lihat</div>';
                        listproduct += '   </div>';
                        listproduct += '</div>';
                        
                    });
                    $('#loaderHomeProductPromo').addClass('hidden');
                    $("#promo").html(listproduct);
                    
                     $('#promo').tosrus({
                		infinite	: true,
                		slides		: {
                			visible		: 3
                		}
                	});
                	
                	$('.promo-cart').on('click', function (e) {
                        notif("success","Produk ditambah ke keranjang","center","top");
                    });
                                    
                    $('.promo-like').on('click', function (e) {
                        var productArray = ($(this).next('div').attr('datainternal-id')).split("~");
                        
                        if($('.isSignin').val() === '1'){
                        	notif("error","Harap login terlebih dahulu","right","top");
                        }else if(parseInt(productArray[1]) == 1){
                    	        notif("error","Anda sudah menyimpan produk ini","top");
                        }else{
                            favoriteData.product_id = parseInt(productArray[0]);
                            favoriteProduct();
                        }
                    });
                	
                	mousetosrushome(url);
                }else{
                    generateToken(promo);
                }
            } 
        });
    }
}

function favoriteProduct(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(favoriteProduct);
    }else{
        var product_id = favoriteData.product_id;
        $.ajax({
            type: 'POST',
            url: PRODUCT_FAVORITE_API,
            data:JSON.stringify({ 
                    product_id: product_id
            }),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                        generateToken(favoriteProduct);
                }else if(data.message == 'You have saved this item'){
                    notif("error","Anda sudah menyimpan produk ini","center","center");
                }else{
                    $('.tabelList #like').html(data.result.product_count_favorite);
                    notif("info","Product ditambah ke daftar favorit","right","top");
                }
            }
        });
    }
}

/* Funtion for showing background promo and best-seller product*/
function mousetosrushome(url){
    $(".tos-slide .col-md-9").mouseover(function(){
        $(this).children('.grid-sub-cont9-body-list-hover').show();
    });
    $(".tos-slide .col-md-9").mouseout(function(){
        $(this).children('.grid-sub-cont9-body-list-hover').hide();
    });
    $('.grid-sub-cont9-body-list-hover div').on('click', function (e) {
        var datainternal = $(this).attr('datainternal-id').split("~");
        location.href = url+"/product/"+datainternal[0];
    });
}