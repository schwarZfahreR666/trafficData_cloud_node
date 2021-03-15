from django.shortcuts import render, redirect, HttpResponseRedirect, HttpResponse
from base.forms import LoginForm
from django.contrib import auth
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
import psutil
import os, datetime, time
import json
import pymysql
import random
import numpy as np

# Create your views here.


def login(request):
    message = ""
    form = LoginForm(request.POST or None)  # 获取登录表单样式
    if request.method == "POST":
        if form.is_valid():
            cd = form.cleaned_data
            input_name = cd['username']
            input_pwd = cd['password']
            url = request.POST['url']
            # print(url)
            user = authenticate(username=input_name, password=input_pwd)
            if user is not None and user.is_active:
                auth.login(request, user)
                return redirect('/')
            else:
                message = '用户名或密码不正确'
                print(message)

    return render(request, 'login.html', {'form': form, 'message': message})


def log_out(request):
    auth.logout(request)
    return HttpResponseRedirect("/login/")



def home(request):

    return render(request, 'home_.html')


def home_zjk(request):

    return render(request, 'home_zjk.html')


def home_st(request):

    return render(request, 'home_st.html')


def home_wks(request):

    return render(request, 'home_wks.html')

def get_cpu_state(request):

    data = psutil.virtual_memory()
    total = data.total  # 总内存,单位为byte
    free = data.available  # 可以内存
    memory = (int(round(data.percent)))
    cpu = psutil.cpu_percent(interval=1)
    ret = [memory, cpu]
    js = json.dumps(ret)
    return HttpResponse(js)


def get_resource_monitor(request):

    return render(request, 'monitor.html')


def get_resource_topo(request):

    return render(request, 'resource-topo.html')


def compute_device_check(request, rid):
    return render(request, 'compute_device_check.html', {'rid': rid})


def get_road_info_yq(request):
    # 打开数据库连接
    db = pymysql.connect(host='39.99.192.63',
                         database='DEMODB',
                         port=3306,
                         user='devops',
                         password='devops',
                         charset="utf8",
                         use_unicode=True)

    # 使用cursor()方法获取操作游标
    cursor = db.cursor()

    # SQL 查询语句
    sql = " SELECT * FROM bd_road_yq;"
    res = []
    try:
        # 执行SQL语句
        cursor.execute(sql)
        # 获取所有记录列表
        results = cursor.fetchall()
        for data in results:
            dic = {'date': str(data[0]), 'road_name': data[1], 'text': data[1]+':'+data[6], 'speed': data[3], 'section_id': data[7], 'direction': data[9]}
            res.append(dic)
    except:
        print("Error: unable to fetch data")

    event_sql = " SELECT * FROM EVENT_yq;"
    events = []
    try:
        # 执行SQL语句
        cursor.execute(event_sql)
        # 获取所有记录列表
        results = cursor.fetchall()
        for data in results:
            dic = {'date': str(data[0]), 'content': data[2]}
            events.append(dic)
    except:
        print("Error: unable to fetch data")

    game_sql = " SELECT * FROM GAME_yq;"
    games = []
    try:
        # 执行SQL语句
        cursor.execute(game_sql)
        # 获取所有记录列表
        results = cursor.fetchall()
        for data in results:
            dic = {'date': str(data[0]), 'content': data[2]}
            games.append(dic)
    except:
        print("Error: unable to fetch data")


    # 关闭数据库连接
    db.close()
    re = {'road': res, 'event': events, 'game': games}
    js = json.dumps(re)

    return HttpResponse(js)


def get_road_info_st(request):
    # 打开数据库连接
    db = pymysql.connect(host='39.99.192.63',
                         database='DEMODB',
                         port=3306,
                         user='devops',
                         password='devops',
                         charset="utf8",
                         use_unicode=True)

    # 使用cursor()方法获取操作游标
    cursor = db.cursor()

    # SQL 查询语句
    sql = " SELECT * FROM bd_road_st;"
    res = []
    try:
        # 执行SQL语句
        cursor.execute(sql)
        # 获取所有记录列表
        results = cursor.fetchall()
        for data in results:
            dic = {'date': str(data[0]), 'road_name': data[1], 'text': data[1]+':'+data[6], 'speed': data[3], 'section_id': data[7], 'direction': data[9]}
            res.append(dic)
    except:
        print("Error: unable to fetch data")

    event_sql = " SELECT * FROM EVENT_st;"
    events = []
    try:
        # 执行SQL语句
        cursor.execute(event_sql)
        # 获取所有记录列表
        results = cursor.fetchall()
        for data in results:
            dic = {'date': str(data[0]), 'content': data[2]}
            events.append(dic)
    except:
        print("Error: unable to fetch data")

    game_sql = " SELECT * FROM GAME_st;"
    games = []
    try:
        # 执行SQL语句
        cursor.execute(game_sql)
        # 获取所有记录列表
        results = cursor.fetchall()
        for data in results:
            dic = {'date': str(data[0]), 'content': data[2]}
            games.append(dic)
    except:
        print("Error: unable to fetch data")


    # 关闭数据库连接
    db.close()
    re = {'road': res, 'event': events, 'game': games}
    js = json.dumps(re)

    return HttpResponse(js)


def get_road_info_wks(request):
    # 打开数据库连接
    db = pymysql.connect(host='39.99.192.63',
                         database='DEMODB',
                         port=3306,
                         user='devops',
                         password='devops',
                         charset="utf8",
                         use_unicode=True)

    # 使用cursor()方法获取操作游标
    cursor = db.cursor()

    # SQL 查询语句
    sql = " SELECT * FROM bd_road_wks;"
    res = []
    try:
        # 执行SQL语句
        cursor.execute(sql)
        # 获取所有记录列表
        results = cursor.fetchall()
        for data in results:
            dic = {'date': str(data[0]), 'road_name': data[1], 'text': data[1]+':'+data[6], 'speed': data[3], 'section_id': data[7], 'direction': data[9]}
            res.append(dic)
    except:
        print("Error: unable to fetch data")

    event_sql = " SELECT * FROM EVENT_wks;"
    events = []
    try:
        # 执行SQL语句
        cursor.execute(event_sql)
        # 获取所有记录列表
        results = cursor.fetchall()
        for data in results:
            dic = {'date': str(data[0]), 'content': data[2]}
            events.append(dic)
    except:
        print("Error: unable to fetch data")

    game_sql = " SELECT * FROM GAME_wks;"
    games = []
    try:
        # 执行SQL语句
        cursor.execute(game_sql)
        # 获取所有记录列表
        results = cursor.fetchall()
        for data in results:
            dic = {'date': str(data[0]), 'content': data[2]}
            games.append(dic)
    except:
        print("Error: unable to fetch data")


    # 关闭数据库连接
    db.close()
    re = {'road': res, 'event': events, 'game': games}
    js = json.dumps(re)

    return HttpResponse(js)


def trafficflow(request):

    return render(request, 'home_trafficflow.html')


task_list = [1, 2, 2, 2, 2, 2, 0]
task = [1, 1, 2, 2, 3, 4, 4]
flag = 0

def passenger_flow(request):
    data = psutil.virtual_memory()
    total = data.total  # 总内存,单位为byte
    free = data.available  # 可以内存
    memory = (int(round(data.percent)))
    cpu = psutil.cpu_percent(interval=1)

    data = {}
    global flag
    data['resource'] = [cpu+15, random.randint(10, 60), random.randint(10, 60)]
    data['label'] = task_list[flag]
    data['task'] = np.zeros(5).tolist()
    data['task'][task[flag]] = 1
    flag += 1
    if flag > 6:
        flag = 0
    print(data)
    js = json.dumps(data)

    return HttpResponse(js)


def query_resource(request):
    data = psutil.virtual_memory()
    total = data.total  # 总内存,单位为byte
    free = data.available  # 可以内存
    memory = (int(round(data.percent)))
    cpu = psutil.cpu_percent(interval=1)

    data = {}
    data['resource'] = [cpu+10, random.randint(10, 60), random.randint(10, 60)]
    js = json.dumps(data)

    return HttpResponse(js)


def data_flow(request):
    data = np.random.randint(200, 800, 26)
    js = json.dumps(data.tolist())
    return HttpResponse(js)
