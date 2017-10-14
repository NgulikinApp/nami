function initHome(){
    var url = 'http://init.ngulikin.com';
    
	$.tosrus.defaults.media.image = {
		filterAnchors: function( $anchor ) {
			return $anchor.attr( 'href' ).indexOf( 'www.zaskiasungkarhijab.com' ) > -1;
		}
	};
				
	$('#promo').tosrus({
		infinite	: true,
		slides		: {
			visible		: 3
		}
	});
				
	$('#best-selling').tosrus({
		infinite	: true,
		slides		: {
			visible		: 3
		}
	});
				
	$("#cslide-slides").cslide();
	
	$.getJSON("http://http-1761326392.ap-southeast-1.elb.amazonaws.com/category", function( data ) {
	    var listcategory = '';
        $.each( data, function( key, val ) {
            var nameCategory = (val.name).toLowerCase();
            listcategory += '<li class="grid-listmiddle-cont8" id="'+nameCategory+'" style="background-image:url('+val.thumbnail_url+')">';
            listcategory += '<span>';
            listcategory += '   <p>ngulikin</p>';
            listcategory += '   <p>'+nameCategory+'</p>';
            listcategory += '</span>';
            listcategory += '</li>';
        });
        $(".grid-list-cont8").html(listcategory)
    });
    
    $(".grid-sub-cont9-body-list .col-md-9").mouseover(function(){
        $(this).children('.grid-sub-cont9-body-list-hover').show();
    });
    
    $(".grid-sub-cont9-body-list .col-md-9").mouseout(function(){
        $(this).children('.grid-sub-cont9-body-list-hover').hide();
    });
    
    $('.grid-list-cont4 .grid-list-cont4-item').on('click', function (e) {
        var shopTitle = $(this).find('.shopTitle').val();
        location.href = url+"/shop/"+shopTitle;
    });
    
    $('.grid-listmiddle-cont8').on('click', function (e) {
        var productTitle = $(this).attr('id');
        location.href = url+"/search/"+productTitle;
    });
    
    $('.grid_chapter_subcon').on('click', function (e) {
        var productTitle = $(this).find('.productTitle').val();
        var productCategory = $(this).find('.productCategory').val();
        location.href = url+"/product/"+productCategory+'/'+productTitle;
    });
    
    $('.grid-sub-cont9-body-list-hover div').on('click', function (e) {
        var datainternal = $(this).attr('datainternal-id').split("~");
        location.href = url+"/product/"+datainternal[0]+'/'+datainternal[1];
    });
    
    $('.fa-shopping-cart').on('click', function (e) {
    });
}
