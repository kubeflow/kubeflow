import { Page, Route, Request as PlaywrightRequest } from '@playwright/test';

import config from '../fixtures/config.json' assert { type: 'json' };
import namespaces from '../fixtures/namespaces.json' assert { type: 'json' };
import notebooks from '../fixtures/notebooks.json' assert { type: 'json' };
import poddefaults from '../fixtures/poddefaults.json' assert { type: 'json' };


export async function selectAllNamespaces(page: Page) {
  console.log('Selecting all namespaces from the dropdown');

  // Click and select 'All namespaces' option
  await page.click('[data-cy-namespace-selector-dropdown]');
  await page.click('[data-cy-all-namespaces]');
}


export async function mockDashboardRequest(page: Page) {
  await page.route('/dashboard_lib.bundle.js', async (route: Route, request: PlaywrightRequest) => {
      if (request.method() === 'GET') {
          await route.fulfill({ body: JSON.stringify([]) });
      }
  });
}


export async function mockNamespacesRequest(page: Page) {
  await page.route('/api/namespaces', async (route: Route, request: PlaywrightRequest) => {
    if (request.method() === 'GET') {
      await route.fulfill({ json: namespaces });
    }
  });
}


export async function mockNotebooksRequest(page: Page, namespace: string) {
  await page.route(`/api/namespaces/${namespace}/notebooks`, async (route: Route, request: PlaywrightRequest) => {
    if (request.method() === 'GET') {
      await route.fulfill({ json: notebooks });
    }
  });
}


export async function mockNotebooksAllNamespacesRequest(page: Page, settingsNamespace: string) {
  for (const namespace of namespaces.namespaces) {
    if (namespace === settingsNamespace) {
      continue;
    }
    await page.route(`/api/namespaces/${namespace}/notebooks`, async (route: Route, request: PlaywrightRequest) => {
      if (request.method() === 'GET') {
        await route.fulfill({ json: { notebooks: [] } });
      }
    });
  }
}


export async function mockStorageClassesRequests(page: Page) {
  await page.route('/api/storageclasses', async (route: Route, request: PlaywrightRequest) => {
    if (request.method() === 'GET') {
      await route.fulfill({ json: { storageClasses: ['standard'] } });
    }
  });
}


export async function mockDefaultStorageClassRequest(page: Page, defaultStorageClass: string) {
  await page.route('/api/storageclasses/default', async (route: Route, request: PlaywrightRequest) => {
    if (request.method() === 'GET') {
      await route.fulfill({ json: { defaultStorageClass } });
    }
  });
}


export async function mockGpusRequest(page: Page) {
  await page.route('/api/gpus', async (route: Route, request: PlaywrightRequest) => {
    if (request.method() === 'GET') {
      await route.fulfill({
        json: {
          status: 200,
          success: true,
          user: null,
          vendors: [],
        },
      });
    }
  });
}


export async function mockConfigRequest(page: Page) {
  await page.route('/api/config', async (route: Route, request: PlaywrightRequest) => {
    if (request.method() === 'GET') {
      await route.fulfill({ json: config });
    }
  });
}


export async function mockPoddefaultsRequest(page: Page, namespace: string) {
  await page.route(`/api/namespaces/${namespace}/poddefaults`, async (route: Route, request: PlaywrightRequest) => {
    if (request.method() === 'GET') {
      await route.fulfill({ json: poddefaults });
    }
  });
}
