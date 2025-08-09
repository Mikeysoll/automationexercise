const BasePage = require('./BasePage');

class ContactUsPage extends BasePage {
  constructor(page) {
    super(page);
    this.pageTitle = 'h2:has-text("Get In Touch")';
    this.nameInput = 'input[name="name"]';
    this.emailInput = 'input[name="email"]';  
    this.subjectInput = 'input[name="subject"]';
    this.messageInput = 'textarea[name="message"]';
    this.fileUpload = 'input[name="upload_file"]';
    this.submitButton = '.submit_form';
    this.successMessage = '.alert-success';
    this.homeButton = '.btn.btn-success';
  }

  async fillContactForm(contactData, filePath = null) {
    await this.fill(this.nameInput, contactData.name);
    await this.fill(this.emailInput, contactData.email);
    await this.fill(this.subjectInput, contactData.subject);
    await this.fill(this.messageInput, contactData.message);
    
    if (filePath) {
      await this.page.setInputFiles(this.fileUpload, filePath);
    }
  }

  async clickSubmitButton() {
    this.page.on('dialog', dialog => dialog.accept());
    await this.click(this.submitButton);
  }

  async clickHomeButton() {
    await this.click(this.homeButton);
  }

  async getPageTitle() {
    return await this.getText(this.pageTitle);
  }

  async getSuccessMessage() {
    await this.waitForSelector(this.successMessage);
    return await this.getText(this.successMessage);
  }

  async verifyGetInTouchVisible() {
    return await this.isVisible(this.pageTitle);
  }
}

module.exports = ContactUsPage;