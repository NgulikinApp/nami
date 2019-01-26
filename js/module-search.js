var search = {},
    searchPage = {};

$( document ).ready(function() {
    initGeneral();
    initSearch();
});

function initSearch(){
    provinces();
    /*
        Get value from url parameter.
        location function : js/module-general.js
    */
    var keywords = getUrlParam("keywords"),
        categoryProductStorage = sessionStorage.getItem("categoryProduct");
        
    var pathname = window.location.pathname,
        arraypathname = pathname.split("/"),
        category = arraypathname[2],
        subcategory = arraypathname[3];
        
    search.keywords = (keywords === null)?'':keywords;
    search.category = category;
    search.subcategory = subcategory;
    search.type = 'product';
    search.selsort = '1';
    search.rate = '';
    search.pricemax = '';
    search.pricemin = '';
    search.province = '';
    search.regency = '';
    
    $('#search-general').val(search.keywords);
    
    if(categoryProductStorage !== null){
        if (typeof category !== "undefined") {
            var categoryProductFlag = 0;
            var subcategoryProductFlag = 0;
            $.each(JSON.parse(categoryProductStorage), function( key, val ) {
                if(val.category_name === search.category){
                    var nameCategory = val.category_name;
                    search.category = val.category_id;
                    $('#categorySearch').html(nameCategory);
                    $('#categorySearchText').removeClass('hidden');
                    $('.fa-angle-right').removeClass('hidden');
                    categoryProductFlag = 1;
                    
                    if(typeof subcategory !== "undefined"){
                        $.each(val.subcategory, function( subkey, subval ) {
                            if(subval.subcategory_name === search.subcategory){
                                search.subcategory = subval.subcategory_id;
                                subcategoryProductFlag = 1;
                                return false;
                            }
                        });
                    }
                    return false;
                }
            });
            if(categoryProductFlag === 0 || categoryProductFlag === 1 && typeof subcategory !== "undefined" && subcategoryProductFlag === 0){
                $('.result-content #searchNotFound').addClass('active');
                $('.result-content .list-search').removeClass('active');
                $('#categorySearch').html('');
                $('.loaderImg').addClass('hidden');
            }else{
                searchItem();
            }
        }else{
            $('#categorySearch').html('');
            searchItem();
        }
    }else{
        generateToken(initSearch);
    }
    
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
	$('#sortingSearch,#provSearch').on('change', function (e) {
	    search.selsort = $(this).val();
	    searchItem();
	});
	
	$('#provSearch').on('change', function (e) {
	    search.province = $(this).val();
	    search.regency = '';
	    if(search.province !== ''){
	        $('#regSearch').prop("disabled",false);
	        $('.fiter-reg').removeClass("hidden");
	        regencies();
	    }else{
	        $('#regSearch').html("<option value=''>- Pilih Kabupaten -</option>");
	        $('#regSearch').prop("disabled",true);
	        $('.fiter-reg').addClass("hidden");
	    }
	    searchItem();
	});
	
	$('#regSearch').on('change', function (e) {
	    search.regency = $(this).val();
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
	        
	        $('.content:first-child span:first-child,#sortingText,#sortingSearch').show();
	        $('.content.price,.content.rate').show();
	        
	        $('#categorySearch').removeClass('hidden');
	        if (typeof category !== "undefined") {
	            $('.fa-angle-right').removeClass('hidden');
	        }
	        
	        search.type = 'product';
    
            searchItem();
	    //shop tab clicked
	    }else{
	        $('.result-content .result-content-tab .tab .icon-product').removeClass('active');
	        $('.result-content .result-content-tab .tab .icon-shop').addClass('active');
	        
	        $('.content:first-child span:first-child,#sortingText,#sortingSearch').hide();
	        $('.content.price,.content.rate').hide();
	        $('#categorySearch').addClass('hidden');
	        $('.fa-angle-right').addClass('hidden');
	        
	        search.type = 'shop';
    
            searchItem();
	    }
	});
}

function provinces(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(provinces);
    }else{
        $.ajax({
            type: 'GET',
            url: ADMINISTRATIVE_API,
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.status == "OK"){
                    var response = data.result;
                    
                    var listElement = '<option value= "">- Pilih Provinsi -</option>';
                    $.each( response, function( key, val ) {
                        listElement += '<option value="'+val.id+'">'+val.name+'</option>';
                    });
                    
                    $("#provSearch").html(listElement);
                }else{
                    generateToken(provinces);
                }
            } 
        });
    }
}

function regencies(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(provinces);
    }else{
        $.ajax({
            type: 'GET',
            url: ADMINISTRATIVE_API,
            data:{
                id : search.province
            },
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.status == "OK"){
                    var response = data.result;
                    
                    var listElement = '<option value= "">- Pilih Kabupaten -</option>';
                    $.each( response, function( key, val ) {
                        listElement += '<option value="'+val.id+'">'+val.name+'</option>';
                    });
                    
                    $("#regSearch").html(listElement);
                }else{
                    generateToken(regencies);
                }
            } 
        });
    }
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
                    subcategory : search.subcategory,
                    selsort : search.selsort,
                    type : search.type,
                    rate : search.rate,
                    pricemax : search.pricemax,
                    pricemin : search.pricemin,
                    province : search.province,
                    regency : search.regency,
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
                                var fregency = (val.regency_name).charAt(0).toUpperCase(),
                                    regency_name = fregency + ((val.regency_name).substr(1)).toLowerCase();
                                    
                                listElement += '<div class="result-content-list-data" data-shopname="'+val.shop_name+'">';
                                listElement += '   <div class="result-content-list-data-head">';
                                if(val.shop_difdate <= 1){
                                    listElement += '   <span class="result-content-list-data-head-new">New</span>';
                                }
                                listElement += '       <img src="'+val.shop_icon+'"/>';
                                listElement += '   </div>';
                                listElement += '   <div class="result-content-list-data-body">';
                                listElement += '       <span>'+val.shop_name+'</span>';
                                listElement += '       <span>';
                                listElement += '            <img src="/img/marker.png" style="vertical-align:inherit;margin-right: 5px;"/>';
                                listElement +=              regency_name;
                                listElement += '       </span>';
                                listElement += '   </div>';
                                listElement += '</div>';
                            }else{
                                listElement += '<div class="result-content-list-data" data-shopname="'+val.shop_name+'" data-productname="'+val.product_name+'">';
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
                        
                        $('.result-content #searchNotFound').removeClass('active');
                        $(".list-search .result-content-list").html(listElement);
                        
                        $('.pagination').twbsPagination({
                            totalPages: data.total_page,
                            visiblePages: 10,
                            startPage: searchPage.page
                        }).on('page', function (event, page) {
                            searchPage.page = page;
                            searchItem();
                        });
                        
                        $('.result-content-list-data').on('click', function (e) {
                            if(search.type == 'shop'){
                                var shopname = ($(this).data("shopname")).split(' ').join('-');
                                location.href = url+"/shop/"+shopname;
                            }else{
                                var shopname = ($(this).data("shopname")).split(' ').join('-'),
                                    productname = ($(this).data("productname")).split(' ').join('-');
                                    
                                location.href = url+"/product/"+shopname+"/"+productname;
                            }
                        });
                    }else{
                        searchPage.page = 1;
                        $('.result-content #searchNotFound').addClass('active');
                        $('.result-content .list-search').removeClass('active');
                        $(".list-search .result-content-list").html('');
                        $(".list-search .pagination").html('');
                    }
                    $('.loaderImg').addClass('hidden');
                }else{
                    generateToken(searchItem);
                }
            } 
        });
    }
}