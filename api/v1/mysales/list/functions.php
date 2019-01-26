<?php
    /*
        Function referred on : neworder.php,statussending.php
        Used for returning array data
    */
    function detail($stmt){
        $data = array();
        $products = array();
        
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3, $col4);
    
        while($stmt->fetch()){
            $data[] = array(
                    "invoice_id" => $col1,
                    "delivery_name" => $col2,
                    "invoice_createdate" => $col3,
                    "fullname" => $col4
                );
        }
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
    }
?>