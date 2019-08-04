<div class="grid-shop-body-content review hidden" id="reviewShopSection">
    <img src="../img/loader.gif" class="loaderImg" id="loaderShopReview"/>
    <div class="grid-shop-body-content-listComment"></div>
    <?php
        if(isset($_SESSION['user'])){
    ?>
            <div class="grid-shop-body-content-inputComment hidden">
                <div>
                    <input type="text" id="commentReviewShop" placeholder="Kirim Pesan disini"/>
                </div>
                <div>
                    <input type="button" id="buttonReviewShop" value="Kirim"/>
                </div>
            </div>
    <?php
	    }
    ?>
</div>