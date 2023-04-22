from django.shortcuts import render
from django.views import View
from django.urls import reverse_lazy
import models
from django.views.generic.edit import CreateView, UpdateView, DeleteView

# Create your views here.
class Login(FormView):
    template_name

class ProjectBaseView(View):
    model=Project

class ProjectCreateView(ProjectBaseView,CreateView):
    template_name

class ProjectUpdateView(ProjectBaseView,UpdateView):
    template_name

class ProjectDeleteView(ProjectBaseView,DeleteView):
    template_name

class BinnacleBaseView(View):
    model=Binnacle

class BinnacleCreateView(BinnacleBaseView,CreateView):
    template_name

class BinnacleUpdateView(BinnacleBaseView,UpdateView):
    template_name

class BinnacleDeleteView(BinnacleBaseView,DeleteView):
    template_name

class CompanyBaseView(View):
    model=Company

class CompanyCreateView(CompanyBaseView,CreateView):
    template_name

class CompanyUpdateView(CompanyBaseView,UpdateView):
    template_name

class CompanyDeleteView(CompanyBaseView,DeleteView):
    template_name

class AnnouncementView(View):
    template_name

class AnnouncementCreateView(CompanyBaseView,CreateView):
    template_name

class AnnouncementUpdateView(CompanyBaseView,UpdateView):
    template_name

class AnnouncementDeleteView(CompanyBaseView,DeleteView):
    template_name

class ResourceBaseView(View):
    model=Company

class ResourceCreateView(ResourceBaseView,CreateView):
    template_name

class ResourceUpdateView(ResourceBaseView,UpdateView):
    template_name

class ResourceDeleteView(ResourceBaseView,DeleteView):
    template_name

class RequirementBaseView(View):
    model=Company

class RequirementCreateView(RequirementBaseView,CreateView):
    template_name

class UpdateView(RequirementBaseView,UpdateView):
    template_name

class RequirementDeleteView(RequirementBaseView,DeleteView):
    template_name

class DonationBaseView(View):
    model=Company

class DonationCreateView(DonationBaseView,CreateView):
    template_name

class DonationUpdateView(DonationBaseView,UpdateView):
    template_name

class DonationDeleteView(DonationBaseView,DeleteView):
    template_name