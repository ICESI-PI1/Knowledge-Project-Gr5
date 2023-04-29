from typing import Any
from django.http import HttpRequest, HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth import logout, login, authenticate
from .models import User
from django.contrib.auth.hashers import make_password
from django.urls import reverse_lazy
from django.views.generic import CreateView, ListView, DeleteView, UpdateView
from django.views import View
from .backends import LoginBackend


class LoginView(View):
    template_name = "registration/login.html"

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)

    def post(self, request, *args, **kwargs):
        # Obtener los datos del formulario enviado
        cedula = request.POST.get("username")
        password = request.POST.get("password")

        # Autenticar al usuario
        user = authenticate(request =request,cedula=cedula, password=password, backend=LoginBackend())

        # Verificar si la autenticación fue exitosa
        if user is not None:
            print(f"User is not None")
            # Iniciar sesión
            login(request, user)
            # Redirigir al usuario a la página de inicio
            return LoginBackend.login_success()
        else:
            print("Cédula o contraseña incorrectas. Por favor, inténtalo de nuevo")
            # Mostrar un mensaje de error en caso de que la autenticación falle
            error_message = (
                "Cédula o contraseña incorrectas. Por favor, inténtalo de nuevo."
            )
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

        print(f"POST:\n{request.POST}")

        # Validar los datos del formulario
        if password1 != password2:
            # Los passwords no coinciden
            return render(
                request,
                "registration/registration.html",
                {"error": "Las contraseñas no coinciden"},
            )

        # Crear el usuario
        user = User.objects.create(
            phone=phone,
            email=email,
            password = make_password(password1),
            birth_date=birthdate,
            full_name=full_name,
            cc=user_cc,
        )

        # Guardar el usuario en la base de datos
        user.save()

        return redirect("login")
