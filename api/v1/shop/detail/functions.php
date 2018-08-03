<?php
    /*
        Function referred on : getData.php
        Used for returning the detail data shop
        Return data:
                - shop_id
                - user_id
                - username
                - shop_name
                - shop_icon
                - shop_description
                - shop_banner
                - university
                - user_photo
    */
    function detail($stmt){
        $data = array();
    
        $row = $stmt->fetch_object();
        if($row->shop_icon != ""){
            $icon = IMAGES_URL.'/'.urlencode(base64_encode($row->username.'/shop/icon/'.$row->shop_icon));
        }else{
            $icon = INIT_URL."/img/icontext.png";
        }
        
        if($row->user_photo != "no-photo.jpg"){
            $user_photo = IMAGES_URL.'/'.urlencode(base64_encode($row->username.'/'.$row->user_photo));
        }else{
            $user_photo = INIT_URL."/img/".$row->user_photo;
        }
            
        if($row->shop_banner != ""){
            $shop_banner = IMAGES_URL.'/'.urlencode(base64_encode($row->username.'/'.$row->shop_banner));
        }else{
            $shop_banner = $row->shop_banner;
        }
            
        $data['shop_id'] = $row->shop_id;
        $data['user_id'] = $row->user_id;
        $data['username'] = $row->username;
        $data['shop_name'] = $row->shop_name;
        $data['shop_icon'] = $icon;
        $data['shop_description'] = $row->shop_description;
        $data['shop_banner'] = $shop_banner;
        $data['university'] = $row->university;
        $data['user_photo'] = $user_photo;
        
        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified((object)$data);
    }
    
    /*
        Function referred on : editData.php
        Used for returning the detail data shop
        Return data:
                - shop_id
                - shop_name
                - shop_icon
                - shop_description
    */
    function editDetail($shop_id,$shop_name,$shop_desc,$shop_photo){
        $data = array(
                "shop_id" => $shop_id,
                "shop_name" => $shop_name,
                "shop_description" => $shop_desc,
                "shop_icon" => $shop_photo
                );
        
         /*
            Function location in : /model/general/functions.php
        */
        credentialVerified((object)$data);
    }
    
    /*
        Function referred on : actionAccount.php
        Used for returning the action data
        Return data:
                - account_id
                - account_name
                - account_no
                - bank_name
                - bank_icon
    */
    function actionAccount($stmt,$account_id,$account_name,$account_no,$bank_name,$bank_icon){
        
        $data = array(
                    "account_id" => $account_id,
                    "account_name" => $account_name,
                    "account_no" => $account_no,
                    "bank_name" => strtoupper($bank_name),
                    "bank_icon" => $bank_icon
                );
                        
        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified((object)$data);
    }
    
    /*
        Function referred on : actionAccount.php
        Used for getting the count of data
        Return data: row count
    */
    function account_verify($stmt){
        $countrow = $stmt->num_rows;
        
        return $countrow;
    }
    
    /*
        Function referred on : actionAccount.php
        Used for getting the count of data
        Return data: row count
    */
    function credential_failed(){
        $data = array();
        
        $dataout = array(
                "status" => 'NO',
                "message" => 'Password is wrong',
                "result" => $data
        );
        
        /*
            Function location in : /model/generatejson.php
        */        
        generateJSON($dataout);
    }
    
    /*
        Function referred on : editDelivery.php
        Used for returning the list of delivery_id
        Return data: 
                    - shop_id
                    - shop_delivery (list of delivery_id)
    */
    function editDelivery($shop_id,$shop_delivery){
        $data = array(
                    "shop_id" => $shop_id,
                    "shop_delivery" => $shop_delivery
                );
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified((object)$data);                
    }
    
    /*
        Function referred on : selectBrand.php
        Used for returning the selected brand
        Return data:
                - brand_id
                - modify_date
                - brand_image
                - brand_name
    */
    function selectBrand($stmt,$username){
        $row = $stmt->fetch_object();
        
        $data = array(
                    "brand_id" => $row->shop_current_brand,
                    "modify_date" => $row->modify_date,
                    "brand_image" => IMAGES_URL.'/'.urlencode(base64_encode($username.'/brand/'.$row->brand_image)),
                    "brand_name" => $row->brand_name,
                    "brand_product_count" => $row->brand_product_count
                );
        $_SESSION['user']["brand_id"]=$row->shop_current_brand;
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified((object)$data);  
    }
?>