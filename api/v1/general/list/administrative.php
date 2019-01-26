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
        Parameters
    */
    $id = @param($_GET['id']);
    $idlen = strlen($id);
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
            
            if($idlen == 7){
                $query = "SELECT id,name FROM villages WHERE district_id=?";
                $key_cache = "m_adm_villages_".$id;
            }else if($idlen == 4){
                $query = "SELECT id,name FROM districts WHERE regency_id=?";
                $key_cache = "m_adm_districts_".$id;
            }else if($idlen == 2){
                $query = "SELECT id,name FROM regencies WHERE province_id=?";
                $key_cache = "m_adm_regencies_".$id;
            }else{
                $query = "SELECT id,name FROM provinces";
                $key_cache = "m_adm_provinces";
            }
            
            /*
                Function location in : functions.php
                Cache variabel got from : /model/memcache.php
            */
            listadminis($query,$cache,$key_cache,$con,$id);
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