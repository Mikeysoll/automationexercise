const { test, expect } = require('@playwright/test');
const { test: userTest } = require('../fixtures/userFixtures');
const HomePage = require('../pages/HomePage');
const SignupLoginPage = require('../pages/SignupLoginPage');

test.describe('Тест-кейс 2: Авторизация с корректными данными', () => {
  userTest('успешная авторизация пользователя с правильным email и паролем', async ({ page, registeredUser }) => {
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
  });
});