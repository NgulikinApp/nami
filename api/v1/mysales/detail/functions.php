<?php
    /*
        Function referred on : neworder.php,statussending.php
        Used for returning array data
    */
    function detail($stmt){
        $data = array();
        $products = array();
        
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6, $col7, $col8, $col9, $col10, $col11, $col12, $col13, $col14, $col15, $col16);
    
        $stmt->fetch();
        
        $invoice_detail_sumproductarray = explode('~', $col12);
        $invoice_detail_notesarray = explode('~', $col13);
        $product_namesarray = explode('~', $col14);
        $product_imagesarray = explode('~', $col15);
        $brand_namesarray = explode('~', $col16);
            
        $product_count = count($product_namesarray);
            
        for($i=0;$i<$product_count;$i++) //loop over values
        {
            $products[] = array(
                          "product_name" => $product_namesarray[$i],
                          "brand_name" => $brand_namesarray[$i],
                          "product_image" => $product_imagesarray[$i],
                          "sum_product" => $invoice_detail_sumproductarray[$i],
                          "notes" => $invoice_detail_notesarray[$i]
                        );
        }
                
        $data[] = array(
                    "invoice_id" => $col1,
                    "delivery_name" => $col2,
                    "invoice_delivery_price" => $col3,
                    "invoice_noresi" => $col4,
                    "invoice_total_price" => $col5,
                    "invoice_createdate" => $col6,
                    "fullname" => $col7,
                    "email" => $col8,
                    "phone" => $col9,
                    "user_photo" => IMAGES_URL.'/'.urlencode(base64_encode($col11.'/'.$col10)),
                    "products" => $products
                );
        
        $stmt->close();
        
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
        $products = array();
        $status = array();
        
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6, $col7, $col8, $col9, $col10, $col11, $col12, $col13, $col14, $col15, $col16, $col17, $col18);
    
        $stmt->fetch();
        
        $invoice_detail_sumproductarray = explode('~', $col12);
        $invoice_detail_notesarray = explode('~', $col13);
        $product_namesarray = explode('~', $col14);
        $product_imagesarray = explode('~', $col15);
        $brand_namesarray = explode('~', $col16);
        
        $status_datearray = explode('~', $col17);
        $status_descarray = explode('~', $col18);
            
        $product_count = count($product_namesarray);
            
        for($i=0;$i<$product_count;$i++) //loop over values
        {
            $products[] = array(
                          "product_name" => $product_namesarray[$i],
                          "brand_name" => $brand_namesarray[$i],
                          "product_image" => $product_imagesarray[$i],
                          "sum_product" => $invoice_detail_sumproductarray[$i],
                          "notes" => $invoice_detail_notesarray[$i]
                        );
        }
            
        $status_count = count($status_datearray);
            
        for($i=0;$i<$status_count;$i++) //loop over values
        {
            $status[] = array(
                          "date" => $status_datearray[$i],
                          "desc" => $status_descarray[$i]
                        );
        }
            
        $data[] = array(
                        "invoice_id" => $col1,
                        "delivery_name" => $col2,
                        "invoice_delivery_price" => $col3,
                        "invoice_noresi" => $col4,
                        "invoice_total_price" => $col5,
                        "invoice_createdate" => $col6,
                        "fullname" => $col7,
                        "email" => $col8,
                        "phone" => $col9,
                        "user_photo" => IMAGES_URL.'/'.urlencode(base64_encode($col11.'/'.$col10)),
                        "products" => $products,
                        "status" => $status
                    );

        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
?>