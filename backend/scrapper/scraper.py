from selenium import webdriver
from selenium.webdriver.common.by import By
import re
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from scrapper.database import save_price_to_db


def get_driver():
    chrome_options = Options()
    chrome_options.add_argument("--headless=new")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--window-size=1920,1080")
    chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64)")
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")

    service = Service()
    return webdriver.Chrome(service=service, options=chrome_options)


def get_xkom_price(link, product_name, userId):
    driver = get_driver()
    try:
        driver.get(link)
        price_span = driver.find_element(By.CSS_SELECTOR, "span.sc-gWHAAX")
        price_element = price_span.find_element(By.XPATH, "..")
        price_text = price_element.text
        price = int(re.sub(r'\D', '', price_text)) // 100

        save_price_to_db(product_name, price, "X-Kom", userId)
    except Exception as e:
        print(f"❌ Błąd pobierania ceny X-Kom: {e}")
    finally:
        driver.quit()


def get_morele_price(link, product_name, userId):
    driver = get_driver()
    driver.get(link)
    try:
        box = driver.find_element(By.CSS_SELECTOR, "div#product_price")
        price_text = box.find_element(By.CSS_SELECTOR, "strong").text
        price = int(re.sub(r'\D', '', price_text))
        save_price_to_db(product_name, price, "Morele", userId)
    except Exception as e:
        print(f"❌ Błąd pobierania ceny Morele: {e}")
    finally:
        driver.quit()


def get_media_price(link, product_name, userId):
    driver = get_driver()
    driver.get(link)
    try:
        box = driver.find_element(By.CSS_SELECTOR, "div.prices")
        price_text = box.find_element(By.CSS_SELECTOR, "span.whole").text
        price = re.sub(r'\D', '', price_text)
        save_price_to_db(product_name, price, "MediaExpert", userId)
    except Exception as e:
        print(f"❌ Błąd pobierania ceny MediaExpert: {e}")
    finally:
        driver.quit()
