FROM ubuntu:16.04

RUN apt-get update -y && \
    apt-get install -y apt-utils  build-essential curl \
	python-dev python3-pip \
    libssl-dev libffi-dev python3-bcrypt

# We copy just the requirements.txt first to leverage Docker cache
COPY ./requirements.txt /app/requirements.txt

RUN pip3 install -r /app/requirements.txt

COPY default /app/default
COPY rok /app/rok
COPY baseui /app/baseui

ENV PYTHONPATH /app

WORKDIR /app/default

ENTRYPOINT ["python3"]
CMD ["run.py"]
