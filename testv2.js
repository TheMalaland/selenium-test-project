const {Builder, By, until} = require('selenium-webdriver');

(async function runTests() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Test 1: Verificar el Título de la Página Principal
    await testTitle(driver);

    // Test 2: Verificar el Texto de un Elemento en la Página
    await testElementText(driver);

    // Test 3: Interactuar con el Link "A/B Testing"
    await testClickLink(driver);

    // Test 4: Interactuar con el Formulario de Autenticación
    await testLoginForm(driver);

    // Test 5: Interactuar con el Dropdown
    await testDropdown(driver);

  } finally {
    await driver.quit();  // Cerrar el navegador cuando todas las pruebas hayan terminado
  }
})();

// Prueba 1: Verificar el Título de la Página Principal
async function testTitle(driver) {
  await driver.get('https://the-internet.herokuapp.com/');
  await driver.wait(until.titleContains('The Internet'), 10000);
  console.log("Test Case 1 Passed: Title contains 'The Internet'");
}

// Prueba 2: Verificar el Texto de un Elemento en la Página
async function testElementText(driver) {
  let heading = await driver.findElement(By.css('h1')).getText();
  if (heading === 'Welcome to the-internet') {
    console.log("Test Case 2 Passed: Correct heading text");
  } else {
    console.log("Test Case 2 Failed");
  }
}

// Prueba 3: Interactuar con el Link "A/B Testing"
async function testClickLink(driver) {
  await driver.get('https://the-internet.herokuapp.com/');
  await driver.findElement(By.linkText('A/B Testing')).click();
  await driver.wait(until.urlContains('/abtest'), 10000);
  console.log("Test Case 3 Passed: Correct URL after clicking A/B Testing");
}

// Prueba 4: Interactuar con el Formulario de Autenticación
async function testLoginForm(driver) {
  await driver.get('https://the-internet.herokuapp.com/login');
  
  await driver.findElement(By.id('username')).sendKeys('invalid_user');
  await driver.findElement(By.id('password')).sendKeys('invalid_password');
  await driver.findElement(By.css('button[type="submit"]')).click();
  
  let errorMessage = await driver.findElement(By.css('.flash.error')).getText();
  if (errorMessage.includes('Your username is invalid!')) {
    console.log("Test Case 4 Passed: Correct error message for invalid login");
  } else {
    console.log("Test Case 4 Failed");
  }
}

// Prueba 5: Interactuar con el Dropdown
async function testDropdown(driver) {
  await driver.get('https://the-internet.herokuapp.com/dropdown');
  
  let dropdown = await driver.findElement(By.id('dropdown'));
  await dropdown.findElement(By.css('option[value="1"]')).click();

  let selectedOption = await dropdown.getAttribute('value');
  if (selectedOption === '1') {
    console.log("Test Case 5 Passed: Dropdown option 1 selected");
  } else {
    console.log("Test Case 5 Failed");
  }
}