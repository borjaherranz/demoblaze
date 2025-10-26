import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {

    private page: Page;
    private productName: Locator;
    private productPrice: Locator;
    private productDescription: Locator;
    private addToCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productName = page.locator('h2.name');
        this.productPrice = page.locator('#tbodyid > h3.price-container');
        this.productDescription = page.locator('#more-information > p');
        this.addToCartButton = page.locator('#tbodyid > div.row > div > a');
    }

    async verifyProductDetails(productName: string, productPrice: string, productDescription: string) {
        await expect(this.productName).toHaveText(productName);
        await expect(this.productPrice).toContainText(productPrice);
        await expect(this.productDescription).toHaveText(productDescription);
    }

    async verifyAddToCartButton() {
        await expect(this.addToCartButton).toBeVisible();
    }

    async clickAddToCartButton() {
        await this.addToCartButton.click();
        this.page.on('dialog', dialog => dialog.accept());
    }
}
