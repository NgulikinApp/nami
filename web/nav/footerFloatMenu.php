<div class="footerFloat">
    <nav>
        <a>
            <span>Berjualan di Ngulikin</span>
        </a>
        <a>
            <span>Blog</span>
        </a>
        <a>
            <span>Bantuan</span>
        </a>
        <?php
            if(isset($_SESSION['user'])){
        ?>
                <a>
                    <span id="track_orders">Lacak Pesanan</span>
                </a>
        <?php
            }
        ?>
    </nav>
</div>