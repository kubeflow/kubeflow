package cmd

import (
	"reflect"
	"sigs.k8s.io/kustomize/v3/pkg/image"
	"testing"
)

func Test_imageToString(t *testing.T) {
	tests := []struct {
		name  string
		image image.Image
		want  string
	}{
		{
			name: "docker-newtag",
			image: image.Image{
				Name:   "mysql",
				NewTag: "15.0",
			},
			want: "mysql:15.0",
		},
		{
			name: "docker-digest",
			image: image.Image{
				Name:   "mysql",
				Digest: "sha256:5645412634544",
			},
			want: "mysql@sha256:5645412634544",
		},
		{
			name: "gcr-newname-tag",
			image: image.Image{
				Name:    "gcr.io/kubeflow/katib",
				NewName: "gcr.io/myproject/katib",
				NewTag:  "15.0",
			},
			want: "gcr.io/myproject/katib:15.0",
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			got := imageToString(test.image)
			if got != test.want {
				t.Fatalf("Got: %s. Want %s.", got, test.want)
			}
		})

	}
}

func Test_parseImageName(t *testing.T) {
	tests := []struct {
		name  string
		input string
		want  map[string]string
	}{
		{name: "invalid random", input: "random text", want: nil},
		{name: "invalid", input: "gcr.io", want: nil},
		{name: "image", input: "mysql", want: map[string]string{"components": "", "host": "", "port": "", "image": "mysql", "tag": ""}},
		{name: "image:tag", input: "mysql:latest", want: map[string]string{"components": "", "host": "", "port": "", "image": "mysql", "tag": "latest"}},
		{name: "repository/image:tag", input: "argoproj/argoui:v2.3.0", want: map[string]string{"components": "argoproj", "host": "", "port": "", "image": "argoui", "tag": "v2.3.0"}},
		{
			name:  "registry/repository/image:tag",
			input: "gcr.io/kubeflow-images-public/admission-webhook:v20190520-v0-139-gcee39dbc-dirty-0d8f4c",
			want: map[string]string{
				"components": "kubeflow-images-public", "host": "gcr.io", "port": "", "image": "admission-webhook", "tag": "v20190520-v0-139-gcee39dbc-dirty-0d8f4c",
			},
		},
		{
			name:  "registry/nested/repository/image",
			input: "gcr.io/kubeflow-images-public/kubernetes-sigs/application",
			want: map[string]string{
				"components": "kubeflow-images-public/kubernetes-sigs", "host": "gcr.io", "port": "", "image": "application", "tag": "",
			},
		},
		{
			name:  "registry/nested/repository/image:tag",
			input: "gcr.io/stackdriver-prometheus/stackdriver-prometheus:release-0.4.2",
			want: map[string]string{
				"components": "stackdriver-prometheus", "host": "gcr.io", "port": "", "image": "stackdriver-prometheus", "tag": "release-0.4.2",
			},
		},
		{
			name:  "registry:port/nested/repository/image:tag",
			input: "gcr.io:443/test/kubeflow-images-public/admission-webhook:v20190520-v0-139-gcee39dbc-dirty-0d8f4c",
			want: map[string]string{
				"components": "test/kubeflow-images-public", "host": "gcr.io", "port": "443", "image": "admission-webhook", "tag": "v20190520-v0-139-gcee39dbc-dirty-0d8f4c",
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := parseImageName(tt.input); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("parseImageName() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_parsePrefix(t *testing.T) {
	tests := []struct {
		name    string
		prefix  string
		want    map[string]string
		wantErr bool
	}{
		{name: "host", prefix: "test.io", wantErr: false, want: map[string]string{"host": "test.io", "port": "", "components": ""}},
		{name: "host with port", prefix: "test.io:7999", wantErr: false, want: map[string]string{"host": "test.io", "port": "7999", "components": ""}},
		{name: "host and simple hierarchical path", prefix: "test.io/my-repository", wantErr: false, want: map[string]string{"host": "test.io", "port": "", "components": "my-repository"}},
		{name: "host and complex hierarchical path", prefix: "test.io/my-repository/my-subcatecory", wantErr: false, want: map[string]string{"host": "test.io", "port": "", "components": "my-repository/my-subcatecory"}},
		{name: "fully qualified image name", prefix: "test.io/my-repository/image:tag", wantErr: true, want: nil},
		{name: "random", prefix: "random text", wantErr: true, want: nil},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := parsePrefix(tt.prefix)
			if (err != nil) != tt.wantErr {
				t.Errorf("parsePrefix() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("parsePrefix() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_setImageName(t *testing.T) {
	type args struct {
		oldName           string
		newNameComponents map[string]string
	}
	tests := []struct {
		name    string
		args    args
		flatten bool
		want    string
	}{
		{
			name:    "replace registry",
			args:    args{oldName: "gcr.io/kubeflow-images-public/ingress-setup:latest", newNameComponents: map[string]string{"host": "test.io"}},
			flatten: false,
			want:    "test.io/kubeflow-images-public/ingress-setup:latest",
		},
		{
			name:    "add registry",
			args:    args{oldName: "mysql:latest", newNameComponents: map[string]string{"host": "test.io"}},
			flatten: false,
			want:    "test.io/mysql:latest",
		},
		{
			name: "replace registry/repository",
			args: args{oldName: "gcr.io/kubeflow-images-public/ingress-setup:latest", newNameComponents: map[string]string{"host": "test.io", "components": "myrepository"}},
			want: "test.io/myrepository/kubeflow-images-public/ingress-setup:latest",
		},
		{
			name: "replace registry/repository/subpath",
			args: args{oldName: "gcr.io/kubeflow-images-public/katib/vizier-core:v0.1.2-alpha-156-g4ab3dbd", newNameComponents: map[string]string{"host": "test.io", "components": "myrepository"}},
			want: "test.io/myrepository/kubeflow-images-public/katib/vizier-core:v0.1.2-alpha-156-g4ab3dbd",
		},
		{
			name:    "replace registry - flatten",
			args:    args{oldName: "gcr.io/kubeflow-images-public/ingress-setup:latest", newNameComponents: map[string]string{"host": "test.io"}},
			flatten: true,
			want:    "test.io/ingress-setup:latest",
		},
		{
			name:    "replace registry/repository - flatten",
			args:    args{oldName: "gcr.io/kubeflow-images-public/ingress-setup:latest", newNameComponents: map[string]string{"host": "test.io", "components": "myrepository"}},
			flatten: true,
			want:    "test.io/myrepository/ingress-setup:latest",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			flatten = tt.flatten
			if got := setImageName(tt.args.oldName, tt.args.newNameComponents); got != tt.want {
				t.Errorf("setImageName() = %v, want %v", got, tt.want)
			}
		})
	}
}
