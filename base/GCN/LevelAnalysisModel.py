from base.GCN.GraphSAGE import GCN,Classifier,Model
from base.GCN.XGboost import XGBoost
import base.GCN.XGBoostTree as XGBoostTree
from base.GCN.XGBoostTree import XGBoostRegressionTree
from base.GCN.DecisionTree import DecisionTree
from base.GCN.DecisionNode import DecisionNode

import torch
import shelve
import numpy as np
import dgl
import json
import os


MODEL_PATH = os.path.join('base', 'GCN', "model")

class AnalysisModel():
    def __init__(self):
        self.GraphSAGE = Model(GCN(),Classifier())
        self.GraphSAGE.load_state_dict(torch.load(MODEL_PATH + "/GraphSAGE_pram.pkl"))
        self.gcn = self.GraphSAGE.gcn
        self.xg_model = XGBoost()
        self.xg_model.trees = read_shelve()

    def predict(self,g,input):
        level = self.gcn(g,input)
        mid = []
        mid.append(level[0].tolist())
        res = self.xg_model.predict(np.array(mid))
        return round(res[0][0])

class ATAnalysisModel(AnalysisModel):
    def __init__(self):
        super().__init__()
        self.g = None
        self.name2id = None
        self.id2level = None
        self.level2speed = None
        self.input_data = None

    def buildGraph(self,neo4j_connect):
        # 获取国家体育馆4跳之内的路名节点
        query = "match (p:gym {name:'国家体育馆'})-[edge*1..4]->(q:road) return id(q) as qid,q.name as name;"
        res = neo4j_connect.run(query).data()
        nodesid = set()
        name2id = {}
        id2name = {}
        for row in res:
            nodesid.add(row['qid'])
            name2id[row['name']] = row['qid']
            id2name[row['qid']] = row['name']

        # 找到各个路段
        query = "match (p:road)-->(q:road) where id(q) in " + str(list(nodesid)) + " and id(p) in " + str(list(nodesid)) + " return id(p) as pid,id(q) as qid;"
        res = neo4j_connect.run(query).data()
        road_starts = []
        road_ends = []
        for row in res:
            road_starts.append(row['pid'])
            road_ends.append(row['qid'])

        # 找到与gym直接相连的路段
        query = "match (p:gym)-->(q:road) where id(p)=0 return id(p) as pid,id(q) as qid;"
        res = neo4j_connect.run(query).data()
        gym_starts = []
        gym_ends = []
        for row in res:
            gym_starts.append(row['pid'])
            gym_ends.append(row['qid'])

        # 找到路段默认等级、限速
        level2speed = {"1":100,"2":100,"3":80,"4":80,"5":60,"6":60}
        query = "match (p:road) where id(p) in " + str(list(nodesid)) + " return id(p) as pid,p.road_level as level;"
        res = neo4j_connect.run(query).data()
        id2level = {}
        for row in res:
            id2level[row['pid']] = row['level']

        # 构建gym和road两类节点的异质图
        graph_data = {
        ('road', 'direct', 'gym'): (torch.tensor(gym_ends),torch.tensor(gym_starts)),
        ('road', 'link', 'road'): (torch.tensor(road_starts), torch.tensor(road_ends))
        }
        self.g = dgl.heterograph(graph_data)
        self.name2id = name2id
        self.id2level = id2level
        self.level2speed = level2speed


    def build_data(self):
        # 数据组成
        data_file = MODEL_PATH + "/at_default_data.json"
        data = []
        with open(data_file,'r') as fd:
                content = json.load(fd)
                dic = {}
                for item in content:
                    
                    if item in self.name2id:
                        dic[self.name2id[item]] = content[item]
                data.append(dic)

        # 按id顺序组装数据
        x_data = []  # data_num * node_num
        NODE_NUM = len(self.g.nodes('road'))
        ITEM_LEN = 6
        for item in data:
            data_item = []
            for i in range(NODE_NUM):
                if i in item:
                    if i in self.id2level:
                        new_item = [x if x != -1 else self.level2speed[self.id2level[i]] for x in item[i]]
                    else:
                        new_item = [60 for x in item[i]]
                    data_item.append(new_item)
                else:
                    if i in self.id2level:
                        default_item = [self.level2speed[self.id2level[i]] for _ in range(ITEM_LEN)]
                    else:
                        default_item = [60 for _ in range(ITEM_LEN)]
                    data_item.append(default_item)
            x_data.append(data_item)

        self.input_data = torch.FloatTensor(x_data)


    def update_data(self, data_dic):
        np_array = self.input_data.numpy()
        old = np_array[:,:,1:np_array.shape[2]]
        data = []
        NODE_NUM = len(self.g.nodes('road'))
        for i in range(NODE_NUM):
            if i in self.id2level:
                new_item = self.level2speed[self.id2level[i]]
            else:
                new_item = 60
            data.append(new_item)
        for key in data_dic:
            if key in self.name2id:
                id = self.name2id[key]
                data[id] = data_dic[key]
        new = np.expand_dims(np.expand_dims(np.array(data),axis=0),axis=-1)
        res = np.concatenate([old, new], axis=2)

        self.input_data = torch.FloatTensor(res)



    def predict(self,input):
        level = self.gcn(self.g,input)
        mid = []
        mid.append(level[0].tolist())
        res = self.xg_model.predict(np.array(mid))
        return round(res[0][0])



def read_shelve():
    db = shelve.open(MODEL_PATH + '/xg_boost')           # 打开文件  赋值句柄给db
    model = db['model']
    return model


