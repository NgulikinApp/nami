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
    function addtocart($user_id,$product_id,$sum,$con){
        $date = date('H:i').' WIB';
        $data = array(
                        "user_id"=>$user_id,
                        "product_id"=>$product_id,
                        "sum"=>$sum,
                        "date"=>$date
                    );
        if(isset($_SESSION['user'])){
            $stmt = $con->prepare("UPDATE cart SET cart_isactive='0' WHERE user_id=? AND product_id=?");
            
            $stmt->bind_param("ss", $user_id,$product_id);
                
            $stmt->execute();
            
            $stmt->close();
            
            $stmt = $con->prepare("INSERT INTO cart(user_id,product_id,cart_sumproduct,cart_adddate) VALUES(?,?,?,?)");
                
            $stmt->bind_param("siis", $user_id,$product_id,$sum,$date);
                
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
        
        if(isset($_SESSION['user'])){
            while ($row = $stmt->fetch_object()) {
                $datadel = listdelivery($con,$row->shop_delivery);
                $data[] = array(
                          "product_id" => $row->product_id,
                          "product_name" => $row->product_name,
                          "product_image" => IMAGES_URL.'/'.urlencode(base64_encode($row->username.'/product/'.$row->product_image)),
                          "brand_name" => $row->brand_name,
                          "sum_product" => $row->sum_product,
                          "cart_createdate" => $row->cart_adddate,
                          "shop_name" => $row->shop_name,
                          "product_price" => $row->product_price,
                          "product_delivery" => $datadel
                        );
            }
            if(count($data)>0){
                $_SESSION['productcart'] = $data;
            }
        }else{
            if(isset($_SESSION['productcart'])){
                $dataArray = $_SESSION['productcart'];
                $i=0;
                while ($row = $stmt->fetch_object()) {
                    $datadel = listdelivery($con,$row->shop_delivery);
                    $data[] = array(
                              "product_id" => $row->product_id,
                              "product_name" => $row->product_name,
                              "product_image" => IMAGES_URL.'/'.urlencode(base64_encode($row->username.'/product/'.$row->product_image)),
                              "brand_name" => $row->brand_name,
                              "sum_product" => $dataArray[$i]['sum'],
                              "cart_createdate" => $dataArray[$i]['date'],
                              "shop_name" => $row->shop_name,
                              "product_price" => $row->product_price,
                              "product_delivery" => $datadel
                            );
                    $i++;
                }   
            }
        }
        
        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
    
    function listdelivery($con,$listproductid){
        $datadel = array();
        $stmtdel = $con->query("SELECT 
                                    delivery_id,
                                    delivery_name
                                FROM 
                                    delivery
                                WHERE
                                    delivery_id IN (".$listproductid.")");
        while ($rowdel = $stmtdel->fetch_object()) {
            $datadel[] = array(
                          "delivery_id" => $rowdel->delivery_id,
                          "delivery_name" => $rowdel->delivery_name
                );
        }
        
        return $datadel;
    }
?>