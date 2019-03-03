$( document ).ready(function() {
    initGeneral();
    initRules();
});

function initRules(){
    $('.listTerms li[datainternal-id="terms"]').on('click', function (e) {
        $('.grid-rules-body .menu ul li').removeClass('rulesSelect');
        $(this).addClass('rulesSelect');
        
	    $('#termsMenu').show();
        $('#privacyMenu').hide();
        $('#faqMenu').hide();
        history.pushState(null, null, '/terms');
    });
    $('.listTerms li[datainternal-id="privacy"]').on('click', function (e) {
        $('.grid-rules-body .menu ul li').removeClass('rulesSelect');
        $(this).addClass('rulesSelect');
        
        $('#termsMenu').hide();
        $('#privacyMenu').show();
        $('#faqMenu').hide();
        history.pushState(null, null, '/privacy');
    });
    $('.listTerms li[datainternal-id="faq"]').on('click', function (e) {
        $('.grid-rules-body .menu ul li').removeClass('rulesSelect');
        $(this).addClass('rulesSelect');
        
        $('#termsMenu').hide();
        $('#privacyMenu').hide();
        $('#faqMenu').show();
        history.pushState(null, null, '/faq');
    });
}