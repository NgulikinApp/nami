<?php
    /*
        Function referred on : getData.php
        Used for showing callback the detail data brand
    */
    function detail($stmt){
        $data = array();
    
        $row = $stmt->fetch_object();
        
        if($row->shop_banner != ""){
            $shop_banner = IMAGES_URL.'/'.urlencode(base64_encode($row->username.'/shop/banner/'.$row->shop_banner));
        }else{
            $shop_banner = '';
        }
        
        $data['brand_name'] = $row->brand_name;
        $data['brand_image'] = IMAGES_URL.'/'.urlencode(base64_encode($row->username.'/brand/'.$row->brand_image));
        $data['brand_product_count'] = $row->brand_product_count;
        $data['brand_createdate'] = $row->brand_createdate;
        $data['shop_banner'] = $shop_banner;
        
        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified((object)$data);
    }
    
    /*
        Function referred on : actionData.php
        Used for returning the detail data brand
        Return data:
                - brand_id
                - brand_name
                - brand_createdate
                - brand_product_count
    */
    function actionData($brand_id,$con){
        $stmt = $con->query("SELECT
                                    brand_name, 
                                    brand_image,
                                    brand_product_count,
                                    CONCAT('Dibuat tanggal ',DATE_FORMAT(brand_createdate, '%d %M %Y'),', pukul ',DATE_FORMAT(brand_createdate, '%H.%i')) AS brand_createdate,
                                    username
                            FROM 
                                    brand
                                    LEFT JOIN shop ON shop.shop_id=brand.shop_id
                                    LEFT JOIN `user` ON user.user_id=shop.user_id
                            WHERE 
                                brand_id=".$brand_id."");
                
        /*
            Function location in : functions.php
        */
        detail($stmt);
    }
?>