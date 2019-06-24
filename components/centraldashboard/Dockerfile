# Step 1: Builds and tests
FROM node:10-alpine AS test

# Installs latest Chromium package and configures environment for testing
RUN apk update && apk upgrade && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk add --no-cache bash chromium@edge nss@edge \
    freetype@edge \
    harfbuzz@edge \
    ttf-freefont@edge
ENV CHROME_BIN=/usr/bin/chromium-browser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

COPY . /centraldashboard
WORKDIR /centraldashboard

RUN npm rebuild && npm install && npm test

# Step 2: Packages assets for serving
FROM node:10-alpine AS build

COPY --from=test /centraldashboard /centraldashboard/
WORKDIR /centraldashboard

ARG kubeflowversion
ARG commit
ENV BUILD_VERSION=$kubeflowversion
ENV BUILD_COMMIT=$commit
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

RUN npm run build && npm prune --production

EXPOSE 8082

ENTRYPOINT ["npm", "start"]
