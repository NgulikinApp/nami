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
                - shop_isfavorite (0/1)
                - shop_total_product
    */
    function detail($stmt){
        $stmt->execute();
    
        $stmt->bind_result($col1,$col2,$col3,$col4,$col5,$col6,$col7,$col8,$col9,$col10,$col11);
        
        $data = array();
    
        while ($stmt->fetch()) {
            if($col5 != ""){
                $icon = 'http://'.IMAGES_URL.'/'.$col3.'/shop/icon/'.$col5;
            }else{
                $icon = "http://".INIT_URL."/img/icontext.png";
            }
            
            if($col9 != "no-photo.jpg"){
                $user_photo = 'http://'.IMAGES_URL.'/'.$col3.'/'.$col9;
            }else{
                $user_photo = "http://".INIT_URL."/img/".$col9;
            }
            
            if($col7 != ""){
                $shop_banner = 'http://'.IMAGES_URL.'/'.$col3.'/'.$col7;
            }else{
                $shop_banner = $col7;
            }
            
            $data['shop_id'] = $col1;
            $data['user_id'] = $col2;
            $data['username'] = $col3;
            $data['shop_name'] = $col4;
            $data['shop_icon'] = $icon;
            $data['shop_description'] = $col6;
            $data['shop_banner'] = $shop_banner;
            $data['university'] = $col8;
            $data['user_photo'] = $user_photo;
            $data['shop_total_product'] = $col10;
            $data['shop_isfavorite'] = $col11;
        }
        
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
        $stmt->execute();
        $stmt->store_result();

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
?>