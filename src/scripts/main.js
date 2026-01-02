/**
 * Main JavaScript
 * Point d'entrée - initialisation des modules
 */

import { initNavigation } from './navigation.js';
import { initCookieConsent } from './cookie-consent.js';
import { initTrackingEvents } from './tracking-events.js';
import '../styles/components/cookie-banner.css';

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCookieConsent();
    initTrackingEvents();

    console.log('Weliafood prototype initialized - Sprint 4');
    console.log('Environment: PROTOTYPE (test data only)');
});
