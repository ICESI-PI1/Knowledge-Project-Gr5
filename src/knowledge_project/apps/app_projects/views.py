from django.shortcuts import render, redirect
from django.views.generic.base import View
from django.contrib.auth import logout


def signout(request):
    logout(request)
    return redirect("/")



class HomeView(View):
    def get(self, request):
        template_name = "projects/home.html"
        return render(
            request,
            template_name,
            {
                "user": "page_manager",
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