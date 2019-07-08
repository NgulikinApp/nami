<?php
    function favorite($shop_id,$user_id,$count_rows,$isfavorite){
        $data = array(
                      "shop_id" => intval($shop_id),
                      "user_id" => $user_id,
                      "shop_count_favorite" => $count_rows,
                      "isfavorite" => $isfavorite
                    );
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified((object)$data);
    }
    
    function count_shop($con,$shop_id){
        $stmt = $con->prepare("SELECT 
                                count(1) AS shop_count
                            FROM 
                                shop_favorite 
                            WHERE 
                                shop_id=?");
        
        $stmt->bind_param("i", $shop_id);        
        /*
            Function location in : /model/general/functions.php
        */
        $count_val = calc_val($stmt);
        
        return $count_val;
    }
?>