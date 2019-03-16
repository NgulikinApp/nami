<?php
    /*
        Function referred on : getData.php
        Used for showing callback the detail data invoice
    */
    function detail($stmt){
        $data = array();
        
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6, $col7, $col8, $col9, $col10, $col11, $col12, $col13, $col14, $col15);
        
        while ($stmt->fetch()) {
            $productNameArray = explode("~",$col7);
            $brandNameArray = explode("~",$col8);
            $shopNameArray = explode("~",$col9);
            $productSumArray = explode("~",$col10);
            $productImageArray = explode("~",$col11);
            $productRateArray = explode("~",$col12);
            
            $countProducts = sizeof($productNameArray);
            
            $list_products = array();
            for($i=0;$i<$countProducts;$i++){
                $list_products[] = array(
                                    "name" => $productNameArray[$i],
                                    "brand" => $brandNameArray[$i],
                                    "shop" => $shopNameArray[$i],
                                    "sum" => $productSumArray[$i],
                                    "image" => $productImageArray[$i],
                                    "rate" => $productRateArray[$i]
                                    );
            }
            
            $data['invoice_id'] = $col1;
            $data['delivery_name'] = $col2;
            $data['invoice_delivery_price'] = intval($col3);
            $data['invoice_paiddate'] = $col4;
            $data['invoice_last_paiddate'] = $col5;
            $data['invoice_notes'] = $col6;
            $data['fullname'] = $col13;
            $data['phone'] = $col14;
            $data['email'] = $col15;
            $data['products'] = $list_products;
        }
        
        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified((object)$data);
    }
    /*
        Function referred on : module-invoice.js
        Used for calling the json data 
        Return data:
                - invoice_id
    */
    function addtocart($invoice_id){
        $data = array(
                        "invoice_id"=>$invoice_id
                    );
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
    
    /*
        Function referred on : changestatus.php
        Used for calling the json data that status invoice already paid
        Return data:
                - status 
                - message
    */
    function changestatus(){
        $dataout = array(
                "status" => 'YES',
                "message" => 'Invoice paid'
        );
        
        /*
            Function location in : /model/generatejson.php
        */        
        generateJSON($dataout);
    }
?>