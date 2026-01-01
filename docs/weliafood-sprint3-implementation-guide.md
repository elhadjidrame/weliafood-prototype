# Sprint 3 Implementation Guide — Weliafood Prototype

> **Version** : 1.0  
> **Date** : Janvier 2026  
> **Prérequis** : Sprint 1 (socle technique) + Sprint 2 (contenus, UX, SEO on-page) validés  
> **Focus** : SEO technique, Performance, Conformité RGPD/Ads, Données structurées  
> **Cible** : Développeur ou LLM — Guide séquentiel et exécutable

---

## Table des matières

1. [Objectifs Sprint 3 & Definition of Done](#1-objectifs-sprint-3--definition-of-done)
2. [Périmètre exact (IN / OUT)](#2-périmètre-exact-in--out)
3. [SEO technique](#3-seo-technique)
4. [Données structurées (Schema.org)](#4-données-structurées-schemaorg)
5. [Performance & Core Web Vitals](#5-performance--core-web-vitals)
6. [Open Graph & Social](#6-open-graph--social)
7. [RGPD & Conformité Ads (technique)](#7-rgpd--conformité-ads-technique)
8. [Observabilité & Tracking (préparation)](#8-observabilité--tracking-préparation)
9. [Checklist finale de validation](#9-checklist-finale-de-validation)
10. [Notes de continuité vers WordPress](#10-notes-de-continuité-vers-wordpress)

---

## 1. Objectifs Sprint 3 & Definition of Done

### Objectifs

Industrialiser techniquement le prototype pour qu'il soit :

| Objectif | Description |
|----------|-------------|
| **Crawlable** | Google peut indexer correctement toutes les pages |
| **Conforme Ads** | Acceptable pour Google Ads et Meta Ads |
| **Mesurable** | Prêt pour activation tracking sans refonte |
| **Performant** | Core Web Vitals acceptables |
| **RGPD-ready** | Bandeau cookies, pas de tracking sans consentement |
| **WordPress-ready** | Base technique saine pour migration |

### Ce que Sprint 3 n'est PAS

- ❌ Pas de nouvelles pages
- ❌ Pas de nouveaux contenus éditoriaux
- ❌ Pas de campagnes Ads actives
- ❌ Pas de tracking activé (préparation uniquement)
- ❌ Pas de netlinking
- ❌ Pas d'optimisation SEO éditoriale

### Definition of Done Sprint 3

| Critère | Validation | Statut |
|---------|------------|--------|
| Sitemap.xml accessible et valide | `/sitemap.xml` retourne XML valide | ⬜ |
| Robots.txt correct | `/robots.txt` autorise crawl + lie sitemap | ⬜ |
| Canonical sur toutes les pages | Balise `<link rel="canonical">` présente | ⬜ |
| Page 404 fonctionnelle | URL inexistante affiche 404 propre | ⬜ |
| Schémas JSON-LD valides | Rich Results Test sans erreur | ⬜ |
| Lighthouse Performance ≥ 80 | Test sur page d'accueil | ⬜ |
| Lighthouse SEO ≥ 90 | Test sur page d'accueil | ⬜ |
| CLS < 0.1 | Aucun décalage de layout visible | ⬜ |
| Open Graph fonctionnel | Aperçu correct sur Facebook/LinkedIn | ⬜ |
| Bandeau cookies présent | UI affichée, cohérente avec design | ⬜ |
| Aucun tracking sans consentement | Pas de requêtes GA/GTM/Pixel au chargement | ⬜ |
| GTM conteneur prêt (non activé) | Code présent, commenté | ⬜ |

---

## 2. Périmètre exact (IN / OUT)

### IN — Inclus dans Sprint 3

| Catégorie | Éléments |
|-----------|----------|
| **SEO technique** | sitemap.xml, robots.txt, canonical, 404, meta viewport |
| **Données structurées** | Organization, WebSite, BreadcrumbList, Product |
| **Performance** | Optimisation images, CSS, JS, fonts, lazy loading |
| **Social** | Open Graph, Twitter Cards, images de partage |
| **RGPD** | Bandeau cookies (UI), liens légaux, logique consentement |
| **Tracking** | Préparation GTM/GA4 (conteneurs vides, emplacements) |

### OUT — Exclu du Sprint 3

| Élément | Raison |
|---------|--------|
| Nouvelles pages | Sprint 2 complet |
| Contenus éditoriaux | Sprint 2 complet |
| Activation tracking | Sprint 4 |
| Campagnes Ads | Sprint 4 |
| Netlinking | Hors périmètre prototype |
| Tests A/B | Hors périmètre prototype |
| PWA / Service Worker | Complexité inutile |

### Fichiers impactés

```
weliafood-prototype/
├── public/
│   ├── sitemap.xml          # NOUVEAU
│   ├── robots.txt           # NOUVEAU
│   ├── images/
│   │   └── og/              # NOUVEAU - Images Open Graph
│   │       ├── og-default.jpg
│   │       └── og-product.jpg
│   └── favicon.ico          # Vérifier présence
├── src/
│   ├── pages/
│   │   ├── 404.html         # NOUVEAU
│   │   └── *.html           # MODIFIÉ (canonical, OG, schemas)
│   ├── styles/
│   │   └── components/
│   │       └── cookie-banner.css  # NOUVEAU
│   └── scripts/
│       └── cookie-consent.js      # NOUVEAU
└── vite.config.js           # MODIFIÉ (copie fichiers statiques)
```

---

## 3. SEO technique

### 3.1 Sitemap.xml

#### Fichier à créer : `public/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Page d'accueil - Priorité maximale -->
  <url>
    <loc>https://[USERNAME].github.io/weliafood-prototype/</loc>
    <lastmod>2026-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Catégorie - Priorité haute -->
  <url>
    <loc>https://[USERNAME].github.io/weliafood-prototype/categorie.html</loc>
    <lastmod>2026-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Fiches produits - Priorité haute -->
  <url>
    <loc>https://[USERNAME].github.io/weliafood-prototype/produit-1.html</loc>
    <lastmod>2026-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://[USERNAME].github.io/weliafood-prototype/produit-2.html</loc>
    <lastmod>2026-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://[USERNAME].github.io/weliafood-prototype/produit-3.html</loc>
    <lastmod>2026-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Pages institutionnelles - Priorité moyenne -->
  <url>
    <loc>https://[USERNAME].github.io/weliafood-prototype/contact.html</loc>
    <lastmod>2026-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://[USERNAME].github.io/weliafood-prototype/a-propos.html</loc>
    <lastmod>2026-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <!-- Pages légales - Priorité basse -->
  <url>
    <loc>https://[USERNAME].github.io/weliafood-prototype/mentions-legales.html</loc>
    <lastmod>2026-01-15</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://[USERNAME].github.io/weliafood-prototype/cgv.html</loc>
    <lastmod>2026-01-15</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://[USERNAME].github.io/weliafood-prototype/confidentialite.html</loc>
    <lastmod>2026-01-15</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://[USERNAME].github.io/weliafood-prototype/cookies.html</loc>
    <lastmod>2026-01-15</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
```

**Règles** :
- Remplacer `[USERNAME]` par le nom d'utilisateur GitHub réel
- `lastmod` : date de dernière modification réelle
- Pages 404 NON incluses
- Template produit (`produit.html`) NON inclus (seuls les produits réels)

---

### 3.2 Robots.txt

#### Fichier à créer : `public/robots.txt`

```
# Robots.txt pour Weliafood Prototype
# https://[USERNAME].github.io/weliafood-prototype/

User-agent: *
Allow: /

# Sitemap
Sitemap: https://[USERNAME].github.io/weliafood-prototype/sitemap.xml

# Bloquer les ressources non pertinentes (optionnel)
Disallow: /assets/
```

**Notes** :
- `Allow: /` autorise le crawl de tout le site
- Le sitemap est lié explicitement
- Adapter l'URL au déploiement réel

---

### 3.3 Balises Canonical

Ajouter sur **chaque page HTML**, dans le `<head>` :

```html
<link rel="canonical" href="https://[USERNAME].github.io/weliafood-prototype/[PAGE].html">
```

#### Mapping complet

| Page | URL Canonical |
|------|---------------|
| index.html | `https://[USERNAME].github.io/weliafood-prototype/` |
| categorie.html | `https://[USERNAME].github.io/weliafood-prototype/categorie.html` |
| produit-1.html | `https://[USERNAME].github.io/weliafood-prototype/produit-1.html` |
| produit-2.html | `https://[USERNAME].github.io/weliafood-prototype/produit-2.html` |
| produit-3.html | `https://[USERNAME].github.io/weliafood-prototype/produit-3.html` |
| contact.html | `https://[USERNAME].github.io/weliafood-prototype/contact.html` |
| a-propos.html | `https://[USERNAME].github.io/weliafood-prototype/a-propos.html` |
| mentions-legales.html | `https://[USERNAME].github.io/weliafood-prototype/mentions-legales.html` |
| cgv.html | `https://[USERNAME].github.io/weliafood-prototype/cgv.html` |
| confidentialite.html | `https://[USERNAME].github.io/weliafood-prototype/confidentialite.html` |
| cookies.html | `https://[USERNAME].github.io/weliafood-prototype/cookies.html` |
| 404.html | **PAS de canonical** (page d'erreur) |

**Exemple d'implémentation dans index.html** :

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="canonical" href="https://[USERNAME].github.io/weliafood-prototype/">
  <!-- ... autres balises ... -->
</head>
```

---

### 3.4 Page 404

#### Fichier à créer : `src/pages/404.html`

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <title>Page non trouvée - Weliafood</title>
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
  
  <!-- Styles -->
  <link rel="stylesheet" href="../styles/tokens.css">
  <link rel="stylesheet" href="../styles/reset.css">
  <link rel="stylesheet" href="../styles/base.css">
  <link rel="stylesheet" href="../styles/layout.css">
  <link rel="stylesheet" href="../styles/components/buttons.css">
  
  <style>
    .error-page {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 60vh;
      text-align: center;
      padding: var(--space-8);
    }
    
    .error-page__code {
      font-size: var(--font-size-6xl);
      font-weight: var(--font-weight-bold);
      color: var(--color-primary-500);
      line-height: 1;
      margin-bottom: var(--space-4);
    }
    
    .error-page__title {
      font-size: var(--font-size-2xl);
      margin-bottom: var(--space-4);
    }
    
    .error-page__description {
      color: var(--color-text-secondary);
      margin-bottom: var(--space-8);
      max-width: 480px;
    }
    
    .error-page__actions {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-4);
      justify-content: center;
    }
  </style>
</head>
<body>
  <div class="page">
    <!-- Header simplifié -->
    <header class="header">
      <div class="container header__inner">
        <a href="index.html" class="header__logo">
          <img src="/images/logo.svg" alt="Weliafood" width="40" height="40">
          <span>Weliafood</span>
        </a>
        <div class="header__actions">
          <a href="contact.html" class="btn btn--primary btn--sm">Nous contacter</a>
        </div>
      </div>
    </header>

    <!-- Contenu 404 -->
    <main class="main">
      <div class="container">
        <div class="error-page">
          <div class="error-page__code">404</div>
          <h1 class="error-page__title">Page non trouvée</h1>
          <p class="error-page__description">
            La page que vous recherchez n'existe pas ou a été déplacée. 
            Pas d'inquiétude, vous pouvez retrouver nos produits et informations 
            depuis les liens ci-dessous.
          </p>
          <div class="error-page__actions">
            <a href="index.html" class="btn btn--primary">Retour à l'accueil</a>
            <a href="categorie.html" class="btn btn--secondary">Voir nos produits</a>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer simplifié -->
    <footer class="footer">
      <div class="container">
        <div class="footer__bottom">
          <p class="footer__copyright">© 2026 Weliafood. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  </div>
</body>
</html>
```

**Configuration GitHub Pages pour 404** :

GitHub Pages utilise automatiquement `404.html` à la racine. S'assurer que Vite copie ce fichier dans `dist/`.

#### Mise à jour `vite.config.js`

```javascript
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src/pages',
  base: '/weliafood-prototype/',
  publicDir: '../../public',
  build: {
    outDir: '../../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/pages/index.html'),
        categorie: resolve(__dirname, 'src/pages/categorie.html'),
        produit: resolve(__dirname, 'src/pages/produit.html'),
        produit1: resolve(__dirname, 'src/pages/produit-1.html'),
        produit2: resolve(__dirname, 'src/pages/produit-2.html'),
        produit3: resolve(__dirname, 'src/pages/produit-3.html'),
        contact: resolve(__dirname, 'src/pages/contact.html'),
        apropos: resolve(__dirname, 'src/pages/a-propos.html'),
        mentionsLegales: resolve(__dirname, 'src/pages/mentions-legales.html'),
        cgv: resolve(__dirname, 'src/pages/cgv.html'),
        confidentialite: resolve(__dirname, 'src/pages/confidentialite.html'),
        cookies: resolve(__dirname, 'src/pages/cookies.html'),
        notFound: resolve(__dirname, 'src/pages/404.html'), // AJOUT
      },
    },
  },
  server: {
    open: true,
  },
});
```

---

### 3.5 Meta Viewport (vérification)

S'assurer que **toutes les pages** ont :

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Cette balise doit être présente dans le `<head>` de chaque fichier HTML.

---

### 3.6 Structure d'URL (vérification)

| Règle | Application |
|-------|-------------|
| Kebab-case | `produit-1.html`, pas `Produit1.html` |
| Minuscules | `a-propos.html`, pas `A-Propos.html` |
| Extension .html | Requis pour GitHub Pages statique |
| Pas de trailing slash | `page.html`, pas `page.html/` |
| Pas de caractères spéciaux | Pas d'accents, espaces, underscores |

---

## 4. Données structurées (Schema.org)

### 4.1 Vue d'ensemble

| Schema | Pages | Objectif |
|--------|-------|----------|
| Organization | Toutes (via header) | Identifier l'entreprise |
| WebSite | Accueil uniquement | Identifier le site |
| BreadcrumbList | Toutes sauf accueil | Navigation structurée |
| Product | Fiches produits | Rich snippets produits |

### 4.2 Schema Organization (toutes les pages)

Ajouter dans le `<head>` de **chaque page** :

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Weliafood",
  "url": "https://[USERNAME].github.io/weliafood-prototype/",
  "logo": "https://[USERNAME].github.io/weliafood-prototype/images/logo.svg",
  "description": "Grossiste alimentaire pour professionnels de la restauration. Épicerie fine, huiles, vinaigres, pâtes artisanales.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Rue du Commerce",
    "addressLocality": "Paris",
    "postalCode": "75001",
    "addressCountry": "FR"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+33-1-00-00-00-00",
    "contactType": "customer service",
    "availableLanguage": "French"
  },
  "sameAs": []
}
</script>
```

**Alternative LocalBusiness** (si pertinent) :

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Weliafood",
  "image": "https://[USERNAME].github.io/weliafood-prototype/images/logo.svg",
  "url": "https://[USERNAME].github.io/weliafood-prototype/",
  "telephone": "+33-1-00-00-00-00",
  "email": "contact@weliafood.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Rue du Commerce",
    "addressLocality": "Paris",
    "postalCode": "75001",
    "addressCountry": "FR"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "$$"
}
</script>
```

---

### 4.3 Schema WebSite (accueil uniquement)

Ajouter dans le `<head>` de `index.html` (en plus de Organization) :

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Weliafood",
  "url": "https://[USERNAME].github.io/weliafood-prototype/",
  "description": "Grossiste alimentaire pour professionnels de la restauration",
  "publisher": {
    "@type": "Organization",
    "name": "Weliafood"
  }
}
</script>
```

---

### 4.4 Schema BreadcrumbList

Ajouter sur **toutes les pages sauf accueil** :

#### Exemple pour `categorie.html`

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil",
      "item": "https://[USERNAME].github.io/weliafood-prototype/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Épicerie Fine",
      "item": "https://[USERNAME].github.io/weliafood-prototype/categorie.html"
    }
  ]
}
</script>
```

#### Exemple pour `produit-1.html`

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil",
      "item": "https://[USERNAME].github.io/weliafood-prototype/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Épicerie Fine",
      "item": "https://[USERNAME].github.io/weliafood-prototype/categorie.html"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Huile d'Olive Extra Vierge Premium",
      "item": "https://[USERNAME].github.io/weliafood-prototype/produit-1.html"
    }
  ]
}
</script>
```

#### Mapping complet BreadcrumbList

| Page | Fil d'Ariane |
|------|--------------|
| categorie.html | Accueil > Épicerie Fine |
| produit-1.html | Accueil > Épicerie Fine > Huile d'Olive Extra Vierge Premium |
| produit-2.html | Accueil > Épicerie Fine > Vinaigre Balsamique de Modène IGP |
| produit-3.html | Accueil > Épicerie Fine > Pâtes Artisanales Penne Rigate |
| contact.html | Accueil > Contact |
| a-propos.html | Accueil > À propos |
| mentions-legales.html | Accueil > Mentions légales |
| cgv.html | Accueil > CGV |
| confidentialite.html | Accueil > Politique de confidentialité |
| cookies.html | Accueil > Gestion des cookies |

---

### 4.5 Schema Product (fiches produits)

Ajouter sur **chaque fiche produit** :

#### `produit-1.html` — Huile d'Olive

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Huile d'Olive Extra Vierge Premium — Italie",
  "description": "Huile d'olive italienne de première pression à froid. Fruité vert intense, idéale pour assaisonnements et finitions. Origine Pouilles.",
  "image": "https://[USERNAME].github.io/weliafood-prototype/images/products/product-1.jpg",
  "brand": {
    "@type": "Brand",
    "name": "Weliafood"
  },
  "category": "Huiles & Vinaigres",
  "countryOfOrigin": {
    "@type": "Country",
    "name": "Italie"
  },
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "EUR",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "priceCurrency": "EUR",
      "valueAddedTaxIncluded": false
    },
    "seller": {
      "@type": "Organization",
      "name": "Weliafood"
    }
  }
}
</script>
```

**Note importante** : On NE spécifie PAS de prix exact (`price`) car c'est "sur devis". On indique seulement la disponibilité et la devise.

#### `produit-2.html` — Vinaigre Balsamique

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Vinaigre Balsamique de Modène IGP — Vieilli 3 ans",
  "description": "Vinaigre balsamique traditionnel de Modène IGP, vieilli 3 ans en fûts de chêne. Équilibre parfait entre douceur et acidité.",
  "image": "https://[USERNAME].github.io/weliafood-prototype/images/products/product-2.jpg",
  "brand": {
    "@type": "Brand",
    "name": "Weliafood"
  },
  "category": "Huiles & Vinaigres",
  "countryOfOrigin": {
    "@type": "Country",
    "name": "Italie"
  },
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "EUR",
    "seller": {
      "@type": "Organization",
      "name": "Weliafood"
    }
  }
}
</script>
```

#### `produit-3.html` — Pâtes Artisanales

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Pâtes Artisanales Italiennes — Penne Rigate Bronze",
  "description": "Pâtes sèches artisanales tréfilées au bronze. Semoule de blé dur italien, séchage lent 48h. Texture rugueuse idéale pour accrocher les sauces.",
  "image": "https://[USERNAME].github.io/weliafood-prototype/images/products/product-3.jpg",
  "brand": {
    "@type": "Brand",
    "name": "Weliafood"
  },
  "category": "Pâtes & Riz",
  "countryOfOrigin": {
    "@type": "Country",
    "name": "Italie"
  },
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "EUR",
    "seller": {
      "@type": "Organization",
      "name": "Weliafood"
    }
  }
}
</script>
```

---

### 4.6 Validation des schemas

**Outils de test** :

| Outil | URL | Usage |
|-------|-----|-------|
| Rich Results Test | https://search.google.com/test/rich-results | Test officiel Google |
| Schema Markup Validator | https://validator.schema.org/ | Validation technique |

**Checklist validation** :

| Schema | Test | Statut |
|--------|------|--------|
| Organization | Pas d'erreurs, pas d'avertissements critiques | ⬜ |
| WebSite | Pas d'erreurs | ⬜ |
| BreadcrumbList | Chemin logique validé | ⬜ |
| Product (×3) | Pas d'erreurs, champs requis présents | ⬜ |

---

## 5. Performance & Core Web Vitals

### 5.1 Objectifs Core Web Vitals

| Métrique | Cible MVP | Excellent |
|----------|-----------|-----------|
| **LCP** (Largest Contentful Paint) | < 2.5s | < 1.5s |
| **CLS** (Cumulative Layout Shift) | < 0.1 | < 0.05 |
| **INP** (Interaction to Next Paint) | < 200ms | < 100ms |

### 5.2 Optimisation des images

#### Formats recommandés

| Usage | Format | Fallback |
|-------|--------|----------|
| Photos produits | WebP | JPEG |
| Logo, icônes | SVG | PNG |
| Images OG | JPEG | - |

#### Dimensions recommandées

| Image | Dimensions | Poids max |
|-------|------------|-----------|
| Hero accueil | 1200×600 | 150 KB |
| Photo produit | 800×800 | 100 KB |
| Card produit | 400×300 | 50 KB |
| Logo | 200×200 | 10 KB |
| Image OG | 1200×630 | 100 KB |

#### Attributs obligatoires

```html
<!-- Image avec dimensions explicites (évite CLS) -->
<img 
  src="/images/products/product-1.jpg" 
  alt="Huile d'olive extra vierge premium"
  width="400"
  height="300"
  loading="lazy"
>

<!-- Image hero (pas de lazy loading) -->
<img 
  src="/images/hero.jpg" 
  alt="Gamme de produits Weliafood"
  width="1200"
  height="600"
  fetchpriority="high"
>
```

**Règles** :
- `width` et `height` explicites sur TOUTES les images
- `loading="lazy"` sur images hors viewport initial
- `fetchpriority="high"` sur image LCP (hero)
- `alt` descriptif sur toutes les images

#### Conversion WebP (script bash)

```bash
# Installer cwebp si nécessaire
# macOS: brew install webp
# Ubuntu: apt install webp

# Convertir toutes les images JPEG en WebP
for file in public/images/**/*.jpg; do
  cwebp -q 80 "$file" -o "${file%.jpg}.webp"
done

for file in public/images/**/*.png; do
  cwebp -q 80 "$file" -o "${file%.png}.webp"
done
```

#### Utilisation avec fallback

```html
<picture>
  <source srcset="/images/products/product-1.webp" type="image/webp">
  <img 
    src="/images/products/product-1.jpg" 
    alt="Huile d'olive extra vierge premium"
    width="400"
    height="300"
    loading="lazy"
  >
</picture>
```

---

### 5.3 Optimisation CSS

#### Ordre de chargement

```html
<head>
  <!-- CSS critique (inline ou premier fichier) -->
  <link rel="stylesheet" href="../styles/tokens.css">
  <link rel="stylesheet" href="../styles/reset.css">
  <link rel="stylesheet" href="../styles/base.css">
  <link rel="stylesheet" href="../styles/layout.css">
  
  <!-- CSS composants (peuvent être différés) -->
  <link rel="stylesheet" href="../styles/components/buttons.css">
  <link rel="stylesheet" href="../styles/components/cards.css">
  <!-- ... -->
</head>
```

#### Suppression CSS inutilisé

Pour le prototype, s'assurer que chaque fichier CSS chargé est utilisé sur la page.

**Vérification** :
```bash
# Avec Chrome DevTools
# 1. Ouvrir DevTools (F12)
# 2. Onglet "Coverage" (Ctrl+Shift+P > "Coverage")
# 3. Recharger la page
# 4. Analyser le CSS non utilisé
```

---

### 5.4 Optimisation JavaScript

#### Attributs de chargement

```html
<!-- Script principal (après le DOM) -->
<script type="module" src="../scripts/main.js"></script>

<!-- Scripts tiers (différés) -->
<script defer src="https://example.com/analytics.js"></script>

<!-- Scripts non critiques (async) -->
<script async src="https://example.com/widget.js"></script>
```

**Règles** :
- `type="module"` : différé par défaut
- `defer` : exécution après parsing HTML
- `async` : exécution dès chargé (ordre non garanti)

#### JS minimal

Le prototype ne doit charger que :
- `main.js` : initialisation
- `navigation.js` : menu mobile
- `cookie-consent.js` : bandeau cookies (Sprint 3)

**Pas de** :
- jQuery
- Framework JS lourd
- Bibliothèques analytics (pas encore)

---

### 5.5 Optimisation Fonts

#### Preload fonts critiques

```html
<head>
  <!-- Preload fonts critiques -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- Preload font display (héros) -->
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&display=swap">
  
  <!-- Charger les fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
</head>
```

#### font-display: swap

Déjà inclus via `&display=swap` dans l'URL Google Fonts.

Effet : le texte s'affiche immédiatement avec une font système, puis bascule vers la font chargée.

---

### 5.6 Checklist Performance

| Critère | Action | Statut |
|---------|--------|--------|
| **Images** | | |
| Toutes les images ont width/height | Vérifier HTML | ⬜ |
| Images hors viewport ont loading="lazy" | Vérifier HTML | ⬜ |
| Image hero a fetchpriority="high" | Vérifier index.html | ⬜ |
| Images < 100KB chacune | Vérifier poids | ⬜ |
| WebP disponible | Convertir si possible | ⬜ |
| **CSS** | | |
| Ordre de chargement logique | tokens > reset > base > layout > components | ⬜ |
| Pas de CSS bloquant inutile | Vérifier Coverage | ⬜ |
| **JS** | | |
| Scripts en bas ou defer/module | Vérifier HTML | ⬜ |
| JS minimal (< 50KB total) | Vérifier bundle | ⬜ |
| **Fonts** | | |
| Preconnect Google Fonts | Vérifier head | ⬜ |
| display=swap utilisé | Vérifier URL | ⬜ |

---

## 6. Open Graph & Social

### 6.1 Balises Open Graph

Ajouter dans le `<head>` de **chaque page** :

#### Template générique

```html
<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="Weliafood">
<meta property="og:locale" content="fr_FR">
<meta property="og:title" content="[TITLE DE LA PAGE]">
<meta property="og:description" content="[META DESCRIPTION]">
<meta property="og:url" content="[URL CANONICAL]">
<meta property="og:image" content="https://[USERNAME].github.io/weliafood-prototype/images/og/og-default.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Weliafood - Grossiste alimentaire pour professionnels">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="[TITLE DE LA PAGE]">
<meta name="twitter:description" content="[META DESCRIPTION]">
<meta name="twitter:image" content="https://[USERNAME].github.io/weliafood-prototype/images/og/og-default.jpg">
```

### 6.2 Mapping par page

| Page | og:title | og:image |
|------|----------|----------|
| index.html | Weliafood \| Grossiste Alimentaire Professionnel | og-default.jpg |
| categorie.html | Épicerie Fine Pro - Weliafood | og-default.jpg |
| produit-1.html | Huile d'Olive Extra Vierge Premium - Weliafood | og-product.jpg ou product-1.jpg |
| produit-2.html | Vinaigre Balsamique de Modène IGP - Weliafood | og-product.jpg ou product-2.jpg |
| produit-3.html | Pâtes Artisanales Penne Rigate - Weliafood | og-product.jpg ou product-3.jpg |
| contact.html | Contact & Devis - Weliafood | og-default.jpg |
| a-propos.html | À Propos - Weliafood | og-default.jpg |

### 6.3 Images Open Graph

#### Spécifications

| Propriété | Valeur |
|-----------|--------|
| Dimensions | 1200 × 630 px |
| Format | JPEG (meilleure compatibilité) |
| Poids | < 100 KB |
| Contenu | Logo + baseline + visuel produits |

#### Fichiers à créer

```
public/images/og/
├── og-default.jpg    # Image générique (accueil, pages institutionnelles)
└── og-product.jpg    # Image produits (optionnel, sinon utiliser photos produits)
```

#### Exemple de design og-default.jpg

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│                    [LOGO WELIAFOOD]                        │
│                                                            │
│              Grossiste Alimentaire                         │
│            pour Professionnels                             │
│                                                            │
│     Huiles • Vinaigres • Pâtes • Épicerie Fine            │
│                                                            │
│              weliafood.com                                 │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### 6.4 Test Open Graph

**Outils** :

| Outil | URL |
|-------|-----|
| Facebook Sharing Debugger | https://developers.facebook.com/tools/debug/ |
| LinkedIn Post Inspector | https://www.linkedin.com/post-inspector/ |
| Twitter Card Validator | https://cards-dev.twitter.com/validator |

---

## 7. RGPD & Conformité Ads (technique)

### 7.1 Bandeau Cookies — Structure

#### Fichier CSS : `src/styles/components/cookie-banner.css`

```css
/**
 * COOKIE BANNER
 * Bandeau de consentement RGPD
 */

.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: var(--z-modal);
  background-color: var(--color-neutral-900);
  color: var(--color-neutral-100);
  padding: var(--space-6);
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
  transform: translateY(100%);
  transition: transform var(--transition-slow);
}

.cookie-banner.is-visible {
  transform: translateY(0);
}

.cookie-banner__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

@media (min-width: 768px) {
  .cookie-banner__inner {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.cookie-banner__content {
  flex: 1;
}

.cookie-banner__title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--space-2);
  color: var(--color-neutral-0);
}

.cookie-banner__text {
  font-size: var(--font-size-sm);
  color: var(--color-neutral-300);
  line-height: var(--line-height-relaxed);
}

.cookie-banner__text a {
  color: var(--color-primary-400);
  text-decoration: underline;
}

.cookie-banner__text a:hover {
  color: var(--color-primary-300);
}

.cookie-banner__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.cookie-banner__btn {
  padding: var(--space-3) var(--space-5);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.cookie-banner__btn--accept {
  background-color: var(--color-primary-500);
  color: var(--color-neutral-0);
  border: none;
}

.cookie-banner__btn--accept:hover {
  background-color: var(--color-primary-600);
}

.cookie-banner__btn--reject {
  background-color: transparent;
  color: var(--color-neutral-100);
  border: 1px solid var(--color-neutral-600);
}

.cookie-banner__btn--reject:hover {
  background-color: var(--color-neutral-800);
  border-color: var(--color-neutral-500);
}

.cookie-banner__btn--settings {
  background-color: transparent;
  color: var(--color-neutral-400);
  border: none;
  text-decoration: underline;
  padding: var(--space-2);
}

.cookie-banner__btn--settings:hover {
  color: var(--color-neutral-200);
}
```

#### HTML du bandeau (à ajouter avant `</body>`)

```html
<!-- Cookie Banner -->
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
```

### 7.2 JavaScript Consentement

#### Fichier : `src/scripts/cookie-consent.js`

```javascript
/**
 * Cookie Consent Manager
 * Gestion du consentement RGPD
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
  const banner = document.getElementById('cookie-banner');
  if (banner) {
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
  // if (consent.marketing) {
  //   loadGoogleAds();
  //   loadMetaPixel();
  // }
  
  // Dispatch event pour autres scripts
  window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { 
    detail: consent 
  }));
}

/**
 * Ouvre les paramètres (placeholder)
 * Note: Modal de personnalisation à implémenter si besoin
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
```

#### Mise à jour `main.js`

```javascript
/**
 * Main JavaScript
 * Point d'entrée - initialisation des modules
 */

import { initNavigation } from './navigation.js';
import { initCookieConsent } from './cookie-consent.js';

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initCookieConsent();
  
  console.log('Weliafood prototype initialized');
});
```

### 7.3 Liens légaux vérification

S'assurer que **toutes les pages** ont dans le footer :

```html
<ul class="footer__list">
  <li><a href="mentions-legales.html" class="footer__link">Mentions légales</a></li>
  <li><a href="cgv.html" class="footer__link">CGV</a></li>
  <li><a href="confidentialite.html" class="footer__link">Politique de confidentialité</a></li>
  <li><a href="cookies.html" class="footer__link">Gestion des cookies</a></li>
</ul>
```

### 7.4 Page Cookies — Bouton reset

Ajouter sur `cookies.html` un bouton pour réinitialiser le consentement :

```html
<section class="cookie-reset">
  <h2>Modifier vos préférences</h2>
  <p>Vous pouvez à tout moment modifier vos choix de cookies.</p>
  <button type="button" class="btn btn--secondary" id="reset-cookies">
    Réinitialiser mes préférences cookies
  </button>
</section>

<script type="module">
  import { resetConsent } from '../scripts/cookie-consent.js';
  
  document.getElementById('reset-cookies')?.addEventListener('click', () => {
    resetConsent();
    alert('Vos préférences ont été réinitialisées. Le bandeau de consentement va réapparaître.');
  });
</script>
```

### 7.5 Vérification : Aucun tracking sans consentement

**Test manuel** :

1. Vider le localStorage (`localStorage.clear()`)
2. Recharger la page
3. Ouvrir DevTools > Network
4. Vérifier qu'AUCUNE requête vers :
   - google-analytics.com
   - googletagmanager.com
   - googleadservices.com
   - facebook.com/tr
   - connect.facebook.net

**Résultat attendu** : Aucune requête tracking avant consentement.

---

## 8. Observabilité & Tracking (préparation)

### 8.1 Google Tag Manager — Conteneur vide

#### Code GTM à préparer (NON activé)

```html
<!-- Google Tag Manager - HEAD -->
<!-- SPRINT 4: Décommenter après configuration GTM -->
<!--
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
-->

<!-- Google Tag Manager - BODY (juste après <body>) -->
<!-- SPRINT 4: Décommenter après configuration GTM -->
<!--
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
-->
```

**Note** : Remplacer `GTM-XXXXXXX` par l'ID réel lors de l'activation en Sprint 4.

### 8.2 DataLayer — Structure préparée

```html
<script>
  // DataLayer pour GTM (Sprint 4)
  window.dataLayer = window.dataLayer || [];
  
  // Informations page (à remplir dynamiquement)
  window.dataLayer.push({
    'pageType': 'home', // home, category, product, contact, about, legal
    'pageName': 'Accueil',
    // Pour les pages produit:
    // 'productName': 'Huile d\'Olive Extra Vierge Premium',
    // 'productCategory': 'Huiles & Vinaigres',
    // 'productId': 'produit-1',
  });
</script>
```

### 8.3 Événements à documenter (Sprint 4)

| Événement | Trigger | Données |
|-----------|---------|---------|
| `form_submit` | Soumission formulaire contact | form_type: "contact" |
| `click_phone` | Clic sur numéro de téléphone | phone_number |
| `click_cta_quote` | Clic sur "Demander un devis" | page, position |
| `click_product` | Clic sur card produit | product_name, product_id |
| `page_view` | Chargement page | page_path, page_title |

### 8.4 Emplacements scripts

**Structure recommandée dans `<head>`** :

```html
<head>
  <!-- 1. Metas essentielles -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- 2. SEO -->
  <title>...</title>
  <meta name="description" content="...">
  <link rel="canonical" href="...">
  
  <!-- 3. Open Graph -->
  <meta property="og:...">
  
  <!-- 4. Preconnect & Fonts -->
  <link rel="preconnect" href="...">
  
  <!-- 5. CSS -->
  <link rel="stylesheet" href="...">
  
  <!-- 6. GTM Head (Sprint 4) -->
  <!-- [GTM HEAD CODE] -->
  
  <!-- 7. DataLayer -->
  <script>window.dataLayer = window.dataLayer || [];</script>
  
  <!-- 8. Schemas JSON-LD -->
  <script type="application/ld+json">...</script>
</head>
<body>
  <!-- 9. GTM Body (Sprint 4) -->
  <!-- [GTM BODY CODE] -->
  
  <!-- ... contenu ... -->
  
  <!-- 10. Scripts applicatifs -->
  <script type="module" src="..."></script>
</body>
```

### 8.5 Checklist préparation tracking

| Élément | Statut | Activation |
|---------|--------|------------|
| Emplacement GTM head | ⬜ Commenté | Sprint 4 |
| Emplacement GTM body | ⬜ Commenté | Sprint 4 |
| DataLayer initialisé | ⬜ Présent | Actif |
| Événements documentés | ⬜ Liste prête | Sprint 4 |
| Consentement requis | ⬜ Vérifié | Actif |

---

## 9. Checklist finale de validation

### 9.1 Lighthouse Audit

Exécuter Lighthouse sur `index.html` :

| Catégorie | Score minimum | Score cible | Statut |
|-----------|---------------|-------------|--------|
| Performance | 80 | 90+ | ⬜ |
| Accessibility | 90 | 100 | ⬜ |
| Best Practices | 90 | 100 | ⬜ |
| SEO | 90 | 100 | ⬜ |

**Comment tester** :
1. Chrome DevTools (F12)
2. Onglet "Lighthouse"
3. Sélectionner "Mobile" + toutes les catégories
4. "Analyze page load"

### 9.2 SEO Technique

| Critère | Test | Statut |
|---------|------|--------|
| sitemap.xml accessible | GET /sitemap.xml → 200 OK | ⬜ |
| sitemap.xml valide | Validateur XML | ⬜ |
| robots.txt accessible | GET /robots.txt → 200 OK | ⬜ |
| robots.txt lie sitemap | Vérifier contenu | ⬜ |
| Canonical sur toutes pages | Inspecter HTML | ⬜ |
| Page 404 fonctionnelle | GET /page-inexistante → 404.html | ⬜ |
| Meta viewport correcte | Toutes les pages | ⬜ |

### 9.3 Schemas (Rich Results)

| Schema | Page(s) | Test | Statut |
|--------|---------|------|--------|
| Organization | Toutes | Rich Results Test | ⬜ |
| WebSite | index.html | Rich Results Test | ⬜ |
| BreadcrumbList | Toutes sauf index | Rich Results Test | ⬜ |
| Product | produit-1.html | Rich Results Test | ⬜ |
| Product | produit-2.html | Rich Results Test | ⬜ |
| Product | produit-3.html | Rich Results Test | ⬜ |

### 9.4 Performance

| Critère | Cible | Test | Statut |
|---------|-------|------|--------|
| LCP | < 2.5s | Lighthouse | ⬜ |
| CLS | < 0.1 | Lighthouse | ⬜ |
| INP | < 200ms | Lighthouse | ⬜ |
| Images optimisées | < 100KB chacune | DevTools Network | ⬜ |
| JS bundle | < 50KB | DevTools Network | ⬜ |

### 9.5 Open Graph

| Page | Test | Statut |
|------|------|--------|
| index.html | Facebook Debugger | ⬜ |
| produit-1.html | Facebook Debugger | ⬜ |
| Aperçu correct | Image + titre + description | ⬜ |

### 9.6 RGPD & Cookies

| Critère | Test | Statut |
|---------|------|--------|
| Bandeau cookies affiché | Première visite (localStorage vide) | ⬜ |
| Bouton Accepter fonctionne | Clic → bandeau disparaît → localStorage | ⬜ |
| Bouton Refuser fonctionne | Clic → bandeau disparaît → localStorage | ⬜ |
| Choix persistant | Rechargement → pas de bandeau | ⬜ |
| Aucun tracking sans consentement | DevTools Network | ⬜ |
| Liens légaux présents | Footer toutes pages | ⬜ |
| Reset cookies fonctionne | Page cookies.html | ⬜ |

### 9.7 Ads Readiness

| Critère | Requis pour | Statut |
|---------|-------------|--------|
| HTTPS | Google Ads, Meta Ads | ✅ (GitHub Pages) |
| Politique confidentialité | Google Ads, Meta Ads | ⬜ Vérifier |
| Page contact | Google Ads | ⬜ Vérifier |
| Pas de contenu interdit | Google Ads, Meta Ads | ⬜ Vérifier |
| Bandeau cookies | RGPD / Meta Ads | ⬜ |
| Consentement trackable | Google Consent Mode | ⬜ Préparé |

---

## 10. Notes de continuité vers WordPress

### 10.1 Éléments à migrer

| Élément Sprint 3 | Migration WordPress |
|------------------|---------------------|
| sitemap.xml | Généré par Yoast SEO ou Rank Math |
| robots.txt | Géré par WordPress + plugin SEO |
| Canonical | Plugin SEO (automatique) |
| Page 404 | Template `404.php` du thème |
| Schemas Organization | Plugin SEO ou code thème |
| Schemas Product | WooCommerce (natif) |
| Schemas Breadcrumb | Plugin SEO (Yoast) |
| Open Graph | Plugin SEO |
| Cookie banner | Plugin RGPD (Complianz, CookieYes, etc.) |
| GTM | Plugin ou code thème |

### 10.2 Plugins WordPress recommandés

| Fonction | Plugin recommandé | Alternative |
|----------|-------------------|-------------|
| SEO | Yoast SEO | Rank Math |
| Schemas | Yoast SEO (inclus) | Schema Pro |
| Cookies RGPD | Complianz | CookieYes, GDPR Cookie Consent |
| Performance | WP Rocket | LiteSpeed Cache |
| Images | ShortPixel | Imagify |
| GTM | GTM4WP | Code thème |

### 10.3 Checklist migration Sprint 3 → WordPress

| Élément | Action |
|---------|--------|
| Design tokens CSS | Intégrer dans theme/assets/css |
| Schemas JSON-LD | Configurer plugin SEO |
| Open Graph | Configurer plugin SEO |
| sitemap/robots | Plugin SEO (automatique) |
| Cookie banner | Installer plugin RGPD |
| GTM | Configurer plugin ou thème |
| 404 page | Créer template 404.php |
| Canonical | Automatique avec plugin SEO |

### 10.4 Points d'attention

| Risque | Mitigation |
|--------|------------|
| Perte de structure URL | Configurer permalinks WordPress identiques |
| Schemas en double | Désactiver schemas WooCommerce natifs si plugin SEO |
| Performance dégradée | Cache, CDN, optimisation images |
| Cookie banner différent | Choisir plugin avant migration pour cohérence |

---

## Annexe A — Commandes récapitulatives

```bash
# === CRÉATION FICHIERS SPRINT 3 ===

# Sitemap et Robots
touch public/sitemap.xml
touch public/robots.txt

# Page 404
touch src/pages/404.html

# Images Open Graph
mkdir -p public/images/og
# → Créer og-default.jpg (1200×630)

# CSS Cookie Banner
touch src/styles/components/cookie-banner.css

# JS Cookie Consent
touch src/scripts/cookie-consent.js

# === OPTIMISATION IMAGES ===

# Conversion WebP (si cwebp installé)
for file in public/images/**/*.jpg; do
  cwebp -q 80 "$file" -o "${file%.jpg}.webp"
done

# === VALIDATION ===

# Build
npm run build

# Test local
npm run preview

# Lighthouse CLI (si installé)
lighthouse https://[USERNAME].github.io/weliafood-prototype/ --view
```

---

## Annexe B — Template complet `<head>` Sprint 3

```html
<head>
  <!-- Metas essentielles -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- SEO -->
  <title>[TITLE]</title>
  <meta name="description" content="[DESCRIPTION]">
  <link rel="canonical" href="[URL_CANONICAL]">
  <meta name="robots" content="index, follow">
  
  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Weliafood">
  <meta property="og:locale" content="fr_FR">
  <meta property="og:title" content="[OG_TITLE]">
  <meta property="og:description" content="[OG_DESCRIPTION]">
  <meta property="og:url" content="[URL_CANONICAL]">
  <meta property="og:image" content="[OG_IMAGE_URL]">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="[OG_TITLE]">
  <meta name="twitter:description" content="[OG_DESCRIPTION]">
  <meta name="twitter:image" content="[OG_IMAGE_URL]">
  
  <!-- Favicon -->
  <link rel="icon" href="/favicon.ico" type="image/x-icon">
  
  <!-- Preconnect -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
  
  <!-- CSS -->
  <link rel="stylesheet" href="../styles/tokens.css">
  <link rel="stylesheet" href="../styles/reset.css">
  <link rel="stylesheet" href="../styles/base.css">
  <link rel="stylesheet" href="../styles/layout.css">
  <link rel="stylesheet" href="../styles/components/buttons.css">
  <link rel="stylesheet" href="../styles/components/cookie-banner.css">
  <!-- [Autres CSS selon la page] -->
  
  <!-- GTM Head (Sprint 4 - commenté) -->
  <!-- <script>...</script> -->
  
  <!-- DataLayer -->
  <script>
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'pageType': '[PAGE_TYPE]',
      'pageName': '[PAGE_NAME]'
    });
  </script>
  
  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Weliafood",
    "url": "[BASE_URL]",
    "logo": "[LOGO_URL]"
  }
  </script>
  
  <!-- [Autres schemas selon la page] -->
</head>
```

---

**Fin du document — Sprint 3 Implementation Guide**
