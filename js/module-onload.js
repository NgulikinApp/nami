$( document ).ready(function() {
    if (typeof initGeneral != 'undefined')checkFunction(initGeneral);
	if (typeof initHome != 'undefined')checkFunction(initHome);
	if (typeof handleClientLoad != 'undefined')checkFunction(handleClientLoad);
	if (typeof initRules != 'undefined')checkFunction(initRules);
	if (typeof initSignin != 'undefined')checkFunction(initSignin);
	if (typeof initCart != 'undefined')checkFunction(initCart);
	if (typeof initFavorite != 'undefined')checkFunction(initFavorite);
	if (typeof initProduct != 'undefined')checkFunction(initProduct);
	if (typeof initProfile != 'undefined')checkFunction(initProfile);
	if (typeof initShop != 'undefined')checkFunction(initShop);
	if (typeof initSignup != 'undefined')checkFunction(initSignup);
	if (typeof initSearch != 'undefined')checkFunction(initSearch);
});

function checkFunction(name){
    if (typeof name === 'function') {
        eval("name()"); 
    }
}