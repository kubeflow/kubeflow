import { test, expect, Page } from '@playwright/test';
import settings from '../fixtures/settings.json' assert { type: 'json' };
import notebooksRequest from '../fixtures/notebooks.json' assert { type: 'json' };
import { setupCustomPage, CustomPage } from '../support/e2e';


import { STATUS_TYPE } from 'kubeflow';

test.describe('Main table', () => {
  let customPage: CustomPage;

  test.beforeEach(async ({ page }) => {
    customPage = await setupCustomPage(page);

    await customPage.mockNamespacesRequest();
    await customPage.mockNotebooksRequest(settings.namespace);

    await customPage.goto('/');
  });

  test('should have a "Notebooks" title', async ({ page }) => {
    await expect(page.locator('[data-cy-toolbar-title]')).toHaveText('Notebooks');
  });

  test('should list Notebooks without errors', async ({ page }) => {
    // Check that there is no error snackbar
    await expect(page.locator('[data-cy-snack-status=ERROR]')).not.toBeVisible();
  });

  test('should have a `Namespace` column, when showing all-namespaces', async ({ page }) => {
    let customPage: CustomPage;
    customPage = await setupCustomPage(page);
    await customPage.mockNotebooksAllNamespacesRequest(settings.namespace);
    await customPage.selectAllNamespaces();

    // Trigger the action to select all namespaces (this may involve interacting with a dropdown)
    // await page.click('[data-cy-select-all-namespaces]');

    await expect(page.locator('[data-cy-table-header-row="Namespace"]')).toBeVisible();
  });

  test('renders every Notebook name into the table', async ({ page }) => {
    const notebooks = notebooksRequest.notebooks;

    // Assuming the table rows are sorted in ascending order by name
    const notebookNames = notebooks.map(notebook => notebook.name);

    const nameCells = await page.locator('[data-cy-resource-table-row="Name"]').all();
    for (let i = 0; i < nameCells.length; i++) {
      await expect(nameCells[i]).toHaveText(notebookNames[i]);
    }
  });

  test('checks Status icon for all notebooks', async ({ page }) => {
    const notebooks = notebooksRequest.notebooks;

    const statusCells = await page.locator('[data-cy-resource-table-row="Status"]').all();
    for (let i = 0; i < statusCells.length; i++) {
      const notebookStatus = notebooks[i].status.phase;

      if (notebookStatus === STATUS_TYPE.READY) {
        await expect(statusCells[i].locator('lib-status-icon>mat-icon')).toHaveText('check_circle');
      } else if (notebookStatus === STATUS_TYPE.STOPPED) {
        await expect(statusCells[i].locator('lib-status-icon>lib-icon')).toHaveAttribute('icon', 'custom:stoppedResource');
      } else if (notebookStatus === STATUS_TYPE.UNAVAILABLE) {
        await expect(statusCells[i].locator('lib-status-icon>mat-icon')).toHaveText('timelapse');
      } else if (notebookStatus === STATUS_TYPE.WARNING) {
        await expect(statusCells[i].locator('lib-status-icon>mat-icon')).toHaveText('warning');
      } else if (notebookStatus === STATUS_TYPE.WAITING || notebookStatus === STATUS_TYPE.TERMINATING) {
        await expect(statusCells[i].locator('mat-spinner')).toBeVisible();
      }
    }
  });
});
