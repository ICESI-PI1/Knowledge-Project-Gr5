from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class UserManager(BaseUserManager):
    def create_user(self, user_cc, password=None, **extra_fields):
        if not user_cc:
            raise ValueError('La cédula es obligatoria')
        user_cc = self.normalize_email(user_cc)
        user = self.model(user_cc=user_cc, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, user_cc, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(user_cc, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    user_cc = models.CharField(max_length=10, unique=True)
    full_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=10)
    birth_date = models.DateField()
    photo = models.ImageField(upload_to='fotos', blank=True, null=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'user_cc'
    REQUIRED_FIELDS = ['full_name', 'email', 'phone', 'birth_date']

    objects = UserManager()

    def __str__(self):
        return self.user_cc