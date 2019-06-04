/**
 * This file contains the helpers needed by diff-test.js to perform
 *  screen-diff testing
 */
import fs from 'fs'
import path from 'path'
import {PNG} from 'pngjs'
import {expect} from 'chai'
import pixelmatch from 'pixelmatch'

export const TEST_DIR = path.join(__dirname, 'temp')
export const GOLDEN_DIR = path.join(__dirname, 'golden')

/** Create test folders if they do not exist */
export const ensureFolders = _ => {
    ['','wide','narrow'].forEach(f => {
        const folder = `${TEST_DIR}/${f}`
        if (fs.existsSync(folder)) return
        fs.mkdirSync(folder);
    })
}

/** Compares Screenshots between test and golden directories
 * @param {string} fileName Name of the file
 */
export const compareScreenshots = fileName => {
    return new Promise(res => {
        const img1 = fs.createReadStream(`${TEST_DIR}/${fileName}.png`).pipe(new PNG()).on('parsed', doneReading);
        const img2 = fs.createReadStream(`${GOLDEN_DIR}/${fileName}.png`).pipe(new PNG()).on('parsed', doneReading);
    
        let filesRead = 0;
        function doneReading() {
            // Wait until both files are read.
            if (++filesRead < 2) return;
    
            // The files should be the same size.
            expect(img1.width, 'image widths are the same').equal(img2.width);
            expect(img1.height, 'image heights are the same').equal(img2.height);
    
            // Do the visual diff.
            const diff = new PNG({width: img1.width, height: img2.height});
            const numDiffPixels = pixelmatch(
                img1.data, img2.data, diff.data, img1.width, img1.height,
                {threshold: 0.1});
    
            // The files should look the same.
            expect(numDiffPixels, 'number of different pixels').equal(0);
            res();
        }
    });
}

/** Take screenshots and compare
 * @param {puppeteer} page is a reference to the Puppeteer page.
 * @param {string} route is the path you're loading, which I'm using to name the file.
 * @param {"wide"|"narrow"} filePrefix is either "wide" or "narrow"
 * @param {string|undefined} name filename to use instead of route
 */ 
export const takeAndCompareScreenshot = async (page, route, filePrefix, name) => {
    // If you didn't specify a file, use the name of the route.
    let fileName = filePrefix + '/' + (name || route || 'overview');
    
    await page.goto(`http://127.0.0.1:8081${route}`);
    await page.screenshot({path: `${TEST_DIR}/${fileName}.png`});
  
    return await compareScreenshots(fileName);
}