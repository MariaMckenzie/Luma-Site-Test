

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
    /**
     * define selectors using getter methods
     */
        
    get womenNavLink () {
        return $('#ui-id-4');
    }

    get menNavLink () {
        return $('#ui-id-5');
    }

    get gearNavLink () {
        return $('#ui-id-6');
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('');
    }
}

module.exports = new HomePage();
