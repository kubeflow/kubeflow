import os
import string
import json
from urllib.parse import urlparse
import escapism
import socket
from kubernetes import client
from kubernetes.client.models import (
    V1ObjectMeta, V1Service, V1ServiceSpec, V1ServicePort
)
from kubespawner.spawner import KubeSpawner
from jhub_remote_user_authenticator.remote_user_auth import RemoteUserAuthenticator
from oauthenticator.github import GitHubOAuthenticator
from jupyterhub.proxy import Proxy
from jupyterhub.utils import exponential_backoff
from kubespawner.reflector import NamespacedResourceReflector
from kubespawner.proxy import ServiceReflector
from kubespawner.utils import generate_hashed_slug
from concurrent.futures import ThreadPoolExecutor
from traitlets import ( Unicode, Integer )
from tornado import gen
from tornado.concurrent import run_on_executor

class KubeServiceProxy(Proxy):
    should_start = False
    namespace = Unicode(
        config=True,
        help="""
        Kubernetes namespace to spawn a service for a single-user server.

        If running inside a kubernetes cluster with service accounts enabled,
        defaults to the current namespace. If not, defaults to 'default'
        """
    )
    api_url = Unicode('http://127.0.0.1:8001', config=True,
                      help="""The ip (or hostname) of the proxy's API endpoint"""
                      )

    def _namespace_default(self):
        """
        Set namespace default to current namespace if running in a k8s cluster

        If not in a k8s cluster with service accounts enabled, default to
        'default'
        """
        ns_path = '/var/run/secrets/kubernetes.io/serviceaccount/namespace'
        if os.path.exists(ns_path):
            with open(ns_path) as f:
                return f.read().strip()
        return 'default'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # We use the maximum number of concurrent user server starts (and thus proxy adds)
        # as our threadpool maximum. This ensures that contention here does not become
        # an accidental bottleneck. Since we serialize our create operations, we only
        # need 1x concurrent_spawn_limit, not 3x.
        self.executor = ThreadPoolExecutor(max_workers=self.app.concurrent_spawn_limit)
        self.service_reflector = ServiceReflector(parent=self, namespace=self.namespace)
        self.core_api = client.CoreV1Api()
        self.extension_api = client.ExtensionsV1beta1Api()

    def make_service(self, name, username, routespec, target, data):
        """
        Returns a service object 
        """
        self.log.info('Creating service %s', name)
        meta = V1ObjectMeta(
            name=name,
            annotations={
                'hub.jupyter.org/proxy-data': json.dumps(data),
                'hub.jupyter.org/proxy-routespec': routespec,
                'hub.jupyter.org/proxy-target': target,
                'getambassador.io/config': '\n'.join([
                    '---',
                    'apiVersion: ambassador/v0',
                    'kind:  Mapping',
                    'name: ' + name + '-mapping',
                    'prefix: /user/' + username,
                    'rewrite: /user/' + username,
                    'use_websocket: true',
                    'service: ' + name + '.' + self.namespace])
            },
            labels={
                'heritage': 'jupyterhub',
                'component': 'singleuser-server',
                'hub.jupyter.org/proxy-route': 'true'
            }
        )
    
        if routespec.startswith('/'):
            host = None
            path = routespec
        else:
            host, path = routespec.split('/', 1)
    
        target_parts = urlparse(target)
    
        target_ip = target_parts.hostname
        target_port = target_parts.port
        selector = {'name': name}
    
        # Make service object
        service = V1Service(
            kind='Service',
            metadata=meta,
            spec=V1ServiceSpec(
                ports=[V1ServicePort(port=80, target_port=target_port)],
                selector=selector
            )
        )
    
        return service

    @run_on_executor
    def asynchronize(self, method, *args, **kwargs):
        return method(*args, **kwargs)

    def safe_name_for_routespec(self, routespec):
        safe_chars = set(string.ascii_lowercase + string.digits)
        parts = routespec.split('/')
        name = parts[2]
        safe_name = generate_hashed_slug(
            'jupyter-' + escapism.escape(name, safe=safe_chars, escape_char='-') 
        )
        return safe_name, name

    @gen.coroutine
    def add_route(self, routespec, target, data):
        # Create a route with the name being escaped routespec
        # Use full routespec in label
        # 'data' is JSON encoded and put in an annotation - we don't need to query for it
        if data.get('hub') is not None:
            return

        n1, n2 = self.safe_name_for_routespec(routespec)
        safe_name = n1.lower()
        name = n2.lower()
        service = self.make_service(
            safe_name,
            name,
            routespec,
            target,
            data
        )

        @gen.coroutine
        def ensure_object(create_func, patch_func, body, kind):
            try:
                resp = yield self.asynchronize(
                    create_func,
                    namespace=self.namespace,
                    body=body
                )
                self.log.info('Created %s %s', kind, safe_name)
            except client.rest.ApiException as e:
                if e.status == 409:
                    # This object already exists, we should patch it to make it be what we want
                    self.log.warn("Trying to patch %s/%s, it already exists", kind, safe_name)
                    resp = yield self.asynchronize(
                        patch_func,
                        namespace=self.namespace,
                        body=body,
                        name=body.metadata.name
                    )
                else:
                    raise

        yield ensure_object(
            self.core_api.create_namespaced_service,
            self.core_api.patch_namespaced_service,
            body=service,
            kind='service'
        )

        yield exponential_backoff(
            lambda: safe_name in self.service_reflector.services,
            'Could not find service/%s after creating it' % safe_name
        )

    @gen.coroutine
    def delete_route(self, routespec):
        # We just ensure that these objects are deleted.
        # This means if some of them are already deleted, we just let it
        # be.
        safe_name = self.safe_name_for_routespec(routespec).lower()

        delete_options = client.V1DeleteOptions(grace_period_seconds=0)

        delete_service = self.asynchronize(
            self.core_api.delete_namespaced_service,
            name=safe_name,
            namespace=self.namespace,
        )

        # This seems like cleanest way to parallelize all three of these while
        # also making sure we only ignore the exception when it's a 404.
        def delete_if_exists(kind, future):
            try:
                yield future
            except client.rest.ApiException as e:
                if e.status != 404:
                    raise
                self.log.warn("Could not delete %s %s: does not exist", kind, safe_name)


        # The order matters for endpoint & service - deleting the service deletes
        # the endpoint in the background. This can be racy however, so we do so
        # explicitly ourselves as well. In the future, we can probably try a
        # foreground cascading deletion (https://kubernetes.io/docs/concepts/workloads/controllers/garbage-collection/#foreground-cascading-deletion)
        # instead, but for now this works well enough.
        delete_if_exists('service', delete_service)


    @gen.coroutine
    def get_all_routes(self):
        # copy everything, because iterating over this directly is not threadsafe
        # FIXME: is this performance intensive? It could be! Measure?
        # FIXME: Validate that this shallow copy *is* thread safe
        service_copy = dict(self.service_reflector.services)
        routes = {
            service.metadata.annotations['hub.jupyter.org/proxy-routespec']:
            {
                'routespec': service.metadata.annotations['hub.jupyter.org/proxy-routespec'],
                'target': service.metadata.annotations['hub.jupyter.org/proxy-target'],
                'data': json.loads(service.metadata.annotations['hub.jupyter.org/proxy-data'])
            }
            for service in service_copy.values()
        }

        return routes


class KubeFormSpawner(KubeSpawner):
  # relies on HTML5 for image datalist
  def _options_form_default(self):
    return '''
    <label for='image'>Image</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input list="image" name="image" placeholder='repo/image:tag'>
    <datalist id="image">
      <option value="gcr.io/kubeflow-images-staging/tensorflow-notebook-cpu">
      <option value="gcr.io/kubeflow-images-staging/tensorflow-notebook-gpu">
    </datalist>
    <br/><br/>

    <label for='cpu_guarantee'>CPU</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input name='cpu_guarantee' placeholder='200m, 1.0, 2.5, etc'></input>
    <br/><br/>

    <label for='mem_guarantee'>Memory</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input name='mem_guarantee' placeholder='100Mi, 1.5Gi'></input>
    <br/><br/>

    <label for='extra_resource_limits'>Extra Resource Limits</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input name='extra_resource_limits' placeholder='{&apos;nvidia.com/gpu&apos;: &apos;3&apos;}'></input>
    <br/><br/>
    '''

  def options_from_form(self, formdata):
    options = {}
    options['image'] = formdata.get('image', [''])[0].strip()
    options['cpu_guarantee'] = formdata.get('cpu_guarantee', [''])[0].strip()
    options['mem_guarantee'] = formdata.get('mem_guarantee', [''])[0].strip()
    options['extra_resource_limits'] = formdata.get('extra_resource_limits', [''])[0].strip()
    return options

  @property
  def singleuser_image_spec(self):
    image = 'gcr.io/kubeflow/tensorflow-notebook-cpu'
    if self.user_options.get('image'):
      image = self.user_options['image']
    return image

  @property
  def cpu_guarantee(self):
    cpu = '500m'
    if self.user_options.get('cpu_guarantee'):
      cpu = self.user_options['cpu_guarantee']
    return cpu

  @property
  def mem_guarantee(self):
    mem = '1Gi'
    if self.user_options.get('mem_guarantee'):
      mem = self.user_options['mem_guarantee']
    return mem

  @property
  def extra_resource_limits(self):
    extra = ''
    if self.user_options.get('extra_resource_limits'):
      extra = json.loads(self.user_options['extra_resource_limits'])
    return extra

###################################################
### JupyterHub Options
###################################################
c.JupyterHub.ip = '0.0.0.0'
c.JupyterHub.hub_ip = '0.0.0.0'
c.JupyterHub.hub_connect_ip =  os.environ['AMBASSADOR_SERVICE_HOST']
c.JupyterHub.hub_connect_port = int(os.environ['AMBASSADOR_SERVICE_PORT'])

# Don't try to cleanup servers on exit - since in general for k8s, we want
# the hub to be able to restart without losing user containers
c.JupyterHub.cleanup_servers = False
###################################################
### Proxy Options
###################################################
c.JupyterHub.proxy_class = KubeServiceProxy

###################################################
### Spawner Options
###################################################
c.JupyterHub.spawner_class = KubeFormSpawner
c.KubeSpawner.singleuser_image_spec = 'gcr.io/kubeflow/tensorflow-notebook-cpu'
c.KubeSpawner.cmd = 'start-singleuser.sh'
c.KubeSpawner.args = ['--allow-root']
# First pulls can be really slow, so let's give it a big timeout
c.KubeSpawner.start_timeout = 60 * 10

###################################################
### Persistent volume options
###################################################
# Using persistent storage requires a default storage class.
# TODO(jlewi): Verify this works on minikube.
# TODO(jlewi): Should we set c.KubeSpawner.singleuser_fs_gid = 1000
# see https://github.com/kubeflow/kubeflow/pull/22#issuecomment-350500944
c.KubeSpawner.user_storage_pvc_ensure = False
# How much disk space do we want?
c.KubeSpawner.user_storage_capacity = '10Gi'
c.KubeSpawner.pvc_name_template = 'claim-{username}{servername}'
if c.KubeSpawner.user_storage_pvc_ensure:
  c.KubeSpawner.volumes = [
    {
      'name': 'volume-{username}{servername}',
      'persistentVolumeClaim': {
        'claimName': 'claim-{username}{servername}'
      }
    }
  ]
  c.KubeSpawner.volume_mounts = [
    {
      'mountPath': '/home/jovyan/work',
      'name': 'volume-{username}{servername}'
    }
  ]

