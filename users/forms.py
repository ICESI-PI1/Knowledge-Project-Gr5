from django import forms

from .models import Project

class ProjectForm(forms.ModelForm):
    class Meta:
        model = Project
        fields = ['title', 'objective', 'results','reach','state']

        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-control', 'placeholder':'Título de proyecto'}), 
            'objective': forms.Textarea(attrs={'class': 'form-control', 'placeholder': 'Objetivo del proyecto'}), 
            'results': forms.Textarea(attrs={'class': 'form-control', 'placeholder': 'Resultados del proyecto'}), 
            'reach': forms.Textarea(attrs={'class': 'form-control', 'placeholder': 'Alcance del proyecto'}), 
            'state': forms.CheckboxInput(attrs={'class': 'form-check-input'}) 
        }
