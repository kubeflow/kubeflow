FROM node:10

WORKDIR /centraldashboard

COPY app/ ./app
COPY public/ ./public
COPY webpack.config.js *.json ./

RUN npm install && npm run build

EXPOSE 8080

ENTRYPOINT ["npm", "start"]
