<?php
    /*
        Function referred on : getNotif.php and searchNotif.php
        Used for returning array data
    */
    function notification($stmt){
        $data = array();
    
        while ($row = $stmt->fetch_object()) {
            $data[] = array(
                      "notification_id" => $row->notification_id,
                      "brand_name" => $row->brand_name,
                      "notification_desc" => $row->notification_desc,
                      "notification_photo" => IMAGES_URL.'/'.urlencode(base64_encode($row->username.'/product/'.$row->product_image)),
                      "notification_createdate" => $row->notification_createdate
                    );
        }
        
        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
?>