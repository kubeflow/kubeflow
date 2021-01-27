# --- Build the backend kubeflow-wheel ---
FROM python:3.7-slim-buster AS backend-kubeflow-wheel

WORKDIR /src

COPY ./common/backend/ .
RUN python3 setup.py bdist_wheel

# --- Build the frontend kubeflow library ---
FROM node:12-buster-slim as frontend-kubeflow-lib

WORKDIR /src

COPY ./common/frontend/kubeflow-common-lib/package*.json ./
RUN npm install

COPY ./common/frontend/kubeflow-common-lib/ .
RUN npm run build

# --- Build the frontend ---
FROM node:12-buster-slim as frontend

WORKDIR /src
COPY ./jupyter/frontend/package*.json ./
RUN npm install
COPY --from=frontend-kubeflow-lib /src/dist/kubeflow/ ./node_modules/kubeflow/

COPY ./jupyter/frontend/ .

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
COPY ./jupyter/backend/Makefile .

COPY --from=frontend /src/dist/default/ /src/apps/default/static/
COPY --from=frontend /src/dist/rok/ /src/apps/rok/static/

ENTRYPOINT make run
