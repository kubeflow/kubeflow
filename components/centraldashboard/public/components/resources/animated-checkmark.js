/*
    This file defines an animated check mark.
*/

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

export class AnimatedCheckmark extends PolymerElement {
    static get template() {
        return html`<style>
            :host {
                display: block;
                width: 2em;
                height: 2em;
                --animation-curve:  var(--checkmark-animation,
                        cubic-bezier(0.650, 0.000, 0.450, 1.000));
                --fill-color: var(--checkmark-background-color,
                    var(--accent-color, #8bc34a));
            }
            svg {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                display: block;
                stroke-width: 2;
                stroke: var(--checkmark-stroke-color, white);
                stroke-miterlimit: 10;
                box-shadow: inset 0px 0px 0px var(--fill-color);
                animation: fill .4s ease-in-out .4s forwards,
                    scale .3s ease-in-out .9s both;
                transition: opacity .25s;
                opacity: 1;
            }
            .checkmark__circle {
                stroke-dasharray: 166;
                stroke-dashoffset: 166;
                stroke-width: 2;
                stroke-miterlimit: 10;
                stroke: var(--fill-color);
                fill: none;
                animation: stroke .6s var(--animation-curve) forwards;
            }

            .checkmark__check {
                transform-origin: 50% 50%;
                stroke-dasharray: 48;
                stroke-dashoffset: 48;
                animation: stroke .3s var(--animation-curve) .8s forwards;
            }

            @keyframes stroke {
                100% {
                    stroke-dashoffset: 0;
                }
            }

            @keyframes scale {
                0%, 100% {
                    transform: none;
                }
                50% {
                    transform: scale3d(1.1, 1.1, 1);
                }
            }

            @keyframes fill {
                100% {
                    box-shadow: inset 0px 0px 0px 30px var(--fill-color);
                }
            }
            [hidden] {
                opacity: 0;
            }
        </style>
        <!-- Checkmark element borrowed from https://codepen.io/haniotis/pen/KwvYLO -->
        <svg hidden$='[[!show]]' class='checkmark' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 52 52'><circle class='checkmark__circle' cx='26' cy='26' r='25' fill='none'/><path class='checkmark__check' fill='none' d='M14.1 27.2l7.1 7.2 16.7-16.8'/></svg>`;
    }

    static get properties() {
        return {
            show: {type: Boolean, value: true, reflectToAttribute: true},
        };
    }
}

window.customElements.define('animated-checkmark', AnimatedCheckmark);
