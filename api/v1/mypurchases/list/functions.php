<?php
    /*
        Function referred on : transactions.php
        Used for returning the list data transactions
        Return data:
                - transaction_date
                - status_name
                - product_name
                - product_image
                - invoice_total_price
    */
    function transactions($stmt){
        $data = array();
        
        $stmt->execute();
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6, $col7, $col8);
        
        while($stmt->fetch()){
            $image = IMAGES_URL.'/'.urlencode(base64_encode($col6.'/product/'.$col5));
            
            $data[] = array(
                    "invoice_no" => $col1,
                    "transaction_date" => $col2,
                    "status_name" => $col3,
                    "product_name" => $col4,
                    "product_image" => $image,
                    "total_price" => $col7,
                    "delivery_id" => $col8
                );
        }
        
        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
    
    /*
        Function referred on : trackorder.php
        Used for returning the list data trackorder
        Return data:
                - shop_name
                - product_name
                - notes
                - sum_products
                - product_image
                - delivery_price
                - total_price
                - total
    */
    function trackorder($stmt){
        $data = array();
        
        $stmt->execute();
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6, $col7, $col8, $col9);
        
        while($stmt->fetch()){
            $image = IMAGES_URL.'/'.urlencode(base64_encode($col4.'/product/'.$col3));
            
            $total = $col7 + $col8;
            
            $data[] = array(
                    "shop_name" => $col1,
                    "product_name" => $col2,
                    "notes" => $col5,
                    "sum_products" => $col6,
                    "product_image" => $image,
                    "delivery_price" => 'Rp '.number_format($col7, 0, '.', '.'),
                    "total_price" => 'Rp '.number_format($col8, 0, '.', '.'),
                    "total" => 'Rp '.number_format($total, 0, '.', '.'),
                    "notrans" => $col9
                );
        }
        
        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
?>