# --- Build the backend ---
FROM node:12-buster-slim as backend

COPY ./backend/ ./src
WORKDIR /src

RUN npm ci && \
    npm run build && \
    npm prune --production

# --- Build the frontend ---
FROM node:12-buster-slim as frontend

COPY ./frontend ./src
WORKDIR /src

ENV NG_CLI_ANALYTICS "ci"
RUN npm ci
RUN npm run build -- --output-path=./dist/default --configuration=production

# Step 2: Packages assets for serving
FROM node:12.22.12-alpine AS serve

ENV NODE_ENV=production
WORKDIR /app
COPY --from=backend /src .
COPY --from=frontend /src/dist/default/ ./dist/public/

EXPOSE 8082
ENTRYPOINT ["npm", "start"]