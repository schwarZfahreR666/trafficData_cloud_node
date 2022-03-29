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
from django.urls import path,re_path
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
    path('road_info_sg/', views.get_road_info_sg),
    path('road_info_zjk/', views.get_road_info_zjk),

    path('trafficflow/', views.trafficflow),
    path('home_zjk/', views.home_zjk),
    path('home_st/', views.home_st),
    path('home_at/', views.home_at),
    path('home_wks/', views.home_wks),
    path('passenger_flow/', views.passenger_flow),
    path('query_resource/', views.query_resource),
    path('data_flow/', views.data_flow),
    path('getRoadInfo/', views.getRoadInfo),
    path('switchRoadInfo/', views.switchRoadInfo),
    path('RoadInfoState/', views.RoadInfoState),
    #   集散模式
    path('mode_analysis/', views.get_mode_analysis),
    path('mode_predict/', views.get_mode_predict),
    path('mid_mode_predict/', views.get_mid_mode_predict),
    path('small_mode_predict/', views.get_small_mode_predict),
    path('big_mode2_analysis/', views.get_big_mode2_analysis),
    path('big_mode3_analysis/', views.get_big_mode3_analysis),
    path('big_mode4_analysis/', views.get_big_mode4_analysis),
    path('mid_mode1_analysis/', views.get_mid_mode1_analysis),
    path('mid_mode2_analysis/', views.get_mid_mode2_analysis),
    path('mid_mode3_analysis/', views.get_mid_mode3_analysis),
    path('small_mode1_analysis/', views.get_small_mode1_analysis),
    path('small_mode2_analysis/', views.get_small_mode2_analysis),
    path('mid_mode1_analysis_st/', views.get_mid_mode1_analysis_st),
    path('mid_mode1_analysis_wks/', views.get_mid_mode1_analysis_wks),
    path('mid_mode2_analysis_wks/', views.get_mid_mode2_analysis_wks),
    path('mid_mode3_analysis_wks/', views.get_mid_mode3_analysis_wks),
    path('mid_mode_predict_st/', views.get_mid_mode_predict_st),
    path('mid_mode_predict_wks/', views.get_mid_mode_predict_wks),
    re_path(r'^od_mode/(?P<name>(.*))/$', views.new_od_mode),
    re_path(r'^od_predict/(?P<name>(.*))/$', views.new_od_predict),

    path('cloud/', views.toCloud),
    path('new_resource_topo/', views.get_new_resource_topo),
    path('new_home/', views.tonew_home),
    path('bh_edge/', views.getBH),
    path('map_test/', views.toMap_test),
    path('javaNode_sysInfo/', views.get_javaNode_sysInfo),
    path('start_task/', views.start_task),
    path('topo/', views.toTopo),
    path('node_health/', views.getHealth),
    path('eventdriving/', views.eventDriving),
    path('taskstate/', views.taskState),
    path('BH_trafficlevel/', views.getBH_trafficLevel),
    path('area_topo/', views.area_topo),
    path('area_monitor/', views.area_monitor),
    path('BHnode_submonitor/', views.toBHnode_monitor),

    path('new_home_at/', views.new_home_at),
    path('new_home_st/', views.new_home_st),
    path('new_home_wks/', views.new_home_wks),
    path('new_home_sg/', views.new_home_sg),
    path('new_home_zjk/', views.new_home_zjk),

    path('eventNer', views.event_ner),
    path('getYingjiju', views.getYingjiju),
    path('getBendibao', views.getBendibao),
    path('getJiaoguanju', views.getJiaoguanju),
    path('getBus', views.getBus),

    path('changfeng', views.refchangfeng),
    path('datashow', views.datashow),
    path('apidata', views.apidata),
    path('filedata', views.filedata),
    path('usermanage', views.usermanage),
    path('projectmanage', views.projectmanage),
    path('imagemanage', views.imagemanage),
    path('dockermanage', views.dockermanage),
    path('programmamanage', views.programmamanage),
    path('taskmanage', views.taskmanage),
    path('nodemanage', views.nodemanage),
    path('toposhow', views.toposhow),
    path('timeapi', views.timeapi),
    path('onceapi', views.onceapi),

]
