package ksonnet

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func Test_camelCase(t *testing.T) {
	cases := []struct {
		in  string
		out string
	}{
		{
			in:  "foo",
			out: "foo",
		},
		{
			in:  "Foo",
			out: "foo",
		},
		{
			in:  "PascalCase",
			out: "pascalCase",
		},
	}

	for _, tc := range cases {
		t.Run(tc.in, func(t *testing.T) {
			out := camelCase(tc.in)
			require.Equal(t, tc.out, out)
		})
	}
}

func Test_stringInSlice(t *testing.T) {
	cases := []struct {
		name  string
		s     string
		sl    []string
		found bool
	}{
		{
			name:  "item present",
			s:     "a",
			sl:    []string{"a", "b", "c"},
			found: true,
		},
		{
			name:  "item not present",
			s:     "d",
			sl:    []string{"a", "b", "c"},
			found: false,
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			require.Equal(t, tc.found, stringInSlice(tc.s, tc.sl))
		})
	}
}

func Test_capitalizer_capitalize(t *testing.T) {
	tests := []struct {
		in   string
		want string
	}{
		{in: "hostIPC", want: "hostIpc"},
		{in: "hostPID", want: "hostPid"},
		{in: "targetCPUUtilizationPercentage", want: "targetCpuUtilizationPercentage"},
		{in: "externalID", want: "externalId"},
		{in: "podCIDR", want: "podCidr"},
		{in: "providerID", want: "providerId"},
		{in: "bootID", want: "bootId"},
		{in: "machineID", want: "machineId"},
		{in: "systemUUID", want: "systemUuid"},
		{in: "volumeID", want: "volumeId"},
		{in: "diskURI", want: "diskUri"},
		{in: "targetWWNs", want: "targetWwns"},
		{in: "datasetUUID", want: "datasetUuid"},
		{in: "pdID", want: "pdId"},
		{in: "scaleIO", want: "scaleIo"},
		{in: "podIP", want: "podIp"},
		{in: "hostIP", want: "hostIp"},
		{in: "clusterIP", want: "clusterIp"},
		{in: "externalIPs", want: "externalIps"},
		{in: "loadBalancerIP", want: "loadBalancerIp"},
		{in: "containerID", want: "containerId"},
		{in: "imageID", want: "imageId"},
		{in: "serverAddressByClientCIDRs", want: "serverAddressByClientCidrs"},
		{in: "clientCIDR", want: "clientCidr"},
		{in: "nonResourceURLs", want: "nonResourceUrls"},
		{in: "currentCPUUtilizationPercentage", want: "currentCpuUtilizationPercentage"},
		{in: "downwardAPI", want: "downwardApi"},
		{in: "AWSElasticBlockStoreVolumeSource", want: "AwsElasticBlockStoreVolumeSource"},
		{in: "CephFSVolumeSource", want: "CephFsVolumeSource"},
		{in: "DownwardAPIProjection", want: "DownwardApiProjection"},
		{in: "DownwardAPIVolumeFile", want: "DownwardApiVolumeFile"},
		{in: "DownwardAPIVolumeSource", want: "DownwardApiVolumeSource"},
		{in: "FCVolumeSource", want: "FcVolumeSource"},
		{in: "GCEPersistentDiskVolumeSource", want: "GcePersistentDiskVolumeSource"},
		{in: "HTTPGetAction", want: "HttpGetAction"},
		{in: "HTTPHeader", want: "HttpHeader"},
		{in: "ISCSIVolumeSource", want: "IscsiVolumeSource"},
		{in: "NFSVolumeSource", want: "NfsVolumeSource"},
		{in: "RBDVolumeSource", want: "RbdVolumeSource"},
		{in: "SELinuxOptions", want: "SeLinuxOptions"},
		{in: "ScaleIOVolumeSource", want: "ScaleIoVolumeSource"},
		{in: "TCPSocketAction", want: "TcpSocketAction"},
		{in: "APIVersion", want: "ApiVersion"},
		{in: "FSGroupStrategyOptions", want: "FsGroupStrategyOptions"},
		{in: "HTTPIngressPath", want: "HttpIngressPath"},
		{in: "HTTPIngressRuleValue", want: "HttpIngressRuleValue"},
		{in: "IDRange", want: "IdRange"},
		{in: "IngressTLS", want: "IngressTls"},
		{in: "SELinuxStrategyOptions", want: "SeLinuxStrategyOptions"},
		{in: "APIGroup", want: "ApiGroup"},
		{in: "APIGroupList", want: "ApiGroupList"},
		{in: "APIResource", want: "ApiResource"},
		{in: "APIResourceList", want: "ApiResourceList"},
		{in: "APIVersions", want: "ApiVersions"},
		{in: "ServerAddressByClientCIDR", want: "ServerAddressByClientCidr"},
		{in: "a", want: "a"},
		{in: "A", want: "A"},
	}
	for _, tt := range tests {
		t.Run(tt.in, func(t *testing.T) {
			require.Equal(t, tt.want, capitalize(tt.in), "c.capitalize(%s)", tt.in)
		})
	}
}

func Test_FormatKind(t *testing.T) {
	cases := []struct {
		name     string
		expected string
	}{
		{
			name:     "local",
			expected: "localStorage",
		},
		{
			name:     "error",
			expected: "errorParam",
		},
		{
			name:     "foo",
			expected: "foo",
		},
		{
			name:     "CIDRType",
			expected: "cidrType",
		},
		{
			name:     "$ref",
			expected: "dollarRef",
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			got := FormatKind(tc.name)
			require.Equal(t, tc.expected, got)
		})
	}
}
