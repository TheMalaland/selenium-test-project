import { Builder, By } from 'selenium-webdriver';
import { expect } from 'chai';
import { describe, it, before, after } from 'mocha';
import 'mocha-allure-reporter';

const testUrl = 'https://the-internet.herokuapp.com/';

describe('Selenium Tests3 - test2', function () {
  this.timeout(30000); // Establecer el tiempo de espera

  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();
  });

  after(async function () {
    await driver.quit();
  });

  it('should have a title containing "The Internet"', async function () {
    await driver.get(testUrl);
    let title = await driver.getTitle();
    expect(title).to.include('The Internet');
  });

  it('should find "A/B Testing" link', async function () {
    await driver.get(testUrl);
    let link = await driver.findElement(By.linkText('A/B Testing'));
    expect(link).to.not.be.null;
  });

  it('should navigate to "A/B Testing" page', async function () {
    await driver.get(testUrl);
    await driver.findElement(By.linkText('A/B Testing')).click();
    let header = await driver.findElement(By.tagName('h3')).getText();
    expect(header).to.equal('A/B Test Control');
  });

  it('should verify "Forgot Password" page title', async function () {
    await driver.get(`${testUrl}forgot_password`);
    let title = await driver.getTitle();
    expect(title).to.include('Forgot Password');
  });

  it('should login with valid credentials', async function () {
    await driver.get(`${testUrl}login`);
    await driver.findElement(By.id('username')).sendKeys('tomsmith');
    await driver.findElement(By.id('password')).sendKeys('SuperSecretPassword!');
    await driver.findElement(By.css('button[type="submit"]')).click();
    let message = await driver.findElement(By.id('flash')).getText();
    expect(message).to.include('You logged into a secure area!');
  });

  it('should click "Click for JS Alert" and verify alert text', async function () {
    await driver.get(`${testUrl}javascript_alerts`);
    let button = await driver.findElement(By.xpath("//button[text()='Click for JS Alert']"));
    await button.click();
    let alert = await driver.switchTo().alert();
    let alertText = await alert.getText();
    expect(alertText).to.equal('I am a JS Alert');
    await alert.accept();
  });

  it('should measure page load time', async function () {
    const startTime = new Date().getTime();
    await driver.get(testUrl);
    const endTime = new Date().getTime();
    const loadTime = endTime - startTime;
    console.log(`Page load time: ${loadTime} ms`);
    expect(loadTime).to.be.below(2000); // Verificar que el tiempo de carga sea inferior a 2 segundos
  });

  // Agregar más pruebas según las necesidades
});