const productData = require("../data/product.data");
const checkoutShippingPage = require("../pageobjects/checkoutShipping.page");

describe('Luma Ecommerce Site - Go to Checkout', () => {

    it('should go to checkout from the dropdown cart', async () => {
        //variables that store product information
        [
            itemType, itemCategory, 
            itemSubcategory, itemName, 
            itemSize, itemColour, 
            itemQuantity, itemPrice
        ] = [
            productData[4].type, productData[4].category,
            productData[4].subcategory, productData[4].name,
            productData[4].size, productData[4].colour,
            productData[4].quanitity, productData[4].price
        ];
        
        //url for item
        await browser.url('https://magento.softwaretestingboard.com/push-it-messenger-bag.html'); 
        
        //select the quantity
        const quantity = await $('#qty');  
        await quantity.setValue(itemQuantity);

        //add to cart
        const addToCartButton = await $('#product-addtocart-button'); 
        await expect(addToCartButton).toBeClickable(); 
        await expect(addToCartButton).toHaveText('Add to Cart'); 
        await addToCartButton.click();

        //wait for alert to confirm item has been added to cart
        const alert = await $("div[data-bind='html: $parent.prepareMessageForHtml(message.text)']");        
        await alert.waitForDisplayed(5000, true);
        await expect(alert).toHaveTextContaining(`You added ${itemName} to your shopping cart.`);

        const cartIcon = await $('.action.showcart');
        await cartIcon.click();

        const cartDropdown = await $('#ui-id-1');
        await cartDropdown.waitForDisplayed(5000, true);
       
        //go to checkout using the checkout button in dropdown
        const goToCheckOutButton = await $('button#top-cart-btn-checkout');
        await goToCheckOutButton.waitForDisplayed(5000, true);
        await goToCheckOutButton.click();

        //check the heading on the page and title of browser
        await expect(checkoutShippingPage.pageHeading).toHaveText('Shipping Address');
        await expect(browser).toHaveTitleContaining('Checkout');
    });  

    
    it.skip('should go to checkout using the button from the view cart page', async () => {
        //url for item
        await browser.url('https://magento.softwaretestingboard.com/set-of-sprite-yoga-straps.html'); 

        //we use default quantity (1)
        
        //add item to cart
        const addToCartButton = await $('#product-addtocart-button'); 
        await expect(addToCartButton).toBeClickable(); 
        await expect(addToCartButton).toHaveText('Add to Cart'); 
        await addToCartButton.click();

        //view cart
        const cartIcon = await $('.action.showcart');
        await cartIcon.click();

        const cartDropdown = await $('#ui-id-1');
        await cartDropdown.waitForDisplayed(5000, true);

        const viewCart = await $('.action.viewcart');
        await viewCart.click();

        //go to checkout
        const goToCheckOutButton = await $("button[title='Proceed to Checkout'] span");
        await goToCheckOutButton.click();

        //check the heading on the page and title of browser
        const pageHeading = await $('step-title');
        await expect(pageHeading).toHaveText('Shipping Address');
        await expect(browser).toHaveTitleContaining('Checkout');
    });

    
    it.skip('should go to checkout using direct link', async () => {
        //url for item
        await browser.url('https://magento.softwaretestingboard.com/sprite-foam-roller.html'); 

        //we use default quantity (1)
        
        //add item to cart
        const addToCartButton = await $('#product-addtocart-button'); 
        await expect(addToCartButton).toBeClickable(); 
        await expect(addToCartButton).toHaveText('Add to Cart'); 
        await addToCartButton.click();

        //go to checkout using direct link
        await checkoutShippingPage.open();

        //check the heading on the page and title of browser
        await expect(checkoutShippingPage.pageHeading).toHaveText('Shipping Address');
        await expect(browser).toHaveTitleContaining('Checkout');
    });

});
