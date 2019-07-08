var neworderData = {},
    confirmorderData = {},
    invoiceid_order = {},
    invoiceid_confirm = {},
    notrans_status = {},
    invoiceid_transaction = {},
    curr_order = "",
    curr_confirm = "",
    curr_status = "",
    curr_transaction = "";

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
	   
	   statussending();
	});
	$('#transaction-shop-seller').on( 'click', function( e ){
	   $('.grid-shop-seller-menu nav div').removeClass("bluesky").removeClass('border-yellow');
	   $(this).addClass("bluesky").addClass('border-yellow');
	   $(this).parent('a').css('margin-left','-5px');
	   $('.grid-shop-seller-content').addClass("hidden");
	   $('#transaction-shop-seller-content').removeClass("hidden");
	   
	   transaction();
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
	    statussending();
	});
	
	$('#filterStatusInvoice').on( 'change', function( e ){
	    statussending();
	});
	
	$('#search-mysalesstatus').on( 'click', function( e ){
	    statussending();
	});
	
	$('#filterTransactionSender').on( 'change', function( e ){
	    $('#filterTransactionSender-button span').remove();
	    transaction();
	});
	
	$('#filterTransactionDate').on( 'change', function( e ){
	    transaction();
	});
	
	$('#filterTransactionInvoice').on( 'change', function( e ){
	    transaction();
	});
	
	$('#search-mysalestransaction').on( 'click', function( e ){
	    transaction();
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
                        $('.newordersum').html(data.result.length).removeClass('hidden');
                        $.each( data.result, function( key, val ) {
                            neworder += '<div>';
                            neworder += '   <div class="grid">';
                            neworder += '       <div class="detail">';
                            neworder += '           <div class="left">';
                            neworder += '               <img src="'+val.user_photo+'"/>';
                            neworder += '           </div>';
                            neworder += '           <div class="right">';
                            neworder += '               <div class="head">PEMBELI</div>';
                            neworder += '               <div class="body mysales-name">'+val.fullname+'</div>';
                            neworder += '           </div>';
                            neworder += '       </div>';
                            neworder += '       <div class="detail">';
                            neworder += '           <div class="head">PEMBAYARAN</div>';
                            neworder += '           <div class="body bluesky">'+val.payment_name+'</div>';
                            neworder += '       </div>';
                            neworder += '       <div class="detail">';
                            neworder += '           <div class="head">TANGGAL TRANSAKSI</div>';
                            neworder += '           <div class="body mysales-date">'+val.invoice_createdate+'</div>';
                            neworder += '       </div>';
                            neworder += '       <div class="detail detail-neworder bluesky" data-invoiceid="'+val.invoice_id+'">';
                            neworder += '           Tampilkan detail <img src="/img/down.png" style="float: right;margin: -6px;"/>';
                            neworder += '       </div>';
                            neworder += '   </div>';
                            neworder += '</div>';
                            neworder += '<div class="footer">';
                            neworder += '   <div class="grid" data-invoiceid="'+val.invoice_id+'">';
                            neworder += '       <button class="newordercancel grey" >Batalkan pesanan</button>';
                            neworder += '       <button class="newordersave blueskyback">Proses pesanan</button>';
                            neworder += '   </div>';
                            neworder += '</div>';
                        });
                    }else{
                        $('.newordersum').addClass('hidden');
                        neworder += '<div id="cart-emptylist">';
                        neworder += '    <div class="grid-cart-header">Detail Invoice</div>';
                        neworder += '    <div class="grid-cart-body"></div>';
                        neworder += '    <div class="grid-cart-footer">';
                        neworder += '        <div>Invoice kosong</div>';
                        neworder += '    </div>';
                        neworder += '</div>';
                    }
                    
                    $('.order-container').html(neworder);
                    
                    var invoiceid_ordertemp = 0;
                    $('.detail-neworder').on( 'click', function( e ){
                        var invoiceidcur = $( this ).data( "invoiceid" );
                        
                        if(invoiceid_ordertemp !== invoiceidcur){
                            invoiceid_ordertemp = invoiceidcur;
                            invoiceid_order.invoiceid = invoiceid_ordertemp;
                            curr_order = $( this );
                            
                        	detailneworder();
                        }else{
                            invoiceid_ordertemp = 0;
                            $( this ).find( 'img' ).attr('src','/img/down.png');
                            $( this ).parent().next().remove();
                            $( this ).parent().parent().find('.list-order').remove();
                            $( this ).parent().parent().find('.list-totalorder').remove();
                        }
                    });
                    
                    $('.newordersave').on( 'click', function( e ){
                        $.confirm({
                            title: 'Konfirmasi',
                            icon: 'fa fa-warning',
                            animation: 'top',
                            animateFromElement: false,
                            type: 'dark',
                            content: 'Yakin ingin diproses?',
                            buttons: {
                                ya: function () {
                                    neworderData.action = "confirm";
                                    neworderData.invoiceid = $( this ).parent().data( "invoiceid" );
                                    actionneworder();
                                },
                                    tidak: function () {
                                }
                            }
                        });
                    });
                    
                    $('.newordercancel').on( 'click', function( e ){
                        $.confirm({
                            title: 'Konfirmasi',
                            icon: 'fa fa-warning',
                            animation: 'top',
                            animateFromElement: false,
                            type: 'dark',
                            content: 'Yakin ingin dibatalkan?',
                            buttons: {
                                ya: function () {
                                    neworderData.action = "cancel";
                                    neworderData.invoiceid = $( this ).parent().data( "invoiceid" );
                                    actionneworder();
                                },
                                    tidak: function () {
                                }
                            }
                        });
                    });
                }else{
                    generateToken("neworder");
                }
            }
        });    
    }
}

function detailneworder(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("detailneworder");
    }else{
        $('body').append('<div class="loaderProgress"><img src="../img/loader.gif" /></div>');
        $.ajax({
            type: 'GET',
            url: MYSALES_NEWORDER_API,
            data: { 
                invoiceid: invoiceid_order.invoiceid
            },
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.status == "OK"){
                    var element = '';
                    $.each( data.result, function( key, val ) {
                        element += '<div class="grid">';
                        element += '     <div class="detail" style="width: 37.5%;height: 215.267px;">';
                        element += '          <div class="head">ALAMAT TUJUAN</div>';
                        element += '          <div class="body">';
                        element += '                <div class="grid content mysales-name">';
                        element += '                    <img src="/img/people.png" style="vertical-align: baseline;margin-right: 10px;border-radius: 0;width: 15px;"/>';
                        element +=                      val.recipientname;
                        element += '                </div>';
                        element += '                <div class="grid content" style="padding-left: 25px;position: relative;max-height: 84.2667px;overflow: hidden;text-overflow: ellipsis;">';
                        element += '                    <img src="/img/marker.png" style="vertical-align: baseline;position: absolute;left: 3px;width: unset;"/>';
                        element +=                      val.address;
                        element += '                </div>';
                        element += '                <div class="grid content">';
                        element += '                    <img src="/img/hp.png" style="margin-right: 14px;margin-left: 5px;width: unset;"/>';
                        element +=                      val.phone;
                        element += '                </div>';
                        element += '                <div class="grid content">';
                        element += '                    <img src="/img/envelope.png" style="margin-right: 14px;margin-left: 5px;width: unset;"/>';
                        element +=                      val.email;
                        element += '                </div>';
                        element += '          </div>';
                        element += '    </div>';
                        element += '    <div class="detail" style="padding: 0px;">';
                        element += '        <div class="grid" style="padding: 35px;">';
                        element += '            <div class="head">KURIR</div>';
                        element += '            <div class="body bluesky">'+val.delivery_name+'</div>';
                        element += '        </div>';
                        element += '        <div class="grid content" style="padding: 35px;">';
                        element += '            <div class="head">NO. TRANSAKSI</div>';
                        element += '            <div class="body bluesky">'+val.notran+'</div>';
                        element += '        </div>';
                        element += '    </div>';
                        element += '    <div class="detail" style="width: 37.5%;">';
                        element += '          <div class="head">CATATAN UNTUK PENJUAL</div>';
                        element += '          <div class="body">'+val.notes+'</div>';
                        element += '    </div>';
                        element += '</div>';
                        $.each( val.detail, function( detailkey, detailval ) {
                            element += '<div class="grid list-order">';
                            element += '    <div class="detail">';
                            element += '        <div class="left">';
                            element += '            <img src="'+detailval.product_image+'" />';
                            element += '        </div>';
                            element += '        <div class="right" style="margin-top: 13px;vertical-align: top;">';
                            element += '            <div class="head mysales-name">'+detailval.brand_name+'</div>';
                            element += '            <div class="body">'+detailval.product_name+'</div>';
                            element += '        </div>';
                            element += '    </div>';
                            element += '    <div class="detail" style="height: 79.7834px;padding-top: 21px;">';
                            element += '        <div class="left">';
                            element += '            <div class="head">Jumlah :</div>';
                            element += '            <div class="body">'+detailval.sumproduct+'</div>';
                            element += '        </div>';
                            element += '        <div class="right" style="margin-left: 110px;">';
                            element += '            <div class="head">Harga :</div>';
                            element += '            <div class="body">'+numberFormat(detailval.product_price)+'</div>';
                            element += '        </div>';
                            element += '    </div>';
                            element += '    <div class="detail" style="height: 79.7834px;padding-top: 21px;text-align: center;">';
                            element += '        <div class="head">Ongkos Kirim :</div>';
                            element += '        <div class="body">'+numberFormat(detailval.delivery_price)+'</div>';
                            element += '    </div>';
                            element += '    <div class="detail" style="height: 79.7834px;padding-top: 21px;text-align: center;">';
                            element += '        <div class="head">Jumlah Harga :</div>';
                            element += '        <div class="body">'+numberFormat(detailval.totaldetail_price)+'</div>';
                            element += '    </div>';
                            element += '</div>';
                        });
                        element += '<div class="grid list-totalorder">';
                        element += '    <div class="detail" style="height: 57.1333px;padding-top: 21px;">';
                        element += '        <div class="head">TOTAL PEMBELIAN</div>';
                        element += '    </div>';
                        element += '    <div class="detail">';
                        element += '        <div class="left">';
                        element += '            <div class="head">Jumlah :</div>';
                        element += '            <div class="body">'+val.totalproduct+'</div>';
                        element += '        </div>';
                        element += '        <div class="right" style="margin-left: 110px;">';
                        element += '            <div class="head">Harga :</div>';
                        element += '            <div class="body">'+numberFormat(val.totalproduct_price)+'</div>';
                        element += '        </div>';
                        element += '    </div>';
                        element += '    <div class="detail" style="text-align: center;">';
                        element += '        <div class="head">Ongkos Kirim :</div>';
                        element += '        <div class="body">'+numberFormat(val.totaldelivery_price)+'</div>';
                        element += '    </div>';
                        element += '    <div class="detail" style="text-align: center;">';
                        element += '        <div class="head">Total Harga :</div>';
                        element += '        <div class="body">'+numberFormat(val.total_price)+'</div>';
                        element += '    </div>';
                        element += '</div>';
                    });
                                
                    $( element ).insertAfter( curr_order.parent() );
                    
                    $('.loaderProgress').remove();
                            
                    $( '.detail detail-neworder' ).find( 'img' ).attr('src','/img/down.png');
                    curr_order.find( 'img' ).attr('src','/img/up.png');
                }else{
                    generateToken("detailneworder");
                }
            }
        });    
    }
}

function actionneworder(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("actionneworder");
    }else{
        $.ajax({
            type: 'POST',
            url: MYSALES_ACTIONNEWORDER_API,
            data:JSON.stringify({ 
                    invoice_id: neworderData.invoiceid,
                    action:neworderData.action
            }),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(result) {
                if(result.message == 'Invalid credential' || result.message == 'Token expired'){
                    generateToken("actionneworder");
                }else{
                    neworder();
                    if(neworderData.action === "confirm"){
                        notif("info","Produk diproses","center","top");
                    }else{
                        notif("info","Produk dibatalkan","center","top");
                    }
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
                            confirmorder += '           <div class="body mysales-name">'+val.fullname+'</div>';
                            confirmorder += '       </div>';
                            confirmorder += '   </div>';
                            confirmorder += '   <div class="detail">';
                            confirmorder += '       <div class="head">NOMOR TAGIHAN</div>';
                            confirmorder += '       <div class="body bluesky">'+val.invoice_no+'</div>';
                            confirmorder += '   </div>';
                            confirmorder += '   <div class="detail">';
                            confirmorder += '       <div class="head">TANGGAL TRANSAKSI</div>';
                            confirmorder += '       <div class="body mysales-date">'+val.invoice_createdate+'</div>';
                            confirmorder += '   </div>';
                            confirmorder += '   <div class="detail bluesky detail-confirmorder" data-invoiceid="'+val.invoice_id+'">';
                            confirmorder += '       Tampilkan detail <img src="/img/down.png" style="float: right;margin: -6px;"/>';
                            confirmorder += '   </div>';
                            confirmorder += '</div>';
                            confirmorder += '<div class="footer">';
                            confirmorder += '   <div class="grid confirm-btn" data-invoiceid="'+val.invoice_id+'">';
                            confirmorder += '       <button class="confirmordersave blueskyback" datainternal-id="">Konfirmasi pesanan</button>';
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
                    
                    var invoiceid_confirmtemp = 0;
                    $('.detail-confirmorder').on( 'click', function( e ){
                        var invoiceidcur = $( this ).data( "invoiceid" );
                        
                        if(invoiceid_confirmtemp !== invoiceidcur){
                            invoiceid_confirmtemp = invoiceidcur;
                            invoiceid_confirm.invoiceid = invoiceid_confirmtemp;
                            curr_confirm = $( this );
                            
                        	detailconfirmorder();
                        }else{
                            invoiceid_confirmtemp = 0;
                            $( this ).find( 'img' ).attr('src','/img/down.png');
                            $( this ).parent().next().remove();
                            $( this ).parent().parent().find('.list-confirm').remove();
                            $( this ).parent().parent().find('.list-totalconfirm').remove();
                        }
                    });
                    
                    $('.confirmordersave').on( 'click', function( e ){
                        var noresiconfirm = $( this ).attr( "datainternal-id" ),
                            invoiceidconfirm = $( this ).parent().data( "invoiceid" );;
                        if(noresiconfirm === ''){
                            notif("error","No. resi harus diinput","center","center");
                        }else{
                            confirmorderData.invoiceid = invoiceidconfirm;
                            confirmorderData.noresi = noresiconfirm;
                            actionconfirmorder();
                        }
                    });
                }else{
                    generateToken("confirmorder");
                }
            }
        });    
    }
}

function detailconfirmorder(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("detailconfirmorder");
    }else{
        $('body').append('<div class="loaderProgress"><img src="../img/loader.gif" /></div>');
        $.ajax({
            type: 'GET',
            url: MYSALES_CONFIRMORDER_API,
            data: { 
                invoiceid: invoiceid_confirm.invoiceid
            },
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.status == "OK"){
                    var element = '';
                    $.each( data.result, function( key, val ) {
                        element += '<div class="grid">';
                        element += '     <div class="detail" style="width: 37.5%;height: 215.267px;">';
                        element += '          <div class="head">ALAMAT TUJUAN</div>';
                        element += '          <div class="body">';
                        element += '                <div class="grid content mysales-name">';
                        element += '                    <img src="/img/people.png" style="vertical-align: baseline;margin-right: 10px;border-radius: 0;width: 15px;"/>';
                        element +=                      val.recipientname;
                        element += '                </div>';
                        element += '                <div class="grid content" style="padding-left: 25px;position: relative;max-height: 84.2667px;overflow: hidden;text-overflow: ellipsis;">';
                        element += '                    <img src="/img/marker.png" style="vertical-align: baseline;position: absolute;left: 3px;width: unset;"/>';
                        element +=                      val.address;
                        element += '                </div>';
                        element += '                <div class="grid content">';
                        element += '                    <img src="/img/hp.png" style="margin-right: 14px;margin-left: 5px;width: unset;"/>';
                        element +=                      val.phone;
                        element += '                </div>';
                        element += '                <div class="grid content">';
                        element += '                    <img src="/img/envelope.png" style="margin-right: 14px;margin-left: 5px;width: unset;"/>';
                        element +=                      val.email;
                        element += '                </div>';
                        element += '          </div>';
                        element += '    </div>';
                        element += '    <div class="detail" style="padding: 25px;height: 215.267px;">';
                        element += '          <div style="width: 100%;display: block;overflow: auto;text-align: center;height: 38px;"><button class="confirmorderresi blueskyback" style="float: unset;font-size:13px;font-family: proxima_nova_altbold;">Masukan No. Resi</button></div>';
                        element += '          <div style="width: 100%;display: block;overflow: auto;color:#F37C65;margin: 5px 0px;" class="fn-12"><span>*Klik tombol diatas untuk memasukan nomor resi agen kurir, pesanan tidak dapat diproses jika belum menginput no. resi</span></div>';
                        element += '          <div style="width: 100%;display: block;overflow: auto;color:#F37C65;margin: 5px 0px;" class="fn-12"><span>*No resi berhasil disimpan, pastikan kembali no. resi tidak salah input</span></div>';
                        element += '    </div>';
                        element += '    <div class="detail" style="width: 37.5%;">';
                        element += '          <div class="head">CATATAN UNTUK PENJUAL</div>';
                        element += '          <div class="body">'+val.notes+'</div>';
                        element += '    </div>';
                        element += '</div>';
                        $.each( val.detail, function( detailkey, detailval ) {
                            element += '<div class="grid list-confirm">';
                            element += '    <div class="detail">';
                            element += '        <div class="left">';
                            element += '            <img src="'+detailval.product_image+'" />';
                            element += '        </div>';
                            element += '        <div class="right" style="margin-top: 13px;vertical-align: top;">';
                            element += '            <div class="head mysales-name">'+detailval.brand_name+'</div>';
                            element += '            <div class="body">'+detailval.product_name+'</div>';
                            element += '        </div>';
                            element += '    </div>';
                            element += '    <div class="detail" style="height: 79.7834px;padding-top: 21px;">';
                            element += '        <div class="left">';
                            element += '            <div class="head">Jumlah :</div>';
                            element += '            <div class="body">'+detailval.sumproduct+'</div>';
                            element += '        </div>';
                            element += '        <div class="right" style="margin-left: 110px;">';
                            element += '            <div class="head">Harga :</div>';
                            element += '            <div class="body">'+numberFormat(detailval.product_price)+'</div>';
                            element += '        </div>';
                            element += '    </div>';
                            element += '    <div class="detail" style="height: 79.7834px;padding-top: 21px;text-align: center;">';
                            element += '        <div class="head">Ongkos Kirim :</div>';
                            element += '        <div class="body">'+numberFormat(detailval.delivery_price)+'</div>';
                            element += '    </div>';
                            element += '    <div class="detail" style="height: 79.7834px;padding-top: 21px;text-align: center;">';
                            element += '        <div class="head">Jumlah Harga :</div>';
                            element += '        <div class="body">'+numberFormat(detailval.totaldetail_price)+'</div>';
                            element += '    </div>';
                            element += '</div>';
                        });
                        element += '<div class="grid list-totalconfirm">';
                        element += '    <div class="detail" style="height: 57.1333px;padding-top: 21px;">';
                        element += '        <div class="head">TOTAL PEMBELIAN</div>';
                        element += '    </div>';
                        element += '    <div class="detail">';
                        element += '        <div class="left">';
                        element += '            <div class="head">Jumlah :</div>';
                        element += '            <div class="body">'+val.totalproduct+'</div>';
                        element += '        </div>';
                        element += '        <div class="right" style="margin-left: 110px;">';
                        element += '            <div class="head">Harga :</div>';
                        element += '            <div class="body">'+numberFormat(val.totalproduct_price)+'</div>';
                        element += '        </div>';
                        element += '    </div>';
                        element += '    <div class="detail" style="text-align: center;">';
                        element += '        <div class="head">Ongkos Kirim :</div>';
                        element += '        <div class="body">'+numberFormat(val.totaldelivery_price)+'</div>';
                        element += '    </div>';
                        element += '    <div class="detail" style="text-align: center;">';
                        element += '        <div class="head">Total Harga :</div>';
                        element += '        <div class="body">'+numberFormat(val.total_price)+'</div>';
                        element += '    </div>';
                        element += '</div>';
                    });
                                
                    $( element ).insertAfter( curr_confirm.parent() );
                    
                    $('.loaderProgress').remove();
                            
                    $( '.detail detail-confirmorder' ).find( 'img' ).attr('src','/img/down.png');
                    curr_confirm.find( 'img' ).attr('src','/img/up.png');
                    
                    confirmorderresi();
                }else{
                    generateToken("detailconfirmorder");
                }
            }
        });    
    }
}

function confirmorderresi(){
    $('.confirmorderresi').on( 'click', function( e ){
        var temphtml = $(this);
        $.confirm({
            title: 'Konfirmasi',
            content: '' +
            '<form action="" class="formName">' +
            '<div class="form-group">' +
            '<label>Masukan no. resi</label>' +
            '<input type="text" placeholder="Nomor resi" class="noresival form-control" required />' +
            '</div>' +
            '</form>',
            animation: 'top',
            animateFromElement: false,
            buttons: {
                simpan: {
                    text: 'simpan',
                    btnClass: 'btn-dark',
                    action: function(){
                        var noresival = this.$content.find('.noresival').val();
                        temphtml.parent().parent().parent().nextAll('.footer').find('.confirmordersave').attr('datainternal-id',noresival);
                        temphtml.parent().html(noresival+' <i class="confirmorderresi bluesky fa fa-pencil" title="ubah" style="cursor:pointer"></i>');
                        confirmorderresi();
                    }
                },
                tidak: function(){
                    // do nothing.
                }
            }
        });
    });
}

function actionconfirmorder(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("actionconfirmorder");
    }else{
        $.ajax({
            type: 'POST',
            url: MYSALES_ACTIONCONFIRMORDER_API,
            data:JSON.stringify({ 
                    invoice_id: confirmorderData.invoiceid,
                    noresi:confirmorderData.noresi
            }),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(result) {
                if(result.message == 'Invalid credential' || result.message == 'Token expired'){
                    generateToken("actionconfirmorder");
                }else{
                    confirmorder();
                    notif("info","Tagihan telah dikonfirmasi","center","center");
                }
            } 
        });
    }
}

function statussending(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("statussending");
    }else{
        $.ajax({
            type: 'GET',
            url: LISTSTATUS_MYSALES_API,
            data: { 
                delivery: $('#filterStatusSender').val(),
                search: $('#filterStatusInvoice').val()
            },
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.status == "OK"){
                    var statussending = '';
                    if(data.result.length){
                        $.each( data.result, function( key, val ) {
                            statussending += '<div class="grid">';
                            statussending += '  <div class="detail">';
                            statussending += '      <div class="left">';
                            statussending += '          <img src="'+val.user_photo+'"/>';
                            statussending += '      </div>';
                            statussending += '      <div class="right">';
                            statussending += '          <div class="head">PEMBELI</div>';
                            statussending += '          <div class="body mysales-name">'+val.fullname+'</div>';
                            statussending += '      </div>';
                            statussending += '  </div>';
                            statussending += '  <div class="detail">';
                            statussending += '          <div class="head">PEMBAYARAN</div>';
                            statussending += '          <div class="body bluesky">'+val.payment_name+'</div>';
                            statussending += '  </div>';
                            statussending += '  <div class="detail">';
                            statussending += '      <div class="head">NOMOR TRANSAKSI</div>';
                            statussending += '      <div class="body bluesky">'+val.notrans+'</div>';
                            statussending += '  </div>';
                            statussending += '  <div class="detail detail-statussending" data-notrans="'+val.notrans+'">';
                            statussending += '      <div class="left">';
                            statussending += '          <div class="head">TANGGAL TRANSAKSI</div>';
                            statussending += '          <div class="body mysales-date">'+val.invoice_createdate+'</div>';
                            statussending += '      </div>';
                            statussending += '      <div class="right bluesky">';
                            statussending += '           <img src="/img/down.png" style="margin-top: -5px;"/>';
                            statussending += '      </div>';
                            statussending += '  </div>';
                            statussending += '</div>';
                        });
                    }else{
                        statussending += '<div id="cart-emptylist">';
                        statussending += '    <div class="grid-cart-header">Detail Invoice</div>';
                        statussending += '    <div class="grid-cart-body"></div>';
                        statussending += '    <div class="grid-cart-footer">';
                        statussending += '        <div>Invoice kosong</div>';
                        statussending += '    </div>';
                        statussending += '</div>';
                    }
                    
                    $('.status-container').html(statussending);
                    
                    var notrans_statustemp = '';
                    $('.detail-statussending').on( 'click', function( e ){
                        var notranscur = $( this ).data( "notrans" );
                        
                        if(notrans_statustemp !== notranscur){
                            notrans_statustemp = notranscur;
                            notrans_status.notrans = notrans_statustemp;
                            curr_status = $( this );
                            
                        	detailstatussending();
                        }else{
                            notrans_statustemp = '';
                            $( this ).find( 'img' ).attr('src','/img/down.png');
                            $( this ).parent().next().remove();
                            $( this ).parent().parent().find('.list-status').remove();
                        }
                    });
                }else{
                    generateToken("statussending");
                }
            }
        });    
    }
}

function detailstatussending(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("detailstatussending");
    }else{
        $('body').append('<div class="loaderProgress"><img src="../img/loader.gif" /></div>');
        $.ajax({
            type: 'GET',
            url: MYSALES_STATUS_API,
            data: { 
                notrans: notrans_status.notrans
            },
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.status == "OK"){
                    var element = '<div class="grid">';
                        element += '     <div class="detail" style="padding: 11px 35px;">';
                        element += '          <div class="head">KURIR</div>';
                        element += '          <div class="body">'+data.result.delivery_name+'</div>';
                        element += '    </div>';
                        element += '     <div class="detail">';
                        element += '          <div class="milestones" id="status-line" style="width:700px;"></div>';
                        element += '    </div>';
                        element += '</div>';
                        $.each( data.result.status, function( key, val ) {
                            element += '<div class="grid fn-13 list-status">';
                            element += '    <div class="detail">';
                            element += '        <div class="left">';
                            element += '            <div class="head">TANGGAL</div>';
                            element += '            <div class="body">'+val.date+'</div>';
                            element += '        </div>';
                            element += '        <div class="right">';
                            element += '            <div class="time">Jam '+val.time+'</div>';
                            element += '        </div>';
                            element += '    </div>';
                            element += '    <div class="detail statusline" id="statusOrderMysales">';
                            element += '        <div class="body">'+val.desc+'</div>';
                            element += '    </div>';
                            element += '</div>';
                        });
                                
                    $( element ).insertAfter( curr_status.parent() );
                    
                    $('.loaderProgress').remove();
                            
                    $( '.detail detail-statussending' ).find( 'img' ).attr('src','/img/down.png');
                    curr_status.find( 'img' ).attr('src','/img/up.png');
                            
                    $('#status-line').milestones({
                        stage: 7,
                        checkclass: 'checks',
                        labels: ["Dikirim","Process","Sampai","Diterima"],
                        monday:1,
                        tuesday:1,
                        wednesday:0,
                        thursday:0
                    });
                }else{
                    generateToken("detailstatussending");
                }
            }
        });    
    }
}

function transaction(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("transaction");
    }else{
        $.ajax({
            type: 'GET',
            url: LISTTRANSACTION_MYSALES_API,
            data: { 
                delivery: $('#filterTransactionSender').val(),
                date: $('#filterTransactionDate').val(),
                search: $('#filterTransactionInput').val()
            },
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.status == "OK"){
                    var transaction = '';
                    if(data.result.length){
                        $.each( data.result, function( key, val ) {
                            transaction += '<div class="grid">';
                            transaction += '   <div class="detail">';
                            transaction += '       <div class="left">';
                            transaction += '           <img src="'+val.user_photo+'"/>';
                            transaction += '       </div>';
                            transaction += '       <div class="right">';
                            transaction += '           <div class="head">PEMBELI</div>';
                            transaction += '           <div class="body">'+val.fullname+'</div>';
                            transaction += '       </div>';
                            transaction += '   </div>';
                            transaction += '   <div class="detail">';
                            transaction += '       <div class="head">TANGGAL TRANSAKSI</div>';
                            transaction += '       <div class="body">'+val.invoice_createdate+'</div>';
                            transaction += '   </div>';
                            transaction += '   <div class="detail">';
                            transaction += '       <div class="head">AGEN KURIR</div>';
                            transaction += '       <div class="body">'+val.delivery_name+'</div>';
                            transaction += '   </div>';
                            transaction += '   <div class="detail detail-transaction bluesky" data-invoiceid="'+val.invoice_id+'">';
                            transaction += '       Tampilkan detail <img src="/img/down.png" style="float: right;margin: -6px;"/>';
                            transaction += '   </div>';
                            transaction += '</div>';
                            if(val.status === 7){
                                transaction += '<div class="footer canceledtrans">';
                                transaction += '   <div class="grid" data-invoiceid="'+val.invoice_id+'">';
                                transaction += '       <img src="/img/warningred.png"/>';
                                transaction += '       <span>TRANSAKSI DIBATALKAN</span>';
                                transaction += '       <button class="printTrans redyoung">Cetak Invoice</button>';
                                transaction += '   </div>';
                                transaction += '</div>';
                            }else{
                                transaction += '<div class="footer">';
                                transaction += '   <div class="grid" data-invoiceid="'+val.invoice_id+'">';
                                transaction += '       <button class="printTrans blueskyback">Cetak Invoice</button>';
                                transaction += '   </div>';
                                transaction += '</div>';
                            }
                        });
                    }else{
                        transaction += '<div id="cart-emptylist">';
                        transaction += '    <div class="grid-cart-header">Detail Invoice</div>';
                        transaction += '    <div class="grid-cart-body"></div>';
                        transaction += '    <div class="grid-cart-footer">';
                        transaction += '        <div>Invoice kosong</div>';
                        transaction += '    </div>';
                        transaction += '</div>';
                    }
                    
                    $('.transaction-container').html(transaction);
                    
                    var invoiceid_transtemp = 0;
                    $('.detail-transaction').on( 'click', function( e ){
                        var invoiceidcur = $( this ).data( "invoiceid" );
                            
                        if(invoiceid_transtemp !== invoiceidcur){
                            invoiceid_transtemp = invoiceidcur;
                            invoiceid_transaction.invoiceid = invoiceid_transtemp;
                            curr_transaction = $( this );
                                
                            detailtransaction();
                        }else{
                            invoiceid_transtemp = 0;
                            $( this ).find( 'img' ).attr('src','/img/down.png');
                            $( this ).parent().parent().find('.list-transaction').remove();
                        }
                    });
                }else{
                    generateToken("transaction");
                }
            }
        });    
    }
}

function detailtransaction(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("detailtransaction");
    }else{
        $('body').append('<div class="loaderProgress"><img src="../img/loader.gif" /></div>');
        $.ajax({
            type: 'GET',
            url: MYSALES_TRANSACTION_API,
            data: { 
                invoiceid: invoiceid_transaction.invoiceid
            },
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.status == "OK"){
                    var element = '';
                    $.each( data.result, function( key, val ) {
                        var statustrans = (val.status === 7)?'pinkyoung':'bluesky';
                        element += '<div class="grid list-transaction">';
                        element += '     <div class="detail" style="width: 37.5%;height: 215.267px;">';
                        element += '          <div class="head">ALAMAT TUJUAN</div>';
                        element += '          <div class="body">';
                        element += '                <div class="grid content mysales-name">';
                        element += '                    <img src="/img/people.png" style="vertical-align: baseline;margin-right: 10px;border-radius: 0;width: 15px;"/>';
                        element +=                      val.recipientname;
                        element += '                </div>';
                        element += '                <div class="grid content" style="padding-left: 25px;position: relative;max-height: 84.2667px;overflow: hidden;text-overflow: ellipsis;">';
                        element += '                    <img src="/img/marker.png" style="vertical-align: baseline;position: absolute;left: 3px;width: unset;"/>';
                        element +=                      val.address;
                        element += '                </div>';
                        element += '                <div class="grid content">';
                        element += '                    <img src="/img/hp.png" style="margin-right: 14px;margin-left: 5px;width: unset;"/>';
                        element +=                      val.phone;
                        element += '                </div>';
                        element += '                <div class="grid content">';
                        element += '                    <img src="/img/envelope.png" style="margin-right: 14px;margin-left: 5px;width: unset;"/>';
                        element +=                      val.email;
                        element += '                </div>';
                        element += '          </div>';
                        element += '    </div>';
                        element += '    <div class="detail" style="padding: 0px;">';
                        element += '        <div class="grid" style="padding: 35px;">';
                        element += '            <div class="head">NO. TAGIHAN</div>';
                        element += '            <div class="body '+statustrans+'">'+val.invoice_no+'</div>';
                        element += '        </div>';
                        element += '        <div class="grid content" style="padding: 35px;">';
                        element += '            <div class="head">NO. TRANSAKSI</div>';
                        element += '            <div class="body '+statustrans+'">'+val.notran+'</div>';
                        element += '        </div>';
                        element += '    </div>';
                        element += '    <div class="detail" style="width: 37.5%;">';
                        element += '          <div class="head">CATATAN UNTUK PENJUAL</div>';
                        element += '          <div class="body">'+val.notes+'</div>';
                        element += '    </div>';
                        element += '</div>';
                    });
                    
                                
                    $( element ).insertAfter( curr_transaction.parent() );
                    
                    $('.loaderProgress').remove();
                            
                    $( '.detail detail-transaction' ).find( 'img' ).attr('src','/img/down.png');
                    curr_transaction.find( 'img' ).attr('src','/img/up.png');
                }else{
                    generateToken("detailtransaction");
                }
            }
        });    
    }
}