# Common code for CRUD web apps

Since our CRUD web apps like the Jupyter, Tensorboards and Volumes UIs are similarly build with Angular and Python/Flask we should factor the common code in to modules and libraries.

This directory will contain:
1. A Python package with a base backend. Each one of the mentioned apps are supposed to extend this backend.
2. An Angular library that will contain the common frontend code that these apps will be sharing

## Backend

The backend will be exposing a base backend which will be taking care of:
* Serving the Single Page Application
* Adding liveness/readiness probes
* Authentication based on the `kubeflow-userid` header
* Authorization using SubjectAccessReviews
* Uniform logging
* Exceptions handling
* Common helper functions for dates, yaml file parsing etc.

### How to use

In order to use this code during the development process one could use the `-e` [flag](https://pip.pypa.io/en/stable/reference/pip_install/#install-editable) with `pip install`. For example:

```bash
# I'm currently in /components/crud-web-apps/volumes/backend
cd ../../common/backend && pip install -e .
```

This will install all the dependencies of the package and you will now be able to include code from `kubeflow.kubeflow.crud_backend` in you current Python environment.

In order to build a Docker image and use this code you coud build a wheel and then install it:
```dockerfile
FROM python:3.7 AS backend-kubeflow-wheel

WORKDIR /src
COPY ./components/crud-web-apps/common/backend .

RUN python3 setup.py bdist_wheel

...
# Web App
FROM python:3.7

WORKDIR /package
COPY --from=backend-kubeflow-wheel /src .
RUN pip3 install .
...
```
