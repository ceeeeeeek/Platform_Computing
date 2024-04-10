import time
from selenium import webdriver
from selenium.webdriver.common.by import By

'''
Returns true or false on whether a keyword exists
Capitalization should not matter (e.g. will detect "Student" on a page as "student" and vice versa)
Will detect super word in page (e.g. will detect "students" on a page as "student")
'''
def findText(driver, keyword)->bool:
    print(driver.page_source.lower()) #comment out later to answer Q2. Part 3 and screenshot both "not commented out" and "commented out" for Q2. Part 4.
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
Returns via keyword or image based on action
action : KEYWORD, IMAGE, LINK
driver : web driver
reward_time : value to wait on site
req_list (the request list): list of either keyword or element tag
'''
def userAction(action, driver, reward_time, req_list)->float:
    total_reward_time = 0
    if action.upper() == "KEYWORD":
            for keyword in req_list:
                 if findText(driver, keyword):
                      print("found", keyword)
                      time.sleep(reward_time)
                      total_reward_time += reward_time
                 else:
                      print("not found")
    elif action.upper() == "IMAGE":
         num_images = countTagElem(driver, req_list)
         total_reward_time = reward_time*num_images
         time.sleep(total_reward_time)
    
    return total_reward_time

def clickLink(driver, href):
     #find link 
     links = driver.find_elements(By.TAG_NAME, "a")
     # only clicks the first link
     for link in links:
          link.click()

def main():
    #Initialize browser
    driver = webdriver.Chrome()
    #Navigate to your website
    driver.get("http://localhost:3000/")
    reward_time = 10
    total_reward_time = userAction("KEYWORD", driver, reward_time, ["student", "test"])
    tag_name = ["img"]
    total_reward_time += userAction("IMAGE", driver, reward_time, tag_name)
    clickLink(driver)
    driver.quit()

    print("Presence Time", total_reward_time)

if __name__ == "__main__":
    main()