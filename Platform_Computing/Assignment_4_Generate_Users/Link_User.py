import time
from selenium import webdriver
from selenium.webdriver.common.by import By

'''
Returns true or false on whether a keyword exists
Capitalization should not matter (e.g. will detect "Student" on a page as "student" and vice versa)
Will detect super word in page (e.g. will detect "students" on a page as "student")
'''
def findKeyword(driver, keyword)->bool:
    print(driver.page_source.lower()) 
    return keyword.lower() in driver.page_source.lower()

'''
Returns number of elements given tag_name
'''
def countTagElem(driver, tag_name)->int:
    count = 0
    for tags in tag_name:
         count += len(driver.find_elements(By.TAG_NAME, tags))
    return count

'''
Clicks first link
'''
def clickLink(driver, tag_name):
     #find link 
     links = driver.find_elements(By.TAG_NAME, tag_name)
     # only clicks the first link
     for link in links:
          link.click()

'''
Returns via keyword or image based on action
action : KEYWORD, IMAGE, LINK
driver/web driver: driver
totalRewardTime : value to wait on site
reqList (the request list): list of either keyword or element tag
'''
def userAction(action, driver, rewardTime, reqList)->float:
    totalRewardTime = 0
    if action.upper() == "KEYWORD":
     for keyword in reqList: 
          if findKeyword(driver, keyword):
              print("found", keyword)
              totalRewardTime += rewardTime
              time.sleep(rewardTime)
          else:
              print(keyword, "not found")  
    elif action.upper() == "IMAGE":
     numImages = countTagElem(driver, reqList)
     totalRewardTime = rewardTime*numImages
     time.sleep(totalRewardTime) 
    elif action.upper() == "LINK":
     numLinks = countTagElem(driver, reqList)
     totalRewardTime += rewardTime*numLinks 
     time.sleep(rewardTime) 
     time.sleep(totalRewardTime)

     return totalRewardTime

def main():
    #Initialize browser
    driver = webdriver.Chrome()
    #Navigate to your website
    driver.get("http://localhost:3000/")
    rewardTime = 10
    totalRewardTime = 0
    keywords = ["student", "CSUSB"]
    totalRewardTime = userAction("KEYWORD", driver, rewardTime, keywords)
    tag_name = ["img"]
    totalRewardTime += userAction("IMAGE", driver, rewardTime, tag_name)
    link = ["a"]
    totalRewardTime += userAction("LINK", driver, rewardTime, link)

    clickLink(driver)
    driver.quit()

    print("Presence Time:", totalRewardTime)

if __name__ == "__main__":
    main()