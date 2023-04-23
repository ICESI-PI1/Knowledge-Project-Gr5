from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from .forms import userForm

# Create your views here.
@login_required
def home(request):
    return render(request, "base.html", {
        'user': "page_manager",
    })

def signout(request):
    logout(request)
    return redirect('/')

def registration(request):
    data = {
        'form': userForm()
    }
    if request.method == 'post':
        form = userForm(request.POST)
        if form.is_valid():
            form.save()
    return render(request, "registration/registration.html", data)

def second(request):
    return render(request, "base.html")

