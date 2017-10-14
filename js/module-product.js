function initProduct(){
    $('#btnCart').on( 'click', function( e ){
        var sumProduct = $('#sumProduct').val();
	    localStorage.setItem('cartNgulikin',sumProduct);
        notify({
            type: "success", //alert | success | error | warning | info
            title: "Ngulikin",
            message: "Product Ditambah ke keranjang",
            position: {
                        x: "right", //right | left | center
                        y: "top" //top | bottom | center
            },
            icon: '<img src="../../img/paper_plane.png" />', //<i>
            size: "normal", //normal | full | small
            overlay: false, //true | false
            closeBtn: true, //true | false
            overflowHide: false, //true | false
            spacing: 20, //number px
            theme: "default", //default | dark-theme
            autoHide: true, //true | false
            delay: 2500, //number ms
            onShow: null, //function
            onClick: null, //function
            onHide: null, //function
            template: '<div class="notify"><div class="notify-text"></div></div>'
        });
	});
	
	$('#btnFavorite').on( 'click', function( e ){
	    notify({
            type: "success", //alert | success | error | warning | info
            title: "Ngulikin",
            message: "Product Ditambah ke daftar favorit",
            position: {
                        x: "right", //right | left | center
                        y: "top" //top | bottom | center
            },
            icon: '<img src="../../img/paper_plane.png" />', //<i>
            size: "normal", //normal | full | small
            overlay: false, //true | false
            closeBtn: true, //true | false
            overflowHide: false, //true | false
            spacing: 20, //number px
            theme: "default", //default | dark-theme
            autoHide: true, //true | false
            delay: 2500, //number ms
            onShow: null, //function
            onClick: null, //function
            onHide: null, //function
            template: '<div class="notify"><div class="notify-text"></div></div>'
        });
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
}