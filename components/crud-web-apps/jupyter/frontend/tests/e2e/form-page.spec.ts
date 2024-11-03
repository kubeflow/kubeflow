import { test, expect, Page } from '@playwright/test';
import settings from '../fixtures/settings.json' assert { type: 'json' };
import { setupCustomPage, CustomPage } from '../support/e2e';

test.describe('New notebook form', () => {
  let customPage: CustomPage;

  test.beforeEach(async ({ page }) => {
    customPage = await setupCustomPage(page);

    await customPage.mockDashboardRequest();
    await customPage.mockStorageClassesRequests();
    await customPage.mockDefaultStorageClassRequest('standard');
    await customPage.mockGpusRequest();
    await customPage.mockConfigRequest();

    await customPage.mockNotebooksRequest(settings.namespace);
    await customPage.mockPoddefaultsRequest(settings.namespace);

    await customPage.goto('/new');
  });

  test('should have a "New notebook" title', async ({ page }: { page: Page }) => {
    const title = await page.locator('[data-cy-toolbar-title]').innerText();
    expect(title).toContain('New notebook');
  });

  test('should auto update mount value when name change', async ({ page }: { page: Page }) => {
    await page.getByRole('button', { name: 'add new volume' }).click();
    await page.locator('.last[data-cy="data volumes"]').click();

    const nameInput = page.locator('.last[data-cy="data volumes"] [data-cy="volume name input"]');
    await nameInput.fill('new-volume-name');
    
    const nameValue = await nameInput.inputValue();
    const mountPathInput = page.locator('.last[data-cy="data volumes"] [data-cy="mount path"]');
    const mountValue = await mountPathInput.inputValue();
    
    expect(mountValue).toEqual(`/home/jovyan/${nameValue}`);
  });

  test('should not auto update mount value when it is dirty', async ({ page }: { page: Page }) => {
    await page.getByRole('button', { name: 'add new volume' }).click();
    await page.locator('.last[data-cy="data volumes"]').click();

    const mountPathInput = page.locator('.last[data-cy="data volumes"] [data-cy="mount path"]');
    await mountPathInput.fill('dirty');

    const nameInput = page.locator('.last[data-cy="data volumes"] [data-cy="volume name input"]');
    await nameInput.fill('new-volume-name');

    const nameValue = await nameInput.inputValue();
    const updatedMountValue = await mountPathInput.inputValue();

    expect(updatedMountValue).not.toEqual(`/home/jovyan/${nameValue}`);
  });

  test('should update panel header name according to the name input field', async ({ page }: { page: Page }) => {
    await page.locator('[data-cy="workspace volume"]').click();
    const nameInput = page.locator('[data-cy="volume name input"]');
    await nameInput.fill('test');

    const headerName = await page.locator('[data-cy="volume name header"]').innerText();
    expect(headerName).toContain('test');
  });

  test('should update name input field according to the ConfigMap', async ({ page }: { page: Page }) => {
    await page.locator('[data-cy="workspace volume"]').click();

    const nameInput = page.locator('[data-cy="volume name input"]');
    const nameValue = await nameInput.inputValue();
    // '{notebook-name}-workspace' is the name value of the config fixture
    expect(nameValue).toEqual('-workspace');
  });

  test('should update size input field according to the ConfigMap', async ({ page }: { page: Page }) => {
    await page.locator('[data-cy="workspace volume"]').click();

    const sizeInput = page.locator('[data-cy="size input"]');
    const sizeValue = await sizeInput.inputValue();
    // '20Gi' is the storage value of the config fixture
    expect(sizeValue).toEqual('20');
  });

  test('should update access mode input field according to the ConfigMap', async ({ page }: { page: Page }) => {
    await page.locator('[data-cy="workspace volume"]').click();

    // 'ReadWriteMany' is the accessModes value of the config fixture
    const accessModeRadio = page.locator('[data-cy="ReadWriteMany"]');
    expect(await accessModeRadio.evaluate((node: HTMLElement) => node.classList.contains('mat-radio-checked'))).toBe(true);
  });
});
