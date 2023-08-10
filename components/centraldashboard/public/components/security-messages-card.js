import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-item/paper-icon-item.js';
import '@polymer/paper-ripple/paper-ripple.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-progress/paper-progress.js';
import './iframe-link.js';
import localizationMixin from './localization-mixin.js';

import {html, PolymerElement} from '@polymer/polymer';

import './card-styles.js';
import '@polymer/paper-styles/element-styles/paper-material-styles.js';

/**
 * Component to retrieve and display recently modified Jupyter Notebooks.
 */
// eslint-disable-next-line max-len
export class SecurityMessagesCard extends localizationMixin(PolymerElement) {
    static get template() {
        return html`
        <style include="paper-material-styles">
            paper-card {
                border-radius: 5px;
                background-color: aliceblue;
                margin-bottom: .75em;
            }

            .card-content {
                display: flex;
            }

            .card-icon {
                margin-right: 10px;
            }
        </style>
        <paper-card>
            <div class="card-content">
                <div class="card-icon">
                    <iron-icon icon="info"></iron-icon>
                </div>
                <div>
                    <template is="dom-if" if="[[!isMessagesList(messages)]]">
                        <template is="dom-repeat" items="[[messages]]">
                            <span>[[item]]</span>
                        </template>
                    </template>
                    <template is="dom-if" if="[[isMessagesList(messages)]]">
                        <ul>
                            <template is="dom-repeat" items="[[messages]]">
                                <li>[[item]]</li>
                            </template>
                        </ul>
                    </template>
                </div>
            </div>
        </paper-card>
        `;
    }

    static get properties() {
        return {
            messages: Array,
        };
    }

    /**
     * Check if messages is a list
     * @param {string} messages
     * @return {boolean} Is a list.
     */
    isMessagesList(messages) {
        return messages.length > 1;
    }
}

customElements.define('security-messages-card', SecurityMessagesCard);
