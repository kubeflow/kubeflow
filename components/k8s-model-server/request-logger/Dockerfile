FROM python:2.7.15

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY requirements.txt /usr/src/app
RUN pip install -r requirements.txt

COPY logging_worker.py /usr/src/app
ENTRYPOINT ["python", "logging_worker.py"]
