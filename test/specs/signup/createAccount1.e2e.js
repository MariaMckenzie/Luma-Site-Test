const SignupPage = require('../../pageobjects/signup.page');
const signupData = require('../../data/signup.data');

describe.skip('Luma Ecommerce Site - Signup Page (1)', () => {
    it('should create a new account and subscribe to emails/newsletters', async () => {
        await SignupPage.open();
        
        //sign up for a new account
        await SignupPage.signup(signupData[0].firstname, signupData[0].lastname,
            signupData[0].email, signupData[0].password, 
            signupData[0].confirmPassword, signupData[0].isChecked);
        
        const alert = await $('.message-success.success.message');
        await alert.waitForDisplayed(5000, true);
        await expect(alert).toHaveText( //check alert
            'Thank you for registering with Fake Online Clothing Store.');

        const userInfo = await $('#maincontent > div.columns > div.column.main > div.block.block-dashboard-info > div.block-content > div.box.box-information > div.box-content > p');
        await expect(userInfo).toHaveTextContaining( //check account name
            `${signupData[0].firstname} ${signupData[0].lastname}`
        );

        const subscriptionInfo = await $('#maincontent > div.columns > div.column.main > div.block.block-dashboard-info > div.block-content > div.box.box-newsletter > div.box-content > p');
        await expect(subscriptionInfo).toHaveText( //check subscription information
            'You are subscribed to "General Subscription".'
        );

        const welcomeText = await $('span.logged-in');
        await expect(welcomeText).toHaveTextContaining( //check name in welcome text
            `Welcome, ${signupData[0].firstname} ${signupData[0].lastname}!`
        );
    });
});
