""""Argo Workflow for building notebook-server-rstudio-tidyverse's OCI image using Kaniko"""
from kubeflow.kubeflow.cd import config, kaniko_builder


def create_workflow(name=None, namespace=None, bucket=None, **kwargs):
    """
    Args:
        name: Name to give to the workflow. This can also be used to name
              things associated with the workflow.
    """
    builder = kaniko_builder.Builder(
        name=name,
        namespace=namespace,
        bucket=bucket,
        **kwargs)

    return builder.build(
        dockerfile="components/example-notebook-servers/rstudio-tidyverse/Dockerfile",
        context="components/example-notebook-servers/rstudio-tidyverse/",
        destination=config.NOTEBOOK_SERVER_RSTUDIO_TIDYVERSE)
