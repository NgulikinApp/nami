<?php
    /*
        Function referred on : review.php, discuss.php
        Used for getting the verified account
        Return data:
                - user_id
                - user_isactive (0/1)
                - password
                - socmed (googleplus,facebook,etc)
                - id_socmed
    */
    function comment($stmt,$id,$shop_id,$user_id,$comment){
        $row = $stmt->fetch_object();
        
        if($row->user_photo == 'no-photo.jpg'){
            $photo = INIT_URL.'/img/'.$row->user_photo;
        }else{
            $photo = IMAGES_URL.'/'.urlencode(base64_encode($row->username.'/'.$row->user_photo));
        }
        
        $data = array(
                    "id" => intval($id),
                    "shop_id" => intval($shop_id),
                    "user_id" => $user_id,
                    "fullname" => $row->fullname,
                    "user_photo" => $photo,
                    "shop_comment" => $comment,
                    "comment_date" => $row->comment_date
                );
                        
        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified((object)$data);
    }
?>