<?php
    /*
        Function referred on : getData.php
        Used for showing callback the detail data invoice
    */
    function detail($stmt){
        $invoiceflag = 0;
        $shopidflag = 0;
        $i = 0;
        
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6, $col7, $col8, $col9, $col10, $col11, $col12, $col13, $col14, $col15, $col16, $col17, $col18, $col19, $col20, $col21, $col22, $col23);
        
        while ($stmt->fetch()) {
            if($invoiceflag == 0){
                $invoiceflag = 1;
                $data = array(
                          "invoice_id" => $col1,
                          "invoice_paiddate" => $col2,
                          "invoice_last_paiddate" => $col3,
                          "fullname" => $col4,
                          "phone" => $col5,
                          "email" => $col6,
                          "address" => $col23,
                          "shops" => array()
                        );
            }
            
            if($shopidflag != intval($col8)){
                $shopidflag = intval($col8);
                $data["shops"][$i] = array(
                            "shop_id" => intval($col8),
                            "shop_name" => $col9,
                            "delivery_id" => $col10,
                            "delivery_name" => $col11,
                            "delivery_price" => $col12,
                            "notes" => $col13,
                            "noresi" => $col14,
                            "products" => array()
                        );
                $data["shops"][$i]["products"][] = array(
                                                "id" => $col15,
                                                "brand_name" => $col16,
                                                "name" => $col17,
                                                "sum" => $col18,
                                                "image" => IMAGES_URL.'/'.urlencode(base64_encode($col7.'/product/'.$col19)),
                                                "rate" => $col20,
                                                "price" => $col21,
                                                "weight" => $col22
                                        );
                $i++;
            }else{
                $data["shops"][$i]["products"][] = array(
                                                "id" => $col15,
                                                "brand_name" => $col16,
                                                "name" => $col17,
                                                "sum" => $col18,
                                                "image" => IMAGES_URL.'/'.urlencode(base64_encode($col7.'/product/'.$col19)),
                                                "rate" => $col20,
                                                "price" => $col21,
                                                "weight" => $col22
                                        );
            }
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
    function addtoinvoice($invoice_id){
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