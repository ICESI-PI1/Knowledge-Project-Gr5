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
     path('projects/announcements/<int:pk>/apply/', login_required(CreateAnnouncementProject.as_view()), name='announcementProjects-apply'),
     path('projects/announcements/select_project', login_required(ProjectSelectView.as_view()), name='select-project'),
    #---------------- Projects -------------
    path('projects/project/create/', login_required(ProjectCreateView.as_view()), name='project-create'),
    path('projects/project/list',login_required(ProjectListView.as_view()), name='projects_list'),
    path("projects/project/create/<int:project_id>/requirements",login_required(Requirements2ProjectView.as_view()),name="project-create-requirements"),
    path("projects/project/create/<int:project_id>/<int:resource_id>/requirements/delete",login_required(requitements_delete),name="project-delete-requirements"),
    path("projects/project/create/<int:project_id>/<int:resource_id>/requirements/edit",login_required(RequirementsEditView.as_view()),name="project-edit-requirements"),
    #---------------- Company -------------
    path('projects/company/create/',login_required(CompanyRegistration.as_view()),name = "register_company"),
    path('projects/company/detail/',login_required(CompanyDetail.as_view()),name = "company_detail"),
    path('projects/company/<int:pk>/update/',login_required(EditCompany.as_view()),name = "edit_company"),
    path('projects/company/<int:pk>/delete/',login_required(CompanyDeleteView.as_view()),name = "delete_company"),
    #---------------- User -------------
    path('projects/user/detail/',login_required(UserDetail.as_view()),name = "user_detail"),
    path('projects/user/<int:pk>/update/',login_required(UserUpdateView.as_view()),name = "user-update"),
     #---------------- Donation --------------
    path('projects/donations/<int:pk>/donations_list/', login_required(DonationListView.as_view()), name='donations-list'),
    path('projects/donations/<int:pk>/create_donation/', login_required(DonationCreateView.as_view()), name='donation-create'),
    #---------------- Binnacle -------------
    path('projects/binnacle/create/', login_required(BinnacleCreateView.as_view()), name='binnacle-create'),
    path('projects/binnacle/<int:pk>/update/', login_required(BinnacleUpdateView.as_view()), name='binnacle-update'),
    path('projects/binnacle/<int:pk>/delete/', login_required(BinnacleDeleteView.as_view()), name='binnacle-delete'),
    #---------------- Report -------------
    path('projects/<int:pk>/donations/report/', login_required(DonacionesProjectReport.as_view()), name='report-generate'),
]


