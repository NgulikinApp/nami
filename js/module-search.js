var search = new Object(),
    searchPage = new Object();

function initSearch(){
    /*
        Get value from url parameter.
        location function : js/module-general.js
    */
    var keywords = getUrlParam("keywords"),
        category = getUrlParam("c");
        
    search.keywords = (keywords === null)?'':keywords;
    search.category = (category === null)?'':category;
    search.type = 'product';
    search.selsort = '1';
    search.rate = '';
    search.pricemax = '';
    search.pricemin = '';
    
    searchItem();
    
    $(".star_0").rateYo({rating: 0,readOnly: true,starWidth : "15px"});
    $(".star_1").rateYo({rating: 1,readOnly: true,starWidth : "15px"});
    $(".star_2").rateYo({rating: 2,readOnly: true,starWidth : "15px"});
    $(".star_3").rateYo({rating: 3,readOnly: true,starWidth : "15px"});
    $(".star_4").rateYo({rating: 4,readOnly: true,starWidth : "15px"});
    $(".star_5").rateYo({rating: 5,readOnly: true,starWidth : "15px"});
    
    /*
	    Action for triggering ajax search by change value of minimum price field or and maximum price field and click enter from keyboard 
	*/
    $('#minPriceSearch,#maxPriceSearch').on('keydown', function (e) {
	    if (e.which == 13) {
	        search.pricemin = $('#minPriceSearch').val();
	        search.pricemax = $('#maxPriceSearch').val();
	        searchItem();
	    }
	});
	
	/*
	    Action for triggering ajax search by change sorting select box or location select box 
	*/
	$('#sortingSearch,#locSearch').on('change', function (e) {
	    search.selsort = $('#sortingSearch').val();
	    searchItem();
	});
	
	$('input[name="rt"]').on('click', function (e) {
	    search.rate = '';
	    $('input[name="rt"]').each(function() {
            if ($(this).is(':checked')) {
                if(search.rate === ''){
                    search.rate += $(this).val();
                }else{
                    search.rate += ',';
                    search.rate += $(this).val();
                }
            }
        });
        
        searchItem();
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
	    
	    //product tab clicked
	    if($(this).attr('id') == 'product'){
	        $('.result-content .result-content-tab .tab .icon-product').addClass('active');
	        $('.result-content .result-content-tab .tab .icon-shop').removeClass('active');
	        
	        $('.content:first-child span:first-child,#sortingSearch').show();
	        $('.content.price,.content.rate').show();
	        
	        search.type = 'product';
    
            searchItem();
	    //shop tab clicked
	    }else{
	        $('.result-content .result-content-tab .tab .icon-product').removeClass('active');
	        $('.result-content .result-content-tab .tab .icon-shop').addClass('active');
	        
	        $('.content:first-child span:first-child,#sortingSearch').hide();
	        $('.content.price,.content.rate').hide();
	        
	        search.type = 'shop';
    
            searchItem();
	    }
	});
}

function searchItem(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(searchItem);
    }else{
        $('.result-content #searchNotFound').removeClass('active');
        $('.result-content .list-search').addClass('active');
        $(".list-search .result-content-list").empty();
        $(".list-search .result-content-paging .pagination").empty();
        $('.list-search .result-content-paging .pagination').removeData("twbs-pagination");
        $('.list-search .result-content-paging .pagination').unbind("page");
        $('.loaderImg').removeClass('hidden');
        
        if (typeof searchPage.page === 'undefined') {
            searchPage.page = 1;
        }
        
        $.ajax({
            type: 'GET',
            url: SEARCH_API,
            data:{
                    name : search.keywords,
                    category : search.category,
                    selsort : search.selsort,
                    type : search.type,
                    rate : search.rate,
                    pricemax : search.pricemax,
                    pricemin : search.pricemin,
                    page : searchPage.page-1,
                    pagesize : 20
            },
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.status == "OK"){
                    var response = data.response;
                    if(response.length > 0){
                        var listElement = '';
                        $.each( response, function( key, val ) {
                            if(search.type == 'shop'){
                                listElement += '<div class="result-content-list-data" datainternal-id="'+val.shop_id+'">';
                                listElement += '   <div class="result-content-list-data-head">';
                                if(val.shop_difdate <= 1){
                                    listElement += '   <span class="result-content-list-data-head-new">New</span>';
                                }
                                listElement += '       <img src="'+val.shop_icon+'"/>';
                                listElement += '   </div>';
                                listElement += '   <div class="result-content-list-data-body">';
                                listElement += '       <span>'+val.shop_name+'</span>';
                                listElement += '   </div>';
                                listElement += '</div>';
                            }else{
                                listElement += '<div class="result-content-list-data" datainternal-id="'+val.product_id+'">';
                                listElement += '   <div class="result-content-list-data-head">';
                                if(val.product_difdate <= 1){
                                    listElement += '   <span class="result-content-list-data-head-new">New</span>';
                                }
                                listElement += '       <img src="'+val.product_image+'"/>';
                                listElement += '   </div>';
                                listElement += '   <div class="result-content-list-data-body">';
                                listElement += '       <span>'+val.product_name+'</span>';
                                listElement += '       <span>'+val.product_price+'</span>';
                                listElement += '   </div>';
                                listElement += '</div>';
                            }
                        });
                        $(".list-search .result-content-list").html(listElement);
                        
                        $('.pagination').twbsPagination({
                            totalPages: data.total_page,
                            visiblePages: 10,
                            startPage: searchPage.page
                        }).on('page', function (event, page) {
                            searchPage.page = page;
                            searchItem();
                        });
                    }else{
                        searchPage.page = 1;
                        $('.result-content #searchNotFound').addClass('active');
                        $('.result-content .list-search').removeClass('active');
                    }
                    $('.loaderImg').addClass('hidden');
                }else{
                    generateToken(searchItem);
                }
            } 
        });
    }
}