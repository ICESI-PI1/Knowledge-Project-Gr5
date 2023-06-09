from django.test import TestCase, Client
from django.urls import reverse
from django.db import IntegrityError
from apps.app_projects.models import *
from apps.app_users.models import *
from datetime import *
from decimal import Decimal
import io
from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.exceptions import ObjectDoesNotExist

# ------------------- Models -----------------------


class CompanyModelTestCase(TestCase):

    def setUp(self):
        self.company = Company.objects.create(
            nit='1234567890',
            name='Test Company',
            address='ddf',
            phone='+573001234567'
        )

    def test_company_creation(self):
        self.assertEqual(self.company.name, 'Test Company')
        self.assertEqual(self.company.phone, '+573001234567')
        self.assertEqual(self.company.address, 'ddf')
        self.assertEqual(self.company.nit, '1234567890')

    def test_company_str_representation(self):
        expected_str = 'Test Company - NIT:  1234567890'
        self.assertEqual(self.company.__str__(), expected_str)

    def test_company_nit_validation(self):

        # Test invalid NIT with more than 10 digits
        with self.assertRaises(ValidationError):
            Company.full_clean(Company.objects.create(
                nit='12345678899',
                name='Test Company',
                address='ddf',
                phone='+573001234567'
            ))

    def test_company_phone_validation(self):
        # Test valid phone number
        self.company.phone = "123456789"
        self.company.save()
        self.assertEqual(self.company.phone, "123456789")

        # Test invalid phone number with less than 8 digits
        with self.assertRaises(ValidationError):
            Company.full_clean(Company.objects.create(
                nit='1234567891',
                name='Test Company',
                address='ddf',
                phone='1234567'
            ))

        # Test invalid phone number with more than 10 digits
        with self.assertRaises(ValidationError):
            Company.full_clean(Company.objects.create(
                nit='1234567892',
                name='Test Company',
                address='ddf',
                phone='1234567891011'
            ))


class CategoryModelTestCase(TestCase):
    def setUp(self):
        self.category = Category.objects.create(
            name="Test Category",
            photo="path/to/photo.jpg"
        )

    def test_category_str_representation(self):
        expected_str = "1 - Name: Test Category"
        self.assertEqual(str(self.category), expected_str)

    def test_category_photo_upload(self):
        self.assertEqual(self.category.photo, "path/to/photo.jpg")

    def test_category_photo_upload_blank(self):
        category = Category.objects.create(
            name="Blank Photo Category",
            photo=""
        )
        self.assertEqual(category.photo, "")

    def test_category_photo_upload_null(self):
        category = Category.objects.create(
            name="Null Photo Category",
            photo=None
        )
        self.assertEqual(category.photo, None)


class ProjectModelTestCase(TestCase):
    def setUp(self):
        self.category = Category.objects.create(
            name="Test Category",
            photo="path/to/photo.jpg"
        )
        self.company = Company.objects.create(
            nit="1234567890",
            phone="123456789",
            address="Test Address",
            name="Test Company"
        )
        self.project = Project.objects.create(
            title="Test Project",
            objective="Test Objective",
            results="Test Results",
            reach="Test Reach",
            company_nit=self.company,
            category=self.category
        )

    def test_project_str_representation(self):
        expected_str = f"{self.project.id_project} - Objective: Test Objective, Company: Test Company"
        self.assertEqual(str(self.project), expected_str)

    def test_project_state_default(self):
        self.assertEqual(self.project.state, "Propuesta")

    def test_project_state_choices(self):
        with self.assertRaises(ValidationError):
            Project.full_clean(
                Project.objects.create(
                    title="Test Project",
                    objective="Test Objective",
                    results="Test Results",
                    reach="Test Reach",
                    company_nit=self.company,
                    category=self.category,
                    state="otro"
                )
            )
        choices = (
            ("Propuesta", "Propuesta"),
            ("En convocatoria", "En convocatoria"),
            ("En factory", "En factory")
        )
        self.assertEqual(self.project.STATE_CHOICES, choices)


class AnnouncementModelTestCase(TestCase):
    def setUp(self):
        self.category = Category.objects.create(
            name="Test Category",
            photo="path/to/photo.jpg"
        )
        self.valid_announcement = Announcement.objects.create(
            init_date=datetime.now().date(),
            end_date=datetime.now().date() + timedelta(days=10),
            category=self.category
        )

    def test_valid_announcement(self):
        self.assertTrue(isinstance(self.valid_announcement, Announcement))

    def test_null_init_date(self):
        with self.assertRaises(IntegrityError):
            Announcement.full_clean(
                Announcement.objects.create(
                    init_date=None,
                    end_date=datetime.now().date() + timedelta(days=10),
                    category=self.category
                )
            )

    def test_null_init_date(self):
        with self.assertRaises(IntegrityError):
            Announcement.full_clean(
                Announcement.objects.create(
                    init_date=datetime.now().date(),
                    end_date=None,
                    category=self.category
                )
            )

    def test_init_date_not_past(self):
        with self.assertRaises(ValidationError):
            Announcement.full_clean(
                Announcement.objects.create(
                    init_date=datetime.now().date() - timedelta(days=1),
                    end_date=datetime.now().date() + timedelta(days=10),
                    category=self.category
                )
            )

    def test_end_date_after_init_date(self):
        with self.assertRaises(ValidationError):
            Announcement.full_clean(
                Announcement.objects.create(
                    init_date=datetime.now().date(),
                    end_date=datetime.now().date() - timedelta(days=10),
                    category=self.category
                )
            )

    def test_duration_between_3_and_30_days(self):
        with self.assertRaises(ValidationError):
            Announcement.full_clean(
                Announcement.objects.create(
                    init_date=datetime.now().date(),
                    end_date=datetime.now().date() + timedelta(days=2),
                    category=self.category
                )
            )

        with self.assertRaises(ValidationError):
            Announcement.full_clean(
                Announcement.objects.create(
                    init_date=datetime.now().date(),
                    end_date=datetime.now().date() + timedelta(days=31),
                    category=self.category
                )
            )


class AnnouncementProjectModelTestCase(TestCase):
    def setUp(self):
        self.category = Category.objects.create(name='Test Category')
        self.company = Company.objects.create(
            nit='1234567890',
            phone='1234567890',
            address='Test Address',
            name='Test Company'
        )
        self.project = Project.objects.create(
            title='Test Project',
            objective='Test Objective',
            results='Test Results',
            reach='Test Reach',
            company_nit=self.company,
            category=self.category
        )
        self.announcement = Announcement.objects.create(
            init_date=datetime.now().date(),
            end_date=datetime.now().date() + timedelta(days=10),
            category=self.category
        )
        self.announcement_project = AnnouncementProject.objects.create(
            announcement=self.announcement,
            project=self.project
        )

    def test_valid_announcement_project(self):
        self.assertTrue(isinstance(
            self.announcement_project, AnnouncementProject))

    def test_announcement_cascade_delete(self):
        announcement_id = self.announcement.id_announ
        self.announcement.delete()
        with self.assertRaises(AnnouncementProject.DoesNotExist):
            AnnouncementProject.objects.get(announcement_id=announcement_id)

    def test_project_cascade_delete(self):
        project_id = self.project.id_project
        self.project.delete()
        with self.assertRaises(AnnouncementProject.DoesNotExist):
            AnnouncementProject.objects.get(project_id=project_id)


class ResourceModelTestCase(TestCase):
    def setUp(self):
        Resource.objects.create(name="Resource 1")
        Resource.objects.create(name="Resource 2")

    def test_resource_str(self):
        resource = Resource.objects.get(name="Resource 1")
        self.assertEqual(str(resource), "1 - Resource 1")

    def test_resource_id(self):
        resource = Resource.objects.get(name="Resource 2")
        self.assertEqual(resource.id_resource, 2)


class RequirementModelTestCase(TestCase):
    def setUp(self):
        self.category = Category.objects.create(name='Test Category')
        self.company = Company.objects.create(
            nit='1234567890',
            phone='1234567890',
            address='Test Address',
            name='Test Company'
        )
        self.project = Project.objects.create(
            title='Test Project',
            objective='Test Objective',
            results='Test Results',
            reach='Test Reach',
            company_nit=self.company,
            category=self.category
        )
        self.resource = Resource.objects.create(name='Test Resource')
        self.requirement = Requirement.objects.create(
            project_id=self.project, resource_id=self.resource, objective=10.5)

    def test_requirement_creation(self):
        self.assertEqual(self.requirement.project_id, self.project)
        self.assertEqual(self.requirement.resource_id, self.resource)
        self.assertEqual(self.requirement.objective, 10.5)

    def test_requirement_unique_together(self):
        with self.assertRaises(IntegrityError):
            Requirement.objects.create(
                project_id=self.project, resource_id=self.resource, objective=5.0)

    def test_requirement_str_representation(self):
        expected_str = f"{self.project.title} - {self.resource.name} (10.5)"
        self.assertEqual(str(self.requirement), expected_str)


class ResourcesBagModelTestCase(TestCase):
    def setUp(self):
        self.category = Category.objects.create(name='Test Category')
        self.company = Company.objects.create(
            nit='1234567890',
            phone='1234567890',
            address='Test Address',
            name='Test Company'
        )
        self.project = Project.objects.create(
            title='Test Project',
            objective='Test Objective',
            results='Test Results',
            reach='Test Reach',
            company_nit=self.company,
            category=self.category
        )
        self.resource = Resource.objects.create(name='Test Resource')
        self.resources_bag = ResourcesBag.objects.create(
            project_id=self.project, resource_id=self.resource, amount=100.0)

    def test_resources_bag_creation(self):
        self.assertEqual(self.resources_bag.project_id, self.project)
        self.assertEqual(self.resources_bag.resource_id, self.resource)
        self.assertEqual(self.resources_bag.amount, 100.0)

    def test_resources_bag_unique_together(self):
        with self.assertRaises(IntegrityError):
            ResourcesBag.objects.create(
                project_id=self.project, resource_id=self.resource, amount=50.0)

    def test_resources_bag_str_representation(self):
        expected_str = f"{self.project.title} - {self.resource.name} (100.0)"
        self.assertEqual(self.resources_bag.__str__(), expected_str)


class DonationModelTestCase(TestCase):
    def setUp(self):
        self.company = Company.objects.create(
            nit="123456789",
            phone="12345678",
            address="Dirección de la compañía",
            name="Nombre de la compañía",
        )
        self.resource = Resource.objects.create(
            name="Nombre del recurso"
        )
        self.category = Category.objects.create(name='Test Category')
        self.project = Project.objects.create(
            title="Título del proyecto",
            objective="Objetivo del proyecto",
            results="Resultados del proyecto",
            reach="Alcance del proyecto",
            company_nit=self.company,
            category=self.category
        )
        self.requirement = Requirement.objects.create(
            project_id=self.project,
            resource_id=self.resource,
            objective=100.0
        )
        self.resources_bag = ResourcesBag.objects.create(
            project_id=self.project,
            resource_id=self.resource,
            amount=50.0
        )

    def test_valid_donation(self):
        donation = Donation(
            company_nit=self.company,
            resource_id=self.resource,
            amount=30.0,
            project_id=self.project,
            description="Descripción de la donación",
        )
        donation.full_clean()  # No debe generar ninguna excepción
        donation.save()

        self.assertEqual(Donation.objects.count(), 1)

    def test_invalid_donation_not_required_resource(self):
        donation = Donation(
            company_nit=self.company,
            resource_id=Resource.objects.create(name="Otro recurso"),
            amount=30.0,
            project_id=self.project,
            description="Descripción de la donación",
        )

        with self.assertRaises(ValidationError):
            donation.full_clean()

    def test_invalid_donation_exceeds_requirement(self):
        donation = Donation(
            company_nit=self.company,
            resource_id=self.resource,
            amount=80.0,
            project_id=self.project,
            description="Descripción de la donación",
        )

        with self.assertRaises(ValidationError):
            donation.full_clean()

    def test_str_representation(self):
        donation = Donation(
            company_nit=self.company,
            resource_id=self.resource,
            amount=30.0,
            project_id=self.project,
            description="Descripción de la donación",
        )
        self.assertEqual(
            str(donation),
            " Donación de Nombre de la compañía - Nombre del recurso (30.0)"
        )


class UserCompanyModelTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            user_cc="1234567890",
            full_name="John Doe",
            email="johndoe@example.com",
            phone="1234567890",
            birth_date="1990-01-01",
            password="testpassword"
        )
        self.company = Company.objects.create(
            nit="123456789",
            phone="12345678",
            address="Dirección de la compañía",
            name="Nombre de la compañía",
        )

    def test_user_company_creation(self):
        user_company = UserCompany.objects.create(
            user=self.user,
            company=self.company
        )

        self.assertEqual(UserCompany.objects.count(), 1)
        self.assertEqual(user_company.user, self.user)
        self.assertEqual(user_company.company, self.company)

# ------------------- Views -----------------------


class HomeViewTestCase(TestCase):
    def setUp(self):
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
        self.role1 = Role.objects.create(name="admin")
        self.user_role = UserRole.objects.create(
            user=self.user, role=self.role1)

    def test_home_view_authenticated_user(self):
        self.client.login(username=self.user_cc, password=self.password)
        response = self.client.get(reverse("home"))
        self.assertEqual(response.status_code, 200)

    def test_home_view_unauthenticated_user(self):
        response = self.client.get(reverse("home"))
        self.assertEqual(response.status_code, 302)


class UserDetailViewTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.user_cc = "1234567890"
        self.password = "123"
        self.user = User.objects.create_user(
            user_cc=self.user_cc,
            password=self.password,
            full_name="John Doe",
            email="johndoe@example.com",
            phone="1234567890",
            birth_date="1990-01-01",
            photo="path/to/photo.jpg",
        )
        self.user.save()
        self.resource_create_url = reverse("resources-create")
        self.role1 = Role.objects.create(name="admin")
        self.user_role = UserRole.objects.create(
            user=self.user, role=self.role1)
        self.url = reverse('user_detail')

    def test_user_detail_view(self):
        # Iniciar sesión con el usuario de prueba
        self.client.login(username=self.user_cc, password=self.password)

        # Verificar que se pueda acceder correctamente a la vista
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'user/detailUser.html')

        # Verificar que los datos del usuario se muestren correctamente en la vista
        self.assertContains(response, self.user.full_name)
        self.assertContains(response, self.user.email)
        self.assertContains(response, self.user.phone)
        self.assertContains(response, self.user.user_cc)


class ResourceListViewTestCase(TestCase):
    def setUp(self):
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
        self.role1 = Role.objects.create(name="admin")
        self.user_role = UserRole.objects.create(
            user=self.user, role=self.role1)
        self.resource1 = Resource.objects.create(name="Name of Resource 1")
        self.resource2 = Resource.objects.create(name="Name of Resource 2")

    def test_resource_list_view_authenticated_user(self):
        self.client.login(username=self.user_cc, password=self.password)
        response = self.client.get(reverse("resources-list"))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "1")
        self.assertContains(response, "2")
        self.assertContains(response, "Name of Resource 1")
        self.assertContains(response, "Name of Resource 2")

    def test_resource_list_view_unauthenticated_user(self):
        response = self.client.get(reverse("resources-list"))
        self.assertEqual(response.status_code, 302)


class ResourceCreateViewTestCase(TestCase):
    def setUp(self):
        self.client = Client()
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
        self.resource_create_url = reverse("resources-create")
        self.role1 = Role.objects.create(name="admin")
        self.user_role = UserRole.objects.create(
            user=self.user, role=self.role1)

    def test_resource_create_view_success(self):
        self.client.login(username=self.user_cc, password=self.password)
        data = {
            "name": "Test Resource"
        }
        response = self.client.post(self.resource_create_url, data)
        self.assertEqual(response.status_code, 302)  # Should redirect
        # Should create a new resource
        self.assertEqual(Resource.objects.count(), 1)


class ResourceUpdateViewTestCase(TestCase):
    def setUp(self):
        self.client = Client()
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
        self.role1 = Role.objects.create(name="admin")
        self.user_role = UserRole.objects.create(
            user=self.user, role=self.role1)
        self.resource = Resource.objects.create(
            name="Test Resource"
        )

    def test_resource_update_view_accessible_by_admin(self):
        self.client.login(username=self.user_cc, password=self.password)
        response = self.client.get(
            reverse("resources-update", args=[self.resource.pk]))
        self.assertEqual(response.status_code, 200)

    def test_resource_update_view_redirects_to_resource_list_on_successful_update(self):
        self.client.login(username=self.user_cc, password=self.password)

        response = self.client.post(
            reverse("resources-update", args=[self.resource.pk]),
            {
                "name": "Updated Test Resource",
            },
        )
        self.assertRedirects(response, reverse("resources-list"))
        self.assertEqual(Resource.objects.get(
            pk=self.resource.pk).name, "Updated Test Resource")


class ResourceDeleteViewTestCase(TestCase):
    def setUp(self):
        self.client = Client()
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
        self.role1 = Role.objects.create(name="admin")
        self.user_role = UserRole.objects.create(
            user=self.user, role=self.role1)
        self.resource = Resource.objects.create(name='Test Resource')
        self.url = reverse('resources-delete', kwargs={'pk': self.resource.pk})
        self.client.force_login(self.user_role.user)

    def test_get_request(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(
            response, 'projects/resources/resource_confirm_delete.html')

    def test_delete_resource(self):
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, 302)
        self.assertFalse(Resource.objects.filter(pk=self.resource.pk).exists())


class CategoryListViewTestCase(TestCase):
    def setUp(self):
        self.client = Client()
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
        self.role1 = Role.objects.create(name="admin")
        self.user_role = UserRole.objects.create(
            user=self.user, role=self.role1)
        self.client.force_login(self.user_role.user)
        self.category = Category.objects.create(name='Test Category')
        self.client.force_login(self.user)

    def test_category_list_view(self):
        url = reverse('categories-list')
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(
            response, 'projects/categories/categories_list.html')
        self.assertContains(response, self.category.name)


class CategoryCreateViewTestCase(TestCase):
    def setUp(self):
        self.client = Client()
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
        self.role1 = Role.objects.create(name="admin")
        self.user_role = UserRole.objects.create(
            user=self.user, role=self.role1)
        self.client.force_login(self.user_role.user)
        self.category = Category.objects.create(name='Test Category')
        self.category_create_url = reverse("categories-create")
        self.client.force_login(self.user)

    def test_create_category(self):
        data = {
            "name": "Test Category"
        }
        beforepost = Category.objects.count()
        response = self.client.post(self.category_create_url, data)
        self.assertEqual(response.status_code, 302)  # Should redirect
        self.assertRedirects(response, reverse("categories-list"))
        # Should create a new resource
        self.assertEqual((Category.objects.count()-1), beforepost)

    def tearDown(self):
        self.user.delete()


class CategoryUpdateViewTest(TestCase):
    def setUp(self):
        self.client = Client()
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
        self.role1 = Role.objects.create(name="admin")
        self.user_role = UserRole.objects.create(
            user=self.user, role=self.role1)
        self.client.force_login(self.user_role.user)
        self.category = Category.objects.create(name='Test Category')
        self.client.force_login(self.user)

    def test_view_url_accessible(self):
        # Comprueba que se puede acceder a la URL de actualización de categorías
        response = self.client.get(reverse('categories-update', args=[1]))
        self.assertEqual(response.status_code, 200)

    def test_view_uses_correct_template(self):
        # Comprueba que se está utilizando el template correcto para la vista
        response = self.client.get(reverse('categories-update', args=[1]))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(
            response, 'projects/categories/categories_form.html')

    def test_view_redirects_on_success(self):
        # Comprueba que después de actualizar la categoría, se redirige a la lista de categorías
        data = {
            "name": "Test Category"
        }
        response = self.client.post(
            reverse('categories-update', args=[1]), data)
        self.assertRedirects(response, reverse('categories-list'))


class CategoryDeleteViewTestCase(TestCase):
    def setUp(self):
        self.client = Client()
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
        self.role1 = Role.objects.create(name="admin")
        self.user_role = UserRole.objects.create(
            user=self.user, role=self.role1)
        self.client.force_login(self.user_role.user)
        self.category = Category.objects.create(name='Test Category')
        self.client.force_login(self.user)
        self.url = reverse('categories-delete',
                           args=[self.category.id_category])

    def test_category_delete_view_get(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(
            response, 'projects/categories/categories_confirm_delete.html')

    def test_category_delete_view_post(self):
        # Test that the category is deleted after post request
        self.assertEqual(Category.objects.count(), 1)
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, 302)
        self.assertEqual(Category.objects.count(), 0)

    def test_category_delete_view_post_redirect(self):
        # Test that after deleting the category, the view redirects to the success URL
        response = self.client.post(self.url)
        self.assertRedirects(response, reverse('categories-list'))


class TestCreateCompanyView(TestCase):
    def setUp(self):
        self.client = Client()
        image = io.BytesIO()
        image.write(b'some image content')
        image.seek(0)
        self.url = reverse('register_company')
        self.context = {
            "Name": "Facebook",
            "Nit": "9007105256",
            "Adress": "CARRERA 11 79 35 P 9, BOGOTA, BOGOTA",
            "Phone": "6013832120",
            "Logo": SimpleUploadedFile('image.jpg', image.read()),
        }

    def testGet(self):
        response = self.client.get(reverse('register_company'))
        self.assertEqual(response.status_code, 302)

    def testPost(self):
        response = self.client.post(self.url, self.context)
        self.assertEqual(response.status_code, 302)


class DonationCreateViewTestCase(TestCase):
    def setUp(self):
        self.client = Client()
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
        self.category = Category.objects.create(
            name="Test Category",
            photo="path/to/photo.jpg"
        )
        self.company = Company.objects.create(
            nit='1234567890',
            phone='1234567890',
            address='Test Address',
            name='Test Company'
        )
        self.project = Project.objects.create(
            title='Test Project',
            objective='Test Objective',
            results='Test Results',
            reach='Test Reach',
            company_nit=self.company,
            category=self.category
        )
        self.resource = Resource.objects.create(name='Test Resource')
        self.resourceBag = ResourcesBag.objects.create(project_id=self.project,
                                                       resource_id=self.resource,
                                                       amount=0.0)
        self.resourceBag.save()
        self.requirement = Requirement.objects.create(project_id=self.project,
                                                      resource_id=self.resource,
                                                      objective=10.0)
        self.requirement.save()
        self.role1 = Role.objects.create(name="admin")
        self.user_role = UserRole.objects.create(
            user=self.user, role=self.role1)
        self.url = reverse('donation-create', args=[self.project.pk])
        self.client.login(username=self.user_cc, password=self.password)

    def test_donation_create(self):
        data = {
            'company_nit': self.company.nit,
            'resource_id': self.resource.id_resource,
            'amount': 3.0,
            'project_id': self.project.id_project,
            'description': 'Donation added',
        }
        response = self.client.post(self.url, data=data)
        self.assertEqual(response.status_code, 302)
        self.assertEqual(Donation.objects.count(), 1)
        donation = Donation.objects.first()
        self.assertEqual(donation.company_nit, self.company)
        self.assertEqual(donation.resource_id, self.resource)
        self.assertEqual(donation.amount, Decimal('3.0'))
        self.assertEqual(donation.project_id.id_project,
                         self.project.id_project)
        self.assertEqual(donation.description, 'Donation added')
        self.assertEqual(ResourcesBag.objects.get(
            project_id=donation.project_id.id_project, resource_id=self.resource.id_resource).amount, 3.0)

    def test_donation_create_invalid_data(self):
        data = {
            'company_nit': self.company.nit,
            'resource_id': self.resource.id_resource,
            'amount': 20.0,
            'project_id': self.project.id_project,
            'description': 'Invalid donation',
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, 302)
        self.assertEqual(Donation.objects.count(), 0)
        self.assertEqual(self.resourceBag.amount, Decimal('0.0'))
        
class DonationListViewTestCase(TestCase):

    def setUp(self):
        self.client = Client()
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
        self.category = Category.objects.create(
            name="Test Category",
            photo="path/to/photo.jpg"
        )
        self.company = Company.objects.create(
            nit='1234567890',
            phone='1234567890',
            address='Test Address',
            name='Test Company'
        )
        self.project = Project.objects.create(
            title='Test Project',
            objective='Test Objective',
            results='Test Results',
            reach='Test Reach',
            company_nit=self.company,
            category=self.category
        )
        self.resource = Resource.objects.create(name='Test Resource')
        self.resourceBag = ResourcesBag.objects.create(project_id=self.project,
                                                       resource_id=self.resource,
                                                       amount=0.0)
        self.resourceBag.save()
        self.requirement = Requirement.objects.create(project_id=self.project,
                                                      resource_id=self.resource,
                                                      objective=10.0)
        self.requirement.save()
        self.role1 = Role.objects.create(name="admin")
        self.user_role = UserRole.objects.create(
            user=self.user, role=self.role1)
        self.url = reverse('donation-create', args=[self.project.pk])
        self.client.login(username=self.user_cc, password=self.password)
        self.donation_1 = Donation.objects.create(
            company_nit = self.company,
            resource_id = self.resource,
            amount = 20.0,
            project_id = self.project,
            description = 'Donation1',
        )

    def test_donation_list_view(self):
        url = reverse('donations-list', kwargs={'pk': self.project.id_project})
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(
            response, 'projects/donations/donations_list.html')

class AnnouncementCategoriesListViewTestCase(TestCase):
    def setUp(self):
        self.client = Client()
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
        self.role = Role.objects.create(name="Role Test")
        self.user_role = UserRole.objects.create(
            user=self.user, role=self.role)
        self.category = Category.objects.create(name="Test Category")
        self.announcement = Announcement.objects.create(init_date=datetime.now(
        ), end_date=datetime.now()+timedelta(days=10), category=self.category)
        self.client.force_login(self.user)

    def test_get(self):
        # Realizar la solicitud GET a la vista de lista de categorías de anuncios
        response = self.client.get(reverse("announcements-categories"))

        # Verificar que la respuesta tenga un código de estado exitoso (200)
        self.assertEqual(response.status_code, 200)

        # Verificar que el template utilizado sea "projects/announcements/announcements_select_category.html"
        self.assertTemplateUsed(
            response, "projects/announcements/announcements_select_category.html")

        # Verificar que el contexto contenga una lista de anuncios
        self.assertIn("announcements", response.context)

        # Verificar que el contexto contenga el nombre de la página como "announcement"
        self.assertEqual(response.context["page_name"], "announcement")

        # Verificar que el contexto contenga el rol del usuario
        self.assertIn("user_role", response.context)

        # Verificar que el contexto contenga el nombre completo del usuario
        self.assertIn("user_name", response.context)

        # Verificar que el contexto contenga una lista de categorías de anuncios
        self.assertIn("categories", response.context)

    def test_get_context_data(self):
        # Realizar la solicitud GET a la vista de lista de categorías de anuncios
        response = self.client.get(reverse("announcements-categories"))

        # Verificar que el contexto contenga una lista de categorías de anuncios
        self.assertIn("categories", response.context)

        # Verificar que la lista de categorías de anuncios en el contexto sea igual a todas las categorías en la base de datos
        self.assertQuerysetEqual(
            response.context["categories"], Category.objects.all(), ordered=False)


class AnnouncementCreateViewTestCase(TestCase):
    def setUp(self):
        self.client = Client()
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
        self.category = Category.objects.create(name="Test Category")
        self.role = Role.objects.create(name="Role Test")
        self.user_role = UserRole.objects.create(
            user=self.user, role=self.role)
        self.client.force_login(self.user)

    def test_get(self):
        # Realizar la solicitud GET a la vista de creación de anuncios
        response = self.client.get(reverse("announcements-create"))

        # Verificar que la respuesta tenga un código de estado exitoso (200)
        self.assertEqual(response.status_code, 200)

    def test_post(self):
        # Crear un diccionario con los datos del formulario de anuncio
        form_data = {
            "init_date": "2023-05-10",
            "end_date": "2023-05-20",
            "category": self.category,  # ID de la categoría del anuncio
            # Agrega otros campos requeridos en el formulario de anuncio según sea necesario
        }

        # Realizar la solicitud POST a la vista de creación de anuncios
        response = self.client.post(
            reverse("announcements-create"), data=form_data)

        # Verificar que la respuesta redirija a la URL de éxito (announcements-list)
        self.assertEqual(response.status_code, 200)

        self.assertTrue(Announcement.objects.filter(
            category=self.category) != None)

    def test_get_context_data(self):
        # Realizar la solicitud GET a la vista de creación de anuncios
        response = self.client.get(reverse("announcements-create"))

        # Verificar que el contexto contenga el nombre de la página como "announcement"
        self.assertEqual(response.context["page_name"], "announcement")

        # Verificar que el contexto contenga el rol del usuario
        self.assertIn("user_role", response.context)


class AnnouncementUpdateViewTestCase(TestCase):
    def setUp(self):
        self.client = Client()
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

        self.category = Category.objects.create(name="Test Category")
        self.role = Role.objects.create(name="Role Test")
        self.user_role = UserRole.objects.create(
            user=self.user, role=self.role)
        self.announcement = Announcement.objects.create(
            init_date=datetime.now(),
            end_date=datetime.now() + timedelta(days=10),
            category=self.category
        )
        self.client.force_login(self.user)

    def test_get(self):
        # Realizar la solicitud GET a la vista de actualización de anuncios
        response = self.client.get(
            reverse("announcements-update", args=[self.announcement.id_announ]))

        # Verificar que la respuesta tenga un código de estado exitoso (200)
        self.assertEqual(response.status_code, 200)

        # Verificar que el template utilizado sea "projects/announcements/announcements_form.html"
        self.assertTemplateUsed(
            response, "projects/announcements/announcements_form.html")

        # Verificar que el contexto contenga el objeto de anuncio a actualizar
        self.assertIn("object", response.context)

        # Verificar que el contexto contenga el nombre de la página como "announcement"
        self.assertEqual(response.context["page_name"], "announcement")

        # Verificar que el contexto contenga el rol del usuario
        self.assertIn("user_role", response.context)

    def test_post(self):
        # Crear un diccionario con los datos actualizados del formulario de anuncio
        form_data = {
            "init_date": (datetime.now() + timedelta(days=20)).strftime("%Y-%m-%d"),
            "end_date": (datetime.now() + timedelta(days=40)).strftime("%Y-%m-%d"),
            "category": self.category.id_category,
        }

        url = reverse("announcements-update",
                      kwargs={"pk": self.announcement.id_announ})

        response = self.client.post(url, data=form_data)
        self.assertEqual(response.status_code, 302)
        self.announcement.refresh_from_db()

        # Verificar que los campos actualizados del anuncio sean correctos
        self.assertEqual(self.announcement.init_date.strftime(
            "%Y-%m-%d"), form_data["init_date"])
        self.assertEqual(self.announcement.end_date.strftime(
            "%Y-%m-%d"), form_data["end_date"])
        self.assertEqual(self.announcement.category.id_category,
                         form_data["category"])


class AnnouncementDeleteViewTestCase(TestCase):
    def setUp(self):
        self.client = Client()
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

        self.category = Category.objects.create(name="Test Category")
        self.role = Role.objects.create(name="Role Test")
        self.user_role = UserRole.objects.create(
            user=self.user, role=self.role)
        self.announcement = Announcement.objects.create(
            init_date=datetime.now(),
            end_date=datetime.now() + timedelta(days=10),
            category=self.category
        )
        self.client.force_login(self.user)

    def test_get(self):
        # Obtiene la URL para eliminar el anuncio
        url = reverse("announcements-delete",
                      kwargs={"pk": self.announcement.id_announ})

        # Realiza una solicitud GET a la vista de eliminación de anuncios
        response = self.client.get(url)

        # Verifica que la respuesta sea exitosa y que el template correcto se esté utilizando
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(
            response, "projects/announcements/announcements_confirm_delete.html")

    def test_post(self):
        # Obtiene la URL para eliminar el anuncio
        url = reverse("announcements-delete",
                      kwargs={"pk": self.announcement.id_announ})

        # Realiza una solicitud POST a la vista de eliminación de anuncios
        response = self.client.post(url)

        # Verifica que la respuesta redirija a la URL de éxito (announcements-list)
        self.assertRedirects(response, reverse("announcements-list"))

        # Verifica que el anuncio haya sido eliminado de la base de datos
        self.assertFalse(Announcement.objects.filter(
            id_announ=self.announcement.id_announ).exists())


class AnnouncementListViewTestCase(TestCase):
    def setUp(self):
        self.client = Client()
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

        self.category = Category.objects.create(name="Test Category")
        self.role = Role.objects.create(name="Role Test")
        self.user_role = UserRole.objects.create(
            user=self.user, role=self.role)
        self.announcement1 = Announcement.objects.create(
            init_date=datetime.now(),
            end_date=datetime.now() + timedelta(days=10),
            category=self.category
        )
        self.category2 = Category.objects.create(name="Test 2")
        self.announcement2 = Announcement.objects.create(
            init_date=datetime.now(),
            end_date=datetime.now() + timedelta(days=10),
            category=self.category2
        )
        self.client.force_login(self.user)

    def test_get(self):
        # Obtiene la URL para ver la lista de anuncios
        url = reverse("announcements-list")

        # Realiza una solicitud GET a la vista de lista de anuncios
        response = self.client.get(url)

        # Verifica que la respuesta sea exitosa y que el template correcto se esté utilizando
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(
            response, "projects/announcements/announcements_list.html")

        # Verifica que los anuncios y las categorías estén presentes en el contexto
        self.assertQuerysetEqual(response.context["categories"], [
                                 self.category, self.category2], ordered=False)

    def test_get_filtered_by_category(self):
        # Obtiene la URL para ver la lista de anuncios filtrada por categoría
        url = reverse("announcements-list")
        category_id = self.category.id_category
        url += f"?category={category_id}"

        # Realiza una solicitud GET a la vista de lista de anuncios filtrada por categoría
        response = self.client.get(url)

        # Verifica que la respuesta sea exitosa y que el template correcto se esté utilizando
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(
            response, "projects/announcements/announcements_list.html")

        # Verifica que solo los anuncios asociados a la categoría filtrada estén presentes en el contexto
        self.assertQuerysetEqual(response.context["categories"], [
                                 self.category, self.category2], ordered=False)


class AnnouncementProjectListViewTestCase(TestCase):
    def setUp(self):
        self.client = Client()
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
        self.role = Role.objects.create(name="Role Test")
        self.user_role = UserRole.objects.create(
            user=self.user, role=self.role)
        self.client.force_login(self.user)
        self.category = Category.objects.create(name="Test Category")
        self.announcement = Announcement.objects.create(
            init_date=datetime.now(),
            end_date=datetime.now() + timedelta(days=10),
            category=self.category,
        )

        self.company = Company.objects.create(
            nit='1234567890',
            phone='1234567890',
            address='Test Address',
            name='Test Company'
        )
        self.project1 = Project.objects.create(
            title='Project 1',
            objective='Test Objective',
            results='Test Results',
            reach='Test Reach',
            company_nit=self.company,
            category=self.category
        )
        self.project2 = Project.objects.create(
            title='Project 2',
            objective='Test Objective',
            results='Test Results',
            reach='Test Reach',
            company_nit=self.company,
            category=self.category
        )

        AnnouncementProject.objects.create(
            announcement=self.announcement,
            project=self.project1,
        )
        AnnouncementProject.objects.create(
            announcement=self.announcement,
            project=self.project2,
        )

    def test_get_queryset(self):
        url = reverse(
            "announcementProjects-list",
            kwargs={"pk": self.announcement.id_announ},
        )
        response = self.client.get(url)

        # Verificar que la respuesta tenga un código de estado 200 (éxito)
        self.assertEqual(response.status_code, 200)

        # Verificar la presencia de los proyectos en el contenido de la respuesta
        self.assertContains(response, "Project 1")
        self.assertContains(response, "Project 2")


class CreateCompanyViewTestCase(TestCase):
    def setUp(self):
        # with open('Mapa_Conceptual.jpg','rb') as f:
        #    image_data = f.read()
        # file_name = 'Mapa_Conceptual.jpg'
        # content_type = 'image/jpg'
        self.url = reverse('register_company')
        self.context = {
            "Name": "Facebook",
            "Nit": "9007105256",
            "Adress": "CARRERA 11 79 35 P 9, BOGOTA, BOGOTA",
            "Phone": "6013832120",
            "Logo": "Path/to/image.jpg"
        }
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
        self.client = Client()
        self.role = Role.objects.create(name="common_user")
        Role.objects.create(name="company_user")
        self.user_role = UserRole.objects.create(user=self.user, role=self.role)
        self.client.force_login(self.user)

    def testGet(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'company/create_company.html')

    def testPost(self):
        response = self.client.post(self.url, data=self.context)
        self.assertEqual(response.status_code, 302)
        self.assertRedirects(response, reverse("home"))
        company = Company.objects.last()
        self.assertEqual(company.name, "Facebook")
        self.assertEqual(company.nit, "9007105256")
        self.assertEqual(
            company.address, "CARRERA 11 79 35 P 9, BOGOTA, BOGOTA")
        self.assertEqual(company.phone, "6013832120")


class CompanyDetailTestCase(TestCase):
    def setUp(self):
        # with open('Mapa_Conceptual.jpg','rb') as f:
        #    image_data = f.read()
        # file_name = 'Mapa_Conceptual.jpg'
        # content_type = 'image/jpg'
        self.url = reverse('company_detail')
        self.client = Client()
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
        self.role = Role.objects.create(name="company_user")
        self.user_role = UserRole.objects.create(
            user=self.user, role=self.role)
        self.client.force_login(self.user)

        self.company = Company.objects.create(
            name='Facebook',
            address='CARRERA 11 79 35 P 9, BOGOTA, BOGOTA',
            phone='6013832120',
            nit='9007105256',
            logo="Path/to/image.jpg"
        )
        self.company.save()
        
        UserCompany.objects.create(
            user = self.user,
            company = self.company,
        )
   
    def test_company_detail_view(self):
        response = self.client.get(self.url)
        self.url = reverse('register_company')
        self.assertEqual(response.status_code, 200)
 
'''       
class EditCompanyTestCase(TestCase):
    def setUp(self):
        # with open('Mapa_Conceptual.jpg','rb') as f:
        #    image_data = f.read()
        # file_name = 'Mapa_Conceptual.jpg'
        # content_type = 'image/jpg'
        self.client = Client()
        # self.factory = RequestFactory()
        self.url = reverse('edit_company')
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
        self.company = Company.objects.create(
            name='Facebook',
            address='CARRERA 11 79 35 P 9, BOGOTA, BOGOTA',
            phone='6013832120',
            nit='9007105256',
            logo="Path/to/image.jpg"
        )
        self.company.save()
        self.user_company = UserCompany.objects.create(
            user=self.user, company=self.company)
        self.role = Role.objects.create(name="company_user")
        self.user_role = UserRole.objects.create(
            user=self.user, role=self.role)
        self.client.force_login(self.user)

    def test_edit_company_view_get(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)

    def test_edit_company_view_post(self):
        data = {
            'name': 'Facebook',
            'Nit': '9007105256',
            'Adress': 'CARRERA 11 79 35 P 9, BOGOTA, BOGOTA',
            'Phone': '6013832120',
            'Logo': 'Path/to/image.jpg'
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, 302)
        self.assertRedirects(response, reverse('company_detail'))
        company = UserCompany.objects.get(user=self.user).company
        self.assertEqual(company.name, data['name'])
        self.assertEqual(company.nit, data['Nit'])
        self.assertEqual(company.address, data['Adress'])
        self.assertEqual(company.phone, data['Phone'])
        self.assertEqual(company.logo, data['Logo'])
'''

class CompanyDeleteViewTestCase(TestCase):

    def setUp(self):
        # with open('Mapa_Conceptual.jpg','rb') as f:
        #    image_data = f.read()
        # file_name = 'Mapa_Conceptual.jpg'
        # content_type = 'image/jpg'
        # Create a user for testing purposes
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

        # Create a company for testing purposes
        self.company = Company.objects.create(
            name='Facebook',
            address='CARRERA 11 79 35 P 9, BOGOTA, BOGOTA',
            phone='6013832120',
            nit='9007105256',
            logo="Path/to/image.jpg"
        )
        self.company.save()

        # Login the user
        self.client = Client()
        self.user_company = UserCompany.objects.create(user=self.user, company=self.company)
        self.role = Role.objects.create(name="common_user")
        self.role = Role.objects.create(name="company_user")
        self.user_role = UserRole.objects.create(user=self.user, role=self.role)
        self.client.force_login(self.user)

    def test_company_delete_view_get(self):
        response = self.client.get(
            reverse('delete_company', kwargs={'pk': self.company.nit})
        )
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'company/delete_company.html')

    def test_company_delete_view_post(self):
        response = self.client.post(
            reverse('delete_company', kwargs={'pk': self.company.nit})
        )
        self.assertEqual(response.status_code, 302)
        self.assertRedirects(response, reverse('home'))
        with self.assertRaises(ObjectDoesNotExist):
            Company.objects.get(pk=self.company.nit)


class ProjectCreateViewTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.user_cc = "1234567890"
        self.password = "123"
        self.user = User.objects.create_user(
            user_cc=self.user_cc,
            password=self.password,
            email="johndoe@example.com",
            full_name="John Doe",
            phone="1234567890",
            birth_date=datetime.today(),
        )

        self.company = Company.objects.create(
            nit="1234567890",
            phone="1234567890",
            address="Test address",
            name="Test company",
            logo=None,
        )
        self.user_company = UserCompany.objects.create(
            user=self.user, company=self.company)

        self.category = Category.objects.create(name="Test Category")
        self.project = Project.objects.create(
            title="Test Project",
            objective="Test objective",
            results="Test results",
            reach="Test reach",
            company_nit=self.company,
            category=self.category,
        )
        
    def test_project_create_view_success(self):
        self.client.login(username=self.user_cc, password=self.password)
        data = {
            "title": "Test Project",
            "format": self.category.id_category,
            "objetive": "Test Objective",
            "results": "Test Results",
            "reach": "Test Reach",
        }
        self.assertEqual(Project.objects.count(), 1)
        response = self.client.post(reverse("project-create"), data)
        self.assertEqual(response.status_code, 302)  # Should redirect
        # Should create a new project
        
     