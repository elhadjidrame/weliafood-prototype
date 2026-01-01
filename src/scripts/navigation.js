/**
 * Navigation Module
 * Gestion du menu mobile
 */

export function initNavigation() {
    const menuToggle = document.querySelector('.header__menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    if (!menuToggle || !mobileNav) return;

    menuToggle.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('is-open');
        menuToggle.setAttribute('aria-expanded', isOpen);

        // Toggle icon (optionnel)
        const icon = menuToggle.querySelector('svg');
        if (icon) {
            icon.innerHTML = isOpen
                ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>'
                : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
        }
    });

    // Fermer le menu au clic sur un lien
    const mobileNavLinks = mobileNav.querySelectorAll('.mobile-nav__link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('is-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Fermer le menu sur Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
            mobileNav.classList.remove('is-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.focus();
        }
    });
}
