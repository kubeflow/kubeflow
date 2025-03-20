# Step 1: Builds and tests
FROM node:20-bullseye AS build

ARG kubeflowversion
ARG commit

ENV BUILD_VERSION=$kubeflowversion
ENV BUILD_COMMIT=$commit
ENV CHROME_BIN=/usr/bin/chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

COPY . /centraldashboard
WORKDIR /centraldashboard

RUN npm ci \
 && npm run build \
 && npm prune --production

# Step 2: Packages assets for serving
FROM node:20-alpine AS serve

RUN apk add --no-cache tini

USER node

ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY --from=build --chown=node:node /centraldashboard .

EXPOSE 8082
ENTRYPOINT ["/sbin/tini", "--" , "npm", "start"]
