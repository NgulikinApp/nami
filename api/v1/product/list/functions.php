<?php
    /*
        Function referred on : category.php
        Used for returning array data
    */
    function listcategory($stmt,$cache){
        $data = array();
        
        while ($row = $stmt->fetch_object()){
            $subcategory = array();
            
            $subcategory_idarray = explode(',', $row->subcategory_id);
            $subcategory_namearray = explode(',', $row->subcategory_name);
            
            $subcategory_count = count($subcategory_idarray);
            
            for($i=0;$i<$subcategory_count;$i++) //loop over values
            {
                $subcategory[] = array(
                      "subcategory_id" => intval($subcategory_idarray[$i]),
                      "subcategory_name" => $subcategory_namearray[$i]
                    );
            }
            
            $data[] = array(
                      "category_id" => intval($row->category_id),
                      "category_name" => $row->category_name,
                      "category_url" => INIT_URL.'/img/category/'.$row->category_icon,
                      "subcategory" => $subcategory
                    );
        }
        
        $stmt->close();
        
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
    
        while ($row = $stmt->fetch_object()) {
            $data[] = array(
                      "product_id" => $row->product_id,
                      "product_name" => $row->product_name,
                      "product_image" => IMAGES_URL.'/'.urlencode(base64_encode($row->username.'/product/'.$row->product_image)),
                      "product_price" => number_format($row->product_price, 0, '.', '.'),
                      "product_isfavorite" => $row->product_isfavorite,
                      "shop_name" => $row->shop_name
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
        
        while ($row = $stmt->fetch_object()) {
                $total = $row->count_product;
                $data[] = array(
                            "product_id" => $row->product_id,
                            "product_name" => $row->product_name,
                            "product_image" => IMAGES_URL.'/'.urlencode(base64_encode($row->username.'/product/'.$row->product_image)),
                            "product_price" =>  $row->product_price,
                            "product_difdate" => $row->product_difdate,
                            "shop_name" =>  $row->shop_name
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
        
        while ($row = $stmt->fetch_object()){
            $data[] = array(
                      "status_id" => intval($row->status_id),
                      "status_name" => $row->status_name
                    );
        }
        
        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
?>