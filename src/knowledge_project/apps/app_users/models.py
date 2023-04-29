from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

# Create your models here.
from django.db import models
from django.core.validators import RegexValidator, EmailValidator
from django.core.exceptions import ValidationError
from datetime import datetime, timedelta
from django.contrib.auth.hashers import check_password


class UserRole(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE)
    role = models.ForeignKey("Role", on_delete=models.CASCADE)

    def __str___(self):
        return f"{self.user.cc} - {self.role.name}"


class User(AbstractUser):
    groups = models.ManyToManyField(
        Group,
        blank=True,
        related_name="user_groups",
        help_text="The groups this user belongs to. A user will get all permissions granted to each of their groups.",
        related_query_name="user",
    )

    user_permissions = models.ManyToManyField(
        Permission,
        blank=True,
        related_name="user_permissions",
        help_text="Specific permissions for this user.",
        related_query_name="user",
    )
    phone_regex = RegexValidator(
        regex=r"^\d{8,10}$",
        message="El número de teléfono debe tener entre 8 y 10 dígitos",
    )
    phone = models.CharField(validators=[phone_regex], max_length=10, blank=True)
    email = models.EmailField(
        unique=True,
        max_length=255,
        validators=[EmailValidator()],
        verbose_name="correo electrónico",
    )
    birth_date = models.DateField()

    def clean(self):
        try:
            age = datetime.today().date() - self.birth_date
            if age < timedelta(days=365 * 18):
                raise ValidationError("Debes ser mayor de edad para registrarte.")
        except TypeError:
            raise ValidationError("Fecha de nacimiento inválida.")

    full_name = models.CharField(max_length=100)
    last_login = models.DateTimeField(auto_now=True)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    photo = models.ImageField(blank=True, null=True)
    cc_regex = RegexValidator(
        regex=r"^\d{6,10}$",
        message="La cédula de ciudadanía debe contener entre 6 y 10 dígitos",
    )
    cc = models.CharField(max_length=10, primary_key=True, validators=[cc_regex])

    def __str__(self) -> str:
        return f"{self.full_name} - CC: {self.cc}"


class Role(models.Model):
    id_role = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)

    def __str__(self) -> str:
        return f"{self.id_role} - Name:  {self.name}"
