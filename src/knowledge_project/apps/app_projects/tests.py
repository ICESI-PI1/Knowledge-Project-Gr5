from django.test import TestCase
from django.test import TestCase
from apps.app_projects.models import *
from apps.app_users.models import *
from datetime import *

class CompanyModelTestCase(TestCase):
    
    def setUp(self):
        self.user = User.objects.create(
            phone='+573001234567',
            email='testuser@example.com',
            birth_date=datetime.today().date() - timedelta(days=365 * 20),
            full_name='Test User',
            password='testpassword',
            user_cc='1234567890'
        )
        self.company = Company.objects.create(
            nit='123456789',
            name='Test Company',
            address='ddf',
            phone='+573001234567'
        )
        
    def test_company_creation(self):
        self.assertEqual(self.company.name, 'Test Company')
        