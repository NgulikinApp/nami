<?php
    /*
        Function referred on : getData.php
        Used for showing callback the detail data product
    */
    function detail($stmt,$cache,$con){
        $data = array();
        
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6, $col7, $col8, $col9, $col10, $col11, $col12, $col13, $col14, $col15, $col16, $col17, $col18, $col19, $col20, $col21, $col22, $col23, $col24, $col25, $col26, $col27, $col28, $col29);
        
        $product_id = 0;
        while ($stmt->fetch()) {
            $product_id = $col1;
            $imageArray = explode(",",$col5);
            $countImage = sizeof($imageArray);
            
            if($col13 != ""){
                $icon = IMAGES_URL.'/'.urlencode(base64_encode($col3.'/shop/icon/'.$col12));
            }else{
                $icon = INIT_URL."/img/icontext.png";
            }
            
            $product_images = array();
            for($i=0;$i<$countImage;$i++){
                $image = IMAGES_URL.'/'.urlencode(base64_encode($col3.'/product/'.$imageArray[$i]));
                array_push($product_images,$image);
            }
            
            if(isset($_SESSION['user'])){
                $id = intval($_SESSION['user']["shop_id"]);
                $canbecommented = (intval($col20) == intval($id)) ? false : true;
            }else{
                $canbecommented = false;
            }
            
            $data['product_id'] = $product_id;
            $data['user_id'] = $col2;
            $data['username'] = $col3;
            $data['product_name'] = $col4;
            $data['product_price'] = $col6;
            $data['product_description'] = $col7;
            $data['product_stock'] = $col8;
            $data['product_minimum'] = $col9;
            $data['product_weight'] = $col10;
            $data['product_condition'] = $col11;
            $data['category_id'] = intval($col16);
            $data['subcategory_id'] = intval($col17);
            $data['shop_icon'] = $icon;
            $data['shop_name'] = $col13;
            $data['product_count_favorite'] = $col14;
            $data['product_average_rate'] = $col15;
            $data['product_image'] = $product_images;
            $data['product_rate_value'] = $col18;
            $data['shop_id'] = $col19;
            $data['brand_name'] = $col20;
            $data['product_level'] = $col21;
            $data['product_modifydate'] = $col22;
            $data['canbecommented'] = $canbecommented;
            $data['product_sold'] = $col23;
            $data['shop_total_brand'] = $col24;
            $data['product_seen'] = $col25;
            $data['product_total_discuss'] = $col26;
            $data['product_total_review'] = $col27;
            $data['sold_curmonth'] = $col28;
            $data['brand_id'] = $col29;
            
            setMemcached("m_p_".$col14."_".$col4,$cache,$data,86400);
        }
        
        $stmt->close();
                
        updateSeen($con,$product_id);
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
    
    function updateSeen($con,$product_id){
        $stmt = $con->prepare("UPDATE product SET product_seen=product_seen+1 where product_id=?");
            
        $stmt->bind_param("i", $product_id);
                
        $stmt->execute();
        
        $stmt->close();
    }
    
    /*
        Function referred on : actionData.php
        Used for returning the detail data of user address
        Return data:
                - user_address_id
                - address
                - provinces_id
                - regencies_id
                - districts_id
                - villages_id
    */
    function actionData($user_address_id,$address,$provinces_id,$regencies_id,$districts_id,$villages_id){
        $data = array(
                        "user_address_id"=>$user_address_id,
                        "address"=>$address,
                        "provinces_id"=>$provinces_id,
                        "regencies_id"=>$regencies_id,
                        "districts_id"=>$districts_id,
                        "villages_id"=>$villages_id
                    );
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified((object)$data);
    }
?>