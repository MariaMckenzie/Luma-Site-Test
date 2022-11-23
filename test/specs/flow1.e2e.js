const SignupPage = require('../pageobjects/signup.page');
const signupData = require('../data/signup.data');
const ordersPage = require("../pageobjects/orders.page");
const checkoutShippingPage = require("../pageobjects/checkoutShipping.page");

describe.skip('Luma Ecommerce Site - Flow 1', () => {
    let firstname, lastname, company, streetAddress1, streetAddress2, streetAddress3, city, state, zip, country, phone;
    let orderNum;

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

    
    it('should add item to cart using direct link', async () => {
        //url for item
        await browser.url('https://magento.softwaretestingboard.com/savvy-shoulder-tote.html'); 

        //we use default quantity (1)
        
        //add item to cart
        const addToCartButton = await $('#product-addtocart-button'); 
        await expect(addToCartButton).toBeClickable(); 
        await expect(addToCartButton).toHaveText('Add to Cart'); 
        await addToCartButton.click();
    });
    

    it('should checkout successfully', async () => {
        //go to checkout using direct link
        await checkoutShippingPage.open();

        //check the heading on the page and title of browser
        await expect(checkoutShippingPage.pageHeading).toHaveText('Shipping Address');
        await expect(browser).toHaveTitleContaining('Checkout');


        //variables that store address information
        [
            firstname, lastname, company, 
            streetAddress1, streetAddress2, streetAddress3, 
            city, state, zip, 
            country, phone
        ] = [
            signupData[0].firstname, signupData[0].lastname, '', 
            'Apartment 24', '1 Merry Meadows Avenue', '',
            'Miami', 'Florida', '123456-0000', 
            'United States', '987654321'
        ];

        //add shipping information
        await expect(browser).toHaveUrlContaining('https://magento.softwaretestingboard.com/checkout/#shipping');
        await checkoutShippingPage.continueToPayment(
            firstname, lastname, company, streetAddress1, streetAddress2, 
            streetAddress3, city, state, zip, country, phone
        );

        await expect(browser).toHaveUrlContaining('https://magento.softwaretestingboard.com/checkout/#payment');

        
        //proceed to the next step to place order and check the heading on the page and title of browser
        //confirm payment
        const submitBtn = await $("button[title='Place Order']");
        await submitBtn.click();

        //view thank you page
        await expect(browser).toHaveUrlContaining('https://magento.softwaretestingboard.com/checkout/onepage/success/');
        orderNum = await $(".checkout-success > p:first-child > a > strong").getText();
    }); 

        
    it('should find the order in the purchase history', async () => {
        //view orders (this order is the first order)
        await ordersPage.open();

        await expect(ordersPage.lastOrder).toHaveTextContaining(orderNum);
    });   


});