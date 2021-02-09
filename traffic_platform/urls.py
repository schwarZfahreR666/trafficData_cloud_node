"""traffic_platform URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from base import views

urlpatterns = [
    path('login/', views.login),
    path('', views.home, name='index'),  # 主页
    path('logout/', views.log_out, name='logout'),
    path('Cpu_State/', views.get_cpu_state),
    path('resource_monitor/', views.get_resource_monitor),
    path('resource_topo/', views.get_resource_topo),
    path('road_info/', views.get_road_info),
    path('trafficflow/', views.trafficflow),

]
