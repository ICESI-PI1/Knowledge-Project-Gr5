from django.test import TestCase
from apps.app_users.models import *
from apps.app_users.views import *
from django.contrib.auth import authenticate, login
from django.test import RequestFactory, TestCase
from django.urls import reverse
from django.shortcuts import render, redirect



class UserModelTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            user_cc="1234567890",
            full_name="John Doe",
            email="johndoe@example.com",
            phone="1234567890",
            birth_date="1990-01-01",
            password="testpassword"
        )

    def test_user_creation(self):
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(self.user.user_cc, "1234567890")
        self.assertEqual(self.user.full_name, "John Doe")
        self.assertEqual(self.user.email, "johndoe@example.com")
        self.assertEqual(self.user.phone, "1234567890")
        self.assertEqual(str(self.user.birth_date), "1990-01-01")
        self.assertFalse(self.user.is_staff)
        self.assertTrue(self.user.is_active)

    def test_user_str_representation(self):
        self.assertEqual(str(self.user), "John Doe")

class RoleModelTestCase(TestCase):
    def setUp(self):
        self.role = Role.objects.create(name="Admin")

    def test_role_creation(self):
        self.assertEqual(Role.objects.count(), 1)
        self.assertEqual(self.role.name, "Admin")

    def test_role_str_representation(self):
        self.assertEqual(str(self.role), "1 - Name:  Admin")

class UserRoleModelTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            user_cc="1234567890",
            full_name="John Doe",
            email="johndoe@example.com",
            phone="1234567890",
            birth_date="1990-01-01",
        )
        self.role = Role.objects.create(name="Admin")
        self.user_role = UserRole.objects.create(user=self.user, role=self.role)

    def test_user_role_creation(self):
        self.assertEqual(UserRole.objects.count(), 1)
        self.assertEqual(self.user_role.user, self.user)
        self.assertEqual(self.user_role.role, self.role)

    def test_user_role_str_representation(self):
        expected_str = f"{self.user.full_name} - Rol: {self.role.name}"
        self.assertEqual(str(self.user_role), expected_str)

class LoginViewTestCase(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.view = LoginView.as_view()
        self.template_name = "registration/login.html"
        self.user_cc = "1234567890"
        self.password = "123"
        self.user = User.objects.create_user(
            user_cc=self.user_cc,
            password=self.password,
            full_name="John Doe",
            email="johndoe@example.com",
            phone="1234567890",
            birth_date="1990-01-01",
        )
        self.user.save()

    def test_get(self):
        request = self.factory.get(reverse("login"))
        response = self.view(request)
        self.assertEqual(response.status_code, 200)


    def test_post_authentication_success(self):
        response = self.client.post(
            reverse("login"), data={"username": self.user_cc, "password": self.password}
        )
        self.assertEqual(response.status_code, 302)  # Redirect status code


    def test_post_authentication_failure(self):
        invalid_credentials = {"username": "invaliduser", "password": "invalidpassword"}
        response = self.client.post(reverse("login"), data=invalid_credentials)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, self.template_name)


class UserRegistrationTestCase(TestCase):
    def test_user_registration(self):
        # Crea un diccionario con los datos del formulario
        data = {
            "fullname": "John Doe",
            "user_cc": "123456789",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "birthdate": "1990-01-01",
            "password": "password123",
            "confirm_password": "password123",
        }
        Role.objects.create(name='1')
        Role.objects.create(name='2')
        # Realiza la solicitud POST a la vista de registro
        response = self.client.post(reverse("register_user"), data=data)

        # Verifica que se redirija a la página de inicio de sesión
        self.assertRedirects(response, reverse("login"))

        # Verifica que se haya creado un nuevo usuario en la base de datos
        self.assertTrue(User.objects.filter(user_cc="123456789").exists())