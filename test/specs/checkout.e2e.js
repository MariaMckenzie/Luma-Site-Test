const signupData = require("../data/signup.data");

describe.skip('Luma Ecommerce Site - Go to Checkout', () => {
    let firstname, lastname, company, streetAddress1, streetAddress2, streetAddress3, city, state, zip, country, phone;

    it('should not proceed if all required fields are not filled', async () => {
        //variables that store address information
        [
            firstname, lastname, company, 
            streetAddress1, streetAddress2, streetAddress3, 
            city, state, zip, 
            country, phone
        ] = [
            signupData[6].firstname, signupData[6].lastname, '', 
            'Apartment 24', '1 Merry Meadows Avenue', '',
            'Miami', 'Florida', '000000-0000', 
            'United States', '987654321'
        ];

        //add item to cart
        //url for item
        await browser.url('https://magento.softwaretestingboard.com/didi-sport-watch.html'); 

        //select the quantity
        const quantity = await $('#qty');  
        await quantity.setValue(1);
        
        const addToCartButton = await $('#product-addtocart-button'); 
        await expect(addToCartButton).toBeClickable(); 
        await expect(addToCartButton).toHaveText('Add to Cart'); 
        await addToCartButton.click();

        //go to checkout - using button in dropdown cart
        await cartIcon.click();

        await cartDropdown.waitForDisplayed(5000, true);

        const goToCheckOutButton = await $('#top-cart-btn-checkout');
        await goToCheckOutButton.click();


        //check the heading on the page and title of browser
        await expect(pageHeading).toHaveText('Shipping Address');
        await expect(browser).toHaveTitleContaining('Checkout');

        const cartIcon = await $('.action.showcart');
        await cartIcon.click();

        const cartDropdown = await $('#ui-id-1');
        await cartDropdown.waitForDisplayed(5000, true);

        const viewCart = await $('.action.viewcart');
        await viewCart.click();

        //check for clothing in the cart and assert that all the information is correct
        const firstCartItemName = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(2) > strong:nth-child(1) > a:nth-child(1)');
        await expect(firstCartItemName).toHaveText(itemName);
        
        const firstCartItemSize = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(2) > dl:nth-child(2) > dd:nth-child(2)');
        await expect(firstCartItemSize).toHaveText(itemSize.toString());

        const firstCartItemColor = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(2) > dl:nth-child(2) > dd:nth-child(4)');
        await expect(firstCartItemColor).toHaveText(itemColour);

        const firstCartItemQuantity = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(3) > div:first-child > div:first-child > label:first-child > input');
        await expect(firstCartItemQuantity).toHaveAttrContaining('value', itemQuantity);

        const firstCartItemPrice = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(2) > span:nth-child(1) > span:nth-child(1) > span:nth-child(1)');
        await expect(firstCartItemPrice).toHaveText(`$${itemPrice.toFixed(2)}`);

        const firstCartItemSubtotal = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(4) > span:nth-child(1) > span:nth-child(1) > span:nth-child(1)');
        await expect(firstCartItemSubtotal).toHaveText(`$${(itemPrice * itemQuantity).toFixed(2)}`);
    });  



//purchasing a product
//verifying purchase in order history 
});
