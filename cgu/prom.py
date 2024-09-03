import sshscript
import re
import random,time
from prometheus_client import start_http_server, Gauge

obj_num_alloc_gpu = Gauge('num_gpu', 'Number of used GPU')
obj_num_total_gpu = Gauge('tot_gpu', 'Number of total GPU')
obj_num_alloc_cpu = Gauge('num_cpu', 'Number of used CPU')
obj_num_total_cpu = Gauge('tot_cpu', 'Number of total CPU')
#from sshscript import SSHScriptSession
#session = SSHScriptSession()

# Please make sure the a collect SSH key has been installed in the server or the login
# information is collect in the beloow line before you execute the script.
def fetch_data():
    with $.connect('root@120.126.23.245','password',port=2222):
        $kubectl describe nodes
        cur_name=''
        cur_mode = ''

        cap={}
        ava={}
        alloc={}
        tot_cpu_cap = 0
        tot_cpu_alloc = 0
        tot_gpu_cap = 0
        tot_gpu_alloc = 0
        for line in $.stdout.split('\n'):
            if cur_mode == 'alloc':
                ff=line.split(':')
                if ff[0].strip() != 'Name':
                    ff = re.split('\s+',line)
                    ff=ff[1:]
                else:
                    cur_mode = ''
            else:
                ff=line.split(':')
            if len(ff) == 0: continue
            sec = ff[0].strip()
            #print('sec %s' % sec)
            if sec == 'Name':
                #if cur_name != '':
                #    print('%10s %5d/%-5s %5s/%-5s' % (cur_name,alloc['cpu'],cap['cpu'],alloc['gpu'],cap['gpu']))
                cur_name = ff[1].strip()
            elif sec == 'Capacity':
                cur_mode = 'cap'
                #print('Capture Capacity')
            elif sec == 'Allocated resources':
                cur_mode = 'alloc'
                #print('Capture  Availability')
            elif sec == 'cpu':
                if cur_mode == 'cap':
                    cap['cpu'] = ff[1].strip()
                    tot_cpu_cap += float(cap['cpu'])
                    #print('capture cpu cap',cap)
                elif cur_mode == 'alloc':
                    #print('capture cpu alloc',alloc)
                    ss = ff[1].split('m')
                    if len(ss) == 1:
                        v = ff[1]
                    else:
                        v = float(ss[0])/1000.0
                    alloc['cpu'] = v
                    tot_cpu_alloc += float(v)
            elif sec == 'nvidia.com/gpu':
                if cur_mode == 'cap':
                    cap['gpu'] = ff[1].strip()
                    tot_gpu_cap += int(cap['gpu'])
                elif cur_mode == 'alloc':
                    alloc['gpu'] = ff[1].strip()
                    tot_gpu_alloc += int(alloc['gpu'])
        print('CPU %f/%f GPU %d/%d' % (tot_cpu_alloc,tot_cpu_cap, tot_gpu_alloc, tot_gpu_cap))
        obj_num_total_gpu.set(tot_gpu_cap)
        obj_num_alloc_gpu.set(tot_gpu_alloc)
        obj_num_total_cpu.set(tot_cpu_cap)
        obj_num_alloc_cpu.set(tot_cpu_alloc)


# Start up the server to expose the metrics.
start_http_server(8000)
while True:
        fetch_data()
        time.sleep(10)
