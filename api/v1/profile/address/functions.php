<?php
    /*
        Function referred on : getData.php
        Used for returning the detail data address
        Return data:
                - user_address_id
                - address
                - provinces_id
                - regencies_id
                - districts_id
                - villages_id
    */
    function detail($stmt){
        $stmt->execute();
        $data =array();
        
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6, $col7, $col8);
        while($stmt->fetch()){
            $data = array(
                    "fullname" => $col7,
                    "nohp" => $col8,
                    "email" => $_SESSION['user']["email"],
                    "user_address_id" => $col1,
                    "address" => $col2,
                    "provinces_id" => $col3,
                    "regencies_id" => $col4,
                    "districts_id" => $col5,
                    "villages_id" => $col6
                );
        }
        
        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified((object)$data);
    }
    
    /*
        Function referred on : actionData.php
        Used for returning the detail data address
        Return data:
                - user_address_id
                - address
                - provinces_id
                - regencies_id
                - districts_id
                - villages_id
                - phone
    */
    function actionData($user_address_id,$address,$provinces_id,$regencies_id,$districts_id,$villages_id,$notlp){
        $data = array(
                    "user_address_id" => $user_address_id,
                    "address" => $address,
                    "provinces_id" => $provinces_id,
                    "regencies_id" => $regencies_id,
                    "districts_id" => $districts_id,
                    "villages_id" => $villages_id,
                    "phone" => $notlp
                );
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
?>