from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login,logout
from django.contrib.auth.forms import UserCreationForm
from .forms import CustomUserCreationForm
from django.contrib import messages
# Create your views here.

def loginViews(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request,user)
            return redirect("chatbot:landing")
        else:
            messages.error(request, 'Oops, Invalid Username or Password.try again')

    return render(request, 'accounts/login.html')


def registerViews(request):
    form = CustomUserCreationForm()
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.save()
            # login in user direct on registration
            user = authenticate(
                request, username=user.username, password=request.POST['password1']
            )

            if user is not None:
                login(request, user)
                return redirect('chatbot:home')
            else:
                messages.error(request, 'Oops, something went wrong! try again later')

    context = {'form':form}
    return render(request, 'accounts/register.html', context)


def forgotViews(request):
    return render(request, 'accounts/forgot.html')


def logoutUser(request):
    logout(request)
    return redirect('accounts:login')