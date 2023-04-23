from django.shortcuts import render

from django.views import View

from django.urls import reverse_lazy

from .models import *

from django.views.generic.edit import CreateView, UpdateView, DeleteView,FormView


# Create your views here.
def home(request):
    return render(request, "base.html")
"""
class Login(FormView):
    pass

class UserBaseView(View):
    pass

class UserCreateView(UserBaseView,CreateView):
    pass

class UserUpdateView(ProjectBaseView,UpdateView):
    pass

class UserDeleteView(UserBaseView,DeleteView):
    pass

class ProjectBaseView(View):
    pass

class ProjectCreateView(ProjectBaseView,CreateView):
    pass
class ProjectUpdateView(ProjectBaseView,UpdateView):
    pass

class ProjectDeleteView(ProjectBaseView,DeleteView):
    pass

class BinnacleBaseView(View):
    pass

class BinnacleCreateView(BinnacleBaseView,CreateView):
    pass

class BinnacleUpdateView(BinnacleBaseView,UpdateView):
    pass

class BinnacleDeleteView(BinnacleBaseView,DeleteView):
    pass

class CompanyBaseView(View):
    pass

class CompanyCreateView(CompanyBaseView,CreateView):

    pass

class CompanyUpdateView(CompanyBaseView,UpdateView):
    pass



class CompanyDeleteView(CompanyBaseView,DeleteView):
    pass



class AnnouncementView(View):
    pass



class AnnouncementCreateView(CompanyBaseView,CreateView):
    pass



class AnnouncementUpdateView(CompanyBaseView,UpdateView):
    pass



class AnnouncementDeleteView(CompanyBaseView,DeleteView):
    pass



class ResourceBaseView(View):
    pass



class ResourceCreateView(ResourceBaseView,CreateView):
    pass



class ResourceUpdateView(ResourceBaseView,UpdateView):
    pass



class ResourceDeleteView(ResourceBaseView,DeleteView):
    pass



class RequirementBaseView(View):
    pass



class RequirementCreateView(RequirementBaseView,CreateView):
    pass



class UpdateView(RequirementBaseView,UpdateView):
    pass



class RequirementDeleteView(RequirementBaseView,DeleteView):
    pass



class DonationBaseView(View):
    pass



class DonationCreateView(DonationBaseView,CreateView):
    pass



class DonationUpdateView(DonationBaseView,UpdateView):
    pass



class DonationDeleteView(DonationBaseView,DeleteView):
    pass
"""