import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/hardware-icons.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';

import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-toast/paper-toast.js';

import {html, PolymerElement} from '@polymer/polymer';

import css from './manage-users-view-culling.css';
import template from './manage-users-view-culling.pug';
import utilitiesMixin from './utilities-mixin.js';

export class ManageUsersViewCulling extends utilitiesMixin(PolymerElement) {
    static get template() {
        return html([`
            <style>${css.toString()}</style>
            ${template()}
        `]);
    }

    static get properties() {
        return {
            ownedNamespace: {type: Object, value: () => ({})},
            cullingConfig: {
                type: Object,
                value: () => ({
                    enabled: false,
                    defaultIdleTime: '480',
                    defaultCheckPeriod: '5',
                    minIdleTime: '60',
                    maxIdleTime: '1440',
                    allowUserExemption: true,
                    exemptNotebooks: [],
                    overrideClusterDefaults: false,
                    gpuEnabled: false,
                    gpuMode: 'gpu-priority',
                    gpuMemoryThreshold: 10,
                    gpuComputeThreshold: 5,
                    gpuKernelTimeout: '5m',
                    gpuSustainedDuration: '10m'
                }),
                observer: '_cullingConfigChanged'
            },
            clusterDefaults: {
                type: Object,
                value: () => ({
                    enabled: true,
                    defaultIdleTime: '1440',
                    defaultMinIdleTime: '60',
                    defaultMaxIdleTime: '2880',
                    allowUserExemption: true
                })
            },
            exemptNotebooksText: {
                type: String,
                value: '',
                observer: '_exemptNotebooksTextChanged'
            },
            gpuModeIndex: {
                type: Number,
                value: 1,
                observer: '_gpuModeIndexChanged'
            },
            hasChanges: {type: Boolean, value: false},
            cullingConfigError: String,
            cullingConfigFetchError: String,
            clusterDefaultsError: String,
            originalConfig: Object
        };
    }

    ready() {
        super.ready();
        this.originalConfig = {};
        // Ensure we have a valid cullingConfig object
        if (!this.cullingConfig) {
            this.cullingConfig = this._getDefaultCullingConfig();
        }
    }

    _cullingConfigChanged(newConfig) {
        // Only process if we have a valid config object
        if (!newConfig || typeof newConfig !== 'object') {
            return;
        }

        if (newConfig.exemptNotebooks) {
            this.exemptNotebooksText = newConfig.exemptNotebooks.join(',');
        }
        if (newConfig.gpuMode) {
            this.gpuModeIndex = this._getGpuModeIndex(newConfig.gpuMode);
        }
        this._updateOriginalConfig(newConfig);
    }

    _exemptNotebooksTextChanged(newText) {
        if (this.cullingConfig && newText !== undefined) {
            this.set('cullingConfig.exemptNotebooks',
                newText.split(',').map((n) => n.trim()).filter((n) => n));
            this._checkForChanges();
        }
    }

    _gpuModeIndexChanged(newIndex) {
        const modes = ['gpu-only', 'gpu-priority', 'time-priority'];
        if (this.cullingConfig && modes[newIndex]) {
            this.set('cullingConfig.gpuMode', modes[newIndex]);
            this._checkForChanges();
        }
    }

    _getGpuModeIndex(mode) {
        const modes = ['gpu-only', 'gpu-priority', 'time-priority'];
        return Math.max(0, modes.indexOf(mode));
    }

    /**
     * Check if we should fetch configuration for the given namespace
     * @param {Object} ownedNamespace The namespace object
     * @return {boolean} True if we should fetch config
     */
    _shouldFetchConfig(ownedNamespace) {
        return ownedNamespace && ownedNamespace.namespace;
    }

    /**
     * Get default culling configuration values
     * @return {Object} Default configuration object
     */
    _getDefaultCullingConfig() {
        return {
            enabled: false,
            defaultIdleTime: '480',
            defaultCheckPeriod: '5',
            minIdleTime: '60',
            maxIdleTime: '1440',
            allowUserExemption: true,
            exemptNotebooks: [],
            overrideClusterDefaults: false,
            gpuEnabled: false,
            gpuMode: 'gpu-priority',
            gpuMemoryThreshold: 10,
            gpuComputeThreshold: 5,
            gpuKernelTimeout: '5m',
            gpuSustainedDuration: '10m'
        };
    }

    _updateOriginalConfig(config) {
        // Ensure originalConfig is initialized
        if (!this.originalConfig) {
            this.originalConfig = {};
        }

        // Only update if we have a valid config and originalConfig is empty
        if (config && typeof config === 'object' &&
            Object.keys(this.originalConfig).length === 0) {
            this.originalConfig = JSON.parse(JSON.stringify(config));
        }
    }

    _checkForChanges() {
        // Ensure originalConfig exists before checking
        if (!this.originalConfig || typeof this.originalConfig !== 'object' ||
            Object.keys(this.originalConfig).length === 0) {
            this.hasChanges = false;
            return;
        }
        
        const current = JSON.stringify(this.cullingConfig);
        const original = JSON.stringify(this.originalConfig);
        this.hasChanges = current !== original;
    }

    /**
     * Handle culling enabled checkbox change
     * @param {Event} e Change event from checkbox
     */
    onCullingEnabledChange(e) {
        this.set('cullingConfig.enabled', e.target.checked);
        this._checkForChanges();
    }

    /**
     * Handle GPU culling enabled checkbox change
     * @param {Event} e Change event from checkbox
     */
    onGpuCullingEnabledChange(e) {
        this.set('cullingConfig.gpuEnabled', e.target.checked);
        this._checkForChanges();
    }

    /**
     * Handle allow user exemption checkbox change
     * @param {Event} e Change event from checkbox
     */
    onAllowExemptionChange(e) {
        this.set('cullingConfig.allowUserExemption', e.target.checked);
        this._checkForChanges();
    }

    onConfigChange() {
        this._checkForChanges();
    }

    onExemptNotebooksChange(e) {
        this.exemptNotebooksText = e.target.value;
    }

    onGpuModeChange(e) {
        const selectedItem = e.detail.item;
        if (selectedItem) {
            const mode = selectedItem.getAttribute('data-value');
            this.set('cullingConfig.gpuMode', mode);
            this._checkForChanges();
        }
    }

    getHierarchyItemClass(level) {
        if (level === 'cluster') {
            return 'cluster-level';
        } else if (level === 'profile') {
            return this.cullingConfig.enabled ?
                'profile-level active' : 'profile-level inactive';
        }
        return '';
    }

    getBooleanText(value) {
        return value ? 'Yes' : 'No';
    }

    saveCullingConfig() {
        const api = this.$.UpdateCullingConfigAjax;
        api.body = this.cullingConfig;
        api.generateRequest();
    }

    resetCullingConfig() {
        if (this.originalConfig) {
            this.cullingConfig = JSON.parse(
                JSON.stringify(this.originalConfig));
            this.hasChanges = false;
        }
    }

    handleCullingConfigUpdate(e) {
        if (e.detail.error) {
            const error = this._isolateErrorFromIronRequest(e);
            this.cullingConfigError = error;
            this.$.CullingConfigError.show();
            return;
        }
        
        // Update successful
        this.originalConfig = JSON.parse(
            JSON.stringify(this.cullingConfig));
        this.hasChanges = false;
        this.$.CullingConfigSuccess.show();
    }

    onCullingConfigFetchError(e) {
        const error = this._isolateErrorFromIronRequest(e);
        this.cullingConfigFetchError = error;

        // Set default configuration if API call fails
        if (!this.cullingConfig || typeof this.cullingConfig !== 'object') {
            this.cullingConfig = this._getDefaultCullingConfig();
        }

        // Show error but don't prevent UI from rendering
        // eslint-disable-next-line no-console
        console.warn('Failed to fetch culling configuration, using defaults:',
            error);
        if (this.$ && this.$.CullingConfigFetchError) {
            this.$.CullingConfigFetchError.show();
        }
    }

    onClusterDefaultsFetchError(e) {
        const error = this._isolateErrorFromIronRequest(e);
        this.clusterDefaultsError = error;

        // Set default cluster configuration if API call fails
        if (!this.clusterDefaults || typeof this.clusterDefaults !== 'object') {
            this.clusterDefaults = {
                enabled: true,
                defaultIdleTime: '1440',
                defaultMinIdleTime: '60',
                defaultMaxIdleTime: '2880',
                allowUserExemption: true
            };
        }

        // Show error but don't prevent UI from rendering
        // eslint-disable-next-line no-console
        console.warn('Failed to fetch cluster defaults, using fallback values:',
            error);
        if (this.$ && this.$.ClusterDefaultsError) {
            this.$.ClusterDefaultsError.show();
        }
    }

    _isolateErrorFromIronRequest(e) {
        const bd = e.detail.request.response || {};
        return bd.error || e.detail.error || e.detail;
    }
}

customElements.define('manage-users-view-culling', ManageUsersViewCulling);
