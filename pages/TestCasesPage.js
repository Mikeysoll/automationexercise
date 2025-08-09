const BasePage = require('./BasePage');

class TestCasesPage extends BasePage {
  constructor(page) {
    super(page);
    this.pageTitle = 'h1';
    this.testCasesList = '.test-cases-list';
  }

  async getPageTitle() {
    await this.waitForSelector(this.pageTitle);
    return await this.getText(this.pageTitle);
  }

  async verifyTestCasesPageVisible() {
    const title = await this.getPageTitle();
    return title.includes('TEST CASES');
  }

  async verifyUserNavigatedToTestCasesPage() {
    const url = await this.getUrl();
    return url.includes('/test_cases');
  }
}

module.exports = TestCasesPage;