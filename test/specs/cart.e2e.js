const HomePage = require('../pageobjects/home.page');
const productData = require('../data/product.data');

describe('Luma Ecommerce Site - Adding Items to Cart', () => {
    let itemType, itemCategory, itemSubcategory, itemName, itemSize, itemColour, itemQuantity, itemPrice, total;

    before (function () {
        HomePage.open();
    });


    it('should add an item to cart without errors', async () => {
        //variables that store product information
        [
            itemType, itemCategory, 
            itemSubcategory, itemName, 
            itemSize, itemColour, 
            itemQuantity, itemPrice
        ] = [
            productData[0].type, productData[0].category,
            productData[0].subcategory, productData[0].name,
            productData[0].size, productData[0].colour,
            productData[0].quanitity, productData[0].price
        ];

        //go to main page for women's clothes
        await HomePage.womenNavLink.click();

        //check the heading on the page and title of browser
        const pageHeading = await $('.base');
        await expect(pageHeading).toHaveText(itemType);
        await expect(browser).toHaveTitleContaining(itemType);

        //check for the category
        const category = await $("body > div:nth-child(5) > main:nth-child(4) > div:nth-child(5) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > strong:nth-child(1)");
        await expect(category).toHaveText(itemCategory.toUpperCase());

        //check the sub-category and click the desired one
        const subcategory = await $("div[class='sidebar sidebar-main'] li:nth-child(3) a");
        await expect(subcategory).toHaveText(itemSubcategory);
        await expect(subcategory).toBeClickable();
        await subcategory.click();

        //check the browser title for the change
        await expect(browser).toHaveTitleContaining(`${itemSubcategory} - ${itemCategory} - ${itemType}`);

        //select the desired item
        const name = await $('body > div:nth-child(5) > main:nth-child(4) > div:nth-child(4) > div:nth-child(1) > div:nth-child(4) > ol:nth-child(1) > li:nth-child(1) > div:nth-child(1) > div:nth-child(2) > strong:nth-child(1) > a:nth-child(1)');        
        await expect(name).toHaveText(itemName);
        await expect(name).toBeClickable();
        await name.click();

        //check browser title for change
        await expect(browser).toHaveTitleContaining(`${itemName}`);

        //select the size
        const size = await $('#option-label-size-143-item-167');        
        await expect(size).toHaveText(itemSize.toString());
        await expect(size).toBeClickable();
        await size.click();

        //select the colour
        const colour = await $('#option-label-color-93-item-56');        
        await expect(colour).toHaveAttrContaining('option-label', itemColour);
        await expect(colour).toBeClickable();
        await colour.click();

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

        const viewCart = await $('.action.viewcart');
        await viewCart.click();

        //check for clothing in the cart and assert that all the information is correct
        const firstCartItemName = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:last-child > tr:nth-child(1) > td:nth-child(1) > div:nth-child(2) > strong:nth-child(1) > a:nth-child(1)');
        await expect(firstCartItemName).toHaveText(itemName);
        
        const firstCartItemSize = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:last-child > tr:nth-child(1) > td:nth-child(1) > div:nth-child(2) > dl:nth-child(2) > dd:nth-child(2)');
        await expect(firstCartItemSize).toHaveText(itemSize.toString());

        const firstCartItemColor = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:last-child > tr:nth-child(1) > td:nth-child(1) > div:nth-child(2) > dl:nth-child(2) > dd:nth-child(4)');
        await expect(firstCartItemColor).toHaveText(itemColour);

        const firstCartItemQuantity = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:last-child > tr:nth-child(1) > td:nth-child(3) > div:first-child > div:first-child > label:first-child > input');
        await expect(firstCartItemQuantity).toHaveAttrContaining('value', itemQuantity);

        const firstCartItemPrice = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(2) > span:nth-child(1) > span:nth-child(1) > span:nth-child(1)');
        await expect(firstCartItemPrice).toHaveText(`$${itemPrice.toFixed(2)}`);

        const firstCartItemSubtotal = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(4) > span:nth-child(1) > span:nth-child(1) > span:nth-child(1)');
        await expect(firstCartItemSubtotal).toHaveText(`$${(itemPrice * itemQuantity).toFixed(2)}`);
    });  


    it('should find item using search bar and add item to cart', async () => {
        //variables that store product information
        [
            itemType, itemCategory, 
            itemSubcategory, itemName, 
            itemSize, itemColour, 
            itemQuantity, itemPrice
        ] = [
            productData[1].type, productData[1].category,
            productData[1].subcategory, productData[1].name,
            productData[1].size, productData[1].colour,
            productData[1].quanitity, productData[1].price
        ];

        //enter information into search bar
        await HomePage.searchBar.setValue(itemName);
        await browser.keys('Enter'); //press enter to confirm search

        //check browser title for change
        await expect(browser).toHaveTitleContaining(`Search results for: '${itemName}'`);

        //check for item 
        const firstSearchResultName = await $('body > div:nth-child(5) > main:nth-child(4) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > div:nth-child(3) > ol:nth-child(1) > li:nth-child(1) > div:nth-child(1) > div:nth-child(2) > strong:nth-child(1) > a:nth-child(1)');
        await expect(firstSearchResultName).toHaveText(itemName);

        //select the desired item
        await expect(firstSearchResultName).toBeClickable();
        await firstSearchResultName.click();

        //check browser title for change
        await expect(browser).toHaveTitleContaining(`${itemName}`);

        //select the size
        const size = await $('#option-label-size-143-item-171');        
        await expect(size).toHaveText(itemSize.toString());
        await expect(size).toBeClickable();
        await size.click();

        //select the colour
        const colour = await $('#option-label-color-93-item-53');        
        await expect(colour).toHaveAttrContaining('option-label', itemColour);
        await expect(colour).toBeClickable();
        await colour.click();

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

        const viewCart = await $('.action.viewcart');
        await viewCart.click();

        //check for clothing in the cart as the second item       
        const cartItemName = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(4) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(2) > strong:nth-child(1) > a:nth-child(1)');
        await expect(cartItemName).toHaveText(itemName);
        
        const cartItemSize = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(4) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(2) > dl:nth-child(2) > dd:nth-child(2)');
        await expect(cartItemSize).toHaveText(itemSize.toString());

        const cartItemColor = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(4) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(2) > dl:nth-child(2) > dd:nth-child(4)');
        await expect(cartItemColor).toHaveText(itemColour);

        const cartItemQuantity = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(4) > tr:nth-child(1) > td:nth-child(3) > div:first-child > div:first-child > label:first-child > input');
        await expect(cartItemQuantity).toHaveAttrContaining('value', itemQuantity);

        const cartItemPrice = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(4) > tr:nth-child(1) > td:nth-child(2) > span:nth-child(1) > span:nth-child(1) > span:nth-child(1)');
        await expect(cartItemPrice).toHaveText(`$${itemPrice.toFixed(2)}`);

        const cartItemSubtotal = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(4) > tr:nth-child(1) > td:nth-child(4) > span:nth-child(1) > span:nth-child(1) > span:nth-child(1)');
        await expect(cartItemSubtotal).toHaveText(`$${(itemPrice * itemQuantity).toFixed(2)}`);
    }); 


    it('should find item using the link to a subcategory and add item to cart', async () => {    
        //variables that store product information
        [
            itemType, itemCategory, 
            itemSubcategory, itemName, 
            itemSize, itemColour, 
            itemQuantity, itemPrice
        ] = [
            productData[2].type, productData[2].category,
            productData[2].subcategory, productData[2].name,
            productData[2].size, productData[2].colour,
            productData[2].quanitity, productData[2].price
        ];

        //url for category of items
        await browser.url('https://magento.softwaretestingboard.com/men/tops-men/jackets-men.html');
        await expect (browser).toHaveTitleContaining(`${itemSubcategory}`);

        //select the desired item
        const name = await $('body > div:nth-child(5) > main:nth-child(4) > div:nth-child(4) > div:nth-child(1) > div:nth-child(4) > ol:nth-child(1) > li:nth-child(1) > div:nth-child(1) > div:nth-child(2) > strong:nth-child(1) > a:nth-child(1)');          
        await expect(name).toHaveText(itemName);
        await expect(name).toBeClickable();
        await name.click();

        //check browser title for change
        await expect(browser).toHaveTitleContaining(`${itemName}`);

        //select the size
        const size = await $('#option-label-size-143-item-169');        
        await expect(size).toHaveText(itemSize);
        await expect(size).toBeClickable();
        await size.click();

        //select the colour
        const colour = await $('#option-label-color-93-item-49');        
        await expect(colour).toHaveAttrContaining('option-label', itemColour);
        await expect(colour).toBeClickable();
        await colour.click();

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

        const viewCart = await $('.action.viewcart');
        await viewCart.click();

        //check for clothing in the cart as the third item 
        const cartItemName = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(5) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(2) > strong:nth-child(1) > a:nth-child(1)');
        await expect(cartItemName).toHaveText(itemName);
        
        const cartItemSize = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(5) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(2) > dl:nth-child(2) > dd:nth-child(2)');
        await expect(cartItemSize).toHaveText(itemSize.toString());

        const cartItemColor = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(5) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(2) > dl:nth-child(2) > dd:nth-child(4)');
        await expect(cartItemColor).toHaveText(itemColour);

        const cartItemQuantity = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(5) > tr:nth-child(1) > td:nth-child(3) > div:first-child > div:first-child > label:first-child > input');
        await expect(cartItemQuantity).toHaveAttrContaining('value', itemQuantity);

        const cartItemPrice = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(5) > tr:nth-child(1) > td:nth-child(2) > span:nth-child(1) > span:nth-child(1) > span:nth-child(1)');
        await expect(cartItemPrice).toHaveText(`$${itemPrice.toFixed(2)}`);

        const cartItemSubtotal = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(5) > tr:nth-child(1) > td:nth-child(4) > span:nth-child(1) > span:nth-child(1) > span:nth-child(1)');
        await expect(cartItemSubtotal).toHaveText(`$${(itemPrice * itemQuantity).toFixed(2)}`);
    });  

    
    it('should find item using the direct link and add item to cart', async () => {    
        //variables that store product information
        [
            itemType, itemCategory, 
            itemSubcategory, itemName, 
            itemSize, itemColour, 
            itemQuantity, itemPrice
        ] = [
            productData[3].type, productData[3].category,
            productData[3].subcategory, productData[3].name,
            productData[3].size, productData[3].colour,
            productData[3].quanitity, productData[3].price
        ];

        //url for clothing item
        await browser.url('https://magento.softwaretestingboard.com/cronus-yoga-pant.html');         

        //select the size
        const size = await $('#option-label-size-143-item-177');
        await expect(size).toBeClickable();
        await size.click();

        //select the colour
        const colour = await $('#option-label-color-93-item-58');        
        await expect(colour).toHaveAttrContaining('option-label', itemColour);
        await expect(colour).toBeClickable();
        await colour.click();

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

        const viewCart = await $('.action.viewcart');
        await viewCart.click();

        //check for clothing in the cart as the fourth item 
        const cartItemName = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(6) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(2) > strong:nth-child(1) > a:nth-child(1)');
        await expect(cartItemName).toHaveText(itemName);
        
        const cartItemSize = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(6) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(2) > dl:nth-child(2) > dd:nth-child(2)');
        await expect(cartItemSize).toHaveText(itemSize.toString());

        const cartItemColor = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(6) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(2) > dl:nth-child(2) > dd:nth-child(4)');
        await expect(cartItemColor).toHaveText(itemColour);

        const cartItemQuantity = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(6) > tr:nth-child(1) > td:nth-child(3) > div:first-child > div:first-child > label:first-child > input');
        await expect(cartItemQuantity).toHaveAttrContaining('value', itemQuantity);

        const cartItemPrice = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(6) > tr:nth-child(1) > td:nth-child(2) > span:nth-child(1) > span:nth-child(1) > span:nth-child(1)');
        await expect(cartItemPrice).toHaveText(`$${itemPrice.toFixed(2)}`);

        const cartItemSubtotal = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(6) > tr:nth-child(1) > td:nth-child(4) > span:nth-child(1) > span:nth-child(1) > span:nth-child(1)');
        await expect(cartItemSubtotal).toHaveText(`$${(itemPrice * itemQuantity).toFixed(2)}`);
    });  


    it('should add a non-clothing item to cart', async () => {    
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

        const viewCart = await $('.action.viewcart');
        await viewCart.click();

        //check for clothing in the cart as the fifth item 
        const cartItemName = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(7) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(2) > strong:nth-child(1) > a:nth-child(1)');
        await expect(cartItemName).toHaveText(itemName);

        const cartItemQuantity = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(7) > tr:nth-child(1) > td:nth-child(3) > div:first-child > div:first-child > label:first-child > input');
        await expect(cartItemQuantity).toHaveAttrContaining('value', itemQuantity);

        const cartItemPrice = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(7) > tr:nth-child(1) > td:nth-child(2) > span:nth-child(1) > span:nth-child(1) > span:nth-child(1)');
        await expect(cartItemPrice).toHaveText(`$${itemPrice.toFixed(2)}`);

        const cartItemSubtotal = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(7) > tr:nth-child(1) > td:nth-child(4) > span:nth-child(1) > span:nth-child(1) > span:nth-child(1)');
        await expect(cartItemSubtotal).toHaveText(`$${(itemPrice * itemQuantity).toFixed(2)}`);
    });  

    
    it('should not add item to cart because of missing or erroneous data', async () => {
        //url for clothing item
        await browser.url('https://magento.softwaretestingboard.com/leah-yoga-top.html'); 

        //add to cart
        const addToCartButton = await $('#product-addtocart-button');
        await expect(addToCartButton).toHaveAttributeContaining('title', 'Add to Cart');
        await addToCartButton.click();
        
        //errors for not selecting a size or colour
        const sizeError = await $('body > div:nth-child(5) > main:nth-child(4) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > form:nth-child(1) > div:nth-child(6) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(5)');
        await expect(sizeError).toBeDisplayed();
        await expect(sizeError).toHaveTextContaining('This is a required field.');

        const colorError = await $('body > div:nth-child(5) > main:nth-child(4) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > form:nth-child(1) > div:nth-child(6) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(5)');
        await expect(colorError).toBeDisplayed();
        await expect(colorError).toHaveTextContaining('This is a required field.');

        //error for using zero as quantity
        const quantity = await $('#qty');
        await quantity.setValue(0);
        await addToCartButton.click();

        const zeroError = await $('#qty-error');
        await expect(zeroError).toBeDisplayed();
        await expect(zeroError).toHaveTextContaining('Please enter a quantity greater than 0.');

        //error for using a non-numeric character as quantity
        await quantity.setValue('a');
        await addToCartButton.click();

        const characterError = await $('#qty-error');
        await expect(characterError).toBeDisplayed();
        await expect(characterError).toHaveTextContaining('Please enter a valid number in this field.');

        //check the cart for the sixth item - it should not exist
        const cartIcon = await $('.action.showcart');
        await cartIcon.click();

        const cartDropdown = await $('#ui-id-1');
        await cartDropdown.waitForDisplayed(5000, true);

        const viewCart = await $('.action.viewcart');
        await viewCart.click();

        //check for clothing in the cart as the sixth item 
        const cartItemName = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(8) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(2) > strong:nth-child(1) > a:nth-child(1)');
        await expect(cartItemName).not.toBeExisting();        
    });

});
