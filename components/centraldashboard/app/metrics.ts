import express, {Request, Response} from "express";
import client from "prom-client";
import responseTime from "response-time";

const appName = require("./../package.json").name;
const appVersion = require("./../package.json").version;


const restHttpRequestDuration = new client.Histogram({
  name: "rest_http_request_duration_seconds",
  help: "REST API response time in seconds",
  labelNames: ["method", "path", "status"],
});


const restHttpRequestTotal = new client.Counter({
  name: "rest_http_request_total",
  help: "Total number of HTTP requests for REST API",
  labelNames: ["method", "status"],
});


const appInfo = new client.Gauge({
  name: "app_info",
  help: "Information about application",
  labelNames: ["version"],
});


export function enableMetricsCollection(app: express.Application) {
  client.register.setDefaultLabels({ app: appName });  // set default labels
  client.collectDefaultMetrics();

  appInfo.labels({version: appVersion}).set(1);  // set value 1 for app_info with desired labels

  app.get("/prometheus/metrics", async (req: Request, res: Response) => {
    res.set("Content-Type", client.register.contentType);
    return res.send(await client.register.metrics());
  });

  app.use(
    responseTime((req: Request, res: Response, time: number) => {
      restHttpRequestTotal.labels({ method: req.method, status: res.statusCode }).inc();
      restHttpRequestDuration.labels(
        { method: req.method, path: req.baseUrl, status: res.statusCode }).observe(time);
    }),
  );
}
