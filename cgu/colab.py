#!/usr/bin/python3
import os
import re
import time
import kubernetes


notebooks={}
MAX_LIVE_TIME=60*60
static_pods=[
        'd000018238:baby',
        'd000018238:algebra1',
        'd000018238:public',
        'd000018238:deeplearning',
        'temp:ollama',
        'testcc:hf-code-autocomplete',
        'm1161009:vit3',
        'testcc1:hf',
]
def update_state(p):
    tag = p[0]+':'+p[2]
    if tag not in notebooks:
        notebooks[tag] = time.time() + MAX_LIVE_TIME

def check_live(p):
    tag = p[0]+':'+p[2]
    print(tag,notebooks[tag] - time.time())
    if notebooks[tag] < time.time():
        return False
    return True

def alive(p):
    tag = p[0]+':'+p[2]
    print('extend alive time '+tag)
    notebooks[tag] = time.time() + MAX_LIVE_TIME
def check_static(p):
    namespace = p[0]
    pod = p[2]
    tag = namespace +':'+pod

    try:
        if tag in static_pods:
            print('skip %s' % tag)
            return True
    except:
        pass
    return False
def check_pod(p,profiles):
    if not p[0] in  profiles: return
    if p[2].find('istio') != -1: return
    if p[2].find('ml-pipeline') != -1: return
    #print(p)
    update_state(p)
    if check_static(p): return
    if int(p[3][:-1]) < 300:
        if check_live(p):
            return
        cmd = "kubectl annotate notebook/%s kubeflow-resource-stopped='true' -n  %s " % (p[2],p[0])
        print('stop %s %s' % (p[0],p[2]))
        os.system(cmd)
        time.sleep(10)
        del notebooks[p[0]+':'+p[2]]
    else:
        alive(p)
def get_profiles():
    os.system('kubectl get profile -A > /tmp/profile.tmp')
    f=open('/tmp/profile.tmp','r')
    profiles={}
    for l in f.read().split('\n'):
        ff= re.split(r"[ \t]+",l)
        if (len(ff)) != 2: continue
        if ff[0] == 'NAME': continue
        profiles[ff[0]] = 1
    return profiles

def poll():

    profiles=get_profiles()
    #print(profiles)
    os.system("kubectl top po -A --containers --use-protocol-buffers > /tmp/monitor.log")
    f = open("/tmp/monitor.log",'r')
    lines = f.read()
    f.close()
    items=lines.split("\n")
    for l in items:
        ff = re.split(r"[ \t]+",l)
        if len(ff) == 6:
            check_pod(ff,profiles)

while True:
    poll()
    time.sleep(5)
