{
	parts(namespace):: {		
		tobool::func(x) 
			if 
		deployment:: {
	      apiVersion: "extensions/v1beta1",
	      kind: "Deployment",
	      metadata: {
	        name: "spartakus-volunteer",
	        namespace: namespace,
	      },
	      spec: {
	        replicas: 1,
	        template: {
	          metadata: {
	            labels: {
	              app: "spartakus-volunteer",
	            },
	          },
	          spec: {
	            containers: [
	              {	                
	                image: "jetstack/kube-lego:0.1.5",
	                imagePullPolicy: "Always",
	                name: "kube-lego",
	                ports: [
	                  {
	                    containerPort: 8080,
	                  },
	                ],
	                readinessProbe: {
	                  httpGet: {
	                    path: "/healthz",
	                    port: 8080,
	                  },
	                  initialDelaySeconds: 5,
	                  timeoutSeconds: 1,
	                },
	              },
	            ],	           
	          },
	        },
	      },
	    },  // deployment
	},
}