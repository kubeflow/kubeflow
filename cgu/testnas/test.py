import requests
from lxml import etree
import os
import json
import pprint

response = requests.get('http://10.100.4.70:8080/cgi-bin/filemanager/authLogin.cgi?user=qnapuser&plain_pwd=P@ssw0rd')

print(response.text)

# parse XML
tree = etree.fromstring(response.content)

# get authPassed filed
authPassed = tree.find('authPassed').text
print(authPassed)

if authPassed == '1':
    print('authPassed is true')
else:
    print('authPassed is false')
    os.exit(1)

# get authSid field
authSid = tree.find('authSid').text
print(authSid)

response = requests.get('http://10.100.4.70:8080/cgi-bin/filemanager/utilRequest.cgi?func=check_sid&sid=' + authSid)

print(response.text)

response = requests.get('http://10.100.4.70:8080/cgi-bin/filemanager/utilRequest.cgi?func=check_sid&sid=' + authSid+'&node=/Public/test-test-volume-pvc-fbcc4431-fddd-4af6-996a-70fa640de341')

print(response.text)

ret = json.loads(response.text)
pprint.pprint(ret)


# parse XML
#tree = etree.fromstring(response.content)