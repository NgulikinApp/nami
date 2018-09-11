<?php
    /*
        Function referred on : all
        Used for generating code sha25
        Return data:
                - string
    */
    function encrypt_hash($string){
	   $hasted = strtoupper(hash("sha256",$string));
	   return $hasted;
    }
    
    /*
        Function referred on : all
        Used for calling the json data that wrong in input email or password account
        Return data:
                - status (YES/NO)
                - message
                - result
    */
    function notexist_account(){
        $data = array();
        
        $dataout = array(
                "status" => 'NO',
                "message" => 'Account is not exist',
                "result" => $data
        );
        
        /*
            Function location in : /model/generatejson.php
        */        
        generateJSON($dataout);
    }
    
    /*
        Function referred on : all
        Used for calling the json data that wrong in input email or password account
        Return data:
                - status (YES/NO)
                - message
                - result
    */
    function wrongpassoremail_account($isSignin){
        $data = array();
        
        if(intval($isSignin)){
            $dataout = array(
                    "status" => 'NO',
                    "message" => 'Email or password is wrong',
                    "result" => $data
                );
        }else{
            $dataout = array(
                    "status" => 'NO',
                    "message" => 'Email or username is wrong',
                    "result" => $data
                );
        }
        
        /*
            Function location in : /model/generatejson.php
        */        
        generateJSON($dataout);
    }
    
    /*
        Function referred on : all
        Used for calling the json data that inactive account
        Return data:
                - status (YES/NO)
                - message
                - result
    */
    function incative_account(){
        $data = array();
        $dataout = array(
                        "status" => 'NO',
                        "message" => 'Account has not activated, check your email',
                        "result" => $data
                    );
        
        /*
            Function location in : /model/generatejson.php
        */        
        generateJSON($dataout);
    }
    
    /*
        Function referred on : signin.php
        Used for getting the verified account
        Return data:
                - user_id
                - user_isactive (0/1)
                - password
                - socmed (googleplus,facebook,etc)
                - id_socmed
    */
    function account_verify($stmt){
        $row = $stmt->fetch_object();
        
        $user_id = $row->user_id;
        $user_isactive = $row->user_isactive;
        $password = $row->password;
        $socmed = $row->socmed;
        $idsocmed = $row->id_socmed;
        
        $stmt->close();
        
        return array($user_id,intval($user_isactive),$password,$socmed,$idsocmed);
    }
    
    /*
        Function referred on : signin.php
        Used for showing the data of signin account
        Return data:
                - username
                - fullname
                - university
                - major
                - source (web, android, ios, etc...)
                - socmed (ngulikin if the user login on manual, googleplus, facebook, etc...)
                - merchant
    */
    function get_data_signin($stmt){
        
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
                        "brand_id"=>$row->shop_current_brand,
                        "delivery_id"=>$row->shop_delivery
                    );
                    
        $_SESSION['user'] = $data;
    
        $dataout = array(
                        "status" => 'OK',
                        "message" => 'Signin successfully',
                        "result" => (object)array()
                    );
        
        $stmt->close();
        
        /*
            Function location in : /model/generatejson.php
        */
        return generateJSON($dataout);
    }
    
    /*
        Function referred on : /forgotpassword/sendingcode.php
        Used for getting the verified account
        Return data:
                - user_id
                - user_isactive (0/1)
                - email
                - fullname
    */
    function get_account_forgotpassword($stmt){
        $row = $stmt->fetch_object();
        
        $user_id = $row->user_id;
        $user_isactive = $row->user_isactive;
        $email = $row->email;
        $fullname = $row->fullname;
        
        $stmt->close();
        
        return array($user_id,intval($user_isactive),$email,$fullname);
    }
    
    /*
        Function referred on : /forgotpassword/checkingcode.php
        Used for checking the code on forgot password module
        Return data:
                - user_id
    */
    function code_verified($stmt){
        $row = $stmt->fetch_object();
        
        $user_id = $row->user_id;
        
        $stmt->close();
        
        return array($user_id);
    }
    
    /*
        Function referred on : /forgotpassword/checkingcode.php
        Used for checking the code on forgot password module
        Return data:
                - status (YES/NO)
                - message
                - result
    */
    function wrong_code_verified(){
        $data = array();
        
        $dataout = array(
                "status" => 'NO',
                "message" => 'Invalid code',
                "result" => $data
            );
        
        return generateJSON($dataout);
    }
    
    
    /*
        Function referred on : signin.php
        Used for compiling user table
        Return data:
    */
    function returndata_signin($user_id,$con){
        $stmt = $con->query("SELECT 
                                        inner1.*,
                                        IFNULL(shop_id,0) as shop_id,
                                        shop_current_brand,
                                        shop_delivery
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
        
        sessionCart($user_id,$con);        
        /*
            Function location in : functions.php
        */
        get_data_signin($stmt);
    }
    
    function sessionCart($user_id,$con){
        $data = $_SESSION['productcart'];
        if(isset($data)){
            $i = 0;
            $list_productid = "";
            foreach($data as &$value){
                $list_productid = ($i != 0)?','.$list_productid:'';
                $list_productid = $list_productid.$value['product_id'];
                $i++;
            }
            
            $stmt = $con->prepare("UPDATE cart SET cart_isactive='0' WHERE user_id=? AND product_id IN (?)");
            
            $stmt->bind_param("ss", $user_id,$list_productid);
                
            $stmt->execute();
            
            $stmt->close();
            $cartLen = count($data);
            for($i=0;$i<=$cartLen;$i++){
                $stmt = $con->prepare("INSERT INTO cart(user_id,product_id,sum_product,cart_adddate) VALUES(?,?,?,?)");
                
                $stmt->bind_param("siis", $user_id,$data[$i]['product_id'],$data[$i]['sum'],$data[$i]['date']);
                
                $stmt->execute();
                
                $stmt->close();
            }
        }
    }
    
    /*
        Function referred on : signout
        Used for calling the json data signout
        Return data:
                - status (YES/NO)
                - message
                - result
    */
    function signout(){
        $data = array();
        
        $dataout = array(
                "status" => 'OK',
                "message" => 'Signout successfully',
                "result" => (object)$data
        );
        
        /*
            Function location in : /model/generatejson.php
        */        
        generateJSON($dataout);
    }
?>