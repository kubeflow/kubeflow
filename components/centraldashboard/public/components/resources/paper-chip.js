/*
    Implements a Paper Chip element.
*/

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-icon-button/paper-icon-button.js';

import utilitiesMixin from '../utilities-mixin.js';

export class PaperChip extends utilitiesMixin(PolymerElement) {
    static get template() {
        return html`<style>
            :host {
                display: inline-block;
                border-radius: 50px;
                overflow: hidden;
                border: 1px solid var(--divider-color, black);
                margin: .25em;
            }
            paper-icon-button {
                padding: 2px;
                width: 20px;
                height: 20px;
                margin-left: .5em;
                --paper-icon-button-ink-color: var(--accent-color);
            }
            #Wrapper {
                padding: .25em .5em .25em .75em;
                @apply --layout-horizontal;
                @apply --layout-center;
            }
            .label {
                flex: 1;
            }
        </style>
        <section id='Wrapper'>
            <slot class='label' slot='label'></slot>
            <paper-icon-button class='close' icon='close'
                on-click='fireRemove'></paper-icon-button>
        </section>`;
    }

    static get properties() {
        return {
            size: {type: Number, value: 0},
            selected: {type: Number, value: 0, notify: true},
        };
    }
    newArr(size) {
        return Array(size).fill();
    }
    selectIndex(e) {
        this.selected = typeof e == 'number'?e:e.model.index;
    }
    fireRemove(e) {
        this.fireEvent('remove', e.detail);
    }
}

window.customElements.define('paper-chip', PaperChip);
