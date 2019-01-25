FROM ubuntu:16.04

RUN apt-get update -y && \
    apt-get install -y apt-utils  build-essential curl \
	python-dev python3-pip \
    libssl-dev libffi-dev python3-bcrypt

# We copy just the requirements.txt first to leverage Docker cache
COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip3 install -r requirements.txt

COPY run.py /app
COPY kubeflow /app/kubeflow

ENTRYPOINT ["python3"]

CMD ["run.py"]
