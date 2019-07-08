<?php
    /*
        This API used in ngulikin.com/js/module-general.js
    */
    
    //--------------------------------------------------------------------------
	// Link to File
	//--------------------------------------------------------------------------
	include $_SERVER['DOCUMENT_ROOT'].'/api/model/general/get_auth.php';
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
        Function location in : /model/general/get_auth.php
    */
    $token = bearer_auth();
    
    $con->begin_transaction(MYSQLI_TRANS_START_READ_ONLY);
    
    if($token == ''){
        /*
            Function location in : /model/general/functions.php
        */
        invalidCredential();
    }else{
       try{
            //secretKey variabel got from : /model/jwt.php
            $exp = JWT::decode($token, $secretKey, array('HS256'));
            
            $query = "SELECT 
                                            category.category_id, 
                                            category_name, 
                                            category_icon,
                                            subcategory.subcategory_id,
                                            subcategory.subcategory_name
                                    FROM 
                                            category
                                            LEFT JOIN (SELECT 
                                                           s.category_id,
                                                       	   GROUP_CONCAT(subcategory_id) AS subcategory_id,
                                                           GROUP_CONCAT(s.subcategory_name) AS subcategory_name
                                                       FROM
                                                       	    subcategory s
                                                       WHERE 
                                                            subcategory_isactive=1
                                                       GROUP BY s.category_id
                                                      )
                                            subcategory ON category.category_id=subcategory.category_id
                                    WHERE
                                            1=?
                                            AND
                                            category_isactive=1";
            /*
                Function location in : functions.php
                Cache variabel got from : /model/memcache.php
            */
            listcategory($query,$cache,"m_productcategory",$con);
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