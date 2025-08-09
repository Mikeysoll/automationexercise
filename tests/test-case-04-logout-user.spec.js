const { test, expect } = require('@playwright/test');
const { test: userTest } = require('../fixtures/userFixtures');
const HomePage = require('../pages/HomePage');
const SignupLoginPage = require('../pages/SignupLoginPage');

test.describe('Тест-кейс 4: Выход из системы', () => {
  userTest('успешный выход пользователя из аккаунта', async ({ page, registeredUser }) => {
    const { userData } = registeredUser;
    const homePage = new HomePage(page);
    const signupLoginPage = new SignupLoginPage(page);

    await homePage.goto();
    expect(await homePage.verifyHomePageVisible()).toBeTruthy();

    await homePage.clickLogout();
    await homePage.clickSignupLogin();
    expect(await signupLoginPage.verifyLoginToYourAccountVisible()).toBeTruthy();

    await signupLoginPage.fillLoginForm(userData.email, userData.password);
    await signupLoginPage.clickLoginButton();
    expect(await homePage.isUserLoggedIn()).toBeTruthy();

    await homePage.clickLogout();
    expect(await signupLoginPage.verifyLoginToYourAccountVisible()).toBeTruthy();
  });
});