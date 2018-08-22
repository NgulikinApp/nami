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
	
	$('.ui-loader,#filterStatusSender-button span,#filterDeliverySender-button span,#filterConfirmSender-button span,#filterStatusSender-button span,#filterTransactionSender-button span,#filterMysalesStatus-button span').remove();
	$('.button-container .ui-btn').text('');
	
	$('#status-line').milestones({
		stage: 5,
		checks: 1,
		checkclass: 'checks',
		labels: ["Pembayaran","Proses","Pengiriman","Sampai","Diterima"]
	});
	
	$('.order-container.right .grid:first-child .detail:last-child .head').on('click', function (e) {
        var productId = $(this).data('productid');
        location.href = url+"/product/"+productId;
    });
}