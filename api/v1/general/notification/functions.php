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
                      "user_id" => $row->user_id,
                      "notification_desc" => $row->notification_desc,
                      "notification_photo" => $row->notification_photo,
                      "notification_createdate" => $row->notification_createdate,
                      "username" => $row->username
                    );
        }
        
        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
?>