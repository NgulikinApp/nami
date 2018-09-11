function initShopMyincome(){
    $('#history-shop-seller').on( 'click', function( e ){
	   $('.grid-shop-seller-menu nav div').removeClass("bluesky").removeClass('border-yellow');
	   $(this).addClass("bluesky").addClass('border-yellow');
	   $(this).parent('a').css('margin-left','-5px');
	   $('.grid-shop-seller-content').addClass("hidden");
	   $('#history-shop-seller-content').removeClass("hidden");
	});
	$('#notes-shop-seller').on( 'click', function( e ){
	   $('.grid-shop-seller-menu nav div').removeClass("bluesky").removeClass('border-yellow');
	   $(this).addClass("bluesky").addClass('border-yellow');
	   $(this).parent('a').css('margin-left','-5px');
	   $('.grid-shop-seller-content').addClass("hidden");
	   $('#notes-shop-seller-content').removeClass("hidden");
	});
	
	$('.grid-incomehistory-right .footer .ui-btn').text('');
	$('.ui-loader').remove();
}