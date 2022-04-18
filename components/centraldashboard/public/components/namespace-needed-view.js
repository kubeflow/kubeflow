import {html, PolymerElement} from '@polymer/polymer';

export class NamespaceNeededView extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host {
                    background: #f1f3f4;
                    color: var(--google-grey-500);
                    font-style: italic;
                    font-size: 2em;
                    font-family: Google Sans;
                    padding: 1em;
                    text-align: center;
                    align-self: center;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                }
            </style>
            <p>Please select a <strong>namespace</strong> from the top bar</p>
        `;
    }
}

window.customElements.define('namespace-needed-view', NamespaceNeededView);
