const checkoutShippingPage = require("../pageobjects/checkoutShipping.page");
const loginPage = require("../pageobjects/login.page");
const loginData = require("../data/login.data");
const ordersPage = require("../pageobjects/orders.page");

describe('Luma Ecommerce Site - Purchase Item and Check Order History', () => {
    let firstname, lastname, company, streetAddress1, streetAddress2, streetAddress3, city, state, zip, country, phone;

    
    it('should complete the checkout process for first time buyer', async () => {
        //login to account
        await loginPage.open();
        await loginPage.login(loginData[0].email, loginData[0].password);

        //variables that store address information
        [
            firstname, lastname, company, 
            streetAddress1, streetAddress2, streetAddress3, 
            city, state, zip, 
            country, phone
        ] = [
            loginData[0].firstname, loginData[0].lastname, '', 
            'Apartment 24', '1 Merry Meadows Avenue', '',
            'Miami', 'Florida', '123456-0000', 
            'United States', '987654321'
        ];

        //url for item
        await browser.url('https://magento.softwaretestingboard.com/savvy-shoulder-tote.html'); 

        //we use default quantity (1)
        
        //add item to cart
        const addToCartButton = await $('#product-addtocart-button'); 
        await expect(addToCartButton).toBeClickable(); 
        await expect(addToCartButton).toHaveText('Add to Cart'); 
        await addToCartButton.click();

        //go to checkout using direct link
        await checkoutShippingPage.open();

        //check the heading on the page and title of browser
        await expect(browser).toHaveTitleContaining('Checkout');

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
        const orderNum = await $(".checkout-success > p:first-child > a > strong").getText();

        //view orders (this order is the first order)
        await ordersPage.open();

        await expect(ordersPage.lastOrder).toHaveTextContaining(orderNum);
    });   

    
    it('should complete the checkout process for buyer', async () => {        
        //login to account
        await loginPage.open();
        await loginPage.login("johndoe@mail.com", "P@ssw0rd");

        //url for item
        await browser.url('https://magento.softwaretestingboard.com/savvy-shoulder-tote.html'); 

        //we use default quantity (1)
        
        //add item to cart
        const addToCartButton = await $('#product-addtocart-button'); 
        await expect(addToCartButton).toBeClickable(); 
        await expect(addToCartButton).toHaveText('Add to Cart'); 
        await addToCartButton.click();

        //go to checkout using direct link
        await checkoutShippingPage.open();

        //add shipping information
        await expect(browser).toHaveUrlContaining('https://magento.softwaretestingboard.com/checkout/#shipping');
        await checkoutShippingPage.continueToPayment2();
        
        await expect(browser).toHaveUrlContaining('https://magento.softwaretestingboard.com/checkout/#payment');

        //proceed to the next step to place order and check the heading on the page and title of browser
        //confirm payment
        const submitBtn = await $("button[title='Place Order']");
        await submitBtn.click();

        //view thank you page
        await expect(browser).toHaveUrlContaining('https://magento.softwaretestingboard.com/checkout/onepage/success/');
        const orderNum = await $(".checkout-success > p:first-child > a > strong").getText();

        //view orders (this order is the first order)
        await ordersPage.open();

        await expect(ordersPage.lastOrder).toHaveTextContaining(orderNum);
    });   

});
