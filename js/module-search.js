function initSearch(){
    var url = 'http://init.ngulikin.com',
        urlAPI 	= 'http://api.ngulikin.com/v1/';
    
    /*
        Get value from url parameter.
        location function : js/module-general.js
    */
    var keywords = getUrlParam("keywords");
    if(keywords === ''){
        $('.result-content #searchNotFound').addClass('active');
        $('.result-content .list-search').removeClass('active');
    }else{
        $('.result-content #searchNotFound').removeClass('active');
        $('.result-content .list-search').addClass('active');
    }
    
    $(".star_0").rateYo({rating: 0,readOnly: true,starWidth : "15px"});
    $(".star_1").rateYo({rating: 1,readOnly: true,starWidth : "15px"});
    $(".star_2").rateYo({rating: 2,readOnly: true,starWidth : "15px"});
    $(".star_3").rateYo({rating: 3,readOnly: true,starWidth : "15px"});
    $(".star_4").rateYo({rating: 4,readOnly: true,starWidth : "15px"});
    $(".star_5").rateYo({rating: 5,readOnly: true,starWidth : "15px"});
    
    /*
	    Paging jquery for product tab 
	*/    
    $('#pagingSearchProduct').twbsPagination({
        totalPages: 35,
        visiblePages: 10,
        onPageClick: function (event, page) {
            console.info(page + ' (from options)');
        }
    }).on('page', function (event, page) {
            console.info(page + ' (from event listening)');
    });
    
    /*
	    Paging jquery for shop tab 
	*/
    $('#pagingSearchShop').twbsPagination({
        totalPages: 35,
        visiblePages: 10,
        onPageClick: function (event, page) {
            console.info(page + ' (from options)');
        }
    }).on('page', function (event, page) {
            console.info(page + ' (from event listening)');
    });
    
    /*
	    Action for triggering ajax search by change value of minimum price field or and maximum price field and click enter from keyboard 
	*/
    $('#minPriceSearch,#maxPriceSearch').on('keydown', function (e) {
	    if (e.which == 13) {
	    }
	});
	
	/*
	    Action for triggering ajax search by change sorting select box or location select box 
	*/
	$('#sortingSearch,#locSearch').on('change', function (e) {
	    $('#minPriceSearch').trigger('keydown');
	});
	
	/*
	    Action for going to "shop page" based on value where getting from datainternal-id tag
	*/
	$('.result-content-list-data.shop').on('click', function (e) {
        var shopTitle = $(this).find('.shopTitle').val();
        location.href = url+"/shop/"+shopTitle;
    });
	
	/*
	    Action for going to "product page" based on value where getting from datainternal-id tag
	*/
	$('.result-content-list-data').on('click', function (e) {
	    var datainternal = $(this).attr('datainternal-id').split("~");
        location.href = url+"/product/"+datainternal[0]+'/'+datainternal[1];
	});
	
	/*
	    Action for product tab and search tab when both of them clicked
	*/
	$('.result-content .result-content-tab .tab').on('click', function (e) {
	    $('.result-content .result-content-tab .tab').removeClass('active');
	    $(this).addClass('active');
	    
	    //product tab clicked and keywords parameter on url is not empty
	    if($(this).attr('id') == 'product' && keywords !== ''){
	        $('.result-content .list-search#list-search-product').addClass('active');
	        $('.result-content .list-search#list-search-shop').removeClass('active');
	        $('.result-content .result-content-tab .tab .icon-product').addClass('active');
	        $('.result-content .result-content-tab .tab .icon-shop').removeClass('active');
	        $('.filter-content .content.price').removeClass('hide');
	        $('.filter-content .content.rate').removeClass('hide');
	    //shop tab clicked and keywords parameter on url is not empty
	    }else if($(this).attr('id') == 'shop' && keywords !== ''){
	        $('.result-content .list-search#list-search-product').removeClass('active');
	        $('.result-content .list-search#list-search-shop').addClass('active');
	        $('.result-content .result-content-tab .tab .icon-product').removeClass('active');
	        $('.result-content .result-content-tab .tab .icon-shop').addClass('active');
	        $('.filter-content .content.price').addClass('hide');
	        $('.filter-content .content.rate').addClass('hide');
	    //product tab clicked and keywords parameter on url is empty
	    }else if($(this).attr('id') == 'product'){
	        $('.filter-content .content.price').removeClass('hide');
	        $('.filter-content .content.rate').removeClass('hide');
	    //shop tab clicked and keywords parameter on url is empty
	    }else{
	        $('.filter-content .content.price').addClass('hide');
	        $('.filter-content .content.rate').addClass('hide');
	    }
	});
}