from django.shortcuts import render, redirect
from django.views.generic import View
from django.contrib.auth import logout

# Create your views here.
class HomePage(View):
    
    def get(self, request):
        template_name = "projects/home.html"
        return render(
            request,
            template_name,
            {
                "user": "page_manager",
            },
        )
    
def signout(request):
    logout(request)
    return redirect("/")