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
	
	switch (@$routes[0]) {
	    case 'v2':
	         include('api/v2/test.php');
	    break;
	    case 'v1':
	        switch (@$routes[1]) {
			    case 'activeAccount':
					include('api/v1/auth/active_account.php');
				break;
				case 'asking':
					include('api/v1/general/asking/sendMail.php');
				break;
			    case 'forgotPassword':
				    switch (@$routes[2]) {
				        case 'askingCode':
							include('api/v1/auth/forgotpassword/sendingcode.php');
						break;
						case 'checkingCode':
							include('api/v1/auth/forgotpassword/checkingcode.php');
						break;
						case 'changingPass':
							include('api/v1/auth/forgotpassword/changingpass.php');
						break;
				    }
				break;
				case 'generateToken':
					include('api/v1/general/system/generateToken.php');
				break;
				case 'pdf':
					include('api/v1/general/system/delivery.php');
				break;
				case 'notif':
				    include('api/v1/general/notification/getNotif.php');
				break;
				case 'product':
					switch (@$routes[2]) {
					    case 'a':
							include('api/v1/product/detail/actionData.php');
						break;
						case 'brand':
							switch (@$routes[3]) {
							    case 'a':
        							include('api/v1/product/brand/actionData.php');
        						break;
							    default :
							        include('api/v1/product/brand/getData.php');
							}
						break;
						case 'cart':
						    switch (@$routes[3]) {
						        case 'a':
        							include('api/v1/product/cart/addtocart.php');
        						break;
        						default :
							        include('api/v1/product/cart/feed.php');
						    }
						break;
						case 'category':
							include('api/v1/product/list/category.php');
						break;
						case 'favorite':
							include('api/v1/product/favorite/favoriteItem.php');
						break;
						case 'favoriteList':
							include('api/v1/product/list/favorite.php');
						break;
						case 'feed':
							include('api/v1/product/list/feed.php');
						break;
						case 'rate':
							include('api/v1/product/rate/rateItem.php');
						break;
						default :
							include('api/v1/product/detail/getData.php');
						break;
					}
				break;
				case 'profile':
				    switch (@$routes[2]) {
				        case 'cm':
				            include('api/v1/profile/confirmPassword.php');
				        break;
				        case 'up':
				            include('api/v1/profile/updatePassword.php');
				        break;
				        case 'u':
				            include('api/v1/profile/updateUser.php');
				        break;
				        default :
							include('api/v1/profile/user.php');
						break;
				    }
				break;
				case 's':
					include('api/v1/general/search/searchItem.php');
				break;
				case 'shop':
				    switch (@$routes[2]) {
				        case 'account':
				            switch (@$routes[3]) {
				                case 'a':
        							include('api/v1/shop/detail/actionAccount.php');
        						break;
				                default:
				                    include('api/v1/shop/list/account.php');
				                break;
				            }
						break;
				        case 'bank':
							include('api/v1/shop/list/bank.php');
						break;
				        case 'brand':
				            switch (@$routes[3]) {
				                case 's':
        							include('api/v1/shop/detail/selectBrand.php');
        						break;
				                default:
				                    include('api/v1/shop/list/brand.php');
				                break;
				            }
						break;
						case 'delivery':
						    switch (@$routes[3]) {
						        case 'e':
        							include('api/v1/shop/detail/editDelivery.php');
        						break;
						        default:
				                    include('api/v1/shop/list/delivery.php');
				                break;
						    }
						break;
				        case 'discuss':
				            switch (@$routes[3]) {
				                case 'c':
        							include('api/v1/shop/comment/discuss.php');
        						break;
        						case 'r':
        							include('api/v1/shop/comment/replyDiscuss.php');
        						break;
				                default:
				                    include('api/v1/shop/list/discuss.php');
				                break;
				            }
						break;
						case 'e':
							include('api/v1/shop/detail/editData.php');
						break;
				        case 'favorite':
							include('api/v1/shop/favorite/favoriteItem.php');
						break;
						case 'favoriteList':
							include('api/v1/shop/list/favorite.php');
						break;
				        case 'feed':
							include('api/v1/shop/list/feed.php');
						break;
						case 'product':
							include('api/v1/shop/list/product.php');
						break;
						case 'review':
						    switch (@$routes[3]) {
						        case 'c':
        							include('api/v1/shop/comment/review.php');
        						break;
						        default: 
						            include('api/v1/shop/list/review.php');
						        break;
						    }
						break;
						default :
							include('api/v1/shop/detail/getData.php');
						break;
				    }
				break;
				case 'signin':
					include('api/v1/auth/signin.php');
				break;
				case 'signout':
					include('api/v1/auth/signout.php');
				break;
				case 'signup':
					include('api/v1/auth/signup.php');
				break;
			}
		break;
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
		    switch (@$routes[1]) {
		        case 'i':
		            include('web/body/shop/myincome/index.php');
		        break;
		        case 'p':
		            include('web/body/shop/myproduct/index.php');
		        break;
		        case 's':
		            include('web/body/shop/mysales/index.php');
		        break;
		        case 't':
		            include('web/body/shop/setting/index.php');
		        break;
		        default : 
		            include('web/body/shop/detail/index.php');
		    }
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