<?php
    /*
        Function referred on : getData.php
        Used for showing callback the detail data invoice
    */
    function detail($stmt){
        $data = array();
    
        while ($row = $stmt->fetch_object()) {
            $notesArray = explode("~",$row->list_notes);
            $productNameArray = explode("~",$row->list_product_name);
            $brandNameArray = explode("~",$row->list_brand_name);
            $shopNameArray = explode("~",$row->list_shop_name);
            $productImageArray = explode("~",$row->list_product_image);
            $productRateArray = explode("~",$row->list_product_rate);
            
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
            
            $data['invoice_id'] = $row->invoice_id;
            $data['delivery_name'] = $row->delivery_name;
            $data['invoice_delivery_price'] = intval($row->invoice_delivery_price);
            $data['invoice_noresi'] = $row->invoice_noresi;
            $data['invoice_total_price'] = intval($row->invoice_total_price);
            $data['invoice_paid'] = $row->invoice_paid;
            $data['invoice_paiddate'] = $row->invoice_paiddate;
            $data['invoice_last_paiddate'] = $row->invoice_last_paiddate;
            $data['invoice_detail_sumproduct'] = intval($row->invoice_detail_sumproduct);
            $data['fullname'] = $row->fullname;
            $data['phone'] = $row->phone;
            $data['email'] = $row->email;
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
        Function referred on : changestatusinvoice.php
        Used for calling the json data that status invoice already paid
        Return data:
                - status 
                - message
    */
    function changestatus(){
        $data = array();
        
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