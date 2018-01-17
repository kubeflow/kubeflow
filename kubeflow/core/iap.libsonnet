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
	}, // parts 
}