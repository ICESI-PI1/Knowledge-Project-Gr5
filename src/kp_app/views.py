from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from .forms import userForm
from .models import User
from django.urls import reverse_lazy
from django.views.generic import CreateView, ListView, DeleteView, UpdateView
from django.views import View


# Create your views here.

def signout(request):
    logout(request)
    return redirect("/")


class HomePageView(View):
    def get(self, request):
        return render(
            request,
            "pages/home.html",
            {
                "user": "page_manager",
            },
        )


class UserList(ListView):
    model = User
    template_name = "registration/registration.html"

    def get_queryset(self):
        return self.model.objects.filter(active_user=True)


# User registration Class
class UserRegistration(CreateView):
    model = User
    form_class = userForm
    template_name = "registration/registration.html"
    success_url = reverse_lazy("home")
