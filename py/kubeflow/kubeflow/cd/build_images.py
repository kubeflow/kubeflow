""""Argo Workflow for building the component images"""
from kubeflow.kubeflow.ci import workflow_utils
from kubeflow.testing import argo_build_util


class Builder(workflow_utils.ArgoTestBuilder):
    def __init__(self, name=None, namespace=None, bucket=None,
                 test_target_name=None, **kwargs):
        super().__init__(name=name, namespace=namespace, bucket=bucket,
                         test_target_name=test_target_name, **kwargs)

    def _build_access_management_task(self, task_template):
        access_build = argo_build_util.deep_copy(task_template)

        access_build["name"] = "build-access-mamanegment"
        access_build["container"]["image"] = "gcr.io/kaniko-project/executor:v1.5.0"
        access_build["metadata"]["annotations"] = {"sidecar.istio.io/inject": "false"}
        access_dir = ("%s/components/access-mamanegment/") % self.src_dir
        access_build["container"]["args"] = ["--dockerfile=Dockerfile",
                                              "--context=dir://%s" % access_dir,
                                              "--destination=<aws_account_id.dkr.ecr.region.amazonaws.com/my-repository:my-tag>"]

        return access_build
    
    
    def _build_admission_webhook_task(self, task_template):
        admission_build = argo_build_util.deep_copy(task_template)

        admission_build["name"] = "build-admission-webhook"
        admission_build["container"]["image"] = "gcr.io/kaniko-project/executor:v1.5.0"
        admission_build["metadata"]["annotations"] = {"sidecar.istio.io/inject": "false"}
        admission_dir = ("%s/components/admission-webhook/") % self.src_dir
        admission_build["container"]["args"] = ["--dockerfile=Dockerfile",
                                                "--context=dir://%s" % admission_dir,
                                                "--destination=<aws_account_id.dkr.ecr.region.amazonaws.com/my-repository:my-tag>"]

        return admission_build
    
    
    def _build_central_dashboard_task(self, task_template):
        central_dashboard_build = argo_build_util.deep_copy(task_template)

        central_dashboard_build["name"] = "build-central-dashboard"
        central_dashboard_build["container"]["image"] = "gcr.io/kaniko-project/executor:v1.5.0"
        central_dashboard_build["metadata"]["annotations"] = {"sidecar.istio.io/inject": "false"}
        central_dashboard_dir = ("%s/components/central-dashboard/") % self.src_dir
        central_dashboard_build["container"]["args"] = ["--dockerfile=Dockerfile",
                                                        "--context=dir://%s" % central_dashboard_dir,
                                                        "--destination=<aws_account_id.dkr.ecr.region.amazonaws.com/my-repository:my-tag>"]

        return central_dashboard_build
    
    ## TODO: manage the Dockerfile.dockerignore that is not in the root of the build context
    def _build_jupyter_web_app_task(self, task_template):
        jwa_build = argo_build_util.deep_copy(task_template)

        jwa_build["name"] = "build-profile-controller"
        jwa_build["container"]["image"] = "gcr.io/kaniko-project/executor:v1.5.0"
        jwa_build["metadata"]["annotations"] = {"sidecar.istio.io/inject": "false"}
        jwa_dir = ("%s/components/crud-web-apps/") % self.src_dir
        jwa_build["container"]["args"] = ["--dockerfile=jupyter/Dockerfile",
                                          "--context=dir://%s" % jwa_dir,
                                          "--destination=<aws_account_id.dkr.ecr.region.amazonaws.com/my-repository:my-tag>"]

        return jwa_build
    
    
    ## TODO: manage the Dockerfile.dockerignore that is not in the root of the build context
    def _build_tensorboard_web_app_task(self, task_template):
        twa_build = argo_build_util.deep_copy(task_template)

        twa_build["name"] = "build-profile-controller"
        twa_build["container"]["image"] = "gcr.io/kaniko-project/executor:v1.5.0"
        twa_build["metadata"]["annotations"] = {"sidecar.istio.io/inject": "false"}
        twa_dir = ("%s/components/crud-web-apps/") % self.src_dir
        twa_build["container"]["args"] = ["--dockerfile=tensorboards/Dockerfile",
                                          "--context=dir://%s" % twa_dir,
                                          "--destination=<aws_account_id.dkr.ecr.region.amazonaws.com/my-repository:my-tag>"]

        return twa_build
    
    
    def _build_notebook_controller_task(self, task_template):
        notebook_build = argo_build_util.deep_copy(task_template)

        notebook_build["name"] = "build-profile-controller"
        notebook_build["container"]["image"] = "gcr.io/kaniko-project/executor:v1.5.0"
        notebook_build["metadata"]["annotations"] = {"sidecar.istio.io/inject": "false"}
        notebook_dir = ("%s/components/") % self.src_dir
        notebook_build["container"]["args"] = ["--dockerfile=notebook-controller/Dockerfile",
                                               "--context=dir://%s" % notebook_dir,
                                               "--destination=<aws_account_id.dkr.ecr.region.amazonaws.com/my-repository:my-tag>"]

        return notebook_build
    
    
    def _build_profile_controller_task(self, task_template):
        profile_build = argo_build_util.deep_copy(task_template)

        profile_build["name"] = "build-profile-controller"
        profile_build["container"]["image"] = "gcr.io/kaniko-project/executor:v1.5.0"
        profile_build["metadata"]["annotations"] = {"sidecar.istio.io/inject": "false"}
        profile_dir = ("%s/components/profile-controller/") % self.src_dir
        profile_build["container"]["args"] = ["--dockerfile=Dockerfile",
                                              "--context=dir://%s" % profile_dir,
                                              "--destination=<aws_account_id.dkr.ecr.region.amazonaws.com/my-repository:my-tag>"]

        return profile_build
    
    
    def _build_tensorboard_controller_task(self, task_template):
        tensorboard_build = argo_build_util.deep_copy(task_template)

        tensorboard_build["name"] = "build-profile-controller"
        tensorboard_build["container"]["image"] = "gcr.io/kaniko-project/executor:v1.5.0"
        tensorboard_build["metadata"]["annotations"] = {"sidecar.istio.io/inject": "false"}
        tensorboard_dir = ("%s/components/") % self.src_dir
        tensorboard_build["container"]["args"] = ["--dockerfile=tensorboard-controller/Dockerfile",
                                                  "--context=dir://%s" % tensorboard_dir,
                                                  "--destination=<aws_account_id.dkr.ecr.region.amazonaws.com/my-repository:my-tag>"]

        return tensorboard_build
    
    
    def build(self):
        """Build the Argo workflow graph"""
        workflow = self.build_init_workflow()
        task_template = self.build_task_template()

        # Build the Access Management image
        build_access_management_task = self._build_access_management_task(task_template)
        argo_build_util.add_task_to_dag(workflow, workflow_utils.E2E_DAG_NAME,
                                        build_access_management_task,
                                        [self.mkdir_task_name])
        
        # Build the Admission Webhook image
        build_admission_webhook_task = self._build_admission_webhook_task(task_template)
        argo_build_util.add_task_to_dag(workflow, workflow_utils.E2E_DAG_NAME,
                                        build_admission_webhook_task,
                                        [self.mkdir_task_name])
        
        # Build the Central Dashboard image
        build_central_dashboard_task = self._build_central_dashboard_task(task_template)
        argo_build_util.add_task_to_dag(workflow, workflow_utils.E2E_DAG_NAME,
                                        build_central_dashboard_task,
                                        [self.mkdir_task_name])
        
        # Build the Jupyter Web App image
        build_jupyter_web_app_task = self._build_jupyter_web_app_task(task_template)
        argo_build_util.add_task_to_dag(workflow, workflow_utils.E2E_DAG_NAME,
                                        build_jupyter_web_app_task,
                                        [self.mkdir_task_name])
        
        # Build the Tensorboards Web App image
        build_tensorboard_web_app_task = self._build_tensorboard_web_app_task(task_template)
        argo_build_util.add_task_to_dag(workflow, workflow_utils.E2E_DAG_NAME,
                                        build_tensorboard_web_app_task,
                                        [self.mkdir_task_name])
        
        # Build the Notebook Controller image
        build_notebook_controller_task = self._build_notebook_controller_task(task_template)
        argo_build_util.add_task_to_dag(workflow, workflow_utils.E2E_DAG_NAME,
                                        build_notebook_controller_task,
                                        [self.mkdir_task_name])
        
        # Build the Profile Controller image
        build_profile_controller_task = self._build_profile_controller_task(task_template)
        argo_build_util.add_task_to_dag(workflow, workflow_utils.E2E_DAG_NAME,
                                        build_profile_controller_task,
                                        [self.mkdir_task_name])
        
        # Build the Tensorboard Controller image
        build_tensorboard_controller_task = self._build_tensorboard_controller_task(task_template)
        argo_build_util.add_task_to_dag(workflow, workflow_utils.E2E_DAG_NAME,
                                        build_tensorboard_controller_task,
                                        [self.mkdir_task_name])

        # Set the labels on all templates
        workflow = argo_build_util.set_task_template_labels(workflow)

        return workflow


def create_workflow(name=None, namespace=None, bucket=None, **kwargs):
    """Create workflow returns an Argo workflow to test kfctl upgrades.

    Args:
        name: Name to give to the workflow. This can also be used to name
              things associated with the workflow.
    """

    builder = Builder(name=name, namespace=namespace, bucket=bucket, **kwargs)

    return builder.build()
