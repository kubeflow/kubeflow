import requests
from lxml import etree
import os
import json
import pprint
import kubernetes
from kubernetes.client.rest import ApiException
from pprint import pprint
import sys
import time
#load kube config for cluster
# FIXME: we need to prepare a service account to prove the access to PV&PVC
try:
    kubernetes.config.load_kube_config('config')
except:
    kubernetes.config.load_incluster_config()
# create an instance of the API class for PV/PVC
api_instance = kubernetes.client.CoreV1Api()

# 請將這裡的 IP, 用戶名及密碼換成實際的 QNAP 伺服器資訊
# move to configmap

qnap_ip = os.environ["IP"]
username = os.environ["USERNAME"]
password = os.environ["PASSWORD"]

# 使用 QNAP API 登錄並獲取 SID
while True:
    try:
        login_url = f"http://{qnap_ip}:8080/cgi-bin/filemanager/authLogin.cgi?user={username}&plain_pwd={password}"
        response = requests.get(login_url)
        break
    except:
        time.sleep(1)

if response.status_code != 200:
    print("Failed to login to QNAP server")
    os._exit(1)

# 解析 XML 以獲取 sid
tree = etree.fromstring(response.content)
auth_passed = tree.find('authPassed').text
if auth_passed != '1':
    print('Authentication failed')
    os._exit(1)

auth_sid = tree.find('authSid').text
print("SID:", auth_sid)

# 驗證 SID
check_sid_url = f"http://{qnap_ip}:8080/cgi-bin/filemanager/utilRequest.cgi?func=check_sid&sid={auth_sid}"
response = requests.get(check_sid_url)
check_result = json.loads(response.text)
if check_result.get("status") != 1:
    print("Invalid SID")
    os._exit(1)

# 繳封檔案或資料夾
import sys

def get_pvc_path(namespace,pvcname):
    try:
        api_response = api_instance.read_namespaced_persistent_volume_claim(pvcname, namespace)
        pprint(api_response)
        # get the pv from the pvc
        pvname = api_response.spec.volume_name
        print(pvname)
        # get the pv details
        pv_response = api_instance.read_persistent_volume(pvname)
        pprint(pv_response)
        # get the path of nfs from the pv
        path = pv_response.spec.nfs.path
        print(path)
        # get the host of nfs from the pv
        host = pv_response.spec.nfs.server
        print(host)
        # get the pod name
        return path,host
    except ApiException as e:
        print("Exception when calling AppsV1Api->read_namespaced_persistent_volume_claim: %s\n" % e)
        return 'NA'

source_file,source_host=get_pvc_path(sys.argv[1],sys.argv[2])
dest_path,dest_host=get_pvc_path(sys.argv[1],sys.argv[3])
if dest_host != source_host:
    os.system("cp -a /source/.[a-zA-Z]* /home/jovtan")
    os.exit(0)
# 獲取指定目錄的文件樹
get_tree_url = f"http://{qnap_ip}:8080/cgi-bin/filemanager/utilRequest.cgi?func=get_list&sid={auth_sid}&path={source_file}&list_mode=all&start=0&sort=filename&limit=1000"
response = requests.get(get_tree_url)
tree_result = json.loads(response.text)
files=[item['filename'] for item in tree_result['datas']]
print(f'{source_file} ----> {dest_path}')

for fn in files:
    print(fn)
    cmd=f"http://{qnap_ip}:8080/cgi-bin/filemanager/utilRequest.cgi?func=copy&sid={auth_sid}&source_file={fn}&source_total=1&source_path={source_file}&dest_path={dest_path}&mode=1&dup=overwrite&hidden_file=1"    
    res=requests.get(cmd)
    print(res.text)
#pprint.pprint(files)

os.system("find /source -type d -name '\.*' > /tmp/list.txt")
f=open("/tmp/list.txt",'r')
dirs=f.read().split("\n")

for d in dirs:
    # remote /source prefix
    ff=d.split('/')
    basename = ff[-1]
    dirpath = '/'.join(ff[2:-1])
    spath = os.path.join(source_file,dirpath)
    dpath = os.path.join(dest_path,dirpath)
    print(f'{spath} to {dpath} name={basename}')
    cmd=f"http://{qnap_ip}:8080/cgi-bin/filemanager/utilRequest.cgi?func=copy&sid={auth_sid}&source_file={basename}&source_total=1&source_path={spath}&dest_path={dpath}&mode=1&dup=overwrite&hidden_file=1"    
    res=requests.get(cmd)
    print(res.text)
    

