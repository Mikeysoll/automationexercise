const { faker } = require('@faker-js/faker');

class DataGenerator {
  static generateUserData() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    
    return {
      firstName,
      lastName,
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      password: faker.internet.password({ length: 12, memorable: true }),
      company: faker.company.name(),
      address: faker.location.streetAddress(),
      address2: faker.location.secondaryAddress(),
      country: 'India',
      state: faker.location.state(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode(),
      mobileNumber: faker.phone.number('##########')
    };
  }

  static generateContactData() {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      subject: faker.lorem.sentence(),
      message: faker.lorem.paragraphs(2)
    };
  }

  static generateProductSearchTerm() {
    const products = ['shirt', 'dress', 'jeans', 'top', 'trouser', 'saree'];
    return faker.helpers.arrayElement(products);
  }

  static generateRandomString(length = 10) {
    return faker.string.alphanumeric(length);
  }

  static generateEmail() {
    return faker.internet.email().toLowerCase();
  }
}

module.exports = DataGenerator;