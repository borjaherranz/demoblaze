// fixtures/pom.ts
import { test as dataTest, expect } from '../utils/test-base';
import { PageObjectManager } from '../page_object/PageObjectManager';
import type { HomePage } from '../page_object/HomePage';
import type { CartPage } from '../page_object/CartPage';
import type { ProductPage } from '../page_object/ProductPage';

type PomFixtures = {
  pom: PageObjectManager;
  homePage: HomePage;
  cartPage: CartPage;
  productPage: ProductPage;
};

export const test = dataTest.extend<PomFixtures>({
  pom: async ({ page }, use) => {
    const pom = new PageObjectManager(page);
    await use(pom);
  },

  homePage: async ({ pom }, use) => {
    await use(pom.getHomePage());
  },

  cartPage: async ({ pom }, use) => {
    await use(pom.getCartPage());
  },

  productPage: async ({ pom }, use) => {
    await use(pom.getProductPage());
  },
});

export { expect };
