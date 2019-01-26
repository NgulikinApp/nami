$( document ).ready(function() {
    initGeneral();
    initInvoice();
});

function initInvoice(){
    $('.loaderProgress').addClass('hidden');
    $('body').removeClass('hiddenoverflow');
    
    $(".rateyo").rateYo({rating: 4,readOnly: true,starWidth : "15px",normalFill: "white", spacing   : "10px"});
    
    $( ".detail-invoice-footer" ).click(function() {
        if($( this ).find('.fa').is('.fa-angle-up')){
            $( this ).find('.fa').removeClass('fa-angle-up');
            $( this ).find('.fa').addClass('fa-angle-down');
        }else{
            $( this ).find('.fa').removeClass('fa-angle-down');
            $( this ).find('.fa').addClass('fa-angle-up');
        }
        $(this).next().slideToggle( "slow" );
    });
}