/* eslint-disable no-undef */
/* eslint-disable max-len */
import puppeteer from 'puppeteer';

import {takeAndCompareScreenshot, ensureFolders} from './screenshot-helpers.js';

let browser; let page;
const testCases = (size) => {
    it('/', () =>
        takeAndCompareScreenshot(page, '', size));
    it('/activity', () =>
        takeAndCompareScreenshot(page, '/activity', size, 'activity-without-content'));
    it('/activity?ns=kubeflow', () =>
        takeAndCompareScreenshot(page, '/activity?ns=kubeflow', size, 'activity-with-content'));
    // And your other routes, 404, etc.
};

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5e3;
ensureFolders();
describe('Screenshots are correct', function() {
    beforeEach(async function() {
        browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    afterEach(() => browser.close());

    describe('wide screen', function() {
        const size = 'wide';
        beforeEach(async function() {
            return page.setViewport({width: 1200, height: 700});
        });
        testCases(size);
    });

    describe('narrow screen', function() {
        const size = 'narrow';
        beforeEach(async function() {
            return page.setViewport({width: 800, height: 600});
        });
        testCases(size);
    });
});
