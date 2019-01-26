$( document ).ready(function() {
    initGeneral();
    initShopMysales();
});

function initShopMysales(){
    //mysales shop
    $('#order-shop-seller').on( 'click', function( e ){
	   $('.grid-shop-seller-menu nav div').removeClass("bluesky").removeClass('border-yellow');
	   $(this).addClass("bluesky").addClass('border-yellow');
	   $(this).parent('a').css('margin-left','-5px');
	   $('.grid-shop-seller-content').addClass("hidden");
	   $('#order-shop-seller-content').removeClass("hidden");
	});
	$('#confirm-shop-seller').on( 'click', function( e ){
	   $('.grid-shop-seller-menu nav div').removeClass("bluesky").removeClass('border-yellow');
	   $(this).addClass("bluesky").addClass('border-yellow');
	   $(this).parent('a').css('margin-left','-5px');
	   $('.grid-shop-seller-content').addClass("hidden");
	   $('#confirm-shop-seller-content').removeClass("hidden");
	});
	$('#status-shop-seller').on( 'click', function( e ){
	   $('.grid-shop-seller-menu nav div').removeClass("bluesky").removeClass('border-yellow');
	   $(this).addClass("bluesky").addClass('border-yellow');
	   $(this).parent('a').css('margin-left','-5px');
	   $('.grid-shop-seller-content').addClass("hidden");
	   $('#status-shop-seller-content').removeClass("hidden");
	});
	$('#transaction-shop-seller').on( 'click', function( e ){
	   $('.grid-shop-seller-menu nav div').removeClass("bluesky").removeClass('border-yellow');
	   $(this).addClass("bluesky").addClass('border-yellow');
	   $(this).parent('a').css('margin-left','-5px');
	   $('.grid-shop-seller-content').addClass("hidden");
	   $('#transaction-shop-seller-content').removeClass("hidden");
	});
	
	$('#status-line').milestones({
		stage: 5,
		checks: 1,
		checkclass: 'checks',
		labels: ["Pembayaran","Proses","Pengiriman","Sampai","Diterima"]
	});
	
	$('.order-container.right .grid:first-child .detail:last-child .head').on('click', function (e) {
        var shopname = ($(this).data("shopname")).split(' ').join('-'),
            productname = ($(this).data("productname")).split(' ').join('-');
                            
            location.href = url+"/product/"+shopname+"/"+productname;
    });
    
    listdelivery();
    liststatus();
    
    $('.ui-loader,#filterStatusOrder-button span,#filterStatusSender-button span,#filterDeliverySender-button span,#filterConfirmSender-button span,#filterStatusSender-button span,#filterTransactionSender-button span,#filterMysalesStatus-button span,#filterStatusSender-button span').remove();
	$('.button-container .ui-btn').text('');
	
	$('#filterStatusOrder').on( 'change', function( e ){
	    $('#filterStatusOrder-button span').remove();
	});
	
	$('#filterDeliverySender').on( 'change', function( e ){
	    $('#filterDeliverySender-button span').remove();
	});
	
	$('#filterConfirmSender').on( 'change', function( e ){
	    $('#filterConfirmSender-button span').remove();
	});
	
	$('#filterStatusSender').on( 'change', function( e ){
	    $('#filterStatusSender-button span').remove();
	});
	
	$('#filterTransactionSender').on( 'change', function( e ){
	    $('#filterTransactionSender-button span').remove();
	});
	
	$('#filterMysalesStatus').on( 'change', function( e ){
	    $('#filterMysalesStatus-button span').remove();
	});
	
	$('#print_neworder,#print_confirm').on( 'click', function( e ){
	    var id = (SHA256('1')).toUpperCase();
        window.open(url+'/shop/pdf/'+id, '_blank');
	});
}

function listdelivery(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(listdelivery);
    }else{
        $.ajax({
            type: 'GET',
            url: SHOP_DELIVERY_API,
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.status == "OK"){
                    var listdelivery = '<option value="0">Pilih Kurir</option>';
                    $.each( data.result.list, function( key, val ) {
                        if(val.is_choose)listdelivery += '<option value="'+val.delivery_id+'">'+val.delivery_name+'</option>';
                    });
                    $('#filterDeliverySender').html(listdelivery);
                    $('#filterConfirmSender').html(listdelivery);
                    $('#filterStatusSender').html(listdelivery);
                    $('#filterTransactionSender').html(listdelivery);
                }else{
                    generateToken(listdelivery);
                }
            }
        });    
    }
}

function liststatus(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(liststatus);
    }else{
        $.ajax({
            type: 'GET',
            url: PRODUCT_STATUS_API,
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.status == "OK"){
                    var liststatus = '<option value="0">Pilih Status</option>';
                    $.each( data.result, function( key, val ) {
                        liststatus += '<option value="'+val.status_id+'">'+val.status_name+'</option>';
                    });
                    $('.statusproduct').html(liststatus);
                }else{
                    generateToken(liststatus);
                }
            }
        });    
    }
}