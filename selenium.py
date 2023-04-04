from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager

import os

options = webdriver.ChromeOptions()
prefs = {}
prefs["profile.default_content_settings.popups"]=0
prefs["download.default_directory"]= os.path.dirname(os.path.realpath(__file__))
options.add_experimental_option("prefs", prefs)
# options.add_argument("start-maximized")
# options.add_experimental_option("detach", True)

# service = Service(executable_path="c:/WebDriver/bin/chromedriver")
# driver = webdriver.Chrome(service=service, options=options)
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
driver.get("http://localhost:8080/single-vis.html")

el = WebDriverWait(driver, 10).until(lambda d: d.find_element(By.ID,"download"))
driver.implicitly_wait(3);