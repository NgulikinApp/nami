<div class="filled-invoice">
    <div class="left">
        <div class="caption_warning">
            <img src="/img/warning.png"/>
            Lihat petunjuk pembayaran
        </div>
        <div class="title">
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
                <div class="body"><?php echo $noinvoice; ?></div>
            </div>
            <hr class="line_invoice"/>
            <div class="grid">
                <div class="left">
                    <div class="head">METODE PEMBAYARAN</div>
                    <div class="body">Transfer Bank</div>
                    <div id="change_transfer_invoice">UBAH METODE PEMBAYARAN</div>
                </div>
                <div class="right" style="min-width: 80px;box-shadow: none;">
                    <img src="/img/tahapbayar-1.png" width="80" height="80"/>
                </div>
            </div>
            <hr class="line_invoice"/>
            <div class="grid">
                <div class="head">RINCIAN PEMBAYARAN</div>
                <div class="body">
                    <div>
                        <span class="detail_payment_invoice_left">Jumlah Harga Barang</span>
                        <span class="detail_payment_invoice_right" id="sum_product_price">Rp 1.000.000</span>
                    </div>
                    <div>
                        <span class="detail_payment_invoice_left">Jumlah Biaya Pengiriman</span>
                        <span class="detail_payment_invoice_right" id="sum_delivery_price">Rp 18.000</span>
                    </div>
                    <div>
                        <span class="detail_payment_invoice_left">Total Belanja</span>
                        <span class="detail_payment_invoice_right" id="total_price">Rp 1.018.000</span>
                    </div>
                </div>
            </div>
            <hr class="line_invoice"/>
            <div class="grid">
                <div class="head">DATA PENERIMA</div>
                <div class="body data_receiver_invoice">
                    <span><img src="/img/people.png" width="10" height="10"> Agung Prabowo</span>
                    <span><img src="/img/marker.png"> jl. jaga karsa no. 59 Jakarta timur. Duren Sawit</span>
                    <span><img src="/img/hp.png"> 086664446789</span>
                    <span><img src="/img/envelope.png"> agung@gmail.com</span>
                </div>
            </div>
        </div>
        <div class="footer">
            <div>Batas Waktu Pembayaran</div>
            <div id="status_invoice">MENUNGGU PEMBAYARAN</div>
            <div id="countdown_invoice">12 jam : 45 menit : 50 detik</div>
            <div>Paling lambat <span id="invoice_last_paiddate"></span></div>
        </div>
    </div>
</div>
<div id="payment_method">
    <div>
        <div class="title">
            <div>Petunjuk Pembayaran</div>
        </div>
        <div class="content">
            <ul>
                <li>
                    <div class="no_method">1</div>
                    <div class="head">
                        <img src="/img/tahapbayar-1.png"/>
                    </div>
                    <div>
                        Transfer melalui ATM, SMS/M-Banking, atau E/Banking
                    </div>
                </li>
                <li>
                    <div class="no_method">2</div>
                    <div class="head">
                        <img src="/img/tahapbayar-2.png"/>
                    </div>
                    <div>
                        Masukan nomor rekening Ngulikin
                    </div>
                </li>
                <li>
                    <div class="no_method">3</div>
                    <div class="head">
                        <img src="/img/tahapbayar-3.png"/>
                    </div>
                    <div>
                        Masukan total bayar tepat hingga 3 digit terakhir
                    </div>
                </li>
                <li>
                    <div class="no_method">4</div>
                    <div class="head">
                        <img src="/img/tahapbayar-4.png"/>
                    </div>
                    <div>
                        Simpan bukti transfer
                    </div>
                </li>
            </ul>
        </div>
        <div class="caption">
            Pembelianmu dicatat dengan nomor tagihan pembayaran <font class="bluesky">AAAABBBBB12345</font>. Ngulikin akan melakukan verifikasi otomatis paling lama 30 menit setelah kamu melakukan pembayaran. Jika kamu menghadapi kendala mengenai pembayaran, silahkan langsung <span class="bluesky" id="contact_us">Hubungi kami di Service/FAQ NGULIKIN</span>
        </div>
    </div>
</div>