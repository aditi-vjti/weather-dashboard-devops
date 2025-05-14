const { Builder, By, until } = require('selenium-webdriver');

async function testWeatherApp() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:3000');

        // Wait until input box is there
        await driver.wait(until.elementLocated(By.id('city')), 10000);

        // Find input and type
        let searchInput = await driver.findElement(By.id('city'));
        await searchInput.sendKeys('Mumbai');

        // Find button and click
        let searchButton = await driver.findElement(By.id('searchBtn'));
        await searchButton.click();

        // 🌟 Wait until the 'weatherData' element is located
        await driver.wait(until.elementLocated(By.id('weatherData')), 10000);

        // 🌟 Now wait until weatherData actually has some text
        await driver.wait(async function() {
            let weatherInfo = await driver.findElement(By.id('weatherData'));
            let text = await weatherInfo.getText();
            return text.trim().length > 0;  // non-empty
        }, 10000); // wait max 10 seconds

        // Now grab the weather info
        let weatherInfo = await driver.findElement(By.id('weatherData'));
        let text = await weatherInfo.getText();
        console.log('Weather Info:', text);

    } catch (err) {
        console.log('Test Failed:', err);
    } finally {
        await driver.quit();
    }
}

testWeatherApp();
