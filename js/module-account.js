$( document ).ready(function() {
    initGeneral();
    initAccount();
});

function initAccount(){
    var currurl = window.location.href,
        invoiceno = currurl.substr(currurl.lastIndexOf('/') + 1);
        
    $('#accounthelp').on('click', function (e) {
	    location.href = url+"/help";
	});
	
	$('#accountfaq').on('click', function (e) {
	    location.href = url+"/faq";
	});
	
	$('.btn-account').on('click', function (e) {
	    location.href = url+"/invoice/"+invoiceno;
	});
}