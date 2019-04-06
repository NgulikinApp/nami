<?php
    /*
        Function referred on : getNotif.php
        Used for returning array data
    */
    function notification($stmt){
        $list = array();
        
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6, $col7, $col8, $col9);
        $sumRead = 0;
        while ($stmt->fetch()) {
            $list[] = array(
                      "notifications_id" => $col1,
                      "link_id" => $col6,
                      "notifications_desc" => $col2,
                      "notifications_photo" => IMAGES_URL.'/'.urlencode(base64_encode($col5.'/shop/icon/'.$col3)),
                      "notifications_createdate" => $col4,
                      "notifications_type" => $col7,
                      "notifications_title" => $col8,
                      "notifications_isread" => $col9
                    );
            if($col9 == '0'){
                $sumRead++;
            }    
        }
        
        $data = array(
                    "sumRead" => $sumRead,
                    "listNotif" => $list
                );
        
        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
    
    /*
        Function referred on : doRead.php
        Used for returning array data
    */
    function doRead(){
        $data = array(
                    "sumRead" => '0'
                );
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
?>