
import { test, expect } from '../fixtures/pom' 

test.beforeEach(async({ pom })=> {
    await pom.getHomePage().accessHomePage();
})

test('Buy a product', async({ pom, testData })=> {
    /** Access to the login page and order a product */
    const loginPage = pom.getHomePage();
    await loginPage.orderProduct(testData.productName);

    /** Check in the cart the product is there */
    const productPage = pom.getProductPage();
    await productPage.verifyProductDetails(testData.productName, testData.productPrice, testData.productDescription);
    await productPage.clickAddToCartButton();
})

test('Delete the lsat product ordered', async ({ pom })=> {
    const loginPage = pom.getHomePage();
    const cartPage = pom.getCartPage();

    const
})

test('Order the list of products', async ({ pom, testData}) => {
    /** Access to the login page and order a product */
    const loginPage = pom.getHomePage();
    
})