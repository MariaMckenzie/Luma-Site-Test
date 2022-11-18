

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SignupPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputFirstname () {
        return $('#firstname');
    }

    get inputLastname () {
        return $('#lastname');
    }
    
    get inputEmail () {
        return $('#email_address');
    }

    get inputPassword () {
        return $('#password');
    }

    get inputConfirmationPassword () {
        return $('#password-confirmation');
    }
    
    get checkSubscripe () {
        return $('#is_subscribed');
    }

    get btnSubmit () {
        return $('button[title="Create an Account"]');
    }

    //ERROR MESSAGES
    get errorInputFirstname () {
        return $('#firstname-error');
    }

    get errorInputLastname () {
        return $('#lastname-error');
    }
    
    get errorInputEmail () {
        return $('#email_address-error');
    }

    get errorInputPassword () {
        return $('#password-error');
    }

    get errorInputConfirmationPassword () {
        return $('#password-confirmation-error');
    }
    
    get checkSubscripe () {
        return $('#is_subscribed');
    }

    get btnSubmit () {
        return $('button[title="Create an Account"]');
    }

    /**
     * a method to encapsule automation code to interact with the page
     */
    async signup (firstname, lastname, email, password, confirmPassword, isChecked) {
        await this.inputFirstname.setValue(firstname);
        await this.inputLastname.setValue(lastname);
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await this.inputPassword.setValue(confirmPassword);

        if (isChecked) {
            await this.checkSubscripe.click();
        }
            
        await this.btnSubmit.click();
    }


    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('customer/account/create');
    }
}

module.exports = new SignupPage();
