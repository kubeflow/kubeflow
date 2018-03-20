{
	parts(namespace, name,):: {
		service:: {
		  "apiVersion": "v1", 
		  "kind": "Service", 
		  "metadata": {
		    "name": name + "-tb",
		    "namespace": namespace,
		  }, 
		  "spec": {
		    "ports": [
		      {
		        "name": "http", 
		        "port": 80, 
		        "targetPort": 80,
		      }
		    ], 
		    "selector": {
		      "app": "tensorboard",
		      "tb-job": name,
		    },
		  },
		},

		tbDeployment(logDir, secretName, secretFileName, tfImage="gcr.io/tensorflow/tensorflow:latest"):: {
		  "apiVersion": "apps/v1beta1", 
		  "kind": "Deployment", 
		  "metadata": {
		    "name": name + "-tb",
		    "namespace": namespace,
		  }, 
		  "spec": {
		    "replicas": 1, 
		    "template": {
		      "metadata": {
		        "labels": {
		          "app": "tensorboard",
		          "tb-job": name,
		        }, 
		        "name": name,
		        "namespace": namespace,
		      }, 
		      "spec": {
		        "containers": [
		          {
		            "command": [
		              "/usr/local/bin/tensorboard", 
		              "--logdir=" + logDir, 
		              "--port=80"
		            ], 
		            "image": tfImage, 
		            "name": "tensorboard", 
		            "ports": [
		              {
		                "containerPort": 80
		              }
		            ],
		            "env":   [
			           {
			           "name": "GOOGLE_APPLICATION_CREDENTIALS",
			           "value": "/secret/gcp-credentials/" + secretFileName,
			           },
			       ],
		           "volumeMounts": [{
			        "name": "credentials",
			        "mountPath": "/secret/gcp-credentials",
			        }],
		          }
		        ],
		        "volumes": [{
			            "name": "credentials",
			            "secret": {
			              "secretName": secretName,
			            },
			      }		       
		        ],
		      }
		    }
		  }
		},
	},
}