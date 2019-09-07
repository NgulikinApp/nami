<?php
    /*
        Function referred on : neworder.php
        Used for returning array data
    */
    function neworder($stmt){
        $data = array();
        
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6, $col7, $col8, $col9, $col10, $col11, $col12, $col13);
    
        while($stmt->fetch()){
            $detail = array();
            
            $product_imagearray = explode('~', $col8);
            $brand_namearray = explode('~', $col9);
            $product_namearray = explode('~', $col10);
            $product_pricearray = explode('~', $col11);
            $invoice_product_detail_sumproductarray = explode('~', $col12);
            $invoice_shop_detail_delivery_pricearray = explode('~', $col13);
            
            $brand_namearraycount = count($brand_namearray);
            
            $totalproduct = 0;
            $totalproduct_price = 0;
            $totaldelivery_price = 0;
            
            for($i=0;$i<$brand_namearraycount;$i++){
                $product_price = $product_pricearray[$i] * $invoice_product_detail_sumproductarray[$i];
                
                $totalproduct = $totalproduct + $invoice_product_detail_sumproductarray[$i];
                $totalproduct_price = $totalproduct_price + $product_price;
                $totaldelivery_price = $totaldelivery_price + $invoice_shop_detail_delivery_pricearray[$i];
                
                $detail[] = array(
                                "product_image" => IMAGES_URL.'/'.urlencode(base64_encode($_SESSION['user']['username'].'/product/'.$product_imagearray[$i])),
                                "brand_name" => strtoupper($brand_namearray[$i]),
                                "product_name" => $product_namearray[$i],
                                "product_price" => $product_price,
                                "sumproduct" => $invoice_product_detail_sumproductarray[$i],
                                "delivery_price" => $invoice_shop_detail_delivery_pricearray[$i],
                                "totaldetail_price" => $product_price + $invoice_shop_detail_delivery_pricearray[$i]
                            );
            }
            
            $data[] = array(
                    "delivery_name" => $col1,
                    "recipientname" => $col2,
                    "phone" => $col3,
                    "email" => $col4,
                    "notran" => $col5,
                    "address" => strtoupper($col6),
                    "notes" => $col7,
                    "totalproduct" => $totalproduct,
                    "totalproduct_price" => $totalproduct_price,
                    "totaldelivery_price" => $totaldelivery_price,
                    "total_price" => $totalproduct_price + $totaldelivery_price,
                    "detail" => $detail
                );
        }
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
    
    /*
        Function referred on : confirmorder.php
        Used for returning array data
    */
    function confirmorder($stmt){
        $data = array();
        
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6, $col7, $col8, $col9, $col10, $col11);
    
        while($stmt->fetch()){
            $detail = array();
            
            $product_imagearray = explode('~', $col6);
            $brand_namearray = explode('~', $col7);
            $product_namearray = explode('~', $col8);
            $product_pricearray = explode('~', $col9);
            $invoice_product_detail_sumproductarray = explode('~', $col10);
            $invoice_shop_detail_delivery_pricearray = explode('~', $col11);
            
            $brand_namearraycount = count($brand_namearray);
            
            $totalproduct = 0;
            $totalproduct_price = 0;
            $totaldelivery_price = 0;
            for($i=0;$i<$brand_namearraycount;$i++){
                $product_price = $product_pricearray[$i] * $invoice_product_detail_sumproductarray[$i];
                
                $totalproduct = $totalproduct + $invoice_product_detail_sumproductarray[$i];
                $totalproduct_price = $totalproduct_price + $product_price;
                $totaldelivery_price = $totaldelivery_price + $invoice_shop_detail_delivery_pricearray[$i];
                
                $detail[] = array(
                                "product_image" => IMAGES_URL.'/'.urlencode(base64_encode($_SESSION['user']['username'].'/product/'.$product_imagearray[$i])),
                                "brand_name" => strtoupper($brand_namearray[$i]),
                                "product_name" => $product_namearray[$i],
                                "product_price" => $product_price,
                                "sumproduct" => $invoice_product_detail_sumproductarray[$i],
                                "delivery_price" => $invoice_shop_detail_delivery_pricearray[$i],
                                "totaldetail_price" => $product_price + $invoice_shop_detail_delivery_pricearray[$i]
                            );
            }
            
            $data[] = array(
                    "recipientname" => $col1,
                    "phone" => $col2,
                    "email" => $col3,
                    "address" => strtoupper($col4),
                    "notes" => $col5,
                    "totalproduct" => $totalproduct,
                    "totalproduct_price" => $totalproduct_price,
                    "totaldelivery_price" => $totaldelivery_price,
                    "total_price" => $totalproduct_price + $totaldelivery_price,
                    "detail" => $detail
                );
        }
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
    
    /*
        Function referred on : statussending.php
        Used for returning array data
    */
    function statussending($stmt){
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3, $col4);
    
        while($stmt->fetch()){
            $status = array();
                
            $datearray = explode(',', $col2);
            $timearray = explode(',', $col3);
            $descarray = explode(',', $col4);
                
            $datecount = count($datearray);
                
            for($i=0;$i<$datecount;$i++){
                $status[] = array(
                                "date" => $datearray[$i],
                                "time" => $timearray[$i],
                                "desc" => $descarray[$i]
                            );
            }
                
            $data = array(
                        "delivery_name" => $col1,
                        "status" => $status
                    );
        }
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
    
    /*
        Function referred on : transaction.php
        Used for returning array data
    */
    function transaction($stmt){
        $data = array();
        
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6, $col7, $col8);
    
        while($stmt->fetch()){
            $data[] = array(
                    "recipientname" => $col1,
                    "phone" => $col2,
                    "email" => $col3,
                    "address" => strtoupper($col4),
                    "notes" => $col5,
                    "invoice_no" => $col6,
                    "notran" => $col7,
                    "status" => $col8
                );
        }
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
    
    /*
        Function referred on : actionorder.php
        Used for returning array data
    */
    function actionorder($invoice_id,$action){
        $data = array("action" => $action,
                    "invoice_id" => $invoice_id);
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
?>