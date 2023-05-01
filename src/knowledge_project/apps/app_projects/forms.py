from django import forms
from .models import Resource

class ResourceForm(forms.ModelForm):
    class Meta:
        model = Resource
        fields = ['name', 'id_resource']
        labels = {
            'name':'Nombre de recurso',
        }