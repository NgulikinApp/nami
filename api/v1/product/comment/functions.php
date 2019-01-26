<?php
    /*
        Function referred on : review.php, discuss.php
        Used for getting the verified account
        Return data:
                - id
                - product_id
                - user_id
                - fullname
                - product_comment
                - comment_date
    */
    function comment($stmt,$id,$product_id,$user_id,$comment,$user_photo,$username){
        $stmt->execute();
        
        $stmt->bind_result($col1);
        
        $stmt->fetch();
        
        $data = array(
                    "id" => intval($id),
                    "product_id" => intval($product_id),
                    "user_id" => $user_id,
                    "username" => $username,
                    "user_photo" => $user_photo,
                    "product_comment" => $comment,
                    "comment_date" => $col1
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
                - product_id
                - user_id
                - fullname
                - product_comment
                - comment_date
    */
    function commentreply($stmt,$id,$product_discuss_id,$user_id,$comment,$user_photo,$fullname){
        $stmt->execute();
        
        $stmt->bind_result($col1);
        
        $stmt->fetch();
        
        $data = array(
                    "id" => intval($id),
                    "product_discuss_id" => intval($product_discuss_id),
                    "user_id" => $user_id,
                    "fullname" => $fullname,
                    "user_photo" => $user_photo,
                    "product_comment" => $comment,
                    "comment_date" => $col1
                );
                        
        $stmt->close();
        
        /*
            Function location in : /model/general/functions.php
        */
        credentialVerified((object)$data);
    }
    
    /*
        Function referred on : discuss.php,review.php
        Used for cheking user shop_id and current shop_id
        Return data:
                - status (NO)
                - message
                - result
    */
    function unauthComment(){
        $dataout = array(
                    "status" => "NO",
                    "message" => "Unauthorized for commenting",
                    "result" => array()
                );
        
        /*
            Function location in : /model/generatejson.php
        */
        return generateJSON($dataout);
    }
    
    /*
        Function referred on : discuss.php,review.php
        Used for returning empty comment message
        Return data:
                - status (NO)
                - message
                - result
    */
    function emptyComment(){
        $dataout = array(
                    "status" => "NO",
                    "message" => "Comment is empty",
                    "result" => array()
                );
        
        /*
            Function location in : /model/generatejson.php
        */
        return generateJSON($dataout);
    }
?>