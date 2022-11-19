const SignupPage = require('../../pageobjects/signup.page');
const AccountPage = require('../../pageobjects/account.page');
const signupData = require('../../data/signup.data');

describe.skip('Luma Ecommerce Site - Signup Page (2)', () => {
    it('should create a new account without subscribing to emails/newsletters', async () => {
        await SignupPage.open();
        
        //sign up for a new account
        await SignupPage.signup(signupData[1].firstname, signupData[1].lastname,
            signupData[1].email, signupData[1].password, 
            signupData[1].confirmPassword, signupData[1].isChecked);
        
        const alert = await $('.message-success.success.message');
        await alert.waitForDisplayed(5000, true);
        await expect(alert).toHaveText( //check alert
            'Thank you for registering with Fake Online Clothing Store.');

        const userInfo = await $('#maincontent > div.columns > div.column.main > div.block.block-dashboard-info > div.block-content > div.box.box-information > div.box-content > p');
        await expect(userInfo).toHaveTextContaining( //check account name
            `${signupData[1].firstname} ${signupData[1].lastname}`
        );

        const subscriptionInfo = await $('#maincontent > div.columns > div.column.main > div.block.block-dashboard-info > div.block-content > div.box.box-newsletter > div.box-content > p');
        await expect(subscriptionInfo).toHaveText( //check subscription information
            "You aren't subscribed to our newsletter."
        );

        const welcomeText = await $('span.logged-in');
        await expect(welcomeText).toHaveTextContaining( //check name in welcome text
            `Welcome, ${signupData[1].firstname} ${signupData[1].lastname}!`
        );
    }); 
});
