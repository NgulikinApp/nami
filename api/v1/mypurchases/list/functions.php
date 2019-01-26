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
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6);
        
        while($stmt->fetch()){
            $image = IMAGES_URL.'/'.urlencode(base64_encode($col5.'/product/'.$col4));
            
            $data[] = array(
                    "transaction_date" => $col1,
                    "status_name" => $col2,
                    "product_name" => $col3,
                    "product_image" => $image,
                    "invoice_total_price" => $col6
                );
        }
        
        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
?>