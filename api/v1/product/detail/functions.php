<?php
    /*
        Function referred on : getData.php
        Used for showing callback the detail data product
    */
    function detail($stmt){
        $data = array();
    
        while ($row = $stmt->fetch_object()) {
            $imageArray = explode(",",$row->product_image);
            $countImage = sizeof($imageArray);
            
            if($row->shop_icon != ""){
                $icon = IMAGES_URL.'/'.urlencode(base64_encode($row->username.'/shop/icon/'.$row->shop_icon));
            }else{
                $icon = INIT_URL."/img/icontext.png";
            }
            
            $product_images = array();
            for($i=0;$i<$countImage;$i++){
                $image = IMAGES_URL.'/'.urlencode(base64_encode($row->username.'/product/'.$imageArray[$i]));
                array_push($product_images,$image);
            }
            $data['product_id'] = $row->product_id;
            $data['user_id'] = $row->user_id;
            $data['username'] = $row->username;
            $data['product_name'] = $row->product_name;
            $data['product_price'] = $row->product_price;
            $data['product_description'] = $row->product_description;
            $data['product_rate'] = $row->product_rate;
            $data['product_stock'] = $row->product_stock;
            $data['product_minimum'] = $row->product_minimum;
            $data['product_weight'] = $row->product_weight;
            $data['product_condition'] = $row->product_condition;
            $data['category_name'] = $row->category_name;
            $data['shop_icon'] = $icon;
            $data['shop_name'] = $row->shop_name;
            $data['product_count_favorite'] = $row->product_count_favorite;
            $data['product_average_rate'] = $row->product_average_rate;
            $data['product_israte'] = $row->product_israte;
            $data['product_image'] = $product_images;
            $data['product_rate_value'] = $row->product_rate_value;
        }
        
        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified((object)$data);
    }
    
    /*
        Function referred on : actionData.php
        Used for returning the detail data product
        Return data:
                - product_id
                - product_name
                - product_description
                - product_price
                - product_weight
                - product_stock
                - product_minimum
                - product_condition
    */
    function actionData($product_name,$product_description,$product_price,$product_weight,$product_stock,$product_minimum,$product_condition,$product_id){
        $data = array(
                        "product_id"=>$product_id,
                        "product_name"=>$product_name,
                        "product_description"=>$product_description,
                        "product_price"=>$product_price,
                        "product_weight"=>$product_weight,
                        "product_stock"=>$product_stock,
                        "product_minimum"=>$product_minimum,
                        "product_condition"=>$product_condition
                    );
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified((object)$data);
    }
?>