function initSignup(){
    var signinSessionEmail = sessionStorage.getItem('signinEmailNgulikin');
	if(signinSessionEmail !== null){
		$('#emailSignUp').val(signinSessionEmail).attr('disabled','disabled').css("background-color","rgba(153,153,153,0.75)");
	}
	
	$('.ui-loader,#sexSignup-button span').remove();
	$('#sexSignup-button').replaceWith(function() {
        return $('#sexSignup', this);
    });
    
    /*signup button on header menu action*/
	$('#regisPopUpSignin').on( 'click', function( e ){
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
}