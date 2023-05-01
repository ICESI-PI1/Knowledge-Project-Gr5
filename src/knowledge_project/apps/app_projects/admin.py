from django.contrib import admin

# Register your models here.
from .models import Resource, Category

admin.site.register(Resource)
admin.site.register(Category)
