const SignupPage = require('../pageobjects/signup.page');
const signupData = require('../data/signup.data');
const ordersPage = require("../pageobjects/orders.page");
const checkoutShippingPage = require("../pageobjects/checkoutShipping.page");

describe('Luma Ecommerce Site - Flow 2', () => {
    let firstname, lastname, company, streetAddress1, streetAddress2, streetAddress3, city, state, zip, country, phone;
    let orderNum;

    
    it('should add item to cart and', async () => {
        //url for item
        await browser.url('https://magento.softwaretestingboard.com/savvy-shoulder-tote.html'); 

        //we use default quantity (1)
        
        //add item to cart
        const addToCartButton = await $('#product-addtocart-button'); 
        await expect(addToCartButton).toBeClickable(); 
        await expect(addToCartButton).toHaveText('Add to Cart'); 
        await addToCartButton.click();

        //go to cart
        await browser.url('https://magento.softwaretestingboard.com/checkout/cart/');

        //check for item in cart
        const cartItemName = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:last-child > tr:nth-child(1) > td:nth-child(1) > div:nth-child(2) > strong:nth-child(1) > a:nth-child(1)');
        await expect(cartItemName).toHaveText(itemName);
        

        const goToCheckOutButton = await $('.action.primary.checkout'); 
        await expect(goToCheckOutButton).toBeClickable(); 
        await goToCheckOutButton.click();

        //await checkoutShippingPage.open();

        //check the heading on the page and title of browser
        await expect(checkoutShippingPage.pageHeading).toHaveText('Shipping Address');
        await expect(browser).toHaveTitleContaining('Checkout');
    
        //variables that store address information
        [
            email, firstname, lastname, company, 
            streetAddress1, streetAddress2, streetAddress3, 
            city, state, zip, 
            country, phone
        ] = [
            signupData[1].email, signupData[1].firstname, signupData[1].lastname, '', 
            'Apartment 24', '1 Merry Meadows Avenue', '',
            'Miami', 'Florida', '123456-0000', 
            'United States', '987654321'
        ];

        //add shipping information
        await expect(browser).toHaveUrlContaining('https://magento.softwaretestingboard.com/checkout/#shipping');
        await checkoutShippingPage3.continueToPayment(
            email, firstname, lastname, company, streetAddress1, streetAddress2, 
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
        
        const createAccountBtn = await $('.action.primary');
        createAccountBtn.click();
           
        //sign up for a new account
        await SignupPage.signup(firstname, lastname,
            email, signupData[1].password, 
            signupData[1].confirmPassword, signupData[1].isChecked);
        
        const alert = await $('.message-success.success.message');
        await alert.waitForDisplayed(5000, true);
        await expect(alert).toHaveText( //check alert
            'Thank you for registering with Fake Online Clothing Store.');

        const userInfo = await $('#maincontent > div.columns > div.column.main > div.block.block-dashboard-info > div.block-content > div.box.box-information > div.box-content > p');
        await expect(userInfo).toHaveTextContaining( //check account name
            `${firstname} ${lastname}`
        );

        const subscriptionInfo = await $('#maincontent > div.columns > div.column.main > div.block.block-dashboard-info > div.block-content > div.box.box-newsletter > div.box-content > p');
        await expect(subscriptionInfo).toHaveText( //check subscription information
            'You are subscribed to "General Subscription".'
        );

        const welcomeText = await $('span.logged-in');
        await expect(welcomeText).toHaveTextContaining( //check name in welcome text
            `Welcome, ${firstname} ${lastname}!`
        );

        //view orders (this order is the first order)
        await ordersPage.open();

        await expect(ordersPage.nthOrder).toHaveTextContaining(orderNum);
    });   


});