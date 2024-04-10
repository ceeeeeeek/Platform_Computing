const {By, Builder, Browser} = require('selenium-webdriver');

async function findKeyword(driver, keyword) {
    console.log((await driver.getPageSource()).toLowerCase()); // comment out later
    return (await driver.getPageSource()).toLowerCase().includes(keyword.toLowerCase());
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
            await driver.sleep(rewardTime * 1000);
        } else {
            console.log('not found');
        }

        console.log('Presence Time:', totalRewardTime);
    } finally {
        await driver.quit();
    }
}

//main();
main().catch(console.error);