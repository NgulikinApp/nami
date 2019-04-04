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
        
        $stmt->execute();
        $stmt->store_result();
        
        if($stmt->num_rows > 0){
            $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6, $col7, $col8, $col9, $col10, $col11, $col12, $col13, $col14, $col15, $col16, $col17, $col18, $col19, $col20, $col21, $col22, $col23, $col24, $col25, $col26, $col27, $col28);
            
            $stmt->fetch();
            
            $shopImageArray = explode(",",$col25);
            $countShopImage = sizeof($shopImageArray);
            
            if($col6 != ""){
                $icon = IMAGES_URL.'/'.urlencode(base64_encode($col3.'/shop/icon/'.$col6));
            }else{
                $icon = INIT_URL."/img/icontext.png";
            }
            
            if($col10 != "no-photo.jpg"){
                $user_photo = IMAGES_URL.'/'.urlencode(base64_encode($col3.'/'.$col10));
            }else{
                $user_photo = INIT_URL."/img/".$col10;
            }
                
            if($col8 != "no_banner.png"){
                $shop_banner = IMAGES_URL.'/'.urlencode(base64_encode($col3.'/shop/banner/'.$col8));
            }else{
                $shop_banner = INIT_URL."/img/".$col8;
            }
            
            $shop_image_location = array();
            if($col24 != ''){
                $imageArray = explode(",",$col24);
                $countImage = sizeof($imageArray);
                for($i=0;$i<$countImage;$i++){
                    $image = IMAGES_URL.'/'.urlencode(base64_encode($col3.'/shop/notes/'.$imageArray[$i]));
                    array_push($shop_image_location,$image);
                }   
            }
            
            if(isset($_SESSION['user'])){
                $id = intval($_SESSION['user']["shop_id"]);
                $canbecommented = (intval($col1) == intval($id)) ? false : true;
            }else{
                $canbecommented = false;
            }
                
            $data['shop_id'] = $col1;
            $data['user_id'] = $col2;
            $data['username'] = $col3;
            $data['fullname'] = $col4;
            $data['shop_name'] = $col5;
            $data['shop_icon'] = $icon;
            $data['shop_description'] = $col7;
            $data['shop_banner'] = $shop_banner;
            $data['university'] = $col9;
            $data['user_photo'] = $user_photo;
            $data['phone'] = $col28;
            $data['shop_op_from'] = intval($col11);
            $data['shop_op_to'] = intval($col12);
            $data['shop_sunday'] = intval($col13);
            $data['shop_monday'] = intval($col14);
            $data['shop_tuesday'] = intval($col15);
            $data['shop_wednesday'] = intval($col16);
            $data['shop_thursday'] = intval($col17);
            $data['shop_friday'] = intval($col18);
            $data['shop_saturday'] = intval($col19);
            $data['shop_close'] = $col20;
            $data['shop_open'] = $col21;
            $data['shop_closing_notes'] = $col22;
            $data['shop_location'] = $col23;
            $data['shop_notes_modifydate'] = $col25;
            $data['canbecommented'] = $canbecommented;
            $data['shop_total_review'] = $col26;
            $data['shop_total_discuss'] = $col27;
            $data['shop_image_location'] = $shop_image_location;
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
        if($shop_photo_name != ''){
            $icon = IMAGES_URL.'/'.urlencode(base64_encode($username.'/shop/icon/'.$shop_photo_name));
        }else{
            $icon = IMAGES_URL.'/'.urlencode(base64_encode($username.'/shop/icon/'.$_SESSION['user']["shop_icon"]));
        }
        
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
    
    function actionAccountList($cache,$key_cache,$con,$user_id){
        $query ="SELECT 
                        account_id,
                        account_name,
                        account_no,
                        bank_name,
                        bank_icon,
                        account.bank_id as bank_id
                    FROM 
                        account 
                        JOIN bank ON account.bank_id=bank.bank_id 
                    WHERE 
                        user_id = ?";
        
        $data = array();
            
        $stmt = $con->prepare($query);
        $stmt->bind_param("s", $user_id);
        $stmt->execute();
            
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6);
            
        while ($stmt->fetch()) {
            $data[] = array(
                          "account_id" => $col1,
                          "account_name" => $col2,
                          "account_no" => $col3,
                          "bank_name" => $col4,
                          "bank_icon" =>  "/img/".$col5,
                          "bank_id" => $col6
                        );
        }
            
        setMemcached($key_cache,$cache,$data,0);
        $stmt->close();
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
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5);
        $stmt->fetch();
        
        $data = array(
                    "brand_id" => $col1,
                    "modify_date" => $col2,
                    "brand_image" => IMAGES_URL.'/'.urlencode(base64_encode($username.'/brand/'.$col3)),
                    "brand_name" => $col4,
                    "brand_product_count" => $col5
                );
        $_SESSION['user']["brand_id"]=$col1;
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
        
        $stmt->execute();
        $stmt->store_result();
        if($stmt->num_rows > 0){
            
            $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6, $col7, $col8, $col9, $col10, $col11, $col12, $col13, $col14, $col15, $col16);
        
            $stmt->fetch();
            
            $shop_image_location = array();
            if($col16 != ''){
                $imageArray = explode(",",$col16);
                $countImage = sizeof($imageArray);
                for($i=0;$i<$countImage;$i++){
                    $image = IMAGES_URL.'/'.urlencode(base64_encode($col1.'/shop/notes/'.$imageArray[$i]));
                    array_push($shop_image_location,$image);
                }   
            }
                
            $data['shop_op_from'] = intval($col2);
            $data['shop_op_to'] = intval($col3);
            $data['shop_sunday'] = intval($col4);
            $data['shop_monday'] = intval($col5);
            $data['shop_tuesday'] = intval($col6);
            $data['shop_wednesday'] = intval($col7);
            $data['shop_thursday'] = intval($col8);
            $data['shop_friday'] = intval($col9);
            $data['shop_saturday'] = intval($col10);
            $data['shop_desc'] = $col11;
            $data['shop_close'] = $col12;
            $data['shop_open'] = $col13;
            $data['shop_closing_notes'] = $col14;
            $data['shop_location'] = $col15;
            $data['shop_image_location'] = $shop_image_location;
        }
        
        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified((object)$data);
    }
?>