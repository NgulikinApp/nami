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
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6, $col7);
        
        while($stmt->fetch()){
            $image = IMAGES_URL.'/'.urlencode(base64_encode($col6.'/product/'.$col5));
            
            $data[] = array(
                    "invoice_no" => $col1,
                    "transaction_date" => $col2,
                    "status_name" => $col3,
                    "product_name" => $col4,
                    "product_image" => $image,
                    "total_price" => $col7
                );
        }
        
        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
?>