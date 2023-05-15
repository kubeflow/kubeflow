import localizationMixin from './localization-mixin.js';
import {html, PolymerElement} from '@polymer/polymer';

// eslint-disable-next-line max-len
export class S3ProxyView extends localizationMixin(PolymerElement) {
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
            <p>
            {{localize('s3Proxy.defaultMessage')}}
            </p>
        `;
    }
}

window.customElements.define('s3proxy-view', S3ProxyView);
