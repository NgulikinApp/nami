<?php
    /*
        This API used in ngulikin.com/js/module-forgotpassword.js
    */
    
    //--------------------------------------------------------------------------
	// Link to File
	//--------------------------------------------------------------------------
    include $_SERVER['DOCUMENT_ROOT'].'/api/model/beanoflink.php';
    include $_SERVER['DOCUMENT_ROOT'].'/api/model/general/get_auth.php';
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
        Function location in : /model/general/get_auth.php
    */
    $token = bearer_auth();
    
    /*
        Parameters
    */
    $name = param(@$_GET['name']);
    $selsort = param(@$_GET['selsort']);
    $pricemax = param(@$_GET['pricemax']);
    $pricemin = param($_GET['pricemin']);
    $rate = param(@$_GET['rate']);
    $type = param(@$_GET['type']);
    $page = param(@$_GET['page']);
    $pagesize = param(@$_GET['pagesize']);
    $category = param(@$_GET['category']);
    $subcategory = param(@$_GET['subcategory']);
    $province = param(@$_GET['province']);
    $regency = param(@$_GET['regency']);
    
    $con->begin_transaction(MYSQLI_TRANS_START_READ_ONLY);
    
    if($token == ''){
        /*
            Function location in : /model/general/functions.php
        */
        invalidCredential();
    }else{
        try{
            //secretKey variabel getting from : /model/jwt.php
            $exp = JWT::decode($token, $secretKey, array('HS256'));
            
            $query = "";
            if($type == 'product'){
                $query .= "SELECT 
                                @count_product := COUNT(product_id) 
                            FROM 
                                product
                                LEFT JOIN brand ON brand.brand_id = product.brand_id
                                LEFT JOIN shop ON shop.shop_id = brand.shop_id
                            WHERE
                                1=1";
                
                /*
                    Function location in : function.php
                */            
                $query .= buildCondition_item(@$name,@$pricemax,@$pricemin,@$rate,@$category,$subcategory,$province,$regency);
                
                $query .= ";";
                
                $query .= "SELECT 
                                product_id,
                                product_name,
                                product_image,
                                product_price,
                                username,
                                DATEDIFF(CURDATE(),CAST(product_createdate AS DATE)) AS difdate,
                                @count_product AS count_product,
								shop_name,
								product_average_rate
                            FROM 
                                product
                                LEFT JOIN brand ON brand.brand_id = product.brand_id
                                LEFT JOIN shop ON shop.shop_id = brand.shop_id
                                LEFT JOIN `user` ON `user`.user_id = shop.user_id
                            WHERE
                                1=1";
                
                /*
                    Function location in : function.php
                */
                $query .= buildCondition_item(@$name,@$pricemax,@$pricemin,@$rate,@$category,$subcategory,$province,$regency);
                
                $query .= ' AND product_isactive=1';
                
                $query .= ' ORDER BY';
                if(@$selsort == 2){
                    $query .= ' product_price';
                }else if(@$selsort == '3'){
                    $query .= ' product_id';
                }else if(@$selsort == '4'){
                    $query .= ' product_price DESC';
                }else{
                    $query .= ' product_id DESC';
                }
            }else{
                $query .= "SELECT 
                                @count_shop := COUNT(shop_id) 
                            FROM 
                                shop
                            WHERE
                                1=1";
                if(@$province != ''){
                    $query .= " AND shop_provinces = '".$province."'";
                }
                
                if(@$regency != ''){
                    $query .= " AND shop_regencies = '".$regency."'";
                }
        
                if(@$name != ''){
                    $query .= " AND shop_name like '%".$name."%'";
                }
                
                $query .= ";";
                
                $query .= "SELECT 
                                    shop_id, 
                                    shop_name,
                                    shop_icon,
                                    username,
                                    DATEDIFF(CURDATE(),CAST(shop_createdate AS DATE)) AS difdate,
                                    @count_shop AS count_shop,
                                    regencies.`name` as regency_name
                            FROM 
                                    shop
                                    LEFT JOIN `user` ON `user`.user_id = shop.user_id
                                    LEFT JOIN regencies ON regencies.id=shop.shop_regencies
                            WHERE
                                    1=1";
                                    
                if(@$province != ''){
                    $query .= " AND shop_provinces = '".$province."'";
                }
                
                if(@$regency != ''){
                    $query .= " AND shop_regencies = '".$regency."'";
                }
        
                if(@$name != ''){
                    $query .= " AND shop_name like '%".$name."%'";
                }
                
                $query .= ' ORDER BY shop_id DESC';
            }
            
            
            $query .= ' LIMIT '.$page.','.$pagesize;
            
            /*
                Function location in : functions.php
            */
            
            dosearch($query,$con,$type,$pagesize);
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