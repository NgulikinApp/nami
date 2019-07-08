<?php
    /*
        Function referred on : searchItem.php
        Used for returning query string
    */
    function buildCondition_item($name,$pricemax,$pricemin,$rate,$category,$subcategory,$province,$regency){
        $query = '';
        
        if(@$category != ''){
            $query .= " AND category_id = ".$category;
        }
        
        if(@$subcategory != ''){
            $query .= " AND subcategory_id = ".$subcategory;
        }
        
        if(@$province != ''){
            $query .= " AND shop_provinces = '".$province."'";
        }
        
        if(@$regency != ''){
            $query .= " AND shop_regencies = '".$regency."'";
        }
                
        if(@$pricemax != '' && @$pricemin != ''){
            $query .= " AND product_price BETWEEN ".$pricemax." AND ".$pricemin;
        }else if(@$pricemax == '' && @$pricemin != ''){
            $query .= " AND product_price >= ".$pricemin;
        }else if(@$pricemax != '' && @$pricemin == ''){
            $query .= " AND product_price <= ".$pricemax;
        }
                
        if(@$rate != ''){
            $query .= " AND product_average_rate in(".$rate.")";
        }
        
        if(@$name != ''){
            $query .= " AND product_name like '%".$name."%'";
        }
        
        return $query;
    }
    
    /*
        Function referred on : searchItem.php
        Used for returning array data
    */
    function dosearch($query,$con,$type,$pagesize){
        
        $con->multi_query($query);
        
        $data = array();
        
        $i = 0;
        $total = 0;
        
        do {
            $result = $con->store_result();
            
            while ($row = $result->fetch_row()) {
                if($i > 0){
                    if($type == 'product'){
                        $total = $row[6];
                        if($row[2] == ''){
                            $icon = "https://s4.bukalapak.com/img/409311077/s-194-194/TV_LED_Sharp_24__LC_24LE170i.jpg";
                        }else{
                            $icon = IMAGES_URL.'/'.urlencode(base64_encode($row[4].'/product/'.$row[2]));
                        }
                        $data[] = array(
                                    "product_id" => $row[0],
                                      "product_name" => $row[1],
                                      "product_image" =>  $icon,
                                      "product_price" =>  $row[3],
                                      "product_difdate" =>  $row[5],
                                      "shop_name" =>  $row[7],
                                      "product_average_rate" =>  $row[8]
                                    );
                        
                    }else{
                        $total = $row[5];
                        
                        if($row[2] == ''){
                            $icon = "https://s4.bukalapak.com/img/409311077/s-194-194/TV_LED_Sharp_24__LC_24LE170i.jpg";
                        }else{
                            $icon = IMAGES_URL.'/'.urlencode(base64_encode($row[3].'/shop/icon/'.$row[2]));
                        }
                        
                        $data[] = array(
                                      "shop_id" => $row[0],
                                      "shop_name" => $row[1],
                                      "shop_icon" =>  $icon,
                                      "shop_difdate" =>  $row[4],
                                      "regency_name" =>  $row[6]
                                    );
                    };
                }
                $i++;
            }
            $result->free();
        }while ($con->more_results() && $con->next_result());
            
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerifiedCalc($data,$total,$pagesize);
    }
?>