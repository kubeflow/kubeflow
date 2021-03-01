""""Argo Workflow for running frontend unit tests"""
from kubeflow.kubeflow.ci import workflow_utils
from kubeflow.testing import argo_build_util


class Builder(workflow_utils.ArgoTestBuilder):
    def __init__(self, name=None, namespace=None, bucket=None,
                 test_target_name=None, **kwargs):
        super().__init__(name=name, namespace=namespace, bucket=bucket,
                         test_target_name=test_target_name, **kwargs)

    def _create_install_modules_task(self, task_template):
        install = argo_build_util.deep_copy(task_template)

        install["name"] = "npm-modules-install"
        install["container"]["image"] = "node:12.20.1-stretch-slim"
        install["container"]["command"] = ["npm"]
        install["container"]["args"] = ["ci"]

        ui_dir = ("%s/components/crud-web-apps/common/"
                  "frontend/kubeflow-common-lib/") % self.src_dir
        install["container"]["workingDir"] = ui_dir

        return install

    def _create_ui_tests_task(self, task_template):
        ui_tests = argo_build_util.deep_copy(task_template)

        img = "browserless/chrome:1.44-chrome-stable"
        ui_tests["name"] = "common-ui-tests"
        ui_tests["container"]["image"] = img
        ui_tests["container"]["command"] = ["npm"]
        ui_tests["container"]["args"] = ["run", "test-ci"]

        ui_dir = ("%s/components/crud-web-apps/common/"
                  "frontend/kubeflow-common-lib/") % self.src_dir
        ui_tests["container"]["workingDir"] = ui_dir

        return ui_tests

    def _create_ui_build_task(self, task_template):
        ui_build = argo_build_util.deep_copy(task_template)

        ui_build["name"] = "build-common-ui-library"
        ui_build["container"]["image"] = "node:12.20.1-stretch-slim"
        ui_build["container"]["command"] = ["npm"]
        ui_build["container"]["args"] = ["run", "build"]

        ui_dir = ("%s/components/crud-web-apps/common/"
                  "frontend/kubeflow-common-lib/") % self.src_dir
        ui_build["container"]["workingDir"] = ui_dir

        return ui_build

    def _create_exit_handler(self, task_template):
        ui_build = argo_build_util.deep_copy(task_template)

        ui_build["name"] = "rm-node-modules"
        ui_build["container"]["image"] = "node:12.20.1-stretch-slim"
        ui_build["container"]["command"] = ["rm"]
        ui_build["container"]["args"] = ["-r", "node_modules"]

        ui_dir = ("%s/components/crud-web-apps/common/"
                  "frontend/kubeflow-common-lib/") % self.src_dir
        ui_build["container"]["workingDir"] = ui_dir

        return ui_build

    def build(self):
        """Build the Argo workflow graph"""
        workflow = self.build_init_workflow()
        task_template = self.build_task_template()

        # install npm modules
        modules_install_task = self._create_install_modules_task(task_template)
        argo_build_util.add_task_to_dag(workflow, workflow_utils.E2E_DAG_NAME,
                                        modules_install_task,
                                        [self.mkdir_task_name])

        # run common ui frontend tests
        ui_tests_task = self._create_ui_tests_task(task_template)
        argo_build_util.add_task_to_dag(workflow, workflow_utils.E2E_DAG_NAME,
                                        ui_tests_task,
                                        [modules_install_task["name"]])

        # build the node module from the lib source code
        build_step = self._create_ui_build_task(task_template)
        argo_build_util.add_task_to_dag(workflow, workflow_utils.E2E_DAG_NAME,
                                        build_step,
                                        [modules_install_task["name"]])

        # EXIT-HANDLER: remove node_modules folder as exit handler
        rm_node_modules = self._create_exit_handler(task_template)
        argo_build_util.add_task_to_dag(workflow, workflow_utils.EXIT_DAG_NAME,
                                        rm_node_modules, [])

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
