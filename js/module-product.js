var rateData = new Object();

function initProduct(){
    var emailsession = localStorage.getItem('emailNgulikin');
	
	detail();
}

function detail(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(detail);
    }else{
        var url = window.location.href,
            product_id = url.substr(url.lastIndexOf('/') + 1),
            user_id = authData.data !== ''? JSON.parse(authData.data).user_id : '';
            
        $.ajax({
            type: 'GET',
            url: PRODUCT_API+'/'+product_id,
            data:{user_id:user_id},
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.status == "OK"){
                    if(data.result.product_id !== null){
                        var isfavorite = data.result.product_isfavorite;
                        
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
                            product += '        <span>'+data.result.product_name+'</span>';
                            product += '        <span>IDR '+data.result.product_price+'</span>';
                            product += '        <span>'+data.result.product_description+'</span>';
                            product += '    </div>';
                            product += '</div>';
                            product += '<div class="content" id="right">';
                            product += '    <div class="top">';
                            product += '        <span>Jumlah stok tersedia <font>'+data.result.product_stock+'</font> pcs</span>';
                            product += '        <span>';
                            product += '            Jumlah Barang';
                            product += '            <input type="number" id="sumProduct" value="1"/>';
                            product += '        </span>';
                            product += '        <span>';
                            product += '            <input type="button" id="btnCart" value="Tambah ke keranjang"/>';
                            product += '        </span>';
                            product += '        <span>';
                            product += '            <input type="button" id="btnFavorite" value="Tambah ke favorit"/>';
                            product += '        </span>';
                            product += '    </div>';
                            product += '    <div class="bottom">';
                            product += '        <div class="head">';
                            product += '            <div class="image">';
                            product += '                <img src="'+data.result.shop_icon+'" width="40" height="40"/>';
                            product += '            </div>';
                            product += '            <div class="content">';
                            product += '                <span>'+data.result.username+'</span>';
                            product += '                <span>'+data.result.shop_name+'</span>';
                            product += '            </div>';
                            product += '        </div>';
                            product += '        <hr/>';
                            product += '        <div class="body">';
                            product += '            <div class="tabel">';
                            product += '                <div class="tabelList">';
                            product += '                    <span>0</span>';
                            product += '                    <span>Terjual</span>';
                            product += '                </div>';
                            product += '                <div class="tabelList">';
                            product += '                    <span id="rate">'+data.result.product_average_rate+'</span>';
                            product += '                    <span>Penilaian</span>';
                            product += '                </div>';
                            product += '                <div class="tabelList">';
                            product += '                    <span id="like">'+data.result.product_count_favorite+'</span>';
                            product += '                    <span>Like</span>';
                            product += '                </div>';
                            product += '            </div>';
                            product += '            <div class="title">Rating</div>';
                            product += '            <div class="rateyo"></div>';
                            product += '        </div>';
                            product += '    </div>';
                            product += '</div>';
                            
                        document.title = (data.result.product_name).toUpperCase() + '| Ngulikin';
                        $('.grid-product-container:first-child').html(product);
                        
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
                    	
                    	if(data.result.product_rate_value != 0){
                    	    $(".rateyo").rateYo({rating: data.result.product_rate_value,readOnly: true});
                    	}
                        
                        $(".rateyo").rateYo({fullStar: true}).on("rateyo.set", function (e, data) {
                            if(user_id === ''){
                    	        notif("error","Harap login terlebih dahulu","right","top");
                            }else if(isfavorite == 1){
                    	        notif("error","Anda sudah memberikan penilaian produk ini","top");
                    	    }else{
                    	        rateData.value = data.rating;
                    	        rateProduct();
                    	    }
                        });
                        
                        $('#btnCart').on( 'click', function( e ){
                            var sumProduct = $('#sumProduct').val();
                    	    localStorage.setItem('cartNgulikin',sumProduct);
                            
                            notif("info","Product Ditambah ke keranjang","right","top");
                    	});
                    	
                    	$('#btnFavorite').on( 'click', function( e ){
                    	    if(user_id === ''){
                    	        notif("error","Harap login terlebih dahulu","right","top");
                    	    }else if(data.result.product_isfavorite == 1){
                    	        notif("error","Anda sudah menyimpan produk ini","top");
                    	    }else{
                    	        favoriteProduct();
                    	    }
                    	});
                    }else{
                        document.title = 'NOT FOUND | Ngulikin';
                        
                        var product = '<div id="cart-emptylist">';
                            product += '    <div class="grid-cart-header">';
                            product += '        Detail Produk ';
                            product += '    </div>';
                            product += '    <div class="grid-cart-body"></div>';
                            product += '    <div class="grid-cart-footer">';
                            product += '        <div>';
                            product += '            Produk tidak ditemukan';
                            product += '        </div>';
                            product += '    </div>';
                            product += '</div>';
                        
                        $('.grid-product-container:first-child').html(product);
                    }
                    $('.loaderProgress').addClass('hidden');
                }else{
                    generateToken(detail);
                }
            } 
        });
    }
}

function favoriteProduct(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(favoriteProduct);
    }else{
        var url = window.location.href,
            product_id = url.substr(url.lastIndexOf('/') + 1),
            user_id = authData.data !== ''? JSON.parse(authData.data).user_id : '',
            key = authData.data !== ''? JSON.parse(authData.data).key : '';
        $.ajax({
            type: 'POST',
            url: PRODUCT_FAVORITE_API,
            data:JSON.stringify({ 
                    product_id: product_id,
                    user_id: user_id,
                    key : key
            }),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                        generateToken(favoriteProduct);
                }else if(data.message == 'Invalid key'){
                    localStorage.removeItem('emailNgulikin');
                    sessionStorage.setItem("logoutNgulikin", 1);
                    sessionStorage.removeItem('authNgulikin');
                    location.href = url;
                }else if(data.message == 'You have saved this item'){
                    notif("error","Anda sudah menyimpan produk ini","top");
                }else{
                    $('.tabelList #like').html(data.result.product_count_favorite);
                    notif("info","Product ditambah ke daftar favorit","right","top");
                }
            }
        });
    }
}

function rateProduct(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(rateProduct);
    }else{
        var url = window.location.href,
            product_id = url.substr(url.lastIndexOf('/') + 1),
            user_id = authData.data !== ''? JSON.parse(authData.data).user_id : '',
            key = authData.data !== ''? JSON.parse(authData.data).key : '';
        $.ajax({
            type: 'POST',
            url: PRODUCT_RATE_API,
            data:JSON.stringify({ 
                    product_id: product_id,
                    user_id: user_id,
                    rate : rateData.value,
                    key : key
            }),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                        generateToken(rateProduct);
                }else if(data.message == 'Invalid key'){
                    localStorage.removeItem('emailNgulikin');
                    sessionStorage.setItem("logoutNgulikin", 1);
                    sessionStorage.removeItem('authNgulikin');
                    location.href = url;
                }else if(data.message == 'You have rated this item'){
                    notif("error","Anda sudah memberikan penilaian produk ini","top");
                }else{
                    $('.tabelList #rate').html(data.result.product_avg_rate);
                    notif("info","Terima kasih sudah memberikan penilaian","right","top");
                }
            }
        });
    }
}