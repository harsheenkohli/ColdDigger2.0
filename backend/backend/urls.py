from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

# Option 1: Add an API root response
def api_root(request):
    return JsonResponse({"message": "API is running"})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('authentication.urls')),  # Notice the api/ prefix
    path('', api_root),  # Add this line for root path
]