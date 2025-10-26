import { Page, Locator, expect } from '@playwright/test';

export class CartPage {

    private page: Page
    private productList: Locator
    private placeOrderButton: Locator
    private placeOrderWindow: Locator


    constructor(page: Page) {
        this.page = page
        this.productList = page.locator("#tbodyid > tr"); 
        this.placeOrderButton = page.locator("button[data-target*='#orderModal']");
        this.placeOrderWindow = page.locator("#orderModal > div > div");
    };

    async navigateToCart() {
        await this.page.locator("a[onclick*='cart']").click();
    }

    async deleteFirstProduct() {
        const count = await this.productList.count()
        await Promise.all([
            this.page.waitForURL('https://www.demoblaze.com/cart.html#',
                 { waitUntil: 'domcontentloaded' }
            ),
            this.productList.first().locator('a').click(),
        ])
        await expect(this.productList).toHaveCount(count - 1)
    }

    async deleteSelectedProduct(productName: string) {
        await Promise.all([
            this.page.waitForURL('https://www.demoblaze.com/cart.html#', { waitUntil: 'domcontentloaded' }),
            this.productList.filter({ hasText: productName }).locator('a').click(),
        ])
        await expect(this.productList.filter({ hasText: productName })).not.toBeVisible()
    }

    async checkPlaceOrderWindow() {
        await this.placeOrderButton.click();
        await expect(this.placeOrderWindow).toBeVisible();
    }

    async placeOrder() {
        this.placeOrderWindow.locator("#name").fill("Anshika");
        this.placeOrderWindow.locator("#country").fill("India");
        this.placeOrderWindow.locator("#city").fill("Delhi");
        this.placeOrderWindow.locator("#card").fill("1234567890123456");
        this.placeOrderWindow.locator("#month").fill("01");
        this.placeOrderWindow.locator("#year").fill("2023");
        await this.placeOrderWindow.locator("button").click();
        
        const modal = this.page.locator('div.sa-placeholder')
        await Promise.all([
            modal.waitFor({ state: 'visible' }),
            await this.page.locator('div.sa-button-container > div > button').click(),
        ])
        await expect(this.page.url()).toBe('https://www.demoblaze.com/index.html')
    }
}