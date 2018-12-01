var shopPhotoList = [],
    dayData = {};

$( document ).ready(function() {
    initGeneral();
    initShopNotes();
});
    
function initShopNotes(){
    detail();
    
    $('#operational-shop-notes').on( 'click', function( e ){
	   $('.grid-shop-seller-menu nav div').removeClass("bluesky").removeClass('border-yellow');
	   $(this).addClass("bluesky").addClass('border-yellow');
	   $('.grid-shop-seller-content').addClass("hidden");
	   $('#operational-shop-notes-content').removeClass("hidden");
	});
	$('#info-shop-notes').on( 'click', function( e ){
	   $('.grid-shop-seller-menu nav div').removeClass("bluesky").removeClass('border-yellow');
	   $(this).addClass("bluesky").addClass('border-yellow');
	   $(this).parent('a').css('margin-left','-5px');
	   $('.grid-shop-seller-content').addClass("hidden");
	   $('#info-shop-notes-content').removeClass("hidden");
	});
	$('#close-shop-notes').on( 'click', function( e ){
	   $('.grid-shop-seller-menu nav div').removeClass("bluesky").removeClass('border-yellow');
	   $(this).addClass("bluesky").addClass('border-yellow');
	   $(this).parent('a').css('margin-left','-5px');
	   $('.grid-shop-seller-content').addClass("hidden");
	   $('#close-shop-notes-content').removeClass("hidden");
	});
	$('#location-shop-notes').on( 'click', function( e ){
	   $('.grid-shop-seller-menu nav div').removeClass("bluesky").removeClass('border-yellow');
	   $(this).addClass("bluesky").addClass('border-yellow');
	   $(this).parent('a').css('margin-left','-5px');
	   $('.grid-shop-seller-content').addClass("hidden");
	   $('#location-shop-notes-content').removeClass("hidden");
	});
	$('#upload-shop-notes').on( 'click', function( e ){
	   $('.grid-shop-seller-menu nav div').removeClass("bluesky").removeClass('border-yellow');
	   $(this).addClass("bluesky").addClass('border-yellow');
	   $(this).parent('a').css('margin-left','-5px');
	   $('.grid-shop-seller-content').addClass("hidden");
	   $('#upload-shop-notes-content').removeClass("hidden");
	});
	
	$('.ui-loader').remove();
	
	$("#filesShop").change(function(){
        uploadPhotoLocation();
    });
	
	$('#cancel').on( 'click', function( e ){
	    location.href=url+"/shop/t";
	});
	
	$('#save').on( 'click', function( e ){
	    doEditNotes();
	});
	
	$('.ui-btn').contents().filter(function(){
        return this.nodeType === 3;
    }).remove();
    
    jQuery('#shop_op_from').timepicker();
    jQuery('#shop_op_to').timepicker();
}

function detail(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(detail);
    }else{
        $.ajax({
            type: 'GET',
            url: SHOP_NOTES_API,
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.status == "OK"){
                    dayData.monday = data.result.shop_monday;
                    dayData.tuesday = data.result.shop_tuesday;
                    dayData.wednesday = data.result.shop_wednesday;
                    dayData.thursday = data.result.shop_thursday;
                    dayData.friday = data.result.shop_friday;
                    dayData.saturday = data.result.shop_saturday;
                    dayData.sunday = data.result.shop_sunday;
                    
                    dayline();
                    
                    $('#shop_op_from').val(sectohour(data.result.shop_op_from));
                    $('#shop_op_to').val(sectohour(data.result.shop_op_to));
                    $('#shop_desc').val(data.result.shop_desc);
                    $('#shop_close').val(data.result.shop_close);
                    $('#shop_open').val(data.result.shop_open);
                    $('#shop_closing_notes').val(data.result.shop_closing_notes);
                    $('#shop_location').val(data.result.shop_location);
                    $('.loaderProgress').addClass('hidden');
                }else{
                    generateToken(detail);
                }
            } 
        });
    }
}

function dayline(){
    $('#day-line').empty();
    $('#day-line').milestones({
    	stage: 7,
    	monday:dayData.monday,
        tuesday:dayData.tuesday,
        wednesday:dayData.wednesday,
        thursday:dayData.thursday,
        friday:dayData.friday,
        saturday:dayData.saturday,
        sunday:dayData.sunday,
    	checkclass: 'checks',
    	clickable:true,
    	labels: ["Senin","Selasa","Rabu","Kamis","Jumat","Sabtu","Minggu"]
    });
    
    if(dayData.monday === 1){
        $('input[datainternal-id="monday"]').prop('checked',true);
    }
    if(dayData.tuesday === 1){
        $('input[datainternal-id="tuesday"]').prop('checked',true);
    }
    if(dayData.wednesday === 1){
        $('input[datainternal-id="wednesday"]').prop('checked',true);
    }
    if(dayData.thursday === 1){
        $('input[datainternal-id="thursday"]').prop('checked',true);
    }
    if(dayData.friday === 1){
        $('input[datainternal-id="friday"]').prop('checked',true);
    }
    if(dayData.saturday === 1){
        $('input[datainternal-id="saturday"]').prop('checked',true);
    }
    if(dayData.sunday === 1){
        $('input[datainternal-id="sunday"]').prop('checked',true);
    }
    
    $('.checkday').on( 'click', function( e ){
	    dayData.monday = $('input[datainternal-id="monday"]').is(':checked') ? 1 : 0;
        dayData.tuesday = $('input[datainternal-id="tuesday"]').is(':checked') ? 1 : 0;
        dayData.wednesday = $('input[datainternal-id="wednesday"]').is(':checked') ? 1 : 0;
        dayData.thursday = $('input[datainternal-id="thursday"]').is(':checked') ? 1 : 0;
        dayData.friday = $('input[datainternal-id="friday"]').is(':checked') ? 1 : 0;
        dayData.saturday = $('input[datainternal-id="saturday"]').is(':checked') ? 1 : 0;
        dayData.sunday = $('input[datainternal-id="sunday"]').is(':checked') ? 1 : 0;
        dayline();
	});
}

function uploadPhotoLocation(){
    var data = new FormData(),
        filePath = $('#filesShop').val(),
        fileExt = (filePath.substr(filePath.lastIndexOf('\\') + 1).split('.')[1]).toLowerCase(),
        filePhoto = $('#filesShop')[0].files[0],
        fileSize = filePhoto.size/ 1024 / 1024;
        
        data.append('type', 'product');
        data.append('file', filePhoto);
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(uploadPhotoLocation);
    }else{
        if(fileSize < 2){
            if(fileExt === 'jpg' || fileExt === 'png'){
                $('.loaderProgress').removeClass('hidden');
                $.ajax({
                    type: 'POST',
                    url: PUTFILE_API,
                    data: data,
                    async: true,
                    contentType: false, 
                    processData: false,
                    dataType: 'json',
                    beforeSend: function(xhr, settings) { 
                        xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
                    },
                    success: function(result){
                        shopPhotoList.push(result.src);
                        $('.loaderProgress').addClass('hidden');
                        
                        readProductURL();
                    }
                });
            }else{
                notif("error","Format file hanya boleh jpg atau png","center","top");
            }
        }else{
            notif("error","File tidak boleh lebih dari 2 MB","center","top");
        }
    }
}

function readShoptURL() {
    var fileListDisplay = document.getElementById('photoShopLocationList');
    fileListDisplay.innerHTML = '';
    
    shopPhotoList.forEach(function (file, index) {
        
        var img = document.createElement("img");
            img.setAttribute("src", file);
            img.setAttribute("width", "60");
            img.setAttribute("height", "60");
          
          fileListDisplay.appendChild(img);
    });
    
    $('#photoShopLocationList').tosrus({
        infinite	: true,
            slides		: {
            visible		: 3
        }
    });
}

function doEditNotes(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(doEditNotes);
    }else{
        var shop_banner = $('#tempBanner').attr('src');
            
        $.ajax({
            type: 'POST',
            url: SHOP_EDITNOTES_API,
            data:JSON.stringify({ 
                shop_op_from : hourtosec($('#shop_op_from').val()),
                shop_op_to : hourtosec($('#shop_op_to').val()),
                shop_sunday : dayData.sunday,
                shop_monday : dayData.monday,
                shop_tuesday : dayData.tuesday,
                shop_wednesday : dayData.wednesday,
                shop_thursday : dayData.thursday,
                shop_friday : dayData.friday,
                shop_saturday : dayData.saturday,
                shop_desc : $('#shop_desc').val(),
                shop_close : $('#shop_close').val(),
                shop_open : $('#shop_open').val(),
                shop_closing_notes : $('#shop_closing_notes').val(),
                shop_location : $('#shop_location').val()
            }),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                    generateToken(doEditNotes);
                }else{
                    sessionStorage.setItem('notesNgulikin',1);
            	    location.href=url+"/shop/t";
                }
            }
        });
    }
}