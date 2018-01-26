function initProfile(){
    var url = "http://init.ngulikin.com",
        emailsession = localStorage.getItem('emailNgulikin');
    
    $( "#accordionMyprofile" ).accordion();
    if(emailsession === null){
        location.href = url;
    }
    
    $('#logouttab').on( 'click', function( e ){
        localStorage.removeItem('emailNgulikin');
        sessionStorage.setItem("logoutNgulikin", 1);
        sessionStorage.removeItem('authNgulikin');
        location.href = url;
    });
    
    $('#myaccounttab').on( 'click', function( e ){
        $('.myprofile').removeClass('active');
        $('#myaccount').addClass('active');
    });
    
    $('#changepasswordtab').on( 'click', function( e ){
        $('.myprofile').removeClass('active');
        $('#changepassword').addClass('active');
    });
    
    $('#accordionMyprofile h3').on( 'click', function( e ){
        $('#accordionMyprofile h3').css('background-image','url(/img/arrow_down.png)');
        $(this).css('background-image','url(/img/arrow_up.png)');
    });
    
    $("#filesPrivate").change(function(){
        readURL(this);
    });
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $("#previewImagePrivate").attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}