

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */    
    get inputEmail () {
        return $('#email');
    }

    get inputPassword () {
        return $('#pass');
    }

    get btnSubmit () {
        return $('#send2');
    }

    //ERROR MESSAGES    
    get errorInputEmail () {
        return $('#email-error');
    }

    get errorInputPassword () {
        return $('#pass-error');
    }
   

    /**
     * a method to encapsule automation code to interact with the page
     */
    async login (email, password) {
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);            
        await this.btnSubmit.click();
    }


    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('customer/account/login');
    }
}

module.exports = new LoginPage();
