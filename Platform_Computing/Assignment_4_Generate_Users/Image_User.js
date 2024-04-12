const {By, Builder, Browser} = require('selenium-webdriver');

async function countTagElem(driver, tagNames) {
    const elements = await driver.findElements(By.css(tagNames)); // comment out later to achieve Presence Time: 0
    return elements.length; // comment out later and uncomment out return 0 below to achieve Presence Time: 0
    //return 0; //the website will exit right away because the Presence Time is 0
    //if there are no images on the website, exits website immediately, and output will return Presence Time: 0
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
        const numImages = await countTagElem(driver, tag);
        totalRewardTime += rewardTime * numImages;
    }

    console.log("Presence Time:", totalRewardTime);
    
    // Don't exit site right away; keep the browser open for 40 seconds; Multiply by 1000 milliseconds since 1 second is equivalent to 1000 miliseconds
    await new Promise(resolve => setTimeout(resolve, totalRewardTime * 1000));
    
    await driver.quit();
}

main().catch(console.error);




