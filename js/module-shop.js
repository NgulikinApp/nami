var commentFlag = new Object(),
    commentPage = new Object(),
    shopProductPage = new Object();

function initShop(){
    commentFlag.type = 0;
    detail();
    productShop();
    discussShop();
    reviewShop();
        
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
    
    $('#favorite-icon-shop').on( 'click', function( e ){
        var isfavorite = $(this).attr('datainternal-id');
        if(parseInt(isfavorite) == 1){
            notif("error","Anda sudah menyimpan toko ini","top");
        }else{
            favoriteShop();
        }
	});
	
	$('#buttonDiscussShop').on( 'click', function( e ){
        commentDiscussShop();
	});
	
	$('#buttonReviewShop').on( 'click', function( e ){
	    if($('#commentReviewShop').val() !== ''){
	        $('#buttonReviewShop').prop( "disabled", true );
            commentReviewShop();
	    }
	});
	
	$('#showMoreDiscussShop').on( 'click', function( e ){
	    commentFlag.type = 1;
	    $('.grid-shop-listcomment-more').removeClass('hidden');
	    $('.grid-shop-head').addClass('hidden');
	    $('.grid-shop-banner').addClass('hidden');
	    $('.grid-shop-body').addClass('hidden');
	    discussShop();
	});
	
	$('#showMoreReviewShop').on( 'click', function( e ){
	    commentFlag.type = 1;
	    $('.grid-shop-listcomment-more').removeClass('hidden');
	    $('.grid-shop-head').addClass('hidden');
	    $('.grid-shop-banner').addClass('hidden');
	    $('.grid-shop-body').addClass('hidden');
	    reviewShop();
	});
}

function detail(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(detail);
    }else{
        var url = window.location.href,
            shop_id = url.substr(url.lastIndexOf('/') + 1);
        
        $.ajax({
            type: 'GET',
            url: SHOP_API+'/'+shop_id,
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
                            
                            document.title = data.result.shop_name + ' | Ngulikin';
                            
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
                    $('.loaderProgress').addClass('hidden');
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
            shop_id = url.substr(url.lastIndexOf('/') + 1);
        $.ajax({
            type: 'POST',
            url: SHOP_FAVORITE_API,
            data:JSON.stringify({ 
                    shop_id: shop_id
            }),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                        generateToken(favoriteShop);
                }else if(data.message == 'You have saved this item'){
                    notif("error","Anda sudah menyimpan toko ini","left","top");
                }else{
                    notif("info","Toko ditambah ke daftar favorit","left","top");
                }
            }
        });
    }
}

function productShop(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(productShop);
    }else{
        var urlCurr = window.location.href,
            shop_id = urlCurr.substr(urlCurr.lastIndexOf('/') + 1);
        
        $('#pagingShopProduct').removeData("twbs-pagination");
        $('#pagingShopProduct').unbind("page");
        
        $("#productShopSection .grid-shop-body-content-list").empty();
        
        $('#loaderShopProduct').removeClass('hidden');
        
        if (typeof shopProductPage.page === 'undefined') {
            shopProductPage.page = 1;
        }
        
        $.ajax({
            type: 'GET',
            url: SHOP_PRODUCT_API+'/'+shop_id,
            data:{ 
                    page : shopProductPage.page-1,
                    pagesize : 8
            },
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.status == "OK"){
                    var response = data.response;
                    if(response.length > 0){
                        var listProduct = '';
                        $.each( response, function( key, val ) {
                            listProduct += '<div>';
                            listProduct += '   <img src="'+val.product_image+'" datainternal-id="'+val.product_id+'" class="productShopImage"/>';
                            listProduct += '</div>';
                        });
                        
                        $('#loaderShopProduct').addClass('hidden');
                        $("#productShopSection .grid-shop-body-content-list").html(listProduct);
                        
                        $('.productShopImage').on('click', function (e) {
                            var datainternal = $(this).attr('datainternal-id');
                            location.href = url+"/product/"+datainternal;
                        });
                        
                        $('#pagingShopProduct').twbsPagination({
                            totalPages: data.total_page,
                            visiblePages: 10,
                            startPage: shopProductPage.page
                        }).on('page', function (event, page) {
                            shopProductPage.page = page;
                            productShop();
                        });
                    }
                }else{
                    generateToken(productShop);
                }
            }
        });
    }
}

function discussShop(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(discussShop);
    }else{
        var urlCurr = window.location.href,
            shop_id = urlCurr.substr(urlCurr.lastIndexOf('/') + 1);
            
        if(commentFlag.type == 1){
            $('.loaderProgress').removeClass('hidden');
        }
        
        $('#pagingShopMore').removeData("twbs-pagination");
        $('#pagingShopMore').unbind("page");
            
        if (typeof commentPage.page === 'undefined') {
            commentPage.page = 1;
        }
        $.ajax({
            type: 'GET',
            url: SHOP_DISCUSS_API+'/'+shop_id,
            data:{ 
                    page : commentPage.page-1,
                    pagesize : 8,
                    type : commentFlag.type
            },
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.status == "OK"){
                    var response = data.response;
                    if(response.length > 0){
                        var listDiscuss = '';
                        $.each( response, function( key, val ) {
                            listDiscuss += '<div class="grid-shop-body-content-listComment-temp">';
                            listDiscuss += '     <div class="grid-shop-body-content-listComment-content">';
                            listDiscuss += '        <img src="'+val.user_photo+'" datainternal-id="'+val.user_id+'" class="discussShopPhoto"/>';
                            listDiscuss += '     </div>';
                            listDiscuss += '     <div class="grid-shop-body-content-listComment-content">';
                            listDiscuss += '        <div class="head">';
                            listDiscuss += '             <span>'+val.fullname+'</span>';
                            listDiscuss += '             <span>'+val.comment_date+'</span>';
                            listDiscuss += '             <span>'+val.shop_discuss_comment+'</span>';
                            listDiscuss += '         </div>';
                            listDiscuss += '        <div class="body">';
                            listDiscuss += '             <div class="discussCommentReply">';
                            listDiscuss += '                <div>';
                            listDiscuss += '                    <img src="https://scontent.fcgk3-1.fna.fbcdn.net/v/t1.0-1/p100x100/16472974_10208482547443706_4718047265869220728_n.jpg?_nc_eui2=v1%3AAeG-pza6KEQ0FXhmk9PaO35XAV9KvNQSEOZ3HfWgL28nSgZll4z8yMv6guvWkZekVaPEsxlb4sVGe6xhMQgS2yPOYc5sB9HUNMmKRH187NhZZ4IhFGbUdgg0TLbcnkmrxY4&oh=9d9c654cc1cba7477eb3135b24233106&oe=5A444A7E"/>';
                            listDiscuss += '                </div>';
                            listDiscuss += '                <div>';
                            listDiscuss += '                    <span>';
                            listDiscuss += '                        <span class="title" id="name">Andhika Adhitana Gama</span>';
                            listDiscuss += '                        <span class="title" id="replySellerShop">Penjual</span>';
                            listDiscuss += '                    </span>';
                            listDiscuss += '                    <span>Jumat, 15 September 2017</span>';
                            listDiscuss += '                    <span>All size gan, masih ready stock banget, bisa langsung di order</span>';
                            listDiscuss += '                </div>';
                            listDiscuss += '             </div>';
                            listDiscuss += '         </div>';
                            listDiscuss += '     </div>';
                            listDiscuss += '</div>';
                        });
                        
                        if(commentFlag.type == 0){
                            $('#loaderShopDiscuss').addClass('hidden');
                            $("#discussShopSection .grid-shop-body-content-listComment").html(listDiscuss);
                        }else{
                            $(".grid-shop-listcomment-more .grid-shop-body-content-listComment").html(listDiscuss);
                            
                            $('#pagingShopMore').twbsPagination({
                                totalPages: data.total,
                                visiblePages: 10,
                                startPage: commentPage.page
                            }).on('page', function (event, page) {
                                commentPage.page = page;
                                reviewShop();
                            });
                            
                            $('.loaderProgress').addClass('hidden');
                        }
                        
                        
                        $('.discussShopPhoto').on('click', function (e) {
                            var datainternal = $(this).attr('datainternal-id');
                            location.href = url+"/product/"+datainternal;
                        });
                    }
                }else{
                    generateToken(discussShop);
                }
            }
        });
    }
}

function commentDiscussShop(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(commentDiscussShop);
    }else{
        var url = window.location.href,
            shop_id = url.substr(url.lastIndexOf('/') + 1),
            comment = $('#commentDiscussShop').val();
            
        $.ajax({
            type: 'POST',
            url: SHOP_DISCUSS_COMMENT_API+'/'+shop_id,
            data:JSON.stringify({ 
                    comment: comment
            }),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                        generateToken(commentDiscussShop);
                }else{
                    var elemDiscuss = '<div class="grid-shop-body-content-listComment-temp">';
                        elemDiscuss += '     <div class="grid-shop-body-content-listComment-content">';
                        elemDiscuss += '        <img src="'+data.result.user_photo+'" datainternal-id="'+data.result.user_id+'" class="reviewShopPhoto"/>';
                        elemDiscuss += '     </div>';
                        elemDiscuss += '     <div class="grid-shop-body-content-listComment-content">';
                        elemDiscuss += '        <div class="head">';
                        elemDiscuss += '            <span>'+data.result.fullname+'</span>';
                        elemDiscuss += '             <span>'+data.result.comment_date+'</span>';
                        elemDiscuss += '             <span>'+data.result.shop_comment+'</span>';
                        elemDiscuss += '         </div>';
                        elemDiscuss += '     </div>';
                        elemDiscuss += '</div>';
                        
                    $("#discussShopSection .grid-shop-body-content-listComment").append(elemDiscuss);
                }
            }
        });
    }
}

function reviewShop(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(reviewShop);
    }else{
        var urlCurr = window.location.href,
            shop_id = urlCurr.substr(urlCurr.lastIndexOf('/') + 1);
        
        if(commentFlag.type == 1){
            $('.loaderProgress').removeClass('hidden');
        }
        
        $('#pagingShopMore').removeData("twbs-pagination");
        $('#pagingShopMore').unbind("page");
        
        if (typeof commentPage.page === 'undefined') {
            commentPage.page = 1;
        }
        $.ajax({
            type: 'GET',
            url: SHOP_REVIEW_API+'/'+shop_id,
            data:{ 
                    page : commentPage.page-1,
                    pagesize : 8,
                    type : commentFlag.type
            },
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.status == "OK"){
                    var response = data.response;
                    if(response.length > 0){
                        var listReview = '';
                        $.each( response, function( key, val ) {
                            listReview += '<div class="grid-shop-body-content-listComment-temp">';
                            listReview += '     <div class="grid-shop-body-content-listComment-content">';
                            listReview += '        <img src="'+val.user_photo+'" datainternal-id="'+val.user_id+'" class="reviewShopPhoto"/>';
                            listReview += '     </div>';
                            listReview += '     <div class="grid-shop-body-content-listComment-content">';
                            listReview += '        <div class="head">';
                            listReview += '            <span>'+val.fullname+'</span>';
                            listReview += '             <span>'+val.comment_date+'</span>';
                            listReview += '             <span>'+val.shop_review_comment+'</span>';
                            listReview += '         </div>';
                            listReview += '     </div>';
                            listReview += '</div>';
                        });
                        
                        if(commentFlag.type == 0){
                            $('#loaderShopReview').addClass('hidden');
                            $("#reviewShopSection .grid-shop-body-content-listComment").html(listReview);
                        }else{
                            $(".grid-shop-listcomment-more .grid-shop-body-content-listComment").html(listReview);
                            
                            $('#pagingShopMore').twbsPagination({
                                totalPages: data.total,
                                visiblePages: 10,
                                startPage: commentPage.page
                            }).on('page', function (event, page) {
                                commentPage.page = page;
                                reviewShop();
                            });
                            
                            $('.loaderProgress').addClass('hidden');
                        }
                        
                        $('.reviewShopPhoto').on('click', function (e) {
                            var datainternal = $(this).attr('datainternal-id');
                            location.href = url+"/product/"+datainternal;
                        });
                    }
                }else{
                    generateToken(reviewShop);
                }
            }
        });
    }
}

function commentReviewShop(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(commentReviewShop);
    }else{
        var url = window.location.href,
            shop_id = url.substr(url.lastIndexOf('/') + 1),
            comment = $('#commentReviewShop').val();
        
        $.ajax({
            type: 'POST',
            url: SHOP_REVIEW_COMMENT_API+'/'+shop_id,
            data:JSON.stringify({ 
                    comment: comment
            }),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                        generateToken(commentReviewShop);
                }else{
                    var elemReview = '<div class="grid-shop-body-content-listComment-temp">';
                        elemReview += '     <div class="grid-shop-body-content-listComment-content">';
                        elemReview += '        <img src="'+data.result.user_photo+'" datainternal-id="'+data.result.user_id+'" class="reviewShopPhoto"/>';
                        elemReview += '     </div>';
                        elemReview += '     <div class="grid-shop-body-content-listComment-content">';
                        elemReview += '        <div class="head">';
                        elemReview += '            <span>'+data.result.fullname+'</span>';
                        elemReview += '             <span>'+data.result.comment_date+'</span>';
                        elemReview += '             <span>'+data.result.shop_comment+'</span>';
                        elemReview += '         </div>';
                        elemReview += '     </div>';
                        elemReview += '</div>';
                        
                    $("#reviewShopSection .grid-shop-body-content-listComment").append(elemReview);
                    
                    $('#buttonReviewShop').prop( "disabled", false );
                    $('#commentReviewShop').val('')
                }
            }
        });
    }
}