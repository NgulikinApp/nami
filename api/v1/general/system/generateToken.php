<?php
    header('Access-Control-Allow-Origin: https://www.ngulikin.com');
    //--------------------------------------------------------------------------
	// Link to File
	//--------------------------------------------------------------------------
    include './api/model/jwt.php';
    include './api/model/generatejson.php';
    
    /*
        Function location in : /model/jwt.php
    */
    use \Firebase\JWT\JWT;
    
    //set time expired
    $payload = array(
        "exp" => time() + (60 * 60)
    );
    
    $jwt = JWT::encode(
                    $payload, //Data to be encoded in the JWT
                    $secretKey 
                );
                
    $data = array('result' => $jwt);
    
    /*
        Function location in : /model/generatejson.php
    */
    generateJSON($data);
?>