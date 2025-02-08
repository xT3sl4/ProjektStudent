import app
from selenium.webdriver.common.by import By
import time
import keyboard
from scrapper.database import save_to_tracked
from scrapper.scraper import get_driver

def clear_console():
    print("\n" * 100)

def track_product_xkom(product_name, userId):
    driver = get_driver()
    driver.get(f"https://www.x-kom.pl/szukaj?q={product_name}")
    elements = driver.find_elements(By.CSS_SELECTOR, "div.gTaWny")

    for index, element in enumerate(elements):
        clear_console()
        print(element.text)
        if keyboard.read_event().name == "space":
            link = element.find_element(By.CSS_SELECTOR, "a.dLwTmu").get_attribute("href")
            save_to_tracked(product_name, "X-Kom", link, userId)
            break
        time.sleep(0.2)

    driver.quit()

def track_product_morele(product_name, userId):
    driver = get_driver()
    driver.get(f"https://www.morele.net/wyszukiwarka/?q={product_name}")
    elements = driver.find_elements(By.CSS_SELECTOR, "div.cat-product-inside")

    for index, element in enumerate(elements):
        clear_console()
        print(element.find_element(By.CSS_SELECTOR, "a.productLink").text)
        if keyboard.read_event().name == "space":
            link = element.find_element(By.CSS_SELECTOR, "a.productLink").get_attribute("href")
            save_to_tracked(product_name, "Morele", link, userId)
            break
        time.sleep(0.2)

    driver.quit()

def track_product_media(product_name, userId):
    driver = get_driver()
    driver.get(f"https://www.mediaexpert.pl/search?query[querystring]={product_name}")
    elements = driver.find_elements(By.CSS_SELECTOR, "div.offer-box")

    for index, element in enumerate(elements):
        clear_console()
        print(element.find_element(By.CSS_SELECTOR, "a.ui-link").text)
        if keyboard.read_event().name == "space":
            link = element.find_element(By.CSS_SELECTOR, "a.intersection-observer").get_attribute("href")
            save_to_tracked(product_name, "MediaExpert", link, userId)
            break
        time.sleep(0.2)

    driver.quit()


