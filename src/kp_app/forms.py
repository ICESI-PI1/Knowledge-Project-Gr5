from django import forms
from .models import User


class userForm(forms.ModelForm):
    password1 = forms.CharField(
        label="Contraseña",
        widget=forms.PasswordInput(
            attrs={
                "class": "form-control",
                "placehorder": "Ingrese su contraseña",
                "id": "password1",
                "required": "required",
            }
        ),
    )

    password2 = forms.CharField(
        label="Confirmar contraseña",
        widget=forms.PasswordInput(
            attrs={
                "class": "form-control",
                "placehorder": "Repita su contraseña",
                "id": "password2",
                "required": "required",
            }
        ),
    )

    class Meta:
        model = User
        fields = (
            "full_name",
            "cc",
            "email",
            "phone",
            "birth_date",
            "photo",
            "password",
        )
        widgets = {
            
            "full_name": forms.TextInput(
                attrs={
                    "class": "form-control",
                    "placehorder": "Ingresa tu nombre completo",
                }
            ),
            "cc": forms.TextInput(
                attrs={
                    "class": "form-control",
                    "placehorder": "Ingresa el número de tu documento de identificación civil",
                }
            ),
            "email": forms.EmailInput(
                attrs={
                    "class": "form-control",
                    "placehorder": "Ingresa el correo electrónico de tu preferencia",
                }
            ),
            "phone": forms.TextInput(
                attrs={
                    "class": "form-control",
                    "placehorder": "Ingresa tu número de teléfono",
                }
            ),
            "phone": forms.DateInput( #----------------------------> podría ser otro formato para fecha
            ),
        }
