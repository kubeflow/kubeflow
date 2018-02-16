FROM python:2.7

EXPOSE 8888

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN pip install -r requirements/production.txt

ENTRYPOINT ["python", "/usr/src/app/server.py"]
