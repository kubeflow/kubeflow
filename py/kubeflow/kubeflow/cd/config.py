AWS_REGISTRY = "public.ecr.aws/j1r0q0g6/notebooks"

# list of public images
JUPYTER_WEB_APP_IMAGE = "%s/jupyter-web-app" % AWS_REGISTRY
TENSORBOARDS_WEB_APP_IMAGE = "%s/tensorboards-web-app" % AWS_REGISTRY
CENTRAL_DASHBOARD_IMAGE = "%s/central-dashboard" % AWS_REGISTRY

ADMISSION_WEBHOOK_IMAGE = "%s/admission-webhook" % AWS_REGISTRY
ACCESS_MANAGEMENT_IMAGE = "%s/access-management" % AWS_REGISTRY

PROFILE_CONTROLLER_IMAGE = "%s/profile-controller" % AWS_REGISTRY
NOTEBOOK_CONTROLLER_IMAGE = "%s/notebook-controller" % AWS_REGISTRY
TENSORBOARD_CONTROLLER_IMAGE = "%s/tensorboard-controller" % AWS_REGISTRY
