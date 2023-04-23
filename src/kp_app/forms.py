from django import forms
from .models import User

class userForm(forms.ModelForm):
    password1 = forms.CharField(label = 'Contraseña', widget=forms.PasswordInput(
        attrs={
            'class': 'form-control',
            'placehorder': 'Ingrese su contraseña',
            'id': 'password1',
            'required' : 'required',
        }
    ))

    password2 =  forms.CharField(label = 'Confirmar contraseña', widget=forms.PasswordInput(
        attrs={
            'class': 'form-control',
            'placehorder': 'Repita su contraseña',
            'id': 'password2',
            'required' : 'required',
        }
    ))

    #class Meta:
        #model = User
        #fields = ('phone', 'email', 'birth_date', 'full_name', 'password', 'photo', 'cc')
        #widgets = {
            #'email': forms.EmailInput(
                #'class':'form-control',
                #'placehorder': 'Ingresa el correo electrónico de tu preferencia'
            #)
        #}