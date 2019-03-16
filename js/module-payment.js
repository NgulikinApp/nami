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
        url: PRODUCT_INVOICE_API,
        dataType: 'json',
        beforeSend: function(xhr, settings) { 
            xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
        },
        success: function(data, status) {
            if(data.status == "OK"){
                var response = data.result.listshops;
                var listElement = '';
                
                var totalPrice = 0;
                $.each( response, function( key, val ) {
                    var list_products = val.products;
                    
                    listElement += '<div class="detail-paymentSummary-body-title">';
                    listElement += '    <div id="detail-paymentSummary-icon">';
                    listElement += '        <i class="fa fa-shopping-cart"></i>';
                    listElement += '    </div>';
                    listElement += '    <div id="detail-paymentSummary-sellername">'+val.shop_name+'</div>';
                    listElement += '</div>';
                    listElement += '<div class="detail-paymentSummary-body-content">';
                    $.each( list_products, function(keyproduct , valproduct ) {
                        var second_product_style = (keyproduct === 0) ? "" : 'margin-top: 15px;border-top: 1px solid #F5F5F5;';
                        listElement += '<div style="overflow:auto;'+second_product_style+'">';
                        listElement += '    <div class="detail-paymentSummary-body-content1">';
                        listElement += '        <div class="left">';
                        listElement += '            <img src="'+valproduct.product_image+'" width="100" height="100"/>';
                        listElement += '        </div>';
                        listElement += '        <div class="right">'+valproduct.product_name+'</div>';
                        listElement += '    </div>';
                        listElement += '    <div class="detail-paymentSummary-body-content2">';
                        listElement += '        <div class="left">'+valproduct.cart_sumproduct+'</div>';
                        listElement += '    </div>';
                        listElement += '</div>';
                        
                        totalPrice = totalPrice + (valproduct.product_price * valproduct.cart_sumproduct);
                        var price = senderPriceCart(sessionStorage.getItem('cartDelivery')).toString();
                        
                        $('#sumProductSummaryCart').html(numberFormat(price));
                        var totalPriceCart = valproduct.cart_sumproduct * parseInt(totalPrice);
                        var totalShoppingCart = totalPriceCart + senderPriceCart(1);
                                
                        $('.totalPriceCart').html(numberFormat(totalPriceCart.toString()));
                        $('.totalShoppingCart').html(numberFormat(totalShoppingCart.toString()));
                    });
                    listElement += '</div>';
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