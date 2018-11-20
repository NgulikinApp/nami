function initNotifications(){
    notification();
	$('.notif-filter-sub-menu li').on('click', function (e) {
	    $(this).children().prop( "checked", true );
	});
	$('#search-notif').on('click', function (e) {
	    notification();
	});
	$('#searchNotif').on('keydown', function (e) {
	    if (e.which == 13) {
	        $('#search-notif').trigger('click');
	    }
	});
}

function notification(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(notification);
    }else{
        var keyword = $('#searchNotif').val();
        $.ajax({
            type: 'GET',
            url: NOTIFICATION_API,
            data:{keyword:keyword},
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.status == "OK"){
                    var response = data.result;
                    if(response.length > 0){
                        var listNotif = '<ul>';
                        $.each( response, function( key, val ) {
                            listNotif += '<li>';
                            listNotif += '   <div class="bodyNotif-list-left">';
                            listNotif += '      <div class="title">'+val.brand_name+'</div>';
                            listNotif += '      <div class="content">'+val.notification_desc+'</div>';
                            listNotif += '      <div class="date">';
                            listNotif += '          <img src="/img/button_notif.png" width="10" height="10"/>'+val.notification_createdate+'';
                            listNotif += '      </div>';
                            listNotif += '   </div>';
                            listNotif += '   <div class="bodyNotif-list-right">';
                            listNotif += '      <img src="'+val.notification_photo+'" width="100" height="100" onclick="cartClick()"/>';
                            listNotif += '   </div>';
                            listNotif += '</li>';
                        });
                        listNotif += '</ul>';
                    }else{
                        var listNotif = '<div class="no-notif" id="no-notifList">';
                            listNotif += '  <img src="/img/no-notif.png" width="220" height="180"/>';
                            listNotif += '  <span>Tidak ada notifikasi</span>';
                            listNotif += '</div>';
                    }
                    $(".bodyNotif-list").html(listNotif);
                }else{
                    generateToken(notification);
                }
            }
        });
    }
}