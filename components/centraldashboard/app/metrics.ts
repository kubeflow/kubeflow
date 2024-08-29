import express, {Request, Response} from 'express';
import client from "prom-client";

const app = express();
const appName = require("./../package.json").name;
const appVersion = require("./../package.json").version;


export const restHttpRequestDuration = new client.Histogram({
  name: "rest_http_request_duration_seconds",
  help: "REST API response time in seconds",
  labelNames: ["method", "path", "status"],
});


export const restHttpRequestTotal = new client.Counter({
  name: "rest_http_request_total",
  help: "Total number of HTTP requests for REST API",
  labelNames: ["method", "status"],
});


export const appInfo = new client.Gauge({
  name: "app_info",
  help: "Information about application",
  labelNames: ["version"],
});


export function startMetricsServer(port: number) {
  const defaultLabels = { app: appName };
  const client = require("prom-client");
  const collectDefaultMetrics = client.collectDefaultMetrics;

  client.register.setDefaultLabels(defaultLabels);  // set default labels
  collectDefaultMetrics();

  appInfo.labels({version: appVersion}).set(1);  // set value 1 for app_info with desired labels

  app.get("/metrics", async (req: Request, res: Response) => {
    res.set("Content-Type", client.register.contentType);
    return res.send(await client.register.metrics());
  });
  app.listen(
    port,
    () => console.info(`Metrics server listening on port http://localhost:${port}`)
  );
}
