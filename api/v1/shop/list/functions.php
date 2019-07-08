<?php
    /*
        Function referred on : feed.php
        Used for showing callback data the feed of shoping in landing page
    */
    function feed($stmt){
        
        $data = array();
        
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3, $col4);
        
        while ($stmt->fetch()) {
            if($col3 != ""){
                $icon = IMAGES_URL.'/'.urlencode(base64_encode($col4.'/shop/icon/'.$col3));
            }else{
                $icon = INIT_URL."/img/icontext.png";
            }
            
            $data[] = array(
                      "shop_id" => $col1,
                      "shop_name" => $col2,
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
        
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6);
        
        while ($stmt->fetch()) {
            $total = $col6;
                        
            if($col3 == ''){
                $icon = "https://s4.bukalapak.com/img/409311077/s-194-194/TV_LED_Sharp_24__LC_24LE170i.jpg";
            }else{
                $icon = IMAGES_URL.'/'.urlencode(base64_encode($col4.'/shop/icon/'.$col3));
            }
                        
            $data[] = array(
                            "shop_id" => $col1,
                            "shop_name" => $col2,
                            "shop_icon" =>  $icon,
                            "shop_difdate" => $col5
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
        
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6, $col7, $col8);
        
        while ($stmt->fetch()) {
            $total = $col5;
            $data[] = array(
                      "product_id" => $col1,
                      "product_name" => $col2,
                      "product_image" => IMAGES_URL.'/'.urlencode(base64_encode($col4.'/product/'.$col3)),
                      "product_price" => number_format($col6, 0, '.', '.'),
                      "shop_name" => $col7,
                      "product_average_rate" => $col8
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
        
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6, $col7);
        
        while ($stmt->fetch()) {
            $total = $col7;
            if($col5 != "no-photo.jpg"){
                $icon = IMAGES_URL.'/'.urlencode(base64_encode($col4.'/'.$col5));
            }else{
                $icon = INIT_URL."/img/".$col5;
            }
            
            $data[] = array(
                      "shop_review_id" => $col1,
                      "user_id" => $col2,
                      "shop_review_comment" => $col3,
                      "user_photo" => $icon,
                      "username" => $col4,
                      "comment_date" => $col6
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
        
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6, $col7, $col8, $col9, $col10, $col11, $col12, $col13, $col14, $col15);
        
        $total = 0;
        while ($stmt->fetch()) {
            $reply_comments = array();
            
            if($col8 != ''){
                $reply_user_idarray = explode('~', $col8);
                $reply_fullnamearray = explode('~', $col9);
                $reply_photoarray = explode('~', $col10);
                $reply_commentarray = explode('~', $col11);
                $reply_comment_datearray = explode('~', $col12);
                $reply_usernamearray = explode('~', $col13);
                
                $reply_user_id_count = count($reply_user_idarray);
                
                for($i=0;$i<$reply_user_id_count;$i++) //loop over values
                {
                    if($reply_photoarray[$i] != "no-photo.jpg"){
                        $icon_reply = IMAGES_URL.'/'.urlencode(base64_encode($reply_usernamearray[$i].'/'.$reply_photoarray[$i]));
                    }else{
                        $icon_reply = INIT_URL."/img/".$reply_photoarray[$i];
                    }
                    
                    $isseller = ($col15 == $reply_user_idarray[$i]) ? true : false;
                    
                    $reply_comments[] = array(
                          "user_id" => $reply_user_idarray[$i],
                          "fullname" => $reply_fullnamearray[$i],
                          "user_photo" => $icon_reply,
                          "comment" => $reply_commentarray[$i],
                          "comment_date" => $reply_comment_datearray[$i],
                          "isseller" => $isseller
                        );
                }
            }
        
            $total = $col7;
            if($col5 != "no-photo.jpg"){
                $icon = IMAGES_URL.'/'.urlencode(base64_encode($col4.'/'.$col5));
            }else{
                $icon = INIT_URL."/img/".$col5;
            }
            
            $data[] = array(
                      "shop_discuss_id" => $col1,
                      "user_id" => $col2,
                      "shop_discuss_comment" =>  $col3,
                      "user_photo" => $icon,
                      "fullname" => $col14,
                      "comment_date" => $col6,
                      "reply_comments" => $reply_comments
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

        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6);
        
        while ($stmt->fetch()) {
            if($col1 != ''){
               $data[] = array(
                      "brand_id" => $col1,
                      "brand_name" => $col2,
                      "brand_image" => IMAGES_URL.'/'.urlencode(base64_encode($col4.'/brand/'.$col3)),
                      "shop_current_brand" => $col5,
                      "shop_total_brand" => $col6
                    ); 
            }
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
    function bank($query,$cache,$key_cache,$con){
        $data = getMemcached($key_cache,$cache);
        if($data == ''){
            $data = array();
            
            $i=1;
            $stmt = $con->prepare($query);
            $stmt->bind_param("i", $i);
            $stmt->execute();
            
            $stmt->bind_result($col1, $col2, $col3);
            
            while ($stmt->fetch()) {
                $data[] = array(
                          "bank_id" => $col1,
                          "bank_name" => $col2,
                          "bank_icon" =>  INIT_URL."/img/".$col3
                        );
            }
            
            setMemcached($key_cache,$cache,$data,0);
            $stmt->close();
        }
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
    
    /*
        Function referred on : account.php
        Used for showing callback data the feed of account
    */
    function account($query,$cache,$key_cache,$con,$user_id){
        $data = getMemcached($key_cache,$cache);
        if($data == ''){
            $data = array();
            
            $stmt = $con->prepare($query);
            $stmt->bind_param("s", $user_id);
            $stmt->execute();
            
            $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6);
            
            while ($stmt->fetch()) {
                $data[] = array(
                          "account_id" => $col1,
                          "account_name" => $col2,
                          "account_no" => $col3,
                          "bank_name" => $col4,
                          "bank_icon" =>  "/img/".$col5,
                          "bank_id" => $col6
                        );
            }
            
            setMemcached($key_cache,$cache,$data,0);
            $stmt->close();
        }
        
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
        
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3, $col4);
        
        while ($stmt->fetch()) {
            if (in_array($col1, $delivery_array)) {
                $is_choose = true;
            } else {
                $is_choose = false;
            }
            $datalist[] = array(
                      "delivery_id" => $col1,
                      "delivery_icon" => $col2,
                      "is_choose" => $is_choose,
                      "delivery_ismid" => $col3,
                      "delivery_name" => $col4
                    );
        }
        
        $stmt->close();
        
        $stmtdel->execute();
        
        $stmtdel->bind_result($col1);
        
        $stmtdel->fetch();
        
        $modify_date = $col1;
        
        $data = array(
                        "modify_date" => $modify_date,
                        "list" => $datalist
                    );
        
        $stmtdel->close();
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified((object)$data);
    }
?>