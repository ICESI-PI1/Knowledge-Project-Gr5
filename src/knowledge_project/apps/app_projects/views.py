from django.views.generic import (
    ListView,
    CreateView,
    UpdateView,
    DeleteView,
    DetailView,
)
from django.contrib.sessions.backends.db import SessionStore
from django.core.serializers import serialize
from django.shortcuts import render, redirect, get_object_or_404
from django.views.generic.base import View
from django.contrib.auth import logout
from django.db import IntegrityError
from django.urls import reverse_lazy, reverse
from apps.app_users.models import User, UserRole, Role
from .models import *
from .forms import *
from decimal import Decimal
from datetime import datetime
from xhtml2pdf import pisa
import json
from django.http import HttpResponse
from django.template.loader import get_template
from io import BytesIO

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


# --------------- Resources --------------------


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


# --------------- Categories --------------------


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


# --------------- Announcements --------------------


class AnnouncementCategoriesListView(ListView):
    model = Announcement
    template_name = "projects/announcements/announcements_select_category.html"
    context_object_name = "announcements"

    def get_context_data(self, **kwargs):
        session = SessionStore(session_key=self.request.session.session_key)
        self.categories = session.get('categories', None)
        if self.categories:
            self.categories = self.deserialize_categories(self.categories)

        context = super().get_context_data(**kwargs)
        context["page_name"] = "announcement"
        temp = UserRole.objects.filter(user=self.request.user).first()
        context["user_role"] = temp.role.name
        context["user_name"] = temp.user.full_name

        if self.categories is None:
            context["categories"] = Category.objects.all()
        else:
            context["categories"] = self.categories

        return context

    def post(self, request):
        search_query = request.POST.get('search', '')
        categories_json = Category.objects.filter(name__icontains=search_query)
        #Agregar mensaje de que no se encontraron categorías con el nombre "resultado del input"
        categories_json = self.serialize_categories(categories_json)
        session = SessionStore(session_key=request.session.session_key)
        session['categories'] = categories_json
        session.save()
        return redirect(reverse("announcements-categories"))

    def serialize_categories(self, categories):
        categories_json = serialize('json', categories)
        return categories_json

    def deserialize_categories(self, categories_json):
        categories = json.loads(categories_json)
        categories_ids = [category['pk'] for category in categories]
        categories_objects = list(Category.objects.filter(id_category__in=categories_ids))
        return categories_objects


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
        category_id = self.request.GET.get("category", None)
        if category_id:
            queryset = queryset.filter(category__id_category=category_id)
        return queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_name"] = "announcement"
        temp = UserRole.objects.filter(user=self.request.user).first()
        context["user_role"] = temp.role.name
        context["categories"] = Category.objects.all()

        category_id = self.request.GET.get("category", None)
        category_name = None
        categ = None
        if category_id:
            try:
                category = Category.objects.get(id_category=category_id)
                categ = category
                category_name = category.name
            except Category.DoesNotExist:
                pass
        context["current_category_name"] = category_name
        context["category"] = categ
        return context


class AnnouncementProjectListView(ListView):
    model = AnnouncementProject
    template_name = "projects/announcements/announcementProjects_list.html"
    context_object_name = "projects"

    def get_queryset(self):
        announcement_id = self.kwargs["pk"]
        announcement = Announcement.objects.get(id_announ=announcement_id)
        announcement_projects = AnnouncementProject.objects.filter(
            announcement=announcement
        )
        projects = [ap.project for ap in announcement_projects]
        return projects

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_name"] = "announcement"
        temp = UserRole.objects.filter(user=self.request.user).first()
        context["user_role"] = temp.role.name

        announcement_id = self.kwargs["pk"]
        category_name = None

        if announcement_id:
            try:
                announcement = Announcement.objects.get(id_announ=announcement_id)
                category = announcement.category
                category_name = category.name
            except Category.DoesNotExist:
                #Alert*
                pass

        context["current_category_name"] = category_name

        return context


# --------------- Projects --------------------


class ProjectCreateView(View):
    def get(self, request):
        page_name = "project"
        temp_user = get_object_or_404(UserRole, user=request.user)
        user_role = temp_user.role.name
        categories = Category.objects.all()

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


# --------------- Requeriements --------------------


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
                "editable": True,
            },
        )

    def post(self, request, project_id):
        project = get_object_or_404(Project, id_project=project_id)
        print("POST DE CREAR")
        resourse = get_object_or_404(Resource, id_resource=request.POST["format"])
        objective = request.POST["objective"]

        try:
            Requirement.objects.create(
                project_id=project, resource_id=resourse, objective=objective
            )
            ResourcesBag.objects.create(
                project_id=project, resource_id=resourse, amount=0
            )
        except IntegrityError as e:
            if (
                "unique constraint" in str(e).lower()
                and "resourcesbag_project_id_resource_id" in str(e).lower()
            ):
                #Alert*
                print("El recurso ya ha sido asignado al proyecto.")
            else:
                #Alert*
                print(f"Error: {e}")

        return redirect(reverse("project-create-requirements", args=[project_id]))


def requitements_delete(request, project_id, resource_id):
    project = get_object_or_404(Project, id_project=project_id)
    resource = get_object_or_404(Resource, id_resource=resource_id)

    requirement = Requirement.objects.get(project_id=project, resource_id=resource)
    requirement.delete()
    resources_bag = ResourcesBag.objects.get(project_id=project, resource_id=resource)
    resources_bag.delete()

    return redirect(reverse("project-create-requirements", args=[project_id]))


class RequirementsEditView(View):
    def get(self, request, project_id, resource_id):
        print("GET DE EDITAR")
        page_name = "requirements_edit"
        temp_user = get_object_or_404(UserRole, user=request.user)
        user_role = temp_user.role.name

        resourses = Resource.objects.all()

        project = get_object_or_404(Project, id_project=project_id)

        requirements = Requirement.objects.filter(project_id=project)

        template_name = "projects/crud_projects/requirements_project.html"


        resource = get_object_or_404(Resource, id_resource=resource_id)


        return render(
            request,
            template_name,
            {
                "user_role": user_role,
                "page_name": page_name,
                "resourses": resourses,
                "requirements": requirements,
                "project": project,
                "resourse_2_edit":resource,
                "editable":False,
            },
        )

    def post(self, request, project_id, resource_id):
        print("POST DE EDITAR")
        project = get_object_or_404(Project, id_project=project_id)
        resource = get_object_or_404(Resource, id_resource=resource_id)
        objective = request.POST["objective"]
        print(f"Objetivo del post:\n{objective}")
        requirement = Requirement.objects.get(project_id=project, resource_id=resource)
        print(f"Requirement :)=\n{requirement}")
        print(f"Requirement.objetivo :)=\n{requirement.objective}")
        requirement.objective = objective
        print(f"Requirement.objetivo :)=\n{requirement.objective}")
        requirement.save()
        return redirect(reverse("project-create-requirements", args=[project_id]))

# --------------- Companies --------------------


class CompanyRegistration(View):
    def get(self, request):
        page_name = "Company sing up"
        template_name = "company/create_company.html"
        return render(
            request,
            template_name,
            {
                "page_name": page_name,
            },
        )

    def post(self, request):
        # Obtener datos del formulario
        name = request.POST["Name"]
        nit = request.POST["Nit"]
        address = request.POST["Adress"]
        phone = request.POST["Phone"]
        logo = request.FILES.get("Logo")

        company = Company.objects.create(
            name=name,
            nit=nit,
            address=address,
            phone=phone,
            logo=logo,
        )
        company.save()
        UserCompany.objects.create(
            user=request.user,
            company=company,
        )

        get_object_or_404(UserRole, user=request.user).delete()

        newRole = Role.objects.get(name="company_user")
        UserRole.objects.create(
            user=request.user,
            role=newRole,
        )

        # Redirigir a la ventana home
        return redirect(reverse("home"))


class CompanyDetail(View):
    def get(self, request):
        page_name = "Company detail"
        company = get_object_or_404(UserCompany, user=request.user).company
        template_name = "company\detailCompany.html"
        return render(
            request,
            template_name,
            {
                "page_name": page_name,
                "company_logo": company.logo.url,
                "company_name": company.name,
                "company_address": company.address,
                "company_phone": company.phone,
                "company_nit": company.nit,
            },
        )


class EditCompany(UpdateView):
    model = Company
    template_name = "company/edit_company.html"
    form_class = CompanyForm
    success_url = "company_detail"

    def get(self, request, *args, **kwargs):
        page_name = "Edit company"
        context = {
            "page_name": page_name,
            "company_logo": self.company.logo,
            "company_name": self.company.name,
            "company_address": self.company.address,
            "company_phone": self.company.phone,
            "company_nit": self.company.nit,
        }
        return render(request, self.template_name, context)

    def post(self, request, *args, **kwargs):
        company = UserCompany.objects.get(user=request.user).company
        name = self.request.POST.get("Name")
        nit = self.request.POST.get("Nit")
        address = self.request.POST.get("Adress")
        phone = self.request.POST.get("Phone")
        logo = self.request.POST.get("Logo")

        company.name = name
        company.nit = nit
        company.address = address
        company.phone = phone
        company.logo = logo
        company.save()

        return redirect(reverse_lazy("company_detail"))


class EditCompany(View):
    def get(self, request):
        page_name = "Edit company"
        company = UserCompany.objects.get(user=request.user).company
        template_name = "user\detailUser.html"
        return render(
            request,
            template_name,
            {
                "page_name": page_name,
                "company_logo": company.logo.url,
                "company_name": company.name,
                "company_address": company.address,
                "company_phone": company.phone,
                "company_nit": company.nit,
            },
        )

    def post(self, request):
        name = request.POST["name"]
        Nit = request.POST["Nit"]
        Adress = request.POST["Adress"]
        Phone = request.POST["Phone"]
        Logo = request.FILES.get("Logo")

        company = UserCompany.objects.get(user=request.user).company

        company.name = name
        company.nit = Nit
        company.address = Adress
        company.phone = Phone
        if Logo != None:
            company.logo = Logo

        company.save()

        return redirect("company_detail")


class CompanyDeleteView(DeleteView):
    model = Company
    template_name = "company/delete_company.html"
    success_url = reverse_lazy("home")

    def post(self, request, pk):
        userCompany = get_object_or_404(UserCompany, user=request.user)
        company = userCompany.company

        get_object_or_404(UserRole, user=request.user).delete()
        userCompany.delete()
        company.delete()

        newRole = Role.objects.get(name="common_user")
        UserRole.objects.create(
            user=request.user,
            role=newRole,
        )
        return redirect(reverse("home"))

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_name"] = "categories"
        return context


# --------------- Donations --------------------


class DonationCreateView(CreateView):
    template_name = "projects/donations/create_donation.html"
    form_class = DonationForm
    context_object_name = "resources"
    success_url = reverse_lazy("home")

    def post(self, request, pk):
        recurso = request.POST["resource_id"]
        amountDonated = Decimal(request.POST["amount"])
        descriptionAs = request.POST["description"]
        user = request.user

        project = Project.objects.get(id_project=pk)

        donation = Donation.objects.create(
            company_nit=project.company_nit,
            resource_id=Resource.objects.get(id_resource=recurso[0]),
            amount=amountDonated,
            project_id=project,
            description=descriptionAs,
        )

        try:
            Donation.full_clean(donation)
            resourceBag = ResourcesBag.objects.get(
                project_id=pk, resource_id=recurso[0]
            )
            cant_total = resourceBag.amount + amountDonated
            resourceBag.amount = cant_total
            resourceBag.save()
        except ValidationError:
            donation.delete()
            #Alert*
        return redirect(reverse("home"))

    def form_valid(self, form):
        # Realizar las operaciones necesarias antes de guardar el objeto
        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        project_pk = self.kwargs["pk"]
        requirements = Requirement.objects.filter(project_id=project_pk)
        resources = [res.resource_id for res in requirements]
        context["page_name"] = "resources"
        temp = UserRole.objects.filter(user=self.request.user).first()
        context["user_role"] = temp.role.name
        context["resources"] = resources
        return context


class DonationListView(ListView):
    model = Donation
    template_name = "projects/donations/donations_list.html"
    context_object_name = "donations"

    def get_queryset(self):
        project_id = self.kwargs["pk"]
        donations = Donation.objects.filter(project_id=project_id)
        return donations

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_name"] = "donations"
        temp = UserRole.objects.filter(user=self.request.user).first()
        context["user_role"] = temp.role.name
        context["project_id"] = self.kwargs.get("pk")

        return context


# --------------- User --------------------


class UserUpdateView(UpdateView):
    model = User
    form_class = UserForm
    template_name = "user/UpdateUser.html"
    success_url = "home"

    def get(self, request, *args, **kwargs):
        page_name = "User detail"
        user = request.user
        context = {
            "page_name": page_name,
            "profile_pic": user.photo,
            "user_name": user.full_name,
            "user_email": user.email,
            "user_phone": user.phone,
            "user_cc": user.user_cc,
            "birth_date": user.birth_date,
        }
        return render(request, self.template_name, context)

    def post(self, request, *args, **kwargs):
        user = self.request.user
        profile_pic = self.request.POST.get("profile_pic")
        full_name = self.request.POST.get("user_name")
        email = self.request.POST.get("user_email")
        phone = self.request.POST.get("user_phone")
        birth_date = request.POST.get("birth_date")
        user.full_name = full_name
        user.profile_pic = profile_pic
        user.email = email
        user.phone = phone
        if birth_date != "":
            user.birth_date = birth_date
        user.save()

        return redirect(reverse_lazy("home"))


class UserDetail(View):
    def get(self, request):
        page_name = "User detail"
        user = request.user
        template_name = "user/detailUser.html"
        return render(
            request,
            template_name,
            {
                "page_name": page_name,
                "profile_pic": user.photo,
                "user_name": user.full_name,
                "user_email": user.email,
                "user_phone": user.phone,
                "user_cc": user.user_cc,
                "birth_date": user.birth_date,
            },
        )


# --------------- Binnacle --------------------


class BinnacleCreateView(CreateView):
    template_name = "projects/binnacle/binnacle_form.html"
    form_class = BinnacleForm

    success_url = reverse_lazy("home")

    def form_valid(self, form):
        # Realizar las operaciones necesarias antes de guardar el objeto
        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_name"] = "create binnacle"
        temp = UserRole.objects.filter(user=self.request.user).first()
        context["user_role"] = temp.role.name
        return context


class BinnacleUpdateView(UpdateView):
    model = Binnacle
    template_name = "projects/binnacle/binnacle_form.html"
    form_class = BinnacleForm
    success_url = reverse_lazy("home")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_name"] = "Edit binnacle"
        temp = UserRole.objects.filter(user=self.request.user).first()
        context["user_role"] = temp.role.name
        return context


class BinnacleDeleteView(DeleteView):
    model = Binnacle
    template_name = "projects/binnacle/binnacle_delete.html"
    success_url = reverse_lazy("home")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_name"] = "resources"
        temp = UserRole.objects.filter(user=self.request.user).first()
        context["user_role"] = temp.role.name
        return context


class CraeateAnnouncementProject(CreateView):
    model = AnnouncementProject
    template_name = "projects/announcements/announcementProjects_list.html"
    context_object_name = "announcements"

    def get_queryset(self):
        project_id = self.kwargs["pk"]
        project = Project.objects.get(id_project=project_id)
        category = project.category
        announcements = Announcement.objects.filter(category=category)
        return project

    def post(self, request, *args, **kwargs):
        project_id = self.kwargs["pk"]
        project = Project.objects.get(id_project=project_id)
        announcement_id = request.POST["announcement"]
        announcement = Announcement.objects.get(id_announ=announcement_id)
        AnnouncementProject.objects.create(announcement=announcement, project=project)

def render_to_pdf(template_src,context_dict={}):
    template=get_template(template_src)
    html=template.render(context_dict)
    result=BytesIO()
    pdf=pisa.pisaDocument(BytesIO(html.encode("ISO-8859-1")),result)
    if not pdf.err:
        return HttpResponse(result.getvalue(),content_type="application/pdf")
    return None

class DonacionesProjectReport(View):
    def get(self, request, *args, **kwargs):
        template_name="reports/ReporteDonaciones.html"
        project_id = self.kwargs["pk"]
        donations=Donation.objects.filter(project_id=project_id)
        project= Project.objects.get(id_project=project_id)
        data={
            "donations":donations,
            "project":project,
            "date":datetime.now()
        }

        pdf=render_to_pdf(template_name,data)
        return HttpResponse(pdf,content_type="application/pdf")

