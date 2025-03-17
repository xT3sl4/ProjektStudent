from django.urls import path
from .views import get_price_history, track_product, api_home, get_tracked_products_endpoint, save_tracked_product, get_prices

urlpatterns = [
    path("price-history/<str:product_name>/", get_price_history, name="price-history"),
    path("welcome/", api_home, name="api-home"),  # `/api/welcome/`
    path("get/", get_tracked_products_endpoint, name="get-tracked-products"),  # `/api/get/`
    path("track-product/", track_product, name="track_product"),
    path("save-tracked-product/", save_tracked_product, name="save-tracked-product"),
    path("get_prices/", get_prices, name="get-prices"),
]
