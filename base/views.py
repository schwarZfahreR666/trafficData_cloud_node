from django.shortcuts import render, redirect, HttpResponseRedirect, HttpResponse
from django.http import JsonResponse
from base.forms import LoginForm
from django.contrib import auth
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
import psutil
import re
import os, time
import datetime
import redis
import json
import pymysql
import random
import numpy as np
import requests
import uuid
from apscheduler.events import EVENT_JOB_EXECUTED
from apscheduler.executors.pool import ThreadPoolExecutor
from apscheduler.jobstores.memory import MemoryJobStore
from apscheduler.triggers.interval import IntervalTrigger
from apscheduler.schedulers.background import BackgroundScheduler
from kafka import KafkaProducer,KafkaConsumer
from kafka.errors import KafkaError
import pika

from base.ner.predict_span import predict,model_init
from base.spiders.event import get_event_yingjiju, get_event_bendibao, get_event_jiaoguanju, get_event_bus

# Create your views here.
# bh_node_url = 'http://47.95.159.86:9999/'
bh_node_url = 'http://127.0.0.1:9999/'
# java_node_url = 'http://10.136.213.221:9999/'
# java_node_url = 'http://127.0.0.1:9999/'
database_host = '47.95.159.86'
database_name = 'TRAFFIC'
database_usrname = 'root'
database_password = '06240118'
kafka_server = '47.95.159.86:9092'
rabbitmq_host = '47.95.159.86'
redis_host = '47.95.159.86'

TASKS = ["road_wks", "road_st", "road_at", "road_yq", "weather", "jtw_roadinfo"]

LEVEL_MAP = {1: 4, 2: 3, 3: 2}

task_state = []
init_num = 0
event_switch = 0

tokenizer, label_list, model, device, id2label = model_init()

default_jobstore = MemoryJobStore()
default_executor = ThreadPoolExecutor(15)

init_scheduler_options = {
    "jobstores": {
        # first 为 jobstore的名字，在创建Job时直接直接此名字即可
        "default": default_jobstore
    },
    "executors": {
        # first 为 executor 的名字，在创建Job时直接直接此名字，执行时则会使用此executor执行
        "default": default_executor
    },
    # 创建job时的默认参数
    "job_defaults": {
        'coalesce': False,  # 是否合并执行
        'max_instances': 1  # 最大实例数
    }
}

scheduler = BackgroundScheduler(**init_scheduler_options)
scheduler.start()

def event_ner(request):


    # input_text = "决定2020年8月12日至2020年9月10日期间，宫门口西岔(安平巷—阜成门内大街)采取禁止机动车由南向北方向行驶交通管理措施。"
    input_text = "一、丰德中路（永盛北路至永澄北路段）禁止机动车由西向东方向行驶；"
    res = predict(input_text, tokenizer, label_list, model, device, id2label)

    # res = {"info": "未开启"}
    return JsonResponse(res, json_dumps_params={'ensure_ascii': False})

def getYingjiju(request):
    res = get_event_yingjiju()

    return JsonResponse(res, safe=False)


def getBendibao(request):
    res = get_event_bendibao()
    return JsonResponse(res, safe=False)


def getJiaoguanju(request):
    res = get_event_jiaoguanju()
    return JsonResponse(res, safe=False)


def getBus(request):
    res = get_event_bus()
    return JsonResponse(res, safe=False)

def job_execute(event):
    """
    监听事件处理
    :param event:
    :return:
    """
    print(
        "job执行job:\ncode => {}\njob.id => {}\njobstore=>{}".format(
            event.code,
            event.job_id,
            event.jobstore
        ))
    if event.job_id in TASKS:
        state = "数据融合"
        global task_state
        for i in range(0,len(task_state)):
            if task_state[i]['name'] == event.job_id:
                task_state[i]['state'] = state




def buildTask():
    # tasks = requests.get(java_node_url+'/rest/tasks')
    # tasks = json.loads(tasks.content)


    credentials = pika.PlainCredentials('root', '06240118')  # mq用户名和密码
    # 虚拟队列需要指定参数 virtual_host，如果是默认的可以不填。
    connection = pika.BlockingConnection(pika.ConnectionParameters(host = rabbitmq_host,port = 5672,virtual_host = '/',credentials = credentials))
    dic = {}
    dic['node_name'] = "BUAA"
    dic['info_name'] = "tasks"

    # producer.send(topic, json.dumps(dic).encode())
    msg = json.dumps(dic)
    channel = connection.channel()
    try:
        channel.basic_publish(exchange='cloud-send',
                              routing_key='',
                              body=msg)

        flag = 1

        while flag:
            method_frame, header_frame, body = channel.basic_get(queue='edge-send-queue',
                                                                 auto_ack=False)
            if method_frame != None:
                res = json.loads(body)
                if res['id'] == "tasks":
                    channel.basic_ack(delivery_tag = method_frame.delivery_tag)
                    flag = 0
                else:
                    channel.basic_reject(delivery_tag = method_frame.delivery_tag)

    finally:
        connection.close()

    tasks = res["content"]

    global task_state
    task_state = []
    for task in tasks:
        item = {}
        if task['name'] in TASKS:
            item['name'] = task['name']
            item['level'] = random.randint(1, 3)
            item['state'] = "初始化"
            item['frequent'] = LEVEL_MAP[item['level']]
            item['edge_flow'] = 0
            item['cloud_flow'] = 0
            task_state.append(item)


def updateTask():
    global task_state
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
    sql = " SELECT task_name,edge_flow,cloud_flow as cloud_sum FROM flow_table where to_days(time) = to_days(now());"
    res = {}
    try:
        # 执行SQL语句
        cursor.execute(sql)
        # 获取所有记录列表
        results = cursor.fetchall()
        for data in results:
            if data[0] in TASKS:
                if data[0] not in res:
                    res[data[0]] = [0, 0]
                res[data[0]][0] += data[1]
                res[data[0]][1] += data[2]
        for i in range(0,len(task_state)):
            if task_state[i]['name'] in res:
                task_state[i]['edge_flow'] = res[task_state[i]['name']][0]
                task_state[i]['cloud_flow'] = res[task_state[i]['name']][1]

    except:
        print("Error: unable to fetch data")
    db.close()




def taskSchedule2():
    global event_switch
    global scheduler
    global task_state
    if event_switch == 1:
        # 事件采集
        ex_task("BUAA", "event")

        #态势研判
        area_level_analysis()


def area_level_analysis():
    pool = redis.ConnectionPool(host=redis_host, port=6379, password="06240118")  #配置连接池连接信息
    connect = redis.Redis(connection_pool=pool)
    for i in range(0, 17):
        time = []
        position = []
        address = []
        action = []
        dic = {"time":time, "position":position, "address":address, "action":action}
        ret = connect.get('event' + str(i))
        content = ret.decode("utf-8")
        res = re.split(r';|；|。', content)
        for text in res:
            if text != '':
                res = predict(text, tokenizer, label_list, model, device, id2label)
                if res != None:
                    for key in res['label']:
                        for item in res['label'][key].keys():
                            dic[key].append(item)
        for date in dic['time']:
            if '日' in date and '月' in date:
                pattern = re.compile(r'([0-9]+)月')
                month = pattern.search(date).group(1)
                pattern = re.compile(r'([0-9]+)日')
                day = pattern.search(date).group(1)
                time = datetime.datetime.strptime(str(datetime.datetime.now().year)+month+day, "%Y%m%d").date()
                now = datetime.datetime.strftime(datetime.datetime.now(), '%Y-%m-%d')


                print(now,time)








def taskSchedule():
    global event_switch
    global scheduler
    global task_state
    if event_switch == 1:
        state = "事件采集"
        i = random.randint(0, 2)
        task_state[i]['state'] = state
        time.sleep(20)


        state = "态势研判"
        task_state[i]['state'] = state
        time.sleep(10)
        level = random.randint(1, 3)
        if level != task_state[i]['level']:
            task_state[i]['level'] = level
            task_state[i]['frequent'] = LEVEL_MAP[level]
            if scheduler.get_job(task_state[i]['name'], "default"):
                # 存在的话，先删除
                scheduler.get_job(task_state[i]['name'], "default").pause()
                scheduler.remove_job(task_state[i]['name'], "default")

            scheduler.add_job(task_job, IntervalTrigger(minutes=LEVEL_MAP[level]), args=["BUAA", task_state[i]['name']], id=task_state[i]['name'], jobstore="default", executor="default")


def taskInit():
    global event_switch
    global init_num
    global task_state
    if event_switch == 1 and init_num == 0:
        for task in task_state:
            scheduler.add_job(task_job, IntervalTrigger(minutes=LEVEL_MAP[task['level']]), args=["BUAA", task['name']], id=task['name'], jobstore="default", executor="default")

        init_num = 1


buildTask()
scheduler.add_listener(job_execute, EVENT_JOB_EXECUTED)
scheduler.add_job(updateTask, IntervalTrigger(seconds=30), id="updateTask", jobstore="default", executor="default")
scheduler.add_job(taskInit, IntervalTrigger(seconds=30), id="taskInit", jobstore="default", executor="default")
scheduler.add_job(taskSchedule, IntervalTrigger(minutes=3), id="taskSchedule", jobstore="default", executor="default")
# scheduler.add_job(taskSchedule2, IntervalTrigger(minutes=3), id="taskSchedule2", jobstore="default", executor="default")

def ex_task(node_name, task_name):
    credentials = pika.PlainCredentials('root', '06240118')  # mq用户名和密码
    # 虚拟队列需要指定参数 virtual_host，如果是默认的可以不填。
    connection = pika.BlockingConnection(pika.ConnectionParameters(host = rabbitmq_host,port = 5672,virtual_host = '/',credentials = credentials))
    try:

        dic = {"node_name": node_name, "task_name": task_name}

        msg = json.dumps(dic)
        channel = connection.channel()
        channel.basic_publish(exchange='auto-cloud-edge',
                              routing_key='',
                              body=msg)


        flag = 1

        while flag:

            method_frame, header_frame, body = channel.basic_get(queue='auto-edge-cloud-queue',
                                                                 auto_ack=False)
            if method_frame != None:
                res = json.loads(body)
                if res['res'] == task_name:
                    channel.basic_ack(delivery_tag = method_frame.delivery_tag)
                    flag = 0
                else:
                    channel.basic_reject(delivery_tag = method_frame.delivery_tag)

    finally:
        connection.close()



def task_job(node_name, task_name):
    global event_switch
    if event_switch == 0:
        return
    credentials = pika.PlainCredentials('root', '06240118')  # mq用户名和密码
    # 虚拟队列需要指定参数 virtual_host，如果是默认的可以不填。
    connection = pika.BlockingConnection(pika.ConnectionParameters(host = rabbitmq_host,port = 5672,virtual_host = '/',credentials = credentials))
    state = "数据采集"
    global task_state
    for i in range(0,len(task_state)):
        if task_state[i]['name'] == task_name:

            task_state[i]['state'] = state
    try:

        dic = {"node_name": node_name, "task_name": task_name}

        msg = json.dumps(dic)
        channel = connection.channel()
        channel.basic_publish(exchange='auto-cloud-edge',
                                  routing_key='',
                                  body=msg)


        flag = 1

        while flag:

            method_frame, header_frame, body = channel.basic_get(queue='auto-edge-cloud-queue',
                                                             auto_ack=False)
            if method_frame != None:
                res = json.loads(body)
                if res['res'] == task_name:
                    channel.basic_ack(delivery_tag = method_frame.delivery_tag)
                    flag = 0
                else:
                    channel.basic_reject(delivery_tag = method_frame.delivery_tag)

    finally:
        connection.close()




def eventDriving(request):
    ans = {'status': "off"}
    ans = json.dumps(ans)

    if request.method == "POST":
        global task_state
        global event_switch

        switch = request.POST['switch']
        if switch == "on":
            event_switch = 1

            ans = {'status': "on", 'task_state': task_state}
            ans = json.dumps(ans)
        elif switch == "off":
            event_switch = 0
            ans = {'status': "off"}
            ans = json.dumps(ans)
    return HttpResponse(ans)

def taskState(request):
    if event_switch == 0:
        ans = {"status": 0}
        ans = json.dumps(ans)

    elif event_switch == 1:
        ans = {"status": 1, "data": task_state}
        ans = json.dumps(ans)

    return HttpResponse(ans)

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

    # return render(request, 'home_.html')
    return render(request, 'new_home.html')


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
            dic = {'date': str(data[1]), 'road_name': data[2], 'text': data[2] + ':' + data[7], 'speed': data[4],
                   'section_id': data[9], 'direction': data[8]}
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
            # print(data)
            dic = {'date': str(data[1]), 'road_name': data[2], 'text': data[2] + ':' + data[7], 'speed': data[4],
                   'section_id': data[9], 'direction': data[8]}
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
            dic = {'date': str(data[1]), 'road_name': data[2], 'text': data[2] + ':' + data[7], 'speed': data[4],
                   'section_id': data[9], 'direction': data[8]}
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


def get_road_info_sg(request):
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
    sql = " SELECT * FROM bd_road_sg;"
    res = []
    try:
        # 执行SQL语句
        cursor.execute(sql)
        # 获取所有记录列表
        results = cursor.fetchall()
        for data in results:
            dic = {'date': str(data[1]), 'road_name': data[2], 'text': data[2] + ':' + data[7], 'speed': data[4],
                   'section_id': data[9], 'direction': data[8]}
            res.append(dic)
    except:
        print("Error: unable to fetch data")

    event_sql = " SELECT * FROM EVENT_sg;"
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

    game_sql = " SELECT * FROM GAME_sg;"
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


def get_road_info_zjk(request):
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
    sql = " SELECT * FROM bd_road_zjk;"
    res = []
    try:
        # 执行SQL语句
        cursor.execute(sql)
        # 获取所有记录列表
        results = cursor.fetchall()
        for data in results:
            dic = {'date': str(data[1]), 'road_name': data[2], 'text': data[2] + ':' + data[7], 'speed': data[4],
                   'section_id': data[9], 'direction': data[8]}
            res.append(dic)
    except:
        print("Error: unable to fetch data")

    event_sql = " SELECT * FROM EVENT_zjk;"
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

    game_sql = " SELECT * FROM GAME_zjk;"
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
    data = np.random.randint(200, 800, 1)
    js = json.dumps(data.tolist())

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
    sql = " SELECT sum(edge_flow) as edge_sum,sum(cloud_flow) as cloud_sum FROM flow_table;"
    res = []
    try:
        # 执行SQL语句
        cursor.execute(sql)
        # 获取所有记录列表
        results = cursor.fetchall()

        res = []
        res.append(int(results[0][0]))
        js = json.dumps(res)

    except:
        print("Error: unable to fetch data")
    db.close()
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


def new_od_mode(request, name):

    name = '/' + name + '/'

    return render(request, 'od_mode.html', {"src": name})

def new_od_predict(request, name):

    name = '/' + name + '/'

    return render(request, 'od_predict.html', {"src": name})


def toCloud(request):
    return render(request, 'new_monitor.html');


def toTopo(request):
    return render(request, 'new_resource-topo.html');


def tonew_home(request):
    return render(request, 'new_home.html');


def new_home_at(request):
    return render(request, 'new_home_at.html');


def new_home_st(request):
    return render(request, 'new_home_st.html');


def new_home_wks(request):
    return render(request, 'new_home_wks.html');


def new_home_sg(request):
    return render(request, 'new_home_sg.html');


def new_home_zjk(request):
    return render(request, 'new_home_zjk.html');


tasks_map = {}


def getBH(request):
    credentials = pika.PlainCredentials('root', '06240118')  # mq用户名和密码
    # 虚拟队列需要指定参数 virtual_host，如果是默认的可以不填。
    connection = pika.BlockingConnection(pika.ConnectionParameters(host = rabbitmq_host,port = 5672,virtual_host = '/',credentials = credentials))
    dic = {}
    dic['node_name'] = "BUAA"
    dic['info_name'] = "tasks"

    # producer.send(topic, json.dumps(dic).encode())
    msg = json.dumps(dic)
    channel = connection.channel()
    try:
        channel.basic_publish(exchange='cloud-send',
                          routing_key='',
                          body=msg)

        flag = 1

        while flag:
            method_frame, header_frame, body = channel.basic_get(queue='edge-send-queue',
                                                             auto_ack=False)
            if method_frame != None:
                res = json.loads(body)
                if res['id'] == "tasks":
                    channel.basic_ack(delivery_tag = method_frame.delivery_tag)
                    flag = 0
                else:
                    channel.basic_reject(delivery_tag = method_frame.delivery_tag)

    finally:
        connection.close()

    tasks = res["content"]

    # tasks = requests.get(java_node_url + '/rest/tasks')
    #
    # tasks = json.loads(tasks.content)


    task_name = []
    global tasks_map
    global event_switch
    if event_switch == 1:
        switch = "on"
    else:
        switch = "off"
    for task in tasks:

        task_name.append(task['name'])

    return render(request, 'bh_edgenode.html', {'tasks': task_name, 'switch': switch});

def toMap_test(request):

    return render(request, 'monitor_map.html');

def get_javaNode_sysInfo(request):
    # res = requests.get(java_node_url+'/rest/sysInfo')

    credentials = pika.PlainCredentials('root', '06240118')  # mq用户名和密码
    # 虚拟队列需要指定参数 virtual_host，如果是默认的可以不填。
    connection = pika.BlockingConnection(pika.ConnectionParameters(host = rabbitmq_host,port = 5672,virtual_host = '/',credentials = credentials))
    dic = {}
    dic['node_name'] = "BUAA"
    dic['info_name'] = "sysInfo"

    # producer.send(topic, json.dumps(dic).encode())
    msg = json.dumps(dic)
    channel = connection.channel()
    try:
        channel.basic_publish(exchange='cloud-send',
                              routing_key='',
                              body=msg)

        flag = 1

        while flag:
            method_frame, header_frame, body = channel.basic_get(queue='edge-send-queue',
                                                                 auto_ack=False)
            if method_frame != None:
                res = json.loads(body)
                if res['id'] == "sysInfo":
                    channel.basic_ack(delivery_tag = method_frame.delivery_tag)
                    flag = 0
                else:
                    channel.basic_reject(delivery_tag = method_frame.delivery_tag)

    finally:
        connection.close()

    res = json.dumps(res["content"])

    return HttpResponse(res)

def start_task(request):
    res = ""
    # producer = KafkaProducer(bootstrap_servers=kafka_server)
    # consumer = KafkaConsumer('edge-cloud', group_id='cloud-edge-0', #auto_offset_reset='earliest',
    #                      bootstrap_servers=kafka_server)
    credentials = pika.PlainCredentials('root', '06240118')  # mq用户名和密码
    # 虚拟队列需要指定参数 virtual_host，如果是默认的可以不填。
    connection = pika.BlockingConnection(pika.ConnectionParameters(host = rabbitmq_host,port = 5672,virtual_host = '/',credentials = credentials))

    if request.method == 'POST':

        topic = 'cloud-edge'
        name = request.POST['name']
        # input = request.POST['input']
        input = ''
        # res = request.POST['res']
        res = 'no'

        try:

            dic = {}
            dic['id'] = str(uuid.uuid4().hex)
            dic['time'] = datetime.datetime.now().strftime("%Y%m%d %H:%M:%S")
            dic['name'] = name
            dic['input'] = input
            dic['res'] = res

            # producer.send(topic, json.dumps(dic).encode())
            msg = json.dumps(dic)
            channel = connection.channel()
            channel.basic_publish(exchange='cloud-edge',
                                  routing_key='',
                                  body=msg)
            print("发送数据：" + str(dic))
            flag = 1
        except KafkaError as e:
            print(e)



        try:

            while flag:

                # message = next(consumer)
                channel = connection.channel()
                method_frame = None
                count = 0
                while method_frame == None:
                    count += 1
                    method_frame, header_frame, body = channel.basic_get(queue='edge-cloud-queue',
                                            auto_ack=True)
                    if count >= 10000:
                        return HttpResponse("请求超时")

                res = json.loads(body)

                print("接收数据:" + str(res))
                flag = res['status']


        except KeyboardInterrupt as e:
            print(e)
        finally:
            connection.close()
    ans = res['info']
    if res['res'] != "":
        ans = "返回数据："
        ans += res['res']
    return HttpResponse(ans)



def getHealth(request):
    # res = requests.get(java_node_url+'/rest/health')

    credentials = pika.PlainCredentials('root', '06240118')  # mq用户名和密码
    # 虚拟队列需要指定参数 virtual_host，如果是默认的可以不填。
    connection = pika.BlockingConnection(pika.ConnectionParameters(host = rabbitmq_host,port = 5672,virtual_host = '/',credentials = credentials))
    dic = {}
    dic['node_name'] = "BUAA"
    dic['info_name'] = "health"

    # producer.send(topic, json.dumps(dic).encode())
    msg = json.dumps(dic)
    channel = connection.channel()
    try:
        channel.basic_publish(exchange='cloud-send',
                              routing_key='',
                              body=msg)

        flag = 1

        while flag:
            method_frame, header_frame, body = channel.basic_get(queue='edge-send-queue',
                                                                 auto_ack=False)
            if method_frame != None:
                res = json.loads(body)
                if res['id'] == "health":
                    channel.basic_ack(delivery_tag = method_frame.delivery_tag)
                    flag = 0
                else:
                    channel.basic_reject(delivery_tag = method_frame.delivery_tag)

    finally:
        connection.close()


    ans = {"BUAA 北京航空航天大学": res["content"]}
    # ans = {"BUAA 北京航空航天大学": res.text}
    ans = json.dumps(ans)
    return HttpResponse(ans)


def refchangfeng(request):

    return redirect("http://121.89.204.250:9090/")


def datashow(request):

    return redirect("http://121.89.204.250:9090/#/dashboard")


def apidata(request):

    return redirect("http://121.89.204.250:9090/#/dataCollection/timedTask")


def filedata(request):

    return redirect("http://121.89.204.250:9090/#/dataCollection/ontTimeTask")


def usermanage(request):

    return redirect("http://121.89.204.250:9090/#/dataMonitoring/authority/userList")


def projectmanage(request):

    return redirect("http://121.89.204.250:9090/#/dataMonitoring/project/list")


def imagemanage(request):

    return redirect("http://121.89.204.250:9090/#/dataMonitoring/mirrorList/list")


def dockermanage(request):

    return redirect("http://121.89.204.250:9090/#/dataMonitoring/container/list")


def programmamanage(request):

    return redirect("http://121.89.204.250:9090/#/dataMonitoring/program/list")


def taskmanage(request):

    return redirect("http://121.89.204.250:9090/#/dataMonitoring/job/timedTask2")

def nodemanage(request):

    return redirect("http://121.89.204.250:9090/#/cloudEdgeCollaboration/list")

def toposhow(request):

    return redirect("http://121.89.204.250:9090/#/cloudEdgeCollaboration/Topology")

def timeapi(request):

    return redirect("http://121.89.204.250:9090/#/dataAccess/timedTask")

def onceapi(request):

    return redirect("http://121.89.204.250:9090/#/dataAccess/outTimeTask")







