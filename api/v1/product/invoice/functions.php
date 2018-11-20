<?php
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
        Function referred on : changestatusinvoice.phpgf
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