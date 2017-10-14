function initRules(){
    $('.listTerms li[datainternal-id="terms"]').on('click', function (e) {
	    $('#termsMenu').show();
        $('#privacyMenu').hide();
        $('#faqMenu').hide();
        history.pushState(null, null, '/terms');
            	    
    });
    $('.listTerms li[datainternal-id="privacy"]').on('click', function (e) {
        $('#termsMenu').hide();
        $('#privacyMenu').show();
        $('#faqMenu').hide();
        history.pushState(null, null, '/privacy');
    });
    $('.listTerms li[datainternal-id="faq"]').on('click', function (e) {
        $('#termsMenu').hide();
        $('#privacyMenu').hide();
        $('#faqMenu').show();
        history.pushState(null, null, '/faq');
    });
}