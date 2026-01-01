# Sprint 1 Implementation Guide — Weliafood Prototype E-commerce

> **Version** : 1.0  
> **Date** : Janvier 2026  
> **Projet** : Prototype front e-commerce statique pour Weliafood  
> **Cible** : Développeur ou LLM — Guide séquentiel et exécutable

---

## Table des matières

1. [Objectifs & Definition of Done](#1-objectifs--definition-of-done)
2. [Choix de stack + Rationale](#2-choix-de-stack--rationale)
3. [Pré-requis](#3-pré-requis)
4. [Création du repository](#4-création-du-repository)
5. [Arborescence finale attendue](#5-arborescence-finale-attendue)
6. [Conventions](#6-conventions)
7. [Implémentation pas-à-pas](#7-implémentation-pas-à-pas)
8. [CI/CD GitHub Pages](#8-cicd-github-pages)
9. [Checklist QA](#9-checklist-qa)
10. [Notes handoff WordPress](#10-notes-handoff-wordpress)

---

## 1. Objectifs & Definition of Done

### Objectifs Sprint 1

Mettre en place un **socle technique robuste** permettant d'enchaîner rapidement les sprints suivants :

- Repository GitHub structuré avec conventions claires
- Design system minimal (tokens CSS + composants de base)
- Layout global (header/footer/navigation)
- Pages stubs (squelettes) pour toutes les routes prévues
- CI/CD automatique vers GitHub Pages
- Documentation actionnable

### Definition of Done (critères mesurables)

| Critère | Validation |
|---------|------------|
| Repository GitHub créé avec documentation complète | ✅ README, CONTRIBUTING, .editorconfig, .gitignore présents |
| Build local fonctionnel | ✅ `npm run build` sans erreur |
| Déploiement GitHub Pages automatique | ✅ Push sur `main` → site en ligne |
| Header/footer/navigation fonctionnels | ✅ Navigation entre toutes les pages OK |
| Design tokens documentés | ✅ Variables CSS définies et utilisées |
| Composants de base implémentés | ✅ Button, Card, Input, Container, Grid |
| Toutes les pages stubs accessibles | ✅ 11 pages créées et liées |
| Accessibilité minimale | ✅ Focus visible, labels, contrastes |
| Structure SEO respectée | ✅ 1 H1/page, HTML sémantique, metas |

---

## 2. Choix de stack + Rationale

### Décision : HTML/CSS/JS Vanilla + Vite (build tool)

#### Pourquoi cette stack ?

| Critère | HTML/CSS/JS + Vite | Astro | SPA React/Next |
|---------|-------------------|-------|----------------|
| **SEO** | ✅ Excellent (HTML pur) | ✅ Excellent | ⚠️ Complexe (SSR requis) |
| **Simplicité** | ✅ Maximum | ✅ Bon | ❌ Overhead important |
| **Transférabilité WP** | ✅ Direct (HTML = référence) | ⚠️ Syntaxe spécifique | ❌ Logique JS à adapter |
| **Vitesse d'exécution** | ✅ Rapide | ✅ Rapide | ❌ Setup long |
| **Maintenance** | ✅ Standard web | ⚠️ Framework spécifique | ❌ Dépendances lourdes |
| **Dépendances** | Minimales (Vite uniquement) | Modérées | Nombreuses |

#### Justification détaillée

1. **Vite comme build tool** : Hot reload, bundling optimisé, zéro config, support natif des imports CSS/JS modules
2. **Multi-page application (MPA)** : Chaque page = un fichier HTML distinct, idéal pour SEO et handoff WordPress
3. **CSS vanilla avec variables** : Pas de preprocesseur = moins de complexité, CSS moderne suffisant
4. **JS minimal** : Uniquement pour interactions essentielles (menu mobile, etc.)

#### Ce qu'on évite

- ❌ Tailwind CSS : overhead de classes, moins lisible pour handoff WP
- ❌ SASS/LESS : complexité inutile pour ce scope
- ❌ React/Vue/Svelte : SPA inadaptée au prototype statique
- ❌ SSG lourd (Next, Nuxt) : complexité non justifiée

---

## 3. Pré-requis

### Environnement technique

```bash
# Version Node.js requise
node --version  # >= 18.0.0 (LTS recommandé: 20.x)

# Vérifier npm
npm --version   # >= 9.0.0

# Git installé
git --version   # >= 2.30.0
```

### Outils recommandés

- **IDE** : VS Code avec extensions :
  - ESLint
  - Prettier
  - Live Server (backup)
  - HTMLHint
- **Navigateurs** : Chrome DevTools, Firefox (tests accessibilité)

### Comptes requis

- Compte GitHub avec droits de création de repository
- (Optionnel) GitHub CLI installé : `gh --version`

---

## 4. Création du repository

### 4.1 Initialisation du repository

```bash
# Créer le dossier projet
mkdir weliafood-prototype
cd weliafood-prototype

# Initialiser Git
git init

# Créer la branche principale
git branch -M main
```

### 4.2 Création du repository GitHub

**Option A — Via GitHub CLI :**

```bash
gh repo create weliafood-prototype \
  --public \
  --description "Prototype e-commerce statique Weliafood - SEO-ready, GitHub Pages" \
  --source=. \
  --remote=origin
```

**Option B — Via interface GitHub :**

1. Aller sur https://github.com/new
2. Nom : `weliafood-prototype`
3. Description : `Prototype e-commerce statique Weliafood - SEO-ready, GitHub Pages`
4. Visibilité : Public
5. Ne pas initialiser avec README (on le crée localement)
6. Copier l'URL et lier :

```bash
git remote add origin https://github.com/[USERNAME]/weliafood-prototype.git
```

### 4.3 Fichiers de configuration racine

#### `.gitignore`

```bash
cat > .gitignore << 'EOF'
# Dependencies
node_modules/

# Build output
dist/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Environment
.env
.env.local
.env.*.local

# Cache
.cache/
.parcel-cache/
EOF
```

#### `.editorconfig`

```bash
cat > .editorconfig << 'EOF'
root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false

[*.{html,css,js}]
indent_size = 2

[Makefile]
indent_style = tab
EOF
```

#### `README.md`

```bash
cat > README.md << 'EOF'
# Weliafood — Prototype E-commerce

Prototype front statique pour validation client et handoff WordPress/WooCommerce.

## 🚀 Quick Start

```bash
# Installation
npm install

# Développement (hot reload)
npm run dev

# Build production
npm run build

# Preview build
npm run preview
```

## 📁 Structure du projet

```
weliafood-prototype/
├── src/
│   ├── pages/           # Pages HTML
│   ├── components/      # Fragments HTML réutilisables
│   ├── styles/          # CSS (tokens, composants, layouts)
│   └── scripts/         # JavaScript minimal
├── public/              # Assets statiques (images, fonts, favicon)
├── docs/                # Documentation interne
└── dist/                # Build (généré, ignoré par git)
```

## 🎨 Design System

Les tokens CSS sont définis dans `src/styles/tokens.css`.
Les composants sont dans `src/styles/components/`.

## 📝 Conventions

- **Commits** : [Conventional Commits](https://www.conventionalcommits.org/)
- **Branches** : Trunk-based (travail direct sur `main` ou PR courtes)
- **Nommage fichiers** : kebab-case (`produit-detail.html`)

## 🔗 URLs

- **Production** : https://[username].github.io/weliafood-prototype/
- **Référence** : https://weliafood.com/

## 📋 Scripts disponibles

| Script | Description |
|--------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build production |
| `npm run preview` | Preview du build |
| `npm run lint` | Lint HTML/CSS/JS |
| `npm run format` | Formatage Prettier |

## 📄 Licence

Propriétaire — Usage interne uniquement.
EOF
```

#### `CONTRIBUTING.md`

```bash
cat > CONTRIBUTING.md << 'EOF'
# Guide de contribution

## Workflow Git

### Branche principale
- `main` : branche de production, déployée automatiquement

### Stratégie
- **Trunk-based development** : commits directs sur `main` pour petits changements
- **Feature branches** : `feature/nom-feature` pour développements conséquents
- Pull Requests requises pour review si feature branch

## Convention de commits

Format : `<type>(<scope>): <description>`

### Types autorisés

| Type | Description |
|------|-------------|
| `feat` | Nouvelle fonctionnalité |
| `fix` | Correction de bug |
| `docs` | Documentation uniquement |
| `style` | Formatage, pas de changement de code |
| `refactor` | Refactoring sans changement fonctionnel |
| `perf` | Amélioration de performance |
| `test` | Ajout/modification de tests |
| `chore` | Maintenance, dépendances, config |

### Exemples

```
feat(header): add mobile navigation menu
fix(product-card): correct image aspect ratio
docs(readme): update installation instructions
chore(deps): update vite to 5.x
```

## Standards de code

### HTML
- Sémantique : utiliser les balises appropriées (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`)
- Accessibilité : `alt` sur images, `aria-label` si nécessaire, focus visible
- 1 seul `<h1>` par page

### CSS
- Utiliser les variables CSS définies dans `tokens.css`
- Nommage BEM simplifié : `.component`, `.component__element`, `.component--modifier`
- Mobile-first : styles de base pour mobile, media queries pour desktop

### JavaScript
- ES6+ modules
- Pas de framework, vanilla JS uniquement
- Commenter le code complexe

## Checklist PR

- [ ] Code formaté (`npm run format`)
- [ ] Lint passé (`npm run lint`)
- [ ] Build réussi (`npm run build`)
- [ ] Testé sur mobile et desktop
- [ ] Accessibilité vérifiée (navigation clavier, focus)
EOF
```

---

## 5. Arborescence finale attendue

```
weliafood-prototype/
├── .github/
│   └── workflows/
│       └── deploy.yml           # CI/CD GitHub Pages
├── docs/
│   └── design-system.md         # Documentation tokens/composants
├── public/
│   ├── images/
│   │   ├── logo.svg
│   │   ├── hero-placeholder.jpg
│   │   └── products/
│   │       ├── product-1.jpg
│   │       ├── product-2.jpg
│   │       └── product-3.jpg
│   ├── fonts/                   # (si fonts custom)
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── header.html          # Fragment header
│   │   └── footer.html          # Fragment footer
│   ├── pages/
│   │   ├── index.html           # Accueil
│   │   ├── categorie.html       # Catégorie exemple
│   │   ├── produit.html         # Template produit
│   │   ├── produit-1.html       # Fiche produit 1
│   │   ├── produit-2.html       # Fiche produit 2
│   │   ├── produit-3.html       # Fiche produit 3
│   │   ├── contact.html         # Contact
│   │   ├── a-propos.html        # À propos
│   │   ├── mentions-legales.html
│   │   ├── cgv.html
│   │   ├── confidentialite.html
│   │   └── cookies.html
│   ├── styles/
│   │   ├── tokens.css           # Variables CSS (design tokens)
│   │   ├── reset.css            # Reset/normalize
│   │   ├── base.css             # Styles de base (typo, body)
│   │   ├── layout.css           # Header, footer, grid, container
│   │   ├── components/
│   │   │   ├── buttons.css
│   │   │   ├── cards.css
│   │   │   ├── forms.css
│   │   │   └── badges.css
│   │   └── pages/
│   │       ├── home.css
│   │       ├── category.css
│   │       ├── product.css
│   │       └── legal.css
│   └── scripts/
│       ├── main.js              # Point d'entrée JS
│       └── navigation.js        # Menu mobile
├── .editorconfig
├── .gitignore
├── CONTRIBUTING.md
├── README.md
├── package.json
└── vite.config.js
```

---

## 6. Conventions

### 6.1 Nommage des fichiers

| Type | Convention | Exemple |
|------|------------|---------|
| Pages HTML | kebab-case | `mentions-legales.html` |
| CSS | kebab-case | `product-card.css` |
| JS | camelCase | `mobileNavigation.js` |
| Images | kebab-case | `hero-banner.jpg` |
| Composants CSS | BEM simplifié | `.card`, `.card__image`, `.card--featured` |

### 6.2 Routes (URLs finales)

| Page | Fichier source | URL GitHub Pages |
|------|----------------|------------------|
| Accueil | `src/pages/index.html` | `/` |
| Catégorie | `src/pages/categorie.html` | `/categorie.html` |
| Produit template | `src/pages/produit.html` | `/produit.html` |
| Produit 1 | `src/pages/produit-1.html` | `/produit-1.html` |
| Produit 2 | `src/pages/produit-2.html` | `/produit-2.html` |
| Produit 3 | `src/pages/produit-3.html` | `/produit-3.html` |
| Contact | `src/pages/contact.html` | `/contact.html` |
| À propos | `src/pages/a-propos.html` | `/a-propos.html` |
| Mentions légales | `src/pages/mentions-legales.html` | `/mentions-legales.html` |
| CGV | `src/pages/cgv.html` | `/cgv.html` |
| Confidentialité | `src/pages/confidentialite.html` | `/confidentialite.html` |
| Cookies | `src/pages/cookies.html` | `/cookies.html` |

### 6.3 Convention de commits

```
<type>(<scope>): <description courte>

[corps optionnel]

[footer optionnel]
```

**Types** : `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

**Exemples** :
```
feat(layout): implement responsive header with mobile menu
fix(tokens): correct primary color contrast ratio
docs(readme): add deployment instructions
chore(deps): add prettier and eslint
```

### 6.4 Classes CSS — Convention BEM simplifiée

```css
/* Bloc */
.card { }

/* Élément (partie du bloc) */
.card__image { }
.card__title { }
.card__content { }
.card__footer { }

/* Modificateur (variante) */
.card--featured { }
.card--horizontal { }

/* États */
.card.is-active { }
.card.is-loading { }
```

---

## 7. Implémentation pas-à-pas

### 7.1 Setup de la stack

#### Initialiser npm et installer Vite

```bash
# Initialiser package.json
npm init -y

# Installer Vite
npm install --save-dev vite

# Installer outils qualité
npm install --save-dev prettier eslint eslint-plugin-html
```

#### Configurer package.json

Remplacer le contenu de `package.json` :

```json
{
  "name": "weliafood-prototype",
  "version": "1.0.0",
  "description": "Prototype e-commerce statique Weliafood",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src/**/*.js",
    "format": "prettier --write \"src/**/*.{html,css,js}\"",
    "format:check": "prettier --check \"src/**/*.{html,css,js}\""
  },
  "devDependencies": {
    "eslint": "^8.57.0",
    "eslint-plugin-html": "^8.0.0",
    "prettier": "^3.2.0",
    "vite": "^5.4.0"
  }
}
```

#### Configurer Vite — `vite.config.js`

```javascript
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src/pages',
  base: '/weliafood-prototype/', // Adapter au nom du repo
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
      },
    },
  },
  server: {
    open: true,
  },
});
```

#### Configurer Prettier — `.prettierrc`

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "htmlWhitespaceSensitivity": "ignore"
}
```

#### Configurer ESLint — `.eslintrc.json`

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "plugins": ["html"],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "no-unused-vars": "warn",
    "no-console": "off"
  }
}
```

#### Créer la structure de dossiers

```bash
# Créer l'arborescence
mkdir -p src/{pages,components,styles/components,styles/pages,scripts}
mkdir -p public/{images/products,fonts}
mkdir -p docs
mkdir -p .github/workflows

# Créer les fichiers vides pour le tracking
touch src/styles/{tokens,reset,base,layout}.css
touch src/styles/components/{buttons,cards,forms,badges}.css
touch src/styles/pages/{home,category,product,legal}.css
touch src/scripts/{main,navigation}.js
```

---

### 7.2 Création des Design Tokens

#### `src/styles/tokens.css`

```css
/**
 * WELIAFOOD DESIGN TOKENS
 * Variables CSS globales
 * 
 * Usage: var(--token-name)
 */

:root {
  /* ========================================
     COULEURS
     ======================================== */
  
  /* Primaire - Vert Weliafood */
  --color-primary-50: #f0fdf4;
  --color-primary-100: #dcfce7;
  --color-primary-200: #bbf7d0;
  --color-primary-300: #86efac;
  --color-primary-400: #4ade80;
  --color-primary-500: #22c55e;  /* Principal */
  --color-primary-600: #16a34a;
  --color-primary-700: #15803d;
  --color-primary-800: #166534;
  --color-primary-900: #14532d;
  
  /* Neutre */
  --color-neutral-0: #ffffff;
  --color-neutral-50: #fafafa;
  --color-neutral-100: #f5f5f5;
  --color-neutral-200: #e5e5e5;
  --color-neutral-300: #d4d4d4;
  --color-neutral-400: #a3a3a3;
  --color-neutral-500: #737373;
  --color-neutral-600: #525252;
  --color-neutral-700: #404040;
  --color-neutral-800: #262626;
  --color-neutral-900: #171717;
  
  /* Sémantique */
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
  
  /* Texte */
  --color-text-primary: var(--color-neutral-900);
  --color-text-secondary: var(--color-neutral-600);
  --color-text-muted: var(--color-neutral-400);
  --color-text-inverse: var(--color-neutral-0);
  
  /* Fond */
  --color-bg-primary: var(--color-neutral-0);
  --color-bg-secondary: var(--color-neutral-50);
  --color-bg-tertiary: var(--color-neutral-100);
  
  /* Bordure */
  --color-border-light: var(--color-neutral-200);
  --color-border-default: var(--color-neutral-300);
  --color-border-strong: var(--color-neutral-400);

  /* ========================================
     TYPOGRAPHIE
     ======================================== */
  
  /* Familles */
  --font-family-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-family-display: 'Playfair Display', Georgia, serif;
  --font-family-mono: 'JetBrains Mono', 'Fira Code', monospace;
  
  /* Tailles */
  --font-size-xs: 0.75rem;     /* 12px */
  --font-size-sm: 0.875rem;    /* 14px */
  --font-size-base: 1rem;      /* 16px */
  --font-size-lg: 1.125rem;    /* 18px */
  --font-size-xl: 1.25rem;     /* 20px */
  --font-size-2xl: 1.5rem;     /* 24px */
  --font-size-3xl: 1.875rem;   /* 30px */
  --font-size-4xl: 2.25rem;    /* 36px */
  --font-size-5xl: 3rem;       /* 48px */
  --font-size-6xl: 3.75rem;    /* 60px */
  
  /* Line Heights */
  --line-height-tight: 1.25;
  --line-height-snug: 1.375;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;
  --line-height-loose: 2;
  
  /* Font Weights */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* ========================================
     ESPACEMENTS
     ======================================== */
  
  --space-0: 0;
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  
  /* ========================================
     RAYONS DE BORDURE
     ======================================== */
  
  --radius-none: 0;
  --radius-sm: 0.25rem;    /* 4px */
  --radius-md: 0.375rem;   /* 6px */
  --radius-lg: 0.5rem;     /* 8px */
  --radius-xl: 0.75rem;    /* 12px */
  --radius-2xl: 1rem;      /* 16px */
  --radius-full: 9999px;
  
  /* ========================================
     OMBRES
     ======================================== */
  
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  
  /* ========================================
     TRANSITIONS
     ======================================== */
  
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;
  
  /* ========================================
     BREAKPOINTS (pour référence en JS)
     ======================================== */
  
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
  
  /* ========================================
     Z-INDEX
     ======================================== */
  
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-fixed: 300;
  --z-modal-backdrop: 400;
  --z-modal: 500;
  --z-tooltip: 600;
}

/* ========================================
   MEDIA QUERIES HELPERS
   ======================================== */

/* Usage dans autres fichiers CSS:
   @media (min-width: 768px) { }
   
   Breakpoints:
   - Mobile: < 640px (default, mobile-first)
   - SM: >= 640px (paysage mobile, petites tablettes)
   - MD: >= 768px (tablettes)
   - LG: >= 1024px (desktop)
   - XL: >= 1280px (grand desktop)
   - 2XL: >= 1536px (très grand écran)
*/
```

---

### 7.3 CSS Reset et Base

#### `src/styles/reset.css`

```css
/**
 * CSS RESET
 * Normalisation cross-browser
 */

*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
}

html {
  -webkit-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  text-size-adjust: 100%;
  scroll-behavior: smooth;
}

body {
  min-height: 100vh;
  line-height: var(--line-height-normal);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
  height: auto;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

a {
  color: inherit;
  text-decoration: none;
}

ul,
ol {
  list-style: none;
}

button {
  background: none;
  border: none;
  cursor: pointer;
}

/* Accessibilité : focus visible */
:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* Réduire animations si préférence utilisateur */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

#### `src/styles/base.css`

```css
/**
 * STYLES DE BASE
 * Typographie et éléments HTML
 */

body {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-normal);
  color: var(--color-text-primary);
  background-color: var(--color-bg-primary);
}

/* Titres */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-family-display);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  color: var(--color-text-primary);
}

h1 {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--space-6);
}

h2 {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--space-5);
}

h3 {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--space-4);
}

h4 {
  font-size: var(--font-size-xl);
  margin-bottom: var(--space-3);
}

h5 {
  font-size: var(--font-size-lg);
  margin-bottom: var(--space-2);
}

h6 {
  font-size: var(--font-size-base);
  margin-bottom: var(--space-2);
}

/* Paragraphes */
p {
  margin-bottom: var(--space-4);
  line-height: var(--line-height-relaxed);
}

/* Liens */
a {
  color: var(--color-primary-600);
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--color-primary-700);
  text-decoration: underline;
}

/* Listes */
ul,
ol {
  padding-left: var(--space-6);
  margin-bottom: var(--space-4);
}

ul {
  list-style-type: disc;
}

ol {
  list-style-type: decimal;
}

li {
  margin-bottom: var(--space-2);
}

/* Media queries typographie responsive */
@media (min-width: 768px) {
  h1 {
    font-size: var(--font-size-5xl);
  }
  
  h2 {
    font-size: var(--font-size-4xl);
  }
  
  h3 {
    font-size: var(--font-size-3xl);
  }
}

@media (min-width: 1024px) {
  h1 {
    font-size: var(--font-size-6xl);
  }
}
```

---

### 7.4 Layout et Composants de base

#### `src/styles/layout.css`

```css
/**
 * LAYOUT
 * Container, Grid, Header, Footer
 */

/* ========================================
   CONTAINER
   ======================================== */

.container {
  width: 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}

@media (min-width: 768px) {
  .container {
    padding-left: var(--space-6);
    padding-right: var(--space-6);
  }
}

@media (min-width: 1024px) {
  .container {
    padding-left: var(--space-8);
    padding-right: var(--space-8);
  }
}

/* ========================================
   GRID
   ======================================== */

.grid {
  display: grid;
  gap: var(--space-6);
}

.grid--2 {
  grid-template-columns: repeat(1, 1fr);
}

.grid--3 {
  grid-template-columns: repeat(1, 1fr);
}

.grid--4 {
  grid-template-columns: repeat(1, 1fr);
}

@media (min-width: 640px) {
  .grid--2 {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .grid--3 {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .grid--4 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid--3 {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .grid--4 {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* ========================================
   HEADER
   ======================================== */

.header {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background-color: var(--color-bg-primary);
  border-bottom: 1px solid var(--color-border-light);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}

.header__logo {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-family-display);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-600);
}

.header__logo img {
  height: 40px;
  width: auto;
}

.header__nav {
  display: none;
}

.header__nav-list {
  display: flex;
  gap: var(--space-6);
  list-style: none;
  padding: 0;
  margin: 0;
}

.header__nav-link {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  transition: color var(--transition-fast);
}

.header__nav-link:hover,
.header__nav-link.is-active {
  color: var(--color-primary-600);
  text-decoration: none;
}

.header__actions {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.header__menu-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: var(--color-text-primary);
}

.header__menu-toggle svg {
  width: 24px;
  height: 24px;
}

@media (min-width: 1024px) {
  .header__nav {
    display: block;
  }
  
  .header__menu-toggle {
    display: none;
  }
}

/* Mobile Navigation */
.mobile-nav {
  position: fixed;
  top: 72px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-bg-primary);
  z-index: var(--z-fixed);
  transform: translateX(100%);
  transition: transform var(--transition-slow);
}

.mobile-nav.is-open {
  transform: translateX(0);
}

.mobile-nav__list {
  display: flex;
  flex-direction: column;
  padding: var(--space-6);
}

.mobile-nav__link {
  display: block;
  padding: var(--space-4) 0;
  font-size: var(--font-size-lg);
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-border-light);
}

/* ========================================
   FOOTER
   ======================================== */

.footer {
  background-color: var(--color-neutral-900);
  color: var(--color-neutral-300);
  padding: var(--space-12) 0 var(--space-6);
  margin-top: auto;
}

.footer__grid {
  display: grid;
  gap: var(--space-8);
  margin-bottom: var(--space-10);
}

.footer__section-title {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-neutral-0);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-4);
}

.footer__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer__list li {
  margin-bottom: var(--space-2);
}

.footer__link {
  font-size: var(--font-size-sm);
  color: var(--color-neutral-400);
  transition: color var(--transition-fast);
}

.footer__link:hover {
  color: var(--color-neutral-0);
  text-decoration: none;
}

.footer__bottom {
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-neutral-700);
  text-align: center;
}

.footer__copyright {
  font-size: var(--font-size-sm);
  color: var(--color-neutral-500);
}

@media (min-width: 768px) {
  .footer__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .footer__grid {
    grid-template-columns: 2fr 1fr 1fr 1fr;
  }
}

/* ========================================
   MAIN CONTENT
   ======================================== */

.main {
  flex: 1;
  padding: var(--space-8) 0;
}

/* Page wrapper pour sticky footer */
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* ========================================
   SECTIONS
   ======================================== */

.section {
  padding: var(--space-12) 0;
}

.section--alt {
  background-color: var(--color-bg-secondary);
}

.section__header {
  text-align: center;
  margin-bottom: var(--space-10);
}

.section__title {
  margin-bottom: var(--space-4);
}

.section__description {
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
  color: var(--color-text-secondary);
}

/* ========================================
   BREADCRUMBS
   ======================================== */

.breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin-bottom: var(--space-6);
}

.breadcrumbs__item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.breadcrumbs__link {
  color: var(--color-text-secondary);
}

.breadcrumbs__link:hover {
  color: var(--color-primary-600);
}

.breadcrumbs__separator {
  color: var(--color-text-muted);
}

.breadcrumbs__current {
  color: var(--color-text-primary);
}
```

#### `src/styles/components/buttons.css`

```css
/**
 * BUTTONS
 * Styles des boutons
 */

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  font-family: var(--font-family-sans);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  line-height: 1;
  text-align: center;
  text-decoration: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
}

/* Primary */
.btn--primary {
  background-color: var(--color-primary-600);
  color: var(--color-text-inverse);
  border: 2px solid var(--color-primary-600);
}

.btn--primary:hover {
  background-color: var(--color-primary-700);
  border-color: var(--color-primary-700);
  text-decoration: none;
}

.btn--primary:active {
  background-color: var(--color-primary-800);
  border-color: var(--color-primary-800);
}

/* Secondary */
.btn--secondary {
  background-color: transparent;
  color: var(--color-primary-600);
  border: 2px solid var(--color-primary-600);
}

.btn--secondary:hover {
  background-color: var(--color-primary-50);
  text-decoration: none;
}

.btn--secondary:active {
  background-color: var(--color-primary-100);
}

/* Ghost */
.btn--ghost {
  background-color: transparent;
  color: var(--color-text-primary);
  border: 2px solid transparent;
}

.btn--ghost:hover {
  background-color: var(--color-bg-tertiary);
  text-decoration: none;
}

/* Sizes */
.btn--sm {
  padding: var(--space-2) var(--space-4);
  font-size: var(--font-size-xs);
}

.btn--lg {
  padding: var(--space-4) var(--space-8);
  font-size: var(--font-size-base);
}

/* Full width */
.btn--full {
  width: 100%;
}

/* Disabled */
.btn:disabled,
.btn.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Icon only */
.btn--icon {
  padding: var(--space-3);
}

.btn--icon svg {
  width: 20px;
  height: 20px;
}
```

#### `src/styles/components/cards.css`

```css
/**
 * CARDS
 * Cartes produit et génériques
 */

.card {
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg-primary);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: box-shadow var(--transition-base), transform var(--transition-base);
}

.card:hover {
  box-shadow: var(--shadow-lg);
}

/* Image */
.card__image {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background-color: var(--color-bg-secondary);
}

.card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.card:hover .card__image img {
  transform: scale(1.05);
}

/* Content */
.card__content {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: var(--space-5);
}

/* Category/tag */
.card__category {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary-600);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-2);
}

/* Title */
.card__title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
  line-height: var(--line-height-snug);
}

.card__title a {
  color: inherit;
}

.card__title a:hover {
  color: var(--color-primary-600);
  text-decoration: none;
}

/* Description */
.card__description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--space-4);
  flex: 1;
}

/* Footer */
.card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border-light);
  margin-top: auto;
}

/* Price */
.card__price {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-700);
}

/* Variantes */
.card--horizontal {
  flex-direction: row;
}

.card--horizontal .card__image {
  width: 40%;
  aspect-ratio: auto;
}

.card--horizontal .card__content {
  width: 60%;
}

.card--bordered {
  border: 1px solid var(--color-border-light);
}

.card--bordered:hover {
  border-color: var(--color-primary-200);
}

/* Card Featured */
.card--featured {
  position: relative;
}

.card--featured::before {
  content: '';
  position: absolute;
  top: var(--space-4);
  left: var(--space-4);
  padding: var(--space-1) var(--space-3);
  background-color: var(--color-primary-500);
  color: var(--color-text-inverse);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-full);
  z-index: 1;
}
```

#### `src/styles/components/forms.css`

```css
/**
 * FORMS
 * Inputs, textareas, selects
 */

/* Form group */
.form-group {
  margin-bottom: var(--space-5);
}

/* Label */
.form-label {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.form-label--required::after {
  content: ' *';
  color: var(--color-error);
}

/* Input, Textarea, Select communs */
.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.form-input:hover,
.form-textarea:hover,
.form-select:hover {
  border-color: var(--color-border-strong);
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px var(--color-primary-100);
}

/* Placeholder */
.form-input::placeholder,
.form-textarea::placeholder {
  color: var(--color-text-muted);
}

/* Textarea specific */
.form-textarea {
  min-height: 120px;
  resize: vertical;
}

/* Select specific */
.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23737373' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--space-3) center;
  background-size: 16px;
  padding-right: var(--space-10);
}

/* États */
.form-input--error,
.form-textarea--error,
.form-select--error {
  border-color: var(--color-error);
}

.form-input--error:focus,
.form-textarea--error:focus,
.form-select--error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
}

/* Message d'erreur */
.form-error {
  display: block;
  font-size: var(--font-size-sm);
  color: var(--color-error);
  margin-top: var(--space-2);
}

/* Helper text */
.form-helper {
  display: block;
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin-top: var(--space-2);
}

/* Checkbox et Radio */
.form-check {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
}

.form-check-input {
  width: 20px;
  height: 20px;
  margin-top: 2px;
  accent-color: var(--color-primary-600);
}

.form-check-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  line-height: var(--line-height-normal);
}
```

#### `src/styles/components/badges.css`

```css
/**
 * BADGES
 * Labels, tags, status
 */

.badge {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-3);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  line-height: 1.4;
  border-radius: var(--radius-full);
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

/* Variantes */
.badge--primary {
  background-color: var(--color-primary-100);
  color: var(--color-primary-700);
}

.badge--secondary {
  background-color: var(--color-neutral-100);
  color: var(--color-neutral-700);
}

.badge--success {
  background-color: #dcfce7;
  color: #166534;
}

.badge--warning {
  background-color: #fef3c7;
  color: #92400e;
}

.badge--error {
  background-color: #fee2e2;
  color: #991b1b;
}

.badge--info {
  background-color: #dbeafe;
  color: #1e40af;
}

/* Outlined */
.badge--outlined {
  background-color: transparent;
  border: 1px solid currentColor;
}

/* Sizes */
.badge--lg {
  padding: var(--space-2) var(--space-4);
  font-size: var(--font-size-sm);
}
```

---

### 7.5 Création des pages stubs

#### Template de base — `src/pages/index.html`

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Weliafood - Grossiste alimentaire professionnel. Découvrez notre gamme de produits de qualité pour les professionnels de la restauration.">
  <title>Weliafood - Grossiste Alimentaire Professionnel</title>
  
  <!-- Favicon -->
  <link rel="icon" href="/favicon.ico" type="image/x-icon">
  
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
  <link rel="stylesheet" href="../styles/components/cards.css">
  <link rel="stylesheet" href="../styles/components/forms.css">
  <link rel="stylesheet" href="../styles/components/badges.css">
  <link rel="stylesheet" href="../styles/pages/home.css">
</head>
<body>
  <div class="page">
    <!-- Header -->
    <header class="header">
      <div class="container header__inner">
        <a href="index.html" class="header__logo">
          <img src="/images/logo.svg" alt="Weliafood" width="40" height="40">
          <span>Weliafood</span>
        </a>
        
        <nav class="header__nav" aria-label="Navigation principale">
          <ul class="header__nav-list">
            <li><a href="index.html" class="header__nav-link is-active">Accueil</a></li>
            <li><a href="categorie.html" class="header__nav-link">Catalogue</a></li>
            <li><a href="a-propos.html" class="header__nav-link">À propos</a></li>
            <li><a href="contact.html" class="header__nav-link">Contact</a></li>
          </ul>
        </nav>
        
        <div class="header__actions">
          <a href="contact.html" class="btn btn--primary btn--sm">Demander un devis</a>
          <button class="header__menu-toggle" aria-label="Ouvrir le menu" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Mobile Navigation -->
      <nav class="mobile-nav" aria-label="Navigation mobile">
        <ul class="mobile-nav__list">
          <li><a href="index.html" class="mobile-nav__link">Accueil</a></li>
          <li><a href="categorie.html" class="mobile-nav__link">Catalogue</a></li>
          <li><a href="a-propos.html" class="mobile-nav__link">À propos</a></li>
          <li><a href="contact.html" class="mobile-nav__link">Contact</a></li>
        </ul>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="main">
      <!-- Hero Section -->
      <section class="hero">
        <div class="container">
          <div class="hero__content">
            <h1 class="hero__title">Votre partenaire grossiste alimentaire de confiance</h1>
            <p class="hero__description">
              Découvrez notre gamme complète de produits alimentaires de qualité professionnelle. 
              Livraison rapide et service personnalisé pour les professionnels de la restauration.
            </p>
            <div class="hero__actions">
              <a href="categorie.html" class="btn btn--primary btn--lg">Découvrir nos produits</a>
              <a href="contact.html" class="btn btn--secondary btn--lg">Nous contacter</a>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Featured Products Section -->
      <section class="section section--alt">
        <div class="container">
          <header class="section__header">
            <h2 class="section__title">Nos produits phares</h2>
            <p class="section__description">
              Une sélection de nos meilleurs produits, choisis pour leur qualité et leur popularité auprès des professionnels.
            </p>
          </header>
          
          <div class="grid grid--3">
            <!-- Product Card 1 -->
            <article class="card card--bordered">
              <div class="card__image">
                <img src="/images/products/product-1.jpg" alt="Nom du produit 1" loading="lazy">
              </div>
              <div class="card__content">
                <span class="card__category">Catégorie</span>
                <h3 class="card__title">
                  <a href="produit-1.html">Nom du produit 1</a>
                </h3>
                <p class="card__description">
                  Description courte du produit. Caractéristiques principales et avantages pour les professionnels.
                </p>
                <div class="card__footer">
                  <span class="card__price">Sur devis</span>
                  <a href="produit-1.html" class="btn btn--secondary btn--sm">Voir détails</a>
                </div>
              </div>
            </article>
            
            <!-- Product Card 2 -->
            <article class="card card--bordered">
              <div class="card__image">
                <img src="/images/products/product-2.jpg" alt="Nom du produit 2" loading="lazy">
              </div>
              <div class="card__content">
                <span class="card__category">Catégorie</span>
                <h3 class="card__title">
                  <a href="produit-2.html">Nom du produit 2</a>
                </h3>
                <p class="card__description">
                  Description courte du produit. Caractéristiques principales et avantages pour les professionnels.
                </p>
                <div class="card__footer">
                  <span class="card__price">Sur devis</span>
                  <a href="produit-2.html" class="btn btn--secondary btn--sm">Voir détails</a>
                </div>
              </div>
            </article>
            
            <!-- Product Card 3 -->
            <article class="card card--bordered">
              <div class="card__image">
                <img src="/images/products/product-3.jpg" alt="Nom du produit 3" loading="lazy">
              </div>
              <div class="card__content">
                <span class="card__category">Catégorie</span>
                <h3 class="card__title">
                  <a href="produit-3.html">Nom du produit 3</a>
                </h3>
                <p class="card__description">
                  Description courte du produit. Caractéristiques principales et avantages pour les professionnels.
                </p>
                <div class="card__footer">
                  <span class="card__price">Sur devis</span>
                  <a href="produit-3.html" class="btn btn--secondary btn--sm">Voir détails</a>
                </div>
              </div>
            </article>
          </div>
          
          <div class="section__footer">
            <a href="categorie.html" class="btn btn--primary">Voir tous les produits</a>
          </div>
        </div>
      </section>
      
      <!-- Why Us Section -->
      <section class="section">
        <div class="container">
          <header class="section__header">
            <h2 class="section__title">Pourquoi nous choisir ?</h2>
          </header>
          
          <div class="grid grid--3">
            <div class="feature">
              <div class="feature__icon">🚚</div>
              <h3 class="feature__title">Livraison rapide</h3>
              <p class="feature__description">
                Livraison dans toute la France sous 24-48h pour les commandes passées avant 14h.
              </p>
            </div>
            
            <div class="feature">
              <div class="feature__icon">✨</div>
              <h3 class="feature__title">Qualité premium</h3>
              <p class="feature__description">
                Produits sélectionnés avec soin auprès de fournisseurs certifiés et contrôlés.
              </p>
            </div>
            
            <div class="feature">
              <div class="feature__icon">💬</div>
              <h3 class="feature__title">Service dédié</h3>
              <p class="feature__description">
                Un interlocuteur unique pour répondre à toutes vos questions et besoins spécifiques.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- CTA Section -->
      <section class="section section--cta">
        <div class="container">
          <div class="cta">
            <h2 class="cta__title">Prêt à commander ?</h2>
            <p class="cta__description">
              Contactez-nous dès maintenant pour obtenir un devis personnalisé adapté à vos besoins.
            </p>
            <a href="contact.html" class="btn btn--primary btn--lg">Demander un devis</a>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <!-- Company Info -->
          <div class="footer__section">
            <div class="footer__logo">
              <img src="/images/logo.svg" alt="Weliafood" width="40" height="40">
              <span>Weliafood</span>
            </div>
            <p class="footer__description">
              Votre partenaire grossiste alimentaire de confiance. Qualité, service et réactivité au cœur de notre engagement.
            </p>
          </div>
          
          <!-- Navigation -->
          <div class="footer__section">
            <h4 class="footer__section-title">Navigation</h4>
            <ul class="footer__list">
              <li><a href="index.html" class="footer__link">Accueil</a></li>
              <li><a href="categorie.html" class="footer__link">Catalogue</a></li>
              <li><a href="a-propos.html" class="footer__link">À propos</a></li>
              <li><a href="contact.html" class="footer__link">Contact</a></li>
            </ul>
          </div>
          
          <!-- Legal -->
          <div class="footer__section">
            <h4 class="footer__section-title">Informations légales</h4>
            <ul class="footer__list">
              <li><a href="mentions-legales.html" class="footer__link">Mentions légales</a></li>
              <li><a href="cgv.html" class="footer__link">CGV</a></li>
              <li><a href="confidentialite.html" class="footer__link">Politique de confidentialité</a></li>
              <li><a href="cookies.html" class="footer__link">Gestion des cookies</a></li>
            </ul>
          </div>
          
          <!-- Contact -->
          <div class="footer__section">
            <h4 class="footer__section-title">Contact</h4>
            <address class="footer__contact">
              <p>123 Rue du Commerce<br>75001 Paris, France</p>
              <p><a href="tel:+33100000000" class="footer__link">01 00 00 00 00</a></p>
              <p><a href="mailto:contact@weliafood.com" class="footer__link">contact@weliafood.com</a></p>
            </address>
          </div>
        </div>
        
        <div class="footer__bottom">
          <p class="footer__copyright">
            © 2026 Weliafood. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  </div>

  <!-- Scripts -->
  <script type="module" src="../scripts/main.js"></script>
</body>
</html>
```

#### Page catégorie — `src/pages/categorie.html`

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Découvrez notre catalogue de produits alimentaires professionnels. Large gamme pour les restaurateurs et professionnels de la gastronomie.">
  <title>Catalogue - Weliafood</title>
  
  <link rel="icon" href="/favicon.ico" type="image/x-icon">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
  
  <link rel="stylesheet" href="../styles/tokens.css">
  <link rel="stylesheet" href="../styles/reset.css">
  <link rel="stylesheet" href="../styles/base.css">
  <link rel="stylesheet" href="../styles/layout.css">
  <link rel="stylesheet" href="../styles/components/buttons.css">
  <link rel="stylesheet" href="../styles/components/cards.css">
  <link rel="stylesheet" href="../styles/components/badges.css">
  <link rel="stylesheet" href="../styles/pages/category.css">
</head>
<body>
  <div class="page">
    <!-- Header (identique à index.html) -->
    <header class="header">
      <div class="container header__inner">
        <a href="index.html" class="header__logo">
          <img src="/images/logo.svg" alt="Weliafood" width="40" height="40">
          <span>Weliafood</span>
        </a>
        <nav class="header__nav" aria-label="Navigation principale">
          <ul class="header__nav-list">
            <li><a href="index.html" class="header__nav-link">Accueil</a></li>
            <li><a href="categorie.html" class="header__nav-link is-active">Catalogue</a></li>
            <li><a href="a-propos.html" class="header__nav-link">À propos</a></li>
            <li><a href="contact.html" class="header__nav-link">Contact</a></li>
          </ul>
        </nav>
        <div class="header__actions">
          <a href="contact.html" class="btn btn--primary btn--sm">Demander un devis</a>
          <button class="header__menu-toggle" aria-label="Ouvrir le menu" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>
      <nav class="mobile-nav" aria-label="Navigation mobile">
        <ul class="mobile-nav__list">
          <li><a href="index.html" class="mobile-nav__link">Accueil</a></li>
          <li><a href="categorie.html" class="mobile-nav__link">Catalogue</a></li>
          <li><a href="a-propos.html" class="mobile-nav__link">À propos</a></li>
          <li><a href="contact.html" class="mobile-nav__link">Contact</a></li>
        </ul>
      </nav>
    </header>

    <main class="main">
      <div class="container">
        <!-- Breadcrumbs -->
        <nav class="breadcrumbs" aria-label="Fil d'Ariane">
          <span class="breadcrumbs__item">
            <a href="index.html" class="breadcrumbs__link">Accueil</a>
            <span class="breadcrumbs__separator" aria-hidden="true">›</span>
          </span>
          <span class="breadcrumbs__item">
            <span class="breadcrumbs__current" aria-current="page">Catalogue</span>
          </span>
        </nav>
        
        <!-- Page Header -->
        <header class="page-header">
          <h1>Notre catalogue</h1>
          <p class="page-header__description">
            Découvrez notre gamme complète de produits alimentaires professionnels.
          </p>
        </header>
        
        <!-- Products Grid -->
        <section class="products-section">
          <div class="grid grid--3">
            <article class="card card--bordered">
              <div class="card__image">
                <img src="/images/products/product-1.jpg" alt="Produit 1" loading="lazy">
              </div>
              <div class="card__content">
                <span class="card__category">Catégorie exemple</span>
                <h2 class="card__title"><a href="produit-1.html">Produit 1</a></h2>
                <p class="card__description">Description du produit 1. Placeholder.</p>
                <div class="card__footer">
                  <span class="card__price">Sur devis</span>
                  <a href="produit-1.html" class="btn btn--secondary btn--sm">Voir</a>
                </div>
              </div>
            </article>
            
            <article class="card card--bordered">
              <div class="card__image">
                <img src="/images/products/product-2.jpg" alt="Produit 2" loading="lazy">
              </div>
              <div class="card__content">
                <span class="card__category">Catégorie exemple</span>
                <h2 class="card__title"><a href="produit-2.html">Produit 2</a></h2>
                <p class="card__description">Description du produit 2. Placeholder.</p>
                <div class="card__footer">
                  <span class="card__price">Sur devis</span>
                  <a href="produit-2.html" class="btn btn--secondary btn--sm">Voir</a>
                </div>
              </div>
            </article>
            
            <article class="card card--bordered">
              <div class="card__image">
                <img src="/images/products/product-3.jpg" alt="Produit 3" loading="lazy">
              </div>
              <div class="card__content">
                <span class="card__category">Catégorie exemple</span>
                <h2 class="card__title"><a href="produit-3.html">Produit 3</a></h2>
                <p class="card__description">Description du produit 3. Placeholder.</p>
                <div class="card__footer">
                  <span class="card__price">Sur devis</span>
                  <a href="produit-3.html" class="btn btn--secondary btn--sm">Voir</a>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>

    <!-- Footer (identique) -->
    <footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <div class="footer__section">
            <div class="footer__logo"><span>Weliafood</span></div>
            <p class="footer__description">Votre partenaire grossiste alimentaire de confiance.</p>
          </div>
          <div class="footer__section">
            <h4 class="footer__section-title">Navigation</h4>
            <ul class="footer__list">
              <li><a href="index.html" class="footer__link">Accueil</a></li>
              <li><a href="categorie.html" class="footer__link">Catalogue</a></li>
              <li><a href="a-propos.html" class="footer__link">À propos</a></li>
              <li><a href="contact.html" class="footer__link">Contact</a></li>
            </ul>
          </div>
          <div class="footer__section">
            <h4 class="footer__section-title">Légal</h4>
            <ul class="footer__list">
              <li><a href="mentions-legales.html" class="footer__link">Mentions légales</a></li>
              <li><a href="cgv.html" class="footer__link">CGV</a></li>
              <li><a href="confidentialite.html" class="footer__link">Confidentialité</a></li>
              <li><a href="cookies.html" class="footer__link">Cookies</a></li>
            </ul>
          </div>
          <div class="footer__section">
            <h4 class="footer__section-title">Contact</h4>
            <address class="footer__contact">
              <p>123 Rue du Commerce<br>75001 Paris</p>
              <p><a href="mailto:contact@weliafood.com" class="footer__link">contact@weliafood.com</a></p>
            </address>
          </div>
        </div>
        <div class="footer__bottom">
          <p class="footer__copyright">© 2026 Weliafood. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  </div>
  <script type="module" src="../scripts/main.js"></script>
</body>
</html>
```

#### Template fiche produit — `src/pages/produit.html` (et variantes produit-1.html, produit-2.html, produit-3.html)

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="[Nom du produit] - Découvrez les caractéristiques et spécifications de ce produit. Demandez un devis personnalisé.">
  <title>[Nom du produit] - Weliafood</title>
  
  <link rel="icon" href="/favicon.ico" type="image/x-icon">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
  
  <link rel="stylesheet" href="../styles/tokens.css">
  <link rel="stylesheet" href="../styles/reset.css">
  <link rel="stylesheet" href="../styles/base.css">
  <link rel="stylesheet" href="../styles/layout.css">
  <link rel="stylesheet" href="../styles/components/buttons.css">
  <link rel="stylesheet" href="../styles/components/badges.css">
  <link rel="stylesheet" href="../styles/pages/product.css">
</head>
<body>
  <div class="page">
    <!-- Header -->
    <header class="header">
      <div class="container header__inner">
        <a href="index.html" class="header__logo">
          <img src="/images/logo.svg" alt="Weliafood" width="40" height="40">
          <span>Weliafood</span>
        </a>
        <nav class="header__nav" aria-label="Navigation principale">
          <ul class="header__nav-list">
            <li><a href="index.html" class="header__nav-link">Accueil</a></li>
            <li><a href="categorie.html" class="header__nav-link is-active">Catalogue</a></li>
            <li><a href="a-propos.html" class="header__nav-link">À propos</a></li>
            <li><a href="contact.html" class="header__nav-link">Contact</a></li>
          </ul>
        </nav>
        <div class="header__actions">
          <a href="contact.html" class="btn btn--primary btn--sm">Demander un devis</a>
          <button class="header__menu-toggle" aria-label="Ouvrir le menu" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>
      <nav class="mobile-nav" aria-label="Navigation mobile">
        <ul class="mobile-nav__list">
          <li><a href="index.html" class="mobile-nav__link">Accueil</a></li>
          <li><a href="categorie.html" class="mobile-nav__link">Catalogue</a></li>
          <li><a href="a-propos.html" class="mobile-nav__link">À propos</a></li>
          <li><a href="contact.html" class="mobile-nav__link">Contact</a></li>
        </ul>
      </nav>
    </header>

    <main class="main">
      <div class="container">
        <!-- Breadcrumbs -->
        <nav class="breadcrumbs" aria-label="Fil d'Ariane">
          <span class="breadcrumbs__item">
            <a href="index.html" class="breadcrumbs__link">Accueil</a>
            <span class="breadcrumbs__separator" aria-hidden="true">›</span>
          </span>
          <span class="breadcrumbs__item">
            <a href="categorie.html" class="breadcrumbs__link">Catalogue</a>
            <span class="breadcrumbs__separator" aria-hidden="true">›</span>
          </span>
          <span class="breadcrumbs__item">
            <span class="breadcrumbs__current" aria-current="page">[Nom du produit]</span>
          </span>
        </nav>
        
        <!-- Product Detail -->
        <article class="product">
          <div class="product__grid">
            <!-- Image -->
            <div class="product__gallery">
              <div class="product__image-main">
                <img src="/images/products/product-1.jpg" alt="[Nom du produit]">
              </div>
            </div>
            
            <!-- Info -->
            <div class="product__info">
              <span class="badge badge--primary">Catégorie</span>
              <h1 class="product__title">[Nom du produit]</h1>
              
              <div class="product__price">
                <span class="product__price-label">Prix</span>
                <span class="product__price-value">Sur devis</span>
              </div>
              
              <div class="product__description">
                <h2>Description</h2>
                <p>
                  [Description détaillée du produit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.]
                </p>
              </div>
              
              <div class="product__specs">
                <h2>Caractéristiques</h2>
                <dl class="specs-list">
                  <dt>Conditionnement</dt>
                  <dd>[À compléter]</dd>
                  <dt>Origine</dt>
                  <dd>[À compléter]</dd>
                  <dt>Conservation</dt>
                  <dd>[À compléter]</dd>
                </dl>
              </div>
              
              <div class="product__actions">
                <a href="contact.html" class="btn btn--primary btn--lg btn--full">Demander un devis</a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <div class="footer__section">
            <div class="footer__logo"><span>Weliafood</span></div>
            <p class="footer__description">Votre partenaire grossiste alimentaire de confiance.</p>
          </div>
          <div class="footer__section">
            <h4 class="footer__section-title">Navigation</h4>
            <ul class="footer__list">
              <li><a href="index.html" class="footer__link">Accueil</a></li>
              <li><a href="categorie.html" class="footer__link">Catalogue</a></li>
              <li><a href="a-propos.html" class="footer__link">À propos</a></li>
              <li><a href="contact.html" class="footer__link">Contact</a></li>
            </ul>
          </div>
          <div class="footer__section">
            <h4 class="footer__section-title">Légal</h4>
            <ul class="footer__list">
              <li><a href="mentions-legales.html" class="footer__link">Mentions légales</a></li>
              <li><a href="cgv.html" class="footer__link">CGV</a></li>
              <li><a href="confidentialite.html" class="footer__link">Confidentialité</a></li>
              <li><a href="cookies.html" class="footer__link">Cookies</a></li>
            </ul>
          </div>
          <div class="footer__section">
            <h4 class="footer__section-title">Contact</h4>
            <address class="footer__contact">
              <p>123 Rue du Commerce<br>75001 Paris</p>
              <p><a href="mailto:contact@weliafood.com" class="footer__link">contact@weliafood.com</a></p>
            </address>
          </div>
        </div>
        <div class="footer__bottom">
          <p class="footer__copyright">© 2026 Weliafood. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  </div>
  <script type="module" src="../scripts/main.js"></script>
</body>
</html>
```

> **Note** : Dupliquer ce template pour créer `produit-1.html`, `produit-2.html`, `produit-3.html` en modifiant les placeholders.

---

### 7.6 Pages institutionnelles (stubs)

Créer les pages suivantes avec la même structure header/footer :

- `contact.html` — Formulaire de contact (utiliser les composants form)
- `a-propos.html` — Présentation de l'entreprise
- `mentions-legales.html` — Texte modèle à compléter
- `cgv.html` — Conditions générales de vente (modèle)
- `confidentialite.html` — Politique de confidentialité (modèle RGPD)
- `cookies.html` — Gestion des cookies (modèle)

#### Exemple contact.html

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Contactez Weliafood pour toute demande de devis ou d'information sur nos produits alimentaires professionnels.">
  <title>Contact - Weliafood</title>
  
  <!-- Mêmes imports CSS -->
  <link rel="stylesheet" href="../styles/tokens.css">
  <link rel="stylesheet" href="../styles/reset.css">
  <link rel="stylesheet" href="../styles/base.css">
  <link rel="stylesheet" href="../styles/layout.css">
  <link rel="stylesheet" href="../styles/components/buttons.css">
  <link rel="stylesheet" href="../styles/components/forms.css">
</head>
<body>
  <div class="page">
    <!-- Header -->
    <!-- ... (identique) ... -->

    <main class="main">
      <div class="container">
        <nav class="breadcrumbs" aria-label="Fil d'Ariane">
          <span class="breadcrumbs__item">
            <a href="index.html" class="breadcrumbs__link">Accueil</a>
            <span class="breadcrumbs__separator">›</span>
          </span>
          <span class="breadcrumbs__item">
            <span class="breadcrumbs__current" aria-current="page">Contact</span>
          </span>
        </nav>
        
        <header class="page-header">
          <h1>Contactez-nous</h1>
          <p class="page-header__description">
            Une question ? Une demande de devis ? Notre équipe est à votre écoute.
          </p>
        </header>
        
        <div class="contact-grid">
          <!-- Formulaire -->
          <section class="contact-form-section">
            <h2>Envoyez-nous un message</h2>
            <form class="contact-form" action="#" method="POST">
              <div class="form-group">
                <label for="name" class="form-label form-label--required">Nom complet</label>
                <input type="text" id="name" name="name" class="form-input" required>
              </div>
              
              <div class="form-group">
                <label for="email" class="form-label form-label--required">Email</label>
                <input type="email" id="email" name="email" class="form-input" required>
              </div>
              
              <div class="form-group">
                <label for="phone" class="form-label">Téléphone</label>
                <input type="tel" id="phone" name="phone" class="form-input">
              </div>
              
              <div class="form-group">
                <label for="subject" class="form-label form-label--required">Sujet</label>
                <select id="subject" name="subject" class="form-select" required>
                  <option value="">Sélectionnez un sujet</option>
                  <option value="devis">Demande de devis</option>
                  <option value="info">Information produit</option>
                  <option value="partenariat">Partenariat</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="message" class="form-label form-label--required">Message</label>
                <textarea id="message" name="message" class="form-textarea" rows="5" required></textarea>
              </div>
              
              <div class="form-group">
                <div class="form-check">
                  <input type="checkbox" id="consent" name="consent" class="form-check-input" required>
                  <label for="consent" class="form-check-label">
                    J'accepte que mes données soient utilisées pour traiter ma demande conformément à la 
                    <a href="confidentialite.html">politique de confidentialité</a>.
                  </label>
                </div>
              </div>
              
              <button type="submit" class="btn btn--primary btn--lg">Envoyer le message</button>
            </form>
          </section>
          
          <!-- Coordonnées -->
          <aside class="contact-info-section">
            <h2>Nos coordonnées</h2>
            <address>
              <p><strong>Weliafood</strong></p>
              <p>123 Rue du Commerce<br>75001 Paris, France</p>
              <p>Tél : <a href="tel:+33100000000">01 00 00 00 00</a></p>
              <p>Email : <a href="mailto:contact@weliafood.com">contact@weliafood.com</a></p>
            </address>
            
            <h3>Horaires</h3>
            <p>Lundi - Vendredi : 9h - 18h<br>Samedi - Dimanche : Fermé</p>
          </aside>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <!-- ... (identique) ... -->
  </div>
  <script type="module" src="../scripts/main.js"></script>
</body>
</html>
```

---

### 7.7 JavaScript minimal

#### `src/scripts/main.js`

```javascript
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
```

#### `src/scripts/navigation.js`

```javascript
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
```

---

### 7.8 Styles spécifiques aux pages

#### `src/styles/pages/home.css`

```css
/**
 * HOME PAGE STYLES
 */

/* Hero Section */
.hero {
  padding: var(--space-16) 0;
  background: linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-bg-primary) 100%);
}

.hero__content {
  max-width: 720px;
}

.hero__title {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--space-6);
}

.hero__description {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-8);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
}

@media (min-width: 768px) {
  .hero {
    padding: var(--space-24) 0;
  }
  
  .hero__title {
    font-size: var(--font-size-5xl);
  }
}

/* Features */
.feature {
  text-align: center;
  padding: var(--space-6);
}

.feature__icon {
  font-size: 3rem;
  margin-bottom: var(--space-4);
}

.feature__title {
  font-size: var(--font-size-xl);
  margin-bottom: var(--space-3);
}

.feature__description {
  color: var(--color-text-secondary);
}

/* Section Footer */
.section__footer {
  text-align: center;
  margin-top: var(--space-10);
}

/* CTA Section */
.section--cta {
  background-color: var(--color-primary-600);
  color: var(--color-text-inverse);
}

.cta {
  text-align: center;
  max-width: 640px;
  margin: 0 auto;
}

.cta__title {
  color: var(--color-text-inverse);
  margin-bottom: var(--space-4);
}

.cta__description {
  color: var(--color-primary-100);
  margin-bottom: var(--space-8);
}

.section--cta .btn--primary {
  background-color: var(--color-neutral-0);
  color: var(--color-primary-700);
  border-color: var(--color-neutral-0);
}

.section--cta .btn--primary:hover {
  background-color: var(--color-primary-50);
}
```

#### `src/styles/pages/category.css`

```css
/**
 * CATEGORY PAGE STYLES
 */

.page-header {
  margin-bottom: var(--space-10);
}

.page-header__description {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  max-width: 640px;
}

.products-section {
  margin-bottom: var(--space-12);
}
```

#### `src/styles/pages/product.css`

```css
/**
 * PRODUCT PAGE STYLES
 */

.product__grid {
  display: grid;
  gap: var(--space-10);
}

@media (min-width: 1024px) {
  .product__grid {
    grid-template-columns: 1fr 1fr;
  }
}

.product__gallery {
  position: sticky;
  top: var(--space-24);
}

.product__image-main {
  aspect-ratio: 1;
  border-radius: var(--radius-xl);
  overflow: hidden;
  background-color: var(--color-bg-secondary);
}

.product__image-main img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product__info {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.product__title {
  font-size: var(--font-size-3xl);
  margin-bottom: 0;
}

.product__price {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.product__price-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.product__price-value {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-700);
}

.product__description h2,
.product__specs h2 {
  font-size: var(--font-size-lg);
  margin-bottom: var(--space-3);
}

.specs-list {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--space-2) var(--space-4);
}

.specs-list dt {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
}

.specs-list dd {
  color: var(--color-text-primary);
}

.product__actions {
  margin-top: var(--space-4);
}
```

#### `src/styles/pages/legal.css`

```css
/**
 * LEGAL PAGES STYLES
 * (Mentions légales, CGV, Confidentialité, Cookies)
 */

.legal-content {
  max-width: 800px;
  margin: 0 auto;
}

.legal-content h2 {
  margin-top: var(--space-10);
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-border-light);
}

.legal-content h2:first-of-type {
  margin-top: 0;
  padding-top: 0;
  border-top: none;
}

.legal-content p,
.legal-content li {
  color: var(--color-text-secondary);
}

.legal-content ul,
.legal-content ol {
  margin-bottom: var(--space-6);
}

.legal-notice {
  background-color: var(--color-bg-secondary);
  padding: var(--space-6);
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-8);
}

.legal-notice p {
  margin-bottom: 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}
```

---

## 8. CI/CD GitHub Pages

### Workflow GitHub Actions — `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  # Job de build
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint || true  # Continue même si lint échoue (optionnel)

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  # Job de déploiement (uniquement sur main)
  deploy:
    if: github.ref == 'refs/heads/main'
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Configuration GitHub Pages

1. Aller dans **Settings** > **Pages**
2. Source : **GitHub Actions**
3. Le workflow se déclenche automatiquement

### Vérification post-déploiement

```bash
# URL à vérifier (remplacer [USERNAME])
# https://[username].github.io/weliafood-prototype/

# Checklist :
# ✅ Page d'accueil charge
# ✅ Assets (images, CSS, JS) chargent
# ✅ Navigation fonctionne
# ✅ Toutes les pages accessibles
# ✅ Pas d'erreurs console
```

---

## 9. Checklist QA

### Responsive Design

| Breakpoint | Test | Statut |
|------------|------|--------|
| Mobile (320px) | Layout correct, menu hamburger visible | ⬜ |
| Mobile (375px) | Textes lisibles, boutons cliquables | ⬜ |
| Tablet (768px) | Grid 2 colonnes, navigation adaptée | ⬜ |
| Desktop (1024px) | Navigation complète visible | ⬜ |
| Desktop (1280px+) | Conteneur centré, espaces corrects | ⬜ |

### Accessibilité minimale

| Critère | Test | Statut |
|---------|------|--------|
| Focus visible | Tab à travers tous les éléments interactifs | ⬜ |
| Labels formulaires | Chaque input a un label associé | ⬜ |
| Alt images | Toutes les images ont un attribut alt | ⬜ |
| Contrastes | Texte lisible (ratio minimum 4.5:1) | ⬜ |
| Navigation clavier | Tous les liens/boutons accessibles au clavier | ⬜ |
| Skip link | (Optionnel) Lien "Aller au contenu" | ⬜ |
| ARIA landmarks | header, nav, main, footer présents | ⬜ |

### Liens et navigation

| Test | Statut |
|------|--------|
| Tous les liens internes fonctionnent | ⬜ |
| Pas de liens cassés (404) | ⬜ |
| Logo renvoie vers accueil | ⬜ |
| Breadcrumbs corrects sur chaque page | ⬜ |
| Menu mobile ouvre/ferme correctement | ⬜ |

### Build et déploiement

| Test | Statut |
|------|--------|
| `npm install` sans erreur | ⬜ |
| `npm run dev` lance le serveur | ⬜ |
| `npm run build` génère /dist | ⬜ |
| `npm run preview` fonctionne | ⬜ |
| Push sur main déclenche le workflow | ⬜ |
| Site accessible via GitHub Pages URL | ⬜ |

### Structure SEO

| Test | Statut |
|------|--------|
| 1 seul H1 par page | ⬜ |
| Hiérarchie H2/H3 logique | ⬜ |
| Balise title unique par page | ⬜ |
| Meta description présente | ⬜ |
| HTML sémantique (header, nav, main, section, article, footer) | ⬜ |

---

## 10. Notes handoff WordPress

### Ce qui doit être reproduit

| Élément | Description | Template WP/Woo suggéré |
|---------|-------------|------------------------|
| **Structure HTML** | Hiérarchie header/main/footer, sections | Theme structure |
| **Navigation** | Items menu principal + mobile | `wp_nav_menu()` |
| **Header** | Logo + nav + CTA | `header.php` |
| **Footer** | 4 colonnes (info, nav, légal, contact) | `footer.php` |
| **Page Accueil** | Hero, produits phares, features, CTA | `front-page.php` |
| **Page Catégorie** | Liste produits en grid | WooCommerce `archive-product.php` |
| **Fiche produit** | Galerie + info + specs | WooCommerce `single-product.php` |
| **Page Contact** | Formulaire + coordonnées | `page-contact.php` + plugin form |
| **Pages légales** | Contenu texte structuré | `page.php` ou templates dédiés |
| **Breadcrumbs** | Navigation fil d'Ariane | Plugin ou Yoast SEO |
| **Cards produit** | Design des vignettes | WooCommerce templates |
| **Boutons** | Styles primary/secondary | CSS theme |
| **Formulaires** | Styles inputs | CSS theme |

### Ce qui n'est PAS contractuel

- ❌ **Pixel-perfect** : Le prototype est une référence de structure, pas une maquette finale
- ❌ **Interactions complexes** : Le JS est minimal, WP aura ses propres interactions
- ❌ **Fonctionnalités e-commerce** : Pas de panier, checkout, comptes — WooCommerce gère
- ❌ **CMS dynamique** : Contenu en dur → sera géré par WordPress
- ❌ **SEO avancé** : Meta tags basiques seulement, optimisation en Sprint 4

### Mapping CSS → WordPress

```
src/styles/tokens.css     → theme/assets/css/variables.css (ou dans style.css)
src/styles/components/*   → theme/assets/css/components/
src/styles/layout.css     → theme/assets/css/layout.css
src/styles/pages/*        → theme/assets/css/pages/ (si nécessaire)
```

### Recommandations intégration

1. **Conserver les design tokens** : Migrer les variables CSS dans le thème WordPress
2. **Adapter les composants** : Button, Card, Form peuvent être réutilisés avec modifications mineures
3. **WooCommerce** : Surcharger les templates par défaut avec la structure HTML du prototype
4. **Menu** : Utiliser `wp_nav_menu()` avec les classes CSS du prototype
5. **Formulaire contact** : Utiliser Contact Form 7 ou WPForms avec styles custom
6. **Pages légales** : Créer des pages WordPress classiques avec le contenu finalisé

---

## Annexe A — Commandes récapitulatives

```bash
# === SETUP INITIAL ===
mkdir weliafood-prototype && cd weliafood-prototype
git init && git branch -M main
npm init -y
npm install --save-dev vite prettier eslint eslint-plugin-html

# === STRUCTURE ===
mkdir -p src/{pages,components,styles/components,styles/pages,scripts}
mkdir -p public/{images/products,fonts}
mkdir -p docs .github/workflows

# === DÉVELOPPEMENT ===
npm run dev          # Serveur local avec hot reload

# === BUILD ===
npm run build        # Génère /dist
npm run preview      # Preview du build

# === QUALITÉ ===
npm run lint         # Vérification code
npm run format       # Formatage Prettier

# === GIT ===
git add .
git commit -m "feat: initial project setup"
git push -u origin main
```

---

## Annexe B — Ressources

- [Vite Documentation](https://vitejs.dev/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [MDN Web Docs - Accessibilité](https://developer.mozilla.org/fr/docs/Web/Accessibility)
- [Google Fonts](https://fonts.google.com/)
- [CSS Variables - MDN](https://developer.mozilla.org/fr/docs/Web/CSS/Using_CSS_custom_properties)

---

**Fin du document — Sprint 1 Implementation Guide**
