from django.contrib import admin

# Register your models here.
from .models import *
admin.site.register(Resource)
admin.site.register(Category)
admin.site.register(Company)
admin.site.register(UserCompany)
admin.site.register(Project)
admin.site.register(AnnouncementProject)
admin.site.register(Announcement)
admin.site.register(Requirement)
admin.site.register(ResourcesBag)
