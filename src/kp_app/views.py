from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout


# Create your views here.
@login_required
def home(request):
    return render(request, "base.html", {
        'user': "page_manager",
    })

def signout(request):
    logout(request)
    return redirect('/')


def second(request):
    return render(request, "base.html")
