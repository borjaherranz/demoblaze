import { Page, Locator, expect } from '@playwright/test';

export class HomePage {

    private page: Page;
    private carrousel: Locator;
    private categories: Locator;
    private productList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.carrousel = page.locator('#carouselExampleIndicators');
        this.categories = page.locator('.div.list-group');
        this.productList = page.locator('#tbodyid h4.card-title > a');
    }

    async accessHomePage() {
        await this.page.goto('https://www.demoblaze.com/index.html');
    }

    async getTitle(): Promise<string> {
        return this.page.title();
    }

    async navigateToHome() {
        await this.page.locator("a[href*='index']").click();
    }

    async verifyProductIsDisplayed(productName: any) {
        await this.productList.first().waitFor();
        await expect(this.productList.filter({ hasText: productName })).toBeVisible();
    }

    async orderProduct(productName: any) {
        const productLocator = this.productList.filter({ hasText: productName });
        const url = await productLocator.getAttribute('href');
        await productLocator.click();
        await expect(this.page).toHaveURL('https://www.demoblaze.com/' + url);
    }

    async orderSpecificProduct(category: string, productName: string) {
        await this.categories.filter({ hasText: category }).locator('a').click();
        const url = await this.productList.filter({ hasText: productName }).locator('a').getAttribute('href');
        await this.productList.filter({ hasText: productName }).locator('a').click();
        await expect(this.page).toHaveURL('https://www.demoblaze.com/' + url);
    }
}