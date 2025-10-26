import { Page } from '@playwright/test';
import { HomePage } from './HomePage';
import { CartPage } from './CartPage';
import { ProductPage } from './ProductPage';

export class PageObjectManager {
    private _homePage?: HomePage;
    private _cartPage?: CartPage;
    private _productPage?: ProductPage;

    constructor(private readonly page: Page) {}

    getHomePage(): HomePage {
        this._homePage??= new HomePage(this.page);
        return this._homePage;
    }

    getCartPage(): CartPage {
        this._cartPage??= new CartPage(this.page);
        return this._cartPage;
    }

    getProductPage() {
        this._productPage??= new ProductPage(this.page);
        return this._productPage;
    }
}