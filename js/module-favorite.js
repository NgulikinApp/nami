var productPage = {},
    shopPage = {};
    
$( document ).ready(function() {
    initGeneral();
    initFavorite();
});

function initFavorite(){
    var fullname_popup = $('.fullname_popup').val();
    
    if(fullname_popup !== ''){
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
        
        if (typeof productPage.page === 'undefined') {
            productPage.page = 1;
        }
        
        $('#grid-favorite-listdataproduct').empty();
        $('#loaderFavoriteProduct').removeClass('hidden');
            
        $.ajax({
            type: 'GET',
            url: PRODUCT_FAVORITE_LIST_API,
            data:{
                    page : productPage.page-1,
                    pagesize : 20
            },
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.status == "OK"){
                    if(data.response.length > 0){
                        var listFavorite = '';
                        $.each( data.response, function( key, val ) {
                            listFavorite += '<div class="result-content-list-data" >';
                            listFavorite += '   <div class="result-content-list-data-head">';
                            if(val.product_difdate <= 1){
                                listFavorite += '       <span class="result-content-list-data-head-new">New</span>';
                            }
                            listFavorite += '       <img src="'+val.product_image+'" class="favoriteProductAction" data-shopname="'+val.shop_name+'" data-productname="'+val.product_name+'"/>';
                            listFavorite += '   </div>';
                            listFavorite += '   <div class="result-content-list-data-body">';
                            listFavorite += '       <span class="favoriteProductAction" id="" data-shopname="'+val.shop_name+'" data-productname="'+val.product_name+'">'+val.product_name+'</span>';
                            listFavorite += '       <span class="favoriteProductPrice">IDR '+val.product_price+'</span>';
                            listFavorite += '       <span class="rateyo" id="rateproduct'+key+'" style="margin:initial;padding: 0;"></span>';
                            listFavorite += '   </div>';
                            listFavorite += '</div>';
                        });
                        
                        $('#loaderFavoriteProduct').addClass('hidden');
                        $('#grid-favorite-listdataproduct').html(listFavorite);
                        
                        $('#pagingFavoriteProduct').twbsPagination({
                            totalPages: data.total_page,
                            visiblePages: 10,
                            startPage: productPage.page
                        }).on('page', function (event, page) {
                            productPage.page = page;
                            listfavoriteProduct();
                        });
                        
                        $.each( data.response, function( key, val ) {
                            $("#rateproduct"+key).rateYo({rating: val.product_average_rate,readOnly: true,starWidth : "15px", spacing   : "1px"});
                        });
                        
                        $('.favoriteProductAction').on('click', function (e) {
                            var shopname = $(this).data("shopname"),
                                productname = ($(this).data("productname")).split(' ').join('-');
                                
                            location.href = url+"/product/"+shopname+"/"+productname;
                        });
                    }else{
                        $('#loaderFavoriteProduct').addClass('hidden');
                        
                        var noData = '<div class="grid-favorite-body"></div>';
                            noData += '     <div class="grid-favorite-footer">';
                            noData += '         <div>';
                            noData += '             Kamu belum menambahkan suatu produk kedalam daftar favoritmu. Simpan produk yang kamu sukai dengan menambahkannya ke daftar produk favoritmu.';
                            noData += '         </div>';
                            noData += '     </div>';
                        $('#grid-favorite-listdataproduct').html(noData);
                    }
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
        
        if (typeof shopPage.page === 'undefined') {
            shopPage.page = 1;
        }
        
        $('#grid-favorite-listdatashop').empty();
        $('#loaderFavoriteShop').removeClass('hidden');
        
        $.ajax({
            type: 'GET',
            url: SHOP_FAVORITE_LIST_API,
            data:{
                    page : shopPage.page-1,
                    pagesize : 8
            },
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.status == "OK"){
                    if(data.response.length > 0){
                        var listFavorite = '';
                        $.each( data.response, function( key, val ) {
                            listFavorite += '<div class="result-content-list-data">';
                            listFavorite += '   <div class="result-content-list-data-head">';
                            if(val.shop_difdate <= 1){
                                listFavorite += '       <span class="result-content-list-data-head-new">New</span>';
                            }
                            listFavorite += '       <img src="'+val.shop_icon+'" class="favoriteShopAction" data-shopname="'+val.shop_name+'"/>';
                            listFavorite += '   </div>';
                            listFavorite += '   <div class="result-content-list-data-body">';
                            listFavorite += '       <span class="favoriteShopAction" data-shopname="'+val.shop_name+'">'+val.shop_name+'</span>';
                            listFavorite += '   </div>';
                            listFavorite += '</div>';
                        });
                        
                        $('#loaderFavoriteShop').addClass('hidden');
                        $('#grid-favorite-listdatashop').html(listFavorite);
                        
                        $('#pagingFavoriteShop').twbsPagination({
                            totalPages: data.total_page,
                            visiblePages: 10,
                            startPage: shopPage.page
                        }).on('page', function (event, page) {
                            shopPage.page = page;
                            listfavoriteShop();
                        });
                        
                        $('.favoriteShopAction').on('click', function (e) {
                            var shopname = ($(this).data("shopname")).split(' ').join('-');
                            location.href = url+"/shop/"+shopname;
                        });
                    }else{
                        $('#loaderFavoriteShop').addClass('hidden');
                        
                        var noData = '<div class="grid-favorite-body"></div>';
                            noData += '     <div class="grid-favorite-footer">';
                            noData += '         <div>';
                            noData += '             Kamu belum menambahkan suatu toko kedalam daftar favoritmu. Simpan toko yang kamu sukai dengan menambahkannya ke daftar toko favoritmu.';
                            noData += '         </div>';
                            noData += '     </div>';
                        $('#grid-favorite-listdatashop').html(noData);
                    }
                }else{
                    generateToken(listfavoriteShop);
                }
            } 
        });
    }
}