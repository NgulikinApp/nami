<div class="grid-incomehistory-left">
    <div class="profile">
        <div class="left">
            <div id="photo_profile" style='background-image: url("<?php echo $_SESSION['user']["user_photo"]; ?>");'></div>
            <div id="name_profile"><?php echo $_SESSION['user']["fullname"]; ?></div>
        </div>
        <div class="right">
            <?php echo $_SESSION['user']["time_signup"]; ?>
        </div>
    </div>
    <div class="menu">
        <div class="left">
            ngulikin pay
        </div>
        <div class="right">
            atur pembayaran
        </div>
    </div>
    <div class="body">
        <div class="list-menu">
            <div class="left">
                Rp 1.000.000
            </div>
            <div class="right">
                Sudah ditransfer(hari ini)
            </div>
        </div>
        <div class="list-menu">
            <div class="left">
                Rp 1.000.000
            </div>
            <div class="right">
                Sudah ditransfer(hari ini)
            </div>
        </div>
    </div>
    <div class="footer">
        <div class="recbank">
            <div class="bluesky">rekening bank saya</div>
            <div class="list"></div>
        </div>
    </div>
    <div class="addrec bluesky">
        + Tambah Rekening Bank
    </div>
</div>
<div class="grid-incomehistory-right">
    <div class="menu">
        catatan transaksi penghasilan
    </div>
    <div class="body">
        <div class="list-menu">
            <div class="left">
                Catatan Transaksi Januari
            </div>
            <div class="right print_incomemonth">
                <img src="/img/download.png""/>
            </div>
        </div>
        <div class="list-menu">
            <div class="left">
                Catatan Transaksi Februari
            </div>
            <div class="right print_incomemonth">
                <img src="/img/download.png"/>
            </div>
        </div>
        <div class="list-menu">
            <div class="left">
                Catatan Transaksi Maret
            </div>
            <div class="right print_incomemonth">
                <img src="/img/download.png"/>
            </div>
        </div>
    </div>
    <div class="footer">
        <input type="button" value="Tampilkan Semua" id="buttonListTransactionIncome"/>
    </div>
</div>