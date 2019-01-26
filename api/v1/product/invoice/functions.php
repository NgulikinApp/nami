<?php
    /*
        Function referred on : getData.php
        Used for showing callback the detail data invoice
    */
    function detail($stmt){
        $data = array();
        
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6, $col7, $col8, $col9, $col10, $col11, $col12, $col13, $col14, $col15, $col16, $col17);
        
        while ($stmt->fetch()) {
            $notesArray = explode("~",$col9);
            $productNameArray = explode("~",$col10);
            $brandNameArray = explode("~",$col11);
            $shopNameArray = explode("~",$col12);
            $productImageArray = explode("~",$col13);
            $productRateArray = explode("~",$col14);
            
            $countProducts = sizeof($productNameArray);
            
            $list_products = array();
            for($i=0;$i<$countProducts;$i++){
                $list_products[] = array(
                                    "name" => $productNameArray[$i],
                                    "notes" => $notesArray[$i],
                                    "brand" => $brandNameArray[$i],
                                    "shop" => $shopNameArray[$i],
                                    "image" => $productImageArray[$i],
                                    "rate" => $productRateArray[$i]
                                    );
            }
            
            $data['invoice_id'] = $col1;
            $data['delivery_name'] = $col2;
            $data['invoice_delivery_price'] = intval($col3);
            $data['invoice_total_price'] = intval($col4);
            $data['invoice_paid'] = $col5;
            $data['invoice_paiddate'] = $col6;
            $data['invoice_last_paiddate'] = $col7;
            $data['invoice_detail_sumproduct'] = intval($col8);
            $data['fullname'] = $col15;
            $data['phone'] = $col16;
            $data['email'] = $col17;
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