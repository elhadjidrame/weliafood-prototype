/**
 * Cookie Consent Manager - Sprint 4
 * Gestion du consentement RGPD avec Consent Mode v2
 */

const CONSENT_KEY = 'weliafood_cookie_consent';
const CONSENT_VERSION = '1.1';

// Types de cookies et mapping Consent Mode
const CONSENT_MAPPING = {
    necessary: {
        required: true,
        consentMode: ['security_storage']
    },
    analytics: {
        required: false,
        consentMode: ['analytics_storage']
    },
    marketing: {
        required: false,
        consentMode: ['ad_storage', 'ad_user_data', 'ad_personalization']
    },
    functional: {
        required: false,
        consentMode: ['functionality_storage', 'personalization_storage']
    }
};

/**
 * Met à jour le Consent Mode de Google
 */
function updateGoogleConsent(consent) {
    if (typeof gtag !== 'function') {
        console.warn('gtag not available');
        return;
    }

    // Construire l'objet de consentement
    const consentUpdate = {
        'analytics_storage': consent.analytics ? 'granted' : 'denied',
        'ad_storage': consent.marketing ? 'granted' : 'denied',
        'ad_user_data': consent.marketing ? 'granted' : 'denied',
        'ad_personalization': consent.marketing ? 'granted' : 'denied',
        'functionality_storage': consent.functional ? 'granted' : 'denied',
        'personalization_storage': consent.functional ? 'granted' : 'denied',
    };

    // Envoyer la mise à jour
    gtag('consent', 'update', consentUpdate);

    // Log pour debug
    console.log('Consent Mode updated:', consentUpdate);

    // Push dans dataLayer pour GTM
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'consent_update',
        'consent_analytics': consent.analytics,
        'consent_marketing': consent.marketing,
        'consent_functional': consent.functional
    });
}

/**
 * Récupère le consentement stocké
 */
function getStoredConsent() {
    try {
        const stored = localStorage.getItem(CONSENT_KEY);
        if (stored) {
            const data = JSON.parse(stored);
            if (data.version === CONSENT_VERSION) {
                return data;
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
            consent: consent
        };
        localStorage.setItem(CONSENT_KEY, JSON.stringify(data));
        return true;
    } catch (e) {
        console.warn('Cookie consent: Unable to store consent');
        return false;
    }
}

/**
 * Affiche le bandeau
 */
function showBanner() {
    // Inject HTML if not present (Safety check similar to Sprint 3)
    if (!document.getElementById('cookie-banner')) {
        injectBannerHTML();
    }

    const banner = document.getElementById('cookie-banner');
    if (banner) {
        banner.classList.add('is-visible');
        banner.setAttribute('aria-hidden', 'false');

        // Focus pour accessibilité
        const firstButton = banner.querySelector('button');
        if (firstButton) {
            setTimeout(() => firstButton.focus(), 100);
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
        banner.setAttribute('aria-hidden', 'true');
    }
}

/**
 * Accepter tous les cookies
 */
function acceptAll() {
    const consent = {
        necessary: true,
        analytics: true,
        marketing: true,
        functional: true
    };

    if (storeConsent(consent)) {
        updateGoogleConsent(consent);
        hideBanner();

        // Event pour tracking
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'cookie_consent_given',
            'consent_type': 'accept_all'
        });
    }
}

/**
 * Refuser les cookies non essentiels
 */
function rejectAll() {
    const consent = {
        necessary: true,
        analytics: false,
        marketing: false,
        functional: false
    };

    if (storeConsent(consent)) {
        updateGoogleConsent(consent);
        hideBanner();

        // Pas de tracking de l'événement car refusé
        console.log('Cookies rejected - no tracking');
    }
}

/**
 * Appliquer un consentement existant
 */
function applyStoredConsent(storedData) {
    const consent = storedData.consent;
    updateGoogleConsent(consent);
    console.log('Applied stored consent:', consent);
}

/**
 * Ouvrir les paramètres (version simplifiée)
 */
function openSettings() {
    // Pour le prototype, rediriger vers la page cookies
    // ou afficher un message
    const confirmed = confirm(
        'Personnalisation des cookies :\n\n' +
        '• Cookies essentiels : toujours actifs\n' +
        '• Cookies analytics : mesure d\'audience\n' +
        '• Cookies marketing : publicités personnalisées\n\n' +
        'Cliquez OK pour accepter uniquement les essentiels,\n' +
        'ou Annuler pour revenir au bandeau.'
    );

    if (confirmed) {
        rejectAll();
    }
}

/**
 * Réinitialiser le consentement
 */
export function resetConsent() {
    localStorage.removeItem(CONSENT_KEY);

    // Réinitialiser Consent Mode à denied
    if (typeof gtag === 'function') {
        gtag('consent', 'update', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'functionality_storage': 'denied',
            'personalization_storage': 'denied'
        });
    }

    showBanner();
    console.log('Consent reset');
}

/**
 * Vérifier l'état du consentement
 */
export function getConsentState() {
    const stored = getStoredConsent();
    if (stored) {
        return stored.consent;
    }
    return null;
}

/**
 * Injecte le HTML du bandeau (Helper same as Sprint 3)
 */
function injectBannerHTML() {
    if (document.getElementById('cookie-banner')) return;

    const bannerHTML = `
<div class="cookie-banner" id="cookie-banner" role="dialog" aria-labelledby="cookie-title" aria-describedby="cookie-description" aria-hidden="true">
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
 * Initialisation du gestionnaire de consentement
 */
export function initCookieConsent() {
    // Ensure HTML is there
    injectBannerHTML();

    // Vérifier que le bandeau existe
    const banner = document.getElementById('cookie-banner');
    if (!banner) {
        console.warn('Cookie banner not found');
        return;
    }

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

    // Gestion clavier (Escape pour fermer si déjà choisi)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && banner.classList.contains('is-visible')) {
            const stored = getStoredConsent();
            if (stored) {
                hideBanner();
            }
        }
    });

    // Vérifier le consentement stocké
    const storedConsent = getStoredConsent();

    if (storedConsent) {
        // Consentement existant → appliquer
        applyStoredConsent(storedConsent);
        console.log('Existing consent applied');
    } else {
        // Pas de consentement → afficher bandeau
        // Petit délai pour éviter le flash
        setTimeout(showBanner, 300);
    }
}
