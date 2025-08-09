const BasePage = require('./BasePage');

class ProductDetailPage extends BasePage {
  constructor(page) {
    super(page);
    this.productName = '.product-information h2';
    this.productCategory = '.product-information p:has-text("Category:")';
    this.productPrice = '.product-information span span';
    this.productAvailability = '.product-information p:has-text("Availability:")';
    this.productCondition = '.product-information p:has-text("Condition:")';
    this.productBrand = '.product-information p:has-text("Brand:")';
  }

  async getProductName() {
    await this.waitForSelector(this.productName);
    return await this.getText(this.productName);
  }

  async getProductCategory() {
    await this.waitForSelector(this.productCategory);
    return await this.getText(this.productCategory);
  }

  async getProductPrice() {
    await this.waitForSelector(this.productPrice);
    return await this.getText(this.productPrice);
  }

  async getProductAvailability() {
    return await this.getText(this.productAvailability);
  }

  async getProductCondition() {
    return await this.getText(this.productCondition);
  }

  async getProductBrand() {
    return await this.getText(this.productBrand);
  }

  async verifyProductDetailsVisible() {
    const name = await this.isVisible(this.productName);
    const category = await this.isVisible(this.productCategory);
    const price = await this.isVisible(this.productPrice);
    const availability = await this.isVisible(this.productAvailability);
    const condition = await this.isVisible(this.productCondition);
    const brand = await this.isVisible(this.productBrand);
    
    return name && category && price && availability && condition && brand;
  }
}

module.exports = ProductDetailPage;