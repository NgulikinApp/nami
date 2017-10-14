function initFavorite(){
    var emailsession = localStorage.getItem('emailNgulikin');
    if(emailsession !== null){
        $('#favorite-filledlist').show();
        $('#favorite-emptylist').hide();
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
    
    $('#pagingFavoriteProduct').twbsPagination({
        totalPages: 35,
        visiblePages: 10,
        onPageClick: function (event, page) {
            console.info(page + ' (from options)');
        }
    }).on('page', function (event, page) {
            console.info(page + ' (from event listening)');
    });
    
    $('#pagingFavoriteShop').twbsPagination({
        totalPages: 35,
        visiblePages: 10,
        onPageClick: function (event, page) {
            console.info(page + ' (from options)');
        }
    }).on('page', function (event, page) {
            console.info(page + ' (from event listening)');
    });
}