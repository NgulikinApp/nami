<?php
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
    
    /*
        Function location in : /model/connection.php
    */
    $con = conn();
    
    /*
        Function location in : /model/general/postraw.php
    */
    $request = postraw();
    
    /*
        Parameters
    */
    $list_productid = param($request['list_productid']);
    $user_address_id = param($request['user_address_id']);
    $list_notes = param($request['list_notes']);
    $list_delivery_id = param($request['list_delivery_id']);
    $list_delivery_price = param($request['list_delivery_price']);
    
    /*
        Function location in : /model/general/get_auth.php
    */
    $token = bearer_auth();
    
    $con->begin_transaction(MYSQLI_TRANS_START_READ_WRITE);
    
    if($token == ''){
        /*
            Function location in : /model/general/functions.php
        */
        invalidCredential();
    }else{
        try{
            //secretKey variabel getting from : /model/jwt.php
            $exp = JWT::decode($token, $secretKey, array('HS256'));
            
            if(isset($_SESSION['user'])){
                $user_id = $_SESSION['user']["user_id"];
                $key = $_SESSION['user']["key"];
            }else{
                $user_id = '';
                $key = '';
            }
            
            /*
                Function location in : /model/general/functions.php
            */
            if(checkingAuthKey($con,$user_id,$key,0,$cache) == 0){
                return invalidKey();
            }
            
            $product_idarray = explode(',',$list_productid);
            $notes_array = explode('~',$list_notes);
            $delivery_idarray = explode(',',$list_delivery_id);
            $delivery_price_array = explode(',',$list_delivery_price);
            
            $product_idcount = count($product_idarray);
            $invoice_no = "NG".getID(13);
            
            $last_paiddate = date('Y-m-d H:i', strtotime("+2 days"));
            $stmt = $con->prepare("INSERT INTO invoice(invoice_no,user_id,invoice_last_paiddate,user_address_id) VALUES(?,?,?,?)");
                   
            $stmt->bind_param("sssi", $invoice_no,$user_id,$last_paiddate,$user_address_id);
                    
            $stmt->execute();
            
            $invoice_id = $con->insert_id;
                
            $stmt->close();
            
            $j = 0;
            $shop_idtemp = 0;
            
            for($i=0;$i<$product_idcount;$i++){
                $stmt = $con->prepare("SELECT 
                                            cart_sumproduct,
                                            brand.brand_id AS brand_id,
                                            shop.shop_id AS shop_id
                                    FROM 
                                            cart
                                            LEFT JOIN product ON product.product_id=cart.product_id
                                            LEFT JOIN brand ON brand.brand_id=product.brand_id
                                            LEFT JOIN shop ON shop.shop_id=brand.shop_id
                                    WHERE 
                                            cart.user_id = ?
                                            AND
                                            cart.product_id = ?
                                            AND
                                            cart_isactive = '1'");
                
                $stmt->bind_param("si", $user_id,$product_idarray[$i]);
                
                $stmt->execute();
                
                $stmt->bind_result($col1,$col2,$col3);
                
                $stmt->fetch();
                
                $cart_sumproduct = $col1;
                $brand_id = $col2;
                $shop_id = $col3;
                
                $stmt->close();
                
                if($i == 0){
                    $shop_idtemp = $shop_id;
                }
                
                if(intval($shop_idtemp) != intval($shop_id)){
                    $shop_idtemp = $shop_id;
                    $j++;
                }
                
                $stmt = $con->prepare("UPDATE cart SET cart_isactive='0' where user_id=? and product_id=?");
                   
                $stmt->bind_param("si", $user_id,$product_idarray[$i]);
                        
                $stmt->execute();
                    
                $stmt->close();
                
                $stmt = $con->prepare("INSERT INTO invoice_shop_detail(invoice_id,shop_id,delivery_id,invoice_shop_detail_delivery_price,invoice_shop_detail_notes) VALUES(?,?,?,?,?)");
                   
                $stmt->bind_param("iiiis", $invoice_id,$shop_id,$delivery_idarray[$j],$delivery_price_array[$j],$notes_array[$j]);
                        
                $stmt->execute();
                
                $invoice_shop_detail_id  = $con->insert_id;
                
                $stmt->close();
                
                $stmt = $con->prepare("INSERT INTO invoice_brand_detail(invoice_shop_detail_id,brand_id) VALUES(?,?)");
                   
                $stmt->bind_param("ii", $invoice_shop_detail_id,$brand_id);
                        
                $stmt->execute();
                
                $invoice_brand_detail_id  = $con->insert_id;
                
                $stmt->close();
                
                $invoice_detail_notran = getID(15);
                $stmt = $con->prepare("INSERT INTO invoice_product_detail(invoice_brand_detail_id,product_id,invoice_product_detail_notran,invoice_product_detail_sumproduct) VALUES(?,?,?,?)");
                   
                $stmt->bind_param("iisi", $invoice_brand_detail_id,$product_idarray[$i],$invoice_detail_notran,$cart_sumproduct);
                        
                $stmt->execute();
                
                $stmt->close();
                
                $stmt = $con->prepare("INSERT INTO invoice_status_detail(invoice_id) VALUES(?)");
                   
                $stmt->bind_param("i", $invoice_id);
                        
                $stmt->execute();
                
                $stmt->close();
            }
            
            /*
                Function location in : functions.php
            */
            chosencart($invoice_id);
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