from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic import View
from django.conf import settings
import os

# Serve the React build files
class FrontendAppView(View):
    def get(self, request):
        try:
            return render(request, 'index.html')
        except FileNotFoundError:
            return HttpResponse(
                """
                index.html not found! Build your React app and ensure the build directory is located at '{}'.
                """.format(settings.TEMPLATES.DIRS),
                status=501,
            )
