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
                - transaction_date
                - no_resi
                - product_name
                - product_image
                - invoice_total_price
                - no_trans
    */
    function trackorder($stmt){
        $data = array();
        
        $stmt->execute();
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6, $col7, $col8);
        
        while($stmt->fetch()){
            $image = IMAGES_URL.'/'.urlencode(base64_encode($col6.'/product/'.$col5));
            
            $data[] = array(
                    "invoice_no" => $col1,
                    "transaction_date" => $col2,
                    "no_resi" => $col3,
                    "product_name" => $col4,
                    "product_image" => $image,
                    "total_price" => $col7,
                    "no_trans" => $col8
                );
        }
        
        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
?>