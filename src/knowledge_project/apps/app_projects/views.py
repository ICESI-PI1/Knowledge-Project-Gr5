from django.views.generic import ListView, CreateView, UpdateView, DeleteView, DetailView
from django.shortcuts import render, redirect, get_object_or_404
from django.views.generic.base import View
from django.contrib.auth import logout
from django.db import IntegrityError
from django.urls import reverse_lazy, reverse
from ..app_users.models import User, UserRole
from .models import *
from .forms import *
from decimal import Decimal



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

class UserDetail(View):
    def get(self , request):
        page_name = "User detail"
        user = request.user
        template_name = "user\detailUser.html"
        return render(
            request,
            template_name,
            {
                "page_name": page_name,
                "profile_pic":user.photo.url,
                "user_name":user.full_name,
                "user_email":user.email,
                "user_phone":user.phone,
                "user_cc":user.user_cc,
                "birth_date":user.birth_date,
            },
        )

#--------------- Resources --------------------

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

#--------------- Categories --------------------

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

#--------------- Announcements --------------------

class AnnouncementCategoriesListView(ListView):
    model = Announcement
    template_name = "projects/announcements/announcements_select_category.html"
    context_object_name = "announcements"


    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_name'] = 'announcement'
        temp = UserRole.objects.filter(user=self.request.user).first()
        context['user_role'] = temp.role.name
        context["user_name"] = temp.user.full_name
        context['categories'] = Category.objects.all()
        return context

class AnnouncementCreateView(CreateView):
    template_name = "projects/announcements/announcements_form.html"
    form_class = AnnouncementForm

    success_url = reverse_lazy("announcements-list")

    def form_valid(self, form):
        # Realizar las operaciones necesarias antes de guardar el objeto
        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_name"] = "announcement"
        temp = UserRole.objects.filter(user=self.request.user).first()
        context["user_role"] = temp.role.name
        return context
    
class AnnouncementUpdateView(UpdateView):
    model = Announcement
    template_name = "projects/announcements/announcements_form.html"
    form_class = AnnouncementForm
    success_url = reverse_lazy("announcements-list")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_name"] = "announcement"
        temp = UserRole.objects.filter(user=self.request.user).first()
        context["user_role"] = temp.role.name
        return context


class AnnouncementDeleteView(DeleteView):
    model = Announcement
    template_name = "projects/announcements/announcements_confirm_delete.html"
    success_url = reverse_lazy("announcements-list")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_name"] = "announcement"
        temp = UserRole.objects.filter(user=self.request.user).first()
        context["user_role"] = temp.role.name
        return context

class AnnouncementListView(ListView):
    model = Announcement
    template_name = "projects/announcements/announcements_list.html"
    context_object_name = "announcements"

    def get_queryset(self):
        queryset = super().get_queryset()
        category_id = self.request.GET.get('category', None)
        if category_id:
            queryset = queryset.filter(category__id_category=category_id)

        return queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_name'] = 'announcement'
        temp = UserRole.objects.filter(user=self.request.user).first()
        context['user_role'] = temp.role.name
        context['categories'] = Category.objects.all()
        return context


class AnnouncementProjectListView(ListView):
    model = AnnouncementProject
    template_name = 'projects/announcements/announcementProjects_list.html'
    context_object_name = 'projects'

    def get_queryset(self):
        announcement_id = self.kwargs['pk'] 
        announcement = Announcement.objects.get(id_announ=announcement_id) 
        announcement_projects = AnnouncementProject.objects.filter(announcement=announcement) 
        projects = [ap.project for ap in announcement_projects] 
        return projects

#--------------- Projects --------------------

class ProjectCreateView(View):
    def get(self, request):
        page_name = "project"
        temp_user = get_object_or_404(UserRole, user=request.user)
        user_role = temp_user.role.name
        categories = Category.objects.all()

        print(f"Usuario logued:\n{request.user}")

        template_name = "projects/crud_projects/create_project.html"
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

        return redirect(
            reverse("project-create-requirements", args=[project.id_project])
        )

#--------------- Requeriements --------------------

class Requirements2ProjectView(View):
    def get(self, request, project_id):
        page_name = "requirements"
        temp_user = get_object_or_404(UserRole, user=request.user)
        user_role = temp_user.role.name

        resourses = Resource.objects.all()

        project = get_object_or_404(Project, id_project=project_id)

        requirements = Requirement.objects.filter(project_id=project)

        template_name = "projects/crud_projects/requirements_project.html"
        return render(
            request,
            template_name,
            {
                "user_role": user_role,
                "page_name": page_name,
                "resourses": resourses,
                "requirements": requirements,
                "project": project,
            },
        )

    def post(self, request, project_id):
        print(f"POST!!!!!!!!!!!:\n{request.POST}")

        project = get_object_or_404(Project, id_project=project_id)
        resourse = get_object_or_404(Resource, id_resource=request.POST['format'])
        objective = request.POST['objective']

        try:
            Requirement.objects.create(project_id=project, resource_id=resourse, objective=objective)
            ResourcesBag.objects.create(project_id=project, resource_id=resourse, amount=0)
        except IntegrityError as e:
            if 'unique constraint' in str(e).lower() and 'resourcesbag_project_id_resource_id' in str(e).lower():
                print("El recurso ya ha sido asignado al proyecto.")
            else:
                print(f"Error: {e}")

        return redirect(reverse("project-create-requirements", args=[project_id]))
    
#--------------- Companies --------------------

class CompanyRegistration(View):
    def get(self, request):
        page_name = "Company sing up"
        template_name = "company\create_company.html"
        print(f"Usuario logued:\n{request.user}")
        return render(request, template_name,{"page_name": page_name,})
    
    def post(self,request):
        #Obtener datos del formulario
        name = request.POST["Name"]
        nit  = request.POST["Nit"]
        address = request.POST["Adress"]
        phone = request.POST["Phone"]
        logo = request.Post["Logo"]
        
        company = Company.objects.create(
            name=name, 
            nit=nit,
            address = address,
            phone = phone,
            logo = logo,
        )
        #Redirigir a la ventana home
        return redirect("home")   
    
class CompanyDetail(View):
    def get(self , request):
        page_name = "Company detail"
        company = UserCompany.objects.get(user=request.user).company
        template_name = "company\detailCompany.html"
        return render(
            request,
            template_name,
            {
                "page_name": page_name,
                "company_logo":company.logo.url,
                "company_name":company.name,
                "company_address":company.address,
                "company_phone":company.phone,
                "company_nit":company.nit,
            },
        )
        
class EditCompany(View):
    def get(self , request):
        page_name = "User detail"
        company = UserCompany.objects.get(user=request.user).company
        template_name = "user\detailUser.html"
        return render(
            request,
            template_name,
            {
                "page_name": page_name,
                "company_logo":company.logo.url,
                "company_name":company.name,
                "company_address":company.address,
                "company_phone":company.phone,
                "company_nit":company.nit,
            },
        )
    
    def post(self , request):
        name = request.POST["name"]
        Nit = request.POST["Nit"]
        Adress = request.POST["Adress"]
        Phone = request.POST["Phone"]
        Logo = request.POST["Logo"]
        
        company = UserCompany.objects.get(user=request.user).company
        
        company.name = name
        company.nit = Nit
        company.address = Adress
        company.phone = Phone
        if (Logo != None):
            company.logo = Logo
        
        company.save()
        
        return redirect("company_detail")
    
class CompanyDeleteView(DeleteView):
    model = Company
    template_name = "company/delete_company.html"
    success_url = reverse_lazy("company_detail")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_name"] = "categories"
        return context

#--------------- Donations --------------------
    
class DonationCreateView(CreateView):
    template_name = "projects/donations/create_donation.html"
    form_class = DonationForm
    context_object_name = 'resources'
    success_url = reverse_lazy("home")
    
    def post(self, request, pk):
        recurso = request.POST["resource_id"]
        amountDonated = Decimal(request.POST["amount"])
        descriptionAs = request.POST["description"]
        user = request.user
        
        project = Project.objects.get(id_project=pk)
        
        donation = Donation.objects.create(company_nit=project.company_nit, 
                                           resource_id=Resource.objects.get(id_resource=recurso[0]), 
                                           amount=amountDonated, 
                                           project_id=project,
                                           description=descriptionAs)
        
        Donation.full_clean(donation)
        
        resourceBag = ResourcesBag.objects.get(project_id=pk, resource_id=recurso[0])
        cant_total = resourceBag.amount+amountDonated
        resourceBag.amount=cant_total
        resourceBag.save() 

        return redirect(
            reverse("home")
        )
        

    def form_valid(self, form):
        # Realizar las operaciones necesarias antes de guardar el objeto
        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        project_pk = self.kwargs['pk']
        requirements = Requirement.objects.filter(project_id=project_pk)
        resources = [res.resource_id for res in requirements]
        context["page_name"] = "resources"
        temp = UserRole.objects.filter(user=self.request.user).first()
        context["user_role"] = temp.role.name
        context['resources'] = resources
        return context
