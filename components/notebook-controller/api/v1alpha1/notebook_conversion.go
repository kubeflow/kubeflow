/*

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

package v1alpha1

import (
	"sigs.k8s.io/controller-runtime/pkg/conversion"

	nbv1beta1 "github.com/kubeflow/kubeflow/components/notebook-controller/api/v1beta1"
)

// ConvertTo converts this Notebook to the Hub version (v1beta1).
func (src *Notebook) ConvertTo(dstRaw conversion.Hub) error {
	dst := dstRaw.(*nbv1beta1.Notebook)
	dst.Spec.Template.Spec = src.Spec.Template.Spec
	dst.Status.ReadyReplicas = src.Status.ReadyReplicas
	dst.Status.ContainerState = src.Status.ContainerState
	conditions := []nbv1beta1.NotebookCondition{}
	for _, c := range src.Status.Conditions {
		newc := nbv1beta1.NotebookCondition{
			Type:          c.Type,
			LastProbeTime: c.LastProbeTime,
			Reason:        c.Reason,
			Message:       c.Message,
		}
		conditions = append(conditions, newc)
	}
	dst.Status.Conditions = conditions

	return nil
}

/*
ConvertFrom is expected to modify its receiver to contain the converted object.
Most of the conversion is straightforward copying, except for converting our changed field.
*/

// ConvertFrom converts from the Hub version (v1beta1) to this version.
func (dst *Notebook) ConvertFrom(srcRaw conversion.Hub) error {
	src := srcRaw.(*nbv1beta1.Notebook)
	dst.Spec.Template.Spec = src.Spec.Template.Spec
	dst.Status.ReadyReplicas = src.Status.ReadyReplicas
	dst.Status.ContainerState = src.Status.ContainerState
	conditions := []NotebookCondition{}
	for _, c := range src.Status.Conditions {
		newc := NotebookCondition{
			Type:          c.Type,
			LastProbeTime: c.LastProbeTime,
			Reason:        c.Reason,
			Message:       c.Message,
		}
		conditions = append(conditions, newc)
	}
	dst.Status.Conditions = conditions

	return nil
}
