# Step 1: Builds and tests
FROM node:16.20.0-bullseye AS build

ARG kubeflowversion
ARG commit
ENV BUILD_VERSION=$kubeflowversion
ENV BUILD_COMMIT=$commit
ENV CHROME_BIN=/usr/bin/chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

RUN apt update -qq && apt install -qq -y gnulib

COPY . /centraldashboard
WORKDIR /centraldashboard

RUN BUILDARCH="$(dpkg --print-architecture)" &&  npm rebuild && \
    if [ "$BUILDARCH" = "arm64" ]  ||  \
    [ "$BUILDARCH" = "armhf" ]; then \
    export CFLAGS=-Wno-error && \
    export CXXFLAGS=-Wno-error;  \
    fi && \
    npm install --legacy-peer-deps && \
    npm run build && \
    npm prune --production --legacy-peer-deps

# Step 2: Packages assets for serving
FROM node:16.20.0-alpine AS serve

ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /centraldashboard .

EXPOSE 8082
ENTRYPOINT ["npm", "start"]
