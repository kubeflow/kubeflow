import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-progress/paper-progress.js';

import {html, PolymerElement} from '@polymer/polymer';

export class ActivitiesList extends PolymerElement {
    static get template() {
        return html`
            <style is="custom-style" include="iron-flex iron-flex-alignment">
            </style>
            <style>
                h2 {
                    color: rgba(0,0,0,.66);
                    font-size: 12px;
                    font-weight: 400;
                    letter-spacing: normal;
                    line-height: 16px;
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
                .activity-row > .source {color: #616161}
                .event {
                    flex-basis: 50%;
                    @apply --layout-horizontal;
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
            </style>
            <template is="dom-repeat" items="[[eventsForDates]]">
                <h2>[[item.date]]</h2>
                <template is="dom-repeat" items="[[item.events]]" as="e">
                    <div class="activity-row layout horizontal">
                        <div class="flex time">[[e.time]]</div>
                        <div class="flex flex-auto event">
                            <div>
                                <iron-icon class$="event-icon [[e.icon]]"
                                    icon="[[e.icon]]">
                                </iron-icon>
                            </div>
                            <div>[[e.event]]</div>
                        </div>
                        <div class="flex source">[[e.source]]</div>
                    </div>
                </template>
            </template>
            `;
    }

    /**
     * Object describing property-related metadata used by Polymer features
     */
    static get properties() {
        return {
            activities: Array,
            eventsForDates: Array,
        };
    }

    /**
     * Array of strings describing multi-property observer methods and their
     * dependant properties
     */
    static get observers() {
        return [
            '_activitiesChanged(activities.splices)',
        ];
    }

    /**
     * Observer for activities which are Events directly from the Kubernetes
     * API. (https://kubernetes.io/docs/reference/federation/v1/definitions/#_v1_event)
     */
    _activitiesChanged() {
        const today = new Date().toLocaleDateString();
        const eventsByDate = this._getEventsByDate();

        // Sort by day, and events by time before setting eventsForDates
        const eventsForDates = [];
        const dates = Object.getOwnPropertyNames(eventsByDate);
        dates.sort((d1, d2) => new Date(d2).getTime() - new Date(d1).getTime());
        dates.forEach((d) => {
            eventsByDate[d].sort((e1, e2) => e2.sortTime - e1.sortTime);
            const eventForDay = {date: d, events: eventsByDate[d]};
            if (d === today) {
                eventForDay.date = 'Today';
            }
            eventsForDates.push(eventForDay);
        });
        this.set('eventsForDates', eventsForDates);
    }

    /**
     * Transforms this.activities into an Object whose keys are formatted day
     * strings and whose values are lists of events occuring on that day.
     * @return {Object}
     */
    _getEventsByDate() {
        const eventsByDate = {};
        this.activities.forEach((a) => {
            const date = new Date(a.lastTimestamp);
            const day = date.toLocaleDateString();
            const time = date.toLocaleTimeString();
            const activity = {
                sortTime: date.getTime(),
                time: time,
                event: a.message,
                icon: a.type === 'Normal' ? 'build' : 'error',
                source: a.source.host,
            };
            if (!(day in eventsByDate)) {
                eventsByDate[day] = [];
            }
            eventsByDate[day].push(activity);
        });
        return eventsByDate;
    }
}

window.customElements.define('activities-list', ActivitiesList);
