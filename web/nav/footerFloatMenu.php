<div class="footerFloat">
    <nav>
        <?php
            if(isset($_SESSION['user']) && $_SESSION['user']['shop_id'] == 0 && $_SESSION['user']['user_seller'] != '2'){
        ?>
                <a>
                    <span id="footerSell">Berjualan di Ngulikin</span>
                </a>
        <?php
            }
        ?>
        <a>
            <span id="footerBlog">Blog</span>
        </a>
        <a>
            <span id="footerHelp">Bantuan</span>
        </a>
        <?php
            if(isset($_SESSION['user'])){
        ?>
                <a>
                    <span id="footerOrders">Lacak Pesanan</span>
                </a>
        <?php
            }
        ?>
    </nav>
</div>