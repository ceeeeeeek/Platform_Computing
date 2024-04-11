const {By, Builder, Browser} = require('selenium-webdriver');

async function findText(driver, keyword) {
    console.log((await driver.getPageSource()).toLowerCase()); // comment out later
    return (await driver.getPageSource()).toLowerCase().includes(keyword.toLowerCase());
}

async function countTagElem(driver, tagNames) {
    let count = 0;
    for (const tagName of tagNames) {
        const elements = await driver.findElements(By.tagName(tagName));
        count += elements.length;
    }
    return count;
}

async function userAction(action, driver, rewardTime, reqList) {
    let totalRewardTime = 0;
    if (action.toUpperCase() === "KEYWORD") {
        for (const keyword of reqList) {
            if (await findText(driver, keyword)) {
                console.log("found", keyword);
                await driver.sleep(rewardTime * 1000); //Multiply by 1000 milliseconds since 1 second is equivalent to 1000 miliseconds
                totalRewardTime += rewardTime;
            } else {
                console.log("not found");
            }
        }
    } else if (action.toUpperCase() === "IMAGE") {
        const numImages = await countTagElem(driver, reqList);
        totalRewardTime = rewardTime * numImages;
        await driver.sleep(totalRewardTime * 1000); //Multiply by 1000 milliseconds since 1 second is equivalent to 1000 miliseconds
    }
    return totalRewardTime;
}

async function clickLink(driver, href) {
    const links = await driver.findElements(By.tagName("a"));
    if (links.length > 0) {
        await links[0].click();
    }
}

async function main() {
    // Initialize browser
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    try {
        // Navigate to your website
        await driver.get("http://localhost:3000/");
        const rewardTime = 10;
        let totalRewardTime = await userAction("KEYWORD", driver, rewardTime, ["student", "test"]);
        const tagNames = ["img"];
        totalRewardTime += await userAction("IMAGE", driver, rewardTime, tagNames);
        await clickLink(driver);
        console.log("Presence Time", totalRewardTime);
    } finally {
        await driver.quit();
    }
}

//main();
main().catch(console.error);