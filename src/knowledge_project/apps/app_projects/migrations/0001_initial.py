# Generated by Django 4.2 on 2023-06-06 12:28

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Announcement',
            fields=[
                ('id_announ', models.AutoField(primary_key=True, serialize=False)),
                ('init_date', models.DateField()),
                ('end_date', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='AnnouncementProject',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Binnacle',
            fields=[
                ('id_binnacle', models.AutoField(primary_key=True, serialize=False)),
                ('date', models.DateField()),
                ('description', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id_category', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('photo', models.ImageField(blank=True, null=True, upload_to='static/img/categories/')),
            ],
        ),
        migrations.CreateModel(
            name='Company',
            fields=[
                ('nit', models.CharField(max_length=10, primary_key=True, serialize=False, validators=[django.core.validators.RegexValidator(message='El NIT debe tener entre 9 y 10 dígitos', regex='^\\d{10,10}$')], verbose_name='NIT')),
                ('phone', models.CharField(max_length=13, validators=[django.core.validators.RegexValidator(message='El número de teléfono debe tener de 8 a 10 dígitos', regex='\\d{8,10}$')], verbose_name='teléfono')),
                ('address', models.CharField(max_length=255, verbose_name='dirección')),
                ('name', models.CharField(max_length=100, verbose_name='nombre')),
                ('logo', models.ImageField(null=True, upload_to='static/img/company/', verbose_name='logo')),
            ],
        ),
        migrations.CreateModel(
            name='Donation',
            fields=[
                ('donation_id', models.AutoField(primary_key=True, serialize=False)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('description', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('title', models.CharField(max_length=30)),
                ('objective', models.TextField()),
                ('results', models.TextField()),
                ('reach', models.TextField()),
                ('state', models.CharField(blank=True, choices=[('Propuesta', 'Propuesta'), ('En convocatoria', 'En convocatoria'), ('En factory', 'En factory')], default='Propuesta', max_length=20)),
                ('id_project', models.AutoField(primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Requirement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('objective', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
        ),
        migrations.CreateModel(
            name='Resource',
            fields=[
                ('id_resource', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='ResourcesBag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
        ),
        migrations.CreateModel(
            name='UserCompany',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_projects.company')),
            ],
        ),
    ]
