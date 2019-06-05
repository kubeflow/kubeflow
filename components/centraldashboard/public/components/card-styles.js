
import '@polymer/paper-styles/element-styles/paper-material-styles.js';

const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
<template>
    <style include="paper-material-styles">
        /* Styles shared amongst dashboard card components */
        :host {
            --dashboard-card: {
                background-color: var(--paper-card-background-color,
                    var(--primary-background-color));
                border-radius: 5px;
                display: inline-block;
                font-size: 14px;
                position: relative;
                width: 100%;
                @apply --paper-material-elevation-1;
            };

            --dashboard-card-header: {
                font-family: "Google Sans";
                height: 62px;
                border-bottom: 1px solid var(--divider-color);
                @apply --layout-horizontal;
                @apply --layout-center;
            };
        }

        paper-card {
            border-radius: 5px;
            width: 100%;
            padding-bottom: 16px;
            font-size: 14px;
            --paper-card-header-color: #202124;
            --paper-card-header: {
                @apply --dashboard-card-header;
            }
            --paper-card-header-text: {
                font-size: 16px;
                font-weight: 500;
                padding: 0 1em;
                flex: 1;
            };
            --paper-card-content: {
                font-size: 14px;
            }
        }
        paper-card {
            --paper-item-body-two-line-min-height: 2em;
        }

        paper-icon-item {
            @apply --layout-flex;
            @apply --layout-justified;
            @apply --layout-horizontal-reverse;
            font-size: 1em;
            overflow: hidden;
            --paper-item-icon-width: 40px;
            --paper-icon-item: {
                font-weight: 500;
            };
            --paper-item-icon: {
                color: var(--icon-color);
                border-radius: 50%;
            };
            --paper-item-focused-before: {
                /* Approximates the hover style since it uses opacity */
                background: var(--google-grey-700);
            };
            --paper-icon-button-ink-color: var(--accent-color);
        }

        paper-icon-item:not(.external) {
            @apply --layout-horizontal;
            justify-content: unset;
        }

        paper-icon-item.external {
            --paper-item-icon: {
                color: var(--external-icon-color);
            };
        }

        paper-ripple {
            color: var(--accent-color);
        }

        .link {
            display: block;
        }

        .link:hover, .link:active {
            background-color: var(--google-grey-100);
        }

        .link paper-icon-item {
            padding: .5em 1em;
        }

        a {
            text-decoration: none;
            color: initial;
        }

        paper-progress {
            width: 100%;
            --paper-progress-active-color: #669df6;
            --paper-progress-container-color: #f1f3f4;
        }
        #message {
            color: var(--google-grey-500);
            font-style: italic;
            font-family: Google Sans;
            padding: 0.5em 1em;
        }
    </style>
</template>
`;
styleElement.register('card-styles');
