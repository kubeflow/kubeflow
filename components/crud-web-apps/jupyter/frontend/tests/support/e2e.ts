import { Page } from '@playwright/test';
import {
  selectAllNamespaces,
  mockDashboardRequest,
  mockNamespacesRequest,
  mockNotebooksRequest,
  mockNotebooksAllNamespacesRequest,
  mockStorageClassesRequests,
  mockDefaultStorageClassRequest,
  mockGpusRequest,
  mockConfigRequest,
  mockPoddefaultsRequest,
} from './commands';

// Create a new interface extending the original Page interface
export interface CustomPage extends Page {
    /**
     * Custom method to select 'All namespaces' from the dropdown menu.
     */
    selectAllNamespaces(): Promise<void>;

    /**
     * Custom method to mock the request for '/dashboard_lib.bundle.js'.
     */
    mockDashboardRequest(): Promise<void>;

    /**
     * Custom method to mock the request to '/api/namespaces'.
     */
    mockNamespacesRequest(): Promise<void>;

    /**
     * Custom method to mock the request to '/api/namespaces/<namespace>/notebooks',
     * returning an empty array of notebooks.
     */
    mockNotebooksRequest(namespace: string): Promise<void>;

    /**
     * Custom method to mock requests to '/api/namespaces/<namespace>/notebooks'
     * for each namespace in the namespaces fixture, returning empty notebook arrays.
     */
    mockNotebooksAllNamespacesRequest(namespace: string): Promise<void>;

    /**
     * Custom method to mock requests to '/api/storageclasses'.
     */
    mockStorageClassesRequests(): Promise<void>;

    /**
     * Custom method to mock requests to '/api/storageclasses/default',
     * returning the specified defaultStorageClass.
     */
    mockDefaultStorageClassRequest(defaultStorageClass: string): Promise<void>;

    /**
     * Custom method to mock requests to '/api/gpus',
     * returning an object with an empty list of vendors.
     */
    mockGpusRequest(): Promise<void>;

    /**
     * Custom method to mock requests to '/api/config'.
     */
    mockConfigRequest(): Promise<void>;

    /**
     * Custom method to mock requests to '/api/namespaces/<namespace>/poddefaults',
     * returning an array of mock poddefaults.
     */
    mockPoddefaultsRequest(namespace: string): Promise<void>;
}

// Define custom methods on the Page prototype to implement the imported commands.
const extendPagePrototype = (page: CustomPage) => {
  page.selectAllNamespaces = async function () {
    await selectAllNamespaces(this);
  };

  page.mockDashboardRequest = async function () {
    await mockDashboardRequest(this);
  };

  page.mockNamespacesRequest = async function () {
    await mockNamespacesRequest(this);
  };

  page.mockNotebooksRequest = async function (namespace: string) {
    await mockNotebooksRequest(this, namespace);
  };

  page.mockNotebooksAllNamespacesRequest = async function (namespace: string) {
    await mockNotebooksAllNamespacesRequest(this, namespace);
  };

  page.mockStorageClassesRequests = async function () {
    await mockStorageClassesRequests(this);
  };

  page.mockDefaultStorageClassRequest = async function (defaultStorageClass: string) {
    await mockDefaultStorageClassRequest(this, defaultStorageClass);
  };

  page.mockGpusRequest = async function () {
    await mockGpusRequest(this);
  };

  page.mockConfigRequest = async function () {
    await mockConfigRequest(this);
  };

  page.mockPoddefaultsRequest = async function (namespace: string) {
    await mockPoddefaultsRequest(this, namespace);
  };
};

// Create a function to set up your custom page
export const setupCustomPage = async (page: Page): Promise<CustomPage> => {
  const customPage: CustomPage = page as CustomPage;
  extendPagePrototype(customPage);
  return customPage;
};
