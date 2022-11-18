const SignupPage = require('../pageobjects/signup.page');
const 

describe('Luma Ecommerce Site', () => {
    beforeEach(function() {
        SignupPage.open();
    });

    it('should have input fields for firstname, lastname, email, passwords', async () => {
        await expect(SignupPage.inputFirstname).toBeDisplayed();
        await expect(SignupPage.inputLastname).toBeDisplayed();
        await expect(SignupPage.inputEmail).toBeDisplayed();
        await expect(SignupPage.inputPassword).toBeDisplayed();
        await expect(SignupPage.inputConfirmationPassword).toBeDisplayed();
    });
    
    it('should have a checkbox for subscription and a submit button', async () => {
        await expect(SignupPage.checkSubscripe).toBeDisplayed();
        await expect(SignupPage.checkSubscripe).toBeClickable();

        await expect(SignupPage.btnSubmit).toBeDisplayed();                
        await expect(SignupPage.btnSubmit).toBeClickable();
    });

    it('should create a new account and subscribe to emails/newsletters', async () => {});
    it('should create a new account without subscribing to emails/newsletters', async () => {});
    it('should give an error message if the password does not match', async () => {});
    it('should give an error message if the password does not meet the predefined criteria', async () => {});
    it('should give an error message if one or more input fields are empty', async () => {});

});


