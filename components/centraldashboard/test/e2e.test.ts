import 'jasmine';

import {Credentials, JWT} from 'google-auth-library';
import {launch, Page} from 'puppeteer';
import request from 'request';


/**
 * Look here to see setup instructions for Environment Setup for Cluster Auth:
 *   https://cloud.google.com/kubernetes-engine/docs/tutorials/authenticating-to-cloud-platform
 * 
 * Use Scope: Owner
 */ 
const ORIGINAL_TIMEOUT = jasmine.DEFAULT_TIMEOUT_INTERVAL;
const {
    KF_HOST,   // The url to your cluster, usually: https://<cluster>.endpoints.<project>.cloud.goog/
    CLIENT_ID, // This is the CLIENT_ID token used to create the cluster (used in http://deploy.kubeflow.cloud/)
    SERVICE_ACCOUNT_EMAIL, // The email address for the service account you created <name>@<project>.iam.gserviceaccount.com
    SERVICE_ACCOUNT_KEY,   // Should be a JSON file downloaded from cloud console service accounts
} = process.env;

['KF_HOST', 'CLIENT_ID', 'SERVICE_ACCOUNT_EMAIL', 'SERVICE_ACCOUNT_KEY'].forEach(envVar => {
    if (!process.env[envVar]) {console.log(`${envVar} environment variable must be set`);process.exit(1);}
});
if (!/^https:\/\/\S+/.test(KF_HOST)) {console.log('Invalid HOST url provided, must be like https://*');process.exit(1);}
const HOST = KF_HOST.replace(/\/$/, '');

function getAuth(): Promise<Credentials> {
    const client = new JWT({
        keyFile: SERVICE_ACCOUNT_KEY,
        additionalClaims: {target_audience: CLIENT_ID}
    });
    return client.authorize();
}

function waitFor(seconds: number): Promise<void> {
    return new Promise((r) => setTimeout(r, seconds * 1000));
}

/**
 * This function should help any dev down the line quickly inspect all
 *  request headers as they arrive in the browser
 * @param page Page to intercept headers for
 */
async function interceptHeadersForDebugging(page: Page) {
    await page.setRequestInterception(true);
    page.on("request", request => {
        console.log("Request:", request.url(), request.headers());
        request.continue();
    });
}

/**
 * A helper function that allows you to clear the service-user account
 *  created with the tests below
 * @param credentials The credential OAuth token generated via `getAuth()`
 */
async function clearServiceUser(credentials: Credentials) {
    const body = await new Promise((res, rej) => request.delete(`${HOST}/api/workgroup/nuke-self`, {
        headers: {Authorization: `Bearer ${credentials.id_token}`},
    }, (err, resp, body) =>
        err || resp.statusCode >= 400? rej(err || body) : res(body)
    ));
    console.log('    Cleared service-user profile:', body);
}

describe('Kubeflow Dashboard Tests', () => {
    beforeEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
    });

    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = ORIGINAL_TIMEOUT;
    });

    xit('Will clear possible test remnants', async () => {
        const credentials = await getAuth();
        await clearServiceUser(credentials);
    });
    it('Should allow the user to register on first access', async () => {
        const browser = await launch();
        const credentials = await getAuth();
        const page = await browser.newPage();
        page.setExtraHTTPHeaders({Authorization: `Bearer ${credentials.id_token}`});
        console.log(`   Connecting to ${HOST}`);
        // interceptHeadersForDebugging(page);
        await page.goto(HOST);
        
        console.log(`   Scanning contents`);
        const prelimContent = await (await page.waitForFunction(() => document.body.innerHTML)).jsonValue() as string;
        if (!/main-page/.test(prelimContent)) {
            throw Error([
                'Failed since page delivered doesn\'t match expected contents',
                'Actual HTML returned:',
                prelimContent,
            ].join('\n'));
        }
        console.log(`   Waiting for page load`);
        await page.waitForFunction(() => document.querySelector('body > main-page').shadowRoot);
        await page.waitForFunction(() => {
            const root = document.querySelector('body > main-page').shadowRoot;
            const ajax = root.querySelector('iron-ajax[url="/api/workgroup/exists"]');
            // tslint:disable-next-line: no-any
            return !!(ajax && (ajax as any).lastRequest);
        });
        await page.evaluate(() =>
            (document.querySelector('body > main-page').shadowRoot
                // tslint:disable-next-line: no-any
                .querySelector('iron-ajax[url="/api/workgroup/exists"]') as any)
                .lastRequest.completes
        );

        console.log(`   Checking for registration flow (user state)`);
        const isRegistrationPresent = await page.evaluate(() => 
            (document.querySelector('body > main-page')
                .shadowRoot.querySelector('registration-page')||{}).tagName
        );
        if (!isRegistrationPresent) {
            throw Error([
                `Registration view did not load, which means this is not the first`,
                `run for this user, please remove this profile from the server and try again!\n`,
                `An easy way to do this, is to update the \`xit\` case to \`fit\` which will clear leftover test relics`
            ].join(''));
        }
        console.log(`   Interacting with Registration flow`);
        const startRegistration = await page.waitForFunction(() =>
            document.querySelector('body > main-page')
                .shadowRoot.querySelector('registration-page')
                .shadowRoot.querySelector('paper-button'));
        await startRegistration.asElement().click();
        await waitFor(3);

        console.log('   Finishing Registration');
        const finishRegistration = await page.waitForFunction(() => document.querySelector('body > main-page')
            .shadowRoot.querySelector('registration-page')
            .shadowRoot.querySelector(
                '#MainCard > neon-animated-pages > neon-animatable.iron-selected > div.actions > paper-button:nth-child(1)'));
        await finishRegistration.asElement().click();
        await waitFor(5);

        console.log('   Validating Namespace');
        const namespace = await page.waitForFunction(() => {
            const paperItem = document.querySelector('body > main-page')
                .shadowRoot.querySelector('#NamespaceSelector')
                .shadowRoot.querySelector(
                    'paper-menu-button > paper-listbox > paper-item');
            return paperItem ? paperItem.textContent : false;
        });
        const namespaceTextContent = await namespace.jsonValue() as string;
        expect(namespaceTextContent.trim())
            .toBe(SERVICE_ACCOUNT_EMAIL.split('@')[0]);
        
        console.log('   Clearing Test Data');
        await clearServiceUser(credentials);
    });
});
