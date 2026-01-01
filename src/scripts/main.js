/**
 * Main JavaScript
 * Point d'entrée - initialisation des modules
 */

import { initNavigation } from './navigation.js';
import { initCookieConsent } from './cookie-consent.js';
import '../styles/components/cookie-banner.css';

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCookieConsent();

    console.log('Weliafood prototype initialized');
});
