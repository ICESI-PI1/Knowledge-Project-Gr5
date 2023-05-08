from django.urls import path
from django.contrib.auth.decorators import login_required
from .views import *

urlpatterns = [
    #---------------- Home -------------
    path("", login_required(HomeView.as_view()), name="home"),
    path("logout/", signout, name="logout"),
    #---------------- Resources -------------
    path('projects/resources/', login_required(ResourceListView.as_view()), name='resources-list'),
    path('projects/resources/create/', login_required(ResourceCreateView.as_view()), name='resources-create'),
    path('projects/resources/<int:pk>/update/', login_required(ResourceUpdateView.as_view()), name='resources-update'),
    path('projects/resources/<int:pk>/delete/', login_required(ResourceDeleteView.as_view()), name='resources-delete'),
    #---------------- Categories -------------
    path('projects/categories/', login_required(CategoryListView.as_view()), name='categories-list'),
    path('projects/categories/create/', login_required(CategoryCreateView.as_view()), name='categories-create'),
    path('projects/categories/<int:pk>/update/', login_required(CategoryUpdateView.as_view()), name='categories-update'),
    path('projects/categories/<int:pk>/delete/', login_required(CategoryDeleteView.as_view()), name='categories-delete'),
    #---------------- Announcements -------------
    path('projects/announcements/categories', login_required(AnnouncementCategoriesListView.as_view()), name='announcements-categories'),
    path('projects/announcements/select', login_required(AnnouncementListView.as_view()), name='announcements-list'),
    path('projects/announcements/create/', login_required(AnnouncementCreateView.as_view()), name='announcements-create'),
    path('projects/announcements/<int:pk>/update/', login_required(AnnouncementUpdateView.as_view()), name='announcements-update'),
    path('projects/announcements/<int:pk>/delete/', login_required(AnnouncementDeleteView.as_view()), name='announcements-delete'),
    path('projects/announcements/<int:pk>/projects/', login_required(AnnouncementProjectListView.as_view()), name='announcementProjects-list'),
    #---------------- Projects -------------
    path('projects/project/create/', login_required(ProjectCreateView.as_view()), name='project-create'),
    path("projects/project/create/<int:project_id>/requirements",login_required(Requirements2ProjectView.as_view()),name="project-create-requirements"),
    #---------------- Company -------------
    path('projects/company/create/',login_required(CompanyRegistration.as_view()),name = "register_company"),
    path('projects/company/detail/',login_required(CompanyDetail.as_view()),name = "company_detail"),
    #---------------- User -------------
    path('projects/user/detail/',login_required(UserDetail.as_view()),name = "user_detail"),
     #---------------- Donation --------------
    #path('projects/donations/donations_list/', name='donations-list'),
    path('projects/donations/<int:pk>/create_donation/', login_required(DonationCreateView.as_view()), name='donation-create'),
]

