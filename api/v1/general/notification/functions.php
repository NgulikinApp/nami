<?php
    /*
        Function referred on : getNotif.php
        Used for returning array data
    */
    function notification($stmt){
        $data = array();
        
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6, $col7, $col8);
        
        while ($stmt->fetch()) {
            $data[] = array(
                      "notifications_id" => $col1,
                      "data_id" => $col6,
                      "notifications_desc" => $col2,
                      "notifications_photo" => IMAGES_URL.'/'.urlencode(base64_encode($col5.'/shop/icon/'.$col3)),
                      "notifications_createdate" => $col4,
                      "notifications_type" => $col7,
                      "notifications_title" => $col8
                    );
        }
        
        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
?>