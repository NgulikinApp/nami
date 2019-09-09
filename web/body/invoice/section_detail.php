<div class="filled-invoice">
    <div class="left">
        <div class="caption_warning fn-13">
            <img src="/img/warning.png"/>
            Lihat petunjuk pembayaran
        </div>
        <div class="title fn-15">
            Daftar Pembelian
        </div>
        <div class="body list"></div>
    </div>
    <div class="right">
        <div class="content">
            <div class="title">
                DETAIL TRANSAKSI
            </div>
            <div class="grid">
                <div class="head">NOMOR TAGIHAN</div>
                <div class="body fn-15"><?php echo $noinvoice; ?></div>
            </div>
            <hr class="line_invoice"/>
            <div class="grid">
                <div class="left">
                    <div class="head">METODE PEMBAYARAN</div>
                    <div class="body">Transfer Bank</div>
                    <div id="change_transfer_invoice" class="fn-13">UBAH METODE PEMBAYARAN</div>
                </div>
                <div class="right" style="min-width: 80px;box-shadow: none;">
                    <img src="/img/tahapbayar-1.png" width="80" height="80"/>
                </div>
            </div>
            <hr class="line_invoice"/>
            <div class="grid">
                <div class="head fn-13" style="color: #005080;">RINCIAN PEMBAYARAN</div>
                <div class="body">
                    <div>
                        <span class="detail_payment_invoice_left">Jumlah Harga Barang</span>
                        <span class="detail_payment_invoice_right" id="sum_product_price"></span>
                    </div>
                    <div>
                        <span class="detail_payment_invoice_left">Jumlah Biaya Pengiriman</span>
                        <span class="detail_payment_invoice_right" id="sum_delivery_price"></span>
                    </div>
                    <div>
                        <span class="detail_payment_invoice_left" id="total_pricetext">Total Belanja</span>
                        <span class="detail_payment_invoice_right" id="total_price"></span>
                    </div>
                </div>
            </div>
            <hr class="line_invoice"/>
        </div>
        <div class="footer">
            <div id="text_invoice" class="fn-13">WAKTU UPLOAD BUKTI PEMBAYARAN</div>
            <div id="countdown_invoice" class="fn-32"></div>
            <div class="fn-13">Batas Waktu Pembayaran</div>
            <div class="fn-13" style="font-family: proxima_nova_altbold;">Paling lambat <span id="invoice_last_paiddate"></span></div>
            <label for="btn_uploadpayment" class="fn-13 btn_uploadproof">
                UPLOAD BUKTI TRANSFER
            </label>
            <input type="file" id="btn_uploadpayment"/>
        </div>
    </div>
</div>
<div id="payment_method">
    <div>
        <div class="title fn-15">
            <div>Petunjuk Pembayaran</div>
        </div>
        <div class="content">
            <ul>
                <li>
                    <div class="no_method fn-15">1</div>
                    <div class="head">
                        <img src="/img/tahapbayar-1.png"/>
                    </div>
                    <div class="fn-13">
                        Transfer melalui ATM, SMS/M-Banking, atau E/Banking
                    </div>
                </li>
                <li>
                    <div class="no_method fn-15">2</div>
                    <div class="head">
                        <img src="/img/tahapbayar-2.png"/>
                    </div>
                    <div class="fn-13">
                        Masukan nomor rekening Ngulikin
                    </div>
                </li>
                <li>
                    <div class="no_method fn-15">3</div>
                    <div class="head">
                        <img src="/img/tahapbayar-3.png"/>
                    </div>
                    <div class="fn-13">
                        Masukan total bayar tepat hingga 3 digit terakhir
                    </div>
                </li>
                <li>
                    <div class="no_method fn-15">4</div>
                    <div class="head">
                        <img src="/img/tahapbayar-4.png"/>
                    </div>
                    <div class="fn-13">
                        Simpan bukti transfer
                    </div>
                </li>
            </ul>
        </div>
        <div class="caption fn-13">
            Pembelianmu dicatat dengan nomor tagihan pembayaran <font class="bluesky">AAAABBBBB12345</font>. Ngulikin akan melakukan verifikasi otomatis paling lama 30 menit setelah kamu melakukan pembayaran. Jika kamu menghadapi kendala mengenai pembayaran, silahkan langsung <span class="bluesky" id="contact_us">Hubungi kami di Service/FAQ NGULIKIN</span>
        </div>
    </div>
</div>