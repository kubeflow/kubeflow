FROM ARCH/alpine
RUN apk --no-cache add ca-certificates
WORKDIR /app
COPY centraldashboard-ARCH /app/centraldashboard
ENV PORT_1=8082
EXPOSE 8082
CMD [ "/app/centraldashboard" ]
