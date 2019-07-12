<?php
    /*
        Function referred on : administrative.php
        Used for returning array data
    */
    function listadminis($query,$cache,$key_cache,$con,$id,$idlen){
        $data = getMemcached($key_cache,$cache);
        if($data == '' || $idlen == 2){
            $data = array();
            
            $stmt = $con->prepare($query);
            if($key_cache != 'm_adm_provinces'){
                $stmt->bind_param("s", $id);   
            }
            
            $stmt->execute();
            
            if($idlen == 2){
                $stmt->bind_result($col1, $col2, $col3);
                
                while ($stmt->fetch()){
                    $data[] = array(
                              "id" => $col1,
                              "name" => $col2,
                              "courier_id" => $col3
                            );
                }
            }else{
                $stmt->bind_result($col1, $col2);
            
                while ($stmt->fetch()){
                    $data[] = array(
                              "id" => $col1,
                              "name" => $col2
                            );
                }
            }
            
            setMemcached($key_cache,$cache,$data,0);
            $stmt->close();
        }
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified($data);
    }
?>