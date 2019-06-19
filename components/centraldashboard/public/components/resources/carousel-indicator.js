/*
    This file defines the carousel indicator element.
*/

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

import utilitiesMixin from '../utilities-mixin.js';

export class CarouselIndicator extends utilitiesMixin(PolymerElement) {
    static get template() {
        return html`<style>
            :host {
                display: block;
            }
            #Wrapper {
                @apply --layout-horizontal;
                @apply --layout-center-center;
            }
            .dot {
                display: inline-block;
                width: 0;
                height:0;
                border-radius: 50%;
                padding: 5px;
                position: relative;
                color: var(--carousel-active-color, var(--accent-color));
                background: var(--carousel-inactive-color,
                    var(--google-grey-300));
                margin: .25em;
                overflow: hidden;
                cursor: pointer;
            }
            .dot:before {
                content: '';
                display: block;
                position: absolute;
                top: 50%; left: 50%;
                transform: translate(-50%,-50%);
                transition: padding .25s ease-out;
                width: 0;
                height: 0;
                padding: 0;
                border-radius: 50%;
                background: currentColor;
            }
            .dot[active]:before {
                transition: padding .25s ease-in;
                padding: 100%;
            }
        </style>
        <section id='Wrapper'>
            <template is='dom-repeat' items='[[newArr(size)]]'>
                <aside class='dot' active$='[[equals(index, selected)]]'
                    on-click='selectIndex'></aside>
            </template>
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
}

window.customElements.define('carousel-indicator', CarouselIndicator);
