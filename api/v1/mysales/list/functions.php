<?php
    /*
        Function referred on : neworder.php
        Used for returning array data
    */
    function neworder($stmt){
        $data = array();
        $products = array();
        
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6, $col7, $col8);
    
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
                    "user_photo" => $user_photo,
                    "invoice_no" => $col7,
                    "user_id" => $col8
                );
        }
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
    
    /*
        Function referred on : confirmorder.php
        Used for returning array data
    */
    function confirmorder($stmt){
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
                    "notrans" => $col2,
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
        Function referred on : statussending.php
        Used for returning array data
    */
    function statussending($stmt){
        $data = array();
        $products = array();
        
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6);
    
        while($stmt->fetch()){
            $datearray = explode('-', $col2);
            $date = $datearray[0]." ".month($datearray[1])." ".$datearray[2];
            
            if($col5 != "no-photo.jpg"){
                $user_photo = IMAGES_URL.'/'.urlencode(base64_encode($col4.'/'.$col5));
            }else{
                $user_photo = INIT_URL."/img/".$col5;
            }
            $data[] = array(
                    "notrans" => $col1,
                    "invoice_createdate" => $date,
                    "fullname" => $col3,
                    "user_photo" => $user_photo,
                    "payment_name" => strtoupper($col6),
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
        
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6, $col7, $col8, $col9);
    
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
                    "invoice_no" => $col2,
                    "invoice_createdate" => $date,
                    "fullname" => $col4,
                    "user_photo" => $user_photo,
                    "delivery_name" => $col7,
                    "status" => $col8,
                    "notran" => $col9
                );
        }
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
?>