from scrapper.scraper import get_xkom_price, get_morele_price, get_media_price
from scrapper.database import get_tracked_products

userId = 1


if __name__ == "__main__":
    tracked_products = get_tracked_products(userId)
    for product in tracked_products:
        source, link, product_name = product["source"], product["link"], product["product_name"]
        print(f"🔍 Sprawdzanie ceny dla {product_name} ({source})...")

        if source == "X-Kom":
            get_xkom_price(link, product_name, userId)
        elif source == "Morele":
            get_morele_price(link, product_name, userId)
        elif source == "MediaExpert":
            get_media_price(link, product_name, userId)





