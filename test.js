require('dotenv').config();
const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser(process.env.BROWSER).build();
  try {
    // Navigate to the URL from environment variables
    await driver.get(process.env.TEST_URL);
    
    // Wait until the page title contains "The Internet"
    await driver.wait(until.titleContains('The Internet'), 10000);
    
    console.log("Test Case Passed: Title contains 'The Internet'");
  } finally {
    await driver.quit();
  }
})();