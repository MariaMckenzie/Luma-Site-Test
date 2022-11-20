const HomePage = require('../pageobjects/home.page');
const productData = require('../data/product.data');

describe('Luma Ecommerce Site - Adding Items to Cart', () => {
    beforeEach(function () {
        HomePage.open('');
    });


    it.skip('should add a women tee to cart', async () => {
        //go to main page for women's clothes
        await HomePage.womenNavLink.click();

        //check the heading on the page and title of browser
        const itemType = await $('.base');
        await expect(itemType).toHaveText(productData[0].type);
        await expect(browser).toHaveTitleContaining(`${productData[0].type}`);

        //check for the category
        const itemCategory = await $("body > div:nth-child(5) > main:nth-child(4) > div:nth-child(5) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > strong:nth-child(1)");
        await expect(itemCategory).toHaveText(productData[0].category.toUpperCase());

        //check the sub-category and click the desired one
        const itemSubcategory = await $("div[class='sidebar sidebar-main'] li:nth-child(3) a");
        await expect(itemSubcategory).toHaveText(productData[0].subcategory);
        await expect(itemSubcategory).toBeClickable();
        await itemSubcategory.click();

        //check the browser title for the change
        await expect(browser).toHaveTitleContaining(`${productData[0].subcategory} - ${productData[0].category} - ${productData[0].type}`);

        //select the desired item
        const itemName = await $("(//a[normalize-space()='Desiree Fitness Tee'])[1]");        
        await expect(itemName).toHaveText(productData[0].name);
        await expect(itemName).toBeClickable();
        await itemName.click();

        //check browser title for change
        await expect(browser).toHaveTitleContaining(`${productData[0].name}`);

        //select the size
        const itemSize = await $('#option-label-size-143-item-167');        
        await expect(itemSize).toHaveText(productData[0].size);
        await expect(itemSize).toBeClickable();
        await itemSize.click();

        //select the colour
        const itemColour = await $('#option-label-color-93-item-56');        
        await expect(itemColour).toHaveAttrContaining('option-label', productData[0].colour);
        await expect(itemColour).toBeClickable();
        await itemColour.click();

        //select the quantity
        const itemQuantity = await $('#qty');  
        await itemQuantity.setValue(productData[0].quanitity);

        //add to cart
        const addToCartButton = await $('#product-addtocart-button'); 
        await expect(addToCartButton).toBeClickable(); 
        await expect(addToCartButton).toHaveText('Add to Cart'); 
        await addToCartButton.click();

        //check the cart for the item
        const alert = await $("div[data-bind='html: $parent.prepareMessageForHtml(message.text)']");        
        await alert.waitForDisplayed(5000, true);
        await expect(alert).toHaveTextContaining('You added Desiree Fitness Tee to your shopping cart.');

        const cartIcon = await $('.action.showcart');
        await cartIcon.click();

        const cartDropdown = await $('#ui-id-1');
        await cartDropdown.waitForDisplayed(5000, true);

        const viewCart = await $('.action.viewcart');
        await viewCart.click();

        //check for tee in the cart
        const firstCartItemName = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(2) > strong:nth-child(1) > a:nth-child(1)');
        await expect(firstCartItemName).toHaveText(productData[0].name);
        
        const firstCartItemSize = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(2) > dl:nth-child(2) > dd:nth-child(2)');
        await expect(firstCartItemSize).toHaveText(productData[0].size);

        const firstCartItemColor = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(2) > dl:nth-child(2) > dd:nth-child(4)');
        await expect(firstCartItemColor).toHaveText(productData[0].colour);

        const firstCartItemQuantity = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(3) > div:first-child > div:first-child > label:first-child > input');
        await expect(firstCartItemQuantity).toHaveAttrContaining('value', productData[0].quanitity);

        const firstCartItemPrice = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(2) > span:nth-child(1) > span:nth-child(1) > span:nth-child(1)');
        await expect(firstCartItemPrice).toHaveText(`$${productData[0].price.toFixed(2)}`);

        const firstCartItemSubtotal = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(4) > span:nth-child(1) > span:nth-child(1) > span:nth-child(1)');
        await expect(firstCartItemSubtotal).toHaveText(`$${(productData[0].price * productData[0].quanitity).toFixed(2)}`);
    });  


    it.skip('should find item using search bar and add item to cart', async () => {
        await HomePage.searchBar.setValue(productData[0].name);
        await browser.keys('Enter'); //press enter to confirm search

        //check browser title for change
        await expect(browser).toHaveTitleContaining(`Search results for: '${productData[0].name}'`);

        //check for item 
        const firstSearchResultName = await $('body > div:nth-child(5) > main:nth-child(4) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > div:nth-child(3) > ol:nth-child(1) > li:nth-child(1) > div:nth-child(1) > div:nth-child(2) > strong:nth-child(1) > a:nth-child(1)');
        await expect(firstSearchResultName).toHaveText(productData[0].name);

        //select the desired item
        const itemName = await $("(//a[normalize-space()='Desiree Fitness Tee'])[1]");        
        await expect(itemName).toHaveText(productData[0].name);
        await expect(itemName).toBeClickable();
        await itemName.click();

        //check browser title for change
        await expect(browser).toHaveTitleContaining(`${productData[0].name}`);

        //select the size
        const itemSize = await $('#option-label-size-143-item-167');        
        await expect(itemSize).toHaveText(productData[0].size);
        await expect(itemSize).toBeClickable();
        await itemSize.click();

        //select the colour
        const itemColour = await $('#option-label-color-93-item-56');        
        await expect(itemColour).toHaveAttrContaining('option-label', productData[0].colour);
        await expect(itemColour).toBeClickable();
        await itemColour.click();

        //select the quantity
        const itemQuantity = await $('#qty');  
        await itemQuantity.setValue(productData[0].quanitity);

        //add to cart
        const addToCartButton = await $('#product-addtocart-button'); 
        await expect(addToCartButton).toBeClickable(); 
        await expect(addToCartButton).toHaveText('Add to Cart'); 
        await addToCartButton.click();

        //check the cart for the item
        const alert = await $("div[data-bind='html: $parent.prepareMessageForHtml(message.text)']");        
        await alert.waitForDisplayed(5000, true);
        await expect(alert).toHaveTextContaining('You added Desiree Fitness Tee to your shopping cart.');

        const cartIcon = await $('.action.showcart');
        await cartIcon.click();

        const cartDropdown = await $('#ui-id-1');
        await cartDropdown.waitForDisplayed(5000, true);

        const viewCart = await $('.action.viewcart');
        await viewCart.click();

        //check for tee in the cart
        const searchResultName = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(2) > strong:nth-child(1) > a:nth-child(1)');
        await expect(searchResultName).toHaveText(productData[0].name);
        
        const searchResultSize = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(2) > dl:nth-child(2) > dd:nth-child(2)');
        await expect(searchResultSize).toHaveText(productData[0].size);

        const searchResultColor = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(1) > div:nth-child(2) > dl:nth-child(2) > dd:nth-child(4)');
        await expect(searchResultColor).toHaveText(productData[0].colour);

        const searchResultQuantity = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(3) > div:first-child > div:first-child > label:first-child > input');
        await expect(searchResultQuantity).toHaveAttrContaining('value', productData[0].quanitity);

        const searchResultPrice = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(2) > span:nth-child(1) > span:nth-child(1) > span:nth-child(1)');
        await expect(searchResultPrice).toHaveText(`$${productData[0].price.toFixed(2)}`);

        const searchResultSubtotal = await $('body > div:nth-child(5) > main:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(5) > form:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(4) > span:nth-child(1) > span:nth-child(1) > span:nth-child(1)');
        await expect(searchResultSubtotal).toHaveText(`$${(productData[0].price * productData[0].quanitity).toFixed(2)}`);
    });  

//purchasing a product
//verifying purchase in order history 
});

