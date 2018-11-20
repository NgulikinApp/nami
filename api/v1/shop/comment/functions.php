<?php
    /*
        Function referred on : review.php, discuss.php
        Used for getting the verified account
        Return data:
                - id
                - shop_id
                - user_id
                - fullname
                - shop_comment
                - comment_date
    */
    function comment($stmt,$id,$shop_id,$user_id,$comment,$user_photo,$fullname){
        $row = $stmt->fetch_object();
        
        $data = array(
                    "id" => intval($id),
                    "shop_id" => intval($shop_id),
                    "user_id" => $user_id,
                    "fullname" => $fullname,
                    "user_photo" => $user_photo,
                    "shop_comment" => $comment,
                    "comment_date" => $row->comment_date
                );
                        
        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified((object)$data);
    }
    
    /*
        Function referred on : replyDiscuss.php
        Used for getting the verified account
        Return data:
                - id
                - shop_id
                - user_id
                - fullname
                - shop_comment
                - comment_date
    */
    function commentreply($stmt,$id,$shop_discuss_id,$user_id,$comment,$user_photo,$fullname){
        $row = $stmt->fetch_object();
        
        $data = array(
                    "id" => intval($id),
                    "shop_discuss_id" => intval($shop_discuss_id),
                    "user_id" => $user_id,
                    "fullname" => $fullname,
                    "user_photo" => $user_photo,
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