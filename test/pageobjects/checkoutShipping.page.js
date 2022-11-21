

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CheckoutShippingPage extends Page {
    /**
     * define selectors using getter methods
     */
        
    get pageHeading () {
        return $('.step-title');
    }

    get inputFirstname () {
        return $('#WLA3O6P');
    }

    get inputLastname () {
        return $('#E6B0YPJ');
    }

    get inputCompany () {
        return $('#MW86MVL');
    }

    get inputAddressLine1 () {
        return $('#YYF2U12');
    }

    get inputAddressLine2 () {
        return $('#SSICY8U');
    }

    get inputAddressLine3 () {
        return $('#A8ET707');
    }

    get inputCity () {
        return $('#A99KN26');
    }

    get inputState () {
        return $('#NB3CA5F');
    }

    get inputZipCode () {
        return $('#ITCBF9P');
    }
    
    get inputCountry () {
        return $('#N5EEWES');
    }

    get inputNumber () {
        return $('#P3D5NYR');
    }
    
    get checkShippingMethod1 () {
        return $("input[value='tablerate_bestway']");
    }
    
    get checkShippingMethod2 () {
        return $("input[value='flatrate_flatrate']");
    }

    get btnSubmit () {
        return $('.button.action.continue.primary');
    }

    //ERROR MESSAGES
    get errorInputFirstname () {
        return $('#error-N6PO1SH');
    }

    get errorInputLastname () {
        return $('#error-QPRL823');
    }

    get errorInputAddressLine1 () {
        return $('#error-DTDGCHD');
    }

    get errorInputCity () {
        return $('#error-CYQV6C5');
    }

    get errorInputState () {
        return $('#error-OHQESWS');
    }

    get errorInputZipCode () {
        return $('#error-RG1FV0A');
    }
    
    get errorInputCountry () {
        return $('#error-RF7X6Q9');
    }

    get errorInputNumber () {
        return $('#error-BDVD2NT');
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
        await this.inputState.setValue(state);
        await this.inputZipCode.setValue(zip);
        await this.inputCountry.setValue(country);  
        await this.inputNumber.setValue(phone);

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
