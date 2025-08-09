const BasePage = require('./BasePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.signupLoginLink = 'a[href="/login"]';
    this.loggedInText = '.navbar-nav li:has(a[href="/logout"])';
    this.deleteAccountLink = 'a[href="/delete_account"]';
    this.continueButton = 'a[data-qa="continue-button"]';
    this.contactUsLink = 'a[href="/contact_us"]';
    this.testCasesLink = 'a[href="/test_cases"]';
    this.productsLink = 'a[href="/products"]';
    this.subscriptionInput = '#susbscribe_email';
    this.subscribeButton = '#subscribe';
    this.subscriptionSuccessMessage = '#success-subscribe';
    this.logoutLink = 'a[href="/logout"]';
  }

  async goto() {
    await super.goto('/');
    await this.waitForLoadState();
  }

  async clickSignupLogin() {
    await this.click(this.signupLoginLink);
  }

  async clickContactUs() {
    await this.click(this.contactUsLink);
  }

  async clickTestCases() {
    await this.click(this.testCasesLink);
  }

  async clickProducts() {
    await this.click(this.productsLink);
  }

  async clickLogout() {
    await this.click(this.logoutLink);
    await this.waitForLoadState();
  }

  async clickDeleteAccount() {
    await this.click(this.deleteAccountLink);
  }

  async clickContinueAfterDelete() {
    await this.click(this.continueButton);
  }

  async isUserLoggedIn() {
    return await this.isVisible(this.loggedInText);
  }

  async subscribeToNewsletter(email) {
    await this.scrollToElement(this.subscriptionInput);
    await this.fill(this.subscriptionInput, email);
    await this.click(this.subscribeButton);
  }

  async getSubscriptionSuccessMessage() {
    await this.waitForSelector(this.subscriptionSuccessMessage);
    return await this.getText(this.subscriptionSuccessMessage);
  }

  async verifyHomePageVisible() {
    const title = await this.getTitle();
    return title.includes('Automation Exercise');
  }
}

module.exports = HomePage;