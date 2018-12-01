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
        
        $row = $stmt->fetch_object();
        
        if($row->user_photo != "no-photo.jpg"){
            $user_photo = IMAGES_URL.'/'.urlencode(base64_encode($row->username.'/'.$row->user_photo));
        }else{
            $user_photo = INIT_URL."/img/".$row->user_photo;
        }
        
        $data['fullname'] = $row->fullname;
        $data['dob'] = $row->dob;
        $data['username'] = $row->username;
        $data['gender'] = $row->gender;
        $data['phone'] = $row->phone;
        $data['email'] = $row->email;
        $data['user_photo'] = $user_photo;
        
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
        $stmt = $con->query("SELECT 
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
                                            user_id='".$user_id."'
                                )as inner1 
                                    LEFT JOIN shop ON inner1.user_id=shop.user_id");
        
        $row = $stmt->fetch_object();
        
        if($row->user_photo != "no-photo.jpg"){
            $photo = IMAGES_URL.'/'.urlencode(base64_encode($row->username.'/'.$row->user_photo));
        }else{
            $photo = INIT_URL."/img/".$row->user_photo;
        }
        
        $data = array(
                        "user_id"=>$row->user_id,
                        "username"=>$row->username,
                        "fullname"=>$row->fullname,
                        "email"=>$row->email,
                        "nohp"=>$row->phone,
                        "dob"=>$row->dob,
                        "gender"=>$row->gender,
                        "key"=>$row->user_key,
                        "user_photo"=>$photo,
                        "shop_id"=>$row->shop_id,
                        "shop_name"=>$row->shop_name,
                        "brand_id"=>$row->shop_current_brand,
                        "delivery_id"=>$row->shop_delivery
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
        Function referred on : listPendingUser.php
        Used for returning array data
    */
    function listPendingUser($stmt,$stmtCount,$pagesize){
        $data = array();
        
        $i = 0;
        $rowCount = $stmtCount->fetch_object();
        $total = intval($rowCount['user_count']);
        
        do {
            $result = $con->store_result();
            
            while ($row = $result->fetch_row()) {
                if($i > 0){
                    $data[] = array(
                          "user_id" => $row[0],
                          "username" => $row[1],
                          "photo_card" => IMAGES_URL.'/'.urlencode(base64_encode($row[1].'/seller/'.$row[2])),
                          "photo_selfie" => IMAGES_URL.'/'.urlencode(base64_encode($row[1].'/seller/'.$row[3])),
                          "user_asked_seller_date" => $row[4]
                        );
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