var commentFlag = {},
    commentPage = {},
    shopProductPage = {};

$( document ).ready(function() {
    initGeneral();
    initShop();
});

function initShop(){
    commentFlag.type = 0;
    
    detail();
    brandShop();
    productShop();
    discussShop();
    reviewShop();
        
    $('.grid-shop-body .grid-shop-body-head div:first-child').on('click', function (e) {
        $('.grid-shop-body .grid-shop-body-head .menu').removeClass("bluesky").removeClass('border-yellow');
	    $('.grid-shop-body .grid-shop-body-head .menu:first-child').addClass("bluesky").addClass('border-yellow');
	   
        $('.grid-shop-body #productShopSection').removeClass('hidden');
        $('.grid-shop-body #discussShopSection').addClass('hidden');
        $('.grid-shop-body #reviewShopSection').addClass('hidden');
        $('.grid-shop-body #notesShopSection').addClass('hidden');
    });
    
    $('.grid-shop-body .grid-shop-body-head div:nth-child(2)').on('click', function (e) {
        $('.grid-shop-body .grid-shop-body-head .menu').removeClass("bluesky").removeClass('border-yellow');
	    $('.grid-shop-body .grid-shop-body-head .menu:nth-child(2)').addClass("bluesky").addClass('border-yellow');
	    
        $('.grid-shop-body #productShopSection').addClass('hidden');
        $('.grid-shop-body #discussShopSection').removeClass('hidden');
        $('.grid-shop-body #reviewShopSection').addClass('hidden');
        $('.grid-shop-body #notesShopSection').addClass('hidden');
    });
    
    $('.grid-shop-body .grid-shop-body-head div:nth-child(3)').on('click', function (e) {
        $('.grid-shop-body .grid-shop-body-head .menu').removeClass("bluesky").removeClass('border-yellow');
	    $('.grid-shop-body .grid-shop-body-head .menu:nth-child(3)').addClass("bluesky").addClass('border-yellow');
	    
        $('.grid-shop-body #productShopSection').addClass('hidden');
        $('.grid-shop-body #discussShopSection').addClass('hidden');
        $('.grid-shop-body #reviewShopSection').removeClass('hidden');
        $('.grid-shop-body #notesShopSection').addClass('hidden');
    });
    
    $('.grid-shop-body .grid-shop-body-head div:last-child').on('click', function (e) {
        $('.grid-shop-body .grid-shop-body-head .menu').removeClass("bluesky").removeClass('border-yellow');
	    $('.grid-shop-body .grid-shop-body-head .menu:last-child').addClass("bluesky").addClass('border-yellow');
	   
        $('.grid-shop-body #productShopSection').addClass('hidden');
        $('.grid-shop-body #discussShopSection').addClass('hidden');
        $('.grid-shop-body #reviewShopSection').addClass('hidden');
        $('.grid-shop-body #notesShopSection').removeClass('hidden');
    });
    
    $('#favorite-icon-shop').on( 'click', function( e ){
        if($('.isSignin').val() === ''){
             notif("error","Harap login terlebih dahulu","left","top");
        }else{
            favoriteShop();
        }
	});
	
	$('#buttonDiscussShop').on( 'click', function( e ){
        commentDiscussShop();
	});
	
	$('#commentDiscussShop').keypress(function(e) {
	    if(e.which == 13) {
    	    $('#buttonDiscussShop').trigger('click');
	    }
	});
	
	$('#buttonReviewShop').on( 'click', function( e ){
	    if($('#commentReviewShop').val() !== ''){
	        $('#buttonReviewShop').prop( "disabled", true );
            commentReviewShop();
	    }
	});
	
	$('#commentReviewShop').keypress(function(e) {
	    if(e.which == 13) {
    	    $('#buttonReviewShop').trigger('click');
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
            shop_name = url.substr(url.lastIndexOf('/') + 1);
        
        $.ajax({
            type: 'GET',
            url: SHOP_API+'/'+shop_name,
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
                            
                            $('#shop_id').val(data.result.shop_id);
                            
                            if(data.result.university === ''){
                                $('.grid-shop-head-right div:last-child').css('border-right','none');
                            }
                            if(data.result.shop_banner !== ''){
                                $('.home_container .container .grid-shop-banner').css('background','url(' + data.result.shop_banner + ')');
                            }
                            
                            if(data.result.canbecommented)$('.grid-shop-body-content-inputComment').removeClass('hidden');
                            
                            $('#day-line').milestones({
                        		stage: 7,
                        		checkclass: 'checks',
                        		labels: ["Senin","Selasa","Rabu","Kamis","Jumat","Sabtu","Minggu"],
                        		monday:data.result.shop_monday,
                                tuesday:data.result.shop_tuesday,
                                wednesday:data.result.shop_wednesday,
                                thursday:data.result.shop_thursday,
                                friday:data.result.shop_friday,
                                saturday:data.result.shop_saturday,
                                sunday:data.result.shop_sunday
                        	});
                        	
                        	$('#time_op_from').html('Jam '+sectohour(data.result.shop_op_from));
                        	$('#time_op_to').html('Jam '+sectohour(data.result.shop_op_to));
                        	
                        	var shop_desc = (data.result.shop_desc !== '')?data.result.shop_desc !== '':'Tidak ada keterangan';
                        	$('#note-seller-info').html(shop_desc);
                        	
                        	$('.note-footer span').html(data.result.shop_notes_modifydate);
                        	
                        	var shop_closing_notes = (data.result.shop_closing_notes !== '')?data.result.shop_closing_notes !== '':'Tidak ada keterangan';
                        	$('#close-info').html(shop_closing_notes);
                        	
                        	if(data.result.shop_close !== ''){
                        	    $('#shop_close_filled').html(data.result.shop_close);
                        	    $('#shop_close_filled').removeClass('hidden');
                        	    $('#shop_close_empty').addClass('hidden');
                        	}
                        	
                        	if(data.result.shop_open !== ''){
                        	    $('#shop_open_filled').html(data.result.shop_open);
                        	    $('#shop_open_filled').removeClass('hidden');
                        	    $('#shop_open_empty').addClass('hidden');
                        	}
                        	
                        	$('#shop_close_date').html(data.result.shop_close);
                        	$('#shop_open_date').html(data.result.shop_open);
                        	
                        	var shop_location = (data.result.shop_location !== '')?data.result.shop_location !== '':'Belum diisi';
                        	$('#address-shop').html(shop_location);
                        	
                        	$('#owner-shop').html(data.result.fullname);
                        	$('#hp-shop').html(data.result.phone);
                        	
                        	$('#shop_total_discuss').html(data.result.shop_total_discuss);
                        	
                        	$('#shop_total_review').html(data.result.shop_total_review);
                        	
                        	var shop_image_location_len = data.result.shop_image_location.length;
                        	if(shop_image_location_len > 0){
                        	    var imageLocation = '<div class="image">';
                        	        imageLocation += '      <img src="'+data.result.shop_image_location[0]+'" width="200" height="200"/>';
                        	        imageLocation += '</div>';
                        	        if(shop_image_location_len > 1){
                        	            imageLocation += '<div class="listimage" style="margin-top:10px;">';
                        	            imageLocation += '      <nav>';
                        	            for(var i=0;i<shop_image_location_len;i++){
                                	        imageLocation += '      <a href="'+data.result.shop_image_location[i]+'">';
                                            imageLocation += '          <img src="'+data.result.shop_image_location[i]+'" width="50" height="50"/>';
                                            imageLocation += '      </a>';
                        	            }
                                	    imageLocation += '      </nav>';
                        	            imageLocation += '</div>';
                        	        }
                        	        
                        	    $('.list-photo-location').html(imageLocation);
                        	    
                        	    $.tosrus.defaults.media.image = {
                            		filterAnchors: function( $anchor ) {
                            			return $anchor.attr( 'href' ).indexOf( 'images.ngulikin.com' ) > -1;
                            		}
                            	};
                            	
                        	    $('.listimage a').tosrus({
                            		buttons: 'inline',
                            		pagination	: {
                            			add			: true,
                            			type		: 'thumbnails'
                            		}
                            	});
                        	}
                    }else{
                        document.title = 'Tidak ditemukan | Ngulikin';
                        
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
                    $('body').removeClass('hiddenoverflow');
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
        $.ajax({
            type: 'POST',
            url: SHOP_FAVORITE_API,
            data:JSON.stringify({ 
                    shop_id: $('#shop_id').val()
            }),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                    generateToken(favoriteShop);
                }else if(data.result.isfavorite === 0){
                    notif("info","Toko dihapus dari daftar favorit","left","top");
                }else{
                    notif("info","Toko ditambah ke daftar favorit","left","top");
                }
            }
        });
    }
}

function brandShop(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(brandShop);
    }else{
        var urlCurr = window.location.href,
            shop_name = urlCurr.substr(urlCurr.lastIndexOf('/') + 1);
        
        $('#pagingShopBrand').removeData("twbs-pagination");
        $('#pagingShopBrand').unbind("page");
        
        $("#list-brand").empty();
        
        $('#loaderShopBrand').removeClass('hidden');
        
        $.ajax({
            type: 'GET',
            url: SHOP_BRAND_API+'/'+shop_name,
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.status == "OK"){
                    var response = data.result;
                    if(response.length > 0){
                        var listBrand = '';
                        $.each( response, function( key, val ) {
                            listBrand += '<div>';
                            listBrand += '   <img src="'+val.brand_image+'" title="'+val.brand_name+'" class="brandShopImage"/>';
                            listBrand += '</div>';
                        });
                        
                        $('#loaderShopBrand').addClass('hidden');
                        $("#list-brand").html(listBrand);
                    }
                }else{
                    generateToken(brandShop);
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
            shop_name = urlCurr.substr(urlCurr.lastIndexOf('/') + 1);
        
        $('#pagingShopProduct').removeData("twbs-pagination");
        $('#pagingShopProduct').unbind("page");
        
        $("#list-product").empty();
        
        $('#loaderShopProduct').removeClass('hidden');
        
        if (typeof shopProductPage.page === 'undefined') {
            shopProductPage.page = 1;
        }
        
        $.ajax({
            type: 'GET',
            url: SHOP_PRODUCT_API+'/'+shop_name,
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
                            listProduct += '   <img src="'+val.product_image+'" data-shopname="'+val.shop_name+'" data-productname="'+val.product_name+'" title="'+val.product_name+'" class="productShopImage"/>';
                            listProduct += '</div>';
                        });
                        
                        $('#loaderShopProduct').addClass('hidden');
                        $("#list-product").html(listProduct);
                        
                        $('.productShopImage').on('click', function (e) {
                            var shopname = ($(this).data("shopname")).split(' ').join('-'),
                                productname = ($(this).data("productname")).split(' ').join('-');
                                                    
                                location.href = url+"/product/"+shopname+"/"+productname;
                        });
                        
                        if(response.length > 10){
                            $('#pagingShopProduct').twbsPagination({
                                totalPages: data.total_page,
                                visiblePages: 10,
                                startPage: shopProductPage.page
                            }).on('page', function (event, page) {
                                shopProductPage.page = page;
                                productShop();
                            });   
                        }
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
            shop_name = urlCurr.substr(urlCurr.lastIndexOf('/') + 1);
            
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
            url: SHOP_DISCUSS_API+'/'+shop_name,
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
                            listDiscuss += '        <img src="'+val.user_photo+'" class="discussShopPhoto"/>';
                            listDiscuss += '     </div>';
                            listDiscuss += '     <div class="grid-shop-body-content-listComment-content">';
                            listDiscuss += '        <div class="head">';
                            listDiscuss += '             <span>'+val.fullname+'</span>';
                            listDiscuss += '             <span>'+val.shop_discuss_comment+'</span>';
                            listDiscuss += '             <span class="discussShopCommentDate"><img src="/img/notif.png"/> '+val.comment_date+'</span>';
                            if($('.isSignin').val() !== ''){
                                listDiscuss += '             <span class="discussShopCommentReply" data-shop_discuss_id="'+val.shop_discuss_id+'"><i class="fa fa-reply"></i> Balas</span>';
                            }
                            listDiscuss += '         </div>';
                            listDiscuss += '     </div>';
                            listDiscuss += '</div>';
                            
                            if(val.reply_comments.length > 0){
                                $.each( val.reply_comments, function( reply_key, reply_val ) {
                                    var isseller = reply_val.isseller ? 'Penjual' : '';
                                    listDiscuss += '<div class="grid-shop-body-content-listComment-temp reply">';
                                    listDiscuss += '     <div class="grid-shop-body-content-listComment-content">';
                                    listDiscuss += '        <img src="'+reply_val.user_photo+'"  class="discussShopPhoto"/>';
                                    listDiscuss += '     </div>';
                                    listDiscuss += '     <div class="grid-shop-body-content-listComment-content">';
                                    listDiscuss += '        <div class="head">';
                                    listDiscuss += '            <span>';
                                    listDiscuss += '                <span class="title" id="name">'+reply_val.fullname+'</span>';
                                    listDiscuss += '                <span class="title" id="replySellerShop">'+isseller+'</span>';
                                    listDiscuss += '            </span>';
                                    listDiscuss += '            <span>'+reply_val.comment+'</span>';
                                    listDiscuss += '            <span class="discussShopCommentDate"><img src="/img/notif.png"/>'+reply_val.comment_date+'</span>';
                                    if($('.isSignin').val() !== ''){
                                        listDiscuss += '             <span class="discussShopCommentReply reply" data-shop_discuss_id="'+val.shop_discuss_id+'"><i class="fa fa-reply"></i> Balas</span>';
                                    }
                                    listDiscuss += '         </div>';
                                    listDiscuss += '     </div>';
                                    listDiscuss += '</div>';
                                });
                            }
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
                        
                        $('.discussShopCommentReply').on( 'click', function( e ){
                            $('.commentReplyDiscussShopTemp').remove();
                            var shop_discuss_id = $(this).data("shop_discuss_id");
                            $('#shop_discuss_id').val(shop_discuss_id);
                            
                            var replytemp = '';
                            if($(this).hasClass('reply')){
                                replytemp += '<div class="commentReplyDiscussShopTemp replyingCommentShop">';
                                replytemp += '  <input type="text" class="commentReplyDiscussShop" placeholder="..."/>';
                                replytemp += '</div>';
                            }else{
                                replytemp = '<div class="commentReplyDiscussShopTemp replyCommentShop">';
                                replytemp += '  <input type="text" class="commentReplyDiscussShop" placeholder="..."/>';
                                replytemp += '</div>';
                            }
                            $(replytemp).insertAfter($(this).closest('.grid-shop-body-content-listComment-temp'));
                            
                            $('.commentReplyDiscussShop').keypress(function(e) {
                        	    if(e.which == 13 && $('.commentReplyDiscussShop').val() !== '') {
                        	        
                            	    replyCommentDiscussShop();
                        	    }
                        	});
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
        var shop_id = $('#shop_id').val(),
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
                        elemDiscuss += '        <img src="'+data.result.user_photo+'" class="reviewShopPhoto"/>';
                        elemDiscuss += '     </div>';
                        elemDiscuss += '     <div class="grid-shop-body-content-listComment-content">';
                        elemDiscuss += '        <div class="head">';
                        elemDiscuss += '            <span>'+data.result.username+'</span>';
                        elemDiscuss += '             <span>'+data.result.comment_date+'</span>';
                        elemDiscuss += '             <span>'+data.result.shop_comment+'</span>';
                        elemDiscuss += '         </div>';
                        elemDiscuss += '     </div>';
                        elemDiscuss += '</div>';
                        
                    $("#discussShopSection .grid-shop-body-content-listComment").append(elemDiscuss);
                    
                    var shop_total_discuss = parseInt($("#shop_total_discuss").text())+1;
                    $("#shop_total_discuss").html(shop_total_discuss);
                }
            }
        });
    }
}

function replyCommentDiscussShop(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(commentDiscussShop);
    }else{
        var shop_discuss_id = $('#shop_discuss_id').val(),
            comment = $('.commentReplyDiscussShop').val();
            
        $.ajax({
            type: 'POST',
            url: SHOP_DISCUSS_REPLYCOMMENT_API+'/'+shop_discuss_id,
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
                    discussShop();
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
            shop_name = urlCurr.substr(urlCurr.lastIndexOf('/') + 1);
        
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
            url: SHOP_REVIEW_API+'/'+shop_name,
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
                            listReview += '        <img src="'+val.user_photo+'" class="reviewShopPhoto"/>';
                            listReview += '     </div>';
                            listReview += '     <div class="grid-shop-body-content-listComment-content">';
                            listReview += '        <div class="head">';
                            listReview += '            <span>'+val.username+'</span>';
                            listReview += '             <span>'+val.shop_review_comment+'</span>';
                            listReview += '             <span><img src="/img/notif.png"/> '+val.comment_date+'</span>';
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
        var shop_id = $('#shop_id').val(),
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
                        elemReview += '        <img src="'+data.result.user_photo+'" class="reviewShopPhoto"/>';
                        elemReview += '     </div>';
                        elemReview += '     <div class="grid-shop-body-content-listComment-content">';
                        elemReview += '        <div class="head">';
                        elemReview += '            <span>'+data.result.username+'</span>';
                        elemReview += '             <span>'+data.result.comment_date+'</span>';
                        elemReview += '             <span>'+data.result.shop_comment+'</span>';
                        elemReview += '         </div>';
                        elemReview += '     </div>';
                        elemReview += '</div>';
                        
                    $("#reviewShopSection .grid-shop-body-content-listComment").append(elemReview);
                    
                    $('#buttonReviewShop').prop( "disabled", false );
                    $('#commentReviewShop').val('');
                    
                    var shop_total_review = parseInt($("#shop_total_review").text())+1;
                    $("#shop_total_review").html(shop_total_review);
                }
            }
        });
    }
}