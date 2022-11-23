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
Some tests cover workflows to achieve a speciifc goal while others perform checks. Due to the size of the tests, it is wise to run larger testcases indidividually rather than altogther. The **main browser** is **chrome**. You can also try to run the tests in Edge and/or Firefox. However, some testcases will fail once the browser is switched because of minor chnages. **For example,** in Firefox, an alert comes up at the top of the page if the passwords are mismatched (this only comes up for a split second). In some cases, it creates an alert at the top of the page and in others it behaves normally like chrome. 
**See screenshots of the alert from firefox during the test run in `\img` folder**

***Note:*** *All tests should be run as is unless otherwise stated below. Sometimes some tests need to be ran more than once for it to pass sometimes due to the browser among many other things.*

### Process Flows
Each flow should be ran indidividually to avoid any disruptions.

***Note:*** *You can only run the `flow1.e2e.js` and `flow2.e2e.js` only once without errors. This is so because you cannot create an account with an email that is already taken. Hence to run this test again, you have to increment the number in the email or try another email altogether; otherwise. This data **MUST** be changed in the `signup.data.js` file.*

## Other tests
The tests in the `cart.e2e.js` file are just random tests that assert that the cart works as it should. The tests in the `signup.e2e.js` are just tests that assert that the signup page works as expected in relation to the input fields. Also, the tests in the `checkout.e2e.js` file covers the getting to the checkout point and ensuring that regardless of the route taken the user can get to the checkout page.

