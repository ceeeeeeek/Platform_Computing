const {By, Builder, Browser} = require('selenium-webdriver');

async function countElem(driver, tagName) {
    const elements = await driver.findElements(By.tagName(tagName));
    return elements.length;
}

async function main() {
    // Initialize browser
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    // Navigate to your website
    await driver.get("http://localhost:3000/");
    const rewardTime = 10;
    let totalRewardTime = 0;
    const tags = ["img"];
    for (const tag of tags) {
        const numImages = await countElem(driver, tag);
        totalRewardTime += rewardTime * numImages;
        await driver.sleep(totalRewardTime);
    }
    await driver.quit();
    console.log("Presence Time:", totalRewardTime);
}

//main();
main().catch(console.error);
