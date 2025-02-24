import requests
from lxml import etree
import os
import json
import pprint
import sys

# Replace with actual QNAP server details
qnap_ip = "10.100.4.70"
username = "qnapuser"
password = "P@ssw0rd"

# Step 1: Login and get SID
login_url = f"http://{qnap_ip}:8080/cgi-bin/filemanager/authLogin.cgi?user={username}&plain_pwd={password}"
response = requests.get(login_url)

tree = etree.fromstring(response.content)
auth_passed = tree.find('authPassed').text
if auth_passed != '1':
    print('Authentication failed.')
    os._exit(1)

auth_sid = tree.find('authSid').text
print(f"Authenticated SID: {auth_sid}")

# Step 2: Get file list from specified folder
# source_folder = "/Public/test"
# dest_folder = "/Public/test/testdw01"

source_folder = sys.argv[1]
dest_folder = sys.argv[2]
get_tree_url = f"http://{qnap_ip}:8080/cgi-bin/filemanager/utilRequest.cgi?func=get_list&sid={auth_sid}&path={source_folder}&list_mode=all&start=0&sort=filename&limit=1000"
response = requests.get(get_tree_url)
tree_result = json.loads(response.text)

if "datas" not in tree_result:
    print("Failed to retrieve file list.")
    os._exit(1)

files = [item['filename'] for item in tree_result['datas']]
print(files)

# Step 3: Prepare download request for zip
zip_download_url = f"http://{qnap_ip}:8080/cgi-bin/filemanager/utilRequest.cgi?func=download&sid={auth_sid}&isfolder=1&compress=1&source_file=test&source_total=1&source_path={source_folder}" 
# zip_download_url = f"http://{qnap_ip}:8080/cgi-bin/filemanager/utilRequest.cgi"
# download_params = {
#     'func': 'download',
#     'sid': auth_sid,
#     'isfolder': '1',  # Treat as folder
#     'compress': '1',  # Compress to zip
#     'source_path': source_folder,
#     'source_file': ','.join(files),
#     'source_total': len(files)
# }

# Step 4: Perform download
response = requests.get(zip_download_url, stream=True)
print(response)

if response.status_code == 200:
    output_file = 'downloaded_files.zip'
    with open(output_file, 'wb') as f:
        for chunk in response.iter_content(chunk_size=8192):
            if chunk:
                f.write(chunk)
    print(f"Files downloaded and saved as {output_file}")
else:
    print(f"Failed to download files. Status code: {response.status_code}")