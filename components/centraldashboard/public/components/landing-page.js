import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-media-query/iron-media-query.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/iron-a11y-keys/iron-a11y-keys.js';
import 'web-animations-js/web-animations-next.min.js';
import '@polymer/neon-animation/neon-animatable.js';
import '@polymer/neon-animation/neon-animated-pages.js';
import '@polymer/neon-animation/animations/fade-in-animation.js';
import '@polymer/neon-animation/animations/fade-out-animation.js';
// eslint-disable-next-line max-len
import {AppLocalizeBehavior} from '@polymer/app-localize-behavior/app-localize-behavior.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

import './resources/md2-input/md2-input.js';
import './resources/carousel-indicator.js';
import './resources/animated-checkmark.js';
import css from './landing-page.css';
import template from './landing-page.pug';
import logo from '../assets/logo.svg';

import utilitiesMixin from './utilities-mixin.js';

/**
 * Entry point for application UI.
 * Replaces registration-page
 */
// eslint-disable-next-line max-len
export class LandingPage extends mixinBehaviors([AppLocalizeBehavior], utilitiesMixin(PolymerElement)) {
    static get template() {
        const vars = {logo};
        return html([
            `<style>${css.toString()}</style>${template(vars)}`]);
    }

    static get properties() {
        return {
            userDetails: {type: Object, observer: '_onUserDetails'},
            namespaceName: String,
            emailAddress: String,
            error: Object,
            flowComplete: {type: Boolean, value: false},
            waitForRedirect: {type: Boolean, value: false},
            showAPIText: {type: Boolean, value: false},
        };
    }

    ready() {
        super.ready();
    }

    _onUserDetails(d) {
        this.emailAddress = this.userDetails;
        this.generateNamespace(this.userDetails);
    }

    async generateNamespace(email) {
        // Since email includes an @ , we split to the left side of it'
        const name = email.split('@', 1);
        let ns = name[0];
        ns = ns
            .replace(/[^\w]|\./g, '-')
            .replace(/^-+|-+$|_/g, '')
            .toLowerCase();

        this.getNamespaces(ns);
    }

    async getNamespaces(ns) {
        await fetch(
            `/api/namespaces/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                const namespaceNames = [];
                data.forEach((element) => {
                    namespaceNames.push(element.metadata.name);
                });
                let counter = 1;
                const originalNs = ns;
                if (namespaceNames.includes(originalNs)) {
                    while (namespaceNames.includes(originalNs + counter)) {
                        counter++;
                    }
                    ns = originalNs + counter;
                }
                this.namespaceName = ns;
            }).catch((e)=> {
                this.set('error', {response: {
                    error: e,
                    namespace: this.namespaceName,
                }});
            });
    }

    async nextPage() {
        const API = this.$.MakeNamespace;
        API.body = {namespace: this.namespaceName};
        this.waitForRedirect = true;
        await API.generateRequest().completes.catch((e) => e);
        await this.sleep(1); // So the errors and callbacks can schedule
        if (this.error && this.error.response) {
            if (this.error.response.error) {
                this.set('error', {response: {
                    error: 'registrationPage.errDuplicate',
                    namespace: this.namespaceName,
                }});
            }
            return this.waitForRedirect = false;
        }
        /*
         * Poll for profile over a span of 20 seconds (every 300ms)
         * if still not there, let the user click next again!
         */
        const success = await this.pollProfile(66, 300);
        if (success) this._successSetup();

        // Create the default notebook
        const APICreateDefault = this.$.CreateDefaultNotebook;

        await APICreateDefault.generateRequest().completes.catch((e) => e);
        await this.sleep(1); // So the errors and callbacks can schedule
        if (this.error && this.error.response) {
            if (this.error.response.error) {
                this.set('error', {response: {
                    error: 'registrationPage.errCreateNotebook',
                    namespace: this.namespaceName,
                }});
            }
            return this.waitForRedirect = false;
        }
        this.waitForRedirect = false;
    }

    async pollProfile(times, delay) {
        const profileAPI = this.$.GetMyNamespace;
        if (times < 1) throw Error('Cannot poll profile < 1 times!');
        for (let i = 0; i < times; i++) {
            const req = profileAPI.generateRequest();
            await req.completes.catch(() => 0);
            if (req.response && req.response.hasWorkgroup) return true;
            await this.sleep(delay);
        }
    }

    _successSetup() {
        this.flowComplete = true;
        this.set('error', {});
        this.fireEvent('flowcomplete');
    }
}


window.customElements.define('landing-page', LandingPage);
