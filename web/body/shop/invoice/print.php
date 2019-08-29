<?php
    /*
        This API used in ngulikin.com/js/module-home.js
    */
    
    //--------------------------------------------------------------------------
	// Link to File
	//--------------------------------------------------------------------------
    include $_SERVER['DOCUMENT_ROOT'].'/api/model/general/fpdf.php';
    include $_SERVER['DOCUMENT_ROOT'].'/api/model/beanoflink.php';
    
    /*
        Function location in : /model/connection.php
    */
    $con = conn();
    
    $linkArray = explode('/',$actual_link);
    $id = array_values(array_slice($linkArray, -1))[0];
    $id = preg_replace('/-/', ' ', $id);
    
    $con->begin_transaction(MYSQLI_TRANS_START_READ_ONLY);
    
    if(isset($_SESSION['user'])){
        $now = getdate();
        $html = 'You can now easily print text mixing different styles: <b>bold</b>, <i>italic</i>,
            <u>underlined</u>, or <b><i><u>all at once</u></i></b>!<br><br>You can also insert links on
            text, or on an image: click on the logo.';
            
        $pdf = new PDF();
        
        $pdf->SetTitle($now['mday'].'-'.$now['mon'].'-'.$now['year'], true);
        
        /*// First page
        $pdf->AddPage();
        $pdf->SetFont('Arial','',20);
        $pdf->Write(5,"To find out what's new in this tutorial, click ");
        $pdf->SetFont('','U');
        $link = $pdf->AddLink();
        $pdf->Write(5,'here',$link);
        $pdf->SetFont('');
        // Second page
        $pdf->AddPage();
        $pdf->SetLink($link);
        $pdf->Image($_SERVER['DOCUMENT_ROOT'].'/img/icontext.png',10,12,30,0,'','http://www.fpdf.org');
        $pdf->SetLeftMargin(45);
        $pdf->SetFontSize(14);
        $pdf->WriteHTML($html);
        $pdf->Output();*/
        
        $pdf->AddPage();
        $pdf->SetFont('Arial','',20);
        $pdf->Image($_SERVER['DOCUMENT_ROOT'].'/img/icontext.png',10,12,30,0,'','http://www.fpdf.org');
        $pdf->Output();
    }else{
        echo "Unauthorized";
    }
    
    $con->commit();
    
    /*
        Function location in : /model/connection.php
    */
    conn_close($con);

?>

</html>