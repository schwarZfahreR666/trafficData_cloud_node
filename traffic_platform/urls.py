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
    path('road_info_yq/', views.get_road_info_yq),
    path('road_info_st/', views.get_road_info_st),
    path('road_info_at/', views.get_road_info_at),
    path('road_info_wks/', views.get_road_info_wks),
    path('trafficflow/', views.trafficflow),
    path('home_zjk/', views.home_zjk),
    path('home_st/', views.home_st),
    path('home_at/', views.home_at),
    path('home_wks/', views.home_wks),
    path('passenger_flow/', views.passenger_flow),
    path('query_resource/', views.query_resource),
    path('resource_topo/data_flow/', views.data_flow),
    path('getRoadInfo/', views.getRoadInfo),
    path('switchRoadInfo/', views.switchRoadInfo),
    path('RoadInfoState/', views.RoadInfoState),

]
