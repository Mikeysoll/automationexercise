const { test, expect } = require('@playwright/test');
const { test: userTest } = require('../fixtures/userFixtures');
const HomePage = require('../pages/HomePage');
const SignupLoginPage = require('../pages/SignupLoginPage');
const DataGenerator = require('../utils/dataGenerator');

test.describe('Тест-кейс 1: Регистрация нового пользователя', () => {
  test('успешная регистрация пользователя с валидными данными', async ({ page }) => {
    const userData = DataGenerator.generateUserData();
    const homePage = new HomePage(page);
    const signupLoginPage = new SignupLoginPage(page);

    await homePage.goto();
    expect(await homePage.verifyHomePageVisible()).toBeTruthy();

    await homePage.clickSignupLogin();
    expect(await signupLoginPage.verifyNewUserSignupVisible()).toBeTruthy();

    await signupLoginPage.fillSignupForm(userData.firstName, userData.email);
    await signupLoginPage.clickSignupButton();

    await signupLoginPage.fillRegistrationForm(userData);
    await signupLoginPage.clickCreateAccountButton();

    const accountCreatedText = await signupLoginPage.getAccountCreatedText();
    expect(accountCreatedText.toUpperCase()).toContain('ACCOUNT CREATED!');

    await signupLoginPage.clickContinueButton();
    expect(await homePage.isUserLoggedIn()).toBeTruthy();

    await homePage.clickDeleteAccount();
    await homePage.clickContinueAfterDelete();
  });
});