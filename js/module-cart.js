function initCart(){
    var cartNgulikin = localStorage.getItem('cartNgulikin'),
        productPrice = "1000000";
        cartNgulikin = parseInt(cartNgulikin);
        
    var productPriceCalc = numberFormat(productPrice);
    $('.productPriceCart').html(productPriceCalc);
        
    if(cartNgulikin !== null){
        $('#cart-filledlist').show();
        $('#cart-emptylist').hide();
        $('.container').addClass('cart');
        
        $('#sumProductCart').val(cartNgulikin);
    }else{
        $('#cart-filledlist').hide();
        $('#cart-emptylist').show();
        $('.container').removeClass('cart');
    }
    
    minCart(cartNgulikin);
    
    $('.minCart button').on('click', function (e) {
        cartNgulikin = cartNgulikin - 1;
        if(cartNgulikin == 1){
            minCart(cartNgulikin);
        }
        $('#sumProductCart').val(cartNgulikin);
        
        totalCartText(cartNgulikin,productPrice,$('#senderProductCart').val());
    });
    
    $('.plusCart button').on('click', function (e) {
        cartNgulikin = cartNgulikin + 1;
        $('.minCart button').prop('disabled',false);
        $('.minCart button').css('opacity','1');
        $('#sumProductCart').val(cartNgulikin);
        $('#sumProductSummaryCart').val(cartNgulikin);
        
        totalCartText(cartNgulikin,productPrice,$('#senderProductCart').val());
    });
    
    $('#senderProductCart').on('change', function (e) {
        var price = senderPriceCart($(this).val()).toString();
        $('.senderPriceProductCart').html(numberFormat(price));
        $('#sumProductSummaryCart').html(numberFormat(price));
        
        totalCartText(cartNgulikin,productPrice,$(this).val());
    });
}

function minCart(cartNgulikin){
    if(cartNgulikin == 1){
        $('.minCart button').prop('disabled',true);
        $('.minCart button').css('opacity','0.5');
    }
}

function totalCartText(cartNgulikin,productPrice,senderProductCart){
    var totalPriceCart = cartNgulikin * parseInt(productPrice);
        
    var totalShoppingCart = totalPriceCart + senderPriceCart(senderProductCart);
        
    $('.totalPriceCart').html(numberFormat(totalPriceCart.toString()));
    $('.totalShoppingCart').html(numberFormat(totalShoppingCart.toString()));
}

function senderPriceCart(val){
    var price = 0;
    if(val == 'JNE'){
        price = 18000;
    }else{
        price = 208000;
    }
    return price;
}