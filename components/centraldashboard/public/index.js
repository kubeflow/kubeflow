// Entrypoint for Webpack
import './styles.css';

// Uses Webpack specific syntax to require all favicons
// eslint-disable-next-line no-undef
require.context('./assets', false, /favicon/);

import './components/main-page.js';
