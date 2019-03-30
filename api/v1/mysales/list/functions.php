<?php
    /*
        Function referred on : neworder.php
        Used for returning array data
    */
    function neworder($stmt){
        $data = array();
        $products = array();
        
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6);
    
        while($stmt->fetch()){
            $datearray = explode('-', $col3);
            $date = $datearray[0]." ".month($datearray[1])." ".$datearray[2];
            
            if($col6 != "no-photo.jpg"){
                $user_photo = IMAGES_URL.'/'.urlencode(base64_encode($col5.'/'.$col6));
            }else{
                $user_photo = INIT_URL."/img/".$col6;
            }
            $data[] = array(
                    "invoice_id" => $col1,
                    "payment_name" => strtoupper($col2),
                    "invoice_createdate" => $date,
                    "fullname" => $col4,
                    "user_photo" => $user_photo
                );
        }
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
    
    /*
        Function referred on : neworder.php
        Used for returning array data
    */
    function confirmorder($stmt){
        $data = array();
        $products = array();
        
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6);
    
        while($stmt->fetch()){
            if($col6 != "no-photo.jpg"){
                $user_photo = IMAGES_URL.'/'.urlencode(base64_encode($col5.'/'.$col6));
            }else{
                $user_photo = INIT_URL."/img/".$col7;
            }
            $data[] = array(
                    "invoice_id" => $col1,
                    "invoice_no" => $col2,
                    "invoice_createdate" => $col3,
                    "fullname" => $col4,
                    "user_photo" => $user_photo
                );
        }
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
        
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5);
    
        while($stmt->fetch()){
            $data[] = array(
                    "invoice_id" => $col1,
                    "delivery_name" => $col2,
                    "invoice_createdate" => $col3,
                    "fullname" => $col4,
                    "status" => $col5
                );
        }
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
?>