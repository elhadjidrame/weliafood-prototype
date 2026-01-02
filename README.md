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

- **Production** : https://elhadjidrame.github.io/weliafood-prototype/
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
