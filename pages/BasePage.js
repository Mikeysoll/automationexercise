class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(url = '/') {
    await this.page.goto(url);
    await this.handleCookieConsent();
  }

  async handleCookieConsent() {
    try {
      await this.page.waitForSelector('.fc-consent-root', { timeout: 5000 });
      const consentButton = this.page.locator('.fc-button.fc-cta-consent.fc-primary-button').first();
      if (await consentButton.isVisible()) {
        await consentButton.click();
        await this.page.waitForTimeout(1000);
      }
    } catch (error) {
      try {
        const altConsentButton = this.page.locator('button:has-text("CONSENT")').first();
        if (await altConsentButton.isVisible()) {
          await altConsentButton.click();
          await this.page.waitForTimeout(1000);
        }
      } catch (error2) {
        console.log('No cookie consent dialog found or already handled');
      }
    }
  }

  async waitForSelector(selector, options = {}) {
    return await this.page.waitForSelector(selector, options);
  }

  async click(selector, options = {}) {
    await this.page.click(selector, { timeout: 15000, ...options });
  }

  async fill(selector, text) {
    await this.page.fill(selector, text);
  }

  async getText(selector) {
    return await this.page.textContent(selector);
  }

  async isVisible(selector) {
    return await this.page.isVisible(selector);
  }

  async scrollToElement(selector) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  async getTitle() {
    return await this.page.title();
  }

  async getUrl() {
    return this.page.url();
  }

  async waitForLoadState(state = 'domcontentloaded') {
    await this.page.waitForLoadState(state);
  }
}

module.exports = BasePage;