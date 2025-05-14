const { Builder, By, until } = require('selenium-webdriver');

async function testWeatherAppFail() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:3000');

        // Intentionally looking for a WRONG ID
        await driver.wait(until.elementLocated(By.id('wrongCityId')), 5000);

        let fakeInput = await driver.findElement(By.id('wrongCityId'));
        await fakeInput.sendKeys('Delhi');

    } catch (err) {
        console.log('❌ Test Failed Intentionally:', err.message);
    } finally {
        await driver.quit();
    }
}

testWeatherAppFail();
