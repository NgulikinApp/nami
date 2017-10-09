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
        $('#grid-favorite-listdataproduct').show();
        $('#grid-favorite-listdatashop').hide();
    });
    
    $('#favoriteListShopButton').on('click', function (e) {
        $('#grid-favorite-listdatashop').show();
        $('#grid-favorite-listdataproduct').hide();
    });
}