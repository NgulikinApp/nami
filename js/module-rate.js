var dataRate = [];

$( document ).ready(function() {
    initGeneral();
    initRate();
});

function initRate(){
    detail();
}

function detail(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("detail");
    }else{
        $.ajax({
            type: 'GET',
            url: PRODUCT_INVOICE_ISRATED_API,
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.status == "OK"){
                    var element = '';
                    if(data.result.length){
                        $.each( data.result, function( key, val ) {
                            element += '<div class="grid">';
                            element += '   <div class="detail">';
                            element += '       <div class="left">';
                            element += '           <img src="'+val.product_image+'"/>';
                            element += '       </div>';
                            element += '       <div class="right">';
                            element += '           <div class="head">NAMA TOKO</div>';
                            element += '           <div class="body mysales-name">'+val.shop_name+'</div>';
                            element += '       </div>';
                            element += '   </div>';
                            element += '   <div class="detail">';
                            element += '       <div class="head">NAMA BRAND</div>';
                            element += '       <div class="body bluesky">'+val.brand_name+'</div>';
                            element += '   </div>';
                            element += '   <div class="detail">';
                            element += '       <div class="head">NAMA PRODUK</div>';
                            element += '       <div class="body">'+val.product_name+'</div>';
                            element += '   </div>';
                            element += '   <div class="detail">';
                            element += '       <div class="head">PEMBAYARAN</div>';
                            element += '       <div class="body mysales-date">'+val.payment_name+'</div>';
                            element += '   </div>';
                            element += '</div>';
                            element += '<div class="grid">';
                            element += '   <div class="detail">';
                            element += '       <div class="head">NOMOR INVOICE</div>';
                            element += '       <div class="body">'+val.invoice_no+'</div>';
                            element += '   </div>';
                            element += '   <div class="detail">';
                            element += '       <div class="head">NOMOR TRANSAKSI</div>';
                            element += '       <div class="body mysales-date">'+val.notrans+'</div>';
                            element += '   </div>';
                            element += '   <div class="detail">';
                            element += '       <div class="head">TANGGAL TRANSAKSI</div>';
                            element += '       <div class="body">'+val.invoice_createdate+'</div>';
                            element += '   </div>';
                            element += '   <div class="detail">';
                            element += '       <div class="head">KURIR</div>';
                            element += '       <div class="body">'+val.delivery_name+'</div>';
                            element += '   </div>';
                            element += '</div>';
                            element += '<div class="grid">';
                            element += '    <div class="head" style="text-align: center;">Berikan Rating</div>';
                            element += '    <div class="rateyo" data-invoiceid="'+val.invoice_id+'" data-productid="'+val.product_id+'"></div>';
                            element += '</div>';
                            
                            dataRate.push({"invoice_id":val.invoice_id,"product_id":val.product_id,"rate":0});
                        });
                        
                        element += '<div class="grid" style="border-bottom: 0px;text-align: center;">';
                        element += '    <button type="button" id="buttonRate" style="width: 210px;float: inherit;">RATE</button>';
                        element += '</div>';
                        
                        $('.grid-rate-body').html(element);
                        
                        $(".rateyo").rateYo({starWidth : "40px",normalFill: "#A0A0A0",fullStar: true});
                        $(".rateyo").rateYo({fullStar: true}).on("rateyo.set", function (e, data) {
                            var invoiceid = parseInt($(this).data("invoiceid")),
                                productid = parseInt($(this).data("productid"));
                                
                            $.each( dataRate, function( keyrate, valrate ) {
                                if(valrate.invoice_id === invoiceid && valrate.product_id === productid){
                                    dataRate[keyrate]["rate"] = data.rating;
                                }
                            });
                        });
                        
                        $('#buttonRate').on('click', function (e) {
                            rateProduct();
                        });
                    }
                    $('.loaderProgress').addClass('hidden');
                }else{
                    generateToken("detail");
                }
                
            } 
        });
    }
}

function rateProduct(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("rateProduct");
    }else{
        $.ajax({
            type: 'POST',
            url: PRODUCT_INVOICE_RATE_API,
            data:JSON.stringify(dataRate),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                    generateToken("rateProduct");
                }else{
                    sessionStorage.setItem('rateNgulikin',1);
                    location.href = url;
                }
            }
        });
    }
}