import express, {Request, Response} from "express";
import {enableMetricsCollection} from "./metrics";
import client from "prom-client";
import {sendTestRequest} from './test_resources';


describe("metrics", () => {
    let app: express.Application;

    beforeEach(() => {
        jasmine.clock().install();
        jasmine.clock().mockDate(new Date(1557705600000));
        app = express();
    });

    describe("enableMetricsCollection", function () {
        it("enable metrics", function() {
            spyOn(client.register, "setDefaultLabels");
            spyOn(client, "collectDefaultMetrics");
            spyOn(app, "get");
            spyOn(app, "use");

            enableMetricsCollection(app);

            expect(client.collectDefaultMetrics).toHaveBeenCalled();
            expect(client.register.setDefaultLabels).toHaveBeenCalled();
            expect(app.get).toHaveBeenCalledWith("/prometheus/metrics",  jasmine.any(Function));
            expect(app.use).toHaveBeenCalledWith(jasmine.any(Function));
        });

        it("collect metrics", async () => {
            const appName = require("./../package.json").name;
            const appVersion = require("./../package.json").version;
            const expectedAppInfo = `app_info{version="${appVersion}",app="${appName}"} 1`;
            const addressInfo = app.listen(0).address();
            const url = `http://localhost:${addressInfo.port}/prometheus/metrics`;

            enableMetricsCollection(app);

            const response = await sendTestRequest(url);
            expect(response.includes(expectedAppInfo)).toBe(true);
        });
    });

    afterEach(() => {
        jasmine.clock().uninstall();
    });
});
