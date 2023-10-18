# Introduce a PVCViewer Controller in Kubeflow

**Authors**: Apostolos Gerakaris apoger@arrikto.com, Tobias Goerke tobias.goerke@gmail.com, Kimonas Sotirchos kimwnasptd@arrikto.com 

## Motivation

The motivation behind this iteration is to describe the basic architecture and functionalities of the PVCViewer controller.

## Goals
* Implement a CR and its corresponding controller to allow users to spin up a Web App and visualize the contents of a PVC.

## Non-Goals

* Changes to Volumes UI.
* Mechanism to visualize data of an S3 endpoint.

## Implementation Details

PVCViewers enable users to open a filebrowser UI on arbitrary persistent volume claims, letting them inspect, download, upload and manipulate data.

The main features of this component are:
1. The controller will be responsible for reconciling the status of a PVCViewer CR and creating all the required underlying resources (Deployment, Service, VirtualService etc).
2. The controller will be responsible for deleting the entire PVCViewer CR, and underlying related resources, when the associated PVC gets a deletionTimestamp.
2. The controller will address RWO-Scheduling limitations: If a PVCViewer is scheduled for a RWO-Volume that is already mounted to another Pod, then the controller will set the deployment's NodeAffinity so that the PVCViewer Pod is scheduled on the same node as the other Pods mounting the volume. (https://github.com/kubernetes/kubernetes/issues/26567)

### Sub-Resources

Under the hood for each PVCViewer CR the PVCViewer Controller will create:
1. A **Deployment** that will manage the lifecycle of the PVCViewer Pod that will mount the requested PVC.
2. A **ClusterIP Service** for sending the traffic to that Pod. 
3. A **VirtualService** to expose the Pod outside the cluster.

### Spec

The Spec of the CR will consist of 4 fields:
```go
// PVCViewerSpec defines the desired state of PVCViewer
type PVCViewerSpec struct {
   // Defines the PVC we want to edit 
   // +required
   PVC string `json:"pvc"`
   // Specifies the deployment's pod spec that will be created	by the operator. 
   // You must not provide PodSpec.Volumes in this case  
   // +optional 
   PodSpec corev1.PodSpec `json:"podSpec, omitempty"`
   // Specifies custom networking specification for the underlying 
   // Service and VirtualService resources
   // +optional
   Networking Networking `json:"networking, omitempty"`
   // If set to true, the controller detects RWO-Volumes referred to by 
   // the Pod and uses affinities to schedule the PVCViewer to nodes 
   // where the volume is currently mounted. This enables the PVCViewer 
   // to access RWO-Volumes, even though they might already be mounted.
   // +kubebuilder:default:=false
   RWOScheduling bool `json:"rwoScheduling"`
}

type Networking struct {
   // Specifies the application's target port used by the Deployment's Service.
   // +optional
   TargetPort intstr.IntOrString `json:"targetPort"`
   // Specifies the prefix to the virtual service's 'prefix' field.
   // The controller will suffix '/namespace/name' to this prefix.
   // +optional
   BasePrefix string `json:"basePrefix"`
   // Specifies the virtual service's 'rewrite' field.
   // If omitted, the controller will set the 'rewrite' field to the same 
   // value as the 'prefix' field.
   // +optional
   Rewrite string `json:"rewrite,omitempty"`
   // The timeout for the virtual service's 'timeout' field.
   // +optional
   Timeout string `json:"timeout,omitempty"`
}
```

The Spec has only one mandatory field and that is for specifying the PVC we want to edit. The **GroupVersionKind** for these objects could be `kubeflow.org/v1alpha1/PVCViewer`. Each PVCViewer CR is associated with a single PVC. This allows the controller to delete the entire CR when the associated PVC is deleted.

#### Validation and Admission Webhooks

Users will be able to override the default Pod specifications by providing a custom PodSpec in the CR. We need to ensure that the provided custom PodSpec will not be able to override certain fields (e.g a user should not be able to set the `PodSpec.Volumes` field in conjunction with the required `Spec.PVC` field). We will use a validation webhook for this and make this field immutable.

Furthermore, the controller will utilize an admission webhook to infer default values for the PodSpec, since the simplest form of an applied PVCViewer CR may only define the `Spec.PVC` field.

Example use-cases for providing a custom PodSpec: 
1. Users can control which web app shall be used for showing the filesystem of a PVC by overriding the image. Options:
   - Cloudcmd: https://github.com/coderaiser/cloudcmd.
   - Filebrowser: https://github.com/filebrowser/filebrowser (preffered used by KF).

#### RWOScheduling

The `Spec.RWOScheduling` field is set to true by default. This configures the controller to check if other Pods use the same RWO-Volume referred to by the PVCViewer Pod. If so, it uses affinities to schedule the PVCViewer Pod to the node where the volume is currently mounted. This enables the PVCViewer to access RWO-PVC, even though this PVC might already be mounted by another Pod. When this setting is enabled the controller will set the node affinity in the PVCViewer Deployment in each reconciliation loop.

### Status

The Status of each PVCViewer CR will contain:
1. **Conditions**: A list of PodConditions which will be a mirror of the underlying Pod's Conditions.
2. **Ready**: A bool value that will be true only if the underlying Pod has both ContainersReady and PodReady conditions.
3. **URL**: This field contains the relative URL to the virtual service. This way, the volumes UI can simply read the final URL from the status.
   - We can use a default base prefix `pvcviewer/` which will end up with the following URL in the status: `pvcviewer/<namespace>/<name>`.


```go
// PVCViewerStatus defines the observed state of PVCViewer
type PVCViewerStatus struct {
   // Conditions will be a mirror of the underlying Pod’s Conditions
	Conditions []apiv1.PodCondition `json:"conditions,omitempty" patchStrategy:"merge" patchMergeKey:"type" protobuf:"bytes,1,rep,name=conditions"`

   // Ready specifies if the PVCViewer is ready to be used
   // +kubebuilder:default:=false
	Ready bool `json:"ready"`

   // This field contains the relative URL to the virtual service.
	URL *string `json:"url,omitempty"`
}
```

## Future Improvements
* Implement a distinct culling controller to clean up unutilized PVCViewer resources.
