const SignupPage = require('../pageobjects/signup.page');
const signupData = require('../data/signup.data');

describe.skip('Luma Ecommerce Site - Other Signup Tests', () => {
    beforeEach(function () {
        SignupPage.open();
    });

    it('should have input fields for firstname, lastname, email, passwords', async () => {
        await expect(SignupPage.inputFirstname).toBeDisplayed();
        await expect(SignupPage.inputLastname).toBeDisplayed();
        await expect(SignupPage.inputEmail).toBeDisplayed();
        await expect(SignupPage.inputPassword).toBeDisplayed();
        await expect(SignupPage.inputConfirmationPassword).toBeDisplayed();
    });
    

    it('should have a clickable checkbox for subscription and submit button', async () => {
        await expect(SignupPage.checkSubscribe).toBeDisplayed();
        await expect(SignupPage.checkSubscribe).toBeClickable();

        await expect(SignupPage.btnSubmit).toBeDisplayed();                
        await expect(SignupPage.btnSubmit).toBeClickable();
    });
  

    it('should give an error message if one or more input fields are empty', async () => {
        await SignupPage.signup(signupData[2].firstname, signupData[2].lastname,
            signupData[2].email, signupData[2].password, 
            signupData[2].confirmPassword, signupData[2].isChecked);

        await expect(SignupPage.errorInputLastname).toBeDisplayed();
        await expect(SignupPage.errorInputLastname).toHaveText(
            'This is a required field.');

        await expect(SignupPage.errorInputEmail).toBeDisplayed();
        await expect(SignupPage.errorInputEmail).toHaveText(
            'This is a required field.');
    });


    it('should give an error message if the password does not match', async () => {
        await SignupPage.signup(signupData[3].firstname, signupData[3].lastname,
            signupData[3].email, signupData[3].password, 
            signupData[3].confirmPassword, signupData[3].isChecked);
        
        await expect(SignupPage.errorInputConfirmationPassword).toBeDisplayed();
        await expect(SignupPage.errorInputConfirmationPassword).toHaveText(
            'Please enter the same value again.');
    });


    it('should give an error message if the email address is not valid', async () => {
        await SignupPage.signup(signupData[3].firstname, signupData[3].lastname,
            signupData[3].email, signupData[3].password, 
            signupData[3].confirmPassword, signupData[3].isChecked);
        
        await expect(SignupPage.errorInputEmail).toBeDisplayed();
        await expect(SignupPage.errorInputEmail).toHaveText(
            'Please enter a valid email address (Ex: johndoe@domain.com).');
    });


    it('should give an error message if the password does not meet the predefined criteria', async () => {
        await SignupPage.signup(signupData[4].firstname, signupData[4].lastname,
            signupData[4].email, signupData[4].password, 
            signupData[4].confirmPassword, signupData[4].isChecked);
        
        await expect(SignupPage.errorInputPassword).toBeDisplayed();
        await expect(SignupPage.errorInputPassword).toHaveText(
            'Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.');
    });

    
    it('should give an error message if ALL input fields are empty', async () => {
        await SignupPage.signup(signupData[5].firstname, signupData[5].lastname,
            signupData[5].email, signupData[5].password, 
            signupData[5].confirmPassword, signupData[5].isChecked);
        
        await expect(SignupPage.errorInputFirstname).toBeDisplayed();
        await expect(SignupPage.errorInputFirstname).toHaveText(
            'This is a required field.');
                    
        await expect(SignupPage.errorInputLastname).toBeDisplayed();
        await expect(SignupPage.errorInputLastname).toHaveText(
            'This is a required field.');

        await expect(SignupPage.errorInputEmail).toBeDisplayed();
        await expect(SignupPage.errorInputEmail).toHaveText(
            'This is a required field.');

        await expect(SignupPage.errorInputPassword).toBeDisplayed();
        await expect(SignupPage.errorInputPassword).toHaveText(
            'This is a required field.');

        await expect(SignupPage.errorInputConfirmationPassword).toBeDisplayed();
        await expect(SignupPage.errorInputConfirmationPassword).toHaveText(
            'This is a required field.');
    });

    
    it('should give an error message if the account already exists', async () => {
        await SignupPage.signup(signupData[6].firstname, signupData[6].lastname,
            signupData[6].email, signupData[6].password, 
            signupData[6].confirmPassword, signupData[6].isChecked);
        
        await expect(SignupPage.errorExistingAccount).toBeDisplayed();
        await expect(SignupPage.errorExistingAccount).toHaveText(
            'There is already an account with this email address. If you are sure that it is your email address, click here to get your password and access your account.');
    });

});
