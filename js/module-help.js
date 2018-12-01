$( document ).ready(function() {
    initGeneral();
    initHelp();
});

function initHelp(){
    $('#buttonSignIn').on( 'click', function( e ){
	    asking();
	});
}

function asking(){
    var nameQuestion = $('#nameQuestion').val(),
	    emailQuestion = $('#emailQuestion').val(),
	    descQuestion = $('#descQuestion').val(),
	    fileQuestioner = $('#fileQuestioner')[0].files[0],
	    data = new FormData();
	        
	if(nameQuestion === '' || emailQuestion === '' || descQuestion === ''){
	    $('.error_message').show();
	    $('.error_message').html('Nama, email, dan pertanyaan harus diisi');
	}else if(!validateEmail(emailQuestion)){
	    $('.error_message').show();
	    $('.error_message').html('Format email tidak benar');
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
                    notif(status_email,message_email,"right","bottom");
                    
                    $('.error_message').show();
	                $('.error_message').html(message_email);
	                
	                if(result.status == "OK")
	                    $('.error_message').addClass('green');
                }
            });
        }
	}
}