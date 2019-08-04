<?php
    /*
        Function referred on : module-product.js,module-home.js
        Used for calling the json data 
        Return data:
                - user_id
                - product_id
                - sum
                - date
    */
    function addtocart($user_id,$shop_id,$product_id,$sum,$con){
        $date = date('H:i').' WIB';
        $data = array(
                        "user_id"=>$user_id,
                        "shop_id"=>$shop_id,
                        "product_id"=>$product_id,
                        "sum"=>$sum,
                        "date"=>$date
                    );
        if(isset($_SESSION['user'])){
            $stmt = $con->prepare("UPDATE cart SET cart_isactive='0' WHERE user_id=? AND product_id=?");
            
            $stmt->bind_param("ss", $user_id,$product_id);
                
            $stmt->execute();
            
            $stmt->close();
            
            $stmt = $con->prepare("INSERT INTO cart(user_id,shop_id,product_id,cart_sumproduct,cart_adddate) VALUES(?,?,?,?,?)");
                
            $stmt->bind_param("siiis", $user_id,$shop_id,$product_id,$sum,$date);
                
            $stmt->execute();
                
            $stmt->close();
        }else{
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
    function feed($stmt,$con){
        
        $data = array();
        $dataShops = array();
        $dataDelivery = array();
        
        $totalproduct = 0;
        
        if(isset($_SESSION['user'])){
            $stmt->execute();
            
            $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6, $col7, $col8, $col9, $col10, $col11, $col12, $col13, $col14);
            
            while ($stmt->fetch()) {
                $dataProduct = array();
                
                $dataDelivery[] = $col8;
                
                $product_idarray = explode('~', $col1);
                $product_namearray = explode('~', $col2);
                $brand_namearray = explode('~', $col3);
                $product_imagearray = explode('~', $col4);
                $product_pricearray = explode('~', $col7);
                $product_weightarray = explode('~', $col13);
                $product_stockarray = explode('~', $col14);
                $cart_sumproductarray = explode('~', $col10);
                $cart_adddatearray = explode('~', $col11);
                
                $product_count = count($product_idarray);
                
                for($i=0;$i<$product_count;$i++) //loop over values
                {
                    
                    $totalproduct++;
                    $dataProduct[] = array(
                              "product_id" => intval($product_idarray[$i]),
                              "brand_name" => $brand_namearray[$i],
                              "product_name" => $product_namearray[$i],
                              "product_image" => IMAGES_URL.'/'.urlencode(base64_encode($col5.'/product/'.$product_imagearray[$i])),
                              "product_price" => $product_pricearray[$i],
                              "product_weight" => $product_weightarray[$i],
                              "product_stock" => intval($product_stockarray[$i]),
                              "cart_sumproduct" => intval($cart_sumproductarray[$i]),
                              "cart_createdate" => $cart_adddatearray[$i]
                            );
                }
                
                $dataShops[] = array(
                          "shop_id" => $col9,
                          "shop_name" => $col6,
                          "shop_courier_id" => $col12,
                          "products" => $dataProduct
                        );
            }
            
            $stmt->close();
            $countArray = count($dataShops);
            for($i=0;$i<$countArray;$i++){
                $datadel = listdelivery($con,$dataDelivery[$i]);
                $dataShops[$i]['product_delivery'] = $datadel;
            }
            
            $data = array(
                          "totalproducts" => $totalproduct,
                          "listshops" => $dataShops
                        );
            
            if(count($data)>0){
                $_SESSION['productcart'] = $data;
            }
        }else{
            if(isset($_SESSION['productcart'])){
                $dataArray = $_SESSION['productcart'];
                
                while ($row = $stmt->fetch_assoc()) {
                    $dataProduct = array();
                    
                    $dataDelivery[] = $row["shop_delivery"];
                    $product_idarray = explode('~', $row["product_id"]);
                    $product_namearray = explode('~', $row["product_name"]);
                    $brand_namearray = explode('~', $row["brand_name"]);
                    $product_imagearray = explode('~', $row["product_images"]);
                    $product_pricearray = explode('~', $row["product_price"]);
                    $product_weightarray = explode('~', $row["product_weight"]);
                    $product_stockarray = explode('~', $row["product_stock"]);
                    
                    $product_count = count($product_idarray);
                    
                    for($i=0;$i<$product_count;$i++) //loop over values
                    {
                        $totalproduct++;
                        $dataProduct[] = array(
                                  "product_id" => intval($product_idarray[$i]),
                                  "brand_name" => $brand_namearray[$i],
                                  "product_name" => $product_namearray[$i],
                                  "product_image" => IMAGES_URL.'/'.urlencode(base64_encode($row["username"].'/product/'.$product_imagearray[$i])),
                                  "product_price" => $product_pricearray[$i],
                                  "product_weight" => $product_weightarray[$i],
                                  "product_stock" => intval($product_stockarray[$i]),
                                  "cart_sumproduct" => intval($dataArray[$i]['sum']),
                                  "cart_createdate" => $dataArray[$i]['date']
                                );
                    }
                    
                    $dataShops[] = array(
                          "shop_id" => $row["shop_id"],
                          "shop_name" => $row["shop_name"],
                          "shop_courier_id" => $row["shop_courier_id"],
                          "products" => $dataProduct
                        );
                }
            }
			
			$stmt->close();
            $countArray = count($dataShops);
            for($j=0;$j<$countArray;$j++){
                $datadel = listdelivery($con,$dataDelivery[$j]);
                $dataShops[$j]['product_delivery'] = $datadel;
            }
                
            $data = array(
                        "totalproducts" => $totalproduct,
                        "listshops" => $dataShops
                    );
        }
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
    
    function listdelivery($con,$listproductid){
        $datadel = array();
        $result = $con->query("SELECT 
                                    delivery_id,
                                    delivery_name
                                FROM 
                                    delivery
                                WHERE
                                    delivery_id IN (".$listproductid.")");
        
        while ($row = $result->fetch_row()) {
            $datadel[] = array(
                              "delivery_id" => $row[0],
                              "delivery_name" => $row[1]
                    );
        }
        
        return $datadel;
    }
    
    /*
        Function referred on : module-cart.js
        Used for calling the json data 
        Return data:
                - product_id
    */
    function deletecart($product_id){
        $data = array("product_id" => $product_id);
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
    
    /*
        Function referred on : module-cart.js
        Used for calling the json data 
        Return data:
                - product_id
                - cart_sumproduct
    */
    function updatecart($product_id,$cart_sumproduct){
        $data = array("product_id" => $product_id,"cart_sumproduct" => $cart_sumproduct);
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
    
    /*
        Function referred on : module-cart.js
        Used for calling the json data 
        Return data:
                - invoice_no
    */
    function chosencart($invoice_no){
        $data = array("invoice_no" => $invoice_no);
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
?>