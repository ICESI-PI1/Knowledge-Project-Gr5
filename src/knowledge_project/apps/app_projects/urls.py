from django.urls import path
from django.contrib.auth.decorators import login_required
from .views import *


urlpatterns = [
    path('', login_required(HomeView.as_view()), name = 'home'),
    path('logout/', signout, name = "logout"),
    path('projects/resources/', login_required(ResourceListView.as_view()), name='resources-list'),
    path('projects/resources/create/', login_required(ResourceCreateView.as_view()), name='resources-create'),
    path('projects/announcement/', login_required(AnnouncementView.as_view()), name='announcement'),
    path('projects/project/create/', login_required(ProjectCreateView.as_view()), name='project-create'),
    path('projects/project/create/requirements', login_required(Requirements2ProjectView.as_view()), name='project-create-requirements'),
]