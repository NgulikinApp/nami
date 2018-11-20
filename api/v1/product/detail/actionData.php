<?php
    /*
        This API used in ngulikin.com/js/module-profile.js
    */
    
    //--------------------------------------------------------------------------
	// Link to File
	//--------------------------------------------------------------------------
	include $_SERVER['DOCUMENT_ROOT'].'/api/model/general/get_auth.php';
	include $_SERVER['DOCUMENT_ROOT'].'/api/model/general/postraw.php';
    include $_SERVER['DOCUMENT_ROOT'].'/api/model/beanoflink.php';
    include 'functions.php';
    /*
        Function location in : /model/jwt.php
    */
    use \Firebase\JWT\JWT;
    
    use \Gumlet\ImageResize;
    use \Gumlet\ImageResizeException;
    
    /*
        Function location in : /model/connection.php
    */
    $con = conn();
    
    /*
        Function location in : /model/general/get_auth.php
    */
    $token = bearer_auth();
    
    /*
        Function location in : /model/general/postraw.php
    */
    $request = postraw();
    
    $con->begin_transaction(MYSQLI_TRANS_START_READ_WRITE);
    
    if($token == ''){
        /*
            Function location in : /model/general/functions.php
        */
        invalidCredential();
    }else{
        try{
            //secretKey variabel got from : /model/jwt.php
            $exp = JWT::decode($token, $secretKey, array('HS256'));
            
            if(isset($_SESSION['user'])){
                $user_id = $_SESSION['user']["user_id"];
                $key = $_SESSION['user']["key"];
                $username = $_SESSION['user']["username"];
            }else{
                $user_id = '';
                $key = '';
                $username = '';
            }
            
            /*
                Function location in : /model/general/functions.php
            */
            if(checkingAuthKey($con,$user_id,$key) == 0){
                return invalidKey();
            }
            
            echo $count_product_image = count($_FILES['file']['name']);
            
            //if(!empty($_FILES["product_image"])){
            /*$poduct_photo_data = $request['product_image'];
            $poduct_photo_data_len = count($request['product_image']);
            
            for($i=0; $i<$poduct_photo_data_len; $i++){
                $product_photo_name = getID(16).'.png';
                header('content-type: image/jpeg');
                
                echo base64_decode( $poduct_photo_data[$i]);
                /*$path_photo = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username.'/product';
                
                $product_photo = $path_photo.'/'.$product_photo_name;
                //write image into directory
                file_put_contents($product_photo, $data_photo);
                
                //Resize image
                $imageresize = new ImageResize($product_photo);
                $imageresize->resizeToBestFit(150, 150);
                $imageresize->save($product_photo);*/
                
            //}
            //echo $count_product_image = count($_FILES['file']['name']);
                //echo $count_product_image = count($_FILES['file']['name']);
                
                /*for($i=0; $i<$count_product_image; $i++){
                    $product_photo_name = ($i==0)?'':$product_photo_name.',';
                    
                    $product_photo_name = getID(16).'.png';
                    
                    $path_photo = dirname($_SERVER["DOCUMENT_ROOT"]).'/public_html/images/'.$username.'/product';
                    
                    $product_photo = $path_photo.'/'.$product_photo_name;
                    
                    move_uploaded_file($_FILES['product_image']['tmp_name'][$i], $product_photo);
                }*/
            //}
            
            //echo $product_photo_name;
            /*if($request['method'] == 'add'){
                $stmt = $con->query("INSERT INTO product(product_name,product_description,product_price,product_weight,product_stock,product_minimum,product_condition,product_image,category_id,subcategory_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                
                $stmt->bind_param("ssiiiiisii", $_POST['product_name'], $_POST['product_description'], $_POST['product_price'], $_POST['product_weight'], $_POST['product_stock'],$request['product_minimum'],$_POST['product_condition'],$product_photo_name,$_POST['product_category'],$_POST['product_subcategory']);
                
                $stmt->execute();
                
                $product_id = runQuery_returnId($stmt);
            }else{
                $stmt = $con->prepare("UPDATE product SET product_name=?, product_description=?, product_price=?, product_weight=?,product_stock=?,product_minimum=?,product_condition=?,product_image=?,category_id=?,subcategory_id=? WHERE product_id=?");   
                
                $stmt->bind_param("ssiiiiisiii", $_POST['product_name'], $_POST['product_description'], $_POST['product_price'], $_POST['product_weight'], $_POST['product_stock'],$request['product_minimum'],$_POST['product_condition'],$product_photo_name,$_POST['product_category'],$_POST['product_subcategory'],$_POST['product_id']);
                
                $stmt->execute();
                
                $stmt->close();
                
                $product_id = $request['product_id'];
            }
        
            /*
                Function location in : functions.php
            */
            //actionData($_POST['product_name'],$_POST['product_description'],$_POST['product_price'],$_POST['product_weight'],$_POST['product_stock'],$_POST['product_minimum'],$_POST['product_condition'],$_POST['product_category'],$_POST['product_subcategory'],$_POST['product_id']);
        }catch(Exception $e){
            /*
                Function location in : /model/general/functions.php
            */
            tokenExpired();
        }
    }
    
    $con->commit();
    /*
        Function location in : /model/connection.php
    */
    conn_close($con);
?>