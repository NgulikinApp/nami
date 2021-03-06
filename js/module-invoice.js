$( document ).ready(function() {
    initGeneral();
    initInvoice();
});

function initInvoice(){
    var currurl = window.location.href,
        invoiceno = currurl.substr(currurl.lastIndexOf('/') + 1);
    
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
    
    $('#change_transfer_invoice').on('click', function (e) {
        location.href = url+"/payment/"+invoiceno;
    });
    
    detailInvoice();
    
    $("#btn_uploadpayment").change(function(){
        uploadPayment();
    });
}

function detailInvoice(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("detailInvoice");
    }else{
        var currurl = window.location.href,
            invoiceno = currurl.substr(currurl.lastIndexOf('/') + 1);
        
        $.ajax({
            type: 'GET',
            url: PRODUCT_INVOICE_API+'/'+invoiceno,
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data, status) {
                if(data.status == "OK"){
                    if($.isEmptyObject(data.result) === false){
                        $('.grid-invoice-container:first-child').addClass('hidden');
                        $('.grid-invoice-container:last-child').removeClass('hidden');
                        
                        var response = data.result.shops,
                            listElement = '',
                            sum_product_price = 0,
                            sum_delivery_price = 0;
                        
                        $.each( response, function( key, val ) {
                            var list_products = val.products,
                                noresi = val.noresi;
                                    
                                noresi = (noresi!=='')?noresi:'-';
                                
                                listElement += '<div class="list_product_invoice">';
                                listElement += '    <div class="detail-invoice-title">';
                                listElement += '        <div class="detail-invoice-icon">';
                                listElement += '            <i class="fa fa-shopping-cart" style="color:#848484;"></i>';
                                listElement += '        </div>';
                                listElement += '        <div class="detail-invoice-shopname fn-13">'+val.shop_name+'</div>';
                                listElement += '    </div>';
                                
                                sum_delivery_price = sum_delivery_price + val.delivery_price;
                            $.each( list_products, function(keyproduct , valproduct ) {
                                    
                                listElement += '    <div class="detail-invoice-body">';
                                listElement += '        <div class="detail-invoice-body-content">';
                                listElement += '            <div class="disaligner">';
                                listElement += '                <img src="'+valproduct.image+'" width="100" height="100"/>';
                                listElement += '            </div>';
                                listElement += '            <div class="aligner">';
                                listElement += '                <div class="brand_name fn-13">'+valproduct.brand_name+'</div>';
                                listElement += '                <div class="product_name fn-13">'+valproduct.name+'</div>';
                                listElement += '                <div class="rateyo" id="product'+val.shop_id+'_'+valproduct.id+'" style="padding:0px;"></div>';
                                listElement += '            </div>';
                                listElement += '        </div>';
                                listElement += '    </div>';
                                listElement += '    <div class="detail-invoice-footer fn-13">';
                                listElement += '        <div class="detail_text">DETAIL</div>';
                                listElement += '        <div class="angle">';
                                listElement += '            <i class="fa fa-angle-up"></i>';
                                listElement += '        </div>';
                                listElement += '    </div>';
                                listElement += '    <div class="detail-invoice-footer-detail fn-13">';
                                listElement += '        <div class="grid">';
                                listElement += '            <div class="left">';
                                listElement += '                Jumlah <span class="invoice-sum">'+valproduct.sum+'</span> <font class="invoice-wight">(<span>'+valproduct.weight+' kg</span>)</font>';
                                listElement += '            </div>';
                                listElement += '            <div class="right">'+numberFormat(valproduct.price)+'</div>';
                                listElement += '        </div>';
                                listElement += '    </div>';
                                
                                sum_product_price = sum_product_price + valproduct.price;
                            });
                            
                            listElement += '    <div class="detail-invoiceshop-footer-detail fn-13">';
                            listElement += '        <div class="grid">';
                            listElement += '            <div class="title_notes_invoice">CATATAN UNTUK PENJUAL</div>';
                            listElement += '            <div>'+val.notes+'</div>';
                            listElement += '        </div>';
                            listElement += '        <div class="grid">';
                            listElement += '            <div class="title_notes_invoice">ESTIMASI BARANG SAMPAI</div>';
                            listElement += '            <div>Rabu, 20 Desember 2018 jam 24.00 WIB</div>';
                            listElement += '        </div>';
                            listElement += '        <div class="grid">';
                            listElement += '            <div class="left">';
                            listElement += '                <div class="title_notes_invoice">JASA KURIR</div>';
                            listElement += '                <div>'+val.delivery_name+'</div>';
                            listElement += '            </div>';
                            listElement += '            <div class="right">';
                            listElement += '                <div class="title_notes_invoice" style="text-align: center;">NO. RESI</div>';
                            listElement += '                <div>'+noresi+'</div>';
                            listElement += '            </div>';
                            listElement += '        </div>';
                            listElement += '        <div class="grid history_invoice">';
                            listElement += '            LIHAT HISTORI PENGIRIMAN <i class="fa fa-angle-right"></i>';
                            listElement += '        </div>';
                            listElement += '    </div>';
                            listElement += '</div>';
                        });
                        $('.filled-invoice .left .list').html(listElement);
                        
                        $('#sum_product_price').html(numberFormat(sum_product_price));
                        $('#sum_delivery_price').html(numberFormat(sum_delivery_price));
                        $('#total_price').html(numberFormat(sum_product_price+sum_delivery_price));
                        
                        var total_price = sum_product_price + sum_delivery_price;
                        $('#invoice_last_paiddate').html(data.result.invoice_last_paiddate_letter);
                        
                        $.each( response, function( key, val ) {
                            var list_products = val.products;
                            $.each( list_products, function(keyproduct , valproduct ) {
                                $("#product"+val.shop_id+"_"+valproduct.id).rateYo({rating: valproduct.rate,readOnly: true,starWidth : "13px"});
                            });
                        });
                        
                        countDown(data.result.invoice_last_paiddate);
                    }
                    $('.loaderProgress').addClass('hidden');
                    $('body').removeClass('hiddenoverflow');
                }else{
                    generateToken("detailInvoice");
                }
            } 
        });
    }
}

function countDown(last_paiddate){
    var lastDate = new Date(last_paiddate);
    // Set the date we're counting down to
    var countDownDate = lastDate.getTime();
                        
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
        document.getElementById("countdown_invoice").innerHTML = hours + " jam : " + minutes + " menit : " + seconds + " detik ";
                                
        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown_invoice").innerHTML = "KADALUARSA";
        }
    }, 1000);
}

function uploadPayment(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken("uploadPayment");
    }else{
        var currurl = window.location.href,
            invoiceno = currurl.substr(currurl.lastIndexOf('/') + 1);
        
        var data = new FormData(),
            filePath = $('#btn_uploadpayment').val(),
            fileExt = (filePath.substr(filePath.lastIndexOf('\\') + 1).split('.')[1]).toLowerCase(),
            filePhoto = $('#btn_uploadpayment')[0].files[0],
            fileSize = filePhoto.size/ 1024 / 1024;
        
        data.append('invoiceno', invoiceno);
        data.append('file', filePhoto);
        
        if(fileSize < 2){
            if(fileExt === 'jpg' || fileExt === 'png'){
                $('.loaderProgress').removeClass('hidden');
                $.ajax({
                    type: 'POST',
                    url: PRODUCT_INVOICE_SENDPROOF_API,
                    data: data,
                    async: true,
                    contentType: false, 
                    processData: false,
                    dataType: 'json',
                    beforeSend: function(xhr, settings) { 
                        xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
                    },
                    success: function(result){
                        if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                            generateToken("uploadPayment");
                        }else{
                            $('.loaderProgress').addClass('hidden');
                            notif("success","Bukti pembayaran berhasil diupload, tunggu konfirmasi kami paling lambat 1 hari","center","top");
                        }
                        
                    }
                });
            }else{
                notif("error","Format file hanya boleh jpg atau png","center","top");
            }
        }else{
            notif("error","File tidak boleh lebih dari 2 MB","center","top");
        }
    }
}