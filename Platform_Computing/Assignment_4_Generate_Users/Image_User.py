import time
from selenium import webdriver
from selenium.webdriver.common.by import By

'''
Returns number of elements given tag_name
'''
def countTagElem(driver, tag_name)->int:
    return len(driver.find_elements(By.TAG_NAME, tag_name))

def main():
    #Initialize browser
    driver = webdriver.Chrome()
    #Navigate to your website
    driver.get("http://localhost:3000/")
    rewardTime = 10
    totalRewardTime = 0
    tags = ["img"]
    for tag in tags:
        numImages = countTagElem(driver, tag)
        totalRewardTime += rewardTime*numImages
        time.sleep(totalRewardTime)
    driver.quit()
    print("Presence Time:", totalRewardTime)
if __name__ == "__main__":
    main()