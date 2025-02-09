from selenium.webdriver.common.by import By
from scrapper.scraper import get_driver


def track_product_xkom(product_name):
    driver = get_driver()
    driver.get(f"https://www.x-kom.pl/szukaj?q={product_name}")
    elements = driver.find_elements(By.CSS_SELECTOR, "div.gTaWny")

    products = []
    for element in elements[:5]:  # Pobieramy maksymalnie 5 produktów
        try:
            product_title = element.text
            link = element.find_element(By.CSS_SELECTOR, "a.dLwTmu").get_attribute("href")
            products.append({"title": product_title, "link": link})
        except Exception as e:
            print(f"Error scraping X-Kom: {e}")

    driver.quit()
    return products


def track_product_morele(product_name):
    driver = get_driver()
    driver.get(f"https://www.morele.net/wyszukiwarka/?q={product_name}")
    elements = driver.find_elements(By.CSS_SELECTOR, "div.cat-product-inside")

    products = []
    for element in elements[:5]:
        try:
            product_title = element.find_element(By.CSS_SELECTOR, "a.productLink").text
            link = element.find_element(By.CSS_SELECTOR, "a.productLink").get_attribute("href")
            products.append({"title": product_title, "link": link})
        except Exception as e:
            print(f"Error scraping Morele: {e}")

    driver.quit()
    return products


def track_product_media(product_name):
    driver = get_driver()
    driver.get(f"https://www.mediaexpert.pl/search?query[querystring]={product_name}")
    elements = driver.find_elements(By.CSS_SELECTOR, "div.offer-box")

    products = []
    for element in elements[:5]:
        try:
            product_title = element.find_element(By.CSS_SELECTOR, "a.ui-link").text
            link = element.find_element(By.CSS_SELECTOR, "a.intersection-observer").get_attribute("href")
            products.append({"title": product_title, "link": link})
        except Exception as e:
            print(f"Error scraping MediaExpert: {e}")

    driver.quit()
    return products
