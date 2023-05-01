from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.shortcuts import render, redirect, get_object_or_404
from django.views.generic.base import View
from django.contrib.auth import logout
from django.urls import reverse_lazy
from ..app_users.models import User, UserRole
from .models import Resource
from .forms import ResourceForm

def signout(request):
    logout(request)
    return redirect("/")



class HomeView(View):
    def get(self, request):
        page_name = 'home'
        temp_user = get_object_or_404(UserRole, user = request.user)
        user_role = temp_user.role.name

        template_name = "projects/home.html"
        return render(
            request,
            template_name,
            {
                "user_role": user_role,
                "page_name" : page_name,
            },
        )


class ResourceListView(ListView):
    def get(self, request):
        page_name = 'resources'
        temp_user = get_object_or_404(UserRole, user = request.user)
        user_role = temp_user.role.name

        model = Resource
        template_name = "projects/resources.html"
        context_object_name = 'resources'
        return render(
            request,
            template_name,
            {
                "user_role": user_role,
                "page_name" : page_name,
            },
        )


class ResourceCreateView(CreateView):
    template_name = "projects/resources_form.html"
    form_class = ResourceForm

    success_url = reverse_lazy('resources-list')

    def form_valid(self, form):
        # Realizar las operaciones necesarias antes de guardar el objeto
        return super().form_valid(form)



class AnnouncementView(View):
    def get(self, request):
        template_name = "projects/announcement.html"
        return render(
            request,
            template_name,
            {
                "user": "page_manager",
            },
        )


class ProjectCreateView(View):
    def get(self, request):
        page_name = 'project'
        temp_user = get_object_or_404(UserRole, user = request.user)
        user_role = temp_user.role.name

        template_name = "projects/create_project.html"
        return render(
            request,
            template_name,
            {
                "user_role": user_role,
                "page_name" : page_name,
            },
        )
    #Hacer funcionar el POST!!!
    def post(self, request):
        title = request.POST["title"]
        print(f"{title}")

class Requirements2ProjectView(View):
     def get(self, request):
        page_name = 'requirements'
        temp_user = get_object_or_404(UserRole, user = request.user)
        user_role = temp_user.role.name

        template_name = "projects/requirements_project.html"
        return render(
            request,
            template_name,
            {
                "user_role": user_role,
                "page_name" : page_name,
            },
        )