var INIT_URL = "http://bean.ngulikin.com/v1/";

var ASKING_API = INIT_URL + "/asking",
    FORGOTPASSWORD_API = INIT_URL + "forgotPassword",
    GENERAL_API = INIT_URL +  "general",
    PRODUCT_API = INIT_URL + "product",
    SHOP_API = INIT_URL + "shop",
    SIGNIN_API = INIT_URL + "signin",
    SIGNUP_API = INIT_URL + "signup",
    SEARCH_API = INIT_URL + "/s",
    TOKEN_API = INIT_URL + "/generateToken";

var FORGOTPASSWORD_ASKINGCODE_API = FORGOTPASSWORD_API + '/askingCode',
    FORGOTPASSWORD_CHANGINGPASS_API = FORGOTPASSWORD_API + '/changingPass',
    FORGOTPASSWORD_CHECKINGCODE_API = FORGOTPASSWORD_API + '/checkingCode';

var PRODUCT_CATEGORY_API = PRODUCT_API + "/category",
    PRODUCT_FAVORITE_API = PRODUCT_API + "/favorite",
    PRODUCT_FEED_API = PRODUCT_API + "/feed",
    PRODUCT_RATE_API = PRODUCT_API + "/rate";
    
var SHOP_FAVORITE_API = SHOP_API + "/favorite",
    SHOP_FEED_API = SHOP_API + "/feed";