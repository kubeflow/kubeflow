produce:
	python sample.py

consume:
	python sample2.py test test-consumer-group


cindition:
	kubectl wait kafka/sandbox --for=condition=Ready --timeout=300s -n zora

stream:
	kubectl port-forward svc/pixy -n zora 19091:9090