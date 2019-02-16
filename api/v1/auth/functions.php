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
        Function referred on : signin_admin.php
        Used for calling the json data that user is not admin
        Return data:
                - status (NO)
                - message
    */
    function access_denied(){
        $dataout = array(
                        "status" => 'NO',
                        "message" => 'access_denied'
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
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3);
        
        $stmt->fetch();
        
        $user_id = $col1;
        $user_isactive = $col2;
        $password = $col3;
        
        $stmt->close();
        
        return array($user_id,intval($user_isactive),$password);
    }
    
    /*
        Function referred on : signin.php
        Used for getting the verified account
        Return data:
                - user_id
                - password
                - user_admin (0/1)
    */
    function account_verify_admin($stmt){
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3);
        
        $stmt->fetch();
        
        $user_id = $col1;
        $password = $col2;
        $user_admin = intval($col3);
        
        $stmt->close();
        
        return array($user_id,$password,$user_admin);
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
    function get_data_signin($stmt,$cache){
        
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6, $col7, $col8, $col9, $col10, $col11, $col12, $col13, $col14, $col15, $col16, $col17);
        
        $stmt->fetch();
        
        if($col9 != "no-photo.jpg"){
            $photo = IMAGES_URL.'/'.urlencode(base64_encode($col2.'/'.$col9));
        }else{
            $photo = INIT_URL."/img/".$col9;
        }
        
        $date1=date_create(date("Y-m-d H:i:s"));
        $date2=date_create($col10);

        $diff=date_diff($date1,$date2);
        $days = $diff->format("%a");
        
        if($days <= 7){
            $time_signup = $days." hari bergabung";
        }else if($days <= 30){
            $week= floor($days/7);
            $time_signup = $week." minggu bergabung";
        }else if($days < 365){
            $month = floor($days/31);
            $time_signup = $month." bulan bergabung";
        }else{
            $year = floor($days/365);
            $time_signup = $year." tahun bergabung";
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
                        "user_seller"=>$col11,
                        "shop_id"=>$col12,
                        "shop_name"=>$col15,
                        "shop_icon"=>$col16,
                        "shop_banner"=>$col17,
                        "brand_id"=>$col13,
                        "delivery_id"=>$col14,
                        "time_signup"=>$time_signup
                    );
                    
        $_SESSION['user'] = $data;
        
        setMemcached("m_user_".$col1."_".$col8."_0",$cache,1,3600);
        
        session_regenerate_id();
        session_regenerate_id(true);
    
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
        $stmt->execute();
        
        $stmt->bind_result($col1, $col2, $col3, $col4);
        
        $stmt->fetch();
        
        $user_id = $col1;
        $user_isactive = $col2;
        $email = $col3;
        $fullname = $col4;
        
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
        $stmt->execute();
        
        $stmt->bind_result($col1);
        
        $stmt->fetch();
        
        $user_id = $col1;
        
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
    function returndata_signin($user_id,$con,$cache){
        $stmt = $con->prepare("SELECT 
                                        inner1.*,
                                        IFNULL(shop_id,0) as shop_id,
                                        shop_current_brand,
                                        shop_delivery,
                                        shop_name,
                                        shop_icon,
                                        shop_banner
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
                                            user_photo,
                                            time_signup,
                                            user_seller
                                        FROM 
                                            user 
                                        WHERE 
                                            user_id=?
                                )as inner1 
                                    LEFT JOIN shop ON inner1.user_id=shop.user_id");
                                    
        $stmt->bind_param("s", $user_id);    
        
        if(isset( $_SESSION['productcart']))sessionCart($user_id,$con);        
        /*
            Function location in : functions.php
        */
        get_data_signin($stmt,$cache);
    }
    
    function returndata_signin_admin($user_id,$key){
        $data = array(
                    "status" => $user_id,
                    "message" => $key
            );
        $_SESSION['user_admin'] = $data;
        
        session_regenerate_id();
        session_regenerate_id(true);
    
        $dataout = array(
                        "status" => 'OK',
                        "message" => 'Signin successfully'
                    );
        
        $stmt->close();
        
        /*
            Function location in : /model/generatejson.php
        */
        return generateJSON($dataout);
    }
    
    function sessionCart($user_id,$con){
        if(isset($_SESSION['productcart'])){
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
                $stmt = $con->prepare("INSERT INTO cart(user_id,product_id,cart_sumproduct,cart_adddate) VALUES(?,?,?,?)");
                
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
        return generateJSON($dataout);
    }
?>