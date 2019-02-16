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
    
    var today = new Date();
    var newdate = new Date();
        newdate.setDate(today.getDate()+1);
    // Set the date we're counting down to
    var countDownDate = newdate.getTime();
    
    // Update the count down every 1 second
    var x = setInterval(function() {
    
      // Get todays date and time
      var now = new Date().getTime();
        
      // Find the distance between now and the count down date
      var distance = countDownDate - now;
        
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
      // Output the result in an element with id="demo"
      document.getElementById("countdown_invoice").innerHTML = hours + " jam "
      + minutes + " menit " + seconds + " detik ";
        
      // If the count down is over, write some text 
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown_invoice").innerHTML = "EXPIRED";
      }
    }, 1000);
}