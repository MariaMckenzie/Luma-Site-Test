# Luma-Site-Test
WebDriver.io tests for [Luma Ecommerce Site](https://magento.softwaretestingboard.com/).

## Perquisites
- [Node](https://nodejs.org/en/download/)
- [NPM](https://www.npmjs.com/)
- [Java JDK](https://www.oracle.com/java/technologies/downloads/)
- [VS Code](https://code.visualstudio.com/download)
- Chrome Driver
- Firefox Driver

## Project Setup
### Data Folder
Contains `data.js` files that store an array of objects that are used in the tests in the **Specs Folder**. 

### Page Objects Folder
Contains `page.js` files that stores the elements for each page.

### Specs Folder
Contains the `specs.js` files that stores the tests that should be ran using the command `npm test`.

## Tests
***Note:*** *All tests should be run as is unless otherwise stated below. Sometimes some tests need to be ran more than once for it to pass sometimes due to the browser among many other things.*
### Signup
Describes the tests that covers the signup process.

***Note:*** *You can only run the `createAccount1.e2e.js` and `createAccount2.e2e.js` only once without errors. This is so because you cannot create an account with an email that is already taken. Hence to run this test again, you have to increment the number in the email or try another email altogether. This data **MUST** be changed in the `signup.data.js` file.*

The tests for this process includes:
- Creating an account **with** a subscription
- Creating an account **without** a Subscription
- Attempting to create an account with missing and/or erroneous data
- Attempting to create an account with an existing email address

### Add to Cart
Describes the tests that covers the 'add to cart' process.

The tests for this process includes:
- Adding an item to the cart using the side nav bar
- Adding an item to the using the search bar
- Adding an item to the cart using the direct link to a subcategory
- Adding an item to the cart using a direct link to the item
- Adding a non-clothing item to the cart
-Attempting to add an item to the cart with invalid/erroneous data 

### Go to Checkout
Describes the tests that covers the 'go to checkout' process.

The tests for this process includes:
- Go to checkout from the dropdown cart
- Go to checkout using the button from the cart page
- Go to checkout using the direct link 

### Place Order and Check Order History
Describes the tests that covers the place order and check order history processes.

***Note:*** *The user has to be logged in to make the purchase appear in their order history. Also, the first test can only be run once since it would be the very *first* order placed by the user. To run the test again you have to change the email address in the `login.data.js` file.*

The tests for this process includes:
- Complete the purchase as a first-time buyer
- Complete the process as a recurring buyer
