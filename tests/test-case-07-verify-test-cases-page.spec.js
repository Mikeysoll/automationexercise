const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const TestCasesPage = require('../pages/TestCasesPage');

test.describe('Тест-кейс 7: Проверка страницы тест-кейсов', () => {
  test('успешный переход на страницу с тест-кейсами и её отображение', async ({ page }) => {
    const homePage = new HomePage(page);
    const testCasesPage = new TestCasesPage(page);

    await homePage.goto();
    expect(await homePage.verifyHomePageVisible()).toBeTruthy();

    await homePage.clickTestCases();
    expect(await testCasesPage.verifyUserNavigatedToTestCasesPage()).toBeTruthy();
  });
});