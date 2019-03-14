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
                    background: #f1f3f4;
                    --accent-color: #007dfc;
                    --primary-background-color: #003c75;
                    --sidebar-default-color: #ffffff4f;
                    --border-color: #f4f4f6;
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
                    box-shadow: 0 3px 3px rgba(0,0,0,.12);
                    transition: margin .2s cubic-bezier(0.4, 0, 0.2, 1);
                    font-size: 13px;
                    padding: 5px;
                    align-items: center;
                }
                .activity-row:not(:first-of-type) {
                    border-top: 1px solid rgba(0,0,0,.12);
                }
                .activity-row > .flex {padding: 0 5px}
                .activity-row > .src {color: #616161}
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
            <iron-ajax auto url="/api/activities" handle-as="json"
                loading="{{loading}}" on-response="_onResponse">
            </iron-ajax>
            <paper-progress indeterminate class="slow"
                hidden$="[[!loading]]"></paper-progress>
            <div id="list" role="listbox">
                <template is="dom-repeat" items="[[activities]]">
                    <div class="activity-row layout horizontal">
                        <div class="flex time">[[item.formattedTime]]</div>
                        <div class="flex flex-auto event">
                            <iron-icon class$="event-icon [[item.icon]]"
                                icon="[[item.icon]]">
                            </iron-icon>[[item.event]]
                        </div>
                        <div class="flex src">[[item.source]]</div>
                    </div>
                </template>
            </div>`;
    }

    /**
      * Object describing property-related metadata used by Polymer features
      */
    static get properties() {
        return {
            loading: Boolean,
            activities: Array,
        };
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
            const activity = {
                formattedTime: new Date(a.time).toLocaleString(),
                icon: a.isError ? 'error' : 'build',
            };
            return Object.assign(activity, a);
        });
    }
}

window.customElements.define('activity-view', ActivityView);
