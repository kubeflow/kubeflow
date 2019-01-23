FROM node:10
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build --production

RUN npm install -g ecstatic

EXPOSE 5000

CMD ecstatic build --port 5000 --baseDir kflogin
