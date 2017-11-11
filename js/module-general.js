function initGeneral(){
    var url = 'http://init.ngulikin.com',
        urlAPI 	= 'http://api.ngulikin.com/v1/';
    
    $('.leftHeader,#backHomeSignup,#backHomeSignin').on( 'click', function( e ){
	    location.href = url;
	    sessionStorage.removeItem('signinEmailNgulikin');
	});
	
    /*socmed footer menu action*/
	$('.socmed-follow').on( 'click', function( e ){
	   var socmed = $(this).attr("datainternal-id");
	   window.open(socmed);
	});
	$('.about-us').on( 'click', function( e ){
	    location.href = url+"/aboutus";
	});
	$('#iconCartHeader').on( 'click', function( e ){
	    location.href = url+"/cart";
	});
	$('#iconFavoritHeader').on( 'click', function( e ){
	    location.href = url+"/favorite";
	});
	$('#iconNotifHeader').on( 'click', function( e ){
	    location.href = url+"/notifications";
	});
	$('#forgotPopUpSignin').on( 'click', function( e ){
	    location.href = url+"/resetpassword";
	});
	$('#activePopUpSignin').on( 'click', function( e ){
	    location.href = url+"/resend_request_email";
	});
	
	var emailsession = localStorage.getItem('emailNgulikin');
    if(emailsession !== null){
        $('#menuLogin').hide();
    	$('#iconProfile').show();
    	$('#iconNotifHeader').show();
    	$('.footer-body-mid2 ul li:last-child').hide();
    }else{
    	$('.footer-body-mid2 ul li:last-child').show();
    	$('#iconNotifHeader').hide();
    }
	
	/*signin button on header menu action*/
	$('#menuLogin,.signupBanner-footer div:nth-child(2)').on( 'click', function( e ){
	   location.href = url+"/signin";
	});
	$('#closeSignin').on( 'click', function( e ){
	   $('.cover-popup').hide();
	});
	
	/*Questioner Action*/
    $('.questioner').on( 'click', function( e ){
	   $('.questionerContainer').show("blind", {direction: "down"}, 300);
	});
	$('#closeButtonQuestioner').on( 'click', function( e ){
	   $('.questionerContainer').hide("fade");
	});
	$('#buttonQuestionerCancel').on( 'click', function( e ){
	   $('.questionerContainer').hide("fade");
	});
	$('#buttonQuestionerSend').on( 'click', function( e ){
	    var nameQuestion = $('#nameQuestion').val(),
	        emailQuestion = $('#emailQuestion').val(),
	        descQuestion = $('#descQuestion').val(),
	        fileQuestioner = $('#fileQuestioner')[0].files[0],
	        data = new FormData();
	        
	    if(nameQuestion === '' || emailQuestion === '' || descQuestion === ''){
	        notif("error","Nama, email, dan pertanyaan harus diisi","right","bottom");
	    }else{
	        data.append('name', nameQuestion);
            data.append('email', emailQuestion);
            data.append('question', descQuestion);
            // Attach file
            data.append('file', fileQuestioner); 

    	    var emailSend = ajax('POST',urlAPI+'mail/send',data);
    	    if(emailSend !== ''){
    	        notif("info","Pertanyaan sudah terkirim","right","top");
    	    }
	    }
	});
	
	$.getJSON("http://http-1761326392.ap-southeast-1.elb.amazonaws.com/category", function( data ) {
	    var listcategory = '';
	    var listcategoryMain = '';
        $.each( data, function( key, val ) {
            var nameCategory = (val.name).toLowerCase();
            listcategory += '<li class="grid-listmiddle-cont8" id="'+nameCategory+'" style="background-image:url('+val.thumbnail_url+')">';
            listcategory += '<span>';
            listcategory += '   <p>ngulikin</p>';
            listcategory += '   <p>'+nameCategory+'</p>';
            listcategory += '</span>';
            listcategory += '</li>';
            
            listcategoryMain += '<li><a>'+val.name+'</a></li>';
        });
        $(".grid-list-cont8").html(listcategory);
        $(".menu-category-sub-menu").html(listcategoryMain);
    });
	
	/*var categoryProductStorage = localStorage.getItem("categoryProduct");
	if(categoryProductStorage === null){
	    var data = {};
	    
	    /* ajax for list product on side bar and home menu
	    var productList = ajax('GET',urlAPI+'menu/list',data);
	    categoryProduct(productList.result);
	}else{
        categoryProduct(JSON.parse(categoryProductStorage));
	}*/
	
	$('.menu-category-sub-menu li a').on( 'click', function( e ){
	   var searchVal = $(this).text();
	   location.href = url+"/search/"+searchVal;
	});
	$('#search-header').on( 'click', function( e ){
	   var searchVal = $('#search-general').val();
	   location.href = url+"/search?keywords="+searchVal;
	});
	
	$('#search-general').on('keydown', function (e) {
	    if (e.which == 13) {
	        $('#search-header').trigger('click');
	    }
	});
	
	$('.list-socmed li a[datainternal-id="terms"]').on('click', function (e) {
	    location.href = url+"/terms";
	});
	$('.list-socmed li a[datainternal-id="privacy"]').on('click', function (e) {
	    location.href = url+"/privacy";
	});
	$('.list-socmed li a[datainternal-id="faq"]').on('click', function (e) {
	    location.href = url+"/faq";
	});
    var emailsession = localStorage.getItem('emailNgulikin');
	if(emailsession !== null){
	    $('#menuLogin').hide();
	    $('#iconProfile').show();
	    $('.footer-body-mid2 ul li:last-child').hide();
	}else{
	    $('.footer-body-mid2 ul li:last-child').show();
	}
	$('.footer-body-mid2 ul li:last-child').on('click', function (e) {
	    location.href = url+"/signin";
	});
    
    $('#iconProfile').on( 'click', function( e ){
        location.href = url+"/profile/"+localStorage.getItem('emailNgulikin');
    });
    
    /*$('.menu-category-wrap').mouseover(function() {
        $('.cover-popup').show();
    });
    
    $('.menu-category-wrap').mouseout(function() {
        //$('.cover-popup').hide();
    });*/
}

/* content for sidebar menu and category product on home menu*/
function categoryProduct(product){
    var productListArray = [],
        sideBarMenuContainer = '',
	    homeContainer = '';
	    
    $.each(product, function(k, v) {
        sideBarMenuContainer += '<a class="w3-bar-item w3-button w3-button-hover">'+v.name+'</a>';
            
        var img_url = v.img_url;
            img_url = img_url.replace(/\\/g , '');
        var img_hover_url = v.img_hover_url;
            img_hover_url = img_hover_url.replace(/\\/g , '');
        homeContainer += '<div class="grid-body-list-cont4" datainternal-id="'+img_hover_url+'~'+img_url+'" style="background-image:url('+img_url+');">';
        homeContainer +=    '<div class="grid-body-list-label-cont4">'+v.name+'</div>';
        homeContainer += '</div>';
        
        productListArray.push({"name":v.name,"img_url":img_url,"img_hover_url":img_hover_url});
    });
    
    localStorage.setItem("categoryProduct", JSON.stringify(productListArray));
    
    //$('.list-product-sidebar').html(sideBarMenuContainer);
    $('.grid-body-cont4').html(homeContainer);
}

//ajax base function
function ajax(method,url,data){
    var resultStore;
    $.ajax({
        method: method,
        url: url,
        data: data,
        async: false,
        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: false, 
        success: function(result) {
            resultStore = result;
      }
    });
    return resultStore;
}

function ajax_json(method,url,data){
    var resultStore;
    $.ajax({
        type: method,
        url: url,
        data: JSON.stringify(data),
        async: false,
        processData: false,
        contentType: "application/json",
        success: function(result) {
            resultStore = result;
      }
    });
    return resultStore;
}
//End of ajax base function

function numberFormat(val){
    return 'Rp ' + (val).replace(/(\d)(?=(\d{3})+$)/g, "$1.");
}

function notif(type,message,x,y){
    notify({
        type: type, //alert | success | error | warning | info
        title: "Ngulikin",
        message: message,
        position: {
                    x: x, //right | left | center
                    y: y //top | bottom | center
        },
        icon: '<img src="/img/icon.png" />', //<i>
        size: "normal", //normal | full | small
        overlay: false, //true | false
        closeBtn: false, //true | false
        overflowHide: false, //true | false
        spacing: 20, //number px
        theme: "default", //default | dark-theme
        autoHide: true, //true | false
        delay: 2500, //number ms
        onShow: null, //function
        onClick: null, //function
        onHide: null, //function
        template: '<div class="notify"><div class="notify-text"></div></div>'
    });
}

//random color function
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//get value parameter from url
function getUrlParam(param){
    var url = new URL(window.location.href);
    var val = url.searchParams.get(param);
    return val;
}