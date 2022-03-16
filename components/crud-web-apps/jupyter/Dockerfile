# --- Build the backend kubeflow-wheel ---
FROM python:3.7-slim-buster AS backend-kubeflow-wheel

WORKDIR /src

COPY ./common/backend/ .
RUN python3 setup.py bdist_wheel

# --- Build the frontend kubeflow library ---
FROM node:12-buster-slim as frontend-kubeflow-lib

WORKDIR /src

ENV NG_CLI_ANALYTICS "ci"
COPY ./common/frontend/kubeflow-common-lib/package.json ./
COPY ./common/frontend/kubeflow-common-lib/package-lock.json ./
RUN npm ci

COPY ./common/frontend/kubeflow-common-lib/projects ./projects
COPY ./common/frontend/kubeflow-common-lib/angular.json .
COPY ./common/frontend/kubeflow-common-lib/tsconfig.json .
RUN npm run build

# --- Build the frontend ---
FROM node:12-buster-slim as frontend

WORKDIR /src

COPY ./jupyter/frontend/package.json ./
COPY ./jupyter/frontend/package-lock.json ./
COPY ./jupyter/frontend/tsconfig.json ./
COPY ./jupyter/frontend/tsconfig.app.json ./
COPY ./jupyter/frontend/tsconfig.spec.json ./
COPY ./jupyter/frontend/angular.json ./
COPY ./jupyter/frontend/src ./src

ENV NG_CLI_ANALYTICS "ci"
RUN npm ci
COPY --from=frontend-kubeflow-lib /src/dist/kubeflow/ ./node_modules/kubeflow/

RUN npm run build -- --output-path=./dist/default --configuration=production
RUN npm run build -- --output-path=./dist/rok --configuration=rok-prod

# Web App
FROM python:3.7-slim-buster

WORKDIR /package
COPY --from=backend-kubeflow-wheel /src .
RUN pip3 install .

WORKDIR /src
COPY ./jupyter/backend/requirements.txt .
RUN pip3 install -r requirements.txt

COPY ./jupyter/backend/apps/ ./apps
COPY ./jupyter/backend/entrypoint.py .

COPY --from=frontend /src/dist/default/ /src/apps/default/static/
COPY --from=frontend /src/dist/rok/ /src/apps/rok/static/

# Type of guicorn worker. See https://docs.gunicorn.org/en/stable/settings.html#worker-class
# evenlet cannot be used with watches with the  Kube's client because it is not compatible with
# eventlet see:
#   https://github.com/kubernetes-client/python/issues/1686
ENV WORKER_CLASS sync
# Number of workers to spawn. See https://docs.gunicorn.org/en/stable/settings.html#worker-processes
ENV WORKER_COUNT "3"
# Number of concurrent connections for eventlet / gevent.
ENV WORKER_CONNECTIONS "1000"
# Number of threads
ENV WORKER_THREAD_COUNT "1"
# Access log format ref: https://docs.gunicorn.org/en/stable/settings.html#worker-class
# The amount of time it took to respond has been aded to the default.
ENV WORKER_ACCESS_LOG_FORMAT "%(h)s %(l)s %(t)s \"%(r)s\" %(s)s %(M)sms %(b)s \"%(f)s\" \"%(a)s\""
ENTRYPOINT ["/bin/bash", "-c", \
    "gunicorn \
        -k $WORKER_CLASS \
        -w $WORKER_COUNT \
        --threads $WORKER_THREAD_COUNT \
        --worker-connections $WORKER_CONNECTIONS \
        --bind 0.0.0.0:5000 \
        --access-logfile - \
        --access-logformat \"$WORKER_ACCESS_LOG_FORMAT\"\
        entrypoint:app"]
