const BasePage = require('./BasePage');

class SignupLoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.signupNameInput = 'input[data-qa="signup-name"]';
    this.signupEmailInput = 'input[data-qa="signup-email"]';
    this.signupButton = 'button[data-qa="signup-button"]';
    this.loginEmailInput = 'input[data-qa="login-email"]';
    this.loginPasswordInput = 'input[data-qa="login-password"]';
    this.loginButton = 'button[data-qa="login-button"]';
    this.signupText = '.signup-form h2';
    this.loginText = '.login-form h2';
    this.passwordInput = 'input[data-qa="password"]';
    this.firstNameInput = 'input[data-qa="first_name"]';
    this.lastNameInput = 'input[data-qa="last_name"]';
    this.companyInput = 'input[data-qa="company"]';
    this.addressInput = 'input[data-qa="address"]';
    this.address2Input = 'input[data-qa="address2"]';
    this.countrySelect = 'select[data-qa="country"]';
    this.stateInput = 'input[data-qa="state"]';
    this.cityInput = 'input[data-qa="city"]';
    this.zipcodeInput = 'input[data-qa="zipcode"]';
    this.mobileNumberInput = 'input[data-qa="mobile_number"]';
    this.createAccountButton = 'button[data-qa="create-account"]';
    this.accountCreatedText = 'h2[data-qa="account-created"]';
    this.continueButton = 'a[data-qa="continue-button"]';
    this.titleRadio1 = '#id_gender1';
    this.titleRadio2 = '#id_gender2';
    this.daySelect = 'select[data-qa="days"]';
    this.monthSelect = 'select[data-qa="months"]';
    this.yearSelect = 'select[data-qa="years"]';
    this.newsletterCheckbox = '#newsletter';
    this.offersCheckbox = '#optin';
    this.errorMessage = 'form p';
  }

  async fillSignupForm(name, email) {
    await this.fill(this.signupNameInput, name);
    await this.fill(this.signupEmailInput, email);
  }

  async clickSignupButton() {
    await this.click(this.signupButton);
  }

  async fillLoginForm(email, password) {
    await this.fill(this.loginEmailInput, email);
    await this.fill(this.loginPasswordInput, password);
  }

  async clickLoginButton() {
    await this.click(this.loginButton);
    await this.waitForLoadState();
  }

  async fillRegistrationForm(userData) {
    await this.click(this.titleRadio1);
    await this.fill(this.passwordInput, userData.password);
    await this.page.selectOption(this.daySelect, '15');
    await this.page.selectOption(this.monthSelect, 'January');
    await this.page.selectOption(this.yearSelect, '1990');
    await this.click(this.newsletterCheckbox);
    await this.click(this.offersCheckbox);
    await this.fill(this.firstNameInput, userData.firstName);
    await this.fill(this.lastNameInput, userData.lastName);
    await this.fill(this.companyInput, userData.company);
    await this.fill(this.addressInput, userData.address);
    await this.fill(this.address2Input, userData.address2);
    await this.page.selectOption(this.countrySelect, userData.country);
    await this.fill(this.stateInput, userData.state);
    await this.fill(this.cityInput, userData.city);
    await this.fill(this.zipcodeInput, userData.zipcode);
    await this.fill(this.mobileNumberInput, userData.mobileNumber);
  }

  async clickCreateAccountButton() {
    await this.click(this.createAccountButton);
  }

  async clickContinueButton() {
    await this.click(this.continueButton);
  }

  async getAccountCreatedText() {
    await this.waitForSelector(this.accountCreatedText);
    return await this.getText(this.accountCreatedText);
  }

  async getSignupText() {
    return await this.getText(this.signupText);
  }

  async getLoginText() {
    return await this.getText(this.loginText);
  }

  async getErrorMessage() {
    await this.waitForSelector(this.errorMessage);
    return await this.getText(this.errorMessage);
  }

  async verifyNewUserSignupVisible() {
    const text = await this.getSignupText();
    return text.includes('New User Signup!');
  }

  async verifyLoginToYourAccountVisible() {
    const text = await this.getLoginText();
    return text.includes('Login to your account');
  }
}

module.exports = SignupLoginPage;