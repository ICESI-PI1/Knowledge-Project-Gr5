from django.shortcuts import render, redirect
from django.contrib.auth import logout, login, authenticate
from .models import User, UserRole
from django.contrib.auth.hashers import make_password
from django.urls import reverse_lazy
from django.views.generic import CreateView, ListView, DeleteView, UpdateView
from django.views import View
from ..app_projects.forms import UserForm


class LoginView(View):
    template_name = "registration/login.html"

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)

    def post(self, request, *args, **kwargs):
        # Obtener los datos del formulario enviado
        user_cc = request.POST.get("username")
        password = request.POST.get("password")

        # Autenticar al usuario
        user = authenticate(request=request, user_cc=user_cc, password=password)

        # Verificar si la autenticación fue exitosa
        if user is not None:
            # Iniciar sesión
            login(request, user)
            # Redirigir al usuario a la página de inicio
            return redirect("home")
        else:
            # Mostrar un mensaje de error en caso de que la autenticación falle
            error_message = "Cédula o contraseña incorrectas. Por favor, inténtalo de nuevo."
            return render(request, self.template_name, {"error_message": error_message})


def signout(request):
    logout(request)
    return redirect("/accounts")


# User registration Class
class UserRegistration(CreateView):
    def get(self, request):
        return render(request, "registration/registration.html")

    def post(self, request):
        full_name = request.POST["fullname"]
        user_cc = request.POST["user_cc"]
        email = request.POST["email"]
        phone = request.POST["phone"]
        birthdate = request.POST["birthdate"]
        password1 = request.POST["password"]
        password2 = request.POST["confirm_password"]
        role = '2'

        # Validar los datos del formulario
        if password1 != password2:
            # Los passwords no coinciden
            return render(
                request,
                "registration/registration.html",
                {"error": "Las contraseñas no coinciden"},
            )

        # Crear el usuario
        user = User.objects.create_user(
            user_cc=user_cc,
            password = password1,
            role=role,
            phone=phone,
            email=email,
            birth_date=birthdate,
            full_name=full_name,
        )

        # Guardar el usuario en la base de datos
        user.save()

        return redirect("login")
    

    
class UserListView(ListView):
    model = User
    template_name = 'user/users_list.html'
    context_object_name = 'users'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_name"] = "users"
        temp = UserRole.objects.filter(user=self.request.user).first()
        context["user_role"] = temp.role.name

        return context


class UserCreateView(CreateView):
    template_name = "user/users_form.html"
    form_class = UserForm

    success_url = reverse_lazy("users-list")

    def form_valid(self, form):
        # Realizar las operaciones necesarias antes de guardar el objeto
        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_name"] = "users"
        temp = UserRole.objects.filter(user=self.request.user).first()
        context["user_role"] = temp.role.name
        return context


class UserUpdateView(UpdateView):
    model = User
    template_name = "user/users_form.html"
    form_class = UserForm
    success_url = reverse_lazy("users-list")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_name"] = "users"
        temp = UserRole.objects.filter(user=self.request.user).first()
        context["user_role"] = temp.role.name
        return context


class UserDeleteView(DeleteView):
    model = User
    template_name = "user/users_confirm_delete.html"
    success_url = reverse_lazy("users-list")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_name"] = "users"
        temp = UserRole.objects.filter(user=self.request.user).first()
        context["user_role"] = temp.role.name
        return context
