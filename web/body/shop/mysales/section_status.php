<div class="title mysales">
    <div class="filterMysales textFilterShopSeller">Filter</div>
    <div class="filterMysales">
        <div class="select mysalesSender">
            <select id="filterStatusSender">
                <option>Pilih Kurir</option>
            </select>
        </div>
    </div>
    <div class="filterMysales search">
        <input type="text" id="filterMysalesInput" placeholder="Nama Pembeli / Nomor Invoice / Nomor Resi" style="width:250px;"/>
        <div id="search-mysalesorder"></div>
    </div>
</div>
<div class="order">
    <div class="status-container">
        <div class="grid">
            <div class="detail">
                <div class="left" style="vertical-align: top;margin-top: 2px;">
                    <img src="/img/people.png" style="margin: 5px 15px 0px 0px;"/>
                </div>
                <div class="right">
                    <div class="head">PEMBELI</div>
                    <div class="body">
                        <strong>Reicha Sofi</strong>
                    </div>
                </div>
            </div>
            <div class="detail">
                <div class="head">PHONE</div>
                <div class="body" id="phoneStatusMysales">
                    <strong>0857246422217</strong>
                </div>
            </div>
            <div class="detail">
                <div class="head">INVOICE</div>
                <div class="body" id="invoiceStatusMysales">
                    <strong>9999 999 999</strong>
                </div>
            </div>
            <div class="detail">
                <div class="head">TANGGAL PESANAN</div>
                <div class="body">
                    <strong>04 November 2017</strong>
                </div>
            </div>
        </div>
        <div class="grid" style="padding: 10px 45px;">
            <div class="detail" style="width: 23.4%;padding: 23px 35px;">
                <div class="head">NO. RESI</div>
                <div class="body">
                    <strong>9999 999 XX</strong>
                </div>
            </div>
            <div class="detail statusline">
                <div class="head" style="margin-bottom: 10px;">STATUS</div>
                <div class="body">
                    <div class="milestones" id="status-line"></div>
                </div>
            </div>
        </div>
        <div class="grid">
            <div class="detail">
                <div class="left">
                    <div class="head">TANGGAL PESANAN</div>
                    <div class="body">
                        <strong>04 November 2017</strong>
                    </div>
                </div>
                <div class="right">
                    <div class="time">
                        <strong>Jam 09.00</strong>
                    </div>
                </div>
            </div>
            <div class="detail statusline" id="statusOrderMysales">
                <div class="body">
                    <strong>Pesanan di proses</strong>
                </div>
            </div>
        </div>
    </div>
</div>