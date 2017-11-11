function initProduct(){
    var emailsession = localStorage.getItem('emailNgulikin');
     
    $('#btnCart').on( 'click', function( e ){
        var sumProduct = $('#sumProduct').val();
	    localStorage.setItem('cartNgulikin',sumProduct);
        
        notif("info","Product Ditambah ke keranjang","right","top");
	});
	
	$('#btnFavorite').on( 'click', function( e ){
	    if(emailsession === null){
	        notif("error","Harap login terlebih dahulu","right","top");
	    }else{
            notif("info","Product Ditambah ke daftar favorit","right","top");
	    }
	});
	
	$.tosrus.defaults.media.image = {
		filterAnchors: function( $anchor ) {
			return $anchor.attr( 'href' ).indexOf( 's2.bukalapak.com' ) > -1;
		}
	};
				
	$('.listimage a').tosrus({
		buttons: 'inline',
		pagination	: {
			add			: true,
			type		: 'thumbnails'
		}
	});
	
	$(".rateyo").rateYo({fullStar: true}).on("rateyo.change", function (e, data) {
         console.log(data.rating);
    });
}