function initShop(){
    var emailsession = localStorage.getItem('emailNgulikin'),
        user_id = authData.data !== ''? JSON.parse(authData.data).user_id : '';
    
    detail();
        
    $('.grid-shop-body .grid-shop-body-head div:first-child').on('click', function (e) {
        $(this).css({"background-color":"rgb(60, 60, 60)", "color":"#00BFFF"});
        $('.grid-shop-body .grid-shop-body-head div:nth-child(2)').css({"background-color":"#F5F5F5", "color":"#808080"});
        $('.grid-shop-body .grid-shop-body-head div:last-child').css({"background-color":"#F5F5F5", "color":"#808080"});
        
        $('.grid-shop-body #productShopSection').show();
        $('.grid-shop-body #discussShopSection').hide();
        $('.grid-shop-body #reviewShopSection').hide();
    });
    
    $('.grid-shop-body .grid-shop-body-head div:nth-child(2)').on('click', function (e) {
        $(this).css({"background-color":"rgb(60, 60, 60)", "color":"#00BFFF"});
        $('.grid-shop-body .grid-shop-body-head div:first-child').css({"background-color":"#F5F5F5", "color":"#808080"});
        $('.grid-shop-body .grid-shop-body-head div:last-child').css({"background-color":"#F5F5F5", "color":"#808080"});
        
        $('.grid-shop-body #productShopSection').hide();
        $('.grid-shop-body #discussShopSection').show();
        $('.grid-shop-body #reviewShopSection').hide();
    });
    
    $('.grid-shop-body .grid-shop-body-head div:last-child').on('click', function (e) {
        $(this).css({"background-color":"rgb(60, 60, 60)", "color":"#00BFFF"});
        $('.grid-shop-body .grid-shop-body-head div:first-child').css({"background-color":"#F5F5F5", "color":"#808080"});
        $('.grid-shop-body .grid-shop-body-head div:nth-child(2)').css({"background-color":"#F5F5F5", "color":"#808080"});
        
        $('.grid-shop-body #productShopSection').hide();
        $('.grid-shop-body #discussShopSection').hide();
        $('.grid-shop-body #reviewShopSection').show();
    });
    
    var emailsession = localStorage.getItem('emailNgulikin');
	if(emailsession !== null){
	    $('.grid-shop-body .grid-shop-body-content .grid-shop-body-content-inputComment').show();
	}else{
	    $('.grid-shop-body .grid-shop-body-content .grid-shop-body-content-inputComment').hide();
	}
	
	$('#pagingShopProduct').twbsPagination({
        totalPages: 35,
        visiblePages: 10,
        onPageClick: function (event, page) {
            console.info(page + ' (from options)');
        }
    }).on('page', function (event, page) {
            console.info(page + ' (from event listening)');
    });
    
    $('#pagingShopDiscuss').twbsPagination({
        totalPages: 35,
        visiblePages: 10,
        onPageClick: function (event, page) {
            console.info(page + ' (from options)');
        }
    }).on('page', function (event, page) {
            console.info(page + ' (from event listening)');
    });
    
    $('#pagingShopReview').twbsPagination({
        totalPages: 35,
        visiblePages: 10,
        onPageClick: function (event, page) {
            console.info(page + ' (from options)');
        }
    }).on('page', function (event, page) {
            console.info(page + ' (from event listening)');
    });
    
    $('.grid-shop-body .grid-shop-body-content .grid-shop-body-content-list div img').on('click', function (e) {
        var datainternal = $(this).attr('datainternal-id').split("~");
        location.href = url+"/product/"+datainternal[0]+'/'+datainternal[1];
    });
    
    $('#favorite-icon-shop').on( 'click', function( e ){
        var isfavorite = $(this).attr('datainternal-id');
        if(user_id === ''){
            notif("error","Harap login terlebih dahulu","left","top");
        }else if(parseInt(isfavorite) == 1){
            notif("error","Anda sudah menyimpan toko ini","top");
        }else{
            favoriteShop();
        }
	});
}

function detail(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(detail);
    }else{
        var url = window.location.href,
            shop_id = url.substr(url.lastIndexOf('/') + 1),
            user_id = authData.data !== ''? JSON.parse(authData.data).user_id : '';
        
        $.ajax({
            type: 'GET',
            url: SHOP_API+'/'+shop_id,
            data:{user_id:user_id},
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.status == "OK"){
                    if($.isEmptyObject(data.result) === false){
                        var shop = '<div class="grid-shop-head-left">';
                            shop += '   <div>';
                            shop += '       <img src="'+data.result.shop_icon+'"/>';
                            shop += '   </div>';
                            shop += '   <div>';
                            shop += '       <span>'+data.result.shop_name+'</span>';
                            shop += '       <span>'+data.result.shop_description+'</span>';
                            shop += '   </div>';
                            shop += '</div>';
                            shop += '<div class="grid-shop-head-right">';
                            shop += '   <div><img src="'+data.result.user_photo+'"/></div>';
                            shop += '   <div>'+data.result.university+'</div>';
                            shop += '   <div>'+data.result.username+'</div>';
                            shop += '</div>';
                            
                            $('.home_container .container .grid-shop-head').html(shop);
                            
                            document.title = (data.result.shop_name).toUpperCase() + '| Ngulikin';
                            
                            if(data.result.university === ''){
                                $('.grid-shop-head-right div:last-child').css('border-right','none');
                            }
                            if(data.result.shop_banner !== ''){
                                $('.home_container .home_container .grid-shop-banner').css('background','url(' + data.result.shop_banner + ')');
                            }
                            
                            $('#favorite-icon-shop').attr('datainternal-id',data.result.shop_isfavorite);
                    }else{
                        document.title = 'NOT FOUND | Ngulikin';
                        
                        var shop = '<div id="cart-emptylist">';
                            shop += '    <div class="grid-cart-header">';
                            shop += '        Detail Toko ';
                            shop += '    </div>';
                            shop += '    <div class="grid-cart-body"></div>';
                            shop += '    <div class="grid-cart-footer">';
                            shop += '        <div>';
                            shop += '            Toko tidak ditemukan';
                            shop += '        </div>';
                            shop += '    </div>';
                            shop += '</div>';
                        
                        $('.home_container .container').html(shop);
                    }
                }else{
                    generateToken(detail);
                }
            } 
        });
    }
}

function favoriteShop(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(favoriteShop);
    }else{
        var url = window.location.href,
            shop_id = url.substr(url.lastIndexOf('/') + 1),
            user_id = authData.data !== ''? JSON.parse(authData.data).user_id : '',
            key = authData.data !== ''? JSON.parse(authData.data).key : '';
        $.ajax({
            type: 'POST',
            url: SHOP_FAVORITE_API,
            data:JSON.stringify({ 
                    shop_id: shop_id,
                    user_id: user_id,
                    key : key
            }),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                        generateToken(favoriteShop);
                }else if(data.message == 'Invalid key'){
                    localStorage.removeItem('emailNgulikin');
                    sessionStorage.setItem("logoutNgulikin", 1);
                    sessionStorage.removeItem('authNgulikin');
                    location.href = url;
                }else if(data.message == 'You have saved this item'){
                    notif("error","Anda sudah menyimpan toko ini","left","top");
                }else{
                    notif("info","Toko ditambah ke daftar favorit","left","top");
                }
            }
        });
    }
}