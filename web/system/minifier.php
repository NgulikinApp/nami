<?php
	/*
	 * JS and CSS Minifier 
	 * version: 1.0 (2013-08-26)
	 *
	 * This document is licensed as free software under the terms of the
	 * MIT License: http://www.opensource.org/licenses/mit-license.php
	 *
	 * Toni Almeida wrote this plugin, which proclaims:
	 * "NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK."
	 * 
	 * This plugin uses online webservices from javascript-minifier.com and cssminifier.com
	 * This services are property of Andy Chilton, http://chilts.org/
	 *
	 * Copyrighted 2013 by Toni Almeida, promatik.
	 */
	
	function minifyJS($arr,$jsversionstring){
	    $param = 'js';
		minify($arr, 'https://javascript-minifier.com/raw',$jsversionstring,$param);
	}
	
	function minifyCSS($arr,$jsversionstring,$isDetail){
	    $param = 'css';
		minify($arr, 'https://cssminifier.com/raw',$jsversionstring,$param,$isDetail);
	}
	
	function minify($arr, $url, $jsversionstring, $param,$isDetail) {
		foreach ($arr as $key => $value) {
			$handler = fopen($value, 'w') or die("File <a href='" . $value . "'>" . $value . "</a> error!<br />");
			fwrite($handler, getMinified($url, file_get_contents($key)));
			fclose($handler);
			if($param == 'css'){
			    if($isDetail){
			        echo "<link type='text/css' media='all' href='../../".$value."'rel='stylesheet'>";  
			    }else{
			       echo "<link type='text/css' media='all' href='".$value."'rel='stylesheet'>";   
			    }
			}else{
			    echo "<script src='".$value."'></script>";
			}
		}
	}
	
	function getMinified($url, $content) {
		$postdata = array('http' => array(
	        'method'  => 'POST',
	        'header'  => 'Content-type: application/x-www-form-urlencoded',
	        'content' => http_build_query( array('input' => $content) ) ) );
		return file_get_contents($url, false, stream_context_create($postdata));
	}
	
?>
