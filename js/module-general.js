var url = 'http://init.ngulikin.com',
    authData = new Object();

function initGeneral(){
    var categoryFlag = false,
        fullname_popup = $('.fullname_popup').val(),
        user_photo_popup = $('.user_photo_popup').val();
    
    $('.leftHeader,#backHomeSignup,#backHomeSignin').on( 'click', function( e ){
	    location.href = url;
	    sessionStorage.removeItem('signinEmailNgulikin');
	});
	
	if(sessionStorage.getItem('tokenNgulikin') === null){
        $.getJSON(TOKEN_API, function( data ) {
	    sessionStorage.setItem('tokenNgulikin',data.result);
	    });
	}
	
	if(fullname_popup !== ''){
    	$('#iconProfile').css('background-image','url("'+user_photo_popup+'")');
    	
    	var templatePopUpShop = '<div class="popover popover-bubble" role="tooltip">';
    	    templatePopUpShop += '  <div class="arrow"></div>';
    	    templatePopUpShop += '  <div>';
    	    templatePopUpShop += '      <ul>';
    	    templatePopUpShop += '          <li class="listShopMenu fullname_bubble"></li>';
    	    templatePopUpShop += '          <li class="listShopMenu">';
    	    templatePopUpShop += '              <a>Penjualan</a>';
    	    templatePopUpShop += '          </li>';
    	    templatePopUpShop += '          <li class="listShopMenu">';
    	    templatePopUpShop += '              <a>Penghasilanku</a>';
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
        
        var templatePopUpNotif = '<div class="popover popover-bubble" role="tooltip">';
    	    templatePopUpNotif += '  <div class="arrow"></div>';
    	    templatePopUpNotif += '  <div class="bubble-container">';
    	    templatePopUpNotif += '      <div class="no-notif">';
    	    templatePopUpNotif += '          <img src="/img/no-notif.png" width="120" height="100"/>';
    	    templatePopUpNotif += '          <span>Tidak ada notifikasi</span>';
    	    templatePopUpNotif += '      </div>';
    	    templatePopUpNotif += '  </div>';
    	    templatePopUpNotif += '</div>';
    	
    	$('#iconNotifHeader').popover({
          placement: 'bottom',
          template: templatePopUpNotif
        }).on('click', function(e) {
            $('#iconShopTemp').popover('hide');
    	    $('#iconCartHeader').popover('hide');
    	    $('#iconProfileTemp').popover('hide');
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
        $('.menu-category-search').css('width','calc(100% - 715px)');
    }
	
    /*socmed footer menu action*/
	$('.socmed-follow').on( 'click', function( e ){
	   var socmed = $(this).attr("datainternal-id");
	   window.open(socmed);
	});
	$('.about-us').on( 'click', function( e ){
	    location.href = url+"/aboutus";
	});
	
	var templatePopUpCart = '<div class="popover popover-bubble" role="tooltip">';
    	templatePopUpCart += '  <div class="arrow"></div>';
    	templatePopUpCart += '  <div class="bubble-container">';
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
    	templatePopUpCart += '  </div>';
    	templatePopUpCart += '</div>';
    	
    $('#iconCartHeader').popover({
        placement: 'bottom',
        template: templatePopUpCart
    }).on('click', function(e) {
        $('#iconShopTemp').popover('hide');
	    $('#iconNotifHeader').popover('hide');
	    $('#iconProfileTemp').popover('hide');
    });
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
	$('#buttonQuestionerSend').on( 'click', function( e ){
	    asking();
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

function asking(){
    var nameQuestion = $('#nameQuestion').val(),
	    emailQuestion = $('#emailQuestion').val(),
	    descQuestion = $('#descQuestion').val(),
	    fileQuestioner = $('#fileQuestioner')[0].files[0],
	    data = new FormData();
	        
	if(nameQuestion === '' || emailQuestion === '' || descQuestion === ''){
	    notif("error","Nama, email, dan pertanyaan harus diisi","right","bottom");
	}else if(!validateEmail(emailQuestion)){
	    notif("error","Format email tidak benar","right","bottom");
	}else{
	    data.append('name', nameQuestion);
        data.append('email', emailQuestion);
        data.append('question', descQuestion);
        // Attach file
        data.append('file', fileQuestioner); 
        
        if(sessionStorage.getItem('tokenNgulikin') === null){
            generateToken(asking);
        }else{
            $.ajax({
                type: 'POST',
                url: ASKING_API,
                data: data,
                async: true,
                contentType: false, 
                processData: false,
                dataType: 'json',
                success: function(result){
                    var message_email = result.message;
                    var status_email = (result.status == "OK")? "info" : "error";
                    notif(status_email,message_email,"right","bottom");
                }
            });
        }
	}
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
    
    $.each( data , function( key, val ) {
        var nameCategory = val.category_name;
        listcategory += '<li class="grid-listmiddle-cont8" id="'+nameCategory+'" style="background-image:url('+val.category_url+')" data-category="'+val.category_id+'">';
        listcategory += '<span>';
        listcategory += '   <p>ngulikin</p>';
        listcategory += '   <p>'+nameCategory+'</p>';
        listcategory += '</span>';
        listcategory += '</li>';
                            
        listcategoryMain += '<a class="menu-category-items">';
        listcategoryMain += '   <div data-category="'+val.category_id+'">'+nameCategory+'</div>';
        listcategoryMain += '</a>';
    });
    listcategoryMain += '<nav>';
                    
    $('#loaderHomeCategory').addClass('hidden');
    $(".grid-list-cont8").html(listcategory);
    $(".menu-category-sub-menu").html(listcategoryMain);
                    
    $('.grid-listmiddle-cont8').on('click', function (e) {
        var categoryVal = $(this).data("category");
                            
	   location.href = url+"/search?c="+categoryVal;
    });
                    
    $('.menu-category-items div').on('click', function (e) {
        var categoryVal = $(this).data("category");
                            
	    location.href = url+"/search?c="+categoryVal;
    });
}

//currency function
function numberFormat(val){
    return 'Rp ' + (val).replace(/(\d)(?=(\d{3})+$)/g, "$1.");
}

//notif function
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

//regex email format
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

/*
    Date validation
    Value parameter - required. All other parameters are optional.
*/
function isDate(value, sepVal, dayIdx, monthIdx, yearIdx) {
    try {
        //Change the below values to determine which format of date you wish to check. It is set to dd/mm/yyyy by default.
        var DayIndex = dayIdx !== undefined ? dayIdx : 0; 
        var MonthIndex = monthIdx !== undefined ? monthIdx : 0;
        var YearIndex = yearIdx !== undefined ? yearIdx : 0;
 
        value = value.replace(/-/g, "/").replace(/\./g, "/"); 
        var SplitValue = value.split(sepVal || "/");
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