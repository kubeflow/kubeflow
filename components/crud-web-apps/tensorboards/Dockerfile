# --- Build the backend kubeflow-wheel ---
FROM python:3.10-slim AS backend-kubeflow-wheel

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

COPY ./tensorboards/frontend/package.json ./
COPY ./tensorboards/frontend/package-lock.json ./
COPY ./tensorboards/frontend/tsconfig.json ./
COPY ./tensorboards/frontend/tsconfig.app.json ./
COPY ./tensorboards/frontend/tsconfig.spec.json ./
COPY ./tensorboards/frontend/angular.json ./
COPY ./tensorboards/frontend/src ./src

ENV NG_CLI_ANALYTICS "ci"
RUN npm ci
COPY --from=frontend-kubeflow-lib /src/dist/kubeflow/ ./node_modules/kubeflow/

RUN npm run build -- --output-path=./dist --configuration=production

# Web App
FROM python:3.10-slim

WORKDIR /package
COPY --from=backend-kubeflow-wheel /src .
RUN pip3 install .

WORKDIR /src
COPY ./tensorboards/backend/requirements.txt .
RUN pip3 install -r requirements.txt

COPY ./tensorboards/backend/app/ ./app
COPY ./tensorboards/backend/entrypoint.py .
COPY ./tensorboards/backend/Makefile .

COPY --from=frontend /src/dist/ /src/app/static/

ENTRYPOINT ["/bin/bash","-c","gunicorn -w 3 --bind 0.0.0.0:5000 --access-logfile - entrypoint:app"]
