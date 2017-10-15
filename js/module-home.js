function initHome(){
    var url = 'http://init.ngulikin.com';
    
	$.tosrus.defaults.media.image = {
		filterAnchors: function( $anchor ) {
			return $anchor.attr( 'href' ).indexOf( 'www.zaskiasungkarhijab.com' ) > -1;
		}
	};
    
    $('.grid-list-cont4 .grid-list-cont4-item').on('click', function (e) {
        var shopTitle = $(this).find('.shopTitle').val();
        location.href = url+"/shop/"+shopTitle;
    });
    
    $('.grid-listmiddle-cont8').on('click', function (e) {
        var productTitle = $(this).attr('id');
        location.href = url+"/search/"+productTitle;
    });
    
    $('.fa-shopping-cart').on('click', function (e) {
    });
    
    $.getJSON("http://http-1761326392.ap-southeast-1.elb.amazonaws.com/product?tag=uptodate", function( data ) {
	    var listproduct = '';
        $.each( data, function( key, val ) {
            if(key < 4){
                listproduct += '<div class="grid_chapter_subcon">';
                listproduct += '    <div class="grid_chapter_subcon_detail">';
                listproduct += '        <div class="grid_chapter_subcon_head_detail">';
                listproduct += '            <img src="https://id-live-01.slatic.net/p/7/duomo-sepatu-kets-slip-on-tasel-putih-1490053380-70857351-7a94cd5f4c75e60b4a8662dfd7f9d890-catalog_233.jpg">';
                listproduct += '        </div>';
                listproduct += '        <div class="grid_chapter_subcon_body_detail">';
                listproduct += '            <p>'+val.name+'</p>';
                listproduct += '            <p>IDR '+val.price+'</p>';
                listproduct += '        </div>';
                listproduct += '    </div>';
                listproduct += '        <input type="hidden" class="productCategory" value="furniture"/>';
                listproduct += '        <input type="hidden" class="productTitle" value="'+val.id+'"/>';
                listproduct += '</div>';
            }
        });
        $(".grid_chapter .grid_chapter_con:last-child").html(listproduct);
        
        $('.grid_chapter_subcon').on('click', function (e) {
            var productTitle = $(this).find('.productTitle').val();
            var productCategory = $(this).find('.productCategory').val();
            location.href = url+"/product/"+productCategory+'/'+productTitle;
        });
    });
    
    $.getJSON("http://http-1761326392.ap-southeast-1.elb.amazonaws.com/product?tag=promo", function( data ) {
	    var listproduct = '';
        $.each( data, function( key, val ) {
            listproduct += '<div class="col-md-9">';
            listproduct += '   <img src="http://www.zaskiasungkarhijab.com/img/product_thumb/669_2.jpg">';
            listproduct += '   <div class="grid-sub-cont9-body-list-hover">';
            listproduct += '       <i class="fa fa-shopping-cart"></i>';
            listproduct += '       <i class="fa fa-thumbs-o-up"></i>';
            listproduct += '       <div datainternal-id="'+val.id+'~'+val.id+'">Lihat</div>';
            listproduct += '   </div>';
            listproduct += '</div>';
            
        });
        $("#promo").html(listproduct);
        
         $('#promo').tosrus({
    		infinite	: true,
    		slides		: {
    			visible		: 3
    		}
    	});
    	
    	mousetosrushome(url);
    });
    
    $.getJSON("http://http-1761326392.ap-southeast-1.elb.amazonaws.com/product?tag=bestseller", function( data ) {
	    var listproduct = '';
        $.each( data, function( key, val ) {
            listproduct += '<div class="col-md-9">';
            listproduct += '   <img src="http://www.zaskiasungkarhijab.com/img/product_thumb/669_2.jpg">';
            listproduct += '   <div class="grid-sub-cont9-body-list-hover">';
            listproduct += '       <i class="fa fa-shopping-cart"></i>';
            listproduct += '       <i class="fa fa-thumbs-o-up"></i>';
            listproduct += '       <div datainternal-id="'+val.id+'"~"'+val.id+'">Lihat</div>';
            listproduct += '   </div>';
            listproduct += '</div>';
            
        });
        $("#best-selling").html(listproduct);
        
        $('#best-selling').tosrus({
    		infinite	: true,
    		slides		: {
    			visible		: 3
    		}
    	});
    	
    	$(".tos-next").css('right','5px');
    	
    	mousetosrushome(url);
    });
	
	$("#cslide-slides").cslide();
}

/* Funtion for showing background promo and best-seller product in home */
function mousetosrushome(url){
    $(".tos-slide .col-md-9").mouseover(function(){
        $(this).children('.grid-sub-cont9-body-list-hover').show();
    });
    $(".tos-slide .col-md-9").mouseout(function(){
        $(this).children('.grid-sub-cont9-body-list-hover').hide();
    });
    $('.grid-sub-cont9-body-list-hover div').on('click', function (e) {
        var datainternal = $(this).attr('datainternal-id').split("~");
        location.href = url+"/product/"+datainternal[0]+'/'+datainternal[1];
    });
}
