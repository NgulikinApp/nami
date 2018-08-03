<?php
    /*
        Function referred on : category.php
        Used for returning array data
    */
    function listcategory($stmt,$cache){
        $data = array();
        
        while ($row = $stmt->fetch_object()){
            $data[] = array(
                      "category_id" => intval($row->category_id),
                      "category_name" => $row->category_name,
                      "category_url" => INIT_URL.'/img/category/'.$row->category_icon
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
                      "product_isfavorite" => $row->product_isfavorite
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
                            "product_difdate" => $row->product_difdate
                            );
        }
        
        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerifiedCalc($data,$total,$pagesize);
    }
?>