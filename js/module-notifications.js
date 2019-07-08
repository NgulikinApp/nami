$( document ).ready(function() {
    initGeneral();
    initNotifications();
});

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
	
	$('input[name="filterNotif"]').on('click', function (e) {
	    notification();
	});
}

function notification(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("notification");
    }else{
        $(".bodyNotif-list").html('<img src="img/loader.gif" class="loaderImg" id="loaderNotif"/>');
        
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
                    var response = data.result.listNotif;
                    if(response.length > 0){
                        var listNotif = '<ul>';
                        $.each( response, function( key, val ) {
                            listNotif += '<li class="listnotif" data-id="'+val.link_id+' data-type="'+val.notifications_type+' datainternal-id="'+val.notifications_id+'">';
                            listNotif += '   <div class="bodyNotif-list-left">';
                            listNotif += '      <div class="title">'+val.notifications_title+'</div>';
                            listNotif += '      <div class="content">'+val.notifications_desc+'</div>';
                            listNotif += '      <div class="date">';
                            listNotif += '          <img src="/img/button_notif.png" width="10" height="10"/>'+val.notifications_createdate+'';
                            listNotif += '      </div>';
                            listNotif += '   </div>';
                            listNotif += '   <div class="bodyNotif-list-right">';
                            listNotif += '      <img src="'+val.notifications_photo+'" width="100" height="100"/>';
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
                    
                    $("#sumNotif").html(response.length);
                    
                    $('.listnotif').on('click', function (e) {
                        var dataid = $( this ).data('id'),
                            datatype = parseInt($( this ).data('type')),
                            linkUrl = "";
                        
                        if(datatype !== 3){
                            if(datatype === 1){
                                linkUrl = url+"/invoice/"+dataid;
                            }else{
                                linkUrl = url+"/shop/t";
                            }
                            location.href = linkUrl;
                        }
                	});
                }else{
                    generateToken("notification");
                }
            }
        });
    }
}