<?php
    /*
        Function referred on : feed.php
        Used for showing callback data the feed of shoping in landing page
    */
    function feed($stmt){
        
        $data = array();
    
        while ($row = $stmt->fetch_object()) {
            if($row->shop_icon != ""){
                $icon = IMAGES_URL.'/'.urlencode(base64_encode($row->username.'/shop/icon/'.$row->shop_icon));
            }else{
                $icon = INIT_URL."/img/icontext.png";
            }
            
            $data[] = array(
                      "shop_id" => $row->shop_id,
                      "shop_name" => $row->shop_name,
                      "shop_icon" =>  $icon
                    );
        }
        
        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
    
    /*
        Function referred on : favorite.php
        Used for returning array data
    */
    function favorite($stmt,$pagesize){
        $data = array();
        $total = 0;
        while ($row = $stmt->fetch_object()) {
            $total = $row->count_shop;
                        
            if($row->shop_icon == ''){
                $icon = "https://s4.bukalapak.com/img/409311077/s-194-194/TV_LED_Sharp_24__LC_24LE170i.jpg";
            }else{
                $icon = IMAGES_URL.'/'.urlencode(base64_encode($row->username.'/shop/icon/'.$row->shop_icon));
            }
                        
            $data[] = array(
                            "shop_id" => $row->shop_id,
                            "shop_name" => $row->shop_name,
                            "shop_icon" =>  $icon,
                            "shop_difdate" => $row->shop_difdate
                        );
        }
        
        $stmt->close();
            
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerifiedCalc($data,$total,$pagesize);
    }
    
    /*
        Function referred on : product.php
        Used for returning array data
    */
    function product($stmt,$pagesize){
        $data = array();
        
        $total = 0;
        while ($row = $stmt->fetch_object()) {
            $total = $row->shop_total_product;
            $data[] = array(
                      "product_id" => $row->product_id,
                      "product_name" => $row->product_name,
                      "product_image" => IMAGES_URL.'/'.urlencode(base64_encode($row->username.'/product/'.$row->product_image)),
                      "product_price" => $row->product_price,
                    );
        }
        
        $stmt->close();
            
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerifiedCalc($data,$total,$pagesize);
    }
    
    /*
        Function referred on : review.php
        Used for returning array data
    */
    function review($stmt,$pagesize){
        $data = array();
        
        $total = 0;
        while ($row = $stmt->fetch_object()) {
            $total = $row->shop_total_review;
            if($row->user_photo != "no-photo.jpg"){
                $icon = IMAGES_URL.'/'.urlencode(base64_encode($row->username.'/'.$row->user_photo));
            }else{
                $icon = INIT_URL."/img/".$row->user_photo;
            }
            
            $data[] = array(
                      "shop_review_id" => $row->shop_review_id,
                      "user_id" => $row->user_id,
                      "shop_review_comment" => $row->shop_review_comment,
                      "user_photo" => $icon,
                      "fullname" => $row->fullname,
                      "comment_date" => $row->comment_date
                    );
        }
        
        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerifiedCalc($data,$total,$pagesize);
    }
    
    /*
        Function referred on : discuss.php
        Used for returning array data
    */
    function discuss($stmt,$pagesize){
        $data = array();
        
        $total = 0;
        while ($row = $stmt->fetch_object()) {
            $total = $row->shop_total_discuss;
            if($row->user_photo != "no-photo.jpg"){
                $icon = IMAGES_URL.'/'.urlencode(base64_encode($row->username.'/'.$row->user_photo));
            }else{
                $icon = INIT_URL."/img/".$row->user_photo;
            }
            
            $data[] = array(
                      "shop_discuss_id" => $row->shop_discuss_id,
                      "user_id" => $row->user_id,
                      "shop_discuss_comment" =>  $row->shop_discuss_comment,
                      "user_photo" => $icon,
                      "fullname" => $row->fullname,
                      "comment_date" => $row->comment_date
                    );
        }
        
        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerifiedCalc($data,$total,$pagesize);
    }
    
    /*
        Function referred on : brand.php
        Used for returning array data
    */
    function brand($stmt){
        $data = array();
        
        $total = 0;
        while ($row = $stmt->fetch_object()) {
            $data[] = array(
                      "brand_id" => $row->brand_id,
                      "brand_name" => $row->brand_name,
                      "brand_image" => IMAGES_URL.'/'.urlencode(base64_encode($row->username.'/brand/'.$row->brand_image)),
                      "shop_current_brand" => $row->shop_current_brand,
                      "shop_total_brand" => $row->shop_total_brand
                    );
        }
        
        $stmt->close();
            
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
    
    /*
        Function referred on : bank.php
        Used for showing callback data the feed of bank
    */
    function bank($stmt){
        $data = array();
    
        while ($row = $stmt->fetch_object()) {
            $data[] = array(
                      "bank_id" => $row->bank_id,
                      "bank_name" => $row->bank_name,
                      "bank_icon" =>  INIT_URL."/img/".$row->bank_icon
                    );
        }
        
        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
    
    /*
        Function referred on : account.php
        Used for showing callback data the feed of account
    */
    function account($stmt){
        $data = array();
    
        while ($row = $stmt->fetch_object()) {
            $data[] = array(
                      "account_id" => $row->account_id,
                      "account_name" => $row->account_name,
                      "account_no" => $row->account_no,
                      "bank_name" => $row->bank_name,
                      "bank_icon" =>  "/img/".$row->bank_icon,
                      "bank_id" => $row->bank_id
                    );
        }
        
        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
    
    /*
        Function referred on : delivery.php
        Used for showing callback data the feed of delivery
    */
    function delivery($stmt,$stmtdel,$delivery_id,$shop_id){
        $delivery_array = explode(',',$delivery_id);
        
        $datalist = array();
    
        while ($row = $stmt->fetch_object()) {
            if (in_array($row->delivery_id, $delivery_array)) {
                $is_choose = true;
            } else {
                $is_choose = false;
            }
            $datalist[] = array(
                      "delivery_id" => $row->delivery_id,
                      "delivery_icon" => $row->delivery_icon,
                      "is_choose" => $is_choose,
                      "delivery_ismid" => $row->delivery_ismid,
                      "delivery_name" => $row->delivery_name
                    );
        }
        
        $rowdel = $stmtdel->fetch_object();
        
        $modify_date = $rowdel->modify_date;
        
        $data = array(
                        "modify_date" => $modify_date,
                        "list" => $datalist
                    );
        
        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified((object)$data);
    }
?>