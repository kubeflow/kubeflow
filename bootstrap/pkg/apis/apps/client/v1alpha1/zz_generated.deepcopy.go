// +build !ignore_autogenerated

// Copyright 2018 The Kubeflow Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Code generated by deepcopy-gen. DO NOT EDIT.

package v1alpha1

import (
	runtime "k8s.io/apimachinery/pkg/runtime"
)

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *AppConfig) DeepCopyInto(out *AppConfig) {
	*out = *in
	if in.Registries != nil {
		in, out := &in.Registries, &out.Registries
		*out = make([]*RegistryConfig, len(*in))
		for i := range *in {
			if (*in)[i] != nil {
				in, out := &(*in)[i], &(*out)[i]
				*out = new(RegistryConfig)
				**out = **in
			}
		}
	}
	if in.Packages != nil {
		in, out := &in.Packages, &out.Packages
		*out = make([]KsPackage, len(*in))
		copy(*out, *in)
	}
	if in.Components != nil {
		in, out := &in.Components, &out.Components
		*out = make([]KsComponent, len(*in))
		copy(*out, *in)
	}
	if in.Parameters != nil {
		in, out := &in.Parameters, &out.Parameters
		*out = make([]KsParameter, len(*in))
		copy(*out, *in)
	}
	if in.ApplyParameters != nil {
		in, out := &in.ApplyParameters, &out.ApplyParameters
		*out = make([]KsParameter, len(*in))
		copy(*out, *in)
	}
	return
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new AppConfig.
func (in *AppConfig) DeepCopy() *AppConfig {
	if in == nil {
		return nil
	}
	out := new(AppConfig)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *Client) DeepCopyInto(out *Client) {
	*out = *in
	out.TypeMeta = in.TypeMeta
	in.ObjectMeta.DeepCopyInto(&out.ObjectMeta)
	in.Spec.DeepCopyInto(&out.Spec)
	in.Status.DeepCopyInto(&out.Status)
	return
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new Client.
func (in *Client) DeepCopy() *Client {
	if in == nil {
		return nil
	}
	out := new(Client)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyObject is an autogenerated deepcopy function, copying the receiver, creating a new runtime.Object.
func (in *Client) DeepCopyObject() runtime.Object {
	if c := in.DeepCopy(); c != nil {
		return c
	}
	return nil
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *ClientCondition) DeepCopyInto(out *ClientCondition) {
	*out = *in
	in.LastUpdateTime.DeepCopyInto(&out.LastUpdateTime)
	in.LastTransitionTime.DeepCopyInto(&out.LastTransitionTime)
	return
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new ClientCondition.
func (in *ClientCondition) DeepCopy() *ClientCondition {
	if in == nil {
		return nil
	}
	out := new(ClientCondition)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *ClientList) DeepCopyInto(out *ClientList) {
	*out = *in
	out.TypeMeta = in.TypeMeta
	out.ListMeta = in.ListMeta
	if in.Items != nil {
		in, out := &in.Items, &out.Items
		*out = make([]Client, len(*in))
		for i := range *in {
			(*in)[i].DeepCopyInto(&(*out)[i])
		}
	}
	return
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new ClientList.
func (in *ClientList) DeepCopy() *ClientList {
	if in == nil {
		return nil
	}
	out := new(ClientList)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyObject is an autogenerated deepcopy function, copying the receiver, creating a new runtime.Object.
func (in *ClientList) DeepCopyObject() runtime.Object {
	if c := in.DeepCopy(); c != nil {
		return c
	}
	return nil
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *ClientSpec) DeepCopyInto(out *ClientSpec) {
	*out = *in
	in.ComponentConfig.DeepCopyInto(&out.ComponentConfig)
	return
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new ClientSpec.
func (in *ClientSpec) DeepCopy() *ClientSpec {
	if in == nil {
		return nil
	}
	out := new(ClientSpec)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *ClientStatus) DeepCopyInto(out *ClientStatus) {
	*out = *in
	if in.Conditions != nil {
		in, out := &in.Conditions, &out.Conditions
		*out = make([]ClientCondition, len(*in))
		for i := range *in {
			(*in)[i].DeepCopyInto(&(*out)[i])
		}
	}
	return
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new ClientStatus.
func (in *ClientStatus) DeepCopy() *ClientStatus {
	if in == nil {
		return nil
	}
	out := new(ClientStatus)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *KsComponent) DeepCopyInto(out *KsComponent) {
	*out = *in
	return
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new KsComponent.
func (in *KsComponent) DeepCopy() *KsComponent {
	if in == nil {
		return nil
	}
	out := new(KsComponent)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *KsLibrary) DeepCopyInto(out *KsLibrary) {
	*out = *in
	return
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new KsLibrary.
func (in *KsLibrary) DeepCopy() *KsLibrary {
	if in == nil {
		return nil
	}
	out := new(KsLibrary)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *KsModule) DeepCopyInto(out *KsModule) {
	*out = *in
	if in.Components != nil {
		in, out := &in.Components, &out.Components
		*out = make([]*KsComponent, len(*in))
		for i := range *in {
			if (*in)[i] != nil {
				in, out := &(*in)[i], &(*out)[i]
				*out = new(KsComponent)
				**out = **in
			}
		}
	}
	if in.Modules != nil {
		in, out := &in.Modules, &out.Modules
		*out = make([]*KsModule, len(*in))
		for i := range *in {
			if (*in)[i] != nil {
				in, out := &(*in)[i], &(*out)[i]
				*out = new(KsModule)
				(*in).DeepCopyInto(*out)
			}
		}
	}
	return
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new KsModule.
func (in *KsModule) DeepCopy() *KsModule {
	if in == nil {
		return nil
	}
	out := new(KsModule)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *KsPackage) DeepCopyInto(out *KsPackage) {
	*out = *in
	return
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new KsPackage.
func (in *KsPackage) DeepCopy() *KsPackage {
	if in == nil {
		return nil
	}
	out := new(KsPackage)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *KsParameter) DeepCopyInto(out *KsParameter) {
	*out = *in
	return
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new KsParameter.
func (in *KsParameter) DeepCopy() *KsParameter {
	if in == nil {
		return nil
	}
	out := new(KsParameter)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *KsRegistry) DeepCopyInto(out *KsRegistry) {
	*out = *in
	if in.Libraries != nil {
		in, out := &in.Libraries, &out.Libraries
		*out = make(map[string]LibrarySpec, len(*in))
		for key, val := range *in {
			(*out)[key] = val
		}
	}
	return
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new KsRegistry.
func (in *KsRegistry) DeepCopy() *KsRegistry {
	if in == nil {
		return nil
	}
	out := new(KsRegistry)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *LibrarySpec) DeepCopyInto(out *LibrarySpec) {
	*out = *in
	return
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new LibrarySpec.
func (in *LibrarySpec) DeepCopy() *LibrarySpec {
	if in == nil {
		return nil
	}
	out := new(LibrarySpec)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *RegistriesConfigFile) DeepCopyInto(out *RegistriesConfigFile) {
	*out = *in
	if in.Registries != nil {
		in, out := &in.Registries, &out.Registries
		*out = make([]*RegistryConfig, len(*in))
		for i := range *in {
			if (*in)[i] != nil {
				in, out := &(*in)[i], &(*out)[i]
				*out = new(RegistryConfig)
				**out = **in
			}
		}
	}
	return
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new RegistriesConfigFile.
func (in *RegistriesConfigFile) DeepCopy() *RegistriesConfigFile {
	if in == nil {
		return nil
	}
	out := new(RegistriesConfigFile)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *Registry) DeepCopyInto(out *Registry) {
	*out = *in
	return
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new Registry.
func (in *Registry) DeepCopy() *Registry {
	if in == nil {
		return nil
	}
	out := new(Registry)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *RegistryConfig) DeepCopyInto(out *RegistryConfig) {
	*out = *in
	return
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new RegistryConfig.
func (in *RegistryConfig) DeepCopy() *RegistryConfig {
	if in == nil {
		return nil
	}
	out := new(RegistryConfig)
	in.DeepCopyInto(out)
	return out
}
