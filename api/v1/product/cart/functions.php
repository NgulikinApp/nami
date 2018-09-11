<?php
    /*
        Function referred on : module-product.js,module-home.js
        Used for calling the json data 
        Return data:
                - user_id
                - product_id
                - sum
    */
    function addtocart($user_id,$product_id,$sum){
        $data = array(
                        "user_id"=>$user_id,
                        "product_id"=>$product_id,
                        "sum"=>$sum,
                        "date"=>date('H:i').' WIB'
                    );
        if(!isset($_SESSION['productcart'])){
            $_SESSION['productcart'] = array($data);
        }else{
            $productcart = $_SESSION['productcart'];
            if(!in_array($product_id, array_column($productcart, 'product_id'))) {
               array_push($productcart,$data);
               $_SESSION['productcart'] = $productcart;
            }else{
                $i=0;
                foreach($productcart as $value){
                    if($value['product_id'] == $product_id){
                        $productcart[$i]['sum'] = $sum;
                        $_SESSION['productcart'] = $data;
                        break;
                    }
                    $i++;
                }
            }
        }        
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
    
    /*
        Function referred on : module-cart.js
        Used for calling the json data 
        Return data:
                - user_id
                - product_id
                - sum
    */
    function feed($stmt){
        
        $data = array();
        
        if(isset($_SESSION['user'])){
            while ($row = $stmt->fetch_object()) {
                $data[] = array(
                          "product_id" => $row->product_id,
                          "product_name" => $row->product_name,
                          "product_image" => IMAGES_URL.'/'.urlencode(base64_encode($row->username.'/product/'.$row->product_image)),
                          "brand_name" => $row->brand_name,
                          "sum_product" => $row->sum_product,
                          "cart_createdate" => $row->cart_adddate,
                          "shop_name" => $row->shop_name,
                          "product_price" => $row->product_price
                        );
            }
        }else{
            $dataArray = $_SESSION['productcart'];
            $i=0;
            while ($row = $stmt->fetch_object()) {
                $data[] = array(
                          "product_id" => $row->product_id,
                          "product_name" => $row->product_name,
                          "product_image" => IMAGES_URL.'/'.urlencode(base64_encode($row->username.'/product/'.$row->product_image)),
                          "brand_name" => $row->brand_name,
                          "sum_product" => $dataArray[$i]['sum'],
                          "cart_createdate" => $dataArray[$i]['date'],
                          "shop_name" => $row->shop_name,
                          "product_price" => $row->product_price
                        );
                $i++;
            }
        }
        
        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
?>