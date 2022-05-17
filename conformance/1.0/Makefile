TEST_PROFILE ?= kf-conformance-test
KUBEFLOW_NAMESPACE ?= kubeflow

setup:
	# Create the conformance report directory
	mkdir -p /tmp/kf-conformance

	kubectl apply -f ./setup.yaml

run: setup run-kfp

report: report-kfp

clean:
	kubectl delete -f ./setup.yaml
	rm -rf /tmp/kf-conformance

# Component specific tasks

run-kfp:
	kubectl apply -f ./kfp-conformance.yaml

report-kfp:
	./report-pod.sh \
		$(shell kubectl get pod -n kf-conformance --selector=app=kfp-conformance -o jsonpath='{.items[*].metadata.name}') \
		/tmp/kfp-conformance.done \
		/tmp/kfp-conformance.log
