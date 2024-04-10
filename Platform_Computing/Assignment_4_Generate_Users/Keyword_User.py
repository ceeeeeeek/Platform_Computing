import time
from selenium import webdriver

'''
Returns true or false on whether a keyword exists
Capitalization should not matter (e.g. will detect "Student" on a page as "student" and vice versa)
Will detect super word in page (e.g. will detect "students" on a page as "student")
'''
def findKeyword(driver, keyword)->bool:
    print(driver.page_source.lower()) #comment out later to answer Q2. Part 3 and screenshot both "not commented out" and "commented out" for Q2. Part 4.
    return keyword.lower() in driver.page_source.lower()

def main():
    #Initialize browser
    driver = webdriver.Chrome()

    #Navigate to your website
    driver.get("http://localhost:3000/")
    reward_time = 10
    total_reward_time = 0
    keyword = "student"
    if findKeyword(driver, keyword):
        total_reward_time += reward_time
        time.sleep(reward_time)
    else:
        print("not found")
    #example code if seeking multiple keywords
    #keywords = ["student", "test"] #a list of elements; for each keyword in the list, if the reward_time = 10, then the output of 2 keywords would be 'Presence Time: 20'
    #for key in keywords: #for loop used to iterate through elements in list with multiple keywords
        #if findKeyword(driver, key):
            #total_reward_time += reward_time
            #time.sleep(reward_time)
        #else:
            #print("not found")
    driver.quit()
    print("Presence Time:", total_reward_time)
if __name__ == "__main__":
    main()