const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
<template>
    <style>
        /* Styles shared amongst dashboard card components */
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
            border-radius: 5px;
        }

        a {
            text-decoration: none;
            color: initial;
        }
    </style>
</template>
`;
styleElement.register('card-styles');
