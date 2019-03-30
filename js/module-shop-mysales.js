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
	   
	   confirmorder();
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
    neworder();
    
    $('.ui-loader,#filterStatusOrder-button span,#filterStatusSender-button span,#filterDeliverySender-button span,#filterConfirmSender-button span,#filterStatusSender-button span,#filterTransactionSender-button span,#filterMysalesStatus-button span,#filterStatusSender-button span').remove();
	$('.button-container .ui-btn').text('');
	
	$('#filterStatusOrder').on( 'change', function( e ){
	    $('#filterStatusOrder-button span').remove();
	});
	
	$('#filterNewOrderDate').on( 'change', function( e ){
	    neworder();
	});
	
	$('#filterDeliverySender').on( 'change', function( e ){
	    $('#filterDeliverySender-button span').remove();
	    neworder();
	});
	
	$('#filterNewOrderInvoice').on( 'change', function( e ){
	    neworder();
	});
	
	$('#search-mysalesorder').on( 'click', function( e ){
	    neworder();
	});
	
	$('#filterConfirmOrderDate').on( 'change', function( e ){
	    confirmorder();
	});
	
	$('#filterConfirmSender').on( 'change', function( e ){
	    $('#filterConfirmSender-button span').remove();
	    confirmorder();
	});
	
	$('#filterConfirmOrderInvoice').on( 'change', function( e ){
	    confirmorder();
	});
	
	$('#search-mysalesconfirm').on( 'click', function( e ){
	    confirmorder();
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
        generateToken("listdelivery");
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
                    generateToken("listdelivery");
                }
            }
        });    
    }
}

function liststatus(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("liststatus");
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
                    generateToken("liststatus");
                }
            }
        });    
    }
}

function neworder(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("neworder");
    }else{
        $.ajax({
            type: 'GET',
            url: LIST_MYSALES_API,
            data: { 
                delivery: $('#filterDeliverySender').val(),
                date: $('#filterNewOrderDate').val(),
                search: $('#filterNewOrderInvoice').val()
            },
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.status == "OK"){
                    var neworder = '';
                    if(data.result.length){
                        $.each( data.result, function( key, val ) {
                            neworder += '<div class="grid">';
                            neworder += '   <div class="detail">';
                            neworder += '       <div class="left">';
                            neworder += '           <img src="'+val.user_photo+'"/>';
                            neworder += '       </div>';
                            neworder += '       <div class="right">';
                            neworder += '           <div class="head">PEMBELI</div>';
                            neworder += '           <div class="body">'+val.fullname+'</div>';
                            neworder += '       </div>';
                            neworder += '   </div>';
                            neworder += '   <div class="detail">';
                            neworder += '       <div class="head">PEMBAYARAN</div>';
                            neworder += '       <div class="body">'+val.payment_name+'</div>';
                            neworder += '   </div>';
                            neworder += '   <div class="detail">';
                            neworder += '       <div class="head">TANGGAL TRANSAKSI</div>';
                            neworder += '       <div class="body">'+val.invoice_createdate+'</div>';
                            neworder += '   </div>';
                            neworder += '   <div class="detail bluesky">';
                            neworder += '       <strong>Tampilkan detail</strong> <i class="fa fa-chevron-down"></i>';
                            neworder += '   </div>';
                            neworder += '</div>';
                        });
                    }else{
                        neworder += '<div id="cart-emptylist">';
                        neworder += '    <div class="grid-cart-header">Detail Invoice</div>';
                        neworder += '    <div class="grid-cart-body"></div>';
                        neworder += '    <div class="grid-cart-footer">';
                        neworder += '        <div>Invoice kosong</div>';
                        neworder += '    </div>';
                        neworder += '</div>';
                    }
                    
                    $('.order-container').html(neworder);
                }else{
                    generateToken("neworder");
                }
            }
        });    
    }
}

function confirmorder(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("confirmorder");
    }else{
        $.ajax({
            type: 'GET',
            url: LISTCONFIRM_MYSALES_API,
            data: { 
                delivery: $('#filterConfirmSender').val(),
                date: $('#filterConfirmOrderDate').val(),
                search: $('#filterConfirmOrderInvoice').val()
            },
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.status == "OK"){
                    var confirmorder = '';
                    if(data.result.length){
                        $.each( data.result, function( key, val ) {
                            confirmorder += '<div class="grid">';
                            confirmorder += '   <div class="detail">';
                            confirmorder += '       <div class="left">';
                            confirmorder += '           <img src="'+val.user_photo+'"/>';
                            confirmorder += '       </div>';
                            confirmorder += '       <div class="right">';
                            confirmorder += '           <div class="head">PEMBELI</div>';
                            confirmorder += '           <div class="body">'+val.fullname+'</div>';
                            confirmorder += '       </div>';
                            confirmorder += '   </div>';
                            confirmorder += '   <div class="detail">';
                            confirmorder += '       <div class="head">NOMOR TAGIHAN</div>';
                            confirmorder += '       <div class="body">'+val.invoice_no+'</div>';
                            confirmorder += '   </div>';
                            confirmorder += '   <div class="detail">';
                            confirmorder += '       <div class="head">TANGGAL TRANSAKSI</div>';
                            confirmorder += '       <div class="body">'+val.invoice_createdate+'</div>';
                            confirmorder += '   </div>';
                            confirmorder += '   <div class="detail bluesky">';
                            confirmorder += '       <strong>Tampilkan detail</strong> <i class="fa fa-chevron-down"></i>';
                            confirmorder += '   </div>';
                            confirmorder += '</div>';
                        });
                    }else{
                        confirmorder += '<div id="cart-emptylist">';
                        confirmorder += '    <div class="grid-cart-header">Detail Invoice</div>';
                        confirmorder += '    <div class="grid-cart-body"></div>';
                        confirmorder += '    <div class="grid-cart-footer">';
                        confirmorder += '        <div>Invoice kosong</div>';
                        confirmorder += '    </div>';
                        confirmorder += '</div>';
                    }
                    
                    $('.confirm-container').html(confirmorder);
                }else{
                    generateToken("confirmorder");
                }
            }
        });    
    }
}