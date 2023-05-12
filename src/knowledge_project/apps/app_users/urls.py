from django.urls import path
from django.contrib.auth.decorators import login_required
from .views import *

urlpatterns = [
    path('login/', LoginView.as_view(), name = "login"),
    path('registration/', UserRegistration.as_view(), name = "register_user"),
    path('list/', login_required(UserListView.as_view()), name='users-list'),
    path('create/', login_required(UserCreateView.as_view()), name='users-create'),
    path('<int:pk>/update/', login_required(UserUpdateView.as_view()), name='users-update'),
    path('<int:pk>/delete/', login_required(UserDeleteView.as_view()), name='users-delete'),

]