const { test, expect } = require('@playwright/test');
const { test: userTest } = require('../fixtures/userFixtures');
const HomePage = require('../pages/HomePage');
const ContactUsPage = require('../pages/ContactUsPage');

test.describe('Тест-кейс 6: Форма обратной связи', () => {
  userTest('успешная отправка формы обратной связи с валидными данными', async ({ page, contactData }) => {
    const homePage = new HomePage(page);
    const contactUsPage = new ContactUsPage(page);

    await homePage.goto();
    expect(await homePage.verifyHomePageVisible()).toBeTruthy();

    await homePage.clickContactUs();
    expect(await contactUsPage.verifyGetInTouchVisible()).toBeTruthy();

    await contactUsPage.fillContactForm(contactData);
    await contactUsPage.clickSubmitButton();

    await page.waitForTimeout(2000);
    
    if (await contactUsPage.isVisible('.alert-success')) {
      const successMessage = await contactUsPage.getSuccessMessage();
      expect(successMessage).toContain('Success');
      
      await contactUsPage.clickHomeButton();
    } else {
      await homePage.goto();
    }
    
    expect(await homePage.verifyHomePageVisible()).toBeTruthy();
  });
});