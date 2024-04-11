const {By, Builder, Browser} = require('selenium-webdriver');

async function findKeyword(driver, keyword) {
    console.log((await driver.getPageSource()).toLowerCase()); 
    return (await driver.getPageSource()).toLowerCase().includes(keyword.toLowerCase());// comment out later to achieve Presence Time: 0
    //commented out above line of code to obtain output Presence Time: 0

    //return false; //return false is used to simulate keyword student not found on my React Website to obtain Presence Time: 0
}

async function main() {
    // Initialize browser
    let driver = await new Builder().forBrowser(Browser.CHROME).build();

    try {
        // Navigate to your website
        await driver.get('http://localhost:3000/');
        let rewardTime = 10;
        let totalRewardTime = 0;
        let keyword = 'student';

        if (await findKeyword(driver, keyword)) {
            totalRewardTime += rewardTime;
            await driver.sleep(rewardTime * 1000); //Multiply by 1000 milliseconds since 1 second is equivalent to 1000 miliseconds
        } else {
            console.log('not found');
        }

        console.log('Presence Time:', totalRewardTime);
    } finally {
        await driver.quit();
    }
}

main().catch(console.error);