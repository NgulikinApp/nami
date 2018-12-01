var BASE_URL = "https://www.ngulikin.com/v1";

var ASKING_API = BASE_URL + "/asking",
    FORGOTPASSWORD_API = BASE_URL + "/forgotPassword",
    GENERAL_API = BASE_URL +  "/general",
    NOTIFICATION_API = BASE_URL +  "/notif",
    PUTFILE_API = BASE_URL + "/putfile",
    PRODUCT_API = BASE_URL + "/product",
    PROFILE_API = BASE_URL + "/profile",
    SHOP_API = BASE_URL + "/shop",
    SIGNIN_API = BASE_URL + "/signin",
    SIGNOUT_API = BASE_URL + "/signout",
    SIGNUP_API = BASE_URL + "/signup",
    SEARCH_API = BASE_URL + "/s",
    TOKEN_API = BASE_URL + "/generateToken";

var FORGOTPASSWORD_ASKINGCODE_API = FORGOTPASSWORD_API + '/askingCode',
    FORGOTPASSWORD_CHANGINGPASS_API = FORGOTPASSWORD_API + '/changingPass',
    FORGOTPASSWORD_CHECKINGCODE_API = FORGOTPASSWORD_API + '/checkingCode';

var PRODUCT_ACTION_API = PRODUCT_API + "/a",
    PRODUCT_BRAND_API = PRODUCT_API + "/brand",
    PRODUCT_CART_API = PRODUCT_API + "/cart",
    PRODUCT_CATEGORY_API = PRODUCT_API + "/category",
    PRODUCT_FAVORITE_API = PRODUCT_API + "/favorite",
    PRODUCT_FAVORITE_LIST_API = PRODUCT_API + "/favoriteList",
    PRODUCT_FEED_API = PRODUCT_API + "/feed",
    PRODUCT_INVOICE_API = PRODUCT_API + "/invoice",
    PRODUCT_RATE_API = PRODUCT_API + "/rate",
    PRODUCT_STATUS_API = PRODUCT_API + "/status";

var PRODUCT_BRAND_ACTION_API = PRODUCT_BRAND_API+"/a",
    PRODUCT_CART_ADD_API = PRODUCT_CART_API+"/a",
    PRODUCT_INVOICE_ADD_API = PRODUCT_INVOICE_API+"/a";

var PROFILE_UPDATE_API = PROFILE_API + "/u",
    PROFILE_UPDATEPASSWORD_API = PROFILE_API + "/up";
    
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

var SHOP_DISCUSS_COMMENT_API = SHOP_DISCUSS_API + "/c";

var SHOP_EDITNOTES_API = SHOP_NOTES_API + "/e";

var SHOP_REVIEW_COMMENT_API = SHOP_REVIEW_API + "/c";