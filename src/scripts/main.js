/**
 * Main JavaScript
 * Point d'entrée - initialisation des modules
 */

import { initNavigation } from './navigation.js';

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();

    console.log('Weliafood prototype initialized');
});
