# build prod
FROM golang:alpine
LABEL maintainer="Adhita Selvaraj <adhita.selvaraj@gmail.com>"
WORKDIR /go/src/frontend
ADD . /go/src/frontend
ENV PORT_1=8082
CMD [ "go", "run", "dashboard.go" ]
EXPOSE 8082
