from django.test import TestCase
from apps.app_users.models import *
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