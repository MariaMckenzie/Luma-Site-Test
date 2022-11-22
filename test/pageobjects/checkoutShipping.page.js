

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CheckoutShippingPage extends Page {
    /**
     * define selectors using getter methods
     */
        
    get pageHeading () {
        return $("li#shipping div.step-title");
    }

    get inputFirstname () {
        return $('#shipping-new-address-form > div:nth-child(1) > div > input');
    }

    get inputLastname () {
        return $('#shipping-new-address-form > div:nth-child(2) > div > input');
    }

    get inputCompany () {
        return $('#shipping-new-address-form > div:nth-child(3) > div > input');
    }

    get inputAddressLine1 () {
        return  $('#shipping-new-address-form > fieldset > div > div:nth-child(1) > div > input');
    }

    get inputAddressLine2 () {
        return  $('#shipping-new-address-form > fieldset > div > div:nth-child(2) > div > input');
    }

    get inputAddressLine3 () {
        return $('#shipping-new-address-form > fieldset > div > div:nth-child(3) > div > input');
    }

    get inputCity () {
        return  $('#shipping-new-address-form > div:nth-child(5) > div > input');
    }

    get inputState () {
        return $('#shipping-new-address-form > div:nth-child(6) > div > select');
    }

    get inputZipCode () {
        return $('#shipping-new-address-form > div:nth-child(8) > div > input');
    }
    
    get inputCountry () {
        return $('#shipping-new-address-form > div:nth-child(9) > div > select');
    }

    get inputNumber () {
        return $('#shipping-new-address-form > div:nth-child(10) > div > input');
    }
    
    get checkShippingMethod1 () {
        return $(".table-checkout-shipping-method > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1) > input:nth-child(1)");
    }
    
    get checkShippingMethod2 () {
        return $("input[@name='ko_unique_2']");
    }

    get btnSubmit () {
        return $('.button.action.continue.primary');
    }

    //ERROR MESSAGES
    get errorInputAddressLine1 () {
        return $('#shipping-new-address-form > fieldset > div > div:nth-child(1) > div:nth-child(2) > div');
    }

    get errorInputCity () {
        return $('#shipping-new-address-form > div:nth-child(5) > div > div');
    }

    get errorInputNumber () {
        return $('#shipping-new-address-form > div > div > div:nth-child(3)');
    }


    /**
     * a method to encapsule automation code to interact with the page
     */
     async continueToPayment (firstname, lastname, company, streetAddress1, streetAddress2, streetAddress3, city, state, zip, country, phone) {
        await this.inputFirstname.setValue(firstname);
        await this.inputLastname.setValue(lastname);
        await this.inputCompany.setValue(company);
        await this.inputAddressLine1.setValue(streetAddress1);
        await this.inputAddressLine2.setValue(streetAddress2);
        await this.inputAddressLine3.setValue(streetAddress3);
        await this.inputCity.setValue(city);
        await this.inputState.selectByVisibleText(state);
        await this.inputZipCode.setValue(zip);
        await this.inputCountry.selectByVisibleText(country);  
        await this.inputNumber.setValue(phone);

        await this.checkShippingMethod1.click();

        await this.btnSubmit.click();
    }

    async continueToPayment2 () {
        await this.checkShippingMethod1.click();
        
        await this.btnSubmit.click();
    }

    
    
    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('checkout/#shipping');
    }
}

module.exports = new CheckoutShippingPage();
