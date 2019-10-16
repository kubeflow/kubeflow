# Build
FROM node:10 AS serve
WORKDIR /app
COPY . .

RUN npm install
RUN chmod +x build_serve.sh

ENTRYPOINT ["/app/build_serve.sh"]
