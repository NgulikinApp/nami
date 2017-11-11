function initNotifications(){
    var url = 'http://init.ngulikin.com',
        urlAPI 	= 'http://api.ngulikin.com/v1/';
        
    $('.bodyNotif-list .bodyNotif-list-right img').on('click', function (e) {
	    var datainternal = $(this).attr('datainternal-id').split("~");
        location.href = url+"/product/"+datainternal[0]+'/'+datainternal[1];
	});
	$('.notif-filter-sub-menu li').on('click', function (e) {
	    $(this).children().prop( "checked", true );
	});
}