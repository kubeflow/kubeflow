import '@polymer/test-fixture/test-fixture';
import {flush} from '@polymer/polymer/lib/utils/flush.js';

import './dashboard-view';

const FIXTURE_ID = 'dashboard-view-fixture';
const DASHBOARD_VIEW_SELECTOR_ID = 'test-dashboard-view';
const TEMPLATE = `
<test-fixture id="${FIXTURE_ID}">
  <template>
    <dashboard-view id="${DASHBOARD_VIEW_SELECTOR_ID}"></dashboard-view>
  </template>
</test-fixture>
`;

describe('Dashboard View', () => {
    let dashboardView;

    beforeAll(() => {
        const div = document.createElement('div');
        div.innerHTML = TEMPLATE;
        document.body.appendChild(div);
    });

    beforeEach(() => {
        document.getElementById(FIXTURE_ID).create();
        dashboardView = document.getElementById(DASHBOARD_VIEW_SELECTOR_ID);
    });

    afterEach(() => {
        document.getElementById(FIXTURE_ID).restore();
    });

    it('Does not show links without platform info', () => {
        expect(dashboardView.shadowRoot.getElementById('Platform-Links'))
            .toBeNull();
    });

    it('Does not show links for an unrecognized provider', async () => {
        dashboardView.platformInfo = {
            providerName: 'some-cloud-provider',
            provider: 'some-cloud-provider-project-id-unknown-format',
        };
        flush();
        expect(dashboardView.shadowRoot.getElementById('Platform-Links'))
            .toBeNull();
    });

    it('Shows GCP links when provider is gce', () => {
        dashboardView.platformInfo = {
            provider: 'gce://test-project/us-east1-c/gke-kubeflow-node-123',
            providerName: 'gce',
            kubeflowVersion: '1.0.0',
        };
        flush();
        expect(dashboardView.shadowRoot.querySelector('#Platform-Links header')
            .innerText).toBe('GCP Information');

        const hrefs = [];
        dashboardView.shadowRoot.querySelectorAll('#Platform-Links a.link')
            .forEach((l) => {
                hrefs.push(l.href);
            });
        expect(hrefs).toEqual([
            'https://console.cloud.google.com/logs/viewer?resource=k8s_cluster&project=test-project',
            'https://console.cloud.google.com/home/dashboard?project=test-project',
            'https://console.cloud.google.com/dm/deployments?project=test-project',
            'https://console.cloud.google.com/kubernetes/list?project=test-project',
        ]);
    });
});
