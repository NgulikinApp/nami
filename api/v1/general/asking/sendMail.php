<?php
    /*
        This API used in ngulikin.com/js/module-general.js
    */

    date_default_timezone_set('Etc/UTC');
    
    //--------------------------------------------------------------------------
	// Link to File
	//--------------------------------------------------------------------------
    include $_SERVER['DOCUMENT_ROOT'].'/api/model/beanoflink.php';
    
    /*
        Function location in : /model/connection.php
    */
    $con = conn();
    
    /*
        Get parameter with from ajax form
        list parameter:
        1. name
        2. email
        3. question
    */
    
    /*
        Parameters
    */
    $user_name	= param($_POST['name']);
	$user_email = param($_POST['email']);
	$question	= param($_POST['question']);
	
	$con->begin_transaction(MYSQLI_TRANS_START_READ_WRITE);
	
	//checking all parameter that should not be empty
	if($user_name == "" || $user_email == "" || $question == ""){
	    $result = (object)array();
		$data = array(
			'status' => "NO",
			'message' => "Nama, email, dan pertanyaan harus diisi",
			'response' => $result
		);
	    
	    /*
            Function location in : /model/generatejson.php
        */
	    return generateJSON($data);
	
	//checking email format is valid
	}else if(check_email_address($user_email) == false){
	    $result = (object)array();
		$data = array(
			'status' => "NO",
			'message' => "Format email tidak benar",
			'response' => $result
		);
		
		/*
            Function location in : /model/generatejson.php
        */
	    return generateJSON($data);
	}
	
	$target_file = "";
	if(!empty($_FILES["file"])){
	    $target_file = dirname($_SERVER["DOCUMENT_ROOT"])."/public_html/api/temp/". basename($_FILES["file"]["name"]);
	    
        //upload file into 'temp' directory
        move_uploaded_file($_FILES["file"]["tmp_name"], $target_file);
	}
    
    $mail = new PHPMailer;
    $mail->isSMTP();
	$mail->Debugoutput = 'html';
	$mail->Host = "mail.ngulikin.com";
	$mail->Port = 25;
	$mail->SMTPAuth = true;
	$mail->Username = "ngulikin";
	$mail->Password = "FD76889Ddt!";
	$mail->setFrom($user_email, $user_name);
	$mail->addAddress('hello.ngulik@gmail.com', 'Admin');
	$mail->Subject = 'Tanya Ngulikin';
	$mail->Body = $question;
	$mail->AltBody = 'This is a plain-text message body';
	if($target_file != ""){
		$mail->addAttachment($target_file);
	}
	
	//email sended successfully
	
	if ($mail->send()) {
	    $result = array(
			'name' => $user_name,
			'email' => $user_email,
			'question' => $question,
			'attachment' => $target_file
		);
		$data = array(
			'status' => "OK",
			'message' => "Email has been sent successfully",
			'response' => $result
		);
	
	//email failed to sent
	} else {
		$result = (object)array();
		$data = array(
			'status' => "NO",
			'message' => "Email has not been sent",
			'response' => $result
		);
	}
	
	$stmt = $con->prepare("INSERT INTO questions(fullname,email,desc,attach_file) VALUES(?,?,?,?)");
                
    $stmt->bind_param("ssss", $user_name, $user_email, $question, basename($_FILES["file"]["name"]));
            
    $stmt->execute();
                
    $stmt->close();
	
	/*
        Function location in : /model/generatejson.php
    */
	generateJSON($data);
	if($target_file != "")unlink($target_file);
	
	$con->commit();
    
    /*
        Function location in : /model/connection.php
    */
    conn_close($con);
?>