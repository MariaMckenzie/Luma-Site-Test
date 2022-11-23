

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class OrderPage extends Page {
    /**
     * define selectors using getter methods
     */
    get nthOrder () {
        return $("tbody tr:first-child td:nth-child(1)");
    }
    
    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('sales/order/history/');
    }
}

module.exports = new OrderPage();
