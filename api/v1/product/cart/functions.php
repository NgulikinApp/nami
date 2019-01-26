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
        $dataDelivery = array();
        
        if(isset($_SESSION['user'])){
            $stmt->execute();
            
            $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6, $col7, $col8, $col9, $col10, $col11);
            
            while ($stmt->fetch()) {
                $dataDelivery[] = $col8;
                $data[] = array(
                          "product_id" => $col1,
                          "product_name" => $col2,
                          "product_image" => IMAGES_URL.'/'.urlencode(base64_encode($col5.'/product/'.$col4)),
                          "brand_name" => $col3,
                          "sum_product" => $col10,
                          "cart_createdate" => $col11,
                          "shop_name" => $col6,
                          "product_price" => $col7,
                          "shop_id" => $col9
                        );
            }
            $stmt->close();
            $countArray = count($data);
            for($i=0;$i<$countArray;$i++){
                $datadel = listdelivery($con,$dataDelivery[$i]);
                $data[$i]['product_delivery'] = $datadel;
            }
            
            if(count($data)>0){
                $_SESSION['productcart'] = $data;
            }
        }else{
            if(isset($_SESSION['productcart'])){
                $stmt->execute();
                
                $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6, $col7, $col8, $col9);
                $dataArray = $_SESSION['productcart'];
                $i=0;
                while ($stmt->fetch()) {
                    $dataDelivery[] = $col8;
                    $data[] = array(
                              "product_id" => $col1,
                              "product_name" => $col2,
                              "product_image" => IMAGES_URL.'/'.urlencode(base64_encode($col5.'/product/'.$col4)),
                              "brand_name" => $col3,
                              "sum_product" => $dataArray[$i]['sum'],
                              "cart_createdate" => $dataArray[$i]['date'],
                              "shop_name" => $col6,
                              "product_price" => $col7,
                              "shop_id" => $col9
                            );
                    $i++;
                }
                
                $stmt->close();
                $countArray = count($data);
                for($j=0;$j<$countArray;$j++){
                    $datadel = listdelivery($con,$dataDelivery[$j]);
                    $data[$j]['product_delivery'] = $datadel;
                }
            }
        }
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
    
    function listdelivery($con,$listproductid){
        $datadel = array();
        $stmt = $con->prepare("SELECT 
                                    delivery_id,
                                    delivery_name
                                FROM 
                                    delivery
                                WHERE
                                    delivery_id IN (?)");
        
        $stmt->bind_param("s", $listproductid);
                
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2);
        
        while ($stmt->fetch()) {
            $datadel[] = array(
                              "delivery_id" => $col1,
                              "delivery_name" => $col2
                    );
        }
        
        return $datadel;
    }
?>