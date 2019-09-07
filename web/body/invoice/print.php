<?php
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
        
    /*
        This API used in ngulikin.com/js/module-home.js
    */
    
    if(isset($_SESSION['user'])){
        $sql = "
                SELECT 
                    fullname,
                    SUM(invoice_shop_detail_delivery_price) AS delivery_price,
                    GROUP_CONCAT(product_name SEPARATOR '~') AS product_name,
                    GROUP_CONCAT(invoice_product_detail_sumproduct SEPARATOR '~') AS invoice_product_detail_sumproduct,
                    GROUP_CONCAT(product_price SEPARATOR '~') AS product_price,
					address,
					CONCAT(villages.name,', ',districts.name,', ',regencies.name) AS place,
					provinces.name AS province_name,
					DATE_FORMAT(invoice_createdate, '%b %e, %Y') AS invoice_createdate
                FROM
                    invoice
					LEFT JOIN invoice_shop_detail ON invoice_shop_detail.invoice_id = invoice.invoice_id
					LEFT JOIN invoice_brand_detail ON invoice_brand_detail.invoice_shop_detail_id = invoice_shop_detail.invoice_shop_detail_id
					LEFT JOIN invoice_product_detail ON invoice_product_detail.invoice_brand_detail_id = invoice_brand_detail.invoice_brand_detail_id
					LEFT JOIN product ON product.product_id = invoice_product_detail.product_id
                    LEFT JOIN user_address ON user_address.user_id=invoice.user_id
                    LEFT JOIN `user` ON `user`.user_id=invoice.user_id
					LEFT JOIN `villages` ON `villages`.id=`user_address`.villages_id
                    LEFT JOIN `districts` ON `districts`.id=`villages`.district_id
                    LEFT JOIN `regencies` ON `regencies`.id=`districts`.regency_id
                    LEFT JOIN `provinces` ON `provinces`.id=`regencies`.province_id
                WHERE
                    invoice_shop_detail_notran = ?
                    AND
					priority='1'
					AND
					user_address_isactive=1
           ";
        
        $stmt = $con->prepare($sql);
        $stmt->bind_param("s", $id);
        
        $stmt->execute();
        $stmt->bind_result($col1, $col2, $col3, $col4, $col5, $col6, $col7, $col8, $col9);
            
        $stmt->fetch();
        
        $product_namearray = explode('~', $col3);
        $invoice_product_detail_sumproductarray = explode('~', $col4);
        $product_pricearray = explode('~', $col5);
        
        $pdf = new PDF();
        
        $pdf->SetTitle('Invoice :#'.$id, true);
        
        // Instanciation of inherited class
        $pdf->AliasNbPages();
        $pdf->AddPage();
        $pdf->SetLeftMargin(10);
        $pdf->SetRightMargin(10);
        $pdf->Image($_SERVER['DOCUMENT_ROOT'].'/img/icontext.png',10,12,30,0,'');
        $pdf->Ln(20);
        $pdf->SetFont('arial','',8);
        $pdf->SetTextColor(128,128,128);
        $pdf->Cell(25,10,'BILL TO',0,0);
        $pdf->Ln(5);
        $pdf->SetFont('arial','B',8);
        $pdf->Cell(90,10,$col1,0,0);
        $pdf->Cell(100,10,'Your Co.',0,0,'R');
        $pdf->Ln(5);
        $pdf->SetFont('arial','',8);
        $pdf->Cell(90,10,$col6,0,0);
        $pdf->Cell(100,10,'Jl. Sukamaju RT 02/01  No.43',0,0,'R');
        $pdf->Ln(5);
        $pdf->Cell(90,10,$col7,0,0);
        $pdf->Cell(100,10,'Sukaluyu, Bandung, Jawa Barat',0,0,'R');
        $pdf->Ln(5);
        $pdf->Cell(90,10,$col8,0,0);
        $pdf->Cell(100,10,'Indonesia',0,0,'R');
        $pdf->Ln(15);
        $pdf->SetDrawColor(220,220,220);
        $pdf->Line(11,65,199,65);
        $pdf->Ln(5);
        $pdf->Cell(90,10,'Invoice :#'.$id,0,0);
        $pdf->Ln(5);
        $pdf->Cell(90,10,$col9,0,0);
        $pdf->Ln(10);
        $pdf->SetTextColor(192,192,192);
        $pdf->Cell(80,10,'Item',0,0,'L');
        $pdf->Cell(45,10,'Price',0,0,'R');
        $pdf->Cell(20,10,'Qty',0,0,'R');
        $pdf->Cell(45,10,'Total',0,0,'R');
        $pdf->Ln(5);
        $pdf->SetTextColor(128,128,128);
        $pdf->SetFont('arial','B',8);
        $pdf->Line(11,95,199,95);
        $pdf->Ln(5);
        
        $brand_namearraycount = count($product_pricearray);
        
        $sub_total = 0;
        
        $line = 100;
        
        for($i=0;$i<$brand_namearraycount;$i++){
            
            $product_pricesum = $product_pricearray[$i] * $invoice_product_detail_sumproductarray[$i];
            $sub_total = $sub_total  + $product_pricesum;
            
            $pdf->Cell(80,10,$product_namearray[$i],0,0,'L');
            $pdf->Cell(45,10,number_format($product_pricearray[$i],2,",","."),0,0,'R');
            $pdf->Cell(20,10,$invoice_product_detail_sumproductarray[$i],0,0,'R');
            $pdf->Cell(45,10,number_format($product_pricesum,2,",","."),0,0,'R');
            $pdf->Ln(5);
            
            $line = $line + 5;
        }
        
        $total = $col2 + $sub_total;
        
        $pdf->Line(11,$line,199,$line);
        $pdf->Ln(20);
        $pdf->SetLeftMargin(135);
        $pdf->Cell(20,10,'Sub Total :',0,0,'L');
        $pdf->Cell(45,10,number_format($sub_total,2,",","."),0,0,'R');
        $pdf->Ln(5);
        $pdf->SetTextColor(192,192,192);
        $pdf->Cell(20,10,'Delivery Price :',0,0,'L');
        $pdf->Cell(45,10,number_format($col2,2,",","."),0,0,'R');
        $pdf->Ln(5);
        $pdf->Line(136,$line+30,199,$line+30);
        $pdf->Ln(5);
        $pdf->SetTextColor(128,128,128);
        $pdf->Cell(20,10,'Total (RP) :',0,0,'L');
        $pdf->Cell(45,10,number_format($total,2,",","."),0,0,'R');
        $pdf->Output('','Invoice :#'.$id.'.pdf',true);
    }else{
        header("Location: .");
    }
    
    $con->commit();
        
    /*
        Function location in : /model/connection.php
    */
    conn_close($con);
?>