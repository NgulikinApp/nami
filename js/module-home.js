function initHome(){
    var url = 'http://init.ngulikin.com',
        logoutsession = sessionStorage.getItem('logoutNgulikin'),
        paymentfailedsession = sessionStorage.getItem('paymentFailedNgulikin'),
        loginsession = sessionStorage.getItem('loginNgulikin'),
        emailsession = localStorage.getItem('emailNgulikin');
    
    if(loginsession !== null && emailsession !== null){
        notif("info","Anda telah login sebagai "+emailsession,"center","center");
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
    
    $('.grid-list-cont4 .grid-list-cont4-item').on('click', function (e) {
        var shopTitle = $(this).find('.shopTitle').val();
        location.href = url+"/shop/"+shopTitle;
    });
    
    $('.grid-listmiddle-cont8').on('click', function (e) {
        var productTitle = $(this).attr('id');
        location.href = url+"/search/"+productTitle;
    });
    
    $('.fa-shopping-cart').on('click', function (e) {
        notif("success","Produk ditambah ke keranjang","center","top");
    });
    
    $('.fa-thumbs-o-up').on('click', function (e) {
         notif("success","Produk ditambah ke daftar favorit","center","top");
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
                        listshop += '   <center>';
                        listshop += '       <img src="'+val.shop_icon+'" width="160" height="60">';
                        listshop += '   </center>';
                        listshop += '   <input type="hidden" class="shopTitle" value="'+val.shop_id+'"/>';
                        listshop += '</div>';
                        
                    });
                    $("#shoplist").html(listshop);
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
                            listproduct += '        <input type="hidden" class="productTitle" value="'+val.product_id+'"/>';
                            listproduct += '</div>';
                        }
                    });
                    $(".grid_chapter .grid_chapter_con:last-child").html(listproduct);
                    
                    $('.grid_chapter_subcon').on('click', function (e) {
                        var productTitle = $(this).find('.productTitle').val();
                        var productCategory = $(this).find('.productCategory').val();
                        location.href = "http://init.ngulikin.com/product/"+productCategory+'/'+productTitle;
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
            data: { filter: "bestseller"},
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
                        listproduct += '       <i class="fa fa-shopping-cart"></i>';
                        listproduct += '       <i class="fa fa-thumbs-o-up"></i>';
                        listproduct += '       <div datainternal-id="'+val.product_id+'">Lihat</div>';
                        listproduct += '   </div>';
                        listproduct += '</div>';
                        
                    });
                    $("#best-selling").html(listproduct);
                    
                    $('#best-selling').tosrus({
                		infinite	: true,
                		slides		: {
                			visible		: 3
                		}
                	});
                	
                	$(".tos-next").css('right','5px');
                	
                	mousetosrushome('http://init.ngulikin.com');
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
            data: { filter: "promo"},
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
                        listproduct += '       <i class="fa fa-shopping-cart"></i>';
                        listproduct += '       <i class="fa fa-thumbs-o-up"></i>';
                        listproduct += '       <div datainternal-id="'+val.product_id+'">Lihat</div>';
                        listproduct += '   </div>';
                        listproduct += '</div>';
                        
                    });
                    $("#promo").html(listproduct);
                    
                     $('#promo').tosrus({
                		infinite	: true,
                		slides		: {
                			visible		: 3
                		}
                	});
                	
                	mousetosrushome('http://init.ngulikin.com');
                }else{
                    generateToken(promo);
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
        var datainternal = $(this).attr('datainternal-id');
        location.href = url+"/product/"+datainternal;
    });
}