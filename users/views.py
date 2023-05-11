from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate
from django.db import IntegrityError
from .forms import ProjectForm
from .models import Project
from django.utils import timezone
from django.contrib.auth.decorators import login_required


def home(request):

    return render(request, 'home.html')


def signup(request):

    if request.method == 'GET':

        return render(request, 'signup.html')

    else:
        if request.POST['password1'] == request.POST['password2']:

            try:

                # Registrar un usuario
                user = User.objects.create_user(
                    username=request.POST['username'], password=request.POST['password1'])
                user.save()

                login(request, user)
                return redirect('projects')

            except IntegrityError:

                return render(request, 'signup.html', {
                    'error': 'El nombre de usuario ya ha sido usado'
                })

    return render(request, 'signup.html', {
        'error': 'Las contraseñas no coinciden'
    })


@login_required
def projects(request):
    projects = Project.objects.filter(
        user=request.user, datecompleted__isnull=True)

    return render(request, 'projects.html', {
        'projects': projects,
        'type': 'Activos'
    })


@login_required
def signout(request):

    logout(request)
    return redirect('home')


def signin(request):

    if request.method == 'GET':
        return render(request, 'signin.html')

    else:
        user = authenticate(
            request, username=request.POST['username'], password=request.POST['password'])

        if user is None:
            return render(request, 'signin.html', {'error': 'El usuario o la contraseña son incorrectos'})

        else:
            login(request, user)
            return redirect('projects')


@login_required
def create_project(request):

    if request.method == 'GET':
        return render(request, 'create_project.html', {
            'form': ProjectForm
        })
    else:
        try:

            form = ProjectForm(request.POST)
            new_project = form.save(commit=False)
            new_project.user = request.user
            new_project.save()
            return redirect('projects')

        except ValueError:
            return render(request, 'create_project.html', {
                'form': ProjectForm,
                'error': 'No se ha podido crear el proyecto'
            })


@login_required
def project_details(request, project_id):

    if request.method == 'GET':
        project = get_object_or_404(Project, pk=project_id, user=request.user)

        form = ProjectForm(instance=project)
        return render(request, 'project_details.html', {
            'project': project,
            'form': form
        })
    else:
        try:
            project = get_object_or_404(
                Project, pk=project_id, user=request.user)
            form = ProjectForm(request.POST, instance=project)
            form.save()
            return redirect('projects')
        except ValueError:
            return render(request, 'project_details.html', {
                'project': project,
                'form': form,
                'error': 'Ha ocurrido un error al actualizar el proyecto'
            })


@login_required
def complete_project(request, project_id):

    project = get_object_or_404(Project, pk=project_id, user=request.user)

    if request.method == 'POST':
        project.datecompleted = timezone.now()
        project.save()
        return redirect('projects')


@login_required
def delete_project(request, project_id):

    project = get_object_or_404(Project, pk=project_id, user=request.user)

    if request.method == 'POST':
        print('entra al if')
        project.delete()
        return redirect('projects')


@login_required
def projects_completed(request):
    projects = Project.objects.filter(
        user=request.user, datecompleted__isnull=False).order_by('-datecompleted')

    return render(request, 'projects.html', {
        'projects': projects,
        'type': 'completadas'
    })
