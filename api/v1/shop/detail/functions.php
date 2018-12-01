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
    function detail($stmt,$id){
        $data = array();
        
        if($stmt->num_rows > 0){
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
                $shop_banner = IMAGES_URL.'/'.urlencode(base64_encode($row->username.'/shop/banner/'.$row->shop_banner));
            }else{
                $shop_banner = $row->shop_banner;
            }
            
            $shop_image_location = array();
            if($row->shop_image_location != ''){
                $imageArray = explode(",",$row->shop_image_location);
                $countImage = sizeof($imageArray);
                for($i=0;$i<$countImage;$i++){
                    $image = IMAGES_URL.'/'.urlencode(base64_encode($row->username.'/shop/location/'.$imageArray[$i]));
                    array_push($shop_image_location,$image);
                }   
            }
            
            $canbecommented = (intval($row->shop_id) == intval($id)) ? false : true;
                
            $data['shop_id'] = $row->shop_id;
            $data['user_id'] = $row->user_id;
            $data['username'] = $row->username;
            $data['fullname'] = $row->fullname;
            $data['shop_name'] = $row->shop_name;
            $data['shop_icon'] = $icon;
            $data['shop_description'] = $row->shop_description;
            $data['shop_banner'] = $shop_banner;
            $data['university'] = $row->university;
            $data['user_photo'] = $user_photo;
            $data['shop_op_from'] = intval($row->shop_op_from);
            $data['shop_op_to'] = intval($row->shop_op_to);
            $data['shop_sunday'] = intval($row->shop_sunday);
            $data['shop_monday'] = intval($row->shop_monday);
            $data['shop_tuesday'] = intval($row->shop_tuesday);
            $data['shop_wednesday'] = intval($row->shop_wednesday);
            $data['shop_thursday'] = intval($row->shop_thursday);
            $data['shop_friday'] = intval($row->shop_friday);
            $data['shop_saturday'] = intval($row->shop_saturday);
            $data['shop_desc'] = $row->shop_desc;
            $data['shop_close'] = $row->shop_close;
            $data['shop_open'] = $row->shop_open;
            $data['shop_closing_notes'] = $row->shop_closing_notes;
            $data['shop_location'] = $row->shop_location;
            $data['shop_image_location'] = $shop_image_location;
            $data['shop_notes_modifydate'] = $row->shop_notes_modifydate;
            $data['canbecommented'] = $canbecommented;
            $data['shop_total_review'] = $row->shop_total_review;
            $data['shop_total_discuss'] = $row->shop_total_discuss;
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
    function editDetail($shop_id,$shop_name,$shop_desc,$shop_photo_name,$username){
        $icon = IMAGES_URL.'/'.urlencode(base64_encode($username.'/shop/icon/'.$shop_photo_name));
        $data = array(
                "shop_id" => $shop_id,
                "shop_name" => $shop_name,
                "shop_description" => $shop_desc,
                "shop_icon" => $icon
                );
        
        $_SESSION['user']["shop_name"] = $shop_name;
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
    /*
        Function referred on : editData.php
        Used for returning the detail data shop
        Return data:
                - shop_id
                - shop_banner_name
    */
    function editBanner($shop_id,$shop_banner_name){
        $data = array(
                "shop_id" => $shop_id,
                "shop_banner" => $shop_banner_name
                );
        
         /*
            Function location in : /model/general/functions.php
        */
        credentialVerified((object)$data);
    }
    /*
        Function referred on : editNotes.php
        Used for returning the detail data shop
        Return data:
                - shop_id
                - username
                - shop_op_from
                - shop_op_to
                - shop_sunday
                - shop_monday
                - shop_tuesday
                - shop_wednesday
                - shop_thursday
                - shop_friday
                - shop_saturday
                - shop_desc
                - shop_close
                - shop_open
                - shop_closing_notes
                - shop_location
    */
    function editNotes($shop_id,$username,$shop_op_from,$shop_op_to,$shop_sunday,$shop_monday,$shop_tuesday,$shop_wednesday,$shop_thursday,$shop_friday,$shop_saturday,$shop_desc,$shop_close,$shop_open,$shop_closing_notes,$shop_location){
        $data = array(
                "shop_id" => $shop_id,
                "shop_op_from" => $shop_op_from,
                "shop_op_to" => $shop_op_to,
                "shop_sunday" => $shop_sunday,
                "shop_monday" => $shop_monday,
                "shop_tuesday" => $shop_tuesday,
                "shop_wednesday" => $shop_wednesday,
                "shop_thursday" => $shop_thursday,
                "shop_friday" => $shop_friday,
                "shop_saturday" => $shop_saturday,
                "shop_desc" => $shop_desc,
                "shop_close" => $shop_close,
                "shop_open" => $shop_open,
                "shop_closing_notes" => $shop_closing_notes,
                "shop_location" => $shop_location
                );
        
         /*
            Function location in : /model/general/functions.php
        */
        credentialVerified((object)$data);
    }
    
    /*
        Function referred on : getNotes.php
        Used for returning the detail data shop
        Return data:
                - shop_op_from
                - shop_op_to
                - shop_sunday
                - shop_monday
                - shop_tuesday
                - shop_wednesday
                - shop_thursday
                - shop_friday
                - shop_saturday
                - shop_desc
                - shop_close
                - shop_open
                - shop_closing_notes
                - shop_location
                - shop_image_location
    */
    function detailNotes($stmt){
        $data = array();
        
        if($stmt->num_rows > 0){
            $row = $stmt->fetch_object();
            
            $shop_image_location = array();
            if($row->shop_image_location != ''){
                $imageArray = explode(",",$row->shop_image_location);
                $countImage = sizeof($imageArray);
                for($i=0;$i<$countImage;$i++){
                    $image = IMAGES_URL.'/'.urlencode(base64_encode($row->username.'/shop/location/'.$imageArray[$i]));
                    array_push($shop_image_location,$image);
                }   
            }
                
            $data['shop_op_from'] = intval($row->shop_op_from);
            $data['shop_op_to'] = intval($row->shop_op_to);
            $data['shop_sunday'] = intval($row->shop_sunday);
            $data['shop_monday'] = intval($row->shop_monday);
            $data['shop_tuesday'] = intval($row->shop_tuesday);
            $data['shop_wednesday'] = intval($row->shop_wednesday);
            $data['shop_thursday'] = intval($row->shop_thursday);
            $data['shop_friday'] = intval($row->shop_friday);
            $data['shop_saturday'] = intval($row->shop_saturday);
            $data['shop_desc'] = $row->shop_desc;
            $data['shop_close'] = $row->shop_close;
            $data['shop_open'] = $row->shop_open;
            $data['shop_closing_notes'] = $row->shop_closing_notes;
            $data['shop_location'] = $row->shop_location;
            $data['shop_image_location'] = $shop_image_location;
        }
        
        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified((object)$data);
    }
?>