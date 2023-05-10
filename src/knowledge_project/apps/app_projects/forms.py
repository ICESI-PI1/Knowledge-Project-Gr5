from django import forms
from .models import Resource, Category, Donation, Announcement

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