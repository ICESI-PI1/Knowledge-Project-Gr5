from django.test import TestCase
from django.db import IntegrityError
from apps.app_projects.models import *
from apps.app_users.models import *
from datetime import *

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
        self.assertEqual(self.company.phone,'+573001234567')
        self.assertEqual(self.company.address,'ddf')
        self.assertEqual(self.company.nit,'1234567890')
    
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
            nit='12345678899',
            name='Test Company',
            address='ddf',
            phone='1234567'
        ))

        # Test invalid phone number with more than 10 digits
        with self.assertRaises(ValidationError):
             Company.full_clean(Company.objects.create(
            nit='12345678891',
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
        self.assertTrue(isinstance(self.announcement_project, AnnouncementProject))
    
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
        self.requirement = Requirement.objects.create(project_id=self.project, resource_id=self.resource, objective=10.5)

    def test_requirement_creation(self):
        self.assertEqual(self.requirement.project_id, self.project)
        self.assertEqual(self.requirement.resource_id, self.resource)
        self.assertEqual(self.requirement.objective, 10.5)

    def test_requirement_unique_together(self):
        with self.assertRaises(IntegrityError):
            Requirement.objects.create(project_id=self.project, resource_id=self.resource, objective=5.0)

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
        self.resources_bag = ResourcesBag.objects.create(project_id=self.project, resource_id=self.resource, amount=100.0)

    def test_resources_bag_creation(self):
        self.assertEqual(self.resources_bag.project_id, self.project)
        self.assertEqual(self.resources_bag.resource_id, self.resource)
        self.assertEqual(self.resources_bag.amount, 100.0)

    def test_resources_bag_unique_together(self):
        with self.assertRaises(IntegrityError):
            ResourcesBag.objects.create(project_id=self.project, resource_id=self.resource, amount=50.0)

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
