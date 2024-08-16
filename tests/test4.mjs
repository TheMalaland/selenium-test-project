const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');
const client = require('prom-client');
const express = require('express');

// Configuración de Prometheus y servidor de métricas
const app = express();
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Métrica personalizada para la duración de las pruebas
const testDuration = new client.Histogram({
    name: 'selenium_test_duration_seconds',
    help: 'Duration of Selenium tests in seconds',
    buckets: [0.1, 0.5, 1, 3, 5, 10]
});
register.registerMetric(testDuration);

// Ruta para las métricas de Prometheus
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

app.listen(9090, () => {
    console.log('Metrics server running on http://localhost:9090/metrics');
});

// Código de prueba con Selenium
describe('More Advanced Tests for the-internet.herokuapp.com with Prometheus', function () {
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function () {
        await driver.quit();
    });

    // Test con recolección de métricas
    const prometheusTest = async (testFunc) => {
        const end = testDuration.startTimer();
        await testFunc();
        end();  // Detener el temporizador y registrar la duración
    };

    // 1. Test to verify scrolling to an element
    it('should scroll to a specific element', async function () {
        await prometheusTest(async () => {
            await driver.get('https://the-internet.herokuapp.com/large');
            const largeContent = await driver.findElement(By.id('large-table'));
            await driver.executeScript('arguments[0].scrollIntoView();', largeContent);
            const isDisplayed = await largeContent.isDisplayed();
            expect(isDisplayed).to.be.true;
        });
    });

    // 2. Test to simulate browser back navigation
    it('should navigate back after visiting another page', async function () {
        await prometheusTest(async () => {
            await driver.get('https://the-internet.herokuapp.com');
            await driver.findElement(By.css('a[href="/abtest"]')).click();
            await driver.navigate().back();
            const currentUrl = await driver.getCurrentUrl();
            expect(currentUrl).to.equal('https://the-internet.herokuapp.com/');
        });
    });

    // 3. Test to handle network throttling (emulated slow network)
    it('should simulate network throttling', async function () {
        await prometheusTest(async () => {
            await driver.get('https://the-internet.herokuapp.com/slow');
            const text = await driver.wait(until.elementLocated(By.tagName('h3')), 10000).getText();
            expect(text).to.equal('Slow Resources');
        });
    });

    // 4. Test to validate a broken image
    it('should detect a broken image', async function () {
        await prometheusTest(async () => {
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
    });

    // 5. Test to validate responsive design behavior
    it('should test responsive design', async function () {
        await prometheusTest(async () => {
            await driver.manage().window().setRect({ width: 400, height: 800 });
            await driver.get('https://the-internet.herokuapp.com/');
            const menu = await driver.findElement(By.id('menu'));
            expect(await menu.isDisplayed()).to.be.true;
        });
    });

    // Otros tests con recolección de métricas siguen la misma estructura...

    // 6. Test to verify alert dismissal
    it('should dismiss a JavaScript alert', async function () {
        await prometheusTest(async () => {
            await driver.get('https://the-internet.herokuapp.com/javascript_alerts');
            await driver.findElement(By.css('button[onclick="jsConfirm()"]')).click();
            await driver.switchTo().alert().dismiss();
            const resultText = await driver.findElement(By.id('result')).getText();
            expect(resultText).to.equal('You clicked: Cancel');
        });
    });

    // 7. Test to handle multiple windows and close them
    it('should handle and close multiple windows', async function () {
        await prometheusTest(async () => {
            await driver.get('https://the-internet.herokuapp.com/windows');
            await driver.findElement(By.css('a[href="/windows/new"]')).click();
            const handles = await driver.getAllWindowHandles();
            for (const handle of handles) {
                await driver.switchTo().window(handle);
                await driver.close();
            }
        });
    });

    // Continúa con los otros tests...

});

