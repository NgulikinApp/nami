var rateData = {},
    addtocartSum = {},
    productData = {},
    commentPage = {},
    commentFlag = {};

$( document ).ready(function() {
    initGeneral();
    initProduct();
});

function initProduct(){
    commentFlag.type = 0;
    
	detail();
	discussProduct();
	reviewProduct();
	
	$('.grid-shop-body .grid-shop-body-head div:first-child').on('click', function (e) {
        $('.grid-shop-body .grid-shop-body-head .menu').removeClass("bluesky").removeClass('border-yellow');
	    $('.grid-shop-body .grid-shop-body-head .menu:first-child').addClass("bluesky").addClass('border-yellow');
	   
        $('.grid-shop-body #descProductSection').removeClass('hidden');
        $('.grid-shop-body #discussProductSection').addClass('hidden');
        $('.grid-shop-body #reviewProductSection').addClass('hidden');
        $('.grid-shop-body #infoProductSection').addClass('hidden');
    });
    
    $('.grid-shop-body .grid-shop-body-head div:nth-child(2)').on('click', function (e) {
        $('.grid-shop-body .grid-shop-body-head .menu').removeClass("bluesky").removeClass('border-yellow');
	    $('.grid-shop-body .grid-shop-body-head .menu:nth-child(2)').addClass("bluesky").addClass('border-yellow');
	    
        $('.grid-shop-body #descProductSection').addClass('hidden');
        $('.grid-shop-body #discussProductSection').removeClass('hidden');
        $('.grid-shop-body #reviewProductSection').addClass('hidden');
        $('.grid-shop-body #infoProductSection').addClass('hidden');
    });
    
    $('.grid-shop-body .grid-shop-body-head div:nth-child(3)').on('click', function (e) {
        $('.grid-shop-body .grid-shop-body-head .menu').removeClass("bluesky").removeClass('border-yellow');
	    $('.grid-shop-body .grid-shop-body-head .menu:nth-child(3)').addClass("bluesky").addClass('border-yellow');
	    
        $('.grid-shop-body #descProductSection').addClass('hidden');
        $('.grid-shop-body #discussProductSection').addClass('hidden');
        $('.grid-shop-body #reviewProductSection').removeClass('hidden');
        $('.grid-shop-body #infoProductSection').addClass('hidden');
    });
    
    $('.grid-shop-body .grid-shop-body-head div:last-child').on('click', function (e) {
        $('.grid-shop-body .grid-shop-body-head .menu').removeClass("bluesky").removeClass('border-yellow');
	    $('.grid-shop-body .grid-shop-body-head .menu:last-child').addClass("bluesky").addClass('border-yellow');
	   
        $('.grid-shop-body #descProductSection').addClass('hidden');
        $('.grid-shop-body #discussProductSection').addClass('hidden');
        $('.grid-shop-body #reviewProductSection').addClass('hidden');
        $('.grid-shop-body #infoProductSection').removeClass('hidden');
    });
	
	$('#buttonDiscussProduct').on( 'click', function( e ){
        commentDiscussProduct();
	});
	
	$('#commentDiscussProduct').keypress(function(e) {
	    if(e.which == 13) {
    	    $('#buttonDiscussProduct').trigger('click');
	    }
	});
	
	$('#buttonReviewProduct').on( 'click', function( e ){
	    if($('#commentReviewProduct').val() !== ''){
	        $('#buttonReviewProduct').prop( "disabled", true );
            commentReviewProduct();
	    }
	});
	
	$('#commentReviewProduct').keypress(function(e) {
	    if(e.which == 13) {
    	    $('#buttonReviewProduct').trigger('click');
	    }
	});
	
	$('#showMoreDiscussProduct').on( 'click', function( e ){
	    commentFlag.type = 1;
	    $('.grid-shop-listcomment-more').removeClass('hidden');
	    $('.grid-shop-head').addClass('hidden');
	    $('.grid-shop-banner').addClass('hidden');
	    $('.grid-shop-body').addClass('hidden');
	    discussProduct();
	});
	
	$('#showMoreReviewProduct').on( 'click', function( e ){
	    commentFlag.type = 1;
	    $('.grid-shop-listcomment-more').removeClass('hidden');
	    $('.grid-shop-head').addClass('hidden');
	    $('.grid-shop-banner').addClass('hidden');
	    $('.grid-shop-body').addClass('hidden');
	    reviewProduct();
	});
}

function detail(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("detail");
    }else{
        var pathname = window.location.pathname,
            arraypathname = pathname.split("/"),
            shop_name = arraypathname[2],
            product_name = arraypathname[3];
        $.ajax({
            type: 'GET',
            url: PRODUCT_API+'/'+shop_name+'/'+product_name,
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.status == "OK"){
                    if($.isEmptyObject(data.result) === false){
                        var israte = data.result.product_israte;
                        
                        if(data.result.canbecommented)$('.grid-product-body-content-inputComment').removeClass('hidden');
                        
                        var product = '<div class="content">';
                            product += '    <div class="left">';
                            product += '        <div class="image">';
                            product += '            <img src="'+data.result.product_image[0]+'" width="300" height="300"/>';
                            product += '        </div>';
                            product += '        <div class="listimage">';
                            product += '            <nav>';
                            
                            var product_images_len = data.result.product_image.length;
                            if(product_images_len > 1){
                                for(var i=0;i<product_images_len;i++){
                                    product += '<a href="'+data.result.product_image[i]+'">';
                                    product += '    <img src="'+data.result.product_image[i]+'" width="50" height="50"/>';
                                    product += '</a>';
                                }
                            }
                            
                            product += '            </nav>';
                            product += '        </div>';
                            product += '    </div>';
                            product += '    <div class="right">';
                            product += '        <span>';
                            product += '            <div>';
                            product += '                <img src="'+data.result.shop_icon+'" width="30" height="30"/>';
                            product += '            </div>';
                            product += '            <div>';
                            product += '                <span style="font-size: 12px;font-family: proxima_nova;">Merk</span>';
                            product += '                <span class="fn-14">'+data.result.brand_name+'</span>';
                            product += '            </div>';
                            product += '        </span>';
                            product += '        <span>'+data.result.product_name+'</span>';
                            product += '        <span>IDR '+data.result.product_price+'</span>';
                            product += '        <span>';
                            product += '            <div class="product_sell">Nilai Produk</div';
                            product += '            ><div class="product_sell">Produk Terjual</div';
                            product += '            ><div class="product_sell">Produk Tersisa</div>';
                            product += '        </span>'
                            product += '        <span>';
                            product += '            <div class="product_sell product_sellval" style="border-top:1px solid #E0E0DF;border-bottom:1px solid #E0E0DF;">';
                            product += '                <div class="rateyo"></div>';
                            product += '            </div';
                            product += '            ><div class="product_sell product_sellval" style="border:1px solid #E0E0DF;">150 dalam sebulan</div';
                            product += '            ><div class="product_sell product_sellval" style="border-top:1px solid #E0E0DF;border-bottom:1px solid #E0E0DF;">'+data.result.product_stock+'</div>';
                            product += '        </span>';
                            product += '        <span style="margin-top: 20px;">';
                            product += '            <div class="fn-13" style="margin-left: 175px;">Jumlah Barang</div>';
                            product += '            <div class="fn-12" style="margin-left: 202px;">Pembelian Aman</div>';
                            product += '        </span>';
                            product += '        <span>';
                            product += '            <div style="margin-left: 150px;">';
                            product += '                <div class="redCont productCalcMin" style="padding: 6px 15px;color: #424242;opacity: 0.5;">-</div';
                            product += '                ><div>';
                            product += '                    <input type="text" id="sumProduct" value="1"/>';
                            product += '                </div';
                            product += '                ><div class="blueCont productCalcPlus" style="padding: 6px 15px;color: #424242;">+</div>';
                            product += '            </div>';
                            product += '            <div style="margin-left: 140px;">';
                            product += '                <div class="buynow">BELI SEKARANG</div>';
                            product += '            </div>';
                            product += '        </span>';
                            product += '        <span style="margin-top: 20px;">';
                            product += '            <div class="btnaddcart" style="margin-left: 125px;" id="btnCart"><i class="fa fa-shopping-cart"></i> TAMBAH KERANJANG</div>';
                            product += '            <div class="btnaddcart" style="margin-left: 108px;opacity: 0.5;"><i class="fa fa-comment-o"></i> KIRIM PESAN</div>';
                            product += '        </span>';
                            product += '        <span style="margin-top: 20px;font-size: 12px;color: #F97C64;">Catatan Pelapak diperuntukan bagi pelapak yang ingin memberikan catatan tambahan yang tidak terkait dengan deskripsi barang kepada calon pembeli</span>';
                            product += '    </div>';
                            product += '</div>';
                            product += '<div class="content" id="right">';
                            product += '    <div class="top">';
                            product += '        <span class="fn-12">PENGIRIMAN</span>';
                            product += '    </div>';
                            product += '    <div class="bottom">';
                            product += '        <div class="head">';
                            product += '            <img src="/img/delivery/jne.png" width="70" height="35" style="margin-right: 65px;">';
                            product += '            <img src="/img/delivery/tiki.png" width="70" height="35">';
                            product += '        </div>';
                            product += '        <hr/>';
                            product += '        <div class="body">';
                            product += '            <div class="note-warning"></div>';
                            product += '            <div class="note-seller">Catatan Pelapak diperuntukan bagi pelapak yang ingin memberikan catatan tambahan yang tidak terkait dengan deskripsi barang kepada calon pembeli</div>';
                            product += '        </div>';
                            product += '    </div>';
                            product += '</div>';
                        
                        
                    	productData.id = data.result.product_id;
                    	productData.shop_id = data.result.shop_id;
                        document.title = (data.result.product_name).toUpperCase() + ' | Ngulikin';
                        $('.grid-product-container:first-child').html(product);
                        
                        $('#shop_id').val(productData.shop_id);
                        $('#product_id').val(productData.id);
                        
                        $('#product_brand').html(data.result.shop_total_brand);
                        $('#modified_date').html(data.result.product_modifydate);
                        $('#product_sold').html(data.result.product_sold);
                        $('#product_liked').html(data.result.product_count_favorite);
                        $('#product_viewed').html(data.result.product_seen);
                        
                        $('#product_total_discuss').html(data.result.product_total_discuss);
                        $('#product_total_review').html(data.result.product_total_review);
                        
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
                    	
                    	$(".rateyo").rateYo({rating: data.result.product_average_rate,readOnly: true,starWidth : "12px"});
                        
                        /*$(".rateyo").rateYo({fullStar: true}).on("rateyo.set", function (e, data) {
                            if($('.isSignin').val() === ''){
                    	        notif("error","Harap login terlebih dahulu","right","top");
                            }else if(israte == 1){
                    	        notif("error","Anda sudah memberikan penilaian produk ini","top");
                    	    }else{
                    	        rateData.value = data.rating;
                    	        rateProduct();
                    	    }
                        });*/
                        
                        $(".product_desc").html(data.result.product_description);
                        
                        $('#btnCart').on( 'click', function( e ){
                            addtocartSum.sumproduct = $('#sumProduct').val();
                            
                            addtocartProduct();
                    	});
                    	
                    	$('.productCalcMin').on('click', function (e) {
                            var stockNgulikin = parseInt($('#sumProduct').val()) - 1;
                            if(stockNgulikin <= 0){
                                stockNgulikin = 1
                            }
                            if(stockNgulikin === 1){
                                $(this).css('opacity','0.5');
                            }
                            $('#sumProduct').val(stockNgulikin);
                        });
                        
                        $('.productCalcPlus').on('click', function (e) {
                            var stockNgulikin = parseInt($('#sumProduct').val()) + 1;
                            if(stockNgulikin <= data.result.product_stock){
                                if(stockNgulikin !== 1){
                                    $('.productCalcMin').css('opacity','1');
                                }
                                $('#sumProduct').val(stockNgulikin);
                            }
                        });
                        
                        $('#sumProduct').on('change', function (e) {
                            var stockNgulikin = parseInt($('#sumProduct').val());
                            if(stockNgulikin <= data.result.product_stock){
                    	        if(stockNgulikin <= 0){
                                    stockNgulikin = 1
                                }
                    	    }else{
                    	        stockNgulikin = 1;
                    	    }
                    	    
                    	    if(stockNgulikin === 1){
                                $('.productCalcMin').css('opacity','0.5');
                            }
                    	    
                    	    $('#sumProduct').val(stockNgulikin);
                        });
                    	
                    	$('#sumProduct').keydown(function (e) {
                            // Allow: backspace, delete, tab, escape, enter and .
                            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                                 // Allow: Ctrl/cmd+A
                                (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                                 // Allow: Ctrl/cmd+C
                                (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
                                 // Allow: Ctrl/cmd+X
                                (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
                                 // Allow: home, end, left, right
                                (e.keyCode >= 35 && e.keyCode <= 39)) {
                                     // let it happen, don't do anything
                                     return;
                            }
                            // Ensure that it is a number and stop the keypress
                            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                                e.preventDefault();
                            }
                        });
                        
                        $('#sumProduct').on('change', function (e) {
                            if($(this).val() == ''){
                                $(this).val(1);
                            }
                            
                            if(parseInt($(this).val()) > 123){
                                $(this).val(123);
                            }
                        });
                    	
                    	$('#btnFavorite').on( 'click', function( e ){
                    	    if($('.isSignin').val() === ''){
                    	        notif("error","Harap login terlebih dahulu","right","top");
                    	    }else{
                    	        favoriteProduct();
                    	    }
                    	});
                    }
                    $('.loaderProgress').addClass('hidden');
                    $('body').removeClass('hiddenoverflow');
                }else{
                    generateToken("detail");
                }
            } 
        });
    }
}

function favoriteProduct(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("favoriteProduct");
    }else{
        $.ajax({
            type: 'POST',
            url: PRODUCT_FAVORITE_API,
            data:JSON.stringify({ 
                    product_id: productData.id
            }),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                    generateToken("favoriteProduct");
                }else{
                    $('.tabelList #like').html(data.result.product_count_favorite);
                    if(data.result.isfavorite){
                        notif("info","Product ditambah ke daftar favorit","right","top");   
                    }else{
                        notif("info","Product dihapus dari daftar favorit","right","top");
                    }
                }
            }
        });
    }
}

function addtocartProduct(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("addtocartProduct");
    }else{
        $.ajax({
            type: 'POST',
            url: PRODUCT_CART_ADD_API,
            data:JSON.stringify({ 
                    product_id: productData.id,
                    shop_id: productData.shop_id,
                    sum : addtocartSum.sumproduct
            }),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                    generateToken("addtocartProduct");
                }else{
                    $('#iconCartHeader').popover('hide');
                    bubbleCart();
                    notif("info","Product Ditambah ke keranjang","right","top");
                }
            }
        });
    }
}

function discussProduct(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("discussProduct");
    }else{
        var pathname = window.location.pathname,
            arraypathname = pathname.split("/"),
            shop_name = arraypathname[2],
            product_name = arraypathname[3];
            
        if(commentFlag.type == 1){
            $('.loaderProgress').removeClass('hidden');
        }
        
        $('#pagingProductMore').removeData("twbs-pagination");
        $('#pagingProductMore').unbind("page");
            
        if (typeof commentPage.page === 'undefined') {
            commentPage.page = 1;
        }
        $.ajax({
            type: 'GET',
            url: PRODUCT_DISCUSS_API+'/'+shop_name+'/'+product_name,
            data:{ 
                    page : commentPage.page-1,
                    pagesize : 8
            },
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.status == "OK"){
                    var response = data.response;
                    $('#loaderProductDiscuss').addClass('hidden');
                    var listDiscuss = '';
                    if(response.length > 0){
                        $.each( response, function( key, val ) {
                            listDiscuss += '<div class="grid-product-body-content-listComment-temp">';
                            listDiscuss += '     <div class="grid-product-body-content-listComment-content">';
                            listDiscuss += '        <img src="'+val.user_photo+'" class="discussProductPhoto"/>';
                            listDiscuss += '     </div>';
                            listDiscuss += '     <div class="grid-product-body-content-listComment-content">';
                            listDiscuss += '        <div class="head">';
                            listDiscuss += '             <span>'+val.fullname+'</span>';
                            listDiscuss += '             <span>'+val.product_discuss_comment+'</span>';
                            listDiscuss += '             <span class="discussProductCommentDate"><img src="/img/notif.png"/> '+val.comment_date+'</span>';
                            if($('.isSignin').val() !== ''){
                                listDiscuss += '             <span class="discussProductCommentReply" data-product_discuss_id="'+val.product_discuss_id+'"><i class="fa fa-reply"></i> Balas</span>';
                            }
                            listDiscuss += '         </div>';
                            listDiscuss += '     </div>';
                            listDiscuss += '</div>';
                            
                            if(val.reply_comments.length > 0){
                                $.each( val.reply_comments, function( reply_key, reply_val ) {
                                    var isseller = reply_val.isseller ? 'Penjual' : '';
                                    listDiscuss += '<div class="grid-product-body-content-listComment-temp reply">';
                                    listDiscuss += '     <div class="grid-product-body-content-listComment-content">';
                                    listDiscuss += '        <img src="'+reply_val.user_photo+'"  class="discussProductPhoto"/>';
                                    listDiscuss += '     </div>';
                                    listDiscuss += '     <div class="grid-product-body-content-listComment-content">';
                                    listDiscuss += '        <div class="head">';
                                    listDiscuss += '            <span>';
                                    listDiscuss += '                <span class="title" id="name">'+reply_val.fullname+'</span>';
                                    listDiscuss += '                <span class="title" id="replySellerProduct">'+isseller+'</span>';
                                    listDiscuss += '            </span>';
                                    listDiscuss += '            <span>'+reply_val.comment+'</span>';
                                    listDiscuss += '            <span class="discussProductCommentDate"><img src="/img/notif.png"/>'+reply_val.comment_date+'</span>';
                                    if($('.isSignin').val() !== ''){
                                        listDiscuss += '             <span class="discussProductCommentReply reply" data-product_discuss_id="'+val.product_discuss_id+'"><i class="fa fa-reply"></i> Balas</span>';
                                    }
                                    listDiscuss += '         </div>';
                                    listDiscuss += '     </div>';
                                    listDiscuss += '</div>';
                                });
                            }
                        });
                        
                        if(commentFlag.type == 0){
                            $("#discussProductSection .grid-product-body-content-listComment").html(listDiscuss);
                        }else{
                            $(".grid-product-listcomment-more .grid-product-body-content-listComment").html(listDiscuss);
                            
                            $('#pagingProductMore').twbsPagination({
                                totalPages: data.total,
                                visiblePages: 10,
                                startPage: commentPage.page
                            }).on('page', function (event, page) {
                                commentPage.page = page;
                                discussProduct();
                            });
                            
                            $('.loaderProgress').addClass('hidden');
                        }
                        
                        $('.discussProductCommentReply').on( 'click', function( e ){
                            $('.commentReplyDiscussProductTemp').remove();
                            var product_discuss_id = $(this).data("product_discuss_id");
                            $('#product_discuss_id').val(product_discuss_id);
                            
                            var replytemp = '';
                            if($(this).hasClass('reply')){
                                replytemp += '<div class="commentReplyDiscussProductTemp replyingCommentProduct">';
                                replytemp += '  <input type="text" class="commentReplyDiscussProduct" placeholder="..."/>';
                                replytemp += '</div>';
                            }else{
                                replytemp = '<div class="commentReplyDiscussProductTemp replyCommentProduct">';
                                replytemp += '  <input type="text" class="commentReplyDiscussProduct" placeholder="..."/>';
                                replytemp += '</div>';
                            }
                            $(replytemp).insertAfter($(this).closest('.grid-product-body-content-listComment-temp'));
                            
                            $('.commentReplyDiscussProduct').keypress(function(e) {
                        	    if(e.which == 13 && $('.commentReplyDiscussProduct').val() !== '') {
                        	        
                            	    replyCommentDiscussProduct();
                        	    }
                        	});
	                    });
                    }else{
                        listDiscuss += '<div class="product_discuss">Tidak ada data</div>';
                        
                        $("#discussProductSection .grid-product-body-content-listComment").html(listDiscuss);
                    }
                }else{
                    generateToken("discussProduct");
                }
            }
        });
    }
}

function commentDiscussProduct(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("commentDiscussProduct");
    }else{
        var product_id  = $('#product_id').val(),
            shop_id     = $('#shop_id').val(),
            comment     = $('#commentDiscussProduct').val();
            
        $.ajax({
            type: 'POST',
            url: PRODUCT_DISCUSS_COMMENT_API+'/'+product_id,
            data:JSON.stringify({
                    comment: comment,
                    shop_id: shop_id
            }),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                    generateToken("commentDiscussProduct");
                }else{
                    var elemDiscuss = '<div class="grid-product-body-content-listComment-temp">';
                        elemDiscuss += '     <div class="grid-product-body-content-listComment-content">';
                        elemDiscuss += '        <img src="'+data.result.user_photo+'" class="reviewProductPhoto"/>';
                        elemDiscuss += '     </div>';
                        elemDiscuss += '     <div class="grid-product-body-content-listComment-content">';
                        elemDiscuss += '        <div class="head">';
                        elemDiscuss += '            <span>'+data.result.username+'</span>';
                        elemDiscuss += '             <span>'+data.result.comment_date+'</span>';
                        elemDiscuss += '             <span>'+data.result.product_comment+'</span>';
                        elemDiscuss += '         </div>';
                        elemDiscuss += '     </div>';
                        elemDiscuss += '</div>';
                        
                    $("#discussProductSection .grid-product-body-content-listComment").append(elemDiscuss);
                    $(".product_discuss").remove();
                    
                    var product_total_discuss = parseInt($("#product_total_discuss").text())+1;
                    $("#product_total_discuss").html(product_total_discuss);
                }
            }
        });
    }
}

function replyCommentDiscussProduct(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("replyCommentDiscussProduct");
    }else{
        var product_discuss_id = $('#product_discuss_id').val(),
            comment = $('.commentReplyDiscussProduct').val();
            
        $.ajax({
            type: 'POST',
            url: PRODUCT_DISCUSS_REPLYCOMMENT_API+'/'+product_discuss_id,
            data:JSON.stringify({ 
                    comment: comment
            }),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                    generateToken("replyCommentDiscussProduct");
                }else{
                    discussProduct();
                }
            }
        });
    }
}

function reviewProduct(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("reviewProduct");
    }else{
        var pathname = window.location.pathname,
            arraypathname = pathname.split("/"),
            shop_name = arraypathname[2],
            product_name = arraypathname[3];
        
        if(commentFlag.type == 1){
            $('.loaderProgress').removeClass('hidden');
        }
        
        $('#pagingProductMore').removeData("twbs-pagination");
        $('#pagingProductMore').unbind("page");
        
        if (typeof commentPage.page === 'undefined') {
            commentPage.page = 1;
        }
        $.ajax({
            type: 'GET',
            url: PRODUCT_REVIEW_API+'/'+shop_name+'/'+product_name,
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
                    var response = data.response,
                        listReview = '';
                        
                        $('#loaderProductReview').addClass('hidden');
                    if(response.length > 0){
                        $.each( response, function( key, val ) {
                            listReview += '<div class="grid-product-body-content-listComment-temp">';
                            listReview += '     <div class="grid-product-body-content-listComment-content">';
                            listReview += '        <img src="'+val.user_photo+'" class="reviewShopProduct"/>';
                            listReview += '     </div>';
                            listReview += '     <div class="grid-product-body-content-listComment-content">';
                            listReview += '        <div class="head">';
                            listReview += '            <span>'+val.username+'</span>';
                            listReview += '             <span>'+val.product_review_comment+'</span>';
                            listReview += '             <span><img src="/img/notif.png"/> '+val.comment_date+'</span>';
                            listReview += '         </div>';
                            listReview += '     </div>';
                            listReview += '</div>';
                        });
                        
                        if(commentFlag.type == 0){
                            $('#loaderProductReview').addClass('hidden');
                            $("#reviewProductSection .grid-product-body-content-listComment").html(listReview);
                        }else{
                            $(".grid-product-listcomment-more .grid-product-body-content-listComment").html(listReview);
                            
                            $('#pagingProductMore').twbsPagination({
                                totalPages: data.total,
                                visiblePages: 10,
                                startPage: commentPage.page
                            }).on('page', function (event, page) {
                                commentPage.page = page;
                                reviewProduct();
                            });
                            
                            $('.loaderProgress').addClass('hidden');
                        }
                    }else{
                        listReview += '<div class="product_review">Tidak ada data</div>';
                        
                        $("#reviewProductSection .grid-product-body-content-listComment").html(listReview);
                    }
                }else{
                    generateToken("reviewProduct");
                }
            }
        });
    }
}

function commentReviewProduct(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("commentReviewProduct");
    }else{
        var product_id = $('#product_id').val(),
            shop_id     = $('#shop_id').val(),
            comment = $('#commentReviewProduct').val();
        
        $.ajax({
            type: 'POST',
            url: PRODUCT_REVIEW_COMMENT_API+'/'+product_id,
            data:JSON.stringify({ 
                    comment: comment,
                    shop_id: shop_id
            }),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                    generateToken("commentReviewProduct");
                }else{
                    var elemReview = '<div class="grid-product-body-content-listComment-temp">';
                        elemReview += '     <div class="grid-product-body-content-listComment-content">';
                        elemReview += '        <img src="'+data.result.user_photo+'" class="reviewProductPhoto"/>';
                        elemReview += '     </div>';
                        elemReview += '     <div class="grid-product-body-content-listComment-content">';
                        elemReview += '        <div class="head">';
                        elemReview += '            <span>'+data.result.username+'</span>';
                        elemReview += '            <span>'+data.result.product_comment+'</span>';
                        elemReview += '            <span><img src="/img/notif.png"/> '+data.result.comment_date+'</span>';
                        elemReview += '         </div>';
                        elemReview += '     </div>';
                        elemReview += '</div>';
                        
                    $("#reviewProductSection .grid-product-body-content-listComment").append(elemReview);
                    $(".product_review").remove();
                    
                    $('#buttonReviewProduct').prop( "disabled", false );
                    $('#commentReviewProduct').val('');
                    
                    var product_total_review = parseInt($("#product_total_review").text())+1;
                    $("#product_total_review").html(product_total_review);
                }
            }
        });
    }
}