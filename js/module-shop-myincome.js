var layerAccountBank = {};

$( document ).ready(function() {
    initGeneral();
    initShopMyincome();
});

function initShopMyincome(){
    $('#history-shop-seller').on( 'click', function( e ){
	   $('.grid-shop-seller-menu nav div').removeClass("bluesky").removeClass('border-yellow');
	   $(this).addClass("bluesky").addClass('border-yellow');
	   $(this).parent('a').css('margin-left','-5px');
	   $('.grid-shop-seller-content').addClass("hidden");
	   $('#history-shop-seller-content').removeClass("hidden");
	});
	$('#notes-shop-seller').on( 'click', function( e ){
	   $('.grid-shop-seller-menu nav div').removeClass("bluesky").removeClass('border-yellow');
	   $(this).addClass("bluesky").addClass('border-yellow');
	   $(this).parent('a').css('margin-left','-5px');
	   $('.grid-shop-seller-content').addClass("hidden");
	   $('#notes-shop-seller-content').removeClass("hidden");
	});
	
	listaccount();
	
	$('.addrec').on( 'click', function( e ){
	    layerAccountBank.action = "add";
        accountBank();
    });
    
    $('.print_income,.print_incomemonth').on( 'click', function( e ){
	    var id = (SHA256('1')).toUpperCase();
        window.open(url+'/shop/pdf/'+id, '_blank');
	});
	
	$('.grid-incomehistory-right .footer .ui-btn').text('');
	$('.ui-loader').remove();
}

function listaccount(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(listaccount);
    }else{
        $.ajax({
            type: 'GET',
            url: SHOP_ACCOUNT_API,
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.status == "OK"){
                    var listaccount = '';
                    $.each( data.result, function( key, val ) {
                        listaccount += '<div class="left">';
                        listaccount += '    <div>';
                        listaccount +=          (val.bank_name).toUpperCase();
                        listaccount += '    </div>';
                        listaccount += '</div>';
                        listaccount += '<div class="right">';
                        listaccount +=          val.account_no;
                        listaccount += '</div>';
                    });
                    $('.recbank .list').html(listaccount);
                }else{
                    generateToken(listaccount);
                }
            }
        });    
    }
}

function accountBank(){
    var accountBank = '<div class="layerPopup">';
	    accountBank += '    <div class="accountSellerContainer">';
	    accountBank += '        <div class="loaderProgress">';
        accountBank += '            <img src="/img/loader.gif" />';
        accountBank += '        </div>';
	    accountBank += '        <div class="title">Rekening Bank</div>';
	    accountBank += '        <div class="body">';
	    accountBank += '            <table>';
	    accountBank += '                <tr>';
	    accountBank += '                    <td>Nama Bank</td>';
	    accountBank += '                    <td>';
	    accountBank += '                        <div class="select" id="bankname_con">';
	    accountBank += '                            <select id="bankname"></select>';
	    accountBank += '                        </div>';
	    accountBank += '                    </td>';
	    accountBank += '                </tr>';
	    accountBank += '                <tr>';
	    accountBank += '                    <td>Nama Pemilik Rekening</td>';
	    accountBank += '                    <td><input type="text" id="recname"/></td>';
	    accountBank += '                </tr>';
	    accountBank += '                <tr>';
	    accountBank += '                    <td>Nomor Rekening</td>';
	    accountBank += '                    <td><img src="/img/bca.png" id="recbanking"/><input type="text" id="recno"/></td>';
	    accountBank += '                </tr>';
	    accountBank += '                <tr>';
	    accountBank += '                    <td>Password</td>';
	    accountBank += '                    <td><input type="password" id="recpass"/></td>';
	    accountBank += '                </tr>';
	    accountBank += '            </table>';
	    accountBank += '         </div>';
	    accountBank += '         <div class="warning">';
	    accountBank += '            <div class="note-warning"></div>';
	    accountBank += '            <div class="note-seller">Catatan Pelapak diperuntukkan bagi pelapak yang ingin memberikan catatan tambahan yang tidak terkait dengan deskripsi barang kepada calon pembeli. Catatan Pelapak tetap tunduk terhadap Aturan penggunaan Ngulikin.</div>';
	    accountBank += '         </div>';
	    accountBank += '         <div class="footer">';
	    accountBank += '            <input type="button" value="Batal" id="cancel"/>';
	    accountBank += '            <input type="button" value="Simpan" id="save"/>';
	    accountBank += '         </div>';
	    accountBank += '    </div>';
	    accountBank += '</div>';
	       
	$("body").append(accountBank);
	
	listbank();
	
	$('.accountSellerContainer .footer #cancel').on( 'click', function( e ){
	    $(".layerPopup").fadeOut();
	    $(".layerPopup").remove();
	});
	$('.accountSellerContainer .footer #save').on( 'click', function( e ){
	    actionAccount();
	});
	$('#bankname').on( 'change', function( e ){
	    var bankname_selected = $("#bankname option:selected").text();
	    $('#recbankimg').attr('src','/img/'+bankname_selected.toLowerCase()+'.png');
	});
}

function listbank(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(listbank);
    }else{
        $.ajax({
            type: 'GET',
            url: SHOP_BANK_API,
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.status == "OK"){
                    var bank_id = 0;
                    
                    var listbank = '';
                    $.each( data.result, function( key, val ) {
                        var selectedbank = (parseInt(val.bank_id) == bank_id)?'selected':'';
                        listbank += '<option value="'+val.bank_id+'" '+selectedbank+'>'+(val.bank_name).toUpperCase()+'</option>';
                    });
                    $('#bankname').append(listbank);
                    
                    $('.loaderProgress').addClass('hidden');
                }else{
                    generateToken(listbank);
                }
            }
        });    
    }
}

function actionAccount(){
    if(sessionStorage.getItem('tokenNgulikin') === null){
        generateToken(actionAccount);
    }else{
        $('.accountSellerContainer .loaderProgress').removeClass('hidden');
        
        var bank_id = $("#bankname").val(),
            account_name = $("#recname").val(),
            account_no = $('#recno').val(),
            password = $('#recpass').val(),
            bank_name = $("#bankname option:selected").text(),
            bank_icon = $('#recbanking').attr('src');
            
            password = (SHA256(password)).toUpperCase();
            
            var account_id = '0';
            if(layerAccountBank.action == 'edit'){
                var dataAccountArray = (dataAccount.data).split("~");
                account_id = dataAccountArray[0];
            }
            
        $.ajax({
            type: 'POST',
            url: SHOP_ACCOUNT_ACTION_API,
            data:JSON.stringify({ 
                    method: layerAccountBank.action,
                    bank_id : bank_id,
                    account_name : account_name,
                    account_no : account_no,
                    password : password,
                    bank_name : bank_name,
                    bank_icon : bank_icon,
                    account_id : account_id
            }),
            dataType: 'json',
            beforeSend: function(xhr, settings) { 
                xhr.setRequestHeader('Authorization','Bearer ' + btoa(sessionStorage.getItem('tokenNgulikin')));
            },
            success: function(data,status) {
                if(data.message == 'Invalid credential' || data.message == 'Token expired'){
                    generateToken(actionAccount);
                }else if(data.message == 'Password is wrong'){
                    notif("error","Password tidak benar","center","top");
                    $('.loaderProgress').addClass('hidden');
                }else{
                    listaccount();
                    
                    $(".layerPopup").fadeOut();
            	    $(".layerPopup").remove();
            	    notif("info","Data sudah disimpan","center","top");
                }
            }
        });
    }
}