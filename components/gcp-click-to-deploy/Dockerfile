# Build, prune, and copy for serving.
FROM node:10-alpine AS build

COPY . /build
WORKDIR /build

RUN npm install && npm run build && npm prune --production

FROM node:10-alpine AS serve

WORKDIR /app
COPY --from=build /build .

ENTRYPOINT ["npm", "run", "serve"]
