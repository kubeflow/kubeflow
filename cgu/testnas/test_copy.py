import requests
from lxml import etree
import os
import json
import pprint

# 請將這裡的 IP, 用戶名及密碼換成實際的 QNAP 伺服器資訊
qnap_ip = "10.100.4.70"
username = "qnapuser"
password = "P@ssw0rd"

# 使用 QNAP API 登錄並獲取 SID
login_url = f"http://{qnap_ip}:8080/cgi-bin/filemanager/authLogin.cgi?user={username}&plain_pwd={password}"
response = requests.get(login_url)

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

source_file=sys.argv[1]
dest_path=sys.argv[2]

# 獲取指定目錄的文件樹
get_tree_url = f"http://{qnap_ip}:8080/cgi-bin/filemanager/utilRequest.cgi?func=get_list&sid={auth_sid}&path={source_file}&list_mode=all&start=0&sort=filename&limit=1000"
response = requests.get(get_tree_url)
tree_result = json.loads(response.text)
files=[item['filename'] for item in tree_result['datas']]

for fn in files:
    print(fn)
    cmd=f"http://{qnap_ip}:8080/cgi-bin/filemanager/utilRequest.cgi?func=copy&sid={auth_sid}&source_file={fn}&source_total=1&source_path={source_file}&dest_path={dest_path}&mode=1&dup=overwrite"    
    res=requests.get(cmd)
    print(res.text)
#pprint.pprint(files)
