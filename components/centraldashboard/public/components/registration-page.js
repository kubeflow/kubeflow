import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-media-query/iron-media-query.js';
import '@polymer/paper-card/paper-card.js';
import 'web-animations-js/web-animations-next.min.js';
import '@polymer/neon-animation/neon-animatable.js';
import '@polymer/neon-animation/neon-animated-pages.js';
import '@polymer/neon-animation/animations/fade-in-animation.js';
import '@polymer/neon-animation/animations/fade-out-animation.js';

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

import css from './registration-page.css';
import template from './registration-page.pug';
import logo from '../assets/logo.svg';

import utilitiesMixin from './utilities-mixin.js';

/**
 * Entry point for application UI.
 */
export class RegistrationPage extends utilitiesMixin(PolymerElement) {
    static get template() {
        const vars = {logo};
        return html([
            `<style>${css.toString()}</style>${template(vars)}`]);
    }

    static get properties() {
        return {
            user: String,
            page: {type: Number, value: 0},
        };
    }

    nextPage() {
        this.page++;
    }
    backPage() {
        this.page--;
    }
    finishSetup() {
        this.$.makeNamespace.generateRequest();
        this.dispatchEvent(new CustomEvent('flowcomplete'));
    }
}

window.customElements.define('registration-page', RegistrationPage);
