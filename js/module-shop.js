function initShop(){
    var url = 'http://init.ngulikin.com',
        urlAPI 	= 'http://api.ngulikin.com/v1/',
        emailsession = localStorage.getItem('emailNgulikin');
        
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
        if(emailsession === null){
            notif("error","Harap login terlebih dahulu","left","top");
        }else{
            notif("info","Toko ditambah ke daftar favorit","left","top");
        }
	});
}