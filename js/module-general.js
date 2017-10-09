function initGeneral(){
    var url = 'http://init.ngulikin.com';
    var urlAPI 	= 'http://api.ngulikin.com/v1/';
    
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
	
	$('#forgotPopUpSignin').on( 'click', function( e ){
	    location.href = url+"/resetpassword";
	});
	$('#activePopUpSignin').on( 'click', function( e ){
	    location.href = url+"/resend_request_email";
	});
	
	/*signin sidebar menu action*/
	$('#buttonSignIn').on( 'click', function( e ){
	   var email = $('#emailSignin').val();
	   var pass = $('#passwordSignin').val();
	   localStorage.setItem('emailNgulikin',email);
	   location.href = url;
	   //var pass = (SHA256($('#passwordSignin').val())).toUpperCase();
	   //var signFlag = $('.signFlag').val();
	   //ajax_auth(urlAPI+'user/signin',email+':'+pass,url+"/signin",signFlag);
	});
    
    $('#buttonSignIn').on( 'click', function( e ){
	   var email = $('#emailSignin').val();
	   var pass = $('#passwordSignin').val();
	   localStorage.setItem('emailNgulikin',email);
	   location.href = url;
	   //var pass = (SHA256($('#passwordSignin').val())).toUpperCase();
	   //var signFlag = $('.signFlag').val();
	   //ajax_auth(urlAPI+'user/signin',email+':'+pass,url+"/signin",signFlag);
	});
	
	$('#emailSignin,#passwordSignin').keypress(function(e) {
	    if(e.which == 13) {
    	    var email = $('#emailSignin').val();
	        var pass = $('#passwordSignin').val();
	        localStorage.setItem('emailNgulikin',email);
	        location.href = url;
	    }
	});
	
	/*signin button on header menu action*/
	$('#menuLogin,.signupBanner-footer div:nth-child(2)').on( 'click', function( e ){
	   location.href = url+"/signin";
	});
	$('#closeSignin').on( 'click', function( e ){
	   $('.cover-popup').hide();
	});
	
	/*signup button on header menu action*/
	$('#menuRegister,#regisPopUpSignin').on( 'click', function( e ){
	   location.href = url+"/signup";
	});
	$('#buttonSignup').on( 'click', function( e ){
	   var nameSignUp = $('#nameSignUp').val();
	   var emailSignUp = $('#emailSignUp').val();
	   var sexSignUp = $('input:radio[name=sexSignUp]').val();
	   var usernameSignUp = $('#usernameSignUp').val();
	   var passSignUp = (SHA256($('#passSignUp').val())).toUpperCase();
	   var dataSignUp = { 
	                        "name": nameSignUp, 
	                        "email": emailSignUp, 
	                        "username": usernameSignUp, 
	                        "password": passSignUp, 
	                        "gender": sexSignUp, 
	                        "manual": true, 
	                        "source" : "web", 
	                        "socmed" : "ngulikin", 
	                        "id_socmed": "ngulikin"
	                    };
	   var responseSignUp = ajax_json('POST',urlAPI+'user/signup',dataSignUp);
	   if(responseSignUp.success){
	       $('#alertSignUp').css('color','green').show();
	   }
	});
	$('#nameSignUp,#emailSignUp,#usernameSignUp,#passSignUp').keypress(function(e) {
	    if(e.which == 13) {
    	   var nameSignUp = $('#nameSignUp').val();
    	   var emailSignUp = $('#emailSignUp').val();
    	   var sexSignUp = $('input:radio[name=sexSignUp]').val();
    	   var usernameSignUp = $('#usernameSignUp').val();
    	   var passSignUp = (SHA256($('#passSignUp').val())).toUpperCase();
    	   var dataSignUp = { 
	                        "name": nameSignUp, 
	                        "email": emailSignUp, 
	                        "username": usernameSignUp, 
	                        "password": passSignUp, 
	                        "gender": sexSignUp, 
	                        "manual": true, 
	                        "source" : "web", 
	                        "socmed" : "ngulikin", 
	                        "id_socmed": "ngulikin"
	                    };
    	   var responseSignUp = ajax_json('POST',urlAPI+'user/signup',dataSignUp);
    	   if(responseSignUp.success){
	            $('#alertSignUp').css('color','green').show();
	       }
	    }
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
	        
            data.append('name', nameQuestion);
            data.append('email', emailQuestion);
            data.append('question', descQuestion);
            // Attach file
            data.append('file', fileQuestioner); 

	    var emailSend = ajax('POST',urlAPI+'mail/send',data);
	    if(emailSend !== ''){
	        notify({
                type: "success", //alert | success | error | warning | info
                title: "Ngulikin",
                message: "Email has been sent",
                position: {
                    x: "right", //right | left | center
                    y: "top" //top | bottom | center
                },
                icon: '<img src="img/logo_button_home.png" />', //<i>
                size: "normal", //normal | full | small
                overlay: false, //true | false
                closeBtn: true, //true | false
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
	
	$('#search-header').on( 'click', function( e ){
	   location.href = url+"/search";
	});
	
	$('#search-general').on('keydown', function (e) {
	    if (e.which == 13) {
	        location.href = url+"/search";
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
	
    $('#buttonSigninFb').on('click', function (e) {
        FB.init({
    		appId      : '1757942561184229',
    		xfbml      : true,
    		version    : 'v2.8'
    	});
    	//do the login
    	FB.login(function(response) {
    		if (response.authResponse) {
    			//user just authorized your app
    			getUserData();
    		}
    	}, {scope: 'email,public_profile', return_scopes: true});
    });
    $('.grid-list-cont4 .grid-list-cont4-item').on('click', function (e) {
        var shopTitle = $(this).find('.shopTitle').val();
        location.href = url+"/shop/"+shopTitle;
    });
    
    $('.grid-listmiddle-cont8').on('click', function (e) {
        var productTitle = $(this).attr('id');
        location.href = url+"/search/"+productTitle;
    });
    
    $('.grid_chapter_subcon').on('click', function (e) {
        var productTitle = $(this).find('.productTitle').val();
        var productCategory = $(this).find('.productCategory').val();
        location.href = url+"/product/"+productCategory+'/'+productTitle;
    });
    
    $('.grid-sub-cont9-body-list img').on('click', function (e) {
        var datainternal = $(this).attr('datainternal-id').split("~");
        location.href = url+"/product/"+datainternal[0]+'/'+datainternal[1];
    });
    
    $('#iconProfile').on( 'click', function( e ){
        location.href = url+"/profile/"+localStorage.getItem('emailNgulikin');
    });
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

var CLIENT_ID = '279558050364-cp3evjt1fi39uh82cl304vq5orqob038.apps.googleusercontent.com';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];
var SCOPES = 'https://www.googleapis.com/auth/userinfo.profile';
            
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}
        
function initClient() {
    gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
    }).then(function () {
        var authorizeButton = document.getElementById('buttonSigninGplus');
        authorizeButton.onclick = handleAuthClick;
    });
}
        
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        listLabels();
    }
}
        
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
}
        
function listLabels() {
    gapi.client.load('plus','v1', function(){
        var request = gapi.client.plus.people.get({
        	'userId': 'me'
        });
        request.execute(function(resp) {
        	localStorage.setItem('emailNgulikin', resp.emails[0].value);
        	location.href = "http://init.ngulikin.com";
        			     
        	gapi.auth2.getAuthInstance().signOut();
        });
    });
}

function getUserData() {
	FB.api('/me?fields=name,email', function(response) {
		localStorage.setItem('emailNgulikin', response.email);
        location.href = "http://init.ngulikin.com";
	});
}
 
/*window.fbAsyncInit = function() {
	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
			getUserData();
		} else {
		}
	});
};*/

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

function ajax_auth(url,data,loc,flag){
    $.ajax({
        type: 'POST',
        data: JSON.stringify({ manual: 1 }),
        crossDomain: true,
        async: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(data)),
            xhr.withCredentials = true;
        },
        url: url,
        contentType: "application/json",
        dataType: "json",
        success: function(result) {
            if(result.success){
               alert('ok');
            }else{
                if(flag == '0'){
                    var emailSession = data.split(':')[0];
                    sessionStorage.setItem('signinEmailNgulikin', emailSession);
                    location.href = loc;   
                }else{
                    $('#alertSignIn').show();
                }
            }
            
        }
    });
}
//End of ajax base function

function numberFormat(val){
    return 'Rp ' + (val).replace(/(\d)(?=(\d{3})+$)/g, "$1.");
}