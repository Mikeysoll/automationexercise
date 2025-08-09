const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const SignupLoginPage = require('../pages/SignupLoginPage');
const DataGenerator = require('../utils/dataGenerator');

test.describe('Тест-кейс 3: Авторизация с некорректными данными', () => {
  test('отображение ошибки при вводе неправильного email и пароля', async ({ page }) => {
    const homePage = new HomePage(page);
    const signupLoginPage = new SignupLoginPage(page);
    const incorrectEmail = DataGenerator.generateEmail();
    const incorrectPassword = 'wrongpassword123';

    await homePage.goto();
    expect(await homePage.verifyHomePageVisible()).toBeTruthy();

    await homePage.clickSignupLogin();
    expect(await signupLoginPage.verifyLoginToYourAccountVisible()).toBeTruthy();

    await signupLoginPage.fillLoginForm(incorrectEmail, incorrectPassword);
    await signupLoginPage.clickLoginButton();

    const errorMessage = await signupLoginPage.getErrorMessage();
    expect(errorMessage).toContain('Your email or password is incorrect!');
  });
});