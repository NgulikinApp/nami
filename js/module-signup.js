function initSignup(){
    var signinSessionEmail = sessionStorage.getItem('signinEmailNgulikin');
	if(signinSessionEmail !== null){
		$('#emailSignUp').val(signinSessionEmail).attr('disabled','disabled').css("background-color","rgba(153,153,153,0.75)");
	}
	
	$('.ui-loader,#sexSignup-button span').remove();
	$('#sexSignup-button').replaceWith(function() {
        return $('#sexSignup', this);
    });
}