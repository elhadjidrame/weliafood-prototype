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
            // Note: Pour le prototype, on track l'intention, 
            // même si le formulaire ne part pas réellement vers un backend
            trackFormSubmit(form);

            // On empêche la soumission par défaut pour éviter un rechargement 404/post
            // sauf si c'est un formulaire qui doit fonctionner (ex: recherche)
            // Ici pour Weliafood, c'est juste le formulaire contact
            if (form.getAttribute('action') !== '#' && form.getAttribute('action')) {
                // Laissez passer si action définie
            } else {
                e.preventDefault();
                alert('Merci pour votre message ! (Mode prototype - formulaire non fonctionnel)');
            }
        });
    });

    // === BOUTONS CTA DEVIS ===
    // Sélectionner tous les boutons/liens contenant "devis"
    document.querySelectorAll('a[href*="contact"], button, .btn').forEach(element => {
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
