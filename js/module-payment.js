function initPayment(){
    sessionStorage.removeItem('paymentNgulikin');
    $('#firstAccordion, #secondAccordion, #thirdAccordion, #forthAccordion').collapse('hide');	
    $('input[name="radio"]').change( function() {
    		
    		if ($('#bankPayment').is(":checked")){
    			$('#firstAccordion').collapse('show');
    		} else {
    			$('#firstAccordion').collapse('hide');
    		}
            
    		if ($('#transportPayment').is(":checked")){
    			$('#secondAccordion').collapse('show');
    		} else {
    			$('#secondAccordion').collapse('hide');
    		}
            
            if ($('#martPayment').is(":checked")){
                $('#thirdAccordion').collapse('show');
    		}else{
    		    $('#thirdAccordion').collapse('hide');
    		}
            
            if ($('#kredivoPayment').is(":checked")){
                $('#forthAccordion').collapse('show');
    		}else{
    		    $('#forthAccordion').collapse('hide');
    		}
     });
}