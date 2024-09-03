import sshscript
import re
#from sshscript import SSHScriptSession
#session = SSHScriptSession()

# Please make sure the a collect SSH key has been installed in the server or the login
# information is collect in the beloow line before you execute the script.

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
            if cur_name != '':
                print('%10s %5d/%-5s %5s/%-5s' % (cur_name,alloc['cpu'],cap['cpu'],alloc['gpu'],cap['gpu']))
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
                tot_cpu_cap += int(cap['cpu'])
                #print('capture cpu cap',cap)
            elif cur_mode == 'alloc':
                #print('capture cpu alloc',alloc)
                ss = ff[1].split('m')
                if len(ss) == 1:
                    v = ff[1]
                else:
                    v = float(ss[0])/1000.0
                alloc['cpu'] = v
                tot_cpu_alloc += v
        elif sec == 'nvidia.com/gpu':
            if cur_mode == 'cap':
                cap['gpu'] = ff[1].strip()
                tot_gpu_cap += int(cap['gpu'])
            elif cur_mode == 'alloc':
                alloc['gpu'] = ff[1].strip()
                tot_gpu_alloc += int(alloc['gpu'])
    print('CPU %d/%d GPU %d/%d' % (tot_cpu_alloc,tot_cpu_cap, tot_gpu_alloc, tot_gpu_cap))

