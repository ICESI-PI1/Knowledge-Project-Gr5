from django.contrib import admin

# Register your models here.
from .models import Resource, Category, Announcement, Project, Company

admin.site.register(Resource)
admin.site.register(Category)
admin.site.register(Announcement)
admin.site.register(Project)
admin.site.register(Company)