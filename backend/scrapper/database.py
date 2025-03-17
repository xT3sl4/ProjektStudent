from pymongo import MongoClient
from datetime import datetime

client = MongoClient("mongodb+srv://pitszwarc:ruraedzio1@cluster0.phevost.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["product_scraper"]
productsPrices = db["products"]
productsTracked = db["tracked"]

def save_to_tracked(product_name, source, link, userId):
    data = {
        "product_name": product_name,
        "source": source,
        "userId": userId,
        "link": link
    }
    productsTracked.insert_one(data)
    print(f"✅ Zapisano do MongoDB: {data}")

def save_price_to_db(product_name, price, source, userId):
    data = {
        "product_name": product_name,
        "price": price,
        "source": source,
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "userId": userId
    }
    productsPrices.insert_one(data)
    print(f"✅ Zapisano cenę do MongoDB: {data}")


def get_tracked_products(userId=None):
    if userId:
        return productsTracked.find({"userId": userId})
    else:
        return productsTracked.find({})


