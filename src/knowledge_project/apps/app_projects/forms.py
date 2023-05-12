from django import forms
from .models import Resource, Category, Donation, Announcement, Binnacle
from apps.app_users.models import User
class ResourceForm(forms.ModelForm):
    class Meta:
        model = Resource
        fields = ['name', 'id_resource']
        labels = {
            'name':'Nombre de recurso',
        }

class CategoryForm(forms.ModelForm):
    class Meta:
        model = Category
        fields = ['name', 'id_category', 'photo']
        labels = {
            'name':'Nombre de categoría',
            'photo':'Foto de categoría'
        }
        
class AnnouncementForm(forms.ModelForm):
    class Meta:
        model = Announcement
        fields = ['id_announ', 'init_date', 'end_date', 'category']
        labels = {
            'init_date':'Fecha de inicio',
            'end_date':'Fecha de finalización',
            'category':'Categoría',
        }
        widgets = {
            'init_date': forms.DateInput(attrs={'type': 'date','class':'margin-top-10'}),
            'end_date': forms.DateInput(attrs={'type': 'date','class':'margin-top-10'}),
        }
        
class DonationForm(forms.ModelForm):
    class Meta:
        model = Donation
        fields = ['resource_id','amount', 'description']
        labels = {
            'resource_id':'Recurso',
            'amount':'Cantidad',
            'description':'Ingresa una descripción sobre la donación que realizarás.',
        }

class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['user_cc', 'full_name', 'email', 'phone', 'birth_date', 'photo']
        widgets = {
            'birth_date': forms.DateInput(attrs={'type': 'date','class':'margin-top-10'}),
            'email':forms.EmailInput(attrs={'class':'margin-top-10'})
        }
        labels = {
            'user_cc':'Número de identificación',
            'full_name':'Nombre completo',
            'email':'Correo electrónico',
            'phone':'Número telefónico',
            'birth_date':'Fecha de nacimiento',
            'photo':'Foto de perfil',
            
        }
        
class BinnacleForm(forms.ModelForm):
    class Meta:
        model = Binnacle
        fields = ['date','description']
        widgets = {
            'date': forms.DateInput(attrs={'type': 'date','class':'margin-top-10'}),
        }