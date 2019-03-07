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
    
    detailInvoice();
    
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

function detailInvoice(){
    $.ajax({
        type: 'GET',
        url: PRODUCT_CART_API,
        dataType: 'json',
        beforeSend: function(xhr, settings) { 
            xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
        },
        success: function(data, status) {
            if(data.status == "OK"){
                var response = data.result.listshops;
                $.each( response, function( key, val ) {
                    var list_products = val.products;
                    
                    var listElement = '';
                    $.each( list_products, function(keyproduct , valproduct ) {
                        listElement += '<div class="list_product_invoice">';
                        listElement += '    <div class="detail-invoice-title">';
                        listElement += '        <div class="detail-invoice-icon">';
                        listElement += '            <i class="fa fa-shopping-cart"></i>';
                        listElement += '        </div>';
                        listElement += '        <div class="detail-invoice-shopname">';
                        listElement += '            Massom';
                        listElement += '        </div>';
                        listElement += '    </div>';
                        listElement += '    <div class="detail-invoice-body">';
                        listElement += '        <div class="detail-invoice-body-content">';
                        listElement += '            <div class="disaligner">';
                        listElement += '                <img src="https://www.images.ngulikin.com/c2F0cmlhL3Byb2R1Y3QvQ0NUVl9wb3J0YWJsZV9NaWNyb19TRF9DQ1RWX21pY3JvX3NkX0NDVFZfT1VURE9PUl82MDBUVkxfY2N0LmpwZw%3D%3D" width="100" height="100"/>';
                        listElement += '            </div>';
                        listElement += '            <div class="aligner">';
                        listElement += '                <div class="brand_name">HINDIAN</div>';
                        listElement += '                <div class="product_name">Olive Wood Chair</div>';
                        listElement += '                <div class="rateyo"></div>';
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
                        listElement += '                Jumlah <span class="invoice-sum">10</span> <font class="invoice-wight">(<span>10 kg</span>)</font>';
                        listElement += '            </div>';
                        listElement += '            <div class="right">Rp 1.000.000</div>';
                        listElement += '        </div>';
                        listElement += '        <div class="grid">';
                        listElement += '            <div class="title_notes_invoice">CATATAN UNTUK PENJUAL</div>';
                        listElement += '            <div>Mohon proses secepatnya, Thank you</div>';
                        listElement += '        </div>';
                        listElement += '        <div class="grid">';
                        listElement += '            <div class="title_notes_invoice">ESTIMASI BARANG SAMPAI</div>';
                        listElement += '            <div>Rabu, 20 Desember 2018 jam 24.00 WIB</div>';
                        listElement += '        </div>';
                        listElement += '        <div class="grid">';
                        listElement += '            <div class="left">';
                        listElement += '                <div class="title_notes_invoice">JASA KURIR</div>';
                        listElement += '                <div>JNE</div>';
                        listElement += '            </div>';
                        listElement += '            <div class="right">';
                        listElement += '                <div class="title_notes_invoice">NO. RESI</div>';
                        listElement += '                <div>08898809789</div>';
                        listElement += '            </div>';
                        listElement += '        </div>';
                        listElement += '        <div class="grid history_invoice">';
                        listElement += '            HISTORI PENGIRIMAN <i class="fa fa-angle-right"></i>';
                        listElement += '        </div>';
                        listElement += '    </div>';
                        listElement += '</div>';
                    });
                    
                    $('.filled-invoice .left .list').html(listElement);
                });
            }else{
                generateToken(detailInvoice);
            }
        } 
    });
}