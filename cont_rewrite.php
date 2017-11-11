<?php

	//-----------------------------------------------------------------------------------
	// Link to File 
	//-----------------------------------------------------------------------------------
	include('common/handler-uri.php');
	include('common/handler-output.php');
	include('common/globalCons-uri.php');
 
	//-----------------------------------------------------------------------------------
	// Now, $routes will contain all the routes. $routes[0] will correspond to first route. 
	//-----------------------------------------------------------------------------------
	$routes = extractUri();
	
	//-----------------------------------------------------------------------------------
	// Re-routing if Authorized
	//-----------------------------------------------------------------------------------
	
	switch ($routes[0]) {
		case 'aboutus':
			include('web/body/about/index.php');
		break;
		case 'blog':
			include('web/body/blog/index.php');
		break;
		case 'cart':
			include('web/body/cart/index.php');
		break;
		case 'faq':
			include('web/body/rules/index.php');
		break;
		case 'favorite':
			include('web/body/favorite/index.php');
		break;
		case 'forgotpassword':
			include('web/body/forgotpassword/index.php');
		break;
		case 'invoice':
			include('web/body/invoice/index.php');
		break;
		case 'notifications':
			include('web/body/notifications/index.php');
		break;
		case 'payment':
			include('web/body/payment/index.php');
		break;
		case 'privacy':
			include('web/body/rules/index.php');
		break;
		case 'product':
			include('web/body/product/index.php');
		break;
		case 'profile':
			include('web/body/profile/index.php');
		break;
		case 'resend_request_email':
			include('web/body/resendrequestemail.php');
		break;
		case 'search':
			include('web/body/search/index.php');
		break;
		case 'shop':
			include('web/body/shop/index.php');
		break;
		case 'signin':
			include('web/body/signin/index.php');
		break;
		case 'signup':
			include('web/body/signup/index.php');
		break;
		case 'terms':
			include('web/body/rules/index.php');
		break;
		default:
		    include('index.php');
	}		