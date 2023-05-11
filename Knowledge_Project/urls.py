"""Knowledge_Project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from users import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('signup/', views.signup, name='signup'),
    path('projects/', views.projects, name='projects'),
    path('logout/', views.signout, name='logout'),
    path('signin/', views.signin, name='signin'),
    path('projects/create/', views.create_project, name='projects_create'),
    path('projects/<int:project_id>/', views.project_details, name='project_details'),
    path('projects/<int:project_id>/complete', views.complete_project, name='complete_project'),
    path('projects/<int:project_id>/delete', views.delete_project, name='delete_project'),
    path('projects_completed/', views.projects_completed, name='projects_completed'),
]
