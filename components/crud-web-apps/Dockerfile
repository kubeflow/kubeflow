# --- Build the backend kubeflow-wheel ---
FROM python:3.7-slim-buster AS backend-kubeflow-wheel

WORKDIR /src

COPY ./common/backend/ .
RUN python3 setup.py bdist_wheel

# --- Build the frontend kubeflow library ---
FROM node:12-buster-slim as frontend-kubeflow-lib

WORKDIR /src

# ENV NG_CLI_ANALYTICS "ci"
COPY ./common/frontend/kubeflow-common-lib/package*.json ./
RUN npm install

COPY ./common/frontend/kubeflow-common-lib/ .
RUN npm run build

# --- Build the frontend ---
FROM node:12-buster-slim as frontend
RUN npm install -g @angular/cli

WORKDIR /src

COPY ./jupyter/frontend/package.json ./
COPY ./jupyter/frontend/package-lock.json ./
COPY ./jupyter/frontend/tsconfig.json ./
COPY ./jupyter/frontend/tsconfig.app.json ./
COPY ./jupyter/frontend/tsconfig.spec.json ./
COPY ./jupyter/frontend/angular.json ./
COPY ./jupyter/frontend/src ./src

# ENV NG_CLI_ANALYTICS "ci"
RUN npm install
COPY --from=frontend-kubeflow-lib /src/dist/kubeflow/ ./node_modules/kubeflow/

RUN npm run build -- --output-path=./dist/default --configuration=production