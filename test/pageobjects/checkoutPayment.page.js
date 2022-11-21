

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CheckoutPaymentPage extends Page {
    /**
     * define selectors using getter methods
     */
        
    get pageHeading () {
        return $('li[id="shipping"] div[class="step-title"]');
    }

    get checkBillingAddress () {
        return $('#billing-address-same-as-shipping-checkmo');
    }

    get orderNumber () {
        return $("main[id='maincontent'] p:nth-child(1)");
    }

    get title () {
        return $('.base');
    }

    
    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('checkout/#shipping');
    }
}

module.exports = new CheckoutPaymentPage();
