import re
from kubernetes import client, config
from prometheus_client import start_http_server, Gauge
import time
from kubernetes.client.rest import ApiException

try:
    config.load_incluster_config()
except:
    config.load_kube_config()

v1 = client.CoreV1Api()
metrics_v1 = client.CustomObjectsApi()

cpu_allocatable_metric = Gauge('node_cpu_allocatable', 'Allocatable CPU cores per node', ['node'])
gpu_allocatable_metric = Gauge('node_gpu_allocatable', 'Allocatable GPUs per node', ['node'])

node_usage_cpu_metric = Gauge('node_usage_cpu', 'CPU usage per node', ['node'])
node_usage_gpu_metric = Gauge('node_usage_gpu', 'GPU usage per node', ['node'])
namespace_usage_cpu_metric = Gauge('namespace_usage_cpu', 'CPU usage per namespace', ['namespace'])
namespace_usage_gpu_metric = Gauge('namespace_usage_gpu', 'GPU usage per namespace', ['namespace'])
notebook_usage_cpu = Gauge('notebook_cpu_usage', 'CPU usage of notebooks', ['node', 'namespace', 'notebook'])
notebook_usage_memory = Gauge('notebook_memory_usage', 'Memory usage of notebooks', ['node', 'namespace', 'notebook'])
notebook_usage_gpu = Gauge('notebook_gpu_usage', 'GPU usage of notebooks', ['node', 'namespace', 'notebook'])

memory_allocatable_metric = Gauge('node_memory_allocatable', 'Allocatable memory per node', ['node'])

def parse_memory_string(memory_str):
    if memory_str.endswith('Ki'):
        return float(memory_str[:-2]) / (1024 * 1024)
    elif memory_str.endswith('Mi'):
        return float(memory_str[:-2]) / 1024.0
    elif memory_str.endswith('Gi'):
        return float(memory_str[:-2])
    elif memory_str.endswith('M'):
        return float(memory_str[:-1]) / 1024.0
    elif memory_str.endswith('K'):
        return float(memory_str[:-1]) / (1024 * 1024)
    elif memory_str.endswith('G'):
        return float(memory_str[:-1])
    else:
        return float(memory_str) / (1024 * 1024 * 1024)

def get_cpu_used(pod):
    cpu_used = 0
    for container in pod.spec.containers:
        resources = container.resources
        if resources and resources.requests and 'cpu' in resources.requests:
            cpu_request = resources.requests['cpu']
            if cpu_request[-1] == 'm':
                cpu_used += int(cpu_request[:-1]) / 1000.0
            else:
                cpu_used += int(cpu_request)
    return cpu_used

def get_gpu_used(pod):
    gpu_used = 0
    for container in pod.spec.containers:
        resources = container.resources
        if resources and resources.requests:
            for resource_name, resource_quantity in resources.requests.items():
                if 'gpu' in resource_name.lower():
                    gpu_used += int(resource_quantity)
    return gpu_used

def get_memory_used(pod):
    memory_used = 0
    for container in pod.spec.containers:
        resources = container.resources
        if resources and resources.requests and 'memory' in resources.requests:
            memory_request = resources.requests['memory']
            try:
                memory_used += parse_memory_string(memory_request)
            except ValueError:
                print(f"Unknown memory format: {memory_request}")
    return memory_used

def get_notebook_name(pod):
    match = re.search(r'-\d+$', pod.metadata.name)
    if match:
        return pod.metadata.name  # '-0'
    return None

def convert_memory_allocation_to_float(memory_alloc_str):
    return parse_memory_string(memory_alloc_str)

def update_metrics():
    nodes = v1.list_node().items
    namespaces = v1.list_namespace().items
    pods = v1.list_pod_for_all_namespaces().items  # 列出所有命名空间中的所有Pod

    node_usage_cpu = {}
    node_usage_gpu = {}
    namespace_usage_cpu = {}
    namespace_usage_gpu = {}
    notebook_usage_cpu_data = {}
    notebook_usage_gpu_data = {}
    notebook_usage_memory_data = {}

    for node in nodes:
        node_name = node.metadata.name
        node_usage_cpu[node_name] = 0
        node_usage_gpu[node_name] = 0

        cpu_allocatable = node.status.allocatable.get('cpu', '0')
        gpu_allocatable = node.status.allocatable.get('nvidia.com/gpu', '0')
        cpu_allocatable_metric.labels(node=node_name).set(cpu_allocatable)
        gpu_allocatable_metric.labels(node=node_name).set(gpu_allocatable)

        memory_allocatable = node.status.allocatable.get('memory', '0')
        memory_allocatable_metric.labels(node=node_name).set(convert_memory_allocation_to_float(memory_allocatable))

    for namespace in namespaces:
        namespace_name = namespace.metadata.name
        namespace_usage_cpu[namespace_name] = 0
        namespace_usage_gpu[namespace_name] = 0

    for pod in pods:
        node_name = pod.spec.node_name
        namespace_name = pod.metadata.namespace  # 获取 Pod 所在的命名空间
        notebook_name = get_notebook_name(pod)
        if node_name and notebook_name:
            cpu_allocated = get_cpu_used(pod)
            gpu_allocated = get_gpu_used(pod)
            memory_allocated = get_memory_used(pod)

            namespace_usage_cpu[namespace_name] += cpu_allocated
            namespace_usage_gpu[namespace_name] += gpu_allocated

            notebook_usage_cpu.labels(node=node_name, namespace=namespace_name, notebook=notebook_name).set(cpu_allocated)
            notebook_usage_memory.labels(node=node_name, namespace=namespace_name, notebook=notebook_name).set(memory_allocated)
            notebook_usage_gpu.labels(node=node_name, namespace=namespace_name, notebook=notebook_name).set(gpu_allocated)

            if (node_name, namespace_name, notebook_name) not in notebook_usage_cpu_data:
                notebook_usage_cpu_data[(node_name, namespace_name, notebook_name)] = 0
            if (node_name, namespace_name, notebook_name) not in notebook_usage_gpu_data:
                notebook_usage_gpu_data[(node_name, namespace_name, notebook_name)] = 0
            if (node_name, namespace_name, notebook_name) not in notebook_usage_memory_data:
                notebook_usage_memory_data[(node_name, namespace_name, notebook_name)] = 0

            notebook_usage_cpu_data[(node_name, namespace_name, notebook_name)] += cpu_allocated
            notebook_usage_gpu_data[(node_name, namespace_name, notebook_name)] += gpu_allocated
            notebook_usage_memory_data[(node_name, namespace_name, notebook_name)] += memory_allocated

    return node_usage_cpu, node_usage_gpu, namespace_usage_cpu, namespace_usage_gpu, notebook_usage_cpu_data, notebook_usage_gpu_data, notebook_usage_memory_data

if __name__ == "__main__":
    start_http_server(8080)  # 确保端口未被占用

    while True:
        node_usage_cpu, node_usage_gpu, namespace_usage_cpu, namespace_usage_gpu, notebook_usage_cpu_data, notebook_usage_gpu_data, notebook_usage_memory_data = update_metrics()
        print("Node Usage CPU:", node_usage_cpu)
        print("Node Usage GPU:", node_usage_gpu)
        print("Namespace Usage CPU:", namespace_usage_cpu)
        print("Namespace Usage GPU:", namespace_usage_gpu)
        print("Notebook Usage CPU:", notebook_usage_cpu_data)
        print("Notebook Usage GPU:", notebook_usage_gpu_data)
        print("Notebook Usage Memory:", notebook_usage_memory_data)
        print("running")
        time.sleep(60)  # 每 60 秒更新一次

