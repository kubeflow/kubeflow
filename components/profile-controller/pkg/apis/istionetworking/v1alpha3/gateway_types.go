/*
Copyright 2019 The Kubernetes Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package v1alpha3

import (
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// NOTE: json tags are required.  Any new fields you add must have json tags for the fields to be serialized.

// Port describes the properties of a specific port of a service.
type Port struct {
	// REQUIRED: A valid non-negative integer port number.
	Number uint32 `protobuf:"varint,1,opt,name=number,proto3" json:"number,omitempty"`
	// REQUIRED: The protocol exposed on the port.
	// MUST BE one of HTTP|HTTPS|GRPC|HTTP2|MONGO|TCP|TLS.
	// TLS implies the connection will be routed based on the SNI header to
	// the destination without terminating the TLS connection.
	Protocol string `protobuf:"bytes,2,opt,name=protocol,proto3" json:"protocol,omitempty"`
	// Label assigned to the port.
	Name string `protobuf:"bytes,3,opt,name=name,proto3" json:"name,omitempty"`
}

type Server struct {
	// REQUIRED: The Port on which the proxy should listen for incoming
	// connections.
	Port *Port `protobuf:"bytes,1,opt,name=port,proto3" json:"port,omitempty"`
	// REQUIRED. One or more hosts exposed by this gateway.
	// While typically applicable to
	// HTTP services, it can also be used for TCP services using TLS with SNI.
	// A host is specified as a `dnsName` with an optional `namespace/` prefix.
	// The `dnsName` should be specified using FQDN format, optionally including
	// a wildcard character in the left-most component (e.g., `prod/*.example.com`).
	// Set the `dnsName` to `*` to select all `VirtualService` hosts from the
	// specified namespace (e.g.,`prod/*`). If no `namespace/` is specified,
	// the `VirtualService` hosts will be selected from any available namespace.
	// Any associated `DestinationRule` in the same namespace will also be used.
	//
	// A `VirtualService` must be bound to the gateway and must have one or
	// more hosts that match the hosts specified in a server. The match
	// could be an exact match or a suffix match with the server's hosts. For
	// example, if the server's hosts specifies `*.example.com`, a
	// `VirtualService` with hosts `dev.example.com` or `prod.example.com` will
	// match. However, a `VirtualService` with host `example.com` or
	// `newexample.com` will not match.
	//
	// NOTE: Only virtual services exported to the gateway's namespace
	// (e.g., `exportTo` value of `*`) can be referenced.
	// Private configurations (e.g., `exportTo` set to `.`) will not be
	// available. Refer to the `exportTo` setting in `VirtualService`,
	// `DestinationRule`, and `ServiceEntry` configurations for details.
	Hosts []string `protobuf:"bytes,2,rep,name=hosts,proto3" json:"hosts,omitempty"`
}

// GatewaySpec defines the desired state of Gateway
type GatewaySpec struct {
	// REQUIRED: A list of server specifications.
	Servers []*Server `protobuf:"bytes,1,rep,name=servers,proto3" json:"servers,omitempty"`
	// REQUIRED: One or more labels that indicate a specific set of pods/VMs
	// on which this gateway configuration should be applied. The scope of
	// label search is restricted to the configuration namespace in which the
	// the resource is present. In other words, the Gateway resource must
	// reside in the same namespace as the gateway workload instance.
	Selector map[string]string `protobuf:"bytes,2,rep,name=selector,proto3" json:"selector,omitempty" protobuf_key:"bytes,1,opt,name=key,proto3" protobuf_val:"bytes,2,opt,name=value,proto3"`
}

// GatewayStatus defines the observed state of Gateway
type GatewayStatus struct {
	// INSERT ADDITIONAL STATUS FIELD - define observed state of cluster
	// Important: Run "make" to regenerate code after modifying this file
}

// +genclient
// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// Gateway is the Schema for the gateways API
// +k8s:openapi-gen=true
type Gateway struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   GatewaySpec   `json:"spec,omitempty"`
	Status GatewayStatus `json:"status,omitempty"`
}

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// GatewayList contains a list of Gateway
type GatewayList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []Gateway `json:"items"`
}

func init() {
	SchemeBuilder.Register(&Gateway{}, &GatewayList{})
}
