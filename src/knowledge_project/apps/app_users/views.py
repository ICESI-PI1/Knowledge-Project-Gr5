from django.shortcuts import render, redirect
from django.contrib.auth import logout
#from .forms import userForm
from .models import User
from django.urls import reverse_lazy
from django.views.generic import CreateView, ListView, DeleteView, UpdateView
from django.views import View

# Create your views here.

def signout(request):
    logout(request)
    return redirect("/accounts")


# User registration Class
class UserRegistration(CreateView):
    model = User
    #form_class = "userForm"
    template_name = "registration/registration.html"
    success_url = reverse_lazy("home")