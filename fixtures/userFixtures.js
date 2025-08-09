const { test: base } = require('@playwright/test');
const DataGenerator = require('../utils/dataGenerator');
const HomePage = require('../pages/HomePage');
const SignupLoginPage = require('../pages/SignupLoginPage');

const test = base.extend({
  registeredUser: async ({ page }, use) => {
    const userData = DataGenerator.generateUserData();
    const homePage = new HomePage(page);
    const signupLoginPage = new SignupLoginPage(page);
    
    try {
      await homePage.goto();
      await page.waitForTimeout(3000);
      await homePage.clickSignupLogin();
      await page.waitForTimeout(2000);
      await signupLoginPage.fillSignupForm(userData.firstName, userData.email);
      await signupLoginPage.clickSignupButton();
      await page.waitForTimeout(3000);
      await signupLoginPage.fillRegistrationForm(userData);
      await signupLoginPage.clickCreateAccountButton();
      await page.waitForTimeout(3000);
    } catch (error) {
      console.log('Registration setup failed:', error.message);
      throw error;
    }
    
    await use({ userData, homePage, signupLoginPage });
    
    try {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);
      if (await page.isVisible('a[href="/delete_account"]', { timeout: 8000 })) {
        await page.click('a[href="/delete_account"]');
        await page.waitForTimeout(2000);
        if (await page.isVisible('a[data-qa="continue-button"]', { timeout: 8000 })) {
          await page.click('a[data-qa="continue-button"]');
        }
      }
    } catch (error) {
      console.log('Cleanup failed:', error.message);
    }
  },

  userData: async ({}, use) => {
    const userData = DataGenerator.generateUserData();
    await use(userData);
  },

  contactData: async ({}, use) => {
    const contactData = DataGenerator.generateContactData();
    await use(contactData);
  }
});

module.exports = { test };