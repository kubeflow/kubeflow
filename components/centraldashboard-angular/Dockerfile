# --- Build the backend ---
FROM node:12-buster-slim as backend

COPY ./centraldashboard-angular/backend/ ./src
WORKDIR /src

RUN npm ci && \
    npm run build && \
    npm prune --production

# --- Build the frontend kubeflow library ---
FROM node:12-buster-slim as frontend-kubeflow-lib

WORKDIR /src

ENV NG_CLI_ANALYTICS "ci"
COPY ./crud-web-apps/common/frontend/kubeflow-common-lib/package.json ./
COPY ./crud-web-apps/common/frontend/kubeflow-common-lib/package-lock.json ./
RUN npm ci

COPY ./crud-web-apps/common/frontend/kubeflow-common-lib/projects ./projects
COPY ./crud-web-apps/common/frontend/kubeflow-common-lib/angular.json .
COPY ./crud-web-apps/common/frontend/kubeflow-common-lib/tsconfig.json .
RUN npm run build

# --- Build the frontend ---
FROM node:12-buster-slim as frontend

ARG kubeflowversion
ENV BUILD_VERSION=$kubeflowversion

COPY ./centraldashboard-angular/frontend ./src
WORKDIR /src

ENV NG_CLI_ANALYTICS "ci"
RUN node scripts/replace-string-in-file.js src/environments/environment.prod.ts 'BUILD_VERSION' $BUILD_VERSION
RUN npm ci
COPY --from=frontend-kubeflow-lib /src/dist/kubeflow/ ./node_modules/kubeflow/
RUN npm run build -- --output-path=./dist/default --configuration=production

# Step 2: Packages assets for serving
FROM node:12.22.12-alpine AS serve

ENV NODE_ENV=production
WORKDIR /app
COPY --from=backend /src .
COPY --from=frontend /src/dist/default/ ./dist/public/
COPY --from=frontend /src/dist/default/assets/dashboard_lib.bundle.js ./dist/public/
COPY --from=frontend /src/dist/default/assets/dashboard_lib.bundle.js.map ./dist/public/

EXPOSE 8082
ENTRYPOINT ["npm", "start"]

