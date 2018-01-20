
// local nfs = import "nfs.libsonnet";

{  
  // TODO(https://github.com/ksonnet/ksonnet/issues/222): Taking namespace as an argument is a work around for the fact that ksonnet
  // doesn't support automatically piping in the namespace from the environment to prototypes.
  //
  // TODO(jlewi): We should refactor this to have multiple prototypes; having 1 without any extra volumes and than 
  // a with volumes option.
  parts(namespace):: {


  // TODO(https://github.com/cloudendpoints/endpoints-tools/issues/41): Get rid of this once endpoints proxy supports websockets by default.
  local nginxConf = @'
daemon off;

user nginx nginx;

pid /var/run/nginx.pid;

# Worker/connection processing limits
worker_processes 1;
worker_rlimit_nofile 10240;
events { worker_connections 10240; }

# Logging to stderr enables better integration with Docker and GKE/Kubernetes.
error_log stderr warn;


http {
  include /etc/nginx/mime.types;
  server_tokens off;
  client_max_body_size 32m;
  client_body_buffer_size 128k;

  # HTTP subrequests
  endpoints_resolver 8.8.8.8;
  endpoints_certificates /etc/nginx/trusted-ca-certificates.crt;

  upstream app_server0 {
    server 127.0.0.1:8000;
    keepalive 128;
  }

  set_real_ip_from  0.0.0.0/0;
  set_real_ip_from  0::/0;
  real_ip_header    X-Forwarded-For;
  real_ip_recursive on;

  # top-level http config for websocket headers
  # If Upgrade is defined, Connection = upgrade
  # If Upgrade is empty, Connection = close

  map_hash_max_size 262144;
  map_hash_bucket_size 262144;

  map $http_upgrade $connection_upgrade {
  	default upgrade;
  	"" close;
  }

  server {
    server_name "";

    listen 9000 backlog=16384;

    access_log /dev/stdout;

    location = /healthz {
      return 200;
      access_log off;
    }

    location / {
      # Begin Endpoints v2 Support
      endpoints {
        on;
        server_config /etc/nginx/server_config.pb.txt;
        metadata_server http://169.254.169.254;
      }
      # End Endpoints v2 Support

      proxy_pass http://app_server0;
      proxy_redirect off;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Host $server_name;
      proxy_set_header X-Google-Real-IP $remote_addr;


      # Enable the upstream persistent connection
      proxy_http_version 1.1;
      proxy_set_header Connection "";

      # Enable websockets.
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection $connection_upgrade;

      # 86400 seconds (24 hours) is the maximum a server is allowed.
      proxy_send_timeout 86400s;
      proxy_read_timeout 86400s;
    }

    include /var/lib/nginx/extra/*.conf;
  }

  server {
    # expose /nginx_status and /endpoints_status but on a different port to
    # avoid external visibility / conflicts with the app.
    listen 8090;
    location /nginx_status {
      stub_status on;
      access_log off;
    }
    location /endpoints_status {
      endpoints_status;
      access_log off;
    }
    location /healthz {
      return 200;
      access_log off;
    }
    location / {
      root /dev/null;
    }
  }
}
',


   kubeSpawner(authenticator, volumeClaims=[]): {
     // TODO(jlewi): We should make the default Docker image configurable
     // TODO(jlewi): We should make whether we use PVC configurable.
   	 local baseKubeConfigSpawner = @"import json
import os
from kubespawner.spawner import KubeSpawner
from jhub_remote_user_authenticator.remote_user_auth import RemoteUserAuthenticator
from oauthenticator.github import GitHubOAuthenticator

class KubeFormSpawner(KubeSpawner):
  def _options_form_default(self):
    return '''
    <label for='image'>Image</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input name='image' placeholder='repo/image:tag'></input>
    <br/><br/>

    <label for='cpu_guarantee'>CPU</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input name='cpu_guarantee' placeholder='200m, 1.0, 2.5, etc'></input>
    <br/><br/>

    <label for='mem_guarantee'>Memory</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input name='mem_guarantee' placeholder='100Mi, 1.5Gi'></input>
    <br/><br/>

    <label for='extra_resource_limits'>Extra Resource Limits</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input name='extra_resource_limits' placeholder='{'nvidia.com/gpu': '3'}'></input>
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
# Don't try to cleanup servers on exit - since in general for k8s, we want
# the hub to be able to restart without losing user containers
c.JupyterHub.cleanup_servers = False
###################################################

###################################################
### Spawner Options
###################################################
c.JupyterHub.spawner_class = KubeFormSpawner
c.KubeSpawner.singleuser_image_spec = 'gcr.io/kubeflow/tensorflow-notebook'
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
# see https://github.com/google/kubeflow/pull/22#issuecomment-350500944
c.KubeSpawner.user_storage_pvc_ensure = True
# How much disk space do we want?
c.KubeSpawner.user_storage_capacity = '10Gi'
c.KubeSpawner.pvc_name_template = 'claim-{username}{servername}'
",

	authenticatorOptions:: {

	   ### Authenticator Options
	   local kubeConfigDummyAuthenticator = "c.JupyterHub.authenticator_class = 'dummyauthenticator.DummyAuthenticator'",

	   # This configuration allows us to use the id provided by IAP.
	   local kubeConfigIAPAuthenticator = @"c.JupyterHub.authenticator_class ='jhub_remote_user_authenticator.remote_user_auth.RemoteUserAuthenticator'
c.RemoteUserAuthenticator.header_name = 'x-goog-authenticated-user-email'",

	  options:: std.join("\n", std.prune(["######## Authenticator ######",
	                                      if authenticator == "iap"then
	                                      kubeConfigIAPAuthenticator else
	                                      kubeConfigDummyAuthenticator, ])),
	}.options, // authenticatorOptions

    volumeOptions:: {
       	  local volumes = std.map(function(v) 
		{
            'name': v,
            'persistentVolumeClaim': {
                'claimName': v,
            },
        }, volumeClaims),


	  local volumeMounts = std.map( function(v)
        {
            'mountPath': '/mnt/' + v,
            'name': v,
        },  volumeClaims),
            
      options:: 
        if std.length(volumeClaims) > 0 then
        std.join("\n", 
      	["###### Volumes #######",
      	 "c.KubeSpawner.volumes = " + std.manifestPython(volumes),
      	 "c.KubeSpawner.volume_mounts = " + std.manifestPython(volumeMounts),
      	])
      	else "",
            
    }.options, // volumeOptions

    spawner:: std.join("\n", std.prune([baseKubeConfigSpawner, self.authenticatorOptions, self.volumeOptions])),
   }.spawner, // kubeSpawner

   local baseJupyterHubConfigMap = {
	  "apiVersion": "v1", 	  
	  "kind": "ConfigMap", 
	  "metadata": {
	    "name": "jupyterhub-config",
	    namespace: namespace,
	  },
   },



   jupyterHubConfigMap(spawner): baseJupyterHubConfigMap + {
   	  "data": {	    
	    "jupyterhub_config.py": spawner,
	    "nginx.conf": nginxConf,
	  }, 
	},

   
   jupyterHubConfigMapWithVolumes(volumeClaims): {
	  local volumes = std.map(function(v) 
		{
            'name': v,
            'persistentVolumeClaim': {
                'claimName': v,
            },
        }, volumeClaims),


	  local volumeMounts = std.map( function(v)
        {
            'mountPath': '/mnt/' + v,
            'name': v,
        },  volumeClaims),

       config: baseJupyterHubConfigMap + {   	 
		 "data": {
		 	// "jupyterhub_config.py": extendedBaseKubeConfigSpawner,		 	
		 },	 
	   },
	 }.config,

    // TODO(jlewi): I think we should change the service name. Why is it tf-hub-lb?
    // Why not just jupyter-hub?
    // We should be careful about not breaking people since our docs probably refer to tf-hub-lb.
    //
    // The load balancer is used as the FE to allow users to connect.
    // If the type is LoadBalancer an external IP will be created. If they use ClusterIP, users can connect via kubectl.
    jupyterHubLoadBalancer(serviceType):: {    
	  "apiVersion": "v1", 
	  "kind": "Service", 
	  "metadata": {
	    "labels": {
	      "app": "tf-hub"
	    }, 
	    "name": "tf-hub-lb",
	    "namespace": namespace,
	  }, 
	  "spec": {
	    "ports": [
	      {
	        "name": "http", 
	        "port": 80, 
	        "targetPort": 8000
	      }
	    ], 
	    "selector": {
	      "app": "tf-hub"
	    }, 
	    "type": serviceType,
	  }
	},

	// This is an internal service used by the launched Jupyter servers to connect back to the hub.
    jupyterHubService:: {
	  "apiVersion": "v1", 
	  "kind": "Service", 
	  "metadata": {
	    "labels": {
	      "app": "tf-hub"
	    }, 
	    "name": "tf-hub-0",
	    namespace: namespace,
	  }, 
	  "spec": {
	    // We want a headless service so we set the ClusterIP to be None.
	    // This headless server is used by individual Jupyter pods to connect back to the Hub.
	    "clusterIP": "None",
	    "ports": [
	      {
	        "name": "hub", 
	        "port": 80, 
	        "targetPort": 8000
	      }
	    ], 
	    "selector": {
	      "app": "tf-hub"
	    },
	  },
    },
   
   	// endpoint: Url for the service e.g. "jupyterhub.endpoints.${PROJECT}.cloud.goog"
   	// version: Version as returned by cloud endpoints
   	iapSideCar(endpoint, version):: {
        "args": [
          "-p", 
          // The port to listen on
          "9000", 
          "-a", 
          // This is the backend address. JupyterHub uses 8000
          "127.0.0.1:8000", 
          "-s", 
          endpoint, 
          "-v", 
          version, 
          "-z", 
          "healthz",
          // TODO(https://github.com/cloudendpoints/endpoints-tools/issues/41): Stop setting nginx_conf once endpoints proxy supports 
          // websockets by default.
          "--nginx_config=/etc/config/nginx.conf",
        ], 
        "image": "gcr.io/endpoints-release/endpoints-runtime:1", 
        "name": "esp", 
        "ports": [
          {
          	// This is the port on which it accepts connections
            "containerPort": 9000
          }
        ], 
        "volumeMounts": [
	              {
	                "mountPath": "/etc/config", 
	                "name": "config-volume"
	              }
	    ],
        "readinessProbe": {
          "httpGet": {
            "path": "/healthz", 
            "port": 9000
          }
        }
	 }, // iapSideCar 

	// image: Image for JupyterHub
	// sideCars: Optional list of side car containers.
	jupyterHub(image, sideCars=[]): {
	  "apiVersion": "apps/v1beta1", 
	  "kind": "StatefulSet", 
	  "metadata": {
	    "name": "tf-hub",
	    "namespace": namespace,
	  }, 
	  "spec": {
	    "replicas": 1, 
	    "serviceName": "", 
	    "template": {
	      "metadata": {
	        "labels": {
	          "app": "tf-hub"
	        }
	      }, 
	      "spec": {
	        "containers": [
	          {
	            "command": [
	              "jupyterhub", 
	              "-f", 
	              "/etc/config/jupyterhub_config.py"
	            ], 
	            "image": image, 
	            "name": "tf-hub", 
	            "volumeMounts": [
	              {
	                "mountPath": "/etc/config", 
	                "name": "config-volume"
	              }
	            ],
	            // Don't try listing specific ports.
	            // DO NOT submit
	            //"ports": [
	            //  // Port 8000 is used by the hub to accept incoming requests.
		        //  {
		        //    "containerPort": 8000,
		        //  },
		        //  // Port 8081 accepts callbacks from the individual Jupyter pods.
		        //  {
		         //   "containerPort": 8081,
		        /// },
		        //], 
	          }
	        ] + sideCars, 
	        "serviceAccountName": "jupyter-hub", 
	        "volumes": [
	          {
	            "configMap": {
	              "name": "jupyterhub-config"
	            }, 
	            "name": "config-volume"
	          }
	        ]
	      }
	    }, 
	    "updateStrategy": {
	      "type": "RollingUpdate"
	    }
	  }
	},

   jupyterHubRole: {
	  "apiVersion": "rbac.authorization.k8s.io/v1beta1", 
	  "kind": "Role", 
	  "metadata": {
	    "name": "jupyter-role", 
	    "namespace": namespace,
	  }, 
	  "rules": [
	    {
	      "apiGroups": [
	        "*"
	      ], 
	      // TODO(jlewi): This is very permissive so we may want to lock this down.
	      "resources": [
	        "*"
	      ], 
	      "verbs": [
	        "*"
	      ]
	    }
	  ]
	},
    
   jupyterHubServiceAccount: {
      "apiVersion": "v1", 
      "kind": "ServiceAccount", 
      "metadata": {
        "labels": {
          "app": "jupyter-hub"
        }, 
        "name": "jupyter-hub",
        "namespace": namespace,
      }
    },

	jupyterHubRoleBinding: {
	  "apiVersion": "rbac.authorization.k8s.io/v1beta1", 
	  "kind": "RoleBinding", 
	  "metadata": {
	    "name": "jupyter-role", 
	    "namespace": namespace,
	  }, 
	  "roleRef": {
	    "apiGroup": "rbac.authorization.k8s.io", 
	    "kind": "Role", 
	    "name": "jupyter-role"
	  }, 
	  "subjects": [
	    {
	      "kind": "ServiceAccount", 
	      "name": "jupyter-hub", 
	      "namespace": namespace,
	    }
	  ]
	},
  }, // parts
}