const BasePage = require('./BasePage');

class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    this.pageTitle = 'text=ALL PRODUCTS';
    this.searchInput = '#search_product';
    this.searchButton = '#submit_search';
    this.productsList = '.col-sm-4';
    this.firstProductViewLink = 'a[href*="/product_details/"]';
    this.searchedProductsTitle = 'text=SEARCHED PRODUCTS';
  }

  async getPageTitle() {
    await this.waitForSelector(this.pageTitle);
    return await this.getText(this.pageTitle);
  }

  async searchForProduct(searchTerm) {
    await this.fill(this.searchInput, searchTerm);
    await this.click(this.searchButton);
  }

  async clickFirstProductView() {
    await this.click(this.firstProductViewLink);
  }

  async getSearchedProductsTitle() {
    await this.waitForSelector(this.searchedProductsTitle);
    return await this.getText(this.searchedProductsTitle);
  }

  async verifyProductsPageVisible() {
    return await this.isVisible(this.pageTitle);
  }

  async verifyUserNavigatedToProductsPage() {
    const url = await this.getUrl();
    return url.includes('/products');
  }

  async verifySearchedProductsVisible() {
    return await this.isVisible(this.searchedProductsTitle);
  }

  async getProductsCount() {
    const products = await this.page.locator(this.productsList);
    return await products.count();
  }
}

module.exports = ProductsPage;