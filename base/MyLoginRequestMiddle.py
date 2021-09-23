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
EXCLUDE_URL = ['/login/', '/eventNer']
exclued_path = [re.compile(item) for item in EXCLUDE_URL]


class LoginRequiredMiddleware(MiddlewareMixin):

    def process_request(self, request: WSGIRequest):
        url_path = request.path
        for each in exclued_path:
            if re.match(each, url_path):
                return
        if not request.user.is_authenticated:
            return HttpResponseRedirect('/login/')
            # user = authenticate(username="xinlingyun", password="xly@BUAA123")
            # if user is not None and user.is_active:
            #     auth.login(request, user)
            # return
        else:
            return
