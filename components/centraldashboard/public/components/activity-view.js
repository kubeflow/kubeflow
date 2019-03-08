import {PolymerElement, html} from '@polymer/polymer';

import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-progress/paper-progress.js';

export class ActivityView extends PolymerElement {
    static get template() {
        return html`
            <style is="custom-style" include="iron-flex iron-flex-alignment">
            </style>
            <style>
                :host {
                    @apply --layout-vertical;
                    --accent-color: #007dfc;
                    --primary-background-color: #003c75;
                    --sidebar-default-color: #ffffff4f;
                    --border-color: #f4f4f6;
                    background: #f1f3f4;
                    min-height: 50%;
                    padding: 1em;
                }
                paper-progress {
                    width: 100%;
                    --paper-progress-active-color: var(--accent-color)
                }
                #list {
                    overflow-y: auto;
                }
                .activity-row {
                    background: #fff;
                    border-top: 1px solid rgba(0,0,0,.12);
                    box-shadow: 0 3px 3px rgba(0,0,0,.12);
                    transition: margin .2s cubic-bezier(0.4, 0, 0.2, 1);
                    font-size: 13px;
                    padding: 5px;
                }
                .activity-row div {
                    margin: auto;
                    padding: 0 5px;
                }
                .event {
                    flex-basis: 50%;
                }
                .event-icon {
                    height: 18px;
                    width: 18px;
                    padding: 0 10px;
                }
                .event-icon.build {
                    transform: scale(-1, 1);
                    color: rgb(28, 175, 199);
                }
                .event-icon.error {
                    color: rgb(218, 66, 54);
                }
                [hidden] {
                    display: none;
                    opacity: 0;
                    pointer-events: none
                }
            </style>
            <iron-ajax id="ajax" url="/api/activities/[[namespace]]"
                handle-as="json" loading="{{loading}}"
                on-response="_onResponse">
            </iron-ajax>
            <paper-progress indeterminate class="slow"
                hidden$="[[!loading]]"></paper-progress>
            <div id="list" role="listbox">
                <template is="dom-repeat" items="[[activities]]">
                    <div class="activity-row layout horizontal">
                        <div class="flex">[[item.formattedTime]]</div>
                        <div class="flex flex-auto event layout horizontal">
                            <iron-icon class$="event-icon [[item.icon]]"
                                icon="[[item.icon]]">
                            </iron-icon>
                            <span>[[item.event]]</span>
                        </div>
                        <div class="flex">[[item.source]]</div>
                    </div>
                </template>
                <template is="dom-if" if="[[!namespace]]">
                    <div class="activity-row layout horizontal">
                        <div class="flex">
                            Select a namespace to see recent events
                        </div>
                    </div>
                </template>
                <template is="dom-if" if="[[!activities.length]]">
                    <div class="activity-row layout horizontal">
                        <div class="flex">
                            No events for [[namespace]] namespace
                        </div>
                    </div>
                </template>
            </div>
            `;
    }

    /**
     * Object describing property-related metadata used by Polymer features
     */
    static get properties() {
        return {
            namespace: {
                type: String,
                observer: '_namespaceChanged',
                value: null,
            },
            loading: {
                type: Boolean,
                value: false,
            },
            activities: Array,
        };
    }

    /**
     * Retrieves Events when namespace is selected.
     * @param {string} newNamespace
     */
    _namespaceChanged(newNamespace) {
        if (newNamespace) {
            this.$['ajax'].generateRequest();
        }
    }

    /**
     * Handles the Activities response to set date format and icon.
     * @param {Event} responseEvent
     */
    _onResponse(responseEvent) {
        const {status, response} = responseEvent.detail;
        this.activities = [];
        // TODO: Surface the error in some manner
        if (status !== 200) return;
        this.activities = response.map((a) => {
            return {
                formattedTime: new Date(a.lastTimestamp).toLocaleString(),
                event: a.message,
                icon: a.type === 'Normal' ? 'build' : 'error',
                source: a.source.host,
            };
        });
    }
}

window.customElements.define('activity-view', ActivityView);
