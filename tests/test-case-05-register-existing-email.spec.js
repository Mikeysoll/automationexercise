const { test, expect } = require('@playwright/test');
const { test: userTest } = require('../fixtures/userFixtures');
const HomePage = require('../pages/HomePage');
const SignupLoginPage = require('../pages/SignupLoginPage');
const DataGenerator = require('../utils/dataGenerator');

test.describe('Тест-кейс 5: Регистрация с существующим email', () => {
  userTest('отображение ошибки при попытке регистрации с уже зарегистрированным email', async ({ page, registeredUser }) => {
    const { userData } = registeredUser;
    const homePage = new HomePage(page);
    const signupLoginPage = new SignupLoginPage(page);
    const newUserData = DataGenerator.generateUserData();

    await homePage.goto();
    expect(await homePage.verifyHomePageVisible()).toBeTruthy();

    await homePage.clickLogout();
    await homePage.clickSignupLogin();
    expect(await signupLoginPage.verifyNewUserSignupVisible()).toBeTruthy();

    await signupLoginPage.fillSignupForm(newUserData.firstName, userData.email);
    await signupLoginPage.clickSignupButton();

    const errorMessage = await signupLoginPage.getErrorMessage();
    expect(errorMessage).toContain('Email Address already exist!');
  });
});