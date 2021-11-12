import re

import django
from django.contrib import auth
from django.contrib.auth import authenticate
from django.core.handlers.wsgi import WSGIRequest
from django.http import HttpResponseRedirect

try:
    from django.utils.deprecation import MiddlewareMixin  # Django 1.10.x
except ImportError:
    MiddlewareMixin = object
EXCLUDE_URL = ['/login/', '/eventNer', "[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]"]
exclued_path = [re.compile(item) for item in EXCLUDE_URL]


class LoginRequiredMiddleware(MiddlewareMixin):

    # def process_request(self, request: WSGIRequest):
    #     url_path = request.path
    #     for each in exclued_path:
    #         if re.match(each, url_path):
    #             return
    #     if not request.user.is_authenticated:
    #         return HttpResponseRedirect('/login/')
    #     else:
    #         return
    def process_request(self, request: WSGIRequest):
        return
