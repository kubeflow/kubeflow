import puppeteer from 'puppeteer'

import {TEST_DIR, takeAndCompareScreenshot, ensureFolders} from './screenshot-helpers.js'
// import {unlinkSync} from 'fs'

let browser, page
const testCases = size => {
    it('/', () => takeAndCompareScreenshot(page, '', size))
    it('/activity', () => takeAndCompareScreenshot(page, '/activity', size, 'activity-without-content'))
    it('/activity?ns=kubeflow', () => takeAndCompareScreenshot(page, '/activity?ns=kubeflow', size, 'activity-with-content'))
    // And your other routes, 404, etc.
}
describe('Screenshots are correct', function() {
    this.timeout(5e3)
    before(async function() {
        ensureFolders()
    })

    // after(async () => unlinkSync(TEST_DIR))

    beforeEach(async function() {
        browser = await puppeteer.launch()
        page = await browser.newPage()
    })

    afterEach(() => browser.close())

    describe('wide screen', function() {
        const size = 'wide'
        beforeEach(async function() {
            return page.setViewport({width: 1200, height: 700})
        })
        testCases(size)
    })

    describe('narrow screen', function() {
        const size = 'narrow'
        beforeEach(async function() {
            return page.setViewport({width: 800, height: 600})
        })
        testCases(size)
    })
})