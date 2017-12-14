// A ksonnet prototype/component for using NFS.

{
  // TODO(https://github.com/ksonnet/ksonnet/issues/222): Taking namespace as an argument is a work around for the fact that ksonnet
  // doesn't support automatically piping in the namespace from the environment to prototypes.
  //
  // Create a provisioner with the specified name.
  // disks should be a list GCP persistent disk names; these disks should be in the
  // same zone as your cluster.
  // TODO(jlewi): 
  parts(namespace, name, disks):: {
  	local storageClassName = name + "-nfs",  	
  	local provisionerName = name + "-provisioner",
  	local storageClassProvisioner = name + "/nfs",
  	local serviceName = name + "-service",

	local serviceAccountName = name,
	local serviceAccountRoleName = name,

  	volumes: std.map(function(n) {
	            "gcePersistentDisk": {
	              "pdName": n,
	            }, 
	            "name": n }, disks),

  	volumeMounts: std.map(function(n) 
	             {
	                // "mountPath": "/export-" + n, 
	                // DO NOT SUBMIT
	                "mountPath": "/export", 
	                "name": n,
	             }, disks),

	volumeClaim: {
	  "apiVersion": "v1", 
	  "kind": "PersistentVolumeClaim", 
	  "metadata": {
	    "annotations": {
	      "volume.beta.kubernetes.io/storage-class": storageClassName,
	    }, 
	    "name": name + "-nfs",
	    "namespace": namespace,
	  }, 
	  "spec": {
	    "accessModes": [
	      "ReadWriteMany"
	    ], 
	    "resources": {
	      "requests": {
	        "storage": "1Mi"
	      }
	    }
	  }
	},

    storageClass: {
	  "apiVersion": "storage.k8s.io/v1beta1", 
	  "kind": "StorageClass", 
	  "metadata": {
	    "name": storageClassName,	    
	    "namespace": namespace,
	  }, 
	  // This value must be the same as passed as argument --provisioner to the provisioner
	  "provisioner": storageClassProvisioner,
	},

	service: {
	  "apiVersion": "v1", 
	  "kind": "Service", 
	  "metadata": {
	    "labels": {
	      "app": provisionerName
	    }, 
	    "name": serviceName,
	    "namespace": namespace,
	  }, 
	  "spec": {
	    "ports": [
	      {
	        "name": "nfs", 
	        "port": 2049
	      }, 
	      {
	        "name": "mountd", 
	        "port": 20048
	      }, 
	      {
	        "name": "rpcbind", 
	        "port": 111
	      }, 
	      {
	        "name": "rpcbind-udp", 
	        "port": 111, 
	        "protocol": "UDP"
	      }
	    ], 
	    "selector": {
	      "app": provisionerName
	    }
	  }
	},

    provisionerBase(volumes, volumeMounts):: {
	  "apiVersion": "extensions/v1beta1", 
	  "kind": "Deployment", 
	  "metadata": {
	    "name": provisionerName,	   
	    "namespace": namespace,
	  }, 
	  "spec": {
	    "replicas": 1, 
	    "strategy": {
	      "type": "Recreate"
	    }, 
	    "template": {
	      "metadata": {
	        "labels": {
	          "app": provisionerName
	        }
	      }, 
	      "spec": {
	        "containers": [
	          {
	            "args": [
	              "-provisioner=" + storageClassProvisioner,
	            ], 
	            "env": [
	              {
	                "name": "POD_IP", 
	                "valueFrom": {
	                  "fieldRef": {
	                    "fieldPath": "status.podIP"
	                  }
	                }
	              }, 
	              {
	                "name": "SERVICE_NAME", 
	                "value": serviceName,
	              }, 
	              {
	                "name": "POD_NAMESPACE", 
	                "valueFrom": {
	                  "fieldRef": {
	                    "fieldPath": "metadata.namespace"
	                  }
	                }
	              }
	            ], 
	            "image": "quay.io/kubernetes_incubator/nfs-provisioner:v1.0.8", 
	            "imagePullPolicy": "IfNotPresent", 
	            "name": "nfs-provisioner", 
	            "ports": [
	              {
	                "containerPort": 2049, 
	                "name": "nfs"
	              }, 
	              {
	                "containerPort": 20048, 
	                "name": "mountd"
	              }, 
	              {
	                "containerPort": 111, 
	                "name": "rpcbind"
	              }, 
	              {
	                "containerPort": 111, 
	                "name": "rpcbind-udp", 
	                "protocol": "UDP"
	              }
	            ], 
	            "securityContext": {
	              "capabilities": {
	                "add": [
	                  "DAC_READ_SEARCH"
	                ]
	              }
	            }, 
	            "volumeMounts": volumeMounts,
	          }
	        ], 
	        "volumes": volumes,
	        "serviceAccountName": serviceAccountName, 
	      }
	    }
	  }
	}, // provisioner-base
     
    provisioner: self.provisionerBase(self.volumes, self.volumeMounts),

    serviceAccount: {
      "apiVersion": "v1", 
      "kind": "ServiceAccount", 
      "metadata": {
        "labels": {
          "app": name + "nfs-provisioner"
        }, 
        "name": serviceAccountName,
        "namespace": namespace,
      }
    },

	role: {
	  "apiVersion": "rbac.authorization.k8s.io/v1beta1", 
	  "kind": "Role", 
	  "metadata": {
	    "name": serviceAccountRoleName, 
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

    roleBinding:  {
	  "apiVersion": "rbac.authorization.k8s.io/v1beta1", 
	  "kind": "RoleBinding", 
	  "metadata": {
	    "name": name + "-nfs-role", 
	    "namespace": namespace
	  }, 
	  "roleRef": {
	    "apiGroup": "rbac.authorization.k8s.io", 
	    "kind": "Role", 
	    "name": serviceAccountName,
	  }, 
	  "subjects": [
	    {
	      "kind": "ServiceAccount", 
	      "name": serviceAccountRoleName, 
	      "namespace": namespace,
	    }
	  ]
	},

	// see https://github.com/kubernetes-incubator/external-storage/tree/master/docs#authorizing-provisioners-for-rbac-or-openshift
	clusterRoleBinding:  {
	  "apiVersion": "rbac.authorization.k8s.io/v1beta1", 
	  "kind": "ClusterRoleBinding", 
	  "metadata": {
	    "name": name + "-nfs-role", 
	    "namespace": namespace
	  }, 
	  "roleRef": {
	    "apiGroup": "rbac.authorization.k8s.io", 
	    "kind": "ClusterRole", 
	    "name": "system:persistent-volume-provisioner",
	  }, 
	  "subjects": [
	    {
	      "kind": "ServiceAccount", 
	      "name": serviceAccountRoleName, 
	      "namespace": namespace,
	    }
	  ]
	},

  }, // parts
}