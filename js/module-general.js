var url = 'http://init.ngulikin.com',
    authData = new Object();

function initGeneral(){
    var emailsession = localStorage.getItem('emailNgulikin'),
        authsession = localStorage.getItem('authNgulikin'),
        key = '';
        
    authsession !== null ? authData.data = authsession : authData.data = '';  
    
    $('.leftHeader,#backHomeSignup,#backHomeSignin').on( 'click', function( e ){
	    location.href = url;
	    sessionStorage.removeItem('signinEmailNgulikin');
	});
	
	if(sessionStorage.getItem('tokenNgulikin') === null){
        $.getJSON(TOKEN_API, function( data ) {
	    sessionStorage.setItem('tokenNgulikin',data.result);
	    });
	}
	
	if(emailsession !== null){
        $('#menuLogin').hide();
    	$('#iconProfile').show();
    	$('#iconNotifHeader').show();
    	$('.footer-body-mid2 ul li:last-child').hide();
    	key = JSON.parse(localStorage.getItem('authNgulikin')).key;
    }else{
    	$('.footer-body-mid2 ul li:last-child').show();
    	$('#iconNotifHeader').hide();
    }
	
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
	
	categoryProduct();
	
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
                    var listcategory = '';
                	var listcategoryMain = '';
                    $.each( data.result, function( key, val ) {
                        var nameCategory = val.category_name;
                        listcategory += '<li class="grid-listmiddle-cont8" id="'+nameCategory+'" style="background-image:url('+val.category_url+')">';
                        listcategory += '<span>';
                        listcategory += '   <p>ngulikin</p>';
                        listcategory += '   <p>'+nameCategory+'</p>';
                        listcategory += '</span>';
                        listcategory += '</li>';
                            
                        listcategoryMain += '<li><a>'+nameCategory+'</a></li>';
                    });
                    $(".grid-list-cont8").html(listcategory);
                    $(".menu-category-sub-menu").html(listcategoryMain);
                }else{
                        generateToken(categoryProduct);
                }
            } 
        });
    }
}

/* content for sidebar menu and category product on home menu*/
/*function categoryProduct(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(categoryProduct);
    }else{
        $.getJSON(PRODUCT_CATEGORY_API+'?token='+sessionStorage.getItem('tokenNgulikin'), function( data ) {
            if(data.status == "OK"){
                var listcategory = '';
        	    var listcategoryMain = '';
                $.each( data.result, function( key, val ) {
                    var nameCategory = val.category_name;
                    listcategory += '<li class="grid-listmiddle-cont8" id="'+nameCategory+'" style="background-image:url('+val.category_url+')">';
                    listcategory += '<span>';
                    listcategory += '   <p>ngulikin</p>';
                    listcategory += '   <p>'+nameCategory+'</p>';
                    listcategory += '</span>';
                    listcategory += '</li>';
                    
                    listcategoryMain += '<li><a>'+nameCategory+'</a></li>';
                });
                $(".grid-list-cont8").html(listcategory);
                $(".menu-category-sub-menu").html(listcategoryMain);
            }else{
                generateToken(categoryProduct);
            }
        });
    }
}*/

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