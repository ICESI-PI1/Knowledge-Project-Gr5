from django.views.generic import ListView, CreateView, UpdateView, DeleteView, DetailView
from django.shortcuts import render, redirect, get_object_or_404
from django.views.generic.base import View
from django.contrib.auth import logout
from django.urls import reverse_lazy, reverse
from ..app_users.models import User, UserRole
from .models import *
from .forms import *


def signout(request):
    logout(request)
    return redirect("/")


class HomeView(View):
    def get(self, request):
        page_name = "home"
        temp_user = get_object_or_404(UserRole, user=request.user)
        user_role = temp_user.role.name

        template_name = "projects/home.html"
        return render(
            request,
            template_name,
            {
                "user_role": user_role,
                "page_name": page_name,
            },
        )


class ResourceListView(ListView):
    model = Resource
    template_name = "projects/resources/resources_list.html"
    context_object_name = "resources"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_name"] = "resources"
        temp = UserRole.objects.filter(user=self.request.user).first()
        context["user_role"] = temp.role.name
        return context


class ResourceCreateView(CreateView):
    template_name = "projects/resources/resources_form.html"
    form_class = ResourceForm

    success_url = reverse_lazy("resources-list")

    def form_valid(self, form):
        # Realizar las operaciones necesarias antes de guardar el objeto
        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_name"] = "resources"
        temp = UserRole.objects.filter(user=self.request.user).first()
        context["user_role"] = temp.role.name
        return context


class ResourceUpdateView(UpdateView):
    model = Resource
    template_name = "projects/resources/resources_form.html"
    form_class = ResourceForm
    success_url = reverse_lazy("resources-list")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_name"] = "resources"
        temp = UserRole.objects.filter(user=self.request.user).first()
        context["user_role"] = temp.role.name
        return context


class ResourceDeleteView(DeleteView):
    model = Resource
    template_name = "projects/resources/resource_confirm_delete.html"
    success_url = reverse_lazy("resources-list")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_name"] = "resources"
        temp = UserRole.objects.filter(user=self.request.user).first()
        context["user_role"] = temp.role.name
        return context


class CategoryListView(ListView):
    model = Category
    template_name = "projects/categories/categories_list.html"
    context_object_name = "categories"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_name"] = "categories"
        temp = UserRole.objects.filter(user=self.request.user).first()
        context["user_role"] = temp.role.name
        return context


class CategoryCreateView(CreateView):
    template_name = "projects/categories/categories_form.html"
    form_class = CategoryForm

    success_url = reverse_lazy("categories-list")

    def form_valid(self, form):
        # Realizar las operaciones necesarias antes de guardar el objeto
        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_name"] = "categories"
        temp = UserRole.objects.filter(user=self.request.user).first()
        context["user_role"] = temp.role.name
        return context


class CategoryUpdateView(UpdateView):
    model = Category
    template_name = "projects/categories/categories_form.html"
    form_class = CategoryForm
    success_url = reverse_lazy("categories-list")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_name"] = "categories"
        temp = UserRole.objects.filter(user=self.request.user).first()
        context["user_role"] = temp.role.name
        return context


class CategoryDeleteView(DeleteView):
    model = Category
    template_name = "projects/categories/categories_confirm_delete.html"
    success_url = reverse_lazy("categories-list")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_name"] = "categories"
        temp = UserRole.objects.filter(user=self.request.user).first()
        context["user_role"] = temp.role.name
        return context


class AnnouncementView(View):
    def get(self, request):
        template_name = "projects/announcement/announcement.html"
        return render(
            request,
            template_name,
            {
                "user": "page_manager",
            },
        )
class AnnouncementProjectListView(ListView):
    model = AnnouncementProject
    template_name = 'projects/announcement/announcement_list.html'
    context_object_name = 'projects'

    def get_queryset(self):
        announcement_id = self.kwargs['pk'] 
        announcement = Announcement.objects.get(id_announ=announcement_id) 
        announcement_projects = AnnouncementProject.objects.filter(announcement=announcement) 
        projects = [ap.project for ap in announcement_projects] 
        return projects

class ProjectCreateView(View):
    def get(self, request):
        page_name = "project"
        temp_user = get_object_or_404(UserRole, user=request.user)
        user_role = temp_user.role.name
        categories = Category.objects.all()

        print(f"Usuario logued:\n{request.user}")

        template_name = "projects/create_project.html"
        return render(
            request,
            template_name,
            {
                "user_role": user_role,
                "page_name": page_name,
                "categories": categories,
            },
        )

    def post(self, request):
        title = request.POST["title"]
        category = Category.objects.get(id_category=request.POST["format"])
        objective = request.POST["objetive"]
        results = request.POST["results"]
        reach = request.POST["reach"]

        company = UserCompany.objects.get(user=request.user).company

        project = Project.objects.create(
            title=title,
            category=category,
            objective=objective,
            results=results,
            reach=reach,
            company_nit=company,
        )

        return redirect(reverse("project-create-requirements", args=[project.id_project]))


class Requirements2ProjectView(View):
    def get(self, request, project_id):
        page_name = "requirements"
        temp_user = get_object_or_404(UserRole, user=request.user)
        user_role = temp_user.role.name

        resourses = Resource.objects.all()

        project = get_object_or_404(Project, id_project=project_id)

        requirements = Requirement.objects.filter(project_id=project)

        template_name = "projects/requirements_project.html"
        return render(
            request,
            template_name,
            {
                "user_role": user_role,
                "page_name": page_name,
                "resourses": resourses,
                "requirements": requirements,
                "project": project
            },
        )

    #Arreglar el error :)
    def post(self, request, project_id):
        print(f"POST!!!!!!!!!!!:\n{request.POST}")
        page_name = "requirements"
        temp_user = get_object_or_404(UserRole, user=request.user)
        user_role = temp_user.role.name

        return redirect(f'/projects/project/create/{project_id}/requirements')
