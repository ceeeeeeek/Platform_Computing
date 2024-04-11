const {By, Builder, Browser} = require('selenium-webdriver');
const sleep = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));


async function countElem(driver, tagName) {
    //const elements = await driver.findElements(By.css(tagName)); // comment out later to achieve Presence Time: 0
    //return elements.length; // comment out later to achieve Presence Time: 0
    return 0 //the website exits right away because the Presence Time is 0
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
        await sleep(rewardTime * 1000 * numImages); //Multiply by 1000 milliseconds since 1 second is equivalent to 1000 miliseconds
    }
    
    console.log("Presence Time:", totalRewardTime);
    
    // Don't exit site right away; keep the browser open for 40 seconds; Multiply by 1000 milliseconds since 1 second is equivalent to 1000 miliseconds
    await sleep(totalRewardTime * 1000); 
    await driver.quit();
}

main().catch(console.error);




