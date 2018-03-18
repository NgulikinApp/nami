function initShopSeller(){
    $('#profile-shop-seller').on( 'click', function( e ){
	   $('.grid-shop-seller-menu nav div').removeClass("bluesky").removeClass('border-yellow');
	   $(this).addClass("bluesky").addClass('border-yellow');
	   $('.grid-shop-seller-content').addClass("hidden");
	   $('#profile-shop-seller-content').removeClass("hidden");
	});
	$('#brand-shop-seller').on( 'click', function( e ){
	   $('.grid-shop-seller-menu nav div').removeClass("bluesky").removeClass('border-yellow');
	   $(this).addClass("bluesky").addClass('border-yellow');
	   $(this).parent('a').css('margin-left','-5px');
	   $('.grid-shop-seller-content').addClass("hidden");
	   $('#brand-shop-seller-content').removeClass("hidden");
	});
	$('#note-shop-seller').on( 'click', function( e ){
	   $('.grid-shop-seller-menu nav div').removeClass("bluesky").removeClass('border-yellow');
	   $(this).addClass("bluesky").addClass('border-yellow');
	   $(this).parent('a').css('margin-left','-5px');
	   $('.grid-shop-seller-content').addClass("hidden");
	   $('#note-shop-seller-content').removeClass("hidden");
	});
	$('#account-shop-seller').on( 'click', function( e ){
	   $('.grid-shop-seller-menu nav div').removeClass("bluesky").removeClass('border-yellow');
	   $(this).addClass("bluesky").addClass('border-yellow');
	   $(this).parent('a').css('margin-left','-5px');
	   $('.grid-shop-seller-content').addClass("hidden");
	   $('#account-shop-seller-content').removeClass("hidden");
	});
	
	$('#day-line').milestones({
		stage: 7,
		checks: 7,
		checkclass: 'checks',
		labels: ["Senin","Selasa","Rabu","Kamis","Jumat","Sabtu","Minggu"]
	});
}