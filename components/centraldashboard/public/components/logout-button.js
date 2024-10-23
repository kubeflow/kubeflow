import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import css from './logout-button.css';

/**
 * Logout button component.
 * Triggers a GET request to the logout URL and handles post-logout redirection.
 */
export class LogoutButton extends PolymerElement {
    static get template() {
        return html([`
            <style>${css.toString()}</style>
            <a href$="{{logoutUrl}}" on-tap="logout">
                <paper-button id="logout-button">
                    <iron-icon icon="kubeflow:logout" 
                               title="Logout">
                    </iron-icon>
                </paper-button>
            </a>
        `]);
        ;
    }

    /**
     * Set current page to logoutURL.
     */
    logout() {
        window.top.location.href = this.logoutUrl;
    }
}

customElements.define('logout-button', LogoutButton);
