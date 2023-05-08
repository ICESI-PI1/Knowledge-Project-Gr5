from django.test import TestCase, Client
from django.urls import reverse
from django.db import IntegrityError
from apps.app_projects.models import *
from apps.app_users.models import *
from datetime import *
import io
from django.core.files.uploadedfile import SimpleUploadedFile

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
        
class TestCreateCompanyView(TestCase):
    def setUp(self):
        self.client=Client()
        image = io.BytesIO()
        image.write(b'some image content')
        image.seek(0)
        url = reverse('register_company')
        context = {
            "Name":"Facebook",
            "Nit":"9007105256",
            "Adress": "CARRERA 11 79 35 P 9, BOGOTA, BOGOTA",
            "Phone": "6013832120",
            "Logo":SimpleUploadedFile('image.jpg', image.read()),
        }
        
    def testGet(self):
        response = self.client.get(reverse('register_company'))
        self.assertEqual(response.status_code, 200)
        
    def testPost(self):
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 200)
        