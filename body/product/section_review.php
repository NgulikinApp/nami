<div class="grid-shop-body-content review hidden" id="reviewProductSection">
    <img src="/img/loader.gif" class="loaderImg" id="loaderProductReview"/>
    <div class="grid-product-body-content-listComment"></div>
    <?php
        if(isset($_SESSION['user'])){
    ?>
            <div class="grid-product-body-content-inputComment hidden">
                <div>
                    <input type="text" id="commentReviewProduct" placeholder="Kirim Pesan disini"/>
                </div>
                <div>
                    <input type="button" id="buttonReviewProduct" value="Kirim"/>
                </div>
            </div>
    <?php
	    }
    ?>
</div>