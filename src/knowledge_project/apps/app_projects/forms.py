from django import forms
from .models import Resource, Category, Donation

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
        
class DonationForm(forms.ModelForm):
    class Meta:
        model = Donation
        fields = ['amount', 'description']
        labels = {
            'amount':'Cantidad',
            'description':'Ingresa una descripción sobre la donación que realizarás.',
        }