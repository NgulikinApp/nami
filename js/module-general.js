var url = 'https://www.ngulikin.com',
    authData = new Object();

function initGeneral(){
    var categoryFlag = false,
        fullname_popup = $('.fullname_popup').val(),
        user_photo_popup = $('.user_photo_popup').val(),
        ishasShop = parseInt($('.ishasShop').val());
    
    $('.leftHeader,#backHomeSignup,#backHomeSignin').on( 'click', function( e ){
	    location.href = url;
	    sessionStorage.removeItem('signinEmailNgulikin');
	});
	
	var position = $(window).scrollTop(); 

    // should start at 0
    
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if(scroll > position) {
            $('.footerFloat').fadeOut( "slow" );
        } else {
            $('.footerFloat').fadeIn( "slow" );
        }
        $('.menu-category-sub-menu').slideUp("slow");
        position = scroll;
    });
	
	if(sessionStorage.getItem('tokenNgulikin') === null){
        $.getJSON(TOKEN_API, function( data ) {
	    sessionStorage.setItem('tokenNgulikin',data.result);
	    });
	}
	
	if(fullname_popup !== ''){
    	$('#iconProfile').css('background-image','url("'+user_photo_popup+'")');
    	if(ishasShop === 0){
    	    $('.menu-category-search').css('width','calc(100% - 730px)');
    	}
    	
    	var templatePopUpShop = '<div class="popover popover-bubble" role="tooltip">';
    	    templatePopUpShop += '  <div class="arrow"></div>';
    	    templatePopUpShop += '  <div>';
    	    templatePopUpShop += '      <ul>';
    	    templatePopUpShop += '          <li class="listShopMenu fullname_bubble"></li>';
    	    templatePopUpShop += '          <li class="listShopMenu">';
    	    templatePopUpShop += '              <a onclick="mysalesShopClick()">Penjualanku</a>';
    	    templatePopUpShop += '          </li>';
    	    templatePopUpShop += '          <li class="listShopMenu">';
    	    templatePopUpShop += '              <a onclick="incomeShopClick()">Penghasilanku</a>';
    	    templatePopUpShop += '          </li>';
    	    templatePopUpShop += '          <li class="listShopMenu">';
    	    templatePopUpShop += '              <a onclick="settingShopClick()">Pengaturan Toko</a>';
    	    templatePopUpShop += '          </li>';
    	    templatePopUpShop += '      </ul>';
    	    templatePopUpShop += '  </div>';
    	    templatePopUpShop += '</div>';
    	
    	$('#iconShopTemp').popover({
          placement: 'bottom',
          template: templatePopUpShop
        }).on('click', function(e) {
            $('#iconNotifHeader').popover('hide');
    	    $('#iconCartHeader').popover('hide');
    	    $('#iconProfileTemp').popover('hide');
    	    
    	    $('.fullname_bubble').html(fullname_popup);
        });
        
        var templatePopUpProfile = '<div class="popover popover-bubble" role="tooltip">';
    	    templatePopUpProfile += '  <div class="arrow"></div>';
    	    templatePopUpProfile += '  <div>';
    	    templatePopUpProfile += '      <ul>';
    	    templatePopUpProfile += '          <li class="listShopMenu fullname_bubble"></li>';
    	    templatePopUpProfile += '          <li class="listShopMenu">';
    	    templatePopUpProfile += '              <a onclick="profileClick()">Lihat Profil</a>';
    	    templatePopUpProfile += '          </li>';
    	    templatePopUpProfile += '          <li class="listShopMenu">';
    	    templatePopUpProfile += '              <input type="button" value="Keluar" class="logoutMainMenu" onclick="logoutClick()"/>';
    	    templatePopUpProfile += '          </li>';
    	    templatePopUpProfile += '      </ul>';
    	    templatePopUpProfile += '  </div>';
    	    templatePopUpProfile += '</div>';
    	
    	$('#iconProfileTemp').popover({
          placement: 'bottom',
          template: templatePopUpProfile
        }).on('click', function(e) {
    	    $('.fullname_bubble').html(fullname_popup);
            $('#iconNotifHeader').popover('hide');
    	    $('#iconCartHeader').popover('hide');
    	    $('#iconShopTemp').popover('hide');
    	    
    	    $('.popover .arrow').css({'top':'-11px','margin-left':'24px'});
    	    $('.popover').css('left','-=34px');
    	    $('.popover').children('div:last-child').css('width','100%');
        });
    }else{
        $('.menu-category-search').css('width','calc(100% - 730px)');
    }
	
    /*socmed footer menu action*/
	$('.socmed-follow').on( 'click', function( e ){
	   var socmed = $(this).attr("datainternal-id");
	   window.open(socmed);
	});
	$('.about-us').on( 'click', function( e ){
	    location.href = url+"/aboutus";
	});
	
	bubbleCart();
	
	if($('.isSignin').val() !== ''){
	    bubbleNotif();
	}
	
	$('#iconFavoritHeader').on( 'click', function( e ){
	    location.href = url+"/favorite";
	});
	$('#forgotPopUpSignin').on( 'click', function( e ){
	    location.href = url+"/resetpassword";
	});
	$('#activePopUpSignin').on( 'click', function( e ){
	    location.href = url+"/resend_request_email";
	});
	
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
	
	var categoryProductStorage = sessionStorage.getItem("categoryProduct");
	if(categoryProductStorage === null){
	    categoryProduct();
	}else{
	    bindCategoryProduct(JSON.parse(categoryProductStorage));
	}
	
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
	$('.footer-body-mid2 ul li:last-child').on('click', function (e) {
	    location.href = url+"/signin";
	});
    
    /*$('.menu-category-wrap').mouseover(function() {
        $('.cover-popup').show();
    });
    
    $('.menu-category-wrap').mouseout(function() {
        //$('.cover-popup').hide();
    });*/
    
    $('.menu-category-wrap').on( 'click', function( e ){
        $('.menu-category-sub-menu').slideToggle();
    });
    
    $('.footerFloat span').on('click', function (e) {
	    $('.footerFloat span').removeClass('selected');
	    $('.footerFloat span').removeClass('bluesky');
	    $(this).addClass('selected');
	    $(this).addClass('bluesky');
	});
	
	$('#footerSell').on('click', function (e) {
	    sessionStorage.setItem('create_shopNgulikin',1);
	    profileClick();
	});
	
	$('#footerBlog,.footer-body-mid2 ul li:nth-child(3)').on('click', function (e) {
	    window.open('https://www.blog.ngulikin.com');
	});
	
	$('#footerHelp,.footer-body-mid2 ul li:nth-child(2)').on('click', function (e) {
	    location.href = url+"/help";
	});
	
	$('#footerOrders').on('click', function (e) {
	    sessionStorage.setItem('track_orderNgulikin',1);
	    profileClick();
	});
}

function bubbleCart(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(bubbleCart);
    }else{
        $.ajax({
            type: 'GET',
            url: PRODUCT_CART_API,
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.status == "OK"){
                    var templatePopUpCart = '';
                        templatePopUpCart += '<div class="popover popover-bubble" role="tooltip">';
                        templatePopUpCart += '  <div class="arrow"></div>';
                        templatePopUpCart += '  <div class="bubble-container">';
                    	if(data.result.length>0){
                            templatePopUpCart += '      <ul class="bubble-list-cart">';
                            templatePopUpCart += '          <li>Jumlah <div class="bubble-sum-cart">'+data.result.length+'<img src="/img/button_cart.png" width="15" height="15"/></div></li>';
                            templatePopUpCart += '      </ul>';
                            templatePopUpCart += '      <div class="no-cart">';
                            $.each( data.result, function( key, val ) {
                            	templatePopUpCart += '          <div class="list-cart" data-id="'+val.product_id+'">';
                                templatePopUpCart += '              <div class="list-cart-cont">';
                                templatePopUpCart += '                  <div class="list-cart-content">'+val.brand_name+'</div>';
                                templatePopUpCart += '                  <div class="list-cart-content">'+val.product_name+'</div>';
                                templatePopUpCart += '                  <div class="list-cart-content">Total '+val.sum_product+'</div>';
                                templatePopUpCart += '                  <div class="list-cart-content">'+val.cart_createdate+'</div>';
                                templatePopUpCart += '              </div>';
                                templatePopUpCart += '              <div class="list-cart-cont">';
                                templatePopUpCart += '                  <img src="'+val.product_image+'" width="65" height="65"/>';
                                templatePopUpCart += '              </div>';
                                templatePopUpCart += '              <div class="list-cart-cont">';
                                templatePopUpCart +=                    val.product_price;
                                templatePopUpCart += '              </div>';
                                templatePopUpCart += '          </div>';
                            });
                            templatePopUpCart += '      </div>';
                            templatePopUpCart += '      <div class="bubble-cart-button">';
                            templatePopUpCart += '          <input type="button" value="Lihat Keranjang" onclick="cartClick()"/>';
                            templatePopUpCart += '      </div>';
                    	}else{
                            templatePopUpCart += '      <ul class="bubble-list-cart">';
                            templatePopUpCart += '          <li>Jumlah <div class="bubble-sum-cart">0<img src="/img/button_cart.png" width="15" height="15"/></div></li>';
                            templatePopUpCart += '      </ul>';
                            templatePopUpCart += '      <div class="no-cart">';
                            templatePopUpCart += '          <img src="/img/keranjang.png" width="120" height="100"/>';
                            templatePopUpCart += '          <span>Tidak ada produk yang ditambahkan</span>';
                            templatePopUpCart += '      </div>';
                            templatePopUpCart += '      <div class="bubble-cart-button">';
                            templatePopUpCart += '          <input type="button" value="Lihat Keranjang" onclick="cartClick()"/>';
                            templatePopUpCart += '      </div>';
                    	}
                	templatePopUpCart += '  </div>';
                    templatePopUpCart += '</div>';
                	
                	$("#iconCartHeader").popover('destroy');
                	$('#iconCartHeader').popover({
                        placement: 'bottom',
                        template: templatePopUpCart
                    }).on('click', function(e) {
                        $('#iconShopTemp').popover('hide');
                    	$('#iconNotifHeader').popover('hide');
                    	$('#iconProfileTemp').popover('hide');
                    });
                    
                    $(".sumManinMenuCart").html(data.result.length);
                }else{
                    generateToken(bubbleCart);
                }
            } 
        });
    }
}

function incomeShopClick(){
    location.href = url+"/shop/i";
}

function mysalesShopClick(){
    location.href = url+"/shop/s";
}

function settingShopClick(){
    location.href = url+"/shop/t";
}

function cartClick(){
    location.href = url+"/cart";
}

function profileClick(){
    location.href = url+"/profile"
}

function bubbleNotif(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(bubbleNotif);
    }else{
        $.ajax({
            type: 'GET',
            url: NOTIFICATION_API,
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.status == "OK"){
                    var templatePopUpNotif = '';
                        templatePopUpNotif += '<div class="popover popover-bubble" role="tooltip">';
                        templatePopUpNotif += '  <div class="arrow"></div>';
                        templatePopUpNotif += '  <div class="bubble-container">';
                        if(data.result.length>0){
                            templatePopUpNotif += '<div class="no-cart">';
                            $.each( data.result, function( key, val ) {
                                templatePopUpNotif += '<div class="list-cart">';
                                templatePopUpNotif += '     <div class="list-cart-cont">';
                                templatePopUpNotif += '         <div class="list-cart-content">'+val.brand_name+'</div>';
                                templatePopUpNotif += '         <div class="list-cart-content">'+val.notification_desc+'</div>';
                                templatePopUpNotif += '         <div class="list-cart-content">'+val.notification_createdate+'</div>';
                                templatePopUpNotif += '     </div>';
                                templatePopUpNotif += '     <div class="list-cart-cont">';
                                templatePopUpNotif += '         <img src="'+val.notification_photo+'" width="65" height="65" onclick="cartClick()" style="cursor:pointer;"/>';
                                templatePopUpNotif += '     </div>';
                                templatePopUpNotif += '</div>';
                            });
                            templatePopUpNotif += '</div>';
                            templatePopUpNotif += '<div class="bubble-cart-button">';
                            templatePopUpNotif += '     <input type="button" value="Lihat Notifikasi" onclick="notifClick()"/>';
                            templatePopUpNotif += '</div>';
                        }else{
                            templatePopUpNotif += '<div class="no-notif">';
    	                    templatePopUpNotif += '     <img src="/img/no-notif.png" width="120" height="100"/>';
    	                    templatePopUpNotif += '     <span>Tidak ada notifikasi</span>';
    	                    templatePopUpNotif += '</div>';
                        }
                        templatePopUpNotif += '  </div>';
                        templatePopUpNotif += '</div>';
                	
                	$("#iconNotifHeader").popover('destroy');
                	$('#iconNotifHeader').popover({
                      placement: 'bottom',
                      template: templatePopUpNotif
                    }).on('click', function(e) {
                        $('#iconShopTemp').popover('hide');
                	    $('#iconCartHeader').popover('hide');
                	    $('#iconProfileTemp').popover('hide');
                    });
                    $(".sumNotifinMenuCart").html(data.result.length);
                }else{
                    generateToken(bubbleNotif);
                }
            } 
        });
    }
}

function notifClick(){
    location.href = url+"/notifications";
}

function logoutClick(){
    $.ajax({
        type: 'GET',
        url: SIGNOUT_API,
        success: function(data, res) {
            sessionStorage.setItem("logoutNgulikin", 1);
            location.href = url;
        } 
    });
}

function generateToken(name){
    $.getJSON(TOKEN_API, function( data ) {
	    sessionStorage.setItem('tokenNgulikin',data.result);
	    eval("name()");
	});
}

function categoryProduct(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(categoryProduct);
    }else{
        $.ajax({
            type: 'GET',
            url: PRODUCT_CATEGORY_API,
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.status == "OK"){
                	sessionStorage.setItem("categoryProduct",JSON.stringify(data.result));
                	bindCategoryProduct(data.result);
                }else{
                    generateToken(categoryProduct);
                }
            } 
        });
    }
}

function bindCategoryProduct(data){
    var listcategory = '';
    var listcategoryMain = '<nav>';
    var listcategoryFooter = '';
    
    $.each( data , function( key, val ) {
        var nameCategory = val.category_name;
        listcategory += '<li class="grid-listmiddle-cont8" id="'+nameCategory+'" style="background-image:url('+val.category_url+')" data-category="'+val.category_id+'">';
        listcategory += '<span>';
        listcategory += '   <p>ngulikin</p>';
        listcategory += '   <p>'+nameCategory+'</p>';
        listcategory += '</span>';
        listcategory += '</li>';
                            
        listcategoryMain += '<div class="menu-category-items">';
        listcategoryMain += '   <div class="dropbtn" data-category="'+nameCategory+'">'+nameCategory+'</div>';
        listcategoryMain += '   <div class="menu-category-subitems">';
        
        $.each( val.subcategory , function( subkey, subval ) {
            listcategoryMain += '       <a class="dropbtnsub" data-category="'+nameCategory+'" data-subcategory="'+subval.subcategory_name+'">'+subval.subcategory_name+'</a>';
        });
        
        listcategoryMain += '   </div>';
        listcategoryMain += '</div>';
        
        listcategoryFooter += '<li data-category="'+nameCategory+'">Ngulikin '+nameCategory+'</li>';
    });
    listcategoryMain += '<nav>';
                    
    $('#loaderHomeCategory').addClass('hidden');
    $(".grid-list-cont8").html(listcategory);
    $(".menu-category-sub-menu").html(listcategoryMain);
    $(".footer-body-left ul").html(listcategoryFooter);
                    
    $('.grid-listmiddle-cont8').on('click', function (e) {
        var categoryVal = $(this).data("category");
                            
	    location.href = url+"/search/"+categoryVal;
    });
                    
    $('.dropbtn').on('click', function (e) {
        var categoryVal = $(this).data("category");
                            
	    location.href = url+"/search/"+categoryVal;
    });
    
    $('.dropbtnsub').on('click', function (e) {
        var categoryVal = $(this).data("category");
        var subcategoryVal = $(this).data("subcategory");
                            
	    location.href = url+"/search/"+categoryVal+"/"+subcategoryVal;
    });
    
    $('.footer-body-left ul li').on('click', function (e) {
        var categoryVal = $(this).data("category");
                            
	    location.href = url+"/search/"+categoryVal;
    });
    
    $('.menu-category-items').hover(function(){
	    $('.cover-category').removeClass('hidden');
	});
	
	$('.menu-category-items').mouseleave(function(){
	    $('.cover-category').addClass('hidden');
	});
}

//currency function
function numberFormat(val){
    return 'Rp ' + (val.toString()).replace(/(\d)(?=(\d{3})+$)/g, "$1.");
}

//notif function
function notif(type,message,x,y){
    if ($(".notify")[0]){
        return;
    }
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

//regex email format
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

/*
    Date validation
    Value parameter - required. All other parameters are optional.
*/
function isDate(value, dayIdx, monthIdx, yearIdx) {
    try {
        //Change the below values to determine which format of date you wish to check. It is set to dd/mm/yyyy by default.
        var DayIndex = dayIdx !== undefined ? dayIdx : 0; 
        var MonthIndex = monthIdx !== undefined ? monthIdx : 0;
        var YearIndex = yearIdx !== undefined ? yearIdx : 0;
 
        value = value.replace(/-/g, "/").replace(/\./g, "/"); 
        var SplitValue = value.split("/");
        var OK = true;
        if (!(SplitValue[DayIndex].length == 1 || SplitValue[DayIndex].length == 2)) {
            OK = false;
        }
        if (OK && !(SplitValue[MonthIndex].length == 1 || SplitValue[MonthIndex].length == 2)) {
            OK = false;
        }
        if (OK && SplitValue[YearIndex].length != 4) {
            OK = false;
        }
        
        if (OK) {
            var Day = parseInt(SplitValue[DayIndex], 10);
            var Month = parseInt(SplitValue[MonthIndex], 10);
            var Year = parseInt(SplitValue[YearIndex], 10);
 
            if (OK = ((Year > 1900) && (Year < new Date().getFullYear()))) {
                if (OK = (Month <= 12 && Month > 0)) {

                    var LeapYear = (((Year % 4) == 0) && ((Year % 100) != 0) || ((Year % 400) == 0));   
                    
                    if(OK = Day > 0)
                    {
                        if (Month == 2) {  
                            OK = LeapYear ? Day <= 29 : Day <= 28;
                        } 
                        else {
                            if ((Month == 4) || (Month == 6) || (Month == 9) || (Month == 11)) {
                                OK = Day <= 30;
                            }
                            else {
                                OK = Day <= 31;
                            }
                        }
                    }
                }
            }
        }
        return OK;
    }
    catch (e) {
        return false;
    }
}

function hourtosec(hour){
    var a = hour.split(':'); // split it at the colons

    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    return seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60;
}

function sectohour(sec){
    var date = new Date(null);
        date.setSeconds(sec); // specify value for SECONDS here
    var result = date.toISOString().substr(11, 5);
    
    return result;
}