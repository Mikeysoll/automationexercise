const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const DataGenerator = require('../utils/dataGenerator');

test.describe('Тест-кейс 10: Подписка на рассылку на главной странице', () => {
  test('успешная подписка на рассылку через форму на главной странице', async ({ page }) => {
    const homePage = new HomePage(page);
    const email = DataGenerator.generateEmail();

    await homePage.goto();
    expect(await homePage.verifyHomePageVisible()).toBeTruthy();

    await homePage.subscribeToNewsletter(email);
    
    const successMessage = await homePage.getSubscriptionSuccessMessage();
    expect(successMessage).toContain('You have been successfully subscribed!');
  });
});