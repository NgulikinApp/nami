<?php
    if(isset($_SESSION['user'])){
		  $isSignin = true;
		  $fullname = $_SESSION['user']["fullname"];
		  if(intval($_SESSION['user']["shop_id"]) != 0 && $_SESSION['user']['user_seller'] == '2'){
		      $ishasShop = intval($_SESSION['user']["shop_id"]);
		  }else{
		      $ishasShop = 0;
		  }
	}else{
		  $fullname = '';
		  $isSignin = false;
		  $ishasShop = 0;
	}
?>
<input type="hidden" class="isSignin" value="<?php echo $isSignin;?>"/>
<input type="hidden" class="ishasShop" value="<?php echo $ishasShop;?>"/>
<input type="hidden" class="fullname_popup" value="<?php echo $fullname; ?>"/>