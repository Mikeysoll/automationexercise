const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const ProductsPage = require('../pages/ProductsPage');
const ProductDetailPage = require('../pages/ProductDetailPage');

test.describe('Тест-кейс 8: Проверка страницы товаров и детальной информации', () => {
  test('отображение всех товаров и корректность детальной информации о товаре', async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const productDetailPage = new ProductDetailPage(page);

    await homePage.goto();
    expect(await homePage.verifyHomePageVisible()).toBeTruthy();

    await homePage.clickProducts();
    expect(await productsPage.verifyUserNavigatedToProductsPage()).toBeTruthy();
    expect(await productsPage.verifyProductsPageVisible()).toBeTruthy();

    const productsCount = await productsPage.getProductsCount();
    expect(productsCount).toBeGreaterThan(0);

    await productsPage.clickFirstProductView();
    expect(await productDetailPage.verifyProductDetailsVisible()).toBeTruthy();

    const productName = await productDetailPage.getProductName();
    const productCategory = await productDetailPage.getProductCategory();
    const productPrice = await productDetailPage.getProductPrice();
    const productAvailability = await productDetailPage.getProductAvailability();
    const productCondition = await productDetailPage.getProductCondition();
    const productBrand = await productDetailPage.getProductBrand();

    expect(productName).toBeTruthy();
    expect(productCategory).toBeTruthy();
    expect(productPrice).toBeTruthy();
    expect(productAvailability).toBeTruthy();
    expect(productCondition).toBeTruthy();
    expect(productBrand).toBeTruthy();
  });
});