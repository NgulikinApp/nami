<?php
    if(isset($_SESSION['user'])){
        $fullname = $_SESSION['user']["fullname"];
		$user_photo = $_SESSION['user']["user_photo"];
	}else{
		$fullname = '';
		$user_photo = '';
	}
?>
<input type="hidden" class="fullname_popup" value="<?php echo $fullname; ?>"/>
<input type="hidden" class="user_photo_popup" value="<?php echo $user_photo; ?>"/>
<div class="header">
    <header>
        <div class="leftHeader"></div>
        <div class="menu-category-wrap fn-12">
            <nav class="menu-category">
                <ul class="menu-category-clearfix">
                    <li class="current-item">
                        Category
                        <a>
                            <div class="arrow"></div>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="menu-category-search">
            <input type="text" id="search-general" placeholder="Cari Produk atau Toko"/>
            <div id="search-header"></div>
        </div>
        <div class="rightHeader">
            <div class="iconHeader tooltip fn-13" id="iconCartHeader" data-toggle="popover" data-trigger="click" data-content="1">
                <span class="tooltiptext tooltip-bottom">Keranjang Belanja</span>
                <span class="sumManinMenuCart">0</span>
            </div>
            <?php
                if(isset($_SESSION['user'])){
            ?>
                <div class="iconHeader tooltip fn-13" id="iconNotifHeader" data-toggle="popover" data-trigger="click" data-content="1">
                    <span class="tooltiptext tooltip-bottom">Notifikasi</span>
                    <span class="sumNotifinMenuCart">0</span>
                </div>
            <?php
                }
            ?>
            <div class="iconHeader tooltip fn-13" id="iconFavoritHeader">
                <span class="tooltiptext tooltip-bottom">Favorit Belanja</span>
            </div>
            <div class="textHeader fn-12">
                <?php
                    if(!isset($_SESSION['user'])){
                ?>
                <div id="menuLogin">Login</div>
                <?php
                    }
                    
                    if(isset($_SESSION['user'])){
                        if(intval($_SESSION['user']["shop_id"]) != 0){
                ?>
                <div id="iconShopTemp" data-toggle="popover" data-trigger="click" data-content="1">
                    <div id="iconShop"></div>
                    <span class="tooltiptext tooltip-bottom">Toko</span>
                </div>
                <?php
                        }
                ?>
                <div id="iconProfileTemp" data-toggle="popover" data-trigger="click" data-content="1">
                    <div id="iconProfile"></div>
                    <span class="tooltiptext tooltip-bottom">Profil</span>
                </div>
                <?php
                    }
                ?>
            </div>
            <!--<div class="iconBurger">
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
            </div>-->
        </div>
    </header>
    <div class="menu-category-sub-menu fn-12"></div>
</div>
<div class="cover-popup"></div>
<div class="cover-category hidden"></div>