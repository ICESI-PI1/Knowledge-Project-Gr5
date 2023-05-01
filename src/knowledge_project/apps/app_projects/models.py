from django.db import models
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError
from django.utils import timezone
from django.db import models
from ..app_users.models import User

# Create your models here.
class Company(models.Model):
    nit_regex = RegexValidator(
        regex=r"^\d{9,10}$",
        message="El NIT debe tener entre 9 y 10 dígitos",
    )
    nit = models.CharField(
        max_length=10, primary_key=True, validators=[nit_regex], verbose_name="NIT"
    )
    phone_regex = RegexValidator(
        regex=r"^\+57\d{8,10}$",
        message="El número de teléfono debe ser de formato '+57xxxxxxxxx'",
    )
    phone = models.CharField(
        validators=[phone_regex], max_length=13, verbose_name="teléfono"
    )
    address = models.CharField(max_length=255, verbose_name="dirección")
    name = models.CharField(max_length=100, verbose_name="nombre")
    user_cc = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="company",
    )

    def __str__(self) -> str:
        return f"{self.name} - NIT:  {self.nit}"


class Category(models.Model):
    id_category = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.id_category} - Name: {self.name}"


class Project(models.Model):
    PROPOSAL_STATE = "Propuesta"
    CALL_STATE = "En convocatoria"
    FACTORY_STATE = "En factory"

    STATE_CHOICES = (
        (PROPOSAL_STATE, "Propuesta"),
        (CALL_STATE, "En convocatoria"),
        (FACTORY_STATE, "En factory"),
    )
    name = models.CharField(max_length=30)
    objective = models.TextField()
    results = models.TextField()
    reach = models.TextField()
    state = models.CharField(
        max_length=20, choices=STATE_CHOICES, default=PROPOSAL_STATE
    )
    company_nit = models.ForeignKey("Company", on_delete=models.CASCADE)
    id_project = models.AutoField(primary_key=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.id_project} - Objective: {self.objective}, Company: {self.company_nit.name}"


class Announcement(models.Model):
    id_announ = models.AutoField(primary_key=True)
    init_date = models.DateTimeField()
    end_date = models.DateTimeField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    id_projects = models.ManyToManyField(Project)
    projects_amount = models.PositiveIntegerField()

    def clean(self):
        if self.init_date < timezone.now():
            raise ValidationError(
                "La fecha de inicio no puede ser anterior a la fecha actual"
            )
        if self.end_date <= self.init_date:
            raise ValidationError(
                "La fecha de finalización debe ser posterior a la fecha de inicio"
            )
        duration = self.end_date - self.init_date
        if duration.days < 3 or duration.days > 30:
            raise ValidationError(
                "La duración de la convocatoria debe ser entre 3 y 30 días"
            )
        projects_categories = set(self.id_projects.values_list("category", flat=True))
        if (
            len(projects_categories) != 1
            or projects_categories.pop() != self.category.id_category
        ):
            raise ValidationError(
                "Los proyectos asociados deben tener la misma categoría de la convocatoria"
            )

class Resource(models.Model):
    id_resource = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.id_resource} - {self.name}"


class Requirement(models.Model):
    project_id = models.ForeignKey("Project", on_delete=models.CASCADE)
    resource_id = models.ForeignKey(Resource, on_delete=models.CASCADE)
    objective = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        unique_together = (
            "project_id",
            "resource_id",
        )

    def __str__(self):
        return f"{self.project_id.name} - {self.resource_id.name} ({self.objective})"


class ResourcesBag(models.Model):
    project_id = models.ForeignKey("Project", on_delete=models.CASCADE)
    resource_id = models.ForeignKey(Resource, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        unique_together = (
            "project_id",
            "resource_id",
        )

    def __str__(self):
        return f"{self.project_id.name} - {self.resource_id.name} ({self.amount})"


class Donation(models.Model):
    company_nit = models.ForeignKey(Company, on_delete=models.CASCADE)
    donation_id = models.AutoField(primary_key=True)
    resource_id = models.ForeignKey(Resource, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    project_id = models.ForeignKey("Project", on_delete=models.CASCADE)

    def clean(self):
        requirements = Requirement.objects.filter(project_id=self.project_id)
        if not requirements.filter(resource_id=self.resource_id).exists():
            raise ValidationError(
                "El recurso de la donación no es requerido por el proyecto"
            )
        resources_bag = ResourcesBag.objects.filter(
            project_id=self.project_id, resource_id=self.resource_id
        ).first()
        if (
            resources_bag.amount + self.amount
            > requirements.get(resource_id=self.resource_id).objective
        ):
            raise ValidationError(
                "La donación excede la cantidad requerida para el proyecto"
            )

    def __str__(self):
        return f"Donación de {self.company_nit.name} - {self.resource_id.name} ({self.amount})"


