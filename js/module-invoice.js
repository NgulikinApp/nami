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
                                listElement += '            <i class="fa fa-shopping-cart"></i>';
                                listElement += '        </div>';
                                listElement += '        <div class="detail-invoice-shopname">'+val.shop_name+'</div>';
                                listElement += '    </div>';
                                
                                sum_delivery_price = sum_delivery_price + val.delivery_price;
                            $.each( list_products, function(keyproduct , valproduct ) {
                                    
                                listElement += '    <div class="detail-invoice-body">';
                                listElement += '        <div class="detail-invoice-body-content">';
                                listElement += '            <div class="disaligner">';
                                listElement += '                <img src="'+valproduct.image+'" width="100" height="100"/>';
                                listElement += '            </div>';
                                listElement += '            <div class="aligner">';
                                listElement += '                <div class="brand_name">'+valproduct.brand_name+'</div>';
                                listElement += '                <div class="product_name">'+valproduct.name+'</div>';
                                listElement += '                <div class="rateyo" id="product'+val.shop_id+'_'+valproduct.id+'"></div>';
                                listElement += '            </div>';
                                listElement += '        </div>';
                                listElement += '    </div>';
                                listElement += '    <div class="detail-invoice-footer">';
                                listElement += '        <div class="detail_text">DETAIL</div>';
                                listElement += '        <div class="angle">';
                                listElement += '            <i class="fa fa-angle-up"></i>';
                                listElement += '        </div>';
                                listElement += '    </div>';
                                listElement += '    <div class="detail-invoice-footer-detail">';
                                listElement += '        <div class="grid">';
                                listElement += '            <div class="left">';
                                listElement += '                Jumlah <span class="invoice-sum">'+valproduct.sum+'</span> <font class="invoice-wight">(<span>'+valproduct.weight+' kg</span>)</font>';
                                listElement += '            </div>';
                                listElement += '            <div class="right">Rp '+valproduct.price+'</div>';
                                listElement += '        </div>';
                                listElement += '    </div>';
                                
                                sum_product_price = sum_product_price + valproduct.price;
                            });
                            
                            listElement += '    <div class="detail-invoiceshop-footer-detail">';
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
                            listElement += '            HISTORI PENGIRIMAN <i class="fa fa-angle-right"></i>';
                            listElement += '        </div>';
                            listElement += '    </div>';
                            listElement += '</div>';
                        });
                        $('.filled-invoice .left .list').html(listElement);
                        $('.data_receiver_invoice span:first-child').html('<img src="/img/people.png" width="10" height="10"> '+data.result.fullname);
                        $('.data_receiver_invoice span:nth-child(2)').html('<img src="/img/marker.png"> '+data.result.address);
                        $('.data_receiver_invoice span:nth-child(3)').html('<img src="/img/hp.png"> '+data.result.phone);
                        $('.data_receiver_invoice span:last-child').html('<img src="/img/envelope.png"> '+data.result.email);
                        
                        $('#sum_product_price').html(numberFormat(sum_product_price));
                        $('#sum_delivery_price').html(numberFormat(sum_delivery_price));
                        $('#sum_delivery_price').html(numberFormat(sum_delivery_price));
                        
                        var total_price = sum_product_price + sum_delivery_price;
                        $('#invoice_last_paiddate').html(data.result.invoice_last_paiddate_letter);
                        
                        $.each( response, function( key, val ) {
                            var list_products = val.products;
                            $.each( list_products, function(keyproduct , valproduct ) {
                                $("#product"+val.shop_id+"_"+valproduct.id).rateYo({rating: valproduct.rate,readOnly: true,starWidth : "20px"});
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
        document.getElementById("countdown_invoice").innerHTML = hours + " jam " + minutes + " menit " + seconds + " detik ";
                                
        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown_invoice").innerHTML = "KADALUARSA";
        }
    }, 1000);
}