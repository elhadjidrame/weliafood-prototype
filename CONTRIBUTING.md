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
