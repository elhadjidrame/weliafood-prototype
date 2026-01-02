# Sprint 4 Implementation Guide — Weliafood Prototype

> **Version** : 1.0  
> **Date** : Janvier 2026  
> **Prérequis** : Sprint 1, 2, 3 validés (socle, contenus, SEO technique, RGPD)  
> **Focus** : Tracking contrôlé, Consent Mode, Validation Ads-readiness  
> **Cible** : Développeur ou LLM — Guide séquentiel et exécutable

---

## Table des matières

1. [Objectifs Sprint 4 & Definition of Done](#1-objectifs-sprint-4--definition-of-done)
2. [Rappel du cadre prototype (limites)](#2-rappel-du-cadre-prototype-limites)
3. [Architecture tracking (GTM + GA4)](#3-architecture-tracking-gtm--ga4)
4. [Consent Mode & RGPD](#4-consent-mode--rgpd)
5. [Événements implémentés](#5-événements-implémentés)
6. [Procédure de tests](#6-procédure-de-tests)
7. [Checklist Ads-readiness](#7-checklist-ads-readiness)
8. [Notes de continuité](#8-notes-de-continuité)

---

## 1. Objectifs Sprint 4 & Definition of Done

### Objectifs

Valider que le prototype est **mesurable et Ads-compatible** sans lancer de campagne :

| Objectif | Description |
|----------|-------------|
| **Tracking fonctionnel** | GTM + GA4 actifs et recevant des données |
| **Conformité RGPD** | Aucun tracking sans consentement explicite |
| **Consent Mode** | Intégration avec le bandeau cookies Sprint 3 |
| **Ads-ready** | Site acceptable par Google Ads / Meta Ads |
| **Contrôle total** | Tracking désactivable à tout moment |

### Ce que Sprint 4 n'est PAS

| ❌ Exclus | Raison |
|----------|--------|
| Création de campagnes Ads | Hors périmètre prototype |
| Budget publicitaire | Pas de diffusion |
| Trafic payant | Validation uniquement |
| Conversions e-commerce | Pas de vente réelle |
| Collecte de données exploitée | Mode test uniquement |
| Refonte UX/contenu | Sprints précédents |
| Backend/CMS | Prototype statique |

### Definition of Done Sprint 4

| Critère | Validation | Statut |
|---------|------------|--------|
| GTM conteneur publié et actif | Tag Assistant confirme le chargement | ⬜ |
| GA4 reçoit des hits | DebugView affiche page_view | ⬜ |
| Tracking bloqué sans consentement | Network vide avant acceptation | ⬜ |
| Tracking actif après consentement | Hits visibles après "Accepter" | ⬜ |
| Consent Mode implémenté | gtag consent states corrects | ⬜ |
| Événements personnalisés fonctionnels | submit_form, click_cta testés | ⬜ |
| Reset consentement fonctionne | Nouveau cycle de consentement OK | ⬜ |
| Site 100% statique | Aucun backend ajouté | ⬜ |
| GitHub Pages compatible | Déploiement OK | ⬜ |
| Documentation complète | Tout est reproductible | ⬜ |

---

## 2. Rappel du cadre prototype (limites)

### ⚠️ AVERTISSEMENTS IMPORTANTS

```
╔══════════════════════════════════════════════════════════════════╗
║                    ENVIRONNEMENT PROTOTYPE                       ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  • Ce site est un PROTOTYPE, pas un environnement de production ║
║  • Les données collectées sont INDICATIVES uniquement            ║
║  • Aucune campagne Ads ne doit être lancée à ce stade           ║
║  • Le tracking peut être DÉSACTIVÉ à tout moment                ║
║  • Aucune donnée personnelle n'est exploitée                    ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

### Périmètre technique

| Aspect | Statut |
|--------|--------|
| Hébergement | GitHub Pages (statique) |
| Backend | Aucun |
| Base de données | Aucune |
| Paiement | Non implémenté |
| Comptes utilisateurs | Non implémentés |
| E-commerce | Simulation uniquement |

### Données collectées (mode prototype)

| Type | Collecté | Exploité |
|------|----------|----------|
| Pages vues | ✅ Oui | ❌ Non (test) |
| Clics CTA | ✅ Oui | ❌ Non (test) |
| Soumissions formulaire | ✅ Oui | ❌ Non (test) |
| Données personnelles | ❌ Non | ❌ Non |
| Transactions | ❌ Non | ❌ Non |
| Données de paiement | ❌ Non | ❌ Non |

### Séparation prototype / production

Pour passer en production, il faudra :

1. Créer de nouvelles propriétés GA4/GTM dédiées
2. Supprimer les données de test
3. Configurer un domaine de production
4. Activer le tracking réel
5. Documenter le traitement des données (RGPD)

---

## 3. Architecture tracking (GTM + GA4)

### 3.1 Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────────┐
│                         UTILISATEUR                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BANDEAU COOKIES                             │
│                   (Sprint 3 - cookie-consent.js)                 │
└─────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
         [ACCEPTER]      [REFUSER]     [PERSONNALISER]
              │               │               │
              ▼               ▼               ▼
    ┌─────────────────┐ ┌───────────┐ ┌───────────────┐
    │ Consent: granted│ │ Consent:  │ │ Selon choix   │
    │ analytics: true │ │ denied    │ │               │
    │ ads: true       │ │           │ │               │
    └─────────────────┘ └───────────┘ └───────────────┘
              │               │               │
              ▼               ▼               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    GOOGLE TAG MANAGER                            │
│                     (Consent Mode v2)                            │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ SI analytics_storage = granted                           │   │
│  │    → Déclencher tag GA4                                  │   │
│  │ SINON                                                    │   │
│  │    → Tag bloqué                                          │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼ (si consentement)
┌─────────────────────────────────────────────────────────────────┐
│                     GOOGLE ANALYTICS 4                           │
│                                                                  │
│  Événements reçus :                                             │
│  • page_view (automatique)                                      │
│  • submit_form (personnalisé)                                   │
│  • click_cta (personnalisé)                                     │
│  • click_phone (personnalisé)                                   │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Création du conteneur GTM

#### Étape 1 : Créer un compte GTM

1. Aller sur https://tagmanager.google.com
2. Cliquer "Créer un compte"
3. Remplir :
   - Nom du compte : `Weliafood Prototype`
   - Pays : `France`
4. Créer un conteneur :
   - Nom : `weliafood-prototype`
   - Plateforme : `Web`
5. Accepter les conditions
6. **Noter l'ID GTM** : `GTM-XXXXXXX`

#### Étape 2 : Créer une propriété GA4

1. Aller sur https://analytics.google.com
2. Admin > Créer une propriété
3. Remplir :
   - Nom : `Weliafood Prototype`
   - Fuseau : `France`
   - Devise : `EUR`
4. Créer un flux de données Web :
   - URL : `https://[USERNAME].github.io/weliafood-prototype`
   - Nom du flux : `Weliafood GitHub Pages`
5. **Noter l'ID de mesure** : `G-XXXXXXXXXX`

### 3.3 Installation du code GTM

#### Code GTM - Head

Dans le `<head>` de **toutes les pages**, remplacer le commentaire Sprint 3 par :

```html
<!-- Google Tag Manager -->
<script>
  // Initialisation Consent Mode AVANT GTM
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  
  // État par défaut : tout refusé (RGPD)
  gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'functionality_storage': 'denied',
    'personalization_storage': 'denied',
    'security_storage': 'granted',
    'wait_for_update': 500
  });
  
  // Région France/EU - consentement requis
  gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
    'region': ['FR', 'EU']
  });
</script>

<!-- Google Tag Manager (chargement) -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- Fin Google Tag Manager -->
```

**⚠️ Remplacer `GTM-XXXXXXX` par votre ID GTM réel.**

#### Code GTM - Body

Juste après l'ouverture de `<body>` :

```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- Fin Google Tag Manager (noscript) -->
```

### 3.4 Configuration GTM

#### Tag GA4 Configuration

Dans GTM :

1. **Tags** > **Nouveau**
2. Configuration :
   - Nom : `GA4 - Configuration`
   - Type : `Google Analytics: Configuration GA4`
   - ID de mesure : `G-XXXXXXXXXX`
3. Paramètres avancés :
   - Paramètres de consentement : `Aucun consentement supplémentaire requis` (géré via Consent Mode)
4. Déclencheur : `Consent Initialization - All Pages`

#### Variables intégrées à activer

Dans GTM > Variables > Variables intégrées > Configurer :

- ✅ Page URL
- ✅ Page Path
- ✅ Page Hostname
- ✅ Page Title
- ✅ Referrer
- ✅ Click Element
- ✅ Click Classes
- ✅ Click ID
- ✅ Click Text
- ✅ Click URL
- ✅ Form Element
- ✅ Form Classes
- ✅ Form ID

---

## 4. Consent Mode & RGPD

### 4.1 Mise à jour du cookie-consent.js

Remplacer le fichier `src/scripts/cookie-consent.js` du Sprint 3 :

```javascript
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
 * Initialisation du gestionnaire de consentement
 */
export function initCookieConsent() {
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

// Auto-initialisation si DOM prêt
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCookieConsent);
} else {
  initCookieConsent();
}
```

### 4.2 Mapping Consent Mode

| Action utilisateur | analytics_storage | ad_storage | ad_user_data | ad_personalization |
|--------------------|-------------------|------------|--------------|-------------------|
| **Avant choix** | denied | denied | denied | denied |
| **Accepter tout** | granted | granted | granted | granted |
| **Refuser** | denied | denied | denied | denied |
| **Personnaliser (analytics only)** | granted | denied | denied | denied |

### 4.3 Vérification Consent Mode dans GTM

#### Variable : Consent State

Dans GTM > Variables > Nouvelle variable :

1. Nom : `Consent - Analytics Granted`
2. Type : Variable de consentement
3. Type de consentement : `analytics_storage`

#### Déclencheur conditionnel (optionnel)

Pour déclencher un tag uniquement si consentement :

1. Triggers > Nouveau
2. Type : Événement personnalisé
3. Nom de l'événement : `consent_update`
4. Condition : `consent_analytics` égal à `true`

---

## 5. Événements implémentés

### 5.1 Liste des événements (périmètre fermé)

| Événement | Description | Déclencheur | Données |
|-----------|-------------|-------------|---------|
| `page_view` | Vue de page | Automatique GA4 | page_path, page_title |
| `submit_form` | Soumission formulaire contact | Submit formulaire | form_id |
| `click_cta_quote` | Clic "Demander un devis" | Clic bouton | button_text, page_path |
| `click_phone` | Clic numéro téléphone | Clic lien tel: | phone_number |
| `click_email` | Clic email | Clic lien mailto: | email_address |

### 5.2 Implémentation JavaScript

#### Fichier : `src/scripts/tracking-events.js`

```javascript
/**
 * Tracking Events - Sprint 4
 * Événements personnalisés pour GA4 via GTM
 * 
 * PROTOTYPE UNIQUEMENT - Données indicatives
 */

/**
 * Push un événement dans le dataLayer
 */
function pushEvent(eventName, eventParams = {}) {
  window.dataLayer = window.dataLayer || [];
  
  const eventData = {
    'event': eventName,
    'event_timestamp': new Date().toISOString(),
    ...eventParams
  };
  
  window.dataLayer.push(eventData);
  console.log('Event pushed:', eventData);
}

/**
 * Tracking soumission formulaire
 */
function trackFormSubmit(formElement) {
  const formId = formElement.id || 'unknown_form';
  const formAction = formElement.action || '';
  
  pushEvent('submit_form', {
    'form_id': formId,
    'form_action': formAction,
    'page_path': window.location.pathname
  });
}

/**
 * Tracking clic CTA devis
 */
function trackCtaClick(element) {
  const buttonText = element.textContent?.trim() || '';
  const buttonHref = element.href || '';
  
  pushEvent('click_cta_quote', {
    'button_text': buttonText,
    'button_url': buttonHref,
    'page_path': window.location.pathname,
    'page_title': document.title
  });
}

/**
 * Tracking clic téléphone
 */
function trackPhoneClick(element) {
  const href = element.href || '';
  const phoneNumber = href.replace('tel:', '').trim();
  
  pushEvent('click_phone', {
    'phone_number': phoneNumber,
    'page_path': window.location.pathname
  });
}

/**
 * Tracking clic email
 */
function trackEmailClick(element) {
  const href = element.href || '';
  const email = href.replace('mailto:', '').split('?')[0].trim();
  
  pushEvent('click_email', {
    'email_address': email,
    'page_path': window.location.pathname
  });
}

/**
 * Initialisation du tracking
 */
export function initTrackingEvents() {
  // === FORMULAIRES ===
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      trackFormSubmit(form);
      // Note: le formulaire ne fonctionne pas réellement (prototype)
      // On empêche la soumission pour éviter une erreur
      e.preventDefault();
      
      // Afficher un message de confirmation
      alert('Merci pour votre message ! (Mode prototype - formulaire non fonctionnel)');
    });
  });
  
  // === BOUTONS CTA DEVIS ===
  // Sélectionner tous les boutons/liens contenant "devis"
  document.querySelectorAll('a[href*="contact"], button').forEach(element => {
    const text = element.textContent?.toLowerCase() || '';
    if (text.includes('devis') || text.includes('contact')) {
      element.addEventListener('click', () => {
        trackCtaClick(element);
      });
    }
  });
  
  // === LIENS TÉLÉPHONE ===
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
      trackPhoneClick(link);
    });
  });
  
  // === LIENS EMAIL ===
  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', () => {
      trackEmailClick(link);
    });
  });
  
  console.log('Tracking events initialized');
}
```

#### Mise à jour `main.js`

```javascript
/**
 * Main JavaScript - Sprint 4
 * Point d'entrée - initialisation des modules
 */

import { initNavigation } from './navigation.js';
import { initCookieConsent } from './cookie-consent.js';
import { initTrackingEvents } from './tracking-events.js';

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
  // Navigation
  initNavigation();
  
  // Cookie consent (initialise aussi le Consent Mode)
  initCookieConsent();
  
  // Tracking events
  initTrackingEvents();
  
  // Log de confirmation
  console.log('Weliafood prototype initialized - Sprint 4');
  console.log('Environment: PROTOTYPE (test data only)');
});
```

### 5.3 Configuration GTM — Tags événements

#### Tag : GA4 Event - Form Submit

1. **Tags** > **Nouveau**
2. Configuration :
   - Nom : `GA4 - Event - Form Submit`
   - Type : `Google Analytics: Événement GA4`
   - Tag de configuration : `GA4 - Configuration`
   - Nom de l'événement : `generate_lead` (événement recommandé GA4)
   - Paramètres d'événement :
     - `form_id` : `{{DLV - form_id}}`
3. Déclencheur : Événement personnalisé `submit_form`

#### Tag : GA4 Event - CTA Click

1. **Tags** > **Nouveau**
2. Configuration :
   - Nom : `GA4 - Event - CTA Quote Click`
   - Type : `Google Analytics: Événement GA4`
   - Tag de configuration : `GA4 - Configuration`
   - Nom de l'événement : `select_content`
   - Paramètres d'événement :
     - `content_type` : `cta`
     - `item_id` : `quote_request`
     - `button_text` : `{{DLV - button_text}}`
3. Déclencheur : Événement personnalisé `click_cta_quote`

#### Tag : GA4 Event - Phone Click

1. **Tags** > **Nouveau**
2. Configuration :
   - Nom : `GA4 - Event - Phone Click`
   - Type : `Google Analytics: Événement GA4`
   - Tag de configuration : `GA4 - Configuration`
   - Nom de l'événement : `contact`
   - Paramètres d'événement :
     - `method` : `phone`
     - `phone_number` : `{{DLV - phone_number}}`
3. Déclencheur : Événement personnalisé `click_phone`

#### Variables Data Layer nécessaires

Pour chaque paramètre utilisé, créer une variable :

| Nom variable | Type | Nom de la variable de couche de données |
|--------------|------|----------------------------------------|
| DLV - form_id | Variable de couche de données | form_id |
| DLV - button_text | Variable de couche de données | button_text |
| DLV - phone_number | Variable de couche de données | phone_number |
| DLV - email_address | Variable de couche de données | email_address |
| DLV - page_path | Variable de couche de données | page_path |

### 5.4 Ce qui n'est PAS implémenté

| Événement | Raison de l'exclusion |
|-----------|----------------------|
| `purchase` | Pas de vente réelle |
| `add_to_cart` | Pas de panier |
| `begin_checkout` | Pas de checkout |
| Conversions Ads | Pas de campagnes |
| Valeurs monétaires | Pas de transactions |
| User ID | Pas de comptes |

---

## 6. Procédure de tests

### 6.1 Outils nécessaires

| Outil | URL | Usage |
|-------|-----|-------|
| GTM Preview | tagmanager.google.com | Debug GTM |
| GA4 DebugView | analytics.google.com > Admin > DebugView | Voir les hits temps réel |
| Chrome DevTools | F12 | Network, Console |
| Tag Assistant | Chrome Extension | Vérifier les tags |

### 6.2 Test 1 : Aucun tracking sans consentement

**Objectif** : Vérifier qu'aucune donnée n'est envoyée avant acceptation des cookies.

**Étapes** :

1. Vider le localStorage du navigateur :
   ```javascript
   localStorage.clear()
   ```
2. Recharger la page
3. Ouvrir DevTools > Network
4. Filtrer par `google-analytics` ou `googletagmanager` ou `collect`
5. Vérifier le bandeau cookies est affiché

**Résultat attendu** :
- ✅ Bandeau cookies visible
- ✅ Aucune requête vers google-analytics.com/collect
- ✅ GTM chargé mais pas de hit GA4
- ✅ Console : `gtag consent default denied`

### 6.3 Test 2 : Tracking actif après acceptation

**Objectif** : Vérifier que les hits sont envoyés après consentement.

**Étapes** :

1. Depuis l'état précédent (bandeau visible)
2. Ouvrir GA4 DebugView dans un autre onglet
3. Cliquer "Accepter tout" sur le bandeau
4. Observer DevTools > Network
5. Naviguer sur une autre page

**Résultat attendu** :
- ✅ Bandeau disparaît
- ✅ Requêtes vers google-analytics.com/collect visibles
- ✅ GA4 DebugView affiche `page_view`
- ✅ Console : `Consent Mode updated: { analytics_storage: 'granted' }`
- ✅ localStorage contient `weliafood_cookie_consent`

### 6.4 Test 3 : Tracking bloqué après refus

**Objectif** : Vérifier que le refus bloque tout tracking.

**Étapes** :

1. Vider le localStorage
2. Recharger la page
3. Cliquer "Refuser" sur le bandeau
4. Naviguer sur le site
5. Vérifier DevTools > Network

**Résultat attendu** :
- ✅ Bandeau disparaît
- ✅ Aucune requête vers google-analytics.com/collect
- ✅ GA4 DebugView ne reçoit rien
- ✅ Console : `Cookies rejected - no tracking`

### 6.5 Test 4 : Événements personnalisés

**Objectif** : Vérifier que les événements sont correctement envoyés.

**Prérequis** : Cookies acceptés

**Étapes** :

1. Ouvrir GTM Preview Mode
2. Ouvrir GA4 DebugView
3. Cliquer sur un bouton "Demander un devis"
4. Cliquer sur un numéro de téléphone
5. Soumettre le formulaire contact

**Résultat attendu** :
- ✅ GTM Preview affiche les événements `click_cta_quote`, `click_phone`, `submit_form`
- ✅ GA4 DebugView affiche `select_content`, `contact`, `generate_lead`
- ✅ Paramètres corrects (form_id, button_text, phone_number)

### 6.6 Test 5 : Reset consentement

**Objectif** : Vérifier que la réinitialisation fonctionne.

**Étapes** :

1. Avoir un consentement stocké (accepté ou refusé)
2. Aller sur la page `cookies.html`
3. Cliquer "Réinitialiser mes préférences cookies"
4. Vérifier que le bandeau réapparaît
5. Naviguer et vérifier l'absence de tracking

**Résultat attendu** :
- ✅ Message de confirmation
- ✅ localStorage vidé
- ✅ Bandeau cookies réapparaît
- ✅ Aucun tracking avant nouveau choix

### 6.7 Test 6 : GTM Preview Mode complet

**Étapes** :

1. Dans GTM, cliquer "Aperçu"
2. Entrer l'URL du site
3. Le site s'ouvre avec Tag Assistant
4. Parcourir le site et déclencher des événements
5. Vérifier dans Tag Assistant :
   - Tags déclenchés
   - Variables résolues
   - Consent state

**Points de vérification** :
- ✅ Tag `GA4 - Configuration` déclenché au bon moment
- ✅ Tags événements déclenchés sur les bonnes actions
- ✅ Consent Mode affiché correctement

### 6.8 Tableau récapitulatif des tests

| Test | Scénario | Résultat attendu | Statut |
|------|----------|------------------|--------|
| T1 | Première visite | Bandeau affiché, 0 hit GA4 | ⬜ |
| T2 | Accepter cookies | Hits GA4 dans DebugView | ⬜ |
| T3 | Refuser cookies | 0 hit GA4 | ⬜ |
| T4 | Clic CTA devis | Event select_content | ⬜ |
| T5 | Clic téléphone | Event contact (phone) | ⬜ |
| T6 | Soumission form | Event generate_lead | ⬜ |
| T7 | Reset consent | Bandeau réapparaît | ⬜ |
| T8 | Persistance | Pas de bandeau au reload | ⬜ |

---

## 7. Checklist Ads-readiness

### 7.1 Conformité Landing Page (Google Ads)

| Critère | Exigence | Statut |
|---------|----------|--------|
| **Contenu** | | |
| Offre claire | Le visiteur comprend ce que propose le site | ⬜ |
| Pas de promesses trompeuses | Aucune affirmation non vérifiable | ⬜ |
| Cohérence CTA | Les boutons mènent où ils annoncent | ⬜ |
| Contenu original | Pas de contenu dupliqué | ⬜ |
| **Navigation** | | |
| Navigation fonctionnelle | Tous les liens marchent | ⬜ |
| Retour possible | L'utilisateur peut revenir en arrière | ⬜ |
| Pas de pop-up bloquants | Aucun interstitiel agressif | ⬜ |
| **Confiance** | | |
| Coordonnées visibles | Adresse, téléphone, email | ⬜ |
| Pages légales | Mentions légales, CGV, Confidentialité | ⬜ |
| Entreprise identifiable | Nom, statut juridique | ⬜ |
| **Technique** | | |
| HTTPS | Certificat SSL valide | ✅ (GitHub Pages) |
| Mobile-friendly | Responsive design | ⬜ |
| Temps de chargement | < 3 secondes | ⬜ |
| Pas de malware | Site sain | ✅ |

### 7.2 Conformité Meta Ads

| Critère | Exigence | Statut |
|---------|----------|--------|
| Politique de confidentialité | Lien accessible depuis toutes pages | ⬜ |
| Pas de contenu interdit | Pas de produits/services interdits | ⬜ |
| Landing page fonctionnelle | Page accessible, contenu visible | ⬜ |
| Correspondance annonce/page | (N/A - pas d'annonce) | ⬜ |
| Mentions légales | Présentes et accessibles | ⬜ |

### 7.3 RGPD & Consentement

| Critère | Exigence | Statut |
|---------|----------|--------|
| Bandeau cookies | Visible à la première visite | ⬜ |
| Choix clair | Accepter / Refuser équivalents | ⬜ |
| Pas de tracking pré-consentement | Aucun hit avant choix | ⬜ |
| Consentement stocké | Choix mémorisé | ⬜ |
| Retrait possible | Bouton reset accessible | ⬜ |
| Consent Mode | Implémenté correctement | ⬜ |

### 7.4 Checklist technique Ads

| Critère | Exigence | Statut |
|---------|----------|--------|
| GTM installé | Container chargé correctement | ⬜ |
| GA4 fonctionnel | Hits reçus (avec consentement) | ⬜ |
| Événements trackés | Clics, formulaires mesurés | ⬜ |
| Pas d'erreurs console | JavaScript sans erreur | ⬜ |
| Pas de mixed content | Tout en HTTPS | ⬜ |

### 7.5 Validation finale

**Questions à répondre par OUI avant de considérer le site "Ads-ready"** :

| Question | Réponse |
|----------|---------|
| Un visiteur comprend-il l'offre en 5 secondes ? | ⬜ Oui |
| Peut-on contacter l'entreprise facilement ? | ⬜ Oui |
| Les pages légales sont-elles accessibles ? | ⬜ Oui |
| Le tracking respecte-t-il le consentement ? | ⬜ Oui |
| Le site fonctionne-t-il sur mobile ? | ⬜ Oui |
| Le site est-il rapide (< 3s) ? | ⬜ Oui |
| Y a-t-il des liens cassés ? | ⬜ Non |
| Y a-t-il des erreurs JavaScript ? | ⬜ Non |
| Le Consent Mode est-il configuré ? | ⬜ Oui |

**Si toutes les réponses sont correctes** : Le site peut être déclaré **"Ads-compatible"**.

---

## 8. Notes de continuité

### 8.1 Ce qui est prêt pour la production

| Élément | Statut Sprint 4 | Action production |
|---------|-----------------|-------------------|
| GTM Container | ✅ Configuré | Créer nouveau container prod |
| GA4 Property | ✅ Test | Créer nouvelle propriété prod |
| Consent Mode | ✅ Implémenté | Conserver la logique |
| Événements | ✅ Structurés | Ajouter conversions Ads |
| Cookie Banner | ✅ Fonctionnel | Envisager solution tierce (Axeptio, etc.) |

### 8.2 À faire pour lancer des campagnes (Sprint 5+)

| Tâche | Priorité | Dépendance |
|-------|----------|------------|
| Créer propriété GA4 production | P0 | Domaine final |
| Créer container GTM production | P0 | Nouveau compte |
| Configurer conversions Google Ads | P0 | Compte Ads actif |
| Configurer Meta Pixel | P1 | Compte Meta Business |
| Définir audiences | P1 | Données suffisantes |
| Créer les premières campagnes | P2 | Budget approuvé |

### 8.3 Migration WordPress

| Élément tracking | Migration |
|------------------|-----------|
| GTM Code | Intégrer dans header.php ou plugin |
| Consent Banner | Remplacer par plugin (Complianz, CookieYes) |
| DataLayer | Adapter avec hooks WordPress |
| Événements | Adapter aux événements WooCommerce |

### 8.4 Améliorations futures

| Amélioration | Bénéfice | Complexité |
|--------------|----------|------------|
| Server-side tagging | Meilleur contrôle, moins de blocage | Élevée |
| Consent management platform (CMP) | Conformité renforcée | Moyenne |
| Enhanced conversions | Meilleur suivi Ads | Moyenne |
| User-ID tracking | Parcours cross-device | Élevée |

### 8.5 Données à supprimer avant production

Avant le passage en production, supprimer :

1. Propriété GA4 de test
2. Container GTM de test (ou le réutiliser vide)
3. Données localStorage des tests
4. Commentaires de debug dans le code

---

## Annexe A — Code complet GTM Head

```html
<!-- === TRACKING - Google Tag Manager === -->
<!-- ENVIRONMENT: PROTOTYPE - Test data only -->

<!-- Consent Mode - Initialisation AVANT GTM -->
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  
  // État par défaut : tout refusé (RGPD France/EU)
  gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'functionality_storage': 'denied',
    'personalization_storage': 'denied',
    'security_storage': 'granted',
    'wait_for_update': 500
  });
  
  // DataLayer - Informations page
  dataLayer.push({
    'environment': 'prototype',
    'pageType': 'PAGE_TYPE_HERE', // home, category, product, contact, etc.
    'pageName': document.title
  });
</script>

<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->
```

---

## Annexe B — Récapitulatif des fichiers modifiés

```
weliafood-prototype/
├── src/
│   ├── pages/
│   │   ├── index.html          # MODIFIÉ (GTM code)
│   │   ├── categorie.html      # MODIFIÉ (GTM code)
│   │   ├── produit-1.html      # MODIFIÉ (GTM code)
│   │   ├── produit-2.html      # MODIFIÉ (GTM code)
│   │   ├── produit-3.html      # MODIFIÉ (GTM code)
│   │   ├── contact.html        # MODIFIÉ (GTM code)
│   │   ├── a-propos.html       # MODIFIÉ (GTM code)
│   │   ├── mentions-legales.html # MODIFIÉ (GTM code)
│   │   ├── cgv.html            # MODIFIÉ (GTM code)
│   │   ├── confidentialite.html # MODIFIÉ (GTM code)
│   │   ├── cookies.html        # MODIFIÉ (GTM code + reset)
│   │   └── 404.html            # MODIFIÉ (GTM code)
│   └── scripts/
│       ├── main.js             # MODIFIÉ (import tracking)
│       ├── cookie-consent.js   # MODIFIÉ (Consent Mode v2)
│       └── tracking-events.js  # NOUVEAU
```

---

## Annexe C — Commandes récapitulatives

```bash
# === CRÉATION FICHIERS SPRINT 4 ===

# Nouveau fichier tracking
touch src/scripts/tracking-events.js

# === TESTS LOCAUX ===

# Lancer le serveur de dev
npm run dev

# Ouvrir la console pour voir les logs
# Tester les scénarios manuellement

# === BUILD & DEPLOY ===

# Build production
npm run build

# Preview
npm run preview

# Commit Sprint 4
git add .
git commit -m "feat(tracking): implement GTM, GA4, Consent Mode v2"
git push origin main

# === VÉRIFICATION POST-DEPLOY ===

# 1. Ouvrir le site déployé
# 2. Vider localStorage
# 3. Vérifier bandeau cookies
# 4. Tester acceptation/refus
# 5. Vérifier GA4 DebugView
```

---

**Fin du document — Sprint 4 Implementation Guide**

---

## ⚠️ Rappel final

```
╔══════════════════════════════════════════════════════════════════╗
║                         ATTENTION                                ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  Ce guide concerne un PROTOTYPE.                                ║
║                                                                  ║
║  • NE PAS lancer de campagnes Ads sur cette base               ║
║  • NE PAS exploiter les données collectées                     ║
║  • NE PAS considérer comme environnement de production         ║
║                                                                  ║
║  Le tracking est activé uniquement pour VALIDATION.             ║
║  Créer de nouveaux comptes GA4/GTM pour la production.         ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```
