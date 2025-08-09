const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const ProductsPage = require('../pages/ProductsPage');
const DataGenerator = require('../utils/dataGenerator');

test.describe('Тест-кейс 9: Поиск товаров', () => {
  test('успешный поиск товаров по ключевому слову с отображением результатов', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const searchTerm = DataGenerator.generateProductSearchTerm();

    await homePage.goto();
    expect(await homePage.verifyHomePageVisible()).toBeTruthy();

    await homePage.clickProducts();
    expect(await productsPage.verifyUserNavigatedToProductsPage()).toBeTruthy();
    expect(await productsPage.verifyProductsPageVisible()).toBeTruthy();

    await productsPage.searchForProduct(searchTerm);
    expect(await productsPage.verifySearchedProductsVisible()).toBeTruthy();

    const productsCount = await productsPage.getProductsCount();
    expect(productsCount).toBeGreaterThan(0);
  });
});