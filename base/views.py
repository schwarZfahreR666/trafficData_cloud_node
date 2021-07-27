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
import requests
import uuid
from kafka import KafkaProducer,KafkaConsumer
from kafka.errors import KafkaError

# Create your views here.
# bh_node_url = 'http://47.95.159.86:9999/'
bh_node_url = 'http://127.0.0.1:9999/'
java_node_url = 'http://127.0.0.1:9999/'
database_host = '127.0.0.1'
database_name = 'TRAFFIC'
database_usrname = 'root'
database_password = '06240118'
kafka_server = '47.95.159.86:9092'



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


def home_at(request):

    return render(request, 'home_at.html')

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


def get_new_resource_topo(request):

    return render(request, 'new_resource-topo.html')




def compute_device_check(request, rid):
    return render(request, 'compute_device_check.html', {'rid': rid})


def get_road_info_yq(request):
    # 打开数据库连接
    db = pymysql.connect(host=database_host,
                         database=database_name,
                         port=3306,
                         user=database_usrname,
                         password=database_password,
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
            dic = {'date': str(data[1]), 'road_name': data[2], 'text': data[2]+':'+data[7], 'speed': data[4], 'section_id': data[9], 'direction': data[8]}
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
    db = pymysql.connect(host=database_host,
                         database=database_name,
                         port=3306,
                         user=database_usrname,
                         password=database_password,
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


def get_road_info_at(request):
    # 打开数据库连接
    db = pymysql.connect(host=database_host,
                         database=database_name,
                         port=3306,
                         user=database_usrname,
                         password=database_password,
                         charset="utf8",
                         use_unicode=True)

    # 使用cursor()方法获取操作游标
    cursor = db.cursor()

    # SQL 查询语句
    sql = " SELECT * FROM bd_road_at;"
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

    event_sql = " SELECT * FROM EVENT_at;"
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

    game_sql = " SELECT * FROM GAME_at;"
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
    db = pymysql.connect(host=database_host,
                         database=database_name,
                         port=3306,
                         user=database_usrname,
                         password=database_password,
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

    bh_data = requests.get(bh_node_url+"getCpuState")
    bh_data = json.loads(bh_data.content)
    bh_cpu = bh_data['cpu']
    bh_mem = bh_data['memory']

    data = {}
    data['resource'] = [cpu+10, float(bh_cpu)+10, random.randint(10, 60)]

    data['line'] = []
    data['line'].append(np.random.randint(2, 15, 24).tolist())
    data['line'].append(np.random.randint(1, 20, 24).tolist())
    js = json.dumps(data)

    return HttpResponse(js)


def data_flow(request):
    data = np.random.randint(200, 800, 26)
    js = json.dumps(data.tolist())
    return HttpResponse(js)


def getRoadInfo(request):
    res = requests.get(bh_node_url+"getRoadInfo").content

    return HttpResponse(res)


def switchRoadInfo(request):
    res = requests.get(bh_node_url+"switchRoadInfo").content

    return HttpResponse(res)


def RoadInfoState(request):
    res = requests.get(bh_node_url+"roadinfoState").content

    return HttpResponse(res)


# 集散模式
def get_mode_analysis(request):

    return render(request, 'mode_analysis.html')

def get_mode_predict(request):

    return render(request, 'mode_predict.html')
def get_mid_mode_predict(request):

    return render(request, 'mid_mode_predict.html')
def get_small_mode_predict(request):

    return render(request, 'small_mode_predict.html')

def get_big_mode2_analysis(request):

    return render(request, 'big_mode2_analysis.html')
def get_big_mode3_analysis(request):

    return render(request, 'big_mode3_analysis.html')
def get_big_mode4_analysis(request):

    return render(request, 'big_mode4_analysis.html')

def get_mid_mode1_analysis(request):

    return render(request, 'mid_mode1_analysis.html')
def get_mid_mode2_analysis(request):

    return render(request, 'mid_mode2_analysis.html')
def get_mid_mode3_analysis(request):

    return render(request, 'mid_mode3_analysis.html')
def get_small_mode1_analysis(request):

    return render(request, 'small_mode1_analysis.html')
def get_small_mode2_analysis(request):

    return render(request, 'small_mode2_analysis.html')


def toCloud(request):

    return render(request, 'new_monitor.html');

def tonew_home(request):

    return render(request, 'new_home.html');


def getBH(request):
    tasks = requests.get(java_node_url+'/rest/tasks')
    tasks = json.loads(tasks.content)
    task_name = []
    for task in tasks:
        task_name.append(task['name'])

    return render(request, 'bh_edgenode.html', {'tasks': task_name});

def toMap_test(request):

    return render(request, 'monitor_map.html');

def get_javaNode_sysInfo(request):
    res = requests.get(java_node_url+'/rest/sysInfo')
    return HttpResponse(res)

def start_task(request):
    res = ""
    if request.method == 'POST':
        producer = KafkaProducer(bootstrap_servers=kafka_server)
        consumer = KafkaConsumer('edge-cloud', group_id='cloud-edge-0', #auto_offset_reset='earliest',
                                 bootstrap_servers=kafka_server)
        topic = 'cloud-edge'
        name = request.POST['name']
        input = request.POST['input']
        try:

            dic = {}
            dic['id'] = str(uuid.uuid4().hex)
            dic['time'] = datetime.datetime.now().strftime("%Y%m%d %H:%M:%S")
            dic['name'] = name
            dic['input'] = input
            producer.send(topic, json.dumps(dic).encode())
            flag = 1
        except KafkaError as e:
            print(e)
        finally:
            producer.close()


        try:
            while flag:
                message = next(consumer)

                res = json.loads(message.value.decode())
                print(res)
                flag = res['status']
        except KeyboardInterrupt as e:
            print(e)

    return HttpResponse(res['info'])