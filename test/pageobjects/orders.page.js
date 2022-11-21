

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CheckoutPaymentPage extends Page {
    /**
     * define selectors using getter methods
     */
        
    get pageHeading () {
        return $('.base');
    }

    get firstOrder () {
        return $('tbody tr:nth-child(1) td:nth-child(1)');
    }

    get secondOrder () {
        return $("tbody tr:nth-child(2) td:nth-child(1)");
    }
    
    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('sales/order/history/');
    }
}

module.exports = new CheckoutPaymentPage();
