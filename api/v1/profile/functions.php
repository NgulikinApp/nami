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
        $stmt = $con->query(" SELECT 
                                        inner1.*,
                                        IFNULL(shop_id,0) as shop_id 
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
                        "shop_id"=>$row->shop_id
                    );
        
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
?>