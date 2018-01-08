{
	parts(namespace, name):: {
	   local serviceName = name + "-esp",

	   // This is a service that will forward to the ESP side car that handles JWT verification
	   // selector is the label selector for the backing pods.
	   // targetPort should be the port the ESP side car is using
	   //iapEspProxyService(selector, targetPort): {
	   //  "apiVersion": "v1", 
	 	//  "kind": "Service", 
		//  "metadata": {
		 //   "labels": selector, 
		 //   "name": serviceName,
		 //   namespace: namespace,
		 // }, 
		 // "spec": {
		 //   "ports": [
		 //     {
		 //       "name": "esp", 
		 //       "port": 80, 
		 //       "targetPort": targetPort,
		 //     }
		 //   ], 
		 //   "selector": selector,
		 //   "type": "NodePort",
		 // }
	   //},
	   // DO NOT SUBMIT this is a node port service that points directly at JupyterHub bypassing
	   // the ESP side car proxy. It is only indended for troubleshooting why IAP isn't working.
	   
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
		        "port": 80, 
		        "targetPort": 8000,
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
		                "serviceName": serviceName, 
		                "servicePort": 80,
		              }, 
		              "path": "/*"
		            },

		            // {
		            //  "backend": {
		            //    "serviceName": serviceName, 
		            //    "servicePort": 80,
		            //  }, 
		            //  "path": "/hub/*"
		            //},
		            // {
		            //  "backend": {
		            //    "serviceName": serviceName, 
		            //    "servicePort": 80,
		            //  }, 
		            //  "path": "/user/*"
		            //},
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