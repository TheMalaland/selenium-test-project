import { Builder, By } from 'selenium-webdriver';
import { expect } from 'chai';
import { describe, it, before, after } from 'mocha';

const testUrl = 'https://the-internet.herokuapp.com/';

describe('Selenium Tests', function () {
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

  it('should find "Add/Remove Elements" link', async function () {
    await driver.get(testUrl);
    let link = await driver.findElement(By.linkText('Add/Remove Elements'));
    expect(link).to.not.be.null;
  });

  it('should navigate to "Add/Remove Elements" page', async function () {
    await driver.get(testUrl);
    await driver.findElement(By.linkText('Add/Remove Elements')).click();
    let header = await driver.findElement(By.tagName('h3')).getText();
    expect(header).to.equal('Add/Remove Elements');
  });

  it('should verify "Forgot Password" page title', async function () {
    await driver.get(`${testUrl}forgot_password`);
    let title = await driver.getTitle();
    expect(title).to.include('Forgot Password');
  });

  it('should find "Form Authentication" link', async function () {
    await driver.get(testUrl);
    let link = await driver.findElement(By.linkText('Form Authentication'));
    expect(link).to.not.be.null;
  });

  it('should navigate to "Form Authentication" page', async function () {
    await driver.get(testUrl);
    await driver.findElement(By.linkText('Form Authentication')).click();
    let header = await driver.findElement(By.tagName('h2')).getText();
    expect(header).to.equal('Login Page');
  });

  it('should find form on "Form Authentication" page', async function () {
    await driver.get(`${testUrl}login`);
    let form = await driver.findElement(By.id('login'));
    expect(form).to.not.be.null;
  });

  it('should find "Horizontal Slider" link', async function () {
    await driver.get(testUrl);
    let link = await driver.findElement(By.linkText('Horizontal Slider'));
    expect(link).to.not.be.null;
  });

  it('should navigate to "Horizontal Slider" page', async function () {
    await driver.get(testUrl);
    await driver.findElement(By.linkText('Horizontal Slider')).click();
    let header = await driver.findElement(By.tagName('h3')).getText();
    expect(header).to.equal('Horizontal Slider');
  });

  it('should find slider on "Horizontal Slider" page', async function () {
    await driver.get(`${testUrl}horizontal_slider`);
    let slider = await driver.findElement(By.className('range'));
    expect(slider).to.not.be.null;
  });

  it('should find "JavaScript Alerts" link', async function () {
    await driver.get(testUrl);
    let link = await driver.findElement(By.linkText('JavaScript Alerts'));
    expect(link).to.not.be.null;
  });

  it('should navigate to "JavaScript Alerts" page', async function () {
    await driver.get(testUrl);
    await driver.findElement(By.linkText('JavaScript Alerts')).click();
    let header = await driver.findElement(By.tagName('h3')).getText();
    expect(header).to.equal('JavaScript Alerts');
  });

  it('should find "Click for JS Alert" button', async function () {
    await driver.get(`${testUrl}javascript_alerts`);
    let button = await driver.findElement(By.xpath("//button[text()='Click for JS Alert']"));
    expect(button).to.not.be.null;
  });
});
