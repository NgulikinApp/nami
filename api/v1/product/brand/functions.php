<?php
    /*
        Function referred on : getData.php
        Used for showing callback the detail data brand
    */
    function detail($stmt){
        $data = array();
    
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6);
        
        $stmt->fetch();
        
        $brand_name = ($col1 != "")?$col1:'Buat brand dahulu';
        
        if($col2 != ""){
            $brand_image = IMAGES_URL.'/'.urlencode(base64_encode($col5.'/brand/'.$col2));
        }else{
            $brand_image = INIT_URL.'/img/no-image.jpg';
        }
        
        $brand_product_count = ($col3 != "")?$col3:'';
        $brand_createdate = ($col4 != "")?$col4:'';
        
        if($col6 != ""){
            $shop_banner = IMAGES_URL.'/'.urlencode(base64_encode($col5.'/shop/banner/'.$col6));
        }else{
            $shop_banner = '';
        }
        
        $data['brand_name'] = $brand_name;
        $data['brand_image'] = $brand_image;
        $data['brand_product_count'] = $brand_product_count;
        $data['brand_createdate'] = $brand_createdate;
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
                - username
    */
    function actionData($brand_id,$con){
        $stmt = $con->prepare("SELECT
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
                                brand_id=?");
         
        $stmt->bind_param("i", $brand_id);       
        /*
            Function location in : functions.php
        */
        detail($stmt);
    }
?>