
# Create a yaml template to deploy the CRD
# Requires the template plugin
# https://github.com/technosophos/helm-template
CHART := https://storage.googleapis.com/tf-on-k8s-dogfood-releases/latest/tf-job-operator-chart-latest.tgz
deploy_config: 	
	rm -rf /tmp/tfjob_config_builder
	mkdir -p /tmp/tfjob_config_builder
	wget -O /tmp/tfjob_config_builder/tf-job-operator-chart-latest.tgz https://storage.googleapis.com/tf-on-k8s-dogfood-releases/latest/tf-job-operator-chart-latest.tgz
	tar -C /tmp/tfjob_config_builder -xvf  /tmp/tfjob_config_builder/tf-job-operator-chart-latest.tgz 
	# We set the templates to render because we don't want to render the tests.
	helm template /tmp/tfjob_config_builder/tf-job-operator-chart --set cloud=gke,rbac.install=true  \
		-x ./templates/config.yaml -x ./templates/deployment.yaml -x ./templates/rbac.yaml -x ./templates/service-account.yaml > deploy_crd.yaml
		
