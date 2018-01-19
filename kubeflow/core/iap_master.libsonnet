# This component uses IAP to secure access to the GKE master.
{
	parts(namespace, name):: {
	   local serviceName = name + "-esp",

	   // This is a service that will forward to the ESP side car that handles JWT verification
	   // selector is the label selector for the backing pods.
	   // targetPort should be the port the ESP side car is using
	   iapEspProxyService(selector, targetPort): {
	     "apiVersion": "v1", 
	 	  "kind": "Service", 
		  "metadata": {
		    "labels": selector, 
		    "name": serviceName,
		    namespace: namespace,
		  }, 
		  "spec": {
		    "ports": [
		      {
		        "name": "esp", 
		        # Due to https://github.com/kubernetes/contrib/blob/master/ingress/controllers/gce/examples/health_checks/README.md#limitations
		        # Keep port the same as targetPort so that servicePort will be the same as targetPort for the purpose of
		        # health checking.
		        "port": targetPort, 
		        "targetPort": targetPort,
		      }
		    ], 
		    "selector": selector,
		    "type": "NodePort",
		 }
	   },
	   
	   ingress(secretName):: {
		  "apiVersion": "extensions/v1beta1", 
		  "kind": "Ingress", 
		  "metadata": {
		    "name": serviceName,
		    "namespace": namespace,
		  }, 
		  "spec": {
		    "rules": [
		      {
		        "http": {
		          "paths": [
		             {
		              "backend": {
		               # Due to https://github.com/kubernetes/contrib/blob/master/ingress/controllers/gce/examples/health_checks/README.md#limitations
		        	   # Keep port the servicePort the same as the port we are targetting on the backend so that servicePort will be the same as targetPort for the purpose of
		               # health checking.
		                "serviceName": serviceName, 
		                # Keep in sync with the port the esp container listens on.
		                "servicePort": 9000,
		              }, 
		              "path": "/*"
		            },
		          ]
		        }
		      }
		    ], 
		    "tls": [
		      {
		        "secretName": secretName,
		      }
		    ]
		  }
		}, // iapIngress

		// endpoint: Url for the service e.g. "jupyterhub.endpoints.${PROJECT}.cloud.goog"
   	// version: Version as returned by cloud endpoints
   	iapSideCar(endpoint, version):: 

	
	espProxy:: {
	  "apiVersion": "apps/v1beta1", 
	  "kind": "StatefulSet", 
	  "metadata": {
	    "name": "master-esp",
	    "namespace": namespace,
	  }, 
	  "spec": {
	    "replicas": 1, 
	    "serviceName": "", 
	    "template": {
	      "metadata": {
	        "labels": {
	          "app": "master-esp"
	        }
	      }, 
	      "spec": {
	        "containers": [
		     {
	        "args": [
	          "-p", 
	          // The port to listen on
	          "9000", 
	          "-a", 
	          // This is the backend address. JupyterHub uses 8000
	          "${KUBERNETES_SERVICE_HOST}:${KUBERNETES_SERVICE_HOST}:{KUBERNETES_SERVICE_PORT}", 
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
	        ], containers
	      }, // spec
	    }, 
	    "updateStrategy": {
	      "type": "RollingUpdate"
	    }
	  }
	},


	}, // parts 
}