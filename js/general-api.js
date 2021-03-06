var VERSION = '/v1';

var BASE_URL = "https://www.ngulikin.com"+VERSION;

var ADMINISTRATIVE_API = BASE_URL + "/administrative",
    ASKING_API = BASE_URL + "/asking",
    FORGOTPASSWORD_API = BASE_URL + "/forgotPassword",
    GENERAL_API = BASE_URL +  "/general",
    HISTORYORDER_API = BASE_URL + "/historyorder",
    MYPURCHASES_API = BASE_URL +  "/mypurchases",
    MYSALES_API = BASE_URL +  "/mysales",
    NOTIFICATION_API = BASE_URL +  "/notif",
    PUTFILE_API = BASE_URL + "/putfile",
    PRODUCT_API = BASE_URL + "/product",
    PROFILE_API = BASE_URL + "/profile",
    SHIPPINGCOST_API = BASE_URL + "/shippingcost",
    SHOP_API = BASE_URL + "/shop",
    SIGNIN_API = BASE_URL + "/signin",
    SIGNOUT_API = BASE_URL + "/signout",
    SIGNUP_API = BASE_URL + "/signup",
    SEARCH_API = BASE_URL + "/s",
    TOKEN_API = BASE_URL + "/generateToken";

var FORGOTPASSWORD_ASKINGCODE_API = FORGOTPASSWORD_API + '/askingCode',
    FORGOTPASSWORD_CHANGINGPASS_API = FORGOTPASSWORD_API + '/changingPass',
    FORGOTPASSWORD_CHECKINGCODE_API = FORGOTPASSWORD_API + '/checkingCode';
    
var LIST_MYPURCHASES_API = MYPURCHASES_API + '/list',
    LIST_TRACKORDER_API = LIST_MYPURCHASES_API + '/to';

var LIST_MYSALES_API = MYSALES_API + '/list',
    LISTCONFIRM_MYSALES_API = LIST_MYSALES_API + '/c',
    LISTSTATUS_MYSALES_API = LIST_MYSALES_API + '/s',
    LISTTRANSACTION_MYSALES_API = LIST_MYSALES_API + '/t';

var MYSALES_DETAIL_API = MYSALES_API + '/detail',
    MYSALES_CONFIRMORDER_API = MYSALES_DETAIL_API + '/c',
    MYSALES_NEWORDER_API = MYSALES_DETAIL_API + '/n',
    MYSALES_STATUS_API = MYSALES_DETAIL_API + '/s',
    MYSALES_TRANSACTION_API = MYSALES_DETAIL_API + '/t',
    MYSALES_ACTIONNEWORDER_API = MYSALES_DETAIL_API + '/an',
    MYSALES_ACTIONCONFIRMORDER_API = MYSALES_DETAIL_API + '/ac';

var NOTIFICATION_DOREAD_API = NOTIFICATION_API + '/r';

var PRODUCT_ACTION_API = PRODUCT_API + "/a",
    PRODUCT_BRAND_API = PRODUCT_API + "/brand",
    PRODUCT_CART_API = PRODUCT_API + "/cart",
    PRODUCT_CATEGORY_API = PRODUCT_API + "/category",
    PRODUCT_DISCUSS_API = PRODUCT_API + "/discuss",
    PRODUCT_FAVORITE_API = PRODUCT_API + "/favorite",
    PRODUCT_FAVORITE_LIST_API = PRODUCT_API + "/favoriteList",
    PRODUCT_FEED_API = PRODUCT_API + "/feed",
    PRODUCT_INVOICE_API = PRODUCT_API + "/invoice",
    PRODUCT_RATE_API = PRODUCT_API + "/rate",
    PRODUCT_RELATED_API = PRODUCT_API + "/related",
    PRODUCT_STATUS_API = PRODUCT_API + "/status",
    PRODUCT_REVIEW_API = PRODUCT_API + "/review";

var PRODUCT_BRAND_ACTION_API = PRODUCT_BRAND_API+"/a",
    PRODUCT_CART_ADD_API = PRODUCT_CART_API+"/a",
    PRODUCT_CART_CHOSEN_API = PRODUCT_CART_API+"/c",
    PRODUCT_CART_DELETE_API = PRODUCT_CART_API+"/d",
    PRODUCT_CART_UPDATE_API = PRODUCT_CART_API+"/u",
    PRODUCT_INVOICE_ADD_API = PRODUCT_INVOICE_API+"/a",
    PRODUCT_INVOICE_CHANGEPAYMENT_API = PRODUCT_INVOICE_API+"/cp",
    PRODUCT_INVOICE_COUNTRATE_API = PRODUCT_INVOICE_API+"/cr",
    PRODUCT_INVOICE_ISRATED_API = PRODUCT_INVOICE_API+"/ir",
    PRODUCT_INVOICE_RATE_API = PRODUCT_INVOICE_API+"/ri",
    PRODUCT_INVOICE_SENDPROOF_API = PRODUCT_INVOICE_API+"/sp";
    
var PRODUCT_DISCUSS_COMMENT_API = PRODUCT_DISCUSS_API + "/c",
    PRODUCT_DISCUSS_REPLYCOMMENT_API = PRODUCT_DISCUSS_API + "/r";
    
var PRODUCT_REVIEW_COMMENT_API = PRODUCT_REVIEW_API + "/c";

var PRODUCT_RELATED_RECOMMEND_API = PRODUCT_RELATED_API + "/r";

var PROFILE_ADDRESS_API = PROFILE_API + "/address",
    PROFILE_UPDATE_API = PROFILE_API + "/u",
    PROFILE_UPDATEPASSWORD_API = PROFILE_API + "/up";

var PROFILE_ADDRESS_ACTION_API = PROFILE_ADDRESS_API + "/a",
    PROFILE_ADDRESS_LIST_API = PROFILE_ADDRESS_API + "/ls",
    PROFILE_ADDRESS_SELECT_API = PROFILE_ADDRESS_API + "/s";
    
var SHOP_ACTION_API = SHOP_API + "/a",
    SHOP_ACCOUNT_API = SHOP_API + "/account",
    SHOP_BANK_API = SHOP_API + "/bank",
    SHOP_BRAND_API = SHOP_API + "/brand",
    SHOP_DELIVERY_API = SHOP_API + "/delivery",
    SHOP_DISCUSS_API = SHOP_API + "/discuss",
    SHOP_EDITBANNER_API = SHOP_API + "/eb",
    SHOP_EDITDETAIL_API = SHOP_API + "/e",
    SHOP_FAVORITE_API = SHOP_API + "/favorite",
    SHOP_FAVORITE_LIST_API = SHOP_API + "/favoriteList",
    SHOP_FEED_API = SHOP_API + "/feed",
    SHOP_NOTES_API = SHOP_API + "/notes",
    SHOP_PRODUCT_API = SHOP_API + "/product",
    SHOP_REVIEW_API = SHOP_API + "/review";

var SHOP_ACCOUNT_ACTION_API = SHOP_ACCOUNT_API + "/a";

var SHOP_BRAND_SELECT_API = SHOP_BRAND_API + "/s";

var SHOP_DELIVERY_ACTION_API = SHOP_DELIVERY_API + "/e";

var SHOP_DISCUSS_COMMENT_API = SHOP_DISCUSS_API + "/c",
    SHOP_DISCUSS_REPLYCOMMENT_API = SHOP_DISCUSS_API + "/r";

var SHOP_EDITNOTES_API = SHOP_NOTES_API + "/e";

var SHOP_REVIEW_COMMENT_API = SHOP_REVIEW_API + "/c";