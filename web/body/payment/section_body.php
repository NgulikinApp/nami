<div class="home_container">
	<section class="container">
        <div class="grid-payment-left">
            <div id="detail-paymentMethod">
                <div class="detail-paymentMethod-header">
                    Metode Pembayaran Manual
                </div>
                <div class="detail-paymentMethod-body">
                    <div class="detail-paymentMethod-body-title">
                        <div>
                            <input type="radio" name="radio" id="bcaPayment" class="radioPayment"/>
			                <label for="bcaPayment"></label>
                            <img src="/img/bca.png" width="110" height="40"/>
                        </div>
                        <div>
                            <input type="radio" name="radio" id="mandiriPayment" class="radioPayment"/>
			                <label for="mandiriPayment"></label>
                            <img src="/img/mandiri.png" width="110" height="40"/>
                        </div>
                        <div>
                            <input type="radio" name="radio" id="bniPayment" class="radioPayment"/>
			                <label for="bniPayment"></label>
                            <img src="/img/bni.png" width="110" height="40"/>
                        </div>
                    </div>
                    <div class="detail-paymentMethod-body-content">
                        <div class="detail-paymentMethod-body-content-inner">
                            <div class="detail-paymentMethod-body-content-inner-header">
                                <div class="left">
                                    <div class="content">
                                        <div>Nama Bank</div>
                                        <div>Virtual Account Permata</div>
                                    </div>
                                    <div class="content">
                                        <div>Nomor Rekening Penerima</div>
                                        <div>0000 9999 9999</div>
                                    </div>
                                </div>
                                <div class="right">
                                    <img src="/img/doku.png"/>
                                    <span id="name">Nama Penerima</span>
                                    <span>Midtrans</span>
                                </div>
                            </div>
                            <div class="detail-paymentMethod-body-content-inner-body">
                                <div id="header">Cara Transfer</div>
                                <div id="body">
                                    <ul>
                                        <li>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                                        </li>
                                        <li>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                                        </li>
                                        <li>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                                        </li>
                                        <li>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                                        </li>
                                        <li>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                                        </li>
                                        <li>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="detail-paymentMethodOthers">
                <div class="detail-paymentMethodOthers-header">
                    Metode Pembayaran Lainnya
                </div>
                <div class="detail-paymentMethodOthers-body">
                    <div class="radio col-xs-12">
                        <input type="radio" name="radio" id="bankPayment" class="radioPaymentOthers"/>
			            <label for="bankPayment"></label>
                        <img src="/img/bca.png" width="110" height="40"/>
                        <img src="/img/mandiri.png" width="110" height="40"/>
                        <img src="/img/bni.png" width="110" height="40"/>
                    </div>
        
                    <div class="col-xs-12 panel-collapse collapse in" id="firstAccordion">
                        <div>
                            Cras dictum. Pellentesque habitant morbi tristique senectus et netus
                        </div>
                    </div>
        
                    <div class="radio col-xs-12">
                        <input type="radio" name="radio" id="transportPayment" class="radioPaymentOthers"/>
			            <label for="transportPayment"></label>
                        <img src="/img/grab.png" width="110" height="40"/>
                        <img src="/img/go-jek.png" width="110" height="40"/>
                    </div>
        
                    <div class="col-xs-12 panel-collapse collapse in" id="secondAccordion">
                        <div>
                            Cras dictum. Pellentesque habitant morbi tristique senectus et netus
                        </div>
                    </div>
        
                    <div class="radio col-xs-12">
                        <input type="radio" name="radio" id="martPayment" class="radioPaymentOthers"/>
			            <label for="martPayment"></label>
                        <img src="/img/familymart.png" width="110" height="40"/>
                        <img src="/img/indomart.png" width="110" height="40"/>
                        <img src="/img/alfamart.png" width="110" height="40"/>
                    </div>
                    
                    <div class="col-xs-12 panel-collapse collapse in" id="thirdAccordion">
                        <div>
                            Cras dictum. Pellentesque habitant morbi tristique senectus et netus
                        </div>
                    </div>
                    
                    <div class="radio col-xs-12">
                        <input type="radio" name="radio" id="kredivoPayment" class="radioPaymentOthers"/>
			            <label for="kredivoPayment"></label>
                        <img src="/img/kredivo.png" width="110" height="40"/>
                    </div>
                    
                    <div class="col-xs-12 panel-collapse collapse in" id="forthAccordion">
                        <div>
                            Cras dictum. Pellentesque habitant morbi tristique senectus et netus
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid-payment-right">
            <div id="detail-paymentSummary">
                <div class="detail-paymentSummary-header" >
                    Ringkasan Belanja
                </div>
                <div class="detail-paymentSummary-body"></div>
            </div>
            <div id="detail-totalPayment">
                <div class="detail-totalPayment-header" >
                    Ringkasan Belanja
                </div>
                <div class="detail-totalPayment-body">
                    <div>
                        <span class="left">Total Harga Barang</span>
                        <span class="right totalPriceCart"></span>
                    </div>
                    <div>
                        <span class="left">Biaya Kirim</span>
                        <span class="right" id="sumProductSummaryCart"></span>
                    </div>
                    <hr/>
                    <div>
                        <span class="left">Total Belanja</span>
                        <span class="right totalShoppingCart"></span>
                    </div>
                </div>
                <div class="detail-totalPayment-footer">
                    Pilih
                </div>
            </div>
        </div>
	</section>
</div>