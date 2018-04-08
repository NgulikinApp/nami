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
    
        $stmt->bind_result($col1,$col2,$col3,$col4,$col5,$col6,$col7);
        
        $stmt->fetch();
        
        if($col7 != "no-photo.jpg"){
            $user_photo = 'http://'.IMAGES_URL.'/'.$col3.'/'.$col7;
        }else{
            $user_photo = "http://".INIT_URL."/img/".$col7;
        }
        
        $data['fullname'] = $col1;
        $data['dob'] = $col2;
        $data['username'] = $col3;
        $data['gender'] = $col4;
        $data['phone'] = $col5;
        $data['email'] = $col6;
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
        
        $stmt = $con->prepare(" SELECT 
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
                                            user_id=?
                                )as inner1 
                                    LEFT JOIN shop ON inner1.user_id=shop.user_id");
        $stmt->bind_param("s", $user_id);
        
        $stmt->execute();
    
        $stmt->bind_result($col1,$col2,$col3,$col4,$col5,$col6,$col7,$col8,$col9,$col10);
        
        $stmt->fetch();
        
        if($col9 != "no-photo.jpg"){
            $photo = 'http://'.IMAGES_URL.'/'.$col2.'/'.$col9;
        }else{
            $photo = "http://".INIT_URL."/img/".$col9;
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
                        "shop_id"=>$col10
                    );
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified((object)$data);
    }
?>