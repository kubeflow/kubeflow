import '@polymer/iron-input/iron-input.js';

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

import css from './md2-input.css';
import htmlContainer from './md2-input.pug';
import utilitiesMixin from '../../utilities-mixin.js';

export class Md2Input extends utilitiesMixin(PolymerElement) {
    static get template() {
        return html([
            `<style>${css.toString()}</style>${htmlContainer()}`,
        ]);
    }
    static get properties() {
        return {
            label: String,
            placeholder: String,
            error: {type: String, value: ''},
            value: {
                type: String,
                value: '',
                notify: true,
                observer: 'validateRange',
            },
            inputElement: {type: Object, notify: true, readOnly: true},
            disabled: {type: Boolean, value: false},
            hasError: {
                type: Boolean,
                notify: true,
                reflectToAttribute: true,
                computed: '_hasError(error)',
            },
            focused: {
                type: Boolean,
                value: false,
                reflectToAttribute: true,
                readOnly: true,
            },
            maxlength: {type: Number, value: -1},
            minlength: {type: Number, value: -1},
            allowedPattern: String,
        };
    }
    static get observers() {
        return [
            'validateRange(value, maxlength, minlength)',
        ];
    }
    ready() {
        super.ready();
        this.inputElement = this.$.inputElement;
    }
    _hasError(e) {
        return !!e;
    }
    inputBlurred() {
        this._setFocused(false);
    }
    inputFocused() {
        this._setFocused(true);
    }
    validateRange(e) {
        if (e && !this.$.ironInput._isPrintable(e)) {
            return true;
        }
        const len = this.value.length;
        const {minlength, maxlength} = this;
        if (minlength >= maxlength) {
            if (minlength == -1) {
                return;
            }
            // eslint-disable-next-line
            console.warn(`The length ranges provided are invalid [${minlength} < ${maxlength}]`);
            return true;
        }
        const isValid = (len > minlength || minlength == -1) &&
                            (len < maxlength || maxlength == -1);
        if (isValid) return;
        e instanceof Event && e.preventDefault();
        if (len > maxlength && maxlength != -1) {
            this.value = this.value.slice(0, maxlength);
        }
        return false;
    }
    fireEnter() {
        this.fireEvent('submit');
    }
}
window.customElements.define('md2-input', Md2Input);
