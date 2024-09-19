SHELL=bash

install-deps:
	pushd ../../common/backend && \
	pip install -e . && \
	popd
	pip install -r requirements.txt

unittest:
	python -m unittest discover --pattern "*_test.py"

run:
	APP_PREFIX=/jupyter \
	gunicorn \
		-w 1 \
		--worker-class=gevent \
		--bind 0.0.0.0:5000 \

run-dev:
	UI_FLAVOR=default \
	BACKEND_MODE=dev \
	APP_SECURE_COOKIES=False \
	APP_PREFIX=/ \
	gunicorn \
		-w 1 \
		--worker-class=gevent \
		--bind 0.0.0.0:5000 \
		--access-logfile - entrypoint:app
