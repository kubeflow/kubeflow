# Step 1: Builds and tests
FROM node:12.18.3-alpine AS build

ARG kubeflowversion
ARG commit
ENV BUILD_VERSION=$kubeflowversion
ENV BUILD_COMMIT=$commit
ENV CHROME_BIN=/usr/bin/chromium-browser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Installs latest Chromium package and configures environment for testing
RUN apk update && apk upgrade && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk add --no-cache bash chromium@edge nss@edge \
    freetype@edge \
    harfbuzz@edge \
    ttf-freefont@edge \
    libstdc++@edge

RUN if [ "$(uname -m)" = "aarch64" ]; then \
        apk update && apk upgrade && \
        apk add --no-cache python2 make g++@edge; \
    fi

COPY . /centraldashboard
WORKDIR /centraldashboard

RUN npm rebuild && \
    if [ "$(uname -m)" = "aarch64" ]; then \
        export CFLAGS=-Wno-error && \
        export CXXFLAGS=-Wno-error && \
        npm install; \
    else \
        npm install; \
    fi && \
    npm test && \
    npm run build && \
    npm prune --production

# Step 2: Packages assets for serving
FROM node:12.18.3-alpine AS serve

ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /centraldashboard .

EXPOSE 8082
ENTRYPOINT ["npm", "start"]
