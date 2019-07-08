<?php
    /*
        Function referred on : category.php
        Used for returning array data
    */
    function listcategory($query,$cache,$key_cache,$con){
        $data = getMemcached($key_cache,$cache);
        if($data == ''){
            $data = array();
            
            $i=1;
            $stmt = $con->prepare($query);
            $stmt->bind_param("i", $i);
            $stmt->execute();
        
            $stmt->bind_result($col1, $col2, $col3, $col4, $col5);
            
            while ($stmt->fetch()){
                $subcategory = array();
                
                $subcategory_idarray = explode(',', $col4);
                $subcategory_namearray = explode(',', $col5);
                
                $subcategory_count = count($subcategory_idarray);
                
                for($i=0;$i<$subcategory_count;$i++) //loop over values
                {
                    $subcategory[] = array(
                          "subcategory_id" => intval($subcategory_idarray[$i]),
                          "subcategory_name" => $subcategory_namearray[$i]
                        );
                }
                
                $data[] = array(
                          "category_id" => intval($col1),
                          "category_name" => $col2,
                          "category_url" => INIT_URL.'/img/category/'.$col3,
                          "subcategory" => $subcategory
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
        Function referred on : feed.php
        Used for returning array data
    */
    function feed($stmt){
        
        $data = array();
        
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6, $col7, $col8, $col9);
    
        while ($stmt->fetch()) {
            $data[] = array(
                      "product_id" => $col1,
                      "product_name" => $col3,
                      "product_image" => IMAGES_URL.'/'.urlencode(base64_encode($col2.'/product/'.$col4)),
                      "product_price" => number_format($col5, 0, '.', '.'),
                      "product_isfavorite" => $col6,
                      "shop_name" => $col7,
                      "shop_id" => $col8,
                      "product_average_rate" => $col9
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
        
        $stmt->execute();
        
        $total = 0;
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6, $col7, $col8, $col9);
        
        while ($stmt->fetch()) {
            $total = $col7;
            $data[] = array(
                            "product_id" => $col1,
                            "product_name" => $col2,
                            "product_image" => IMAGES_URL.'/'.urlencode(base64_encode($col5.'/product/'.$col3)),
                            "product_price" =>  number_format($col4, 0, '.', '.'),
                            "product_difdate" => $col6,
                            "shop_name" =>  $col8,
                            "product_average_rate" =>  $col9
                            );
        }
        
        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerifiedCalc($data,$total,$pagesize);
    }
    
    /*
        Function referred on : status.php
        Used for returning array data
    */
    function status($stmt){
        $data = array();
        
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2);
        
        while ($row = $stmt->fetch()){
            $data[] = array(
                      "status_id" => intval($col1),
                      "status_name" => $col2
                    );
        }
        
        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
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
                      "product_review_id" => $col1,
                      "user_id" => $col2,
                      "product_review_comment" => $col3,
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
                      "product_discuss_id" => $col1,
                      "user_id" => $col2,
                      "product_discuss_comment" =>  $col3,
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
        Function referred on : recommendProduct.php, othersProduct.php
        Used for returning array data
    */
    function related($stmt){
        
        $data = array();
        
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6, $col7, $col8, $col9, $col10);
    
        while ($stmt->fetch()) {
            $data[] = array(
                      "product_id" => $col1,
                      "product_name" => $col3,
                      "product_image" => IMAGES_URL.'/'.urlencode(base64_encode($col2.'/product/'.$col4)),
                      "product_price" => number_format($col5, 0, '.', '.'),
                      "product_isfavorite" => $col6,
                      "shop_name" => $col7,
                      "shop_id" => $col8,
                      "product_average_rate" => $col9,
                      "product_level" => $col10
                    );
        }
        
        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
?>