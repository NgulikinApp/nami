var productPage = new Object(),
    shopPage = new Object();

function initFavorite(){
    var emailsession = localStorage.getItem('emailNgulikin');
    
    if(emailsession !== null){
        $('#favorite-filledlist').show();
        $('#favorite-emptylist').hide();
        
        listfavoriteProduct();
        listfavoriteShop();
    }else{
        $('#favorite-filledlist').hide();
        $('#favorite-emptylist').show();
    }
    
    $('#favoriteListProductButton').on('click', function (e) {
        $('#grid-favorite-product').show();
        $('#grid-favorite-shop').hide();
    });
    
    $('#favoriteListShopButton').on('click', function (e) {
        $('#grid-favorite-shop').show();
        $('#grid-favorite-product').hide();
    });
}

function listfavoriteProduct(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(listfavoriteProduct());
    }else{
        var user_id = authData.data !== ''? JSON.parse(authData.data).user_id : '',
            key = authData.data !== ''? JSON.parse(authData.data).key : ''
        
        if (typeof productPage.page === 'undefined') {
            productPage.page = 1;
        }
        
        $('#grid-favorite-listdataproduct').empty();
        $('#loaderFavoriteProduct').removeClass('hidden');
            
        $.ajax({
            type: 'GET',
            url: PRODUCT_FAVORITE_LIST_API,
            data:{
                    user_id : user_id,
                    key : key,
                    page : productPage.page-1,
                    pagesize : 20
            },
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.status == "OK"){
                    var listFavorite = '';
                    $.each( data.response, function( key, val ) {
                        listFavorite += '<div class="result-content-list-data" >';
                        listFavorite += '   <div class="result-content-list-data-head">';
                        if(val.product_difdate <= 1){
                            listFavorite += '       <span class="result-content-list-data-head-new">New</span>';
                        }
                        listFavorite += '       <img src="'+val.product_image+'" class="favoriteProductAction" datainternal-id="'+val.product_id+'"/>';
                        listFavorite += '   </div>';
                        listFavorite += '   <div class="result-content-list-data-body">';
                        listFavorite += '       <span class="favoriteProductAction" datainternal-id="'+val.product_id+'">'+val.product_name+'</span>';
                        listFavorite += '       <span>'+val.product_price+'</span>';
                        listFavorite += '   </div>';
                        listFavorite += '</div>';
                    });
                    
                    $('#loaderFavoriteProduct').addClass('hidden');
                    $('#grid-favorite-listdataproduct').html(listFavorite);
                    
                    $('#pagingFavoriteProduct').twbsPagination({
                        totalPages: data.total_page,
                        visiblePages: 10
                    }).on('page', function (event, page) {
                        productPage.page = page;
                        listfavoriteProduct();
                    });
                    
                    $('.favoriteProductAction').on('click', function (e) {
                        var productId = $(this).attr('datainternal-id');
                        location.href = url+"/product/"+productId;
                    });
                }else{
                    generateToken(listfavoriteProduct);
                }
            } 
        });
    }
}

function listfavoriteShop(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(listfavoriteShop());
    }else{
        var user_id = authData.data !== ''? JSON.parse(authData.data).user_id : '',
            key = authData.data !== ''? JSON.parse(authData.data).key : ''
        
        if (typeof shopPage.page === 'undefined') {
            shopPage.page = 1;
        }
        
        $('#grid-favorite-listdatashop').empty();
        $('#loaderFavoriteShop').removeClass('hidden');
        
        $.ajax({
            type: 'GET',
            url: SHOP_FAVORITE_LIST_API,
            data:{
                    user_id : user_id,
                    key : key,
                    page : shopPage.page-1,
                    pagesize : 8
            },
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.status == "OK"){
                    var listFavorite = '';
                    $.each( data.response, function( key, val ) {
                        listFavorite += '<div class="result-content-list-data">';
                        listFavorite += '   <div class="result-content-list-data-head">';
                        if(val.shop_difdate <= 1){
                            listFavorite += '       <span class="result-content-list-data-head-new">New</span>';
                        }
                        listFavorite += '       <img src="'+val.shop_icon+'" class="favoriteShopAction" datainternal-id="'+val.shop_id+'"/>';
                        listFavorite += '   </div>';
                        listFavorite += '   <div class="result-content-list-data-body">';
                        listFavorite += '       <span class="favoriteShopAction" datainternal-id="'+val.shop_id+'">'+val.shop_name+'</span>';
                        listFavorite += '   </div>';
                        listFavorite += '</div>';
                    });
                    
                    $('#loaderFavoriteShop').addClass('hidden');
                    $('#grid-favorite-listdatashop').html(listFavorite);
                    
                    $('#pagingFavoriteShop').twbsPagination({
                        totalPages: data.total_page,
                        visiblePages: 10
                    }).on('page', function (event, page) {
                        shopPage.page = page;
                        listfavoriteShop();
                    });
                    
                    $('.favoriteShopAction').on('click', function (e) {
                        var shopId= $(this).attr('datainternal-id');
                        location.href = url+"/shop/"+shopId;
                    });
                }else{
                    generateToken(listfavoriteShop);
                }
            } 
        });
    }
}