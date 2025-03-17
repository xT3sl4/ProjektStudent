import sys
import os
import json
import logging
from concurrent.futures import ThreadPoolExecutor, as_completed

logger = logging.getLogger(__name__)

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from django.http import JsonResponse
from scrapper.database import productsPrices, save_to_tracked, get_tracked_products
from scrapper.tracker import track_product_xkom, track_product_morele, track_product_media
from django.views.decorators.csrf import csrf_exempt
from scrapper.scraper import get_xkom_price, get_morele_price, get_media_price


def get_price_history(request, product_name):
    price_data = productsPrices.find({"product_name": product_name})

    result = [
        {
            "product_name": entry["product_name"],
            "price": entry["price"],
            "source": entry["source"],
            "timestamp": entry["timestamp"]
        }
        for entry in price_data
    ]
    return JsonResponse(result, safe=False)

def api_home(request):
    return JsonResponse({"message": "Welcome to the API!"})


def get_tracked_products_endpoint(request):
    userId = 1

    tracked_products = get_tracked_products(userId)

    result = [
        {"product_name": product["product_name"], "source": product["source"], "link": product["link"]}
        for product in tracked_products
    ]

    return JsonResponse(result, safe=False)


@csrf_exempt
def track_product(request):
    if request.method == "POST":
        data = json.loads(request.body)
        product_name = data.get("product_name")
        store = data.get("store")

        if not product_name or not store:
            return JsonResponse({"error": "Missing parameters"}, status=400)

        if store == "xkom":
            products = track_product_xkom(product_name)
        elif store == "morele":
            products = track_product_morele(product_name)
        elif store == "mediaexpert":
            products = track_product_media(product_name)
        else:
            return JsonResponse({"error": "Invalid store"}, status=400)

        return JsonResponse({"products": products})

    return JsonResponse({"error": "Invalid request"}, status=400)

@csrf_exempt
def save_tracked_product(request):
    if request.method == "POST":
        data = json.loads(request.body)
        title = data.get("title")
        link = data.get("link")
        store = data.get("store")
        user_id = data.get("user_id")

        if not title or not link or not store or not user_id:
            return JsonResponse({"error": "Missing parameters"}, status=400)

        save_to_tracked(title, store, link, user_id)
        return JsonResponse({"message": "Product saved successfully"})

    return JsonResponse({"error": "Invalid request"}, status=400)


@csrf_exempt
def get_prices(request):
    if request.method == "POST":
        tracked_products = get_tracked_products()

        def update_price(product):
            if "xkom" in product["source"]:
                get_xkom_price(product["link"], product["product_name"], product["userId"])
            elif "morele" in product["source"]:
                get_morele_price(product["link"], product["product_name"], product["userId"])
            elif "mediaexpert" in product["source"]:
                get_media_price(product["link"], product["product_name"], product["userId"])

        with ThreadPoolExecutor() as executor:
            futures = [executor.submit(update_price, product) for product in tracked_products]
            for future in as_completed(futures):
                try:
                    future.result()
                except Exception as e:
                    logger.error(f"Error updating price: {e}")

        return JsonResponse({"message": "Prices have been updated."}, status=200)

    return JsonResponse({"error": "Invalid request"}, status=400)