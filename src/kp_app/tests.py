from django.test import TestCase
from .models import *
from django.core.exceptions import ValidationError
from django.utils import timezone
from datetime import datetime, timedelta

class RoleTestCase(TestCase):
    def setUp(self):
        self.role = Role.objects.create(name="Gerente de Proyecto")

    def test_role_creation(self):
        """Comprueba que se cree correctamente una instancia de Role"""
        self.assertIsInstance(self.role, Role)

    def test_role_name(self):
        """Comprueba que el nombre de Role se almacene correctamente"""
        self.assertEqual(self.role.name, "Gerente de Proyecto")

    def test_role_str(self):
        """Comprueba que el método __str__ de Role devuelva el nombre de la instancia"""
        self.assertEqual(str(self.role), '1 - Gerente de Proyecto')

class UserRoleTestCase(TestCase):

    def setUp(self):
        self.role1 = Role.objects.create(name="Admin")
        self.role2 = Role.objects.create(name="Editor")
        self.user = User.objects.create(
            phone="+573123456789",
            email="user@example.com",
            birth_date=timezone.now().date() - timezone.timedelta(days=365 * 25),
            full_name="John Doe",
            password="password",
            cc="1234567890"
        )
        

    def test_user_roles_can_be_added_and_removed(self):
        # Add a new role to the user
        UserRole.objects.create(user=self.user, role=self.role1)
        self.assertEqual(self.user.roles.count(), 1)
        self.assertEqual(self.user.roles.first(), self.role1)

        # Add another role to the user
        UserRole.objects.create(user=self.user, role=self.role2)
        self.assertEqual(self.user.roles.count(), 2)
        self.assertIn(self.role2, self.user.roles.all())

        # Remove a role from the user
        UserRole.objects.filter(user=self.user, role=self.role1).delete()
        self.assertEqual(self.user.roles.count(), 1)
        self.assertNotIn(self.role1, self.user.roles.all())

    def test_user_can_have_multiple_roles(self):
        UserRole.objects.create(user=self.user, role=self.role1)
        UserRole.objects.create(user=self.user, role=self.role2)
        self.assertEqual(self.user.roles.count(), 2)

    def test_user_role_string_representation(self):
        self.role_user = UserRole.objects.create(user=self.user, role=self.role1)
        self.assertEqual(self.role_user,'1234567890 - Admin')

class UserTestCase(TestCase):
    
    def setUp(self):
        self.user1 = User.objects.create(
            phone='+573123456789',
            email='user1@example.com',
            birth_date='2000-01-01',
            full_name='User 1',
            password='password',
            cc='1234567890'
        )
        
        self.user2 = User.objects.create(
            phone='+573987654321',
            email='user2@example.com',
            birth_date='1995-05-05',
            full_name='User 2',
            password='password',
            cc='0987654321'
        )
        self.role = Role.objects.create(name="Admin")

    def test_create_user(self):
        """Test creating a new user"""
        user = User.objects.create(
            phone='+573333333333',
            email='user3@example.com',
            birth_date='1999-12-31',
            full_name='User 3',
            password='password',
            cc='1111111111'
        )
        self.assertEqual(user.phone, '+573333333333')
        self.assertEqual(user.email, 'user3@example.com')

        self.assertEqual(user.birth_date,'1999-12-31')

        self.assertEqual(user.full_name, 'User 3')
        self.assertEqual(user.password, 'password')
        self.assertEqual(user.cc, '1111111111')

    def test_create_user_with_invalid_phone(self):
        """Test creating a user with an invalid phone number"""
        with self.assertRaises(ValidationError):
            User.objects.create(
                phone='1234567890',
                email='user4@example.com',
                birth_date='1998-01-01',
                full_name='User 4',
                password='password',
                cc='2222222222'
            )

    def test_create_user_with_invalid_email(self):
        """Test creating a user with an invalid email"""
        with self.assertRaises(ValidationError):
            User.objects.create(
                phone='+573123456789',
                email='user5@example',
                birth_date='1990-01-01',
                full_name='User 5',
                password='password',
                cc='3333333333'
            )

    def test_create_user_with_underage_birth_date(self):
        """Test creating a user with an underage birth date"""
        with self.assertRaises(ValidationError):
            User.objects.create(
                phone='+573123456789',
                email='user6@example.com',
                birth_date=timezone.now().date(),
                full_name='User 6',
                password='password',
                cc='4444444444'
            )

    def test_create_user_with_invalid_birth_date(self):
        """Test creating a user with an invalid birth date"""
        with self.assertRaises(ValidationError):
            User.objects.create(
                phone='+573123456789',
                email='user7@example.com',
                birth_date='invalid',
                full_name='User 7',
                password='password',
                cc='5555555555'
            )

    def test_create_user_with_invalid_cc(self):
        """Test creating a user with an invalid CC"""
        with self.assertRaises(ValidationError):
            User.objects.create(
                phone='+573123456789',
                email='user8@example.com',
                birth_date='1990-01-01',
                full_name='User 8',
                password='password',
                cc='12345'
            )


    def test_add_role_to_user(self):
        self.user1.roles.add(self.role)
        user_role = UserRole.objects.filter(user=self.user1, role=self.role).first()
        self.assertIsNotNone(user_role)



class CompanyModelTest(TestCase):
    def setUp(self):
        self.user1 = User.objects.create(
            phone="+573123456789",
            email="user1@test.com",
            birth_date="1990-01-01",
            full_name="User One",
            password="testpassword",
            cc="123456",
        )

    def test_create_company(self):
        company1 = Company.objects.create(
            nit="1234567890",
            phone="+573123456789",
            address="Calle 123",
            name="Test Company",
            user_cc=self.user1,
        )
        self.assertEqual(str(company1), 'Test Company - NIT:  1234567890')

    def test_create_company_with_invalid_nit(self):
        with self.assertRaises(ValidationError):
            Company.objects.create(
                nit="123456",
                phone="+573123456789",
                address="Calle 123",
                name="Test Company",
                user_cc=self.user1,
            )

    def test_create_company_with_invalid_phone(self):
        with self.assertRaises(ValidationError):
            Company.objects.create(
                nit="1234567890",
                phone="1234567890",
                address="Calle 123",
                name="Test Company",
                user_cc=self.user1,
            )

    def test_create_company_without_user(self):
        with self.assertRaises(ValidationError):
            Company.objects.create(
                nit="1234567890",
                phone="1234567890",
                address="Calle 123",
                name="Test Company",
            )

class ProjectModelTestCase(TestCase):
    def setUp(self):
        self.category = Category.objects.create(name="Category 1")
        self.user = User.objects.create(
            phone='+573001234567',
            email='testuser@example.com',
            birth_date=datetime.today().date() - timedelta(days=365 * 20),
            full_name='Test User',
            password='testpassword',
            cc='1234567890'
        )
        self.company = company1 = Company.objects.create(
            nit="1234567890",
            phone="+573123456789",
            address="Calle 123",
            name="Test Company",
            user_cc=self.user,
        )

    def test_project_creation(self):
        project = Project.objects.create(
            name="Test Project",
            objective="Test objective",
            results="Test results",
            reach="Test reach",
            state="Propuesta",
            company_nit=self.company,
            category=self.category,
        )
        self.assertEqual(project.name, 'Test Project')
        self.assertEqual(project.objective, 'Test objective')
        self.assertEqual(project.company_nit, self.company)

    def test_project_string_representation(self):
        project = Project.objects.create(
            name="Test Project",
            objective="Test objective",
            results="Test results",
            reach="Test reach",
            state="Propuesta",
            company_nit=self.company,
            category=self.category,
        )
        self.assertEqual(project, '1 - Objective: Test objective, Company: Test Company')

    def test_project_update(self):
        
        project = Project.objects.create(
            name="Test Project",
            objective="Test objective",
            results="Test results",
            reach="Test reach",
            state="Propuesta",
            company_nit=self.company,
            category=self.category,
        )
        project.name = 'New Test Project Name'
        project.description = 'New Test Project Description'
        project.save()

        self.assertEqual(project.name, 'New Test Project Name')
        self.assertEqual(project.description, 'New Test Project Description')

    def test_project_delete(self):
        self.category2 = Category.objects.create(name="Category 2")
        self.user2 = User.objects.create(
            phone='+573001234567',
            email='user@example.com',
            birth_date=datetime.today().date() - timedelta(days=365 * 20),
            full_name='Test User',
            password='testpassword',
            cc='123456789'
        )
        self.company2 = Company.objects.create(
            nit="1234567891",
            phone="+573123456789",
            address="Calle 123",
            name="Test Company",
            user_cc=self.user2,
        )
        project = Project.objects.create(
            name="Test Project",
            objective="Test objective",
            results="Test results",
            reach="Test reach",
            state="Propuesta",
            company_nit=self.company2,
            category=self.category2,
        )
        project.delete()

        self.assertFalse(Project.objects.filter(name='Test Project').exists())

class ResourceModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        Resource.objects.create(name='Resource 1')

    def test_name_label(self):
        resource = Resource.objects.get(id_resource=1)
        field_label = resource._meta.get_field('name').verbose_name
        self.assertEqual(field_label, 'name')

    def test_name_max_length(self):
        resource = Resource.objects.get(id_resource=1)
        max_length = resource._meta.get_field('name').max_length
        self.assertEqual(max_length, 50)

    def test_name_value(self):
        resource = Resource.objects.get(id_resource=1)
        expected_value = f'{resource.id_resource} - Resource 1'
        self.assertEqual(str(resource), expected_value)

class RequirementModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            phone="+573123456789",
            email="user1@test.com",
            birth_date="1990-01-01",
            full_name="User One",
            password="testpassword",
            cc="123456",
        )
        self.company= Company.objects.create(
            nit="1234567890",
            phone="+573123456789",
            address="Calle 123",
            name="Test Company",
            user_cc=self.user,
        )
        self.category1 = Category.objects.create(name="Category 1")
        self.project = Project.objects.create(
            name="Test Project",
            objective="Test objective",
            results="Test results",
            reach="Test reach",
            state="Propuesta",
            company_nit=self.company,
            category=self.category1,
        )
        self.resource = Resource.objects.create(name="Test Resource")
        self.requirement = Requirement.objects.create(
            project_id=self.project, resource_id=self.resource, objective=100.0
        )

    def test_requirement_creation(self):
        self.assertEqual(self.requirement.project_id, self.project)
        self.assertEqual(self.requirement.resource_id, self.resource)
        self.assertEqual(self.requirement.objective, 100.0)

    def test_requirement_str_representation(self):
        expected_str = f"{self.project.name} - {self.resource.name} (100.0)"
        self.assertEqual(str(self.requirement), expected_str)

    def test_requirement_unique_together(self):
        with self.assertRaises(Exception):
            Requirement.objects.create(
                project_id=self.project, resource_id=self.resource, objective=200.0
            )

class ResourcesBagTestCase(TestCase):
    def setUp(self):

        self.user = User.objects.create(
            phone="+573123456789",
            email="user1@test.com",
            birth_date="1990-01-01",
            full_name="User One",
            password="testpassword",
            cc="123456",
        )
        self.company= Company.objects.create(
            nit="1234567890",
            phone="+573123456789",
            address="Calle 123",
            name="Test Company",
            user_cc=self.user,
        )
        self.category2 = Category.objects.create(name="Category 2")
        self.project = Project.objects.create(
            name="Test Project",
            objective="Test objective",
            results="Test results",
            reach="Test reach",
            state="Propuesta",
            company_nit=self.company,
            category=self.category2,
        )
        self.resource = Resource.objects.create(name="Resource Test")
        self.resources_bag = ResourcesBag.objects.create(
            project_id=self.project, resource_id=self.resource, amount=100
        )

    def test_resources_bag_str(self):
        self.assertEqual(
            str(self.resources_bag), 'Test Project - Resource Test (100)'
        )


    def test_resources_bag_fields(self):
        self.assertIsNotNone(self.resources_bag.project_id)
        self.assertIsNotNone(self.resources_bag.resource_id)
        self.assertIsNotNone(self.resources_bag.amount)

class BinnacleTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            phone="+573123456789",
            email="user@example.com",
            birth_date=timezone.now().date() - timezone.timedelta(days=365 * 25),
            full_name="John Doe",
            password="password",
            cc="1234567890"
        )
        self.company = Company.objects.create(
            nit="123456789",
            phone="+573123456789",
            address="Cra. 1 #1-1",
            name="Test Company",
            user_cc=self.user
        )
        self.category1 = Category.objects.create(name="Category 1")
        self.project = Project.objects.create(
            name="Test Project",
            objective="Test objective",
            results="Test results",
            reach="Test reach",
            state="Propuesta",
            company_nit=self.company,
            category=self.category1,
        )

    def test_create_binnacle(self):
        binnacle = Binnacle.objects.create(
            date=date.today(),
            description="Test description",
            project_id=self.project,
            user_cc=self.user,
        )
        self.assertEqual(Binnacle.objects.count(), 1)

    def test_create_binnacle_invalid_date(self):
        with self.assertRaises(ValidationError):
            Binnacle.objects.create(
                date="invalid_date",
                description="Test description",
                project_id=self.project,
                user_cc=self.user,
            )

    def test_create_binnacle_missing_description(self):
        with self.assertRaises(ValidationError):
            Binnacle.objects.create(
                date=date.today(),
                project_id=self.project,
                user_cc=self.user,
            )

    def test_create_binnacle_missing_project_id(self):
        with self.assertRaises(ValidationError):
            Binnacle.objects.create(
                date=date.today(),
                description="Test description",
                user_cc=self.user,
            )

    def test_create_binnacle_missing_user_cc(self):
        with self.assertRaises(ValidationError):
            Binnacle.objects.create(
                date=date.today(),
                description="Test description",
                project_id=self.project,
            )

    def test_create_binnacle_invalid_user_cc(self):
        with self.assertRaises(ValueError):
            Binnacle.objects.create(
                date=date.today(),
                description="Test description",
                project_id=self.project,
                user_cc=User.objects.create(
                    username="testuser2",
                    email="testuser2@example.com",
                    password="testpass"
                ),
            )