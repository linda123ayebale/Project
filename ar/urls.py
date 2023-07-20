from django.urls import path
from . import views
app_name = "ar"

urlpatterns = [
    path('', views.homeviews, name='home')
]
