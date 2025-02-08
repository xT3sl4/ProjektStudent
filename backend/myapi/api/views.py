from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(["GET"])
def api_home(request):
    return Response({"message": "Witaj w API!"})
