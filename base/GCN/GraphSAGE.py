from __future__ import division, print_function
import networkx as nx
import torch
import torch.nn as nn
import dgl.function as fn


class GCN(nn.Module):
    def __init__(self):
        super(GCN, self).__init__()
        self.fc1 = nn.Linear(12, 12)
        self.fc2 = nn.Linear(12, 6)
        self.sc1 = nn.Linear(12, 6)
        self.bn1 = nn.BatchNorm1d(12)
        self.ac1 = nn.LeakyReLU()

        self.fc3 = nn.Linear(12, 12)
        self.fc4 = nn.Linear(12, 6)
        self.sc2 = nn.Linear(12, 6)
        self.bn2 = nn.BatchNorm1d(12)
        self.ac2 = nn.LeakyReLU()
        
        self.fc5 = nn.Linear(12, 12)
        self.fc6 = nn.Linear(12, 6)
        self.sc3 = nn.Linear(12, 6)
        self.bn3 = nn.BatchNorm1d(12)
        self.ac3 = nn.LeakyReLU()
    def forward(self, g, h):
        g.nodes['road'].data['speed'] = h
        
        funcs = {}
        funcs['link'] = (fn.copy_u('speed', 'm'), fn.mean('m', 'h_1'))
        g.multi_update_all(funcs, 'mean')
        
        h1_ = g.ndata['h_1']['road']
        
        h1 = self.fc1(torch.cat([h, h1_], dim=1))
        x = h1
        h1 = self.bn1(h1)
        h1 = self.ac1(h1)
        h1 = self.fc2(h1) + self.sc1(x)
        
        
        g.nodes['road'].data['h_1'] = h1
        funcs = {}
        funcs['link'] = (fn.copy_u('h_1', 'm'), fn.mean('m', 'h_2'))
        g.multi_update_all(funcs, 'mean')
        
        h2_ = g.ndata['h_2']['road']
        
        h2 = self.fc3(torch.cat([h1, h2_], dim=1))
        x = h2
        h2 = self.bn2(h2)
        h2 = self.ac2(h2)
        h2 = self.fc4(h2) + self.sc2(x)
        
        g.nodes['road'].data['h_2'] = h2
        funcs = {}
        funcs['link'] = (fn.copy_u('h_2', 'm'), fn.mean('m', 'h_3'))
        g.multi_update_all(funcs, 'mean')
        
        h3_ = g.ndata['h_3']['road']
        
        h3 = self.fc5(torch.cat([h2, h3_], dim=1))
        x = h3
        h3 = self.bn3(h3)
        h3 = self.ac3(h3)
        h3 = self.fc6(h3) + self.sc3(x)
        
        g.nodes['road'].data['h_3'] = h3
        funcs = {}
        funcs['direct'] = (fn.copy_u('h_3', 'f'), fn.mean('f', 'level'))
        g.multi_update_all(funcs, 'sum')
        
        return g.nodes['gym'].data['level']
    
class Classifier(nn.Module):
    def __init__(self):
        super(Classifier, self).__init__()
        self.classifier = nn.Linear(6, 3)
    def forward(self,h):
        res = self.classifier(h)
        return res
    
class Model(nn.Module):
    def __init__(self,gcn,classifier):
        super(Model, self).__init__()
        self.gcn = gcn
        self.classifier = classifier
    def forward(self,g,h):
        res = self.classifier(self.gcn(g,h))
        return res