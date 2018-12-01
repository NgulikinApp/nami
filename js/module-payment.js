$( document ).ready(function() {
    initGeneral();
    initPayment();
});

function initPayment(){
    detailPayment();
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

function detailPayment(){
    $.ajax({
        type: 'GET',
        url: PRODUCT_CART_API,
        dataType: 'json',
        beforeSend: function(xhr, settings) { 
            xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
        },
        success: function(data, status) {
            if(data.status == "OK"){
                var response = data.result;
                var listElement = '';
                
                var totalPrice = 0;
                $.each( response, function( key, val ) {
                    listElement += '<div class="detail-paymentSummary-body-title">';
                    listElement += '    <div id="detail-paymentSummary-icon">';
                    listElement += '        <i class="fa fa-shopping-cart"></i>';
                    listElement += '    </div>';
                    listElement += '    <div id="detail-paymentSummary-sellername">'+val.shop_name+'</div>';
                    listElement += '</div>';
                    listElement += '<div class="detail-paymentSummary-body-content">';
                    listElement += '    <div class="detail-paymentSummary-body-content1">';
                    listElement += '        <div class="left">';
                    listElement += '            <img src="'+val.product_image+'" width="100" height="100"/>';
                    listElement += '        </div>';
                    listElement += '        <div class="right">'+val.product_name+'</div>';
                    listElement += '    </div>';
                    listElement += '    <div class="detail-paymentSummary-body-content2">';
                    listElement += '        <div class="left">'+val.sum_product+'</div>';
                    listElement += '    </div>';
                    listElement += '</div>';
                    
                    totalPrice = totalPrice + (val.product_price * val.sum_product);
                    var senderProductCart = sessionStorage.getItem('cartDelivery');
                    totalCartText(val.sum_product,totalPrice,senderProductCart);
                });
                
                $(".detail-paymentSummary-body").html(listElement);
                $('.loaderProgress').addClass('hidden');
                $('body').removeClass('hiddenoverflow');
                
                $('.detail-totalPayment-footer').on('click', function (e) {
                    location.href = url+"/invoice/1";
                });
            }else{
                generateToken(detailPayment);
            }
        } 
    });
}

function totalCartText(cartNgulikin,productPrice,senderProductCart){
    var totalPriceCart = cartNgulikin * parseInt(productPrice);
    var price = senderPriceCart(senderProductCart).toString();
        
    var totalShoppingCart = totalPriceCart + senderPriceCart(senderProductCart);
        
    $('.totalPriceCart').html(numberFormat(totalPriceCart.toString()));
    $('#sumProductSummaryCart').html(numberFormat(price));
    $('.totalShoppingCart').html(numberFormat(totalShoppingCart.toString()));
}

function senderPriceCart(val){
    var price = 0;
    if(val == '1'){
        price = 18000;
    }else{
        price = 208000;
    }
    return price;
}