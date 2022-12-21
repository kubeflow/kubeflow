import '@polymer/paper-card/paper-card.js';
import '@polymer/neon-animation/neon-animatable.js';
import localizationMixin from './localization-mixin.js';

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

import css from './landing-page.css';
import template from './landing-page.pug';
import logo from '../assets/logo.svg';

import utilitiesMixin from './utilities-mixin.js';

/**
 * Entry point for application UI.
 * Replaces registration-page
 */
// eslint-disable-next-line max-len
export class LandingPage extends utilitiesMixin(localizationMixin(PolymerElement)) {
    static get template() {
        const vars = {logo};
        return html([
            `<style>${css.toString()}</style>${template(vars)}`]);
    }
}

window.customElements.define('landing-page', LandingPage);
