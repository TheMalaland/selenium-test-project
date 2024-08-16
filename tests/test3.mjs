import { Builder, By } from 'selenium-webdriver';
import { expect } from 'chai';
import { describe, it, before, after } from 'mocha';
import 'mocha-allure-reporter';

const testUrl = 'https://the-internet.herokuapp.com/';



describe('More Advanced Tests for the-internet.herokuapp.com', function () {
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function () {
        await driver.quit();
    });

    // 1. Test to verify scrolling to an element
    it('should scroll to a specific element', async function () {
        await driver.get('https://the-internet.herokuapp.com/large');
        const largeContent = await driver.findElement(By.id('large-table'));
        await driver.executeScript('arguments[0].scrollIntoView();', largeContent);
        const isDisplayed = await largeContent.isDisplayed();
        expect(isDisplayed).to.be.true;
    });

    // 2. Test to simulate browser back navigation
    it('should navigate back after visiting another page', async function () {
        await driver.get('https://the-internet.herokuapp.com');
        await driver.findElement(By.css('a[href="/abtest"]')).click();
        await driver.navigate().back();
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.equal('https://the-internet.herokuapp.com/');
    });

    // 3. Test to handle network throttling (emulated slow network)
    it('should simulate network throttling', async function () {
        await driver.get('https://the-internet.herokuapp.com/slow');
        const text = await driver.wait(until.elementLocated(By.tagName('h3')), 10000).getText();
        expect(text).to.equal('Slow Resources');
    });

    // 4. Test to validate a broken image
    it('should detect a broken image', async function () {
        await driver.get('https://the-internet.herokuapp.com/broken_images');
        const images = await driver.findElements(By.tagName('img'));
        let brokenImages = 0;
        for (const img of images) {
            const isLoaded = await driver.executeScript('return arguments[0].complete && arguments[0].naturalWidth !== 0', img);
            if (!isLoaded) {
                brokenImages++;
            }
        }
        expect(brokenImages).to.be.greaterThan(0);
    });

    // 5. Test to validate responsive design behavior
    it('should test responsive design', async function () {
        await driver.manage().window().setRect({ width: 400, height: 800 });
        await driver.get('https://the-internet.herokuapp.com/');
        const menu = await driver.findElement(By.id('menu'));
        expect(await menu.isDisplayed()).to.be.true;
    });

    // 6. Test to verify alert dismissal
    it('should dismiss a JavaScript alert', async function () {
        await driver.get('https://the-internet.herokuapp.com/javascript_alerts');
        await driver.findElement(By.css('button[onclick="jsConfirm()"]')).click();
        await driver.switchTo().alert().dismiss();
        const resultText = await driver.findElement(By.id('result')).getText();
        expect(resultText).to.equal('You clicked: Cancel');
    });

    // 7. Test to handle multiple windows and close them
    it('should handle and close multiple windows', async function () {
        await driver.get('https://the-internet.herokuapp.com/windows');
        await driver.findElement(By.css('a[href="/windows/new"]')).click();
        const handles = await driver.getAllWindowHandles();
        for (const handle of handles) {
            await driver.switchTo().window(handle);
            await driver.close();
        }
    });

    // 8. Test to interact with checkboxes dynamically
    it('should verify checkboxes are checked or unchecked dynamically', async function () {
        await driver.get('https://the-internet.herokuapp.com/checkboxes');
        const checkboxes = await driver.findElements(By.css('input[type="checkbox"]'));
        for (let checkbox of checkboxes) {
            const isChecked = await checkbox.isSelected();
            if (!isChecked) {
                await checkbox.click();
                expect(await checkbox.isSelected()).to.be.true;
            }
        }
    });

    // 9. Test to handle dynamic controls (enable/disable)
    it('should handle dynamic enable and disable controls', async function () {
        await driver.get('https://the-internet.herokuapp.com/dynamic_controls');
        const button = await driver.findElement(By.css('button[onclick="swapInput()"]'));
        await button.click();
        await driver.wait(until.elementIsEnabled(await driver.findElement(By.css('input[type="text"]'))), 5000);
    });

    // 10. Test to validate a secure page (HTTPS)
    it('should validate secure HTTPS page', async function () {
        await driver.get('https://the-internet.herokuapp.com/secure');
        const pageUrl = await driver.getCurrentUrl();
        expect(pageUrl.startsWith('https')).to.be.true;
    });

    // 11. Test to interact with floating menu on scroll
    it('should interact with floating menu', async function () {
        await driver.get('https://the-internet.herokuapp.com/floating_menu');
        await driver.executeScript('window.scrollBy(0, 1000);');
        const menu = await driver.findElement(By.id('menu'));
        expect(await menu.isDisplayed()).to.be.true;
    });

    // 12. Test to interact with shadow DOM elements
    it('should interact with shadow DOM', async function () {
        await driver.get('https://the-internet.herokuapp.com/shadowdom');
        const shadowHost = await driver.findElement(By.css('#shadow-host'));
        const shadowRoot = await driver.executeScript('return arguments[0].shadowRoot', shadowHost);
        const shadowContent = await shadowRoot.findElement(By.css('span'));
        expect(await shadowContent.getText()).to.equal('Let\'s have some different text!');
    });

    // 13. Test to handle large file download
    it('should simulate file download', async function () {
        await driver.get('https://the-internet.herokuapp.com/download');
        const fileLink = await driver.findElement(By.css('a[href="/download/some-file.txt"]'));
        const fileUrl = await fileLink.getAttribute('href');
        expect(fileUrl).to.contain('some-file.txt');
    });

    // 14. Test to validate the behavior of a redirect
    it('should handle a redirect to another URL', async function () {
        await driver.get('https://the-internet.herokuapp.com/redirector');
        await driver.findElement(By.css('a[href="redirect"]')).click();
        await driver.wait(until.urlContains('status_codes'), 5000);
        const headerText = await driver.findElement(By.tagName('h3')).getText();
        expect(headerText).to.equal('Status Codes');
    });

    // 15. Test to interact with elements inside a modal
    it('should interact with modal elements', async function () {
        await driver.get('https://the-internet.herokuapp.com/entry_ad');
        await driver.wait(until.elementLocated(By.css('.modal')), 5000);
        const modalTitle = await driver.findElement(By.css('.modal-title')).getText();
        expect(modalTitle).to.equal('This is a modal window');
        await driver.findElement(By.css('.modal-footer .close')).click();
    });
});