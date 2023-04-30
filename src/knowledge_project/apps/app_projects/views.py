from django.shortcuts import render, redirect, get_object_or_404
from django.views.generic.base import View
from django.contrib.auth import logout
from ..app_users.models import User, UserRole


def signout(request):
    logout(request)
    return redirect("/")



class HomeView(View):
    def get(self, request):
        page_name = 'home'
        temp_user = get_object_or_404(UserRole, user = request.user)
        user_role = temp_user.role.name
        print(user_role)
        template_name = "projects/home.html"
        return render(
            request,
            template_name,
            {
                "user_role": user_role,
                "page_name" : page_name,
            },
        )


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
        template_name = "projects/create_project.html"
        return render(
            request,
            template_name,
            {
                "user": "page_manager",
            },
        )