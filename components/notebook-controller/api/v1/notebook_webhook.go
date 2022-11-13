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

package v1

import (
	"fmt"

	dockerref "github.com/docker/distribution/reference"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	logf "sigs.k8s.io/controller-runtime/pkg/log"
	"sigs.k8s.io/controller-runtime/pkg/webhook"
)

// log is for logging in this package.
var notebooklog = logf.Log.WithName("notebook-resource")

func (r *Notebook) SetupWebhookWithManager(mgr ctrl.Manager) error {
	return ctrl.NewWebhookManagedBy(mgr).
		For(r).
		Complete()
}

// TODO(user): EDIT THIS FILE!  THIS IS SCAFFOLDING FOR YOU TO OWN!

// TODO(user): change verbs to "verbs=create;update;delete" if you want to enable deletion validation.
//+kubebuilder:webhook:path=/validate-kubeflow-org-v1-notebook,mutating=false,failurePolicy=fail,sideEffects=None,groups=kubeflow.org,resources=notebooks,verbs=create;update,versions=v1,name=vnotebook.kb.io,admissionReviewVersions=v1

var _ webhook.Validator = &Notebook{}

// ValidateCreate implements webhook.Validator so a webhook will be registered for the type
func (r *Notebook) ValidateCreate() error {
	notebooklog.Info("validate create", "name", r.Name)

	image := r.Spec.Template.Spec.Containers[0].Image

	notebooklog.Info("validate update", "image", image)
	_, err := dockerref.ParseNormalizedNamed(image)
	if err != nil {
		return fmt.Errorf("couldn't parse image reference %q: %v", image, err)
	}
	return nil
}

// ValidateUpdate implements webhook.Validator so a webhook will be registered for the type
func (r *Notebook) ValidateUpdate(old runtime.Object) error {
	notebooklog.Info("validate update", "name", r.Name)

	image := r.Spec.Template.Spec.Containers[0].Image

	notebooklog.Info("validate update", "image", image)
	_, err := dockerref.ParseNormalizedNamed(image)
	if err != nil {
		return fmt.Errorf("couldn't parse image reference %q: %v", image, err)
	}
	return nil
}

// ValidateDelete implements webhook.Validator so a webhook will be registered for the type
func (r *Notebook) ValidateDelete() error {
	notebooklog.Info("validate delete", "name", r.Name)

	// TODO(user): fill in your validation logic upon object deletion.
	return nil
}
