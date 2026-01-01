/**
 * Cookie Consent Manager
 * Gestion du consentement RGPD
 *
 * NOTE LEGALE: Les implémentations RGPD constituent une base technique, non un avis juridique.
 *
 * Note: Ce module gère uniquement l'UI et le stockage du consentement.
 * L'activation réelle des scripts tracking sera faite en Sprint 4.
 */

const CONSENT_KEY = 'weliafood_cookie_consent';
const CONSENT_VERSION = '1.0';

// Types de cookies
const COOKIE_TYPES = {
    necessary: true,      // Toujours actif
    analytics: false,     // Google Analytics
    marketing: false,     // Google Ads, Meta Pixel
};

/**
 * Injecte le HTML du bandeau dans la page
 */
function injectBannerHTML() {
    if (document.getElementById('cookie-banner')) return;

    const bannerHTML = `
<div class="cookie-banner" id="cookie-banner" role="dialog" aria-labelledby="cookie-title" aria-describedby="cookie-description">
  <div class="cookie-banner__inner">
    <div class="cookie-banner__content">
      <h2 class="cookie-banner__title" id="cookie-title">Gestion des cookies</h2>
      <p class="cookie-banner__text" id="cookie-description">
        Nous utilisons des cookies pour améliorer votre expérience et analyser le trafic.
        En cliquant sur "Accepter", vous consentez à l'utilisation de tous les cookies.
        <a href="cookies.html">En savoir plus</a> •
        <a href="confidentialite.html">Politique de confidentialité</a>
      </p>
    </div>
    <div class="cookie-banner__actions">
      <button type="button" class="cookie-banner__btn cookie-banner__btn--accept" id="cookie-accept">
        Accepter tout
      </button>
      <button type="button" class="cookie-banner__btn cookie-banner__btn--reject" id="cookie-reject">
        Refuser
      </button>
      <button type="button" class="cookie-banner__btn cookie-banner__btn--settings" id="cookie-settings">
        Personnaliser
      </button>
    </div>
  </div>
</div>
    `;

    document.body.insertAdjacentHTML('beforeend', bannerHTML);
}


/**
 * Récupère le consentement stocké
 */
function getStoredConsent() {
    try {
        const stored = localStorage.getItem(CONSENT_KEY);
        if (stored) {
            const consent = JSON.parse(stored);
            // Vérifier la version
            if (consent.version === CONSENT_VERSION) {
                return consent;
            }
        }
    } catch (e) {
        console.warn('Cookie consent: Unable to read stored consent');
    }
    return null;
}

/**
 * Stocke le consentement
 */
function storeConsent(consent) {
    try {
        const data = {
            version: CONSENT_VERSION,
            timestamp: new Date().toISOString(),
            consent: consent,
        };
        localStorage.setItem(CONSENT_KEY, JSON.stringify(data));
    } catch (e) {
        console.warn('Cookie consent: Unable to store consent');
    }
}

/**
 * Affiche le bandeau
 */
function showBanner() {
    injectBannerHTML(); // Ensure HTML exists
    // Add CSS link if not present? ideally main.js imports it or we verify it exists.
    // Assuming style is updated in main.js or imported via JS.
    // We'll trust the main CSS imports for now, but really main.js should add the CSS link or we rely on page imports.
    // Actually, we should add the link tag if we can, but let's assume global CSS import for now via <head> or main.js.

    const banner = document.getElementById('cookie-banner');
    if (banner) {
        // Force reflow
        banner.offsetHeight;
        banner.classList.add('is-visible');
        // Focus sur le premier bouton pour accessibilité
        const firstButton = banner.querySelector('button');
        if (firstButton) {
            firstButton.focus();
        }
    }
}

/**
 * Masque le bandeau
 */
function hideBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
        banner.classList.remove('is-visible');
    }
}

/**
 * Gère l'acceptation de tous les cookies
 */
function acceptAll() {
    const consent = {
        necessary: true,
        analytics: true,
        marketing: true,
    };
    storeConsent(consent);
    hideBanner();
    applyConsent(consent);
}

/**
 * Gère le refus des cookies non essentiels
 */
function rejectAll() {
    const consent = {
        necessary: true,
        analytics: false,
        marketing: false,
    };
    storeConsent(consent);
    hideBanner();
    applyConsent(consent);
}

/**
 * Applique le consentement (charge les scripts si autorisé)
 * Note: Implémentation réelle en Sprint 4
 */
function applyConsent(consent) {
    console.log('Cookie consent applied:', consent);

    // Sprint 4: Activer GTM/GA4/Pixels selon consentement
    // if (consent.analytics) {
    //   loadGoogleAnalytics();
    // }

    // Dispatch event pour autres scripts
    window.dispatchEvent(new CustomEvent('cookieConsentUpdated', {
        detail: consent
    }));
}

/**
 * Ouvre les paramètres (placeholder)
 */
function openSettings() {
    // Pour le prototype, on accepte uniquement les essentiels
    alert('Personnalisation des cookies à venir.\n\nPour ce prototype, seuls les cookies essentiels sont utilisés.');
    rejectAll();
}

/**
 * Initialise le gestionnaire de consentement
 */
export function initCookieConsent() {
    injectBannerHTML();

    const banner = document.getElementById('cookie-banner');
    if (!banner) return;

    // Boutons
    const acceptBtn = document.getElementById('cookie-accept');
    const rejectBtn = document.getElementById('cookie-reject');
    const settingsBtn = document.getElementById('cookie-settings');

    // Event listeners
    if (acceptBtn) {
        acceptBtn.addEventListener('click', acceptAll);
    }
    if (rejectBtn) {
        rejectBtn.addEventListener('click', rejectAll);
    }
    if (settingsBtn) {
        settingsBtn.addEventListener('click', openSettings);
    }

    // Vérifier si consentement déjà donné
    const storedConsent = getStoredConsent();
    if (storedConsent) {
        // Consentement existant, appliquer sans afficher le bandeau
        applyConsent(storedConsent.consent);
    } else {
        // Pas de consentement, afficher le bandeau
        // Petit délai pour éviter le flash au chargement
        setTimeout(showBanner, 500);
    }
}

// Export pour réinitialisation (page cookies.html)
export function resetConsent() {
    localStorage.removeItem(CONSENT_KEY);
    showBanner();
}
