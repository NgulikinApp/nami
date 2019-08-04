<div class="grid-shop-body-content discuss hidden" id="discussProductSection">
    <img src="/img/loader.gif" class="loaderImg" id="loaderProductDiscuss"/>
    <div class="grid-product-body-content-listComment"></div>
    <?php
        if(isset($_SESSION['user'])){
    ?>
            <div class="grid-product-body-content-inputComment hidden">
                <div>
                    <input type="text" id="commentDiscussProduct" placeholder="Kirim Pesan disini"/>
                </div>
                <div>
                    <input type="button" id="buttonDiscussProduct" value="Kirim"/>
                </div>
            </div>
    <?php
	    }
    ?>
</div>