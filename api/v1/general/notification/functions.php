<?php
    /*
        Function referred on : getNotif.php and searchNotif.php
        Used for returning array data
    */
    function notification($stmt){
        $data = array();
        
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6);
        
        while ($stmt->fetch()) {
            $data[] = array(
                      "notification_id" => $col1,
                      "brand_name" => $col3,
                      "notification_desc" => $col2,
                      "notification_photo" => IMAGES_URL.'/'.urlencode(base64_encode($col6.'/product/'.$col4)),
                      "notification_createdate" => $col5
                    );
        }
        
        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
?>