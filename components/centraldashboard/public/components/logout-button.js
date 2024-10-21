import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';

/**
 * Logout button component.
 * Triggers a GET request to the logout URL and handles post-logout redirection.
 */
export class LogoutButton extends PolymerElement {
    static get template() {
        return html`
            <a href="#" on-click="logout">
                <paper-button id="logout-button">
                    <iron-icon icon="kubeflow:logout" 
                               title="Logout">
                    </iron-icon>
                </paper-button>
            </a>
        `;
    }

    static get properties() {
        return {
            /**
             * The URL to trigger the logout process.
             */
            logoutUrl: {
                type: String,
                value: '', // Default to avoid undefined URL errors.
            },
            /**
             * The URL to redirect to after a successful logout.
             */
            afterLogoutURL: {
                type: String,
                value: '/', // Default redirect if none is provided.
            },
        };
    }

    /**
     * Handles logout by navigating to the logout URL.
     * If the backend returns an 'afterLogoutURL', the user is redirected there.
     * Otherwise, it defaults to the provided `afterLogoutURL`.
     *
     * @param {Event} event - The click event triggered by the logout link.
     */
    logout(event) {
        event.preventDefault(); // Prevent default anchor behavior.

        // Perform the logout request via a GET request.
        fetch(this.logoutUrl, {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Logout failed');
            })
            .then((data) => {
                const redirectUrl =
                    data.afterLogoutURL || this.afterLogoutURL;
                window.location.replace(redirectUrl);
            })
            .catch((error) => {
                window.location.replace(this.afterLogoutURL);
            });
    }
}

customElements.define('logout-button', LogoutButton);
