FROM ubuntu:18.04

RUN apt-get update -y && \
    apt-get install -y apt-utils  build-essential curl \
	python-dev python3-pip \
    libssl-dev libffi-dev python3-bcrypt

# We copy just the requirements.txt first to leverage Docker cache
COPY ./requirements.txt /app/requirements.txt

RUN pip3 install -r /app/requirements.txt

COPY ./kubeflow_jupyter /app/kubeflow_jupyter
COPY ./main.py /app/main.py

WORKDIR /app/

ENTRYPOINT ["python3"]
CMD ["main.py"]
