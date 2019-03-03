<?php
    /*
        Function referred on : user.php
        Used for returning the detail data user
        Return data:
                - fullname
                - dob
                - username
                - username
                - gender
                - phone
                - email
                - user_photo
    */
    function user($stmt){
        $data = array();
        
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6, $col7, $col8, $col9, $col10);
        
        $stmt->fetch();
        
        if($col7 != "no-photo.jpg"){
            $user_photo = IMAGES_URL.'/'.urlencode(base64_encode($col3.'/'.$col7));
        }else{
            $user_photo = INIT_URL."/img/".$col7;
        }
        
        if($col9 != "ktp.png"){
            $user_card = IMAGES_URL.'/'.urlencode(base64_encode($col3.'/seller/card/'.$col9));
        }else{
            $user_card = INIT_URL."/img/".$col9;
        }
        
        if($col10 != "selfie.png"){
            $user_selfie = IMAGES_URL.'/'.urlencode(base64_encode($col3.'/'.$col10));
        }else{
            $user_selfie = INIT_URL."/img/".$col10;
        }
        
        $data['fullname'] = $col1;
        $data['dob'] = $col2;
        $data['username'] = $col3;
        $data['gender'] = $col4;
        $data['phone'] = $col5;
        $data['email'] = $col6;
        $data['user_photo'] = $user_photo;
        $data['user_status_id'] = $col8;
        $data['user_card'] = $user_card;
        $data['user_selfie'] = $user_selfie;
        
        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified((object)$data);
    }
    
    /*
        Function referred on : updateUser.php
        Used for returning the detail data user
        Return data:
                - user_id
                - fullname
                - dob
                - gender
                - phone
                - user_photo
    */
    function updateUser($user_id,$con){
        $stmt = $con->prepare("SELECT 
                                        inner1.*,
                                        IFNULL(shop_id,0) as shop_id,
                                        shop_current_brand,
                                        shop_delivery,
                                        shop_name
                                FROM(
                                        SELECT
                                            user_id,
                                            username, 
                                            fullname,
                                            email,
                                            phone,
                                            dob,
                                            gender,
                                            user_key,
                                            user_photo
                                        FROM 
                                            user 
                                        WHERE 
                                            user_id=?
                                )as inner1 
                                    LEFT JOIN shop ON inner1.user_id=shop.user_id");
        $stmt->bind_param("s", $user_id);
        
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6, $col7, $col8, $col9, $col10, $col11, $col12, $col13);
        
        $stmt->fetch();
        
        if($col9 != "no-photo.jpg"){
            $photo = IMAGES_URL.'/'.urlencode(base64_encode($col2.'/'.$col9));
        }else{
            $photo = INIT_URL."/img/".$col9;
        }
        
        $data = array(
                        "user_id"=>$col1,
                        "username"=>$col2,
                        "fullname"=>$col3,
                        "email"=>$col4,
                        "nohp"=>$col5,
                        "dob"=>$col6,
                        "gender"=>$col7,
                        "key"=>$col8,
                        "user_photo"=>$photo,
                        "shop_id"=>$col10,
                        "shop_name"=>$col13,
                        "brand_id"=>$col11,
                        "delivery_id"=>$col12
                    );
        
        $_SESSION['user'] = $data;
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified((object)$data);
    }
    
    /*
        Function referred on : updatePassword.php
        Used for calling the json data that wrong in input password account
        Return data:
                - status (YES/NO)
                - message
                - result
    */
    function password_notcorrect(){
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
        Function referred on : updatePassword.php
        Used for calling the json data that wrong in input password account
        Return data:
                - status (YES/NO)
                - message
                - result
    */
    function confirm_password(){
        $data = array();
        
        $dataout = array(
                "status" => 'YES',
                "message" => 'Email terkirim',
                "result" => $data
        );
        
        /*
            Function location in : /model/generatejson.php
        */        
        generateJSON($dataout);
    }
    
    /*
        Function referred on : updateStatusSeller.php
        Used for calling the json data 
        Return data:
                - status (YES/NO)
                - message
                - result
    */
    function updateStatusSeller(){
        $data = array(
                "status" => 'YES',
                "message" => 'status updated'
        );
        
        /*
            Function location in : /model/generatejson.php
        */        
        generateJSON((object)$data);
    }
?>