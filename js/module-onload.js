$( document ).ready(function() {
    if (typeof initGeneral != 'undefined')checkFunction(initGeneral);
	if (typeof initHome != 'undefined')checkFunction(initHome);
	if (typeof handleClientLoad != 'undefined')checkFunction(handleClientLoad);
	if (typeof initRules != 'undefined')checkFunction(initRules);
	if (typeof initSignin != 'undefined')checkFunction(initSignin);
	if (typeof initCart != 'undefined')checkFunction(initCart);
	if (typeof initFavorite != 'undefined')checkFunction(initFavorite);
	if (typeof initHelp != 'undefined')checkFunction(initHelp);
	if (typeof initProduct != 'undefined')checkFunction(initProduct);
	if (typeof initProfile != 'undefined')checkFunction(initProfile);
	if (typeof initShop != 'undefined')checkFunction(initShop);
	if (typeof initShopSetting != 'undefined')checkFunction(initShopSetting);
	if (typeof initSignup != 'undefined')checkFunction(initSignup);
	if (typeof initSearch != 'undefined')checkFunction(initSearch);
	if (typeof initForgotPassword != 'undefined')checkFunction(initForgotPassword);
	if (typeof initNotifications != 'undefined')checkFunction(initNotifications);
	if (typeof initInvoice != 'undefined')checkFunction(initInvoice);
	if (typeof initPayment != 'undefined')checkFunction(initPayment);
	if (typeof initShopMyincome != 'undefined')checkFunction(initShopMyincome);
	if (typeof initShopMysales != 'undefined')checkFunction(initShopMysales);
	if (typeof initShopNotes != 'undefined')checkFunction(initShopNotes);
});

function checkFunction(name){
    if (typeof name === 'function') {
        eval("name()"); 
    }
}