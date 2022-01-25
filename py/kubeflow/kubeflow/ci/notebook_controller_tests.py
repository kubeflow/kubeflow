""""Argo Workflow for testing Notebook Controller"""
from kubeflow.kubeflow.ci import workflow_utils
from kubeflow.testing import argo_build_util


class Builder(workflow_utils.ArgoTestBuilder):
    def __init__(self, name=None, namespace=None, bucket=None,
                 test_target_name=None, **kwargs):
        super().__init__(name=name, namespace=namespace, bucket=bucket,
                         test_target_name=test_target_name, **kwargs)

    def _kustomize_build_task(self, task_template):
        k_build = argo_build_util.deep_copy(task_template)

        k_build["name"] = "kustomize-build-test"
        k_build["container"]["image"] = "k8s.gcr.io/kustomize/kustomize:v4.1.2"
        k_build["container"]["args"] = ["build"]

        manifest_dir = ("%s/components/notebook-controller/config/"
                        "overlays/kubeflow/") % self.src_dir
        k_build["container"]["workingDir"] = manifest_dir

        return k_build

    def build(self):
        """Build the Argo workflow graph"""
        workflow = self.build_init_workflow(exit_dag=False)
        task_template = self.build_task_template()

        # build manifests with kustomize
        kustomize_build_task = self._kustomize_build_task(task_template)
        argo_build_util.add_task_to_dag(workflow, workflow_utils.E2E_DAG_NAME,
                                        kustomize_build_task,
                                        [self.mkdir_task_name])

        # Test building Notebook Controller image using Kaniko
        dockerfile = ("%s/components/notebook-controller"
                      "/Dockerfile") % self.src_dir
        context = "dir://%s/components/" % self.src_dir
        destination = "notebok-controller-test"

        kaniko_task = self.create_kaniko_task(task_template, dockerfile,
                                              context, destination,
                                              no_push=True)
        argo_build_util.add_task_to_dag(workflow,
                                        workflow_utils.E2E_DAG_NAME,
                                        kaniko_task, [self.mkdir_task_name])

        # Set the labels on all templates
        workflow = argo_build_util.set_task_template_labels(workflow)

        return workflow


def create_workflow(name=None, namespace=None, bucket=None, **kwargs):
    """
    Args:
        name: Name to give to the workflow. This can also be used to name
              things associated with the workflow.
    """
    builder = Builder(name=name, namespace=namespace, bucket=bucket, **kwargs)

    return builder.build()
