from django.urls import path
from . import views

app_name = "accounts"

urlpatterns = [
    path('', views.loginViews, name='login'),
    path('register', views.registerViews, name='register'),
    path('forgot', views.forgotViews, name='forgot'),
    path('logout/', views.logoutUser, name='logout')
]
