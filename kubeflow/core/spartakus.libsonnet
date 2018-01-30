{
	parts(namespace):: {		
		local util = import "kubeflow/core/util.libsonnet",

		all(reportUsage, usageId):: {
			local reportUsageBool = util.toBool(reportUsage),
			result:: if reportUsageBool then
				[$.parts(namespace).deployment(usageId)]
			else [],
		}.result,

		deployment(usageId):: {
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
	                image: "gcr.io/google_containers/spartakus-amd64:v1.0.0",
	                name: "volunteer",
	                // TODO(jlew): Do not submit need to verify this works. I may need to
	                // start a shell to get uuidgen.
	          		command: [
	          			"volunteer" ,
	          			"--cluster-id=" + usageId,
	          			"--database=https://usage-collector.kubeflow.org",
	          		],
	              },
	            ],	           
	          },
	        },
	      },
	    },  // deployment
	},
}