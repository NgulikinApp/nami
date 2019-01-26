<div class="grid-shop-body-content discuss hidden" id="discussShopSection">
    <img src="../img/loader.gif" class="loaderImg" id="loaderShopDiscuss"/>
    <div class="grid-shop-body-content-listComment"></div>
    <?php
        if(isset($_SESSION['user'])){
    ?>
            <div class="grid-shop-body-content-inputComment hidden">
                <div>
                    <input type="text" id="commentDiscussShop" placeholder="Kirim Pesan disini"/>
                </div>
                <div>
                    <input type="button" id="buttonDiscussShop" value="Kirim"/>
                </div>
            </div>
    <?php
	    }
    ?>
</div>