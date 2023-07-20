from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required

# Create your views here.

@login_required(login_url='accounts:login')
def homeviews(request):
    return render(request, "ar/index.html")
