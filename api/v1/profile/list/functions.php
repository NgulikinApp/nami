<?php
    /*
        Function referred on : listPendingUser.php
        Used for returning array data
    */
    function listPendingUser($stmt,$stmtCount,$pagesize){
        $data = array();
        
        $stmtCount->execute();
        
        $stmtCount->bind_result($col1);
        
        $stmtCount->fetch();
        
        $total = intval($col1);
        
        $stmtCount->close();
        
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6, $col7);
        
        while ($stmt->fetch()) {
            $data[] = array(
                          "user_id" => $col1,
                          "username" => $col2,
                          "email" => $col6,
                          "fullname" => $col7,
                          "photo_card" => IMAGES_URL.'/'.urlencode(base64_encode($col2.'/seller/'.$col3)),
                          "photo_selfie" => IMAGES_URL.'/'.urlencode(base64_encode($col2.'/seller/'.$col4)),
                          "user_asked_seller_date" => $col5
                        );
        }
        
        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerifiedCalc($data,$total,$pagesize);
    }
    
    /*
        Function referred on : listaddress.php
        Used for returning array data
    */
    function listaddress($stmt){
        $data = array();
        
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3, $col4);
        
        while ($stmt->fetch()) {
            $data[] = array(
                          "user_address_id" => $col1,
                          "recipientname" => $col2,
                          "address" => $col3,
                          "priority" => $col4
                        );
        }
        
        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
?>