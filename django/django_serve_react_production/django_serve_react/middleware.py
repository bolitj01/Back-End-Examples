from math import e
from django.utils.deprecation import MiddlewareMixin

# Fix the MIME type for JavaScript and CSS files
class FixMimeTypeMiddleware(MiddlewareMixin):
    def process_response(self, request, response):
        if request.path.endswith(".js"):
            response["Content-Type"] = "application/javascript"
        elif request.path.endswith(".css"):
            response["Content-Type"] = "text/css"
        return response
