""""Argo Workflow base builder for building OCI image using Kaniko"""
from kubeflow.kubeflow import ci
from kubeflow.testing import argo_build_util


class Builder(ci.workflow_utils.ArgoTestBuilder):
    def __init__(self, name=None, namespace=None, bucket=None,
                 test_target_name=None, **kwargs):
        super().__init__(name=name, namespace=namespace, bucket=bucket,
                         test_target_name=test_target_name, **kwargs)

    def build(self, dockerfile, context, destination):
        """Build the Argo workflow graph"""
        workflow = self.build_init_workflow(exit_dag=False)
        task_template = self.build_task_template()

        # Build component OCI image using Kaniko
        dockerfile = ("%s/%s") % (self.src_dir, dockerfile)
        context = "dir://%s/%s" % (self.src_dir, context)
        destination = destination

        kaniko_task = self.create_kaniko_task(task_template, dockerfile,
                                              context, destination)
        argo_build_util.add_task_to_dag(workflow,
                                        ci.workflow_utils.E2E_DAG_NAME,
                                        kaniko_task, [self.mkdir_task_name])

        # Set the labels on all templates
        workflow = argo_build_util.set_task_template_labels(workflow)

        return workflow
