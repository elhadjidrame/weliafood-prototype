# Sprint 2 Implementation Guide — Weliafood Prototype

> **Version** : 1.0  
> **Date** : Janvier 2026  
> **Prérequis** : Sprint 1 complété (socle technique en place)  
> **Focus** : Contenus, UX, SEO on-page, cohérence métier  
> **Cible** : Développeur, rédacteur ou LLM — Guide séquentiel et exécutable

---

## Table des matières

1. [Objectifs Sprint 2 & Definition of Done](#1-objectifs-sprint-2--definition-of-done)
2. [Périmètre exact](#2-périmètre-exact)
3. [Parcours utilisateur cible](#3-parcours-utilisateur-cible)
4. [Guide page par page](#4-guide-page-par-page)
5. [Règles SEO on-page Sprint 2](#5-règles-seo-on-page-sprint-2)
6. [Règles UX & conversion](#6-règles-ux--conversion)
7. [Checklist finale de validation](#7-checklist-finale-de-validation)
8. [Notes de continuité vers Sprint 3](#8-notes-de-continuité-vers-sprint-3)

---

## 1. Objectifs Sprint 2 & Definition of Done

### Objectifs

Transformer le socle technique Sprint 1 en **prototype crédible et orienté business** :

| Objectif | Description |
|----------|-------------|
| **Crédibilité** | Un visiteur pro perçoit un site de grossiste alimentaire sérieux |
| **Compréhension** | Le parcours est évident sans explication |
| **Validation client** | Le prototype peut être présenté et discuté |
| **Base SEO** | Structure prête pour optimisation future |
| **Handoff WordPress** | Contenus et structure servent de référence |

### Ce que Sprint 2 n'est PAS

- ❌ Pas de fonctionnalités e-commerce (panier, paiement, comptes)
- ❌ Pas d'intégration WordPress
- ❌ Pas de tracking/analytics (GTM, pixels)
- ❌ Pas de SEO technique avancé (sitemap, schema.org, vitesse)
- ❌ Pas de contenus juridiques validés (textes modèles uniquement)

### Definition of Done Sprint 2

| Critère | Validation | Statut |
|---------|------------|--------|
| Parcours utilisateur fluide | Accueil → Catégorie → Produit → Contact en < 3 clics | ⬜ |
| Contenus rédigés | Toutes les pages du périmètre ont du contenu réel | ⬜ |
| Crédibilité B2B | Discours pro, éléments de rassurance présents | ⬜ |
| SEO on-page | 1 H1/page, titles uniques, metas rédigées | ⬜ |
| Maillage interne | Liens entre Accueil ↔ Catégorie ↔ Produits ↔ Contact | ⬜ |
| Mobile-first | Contenus lisibles et CTA accessibles sur mobile | ⬜ |
| Présentation client | Peut être montré sans explication technique | ⬜ |
| Honnêteté | Aucun bouton "Ajouter au panier" ou fausse promesse | ⬜ |

---

## 2. Périmètre exact

### Pages INCLUSES (contenu à finaliser)

| Page | Fichier | Priorité | Statut |
|------|---------|----------|--------|
| Accueil | `index.html` | P0 | ⬜ |
| Catégorie (Épicerie fine) | `categorie.html` | P0 | ⬜ |
| Fiche Produit 1 (Huile d'olive premium) | `produit-1.html` | P0 | ⬜ |
| Fiche Produit 2 (Vinaigre balsamique) | `produit-2.html` | P0 | ⬜ |
| Fiche Produit 3 (Pâtes artisanales) | `produit-3.html` | P1 | ⬜ |
| Contact / Devis | `contact.html` | P0 | ⬜ |
| À propos | `a-propos.html` | P1 | ⬜ |

### Pages EXCLUES du Sprint 2 (textes modèles conservés)

| Page | Fichier | Raison |
|------|---------|--------|
| Mentions légales | `mentions-legales.html` | Validation juridique ultérieure |
| CGV | `cgv.html` | Validation juridique ultérieure |
| Confidentialité | `confidentialite.html` | Validation juridique ultérieure |
| Cookies | `cookies.html` | Validation juridique ultérieure |

### Éléments transversaux à mettre à jour

| Élément | Action |
|---------|--------|
| Header | Vérifier cohérence navigation |
| Footer | Ajouter éléments de rassurance (téléphone visible) |
| Breadcrumbs | Textes cohérents avec les pages |

---

## 3. Parcours utilisateur cible

### Persona principal

**Chef d'entreprise / Responsable achats** d'un établissement de restauration (restaurant, hôtel, traiteur, collectivité) cherchant un fournisseur grossiste fiable.

**Besoins** :
- Comprendre rapidement l'offre
- Évaluer la crédibilité du fournisseur
- Voir des produits concrets
- Obtenir un devis personnalisé

### Parcours principal (happy path)

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   ACCUEIL   │───▶│  CATÉGORIE  │───▶│   PRODUIT   │───▶│   CONTACT   │
│             │    │             │    │             │    │   /DEVIS    │
│ Comprendre  │    │ Explorer    │    │ Évaluer     │    │ Convertir   │
│ l'offre     │    │ la gamme    │    │ un produit  │    │             │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
      │                                      │
      │            ┌─────────────┐           │
      └───────────▶│  À PROPOS   │◀──────────┘
                   │             │
                   │ Rassurer    │
                   └─────────────┘
```

### Parcours secondaires

| Entrée | Parcours | Objectif |
|--------|----------|----------|
| Recherche Google "grossiste huile olive" | Produit → Contact | Conversion directe |
| Recherche "grossiste alimentaire [ville]" | Accueil → À propos → Contact | Rassurance locale |
| Visite directe (carte de visite) | Accueil → Catégorie → Produits | Découverte offre |

### Règle des 3 clics

Depuis n'importe quelle page, l'utilisateur doit pouvoir :
- Revenir à l'accueil : **1 clic** (logo)
- Accéder au contact : **1 clic** (CTA header ou footer)
- Voir un produit : **2 clics max** (Catalogue → Produit)

---

## 4. Guide page par page

---

### 4.1 PAGE ACCUEIL (`index.html`)

#### Objectif de la page

Convaincre en **10 secondes** que Weliafood est un grossiste alimentaire professionnel crédible, et orienter vers l'action (explorer ou contacter).

#### Structure attendue

```
┌────────────────────────────────────────────────────────────────┐
│ HEADER (navigation + CTA "Demander un devis")                  │
├────────────────────────────────────────────────────────────────┤
│ HERO                                                           │
│ • H1 : Proposition de valeur principale                        │
│ • Sous-titre : Cible + bénéfice clé                           │
│ • 2 CTA : "Découvrir nos produits" + "Demander un devis"      │
├────────────────────────────────────────────────────────────────┤
│ SECTION : NOS CATÉGORIES / NOTRE GAMME                        │
│ • H2 : Titre section                                          │
│ • 3-4 cards catégories (avec images)                          │
│ • Lien "Voir tout le catalogue"                               │
├────────────────────────────────────────────────────────────────┤
│ SECTION : PRODUITS PHARES                                      │
│ • H2 : Titre section                                          │
│ • 3 cards produits (bestsellers)                              │
├────────────────────────────────────────────────────────────────┤
│ SECTION : POURQUOI NOUS CHOISIR                               │
│ • H2 : Titre section                                          │
│ • 3-4 arguments différenciants (icône + titre + texte)        │
├────────────────────────────────────────────────────────────────┤
│ SECTION : À PROPOS (résumé)                                   │
│ • H2 : Titre section                                          │
│ • Texte court + lien "En savoir plus"                         │
├────────────────────────────────────────────────────────────────┤
│ SECTION : CTA FINAL                                           │
│ • H2 : Incitation à l'action                                  │
│ • Bouton "Demander un devis"                                  │
├────────────────────────────────────────────────────────────────┤
│ FOOTER                                                         │
└────────────────────────────────────────────────────────────────┘
```

#### Hiérarchie Hn

```
H1: Votre grossiste alimentaire de confiance pour les professionnels
  H2: Notre gamme de produits
  H2: Nos produits phares
  H2: Pourquoi choisir Weliafood
  H2: Une entreprise à votre service
  H2: Prêt à commander ?
```

#### Contenu attendu

**HERO**

```html
<h1>Votre grossiste alimentaire de confiance pour les professionnels</h1>
<p class="hero__subtitle">
  Produits d'épicerie fine, huiles, vinaigres et pâtes artisanales 
  pour restaurants, hôtels et traiteurs. Livraison France entière.
</p>
```

**Critères du H1** :
- Contient "grossiste alimentaire" (mot-clé principal)
- Mentionne "professionnels" (cible B2B)
- < 70 caractères idéalement

**SECTION GAMME**

| Catégorie | Image | Description courte |
|-----------|-------|-------------------|
| Huiles & Vinaigres | Bouteilles huile olive | Huiles d'olive premium, vinaigres balsamiques et spécialités |
| Pâtes & Riz | Pâtes artisanales | Pâtes italiennes artisanales, riz et céréales de qualité |
| Épices & Condiments | Bocaux épices | Épices du monde, sauces et condiments professionnels |
| Conserves & Bocaux | Conserves premium | Légumes, poissons et préparations en conserve |

**SECTION ARGUMENTS (Pourquoi nous choisir)**

| Argument | Titre | Description |
|----------|-------|-------------|
| 🚚 | Livraison rapide | Expédition sous 24-48h pour toute commande passée avant 14h. Livraison France métropolitaine. |
| ✨ | Qualité sélectionnée | Produits sourcés directement auprès de producteurs certifiés. Traçabilité garantie. |
| 📦 | Conditionnements pros | Formats adaptés aux volumes professionnels. Du carton unitaire à la palette. |
| 💬 | Conseiller dédié | Un interlocuteur unique pour vos commandes, devis et questions techniques. |

**SECTION À PROPOS (résumé)**

```
Depuis [année], Weliafood accompagne les professionnels de la restauration 
avec une gamme de produits alimentaires de qualité. Basés en [région], 
nous livrons partout en France avec un engagement : qualité, réactivité, proximité.
```

#### SEO — Title & Meta

```html
<title>Weliafood | Grossiste Alimentaire pour Professionnels - Épicerie Fine</title>
<meta name="description" content="Grossiste alimentaire pour restaurants, hôtels et traiteurs. Huiles d'olive, vinaigres balsamiques, pâtes artisanales. Livraison France entière. Demandez votre devis.">
```

**Règles** :
- Title : 50-60 caractères, mot-clé principal en début
- Meta description : 150-160 caractères, incitation à l'action

#### CTA

| Position | Type | Texte | Destination |
|----------|------|-------|-------------|
| Hero | Primary | Découvrir nos produits | `categorie.html` |
| Hero | Secondary | Demander un devis | `contact.html` |
| Section produits | Link | Voir tous nos produits | `categorie.html` |
| Section finale | Primary | Demander un devis | `contact.html` |
| Header | Primary (small) | Demander un devis | `contact.html` |

#### Erreurs à éviter

| ❌ Ne pas faire | ✅ Faire |
|----------------|---------|
| "Bienvenue sur notre site" | Proposition de valeur directe |
| Slider avec 5 images | Hero statique avec message clair |
| "Cliquez ici" | "Découvrir nos produits" |
| Texte générique sans cible | Mentionner "professionnels", "restaurants" |
| CTA "Acheter" ou "Ajouter au panier" | CTA "Demander un devis" |

---

### 4.2 PAGE CATÉGORIE (`categorie.html`)

#### Objectif de la page

Présenter la gamme de produits d'une catégorie, permettre la comparaison rapide, et guider vers les fiches produits.

#### Structure attendue

```
┌────────────────────────────────────────────────────────────────┐
│ HEADER                                                         │
├────────────────────────────────────────────────────────────────┤
│ BREADCRUMBS : Accueil > Catalogue > Épicerie Fine              │
├────────────────────────────────────────────────────────────────┤
│ EN-TÊTE CATÉGORIE                                              │
│ • H1 : Nom de la catégorie                                    │
│ • Description de la catégorie (2-3 phrases)                   │
│ • Nombre de produits (optionnel)                              │
├────────────────────────────────────────────────────────────────┤
│ GRILLE PRODUITS                                                │
│ • Cards produits (image + nom + description + CTA)            │
│ • 3 colonnes desktop / 1-2 mobile                             │
├────────────────────────────────────────────────────────────────┤
│ SECTION : BESOIN D'UN CONSEIL ?                               │
│ • Texte court + CTA contact                                   │
├────────────────────────────────────────────────────────────────┤
│ FOOTER                                                         │
└────────────────────────────────────────────────────────────────┘
```

#### Hiérarchie Hn

```
H1: Épicerie Fine — Huiles, Vinaigres & Pâtes Artisanales
  H2: [Implicite dans les cards : noms des produits sont des liens, pas des H2]
  H2: Besoin d'un conseil personnalisé ?
```

**Note** : Les noms de produits dans les cards sont des `<h2>` ou des `<h3>` selon le design. Ici, utiliser `<h2>` car ce sont les sous-sections principales.

#### Contenu attendu

**EN-TÊTE CATÉGORIE**

```html
<h1>Épicerie Fine — Huiles, Vinaigres & Pâtes Artisanales</h1>
<p class="category-intro">
  Découvrez notre sélection de produits d'épicerie fine pour professionnels. 
  Huiles d'olive extra vierge, vinaigres balsamiques de Modène, pâtes italiennes 
  artisanales : des ingrédients premium pour sublimer vos créations culinaires.
</p>
```

**CARDS PRODUITS**

Chaque card contient :

| Élément | Contenu |
|---------|---------|
| Image | Photo produit sur fond neutre |
| Badge (optionnel) | "Bestseller" ou "Nouveau" |
| Catégorie | Sous-catégorie (ex: "Huiles") |
| Titre (H2) | Nom du produit |
| Description | 1-2 phrases, bénéfice clé |
| Prix | "Sur devis" ou fourchette indicative |
| CTA | "Voir le produit" → lien vers fiche |

**Exemple card** :

```
┌─────────────────────────┐
│ [IMAGE HUILE OLIVE]     │
│                         │
│ Huiles                  │ ← catégorie (petit, couleur accent)
│ Huile d'Olive Extra     │ ← H2 (titre cliquable)
│ Vierge Premium          │
│                         │
│ Huile d'olive italienne │ ← description
│ première pression à     │
│ froid. Idéale pour...   │
│                         │
│ Sur devis               │ ← prix
│ [Voir le produit]       │ ← CTA secondaire
└─────────────────────────┘
```

**SECTION CONSEIL**

```html
<h2>Besoin d'un conseil personnalisé ?</h2>
<p>
  Notre équipe est à votre disposition pour vous aider à choisir les produits 
  adaptés à votre établissement et vos volumes.
</p>
<a href="contact.html" class="btn btn--primary">Nous contacter</a>
```

#### SEO — Title & Meta

```html
<title>Épicerie Fine Pro | Huiles, Vinaigres, Pâtes - Weliafood</title>
<meta name="description" content="Grossiste épicerie fine pour professionnels : huiles d'olive premium, vinaigres balsamiques, pâtes artisanales italiennes. Livraison France. Devis gratuit.">
```

#### CTA

| Position | Type | Texte | Destination |
|----------|------|-------|-------------|
| Card produit | Secondary | Voir le produit | `produit-X.html` |
| Section conseil | Primary | Nous contacter | `contact.html` |

#### Erreurs à éviter

| ❌ Ne pas faire | ✅ Faire |
|----------------|---------|
| Liste sans images | Cards visuelles avec photos |
| "Produit 1", "Produit 2" | Noms descriptifs réels |
| Prix exacts (faux) | "Sur devis" ou fourchette |
| Pagination complexe | Tous les produits visibles (prototype) |
| Filtres non fonctionnels | Pas de filtres ou mentionner "à venir" |

---

### 4.3 FICHE PRODUIT (`produit-1.html`, `produit-2.html`, `produit-3.html`)

#### Objectif de la page

Convaincre le professionnel que ce produit répond à ses besoins, et l'inciter à demander un devis.

#### Structure attendue

```
┌────────────────────────────────────────────────────────────────┐
│ HEADER                                                         │
├────────────────────────────────────────────────────────────────┤
│ BREADCRUMBS : Accueil > Épicerie Fine > Huile d'Olive Premium │
├────────────────────────────────────────────────────────────────┤
│ SECTION PRODUIT (2 colonnes)                                   │
│ ┌─────────────────┬──────────────────────────────────────────┐│
│ │ GALERIE IMAGE   │ INFORMATIONS PRODUIT                     ││
│ │                 │ • Badge catégorie                        ││
│ │ [Photo grande]  │ • H1 : Nom du produit                   ││
│ │                 │ • Prix : "Sur devis"                    ││
│ │                 │ • Description courte (2-3 phrases)      ││
│ │                 │ • CTA : "Demander un devis"             ││
│ │                 │ • Infos : conditionnement, origine      ││
│ └─────────────────┴──────────────────────────────────────────┘│
├────────────────────────────────────────────────────────────────┤
│ SECTION : DESCRIPTION DÉTAILLÉE                               │
│ • H2 : Description                                            │
│ • Texte long (3-4 paragraphes)                               │
│ • Cas d'usage professionnels                                 │
├────────────────────────────────────────────────────────────────┤
│ SECTION : CARACTÉRISTIQUES                                    │
│ • H2 : Caractéristiques techniques                           │
│ • Tableau ou liste structurée                                │
├────────────────────────────────────────────────────────────────┤
│ SECTION : PRODUITS ASSOCIÉS (optionnel)                       │
│ • H2 : Vous pourriez aussi aimer                             │
│ • 2-3 cards produits                                         │
├────────────────────────────────────────────────────────────────┤
│ SECTION : CTA FINAL                                           │
│ • Incitation + bouton devis                                  │
├────────────────────────────────────────────────────────────────┤
│ FOOTER                                                         │
└────────────────────────────────────────────────────────────────┘
```

#### Hiérarchie Hn

```
H1: Huile d'Olive Extra Vierge Premium — Italie
  H2: Description
  H2: Caractéristiques techniques
  H2: Produits associés (optionnel)
  H2: Intéressé par ce produit ?
```

#### Contenu attendu — PRODUIT 1 : Huile d'Olive

**Informations principales**

| Champ | Contenu |
|-------|---------|
| Catégorie | Huiles & Vinaigres |
| H1 | Huile d'Olive Extra Vierge Premium — Italie |
| Prix | Sur devis (tarif selon volume) |
| Description courte | Huile d'olive italienne de première pression à froid. Fruité vert intense, idéale pour assaisonnements et finitions. |

**Description longue**

```
Notre huile d'olive extra vierge premium provient des oliveraies des Pouilles, 
dans le sud de l'Italie. Récoltées à la main et pressées dans les 24 heures, 
les olives Coratina donnent une huile au caractère affirmé.

**Profil gustatif** : Fruité vert intense avec des notes d'artichaut et d'herbe 
fraîche. Finale légèrement poivrée, signe d'une haute teneur en polyphénols.

**Utilisations professionnelles** :
- Assaisonnement de salades, carpaccios et tartares
- Finition de plats chauds (pâtes, risottos, grillades)
- Base pour vinaigrettes et marinades premium
- Présentation en salle (service à table)

**Pourquoi choisir cette huile** : Son profil gustatif prononcé permet de 
sublimer vos créations avec une petite quantité. Conditionnée en bidons 
professionnels de 5L, elle offre un excellent rapport qualité-prix pour 
les établissements exigeants.
```

**Caractéristiques techniques**

| Caractéristique | Valeur |
|-----------------|--------|
| Origine | Italie (Pouilles) |
| Variété | Coratina |
| Extraction | Première pression à froid |
| Acidité | < 0.3% |
| Conditionnement | Bidon 5L / Carton de 4 bidons |
| Conservation | 18 mois (à l'abri de la lumière) |
| Certifications | Agriculture biologique (optionnel) |

**SEO — Title & Meta**

```html
<title>Huile d'Olive Extra Vierge Premium Italie | Grossiste - Weliafood</title>
<meta name="description" content="Huile d'olive extra vierge italienne pour professionnels. Première pression à froid, fruité intense. Bidons 5L. Livraison France. Demandez votre devis.">
```

---

#### Contenu attendu — PRODUIT 2 : Vinaigre Balsamique

**Informations principales**

| Champ | Contenu |
|-------|---------|
| Catégorie | Huiles & Vinaigres |
| H1 | Vinaigre Balsamique de Modène IGP — Vieilli 3 ans |
| Prix | Sur devis (tarif selon volume) |
| Description courte | Vinaigre balsamique traditionnel de Modène, vieilli 3 ans en fûts de chêne. Équilibre parfait entre douceur et acidité. |

**Description longue**

```
Ce vinaigre balsamique de Modène IGP est élaboré selon les méthodes 
traditionnelles de l'Émilie-Romagne. Le moût de raisin Trebbiano est cuit 
lentement puis vieilli pendant 3 ans dans une succession de fûts de bois 
différents (chêne, châtaignier, cerisier).

**Profil gustatif** : Robe brune profonde, texture sirupeuse. Notes de fruits 
mûrs, caramel et bois subtil. Acidité équilibrée (6%) permettant une utilisation 
polyvalente.

**Utilisations professionnelles** :
- Réductions pour sauces et glaçages
- Assaisonnement de salades, légumes grillés
- Finition de viandes et poissons
- Desserts (fraises, glaces, panna cotta)
- Présentations gastronomiques

**Pourquoi choisir ce vinaigre** : L'appellation IGP garantit une production 
dans la région de Modène selon un cahier des charges strict. Le vieillissement 
de 3 ans offre un excellent compromis entre complexité aromatique et prix 
accessible pour un usage quotidien en cuisine professionnelle.
```

**Caractéristiques techniques**

| Caractéristique | Valeur |
|-----------------|--------|
| Origine | Italie (Modène, Émilie-Romagne) |
| Appellation | IGP (Indication Géographique Protégée) |
| Vieillissement | 3 ans minimum |
| Acidité | 6% |
| Densité | 1.12 |
| Conditionnement | Bouteille 500ml / Carton de 12 |
| Conservation | 5 ans (après ouverture : 12 mois) |

**SEO — Title & Meta**

```html
<title>Vinaigre Balsamique de Modène IGP 3 ans | Grossiste - Weliafood</title>
<meta name="description" content="Vinaigre balsamique de Modène IGP vieilli 3 ans pour professionnels. Traditionnel italien, texture sirupeuse. Cartons de 12. Demandez votre devis.">
```

---

#### Contenu attendu — PRODUIT 3 : Pâtes Artisanales

**Informations principales**

| Champ | Contenu |
|-------|---------|
| Catégorie | Pâtes & Riz |
| H1 | Pâtes Artisanales Italiennes — Penne Rigate Bronze |
| Prix | Sur devis (tarif selon volume) |
| Description courte | Pâtes sèches artisanales tréfilées au bronze. Semoule de blé dur italien, séchage lent. Texture rugueuse idéale pour accrocher les sauces. |

**Description longue**

```
Nos penne rigate artisanales sont fabriquées en Italie selon les méthodes 
traditionnelles. La semoule de blé dur 100% italien est tréfilée à travers 
des moules en bronze, puis séchée lentement à basse température pendant 48h.

**Profil produit** : Couleur jaune pâle naturelle (sans colorant), surface 
rugueuse et poreuse caractéristique du tréfilage bronze. Tenue parfaite à 
la cuisson, texture al dente.

**Utilisations professionnelles** :
- Pâtes en sauce (tomate, crème, pesto)
- Salades de pâtes froides
- Gratins et timbales
- Accompagnement de plats en sauce

**Pourquoi choisir ces pâtes** : Le tréfilage bronze crée une surface poreuse 
qui accroche naturellement les sauces, contrairement aux pâtes industrielles 
lisses. Le séchage lent préserve les qualités nutritionnelles et gustatives 
du blé. Format penne rigate polyvalent, adapté à tous types de préparations.
```

**Caractéristiques techniques**

| Caractéristique | Valeur |
|-----------------|--------|
| Origine | Italie (Campanie) |
| Ingrédients | Semoule de blé dur |
| Tréfilage | Bronze |
| Séchage | Lent (48h à basse température) |
| Cuisson | 11-13 minutes |
| Conditionnement | Sachet 1kg / Carton de 12 sachets |
| Conservation | 24 mois |
| Allergènes | Gluten |

**SEO — Title & Meta**

```html
<title>Pâtes Artisanales Penne Rigate Bronze Italie | Grossiste - Weliafood</title>
<meta name="description" content="Pâtes artisanales italiennes tréfilées au bronze pour professionnels. Penne rigate, semoule de blé dur, séchage lent. Cartons de 12kg. Devis gratuit.">
```

---

#### CTA (toutes fiches produits)

| Position | Type | Texte | Destination |
|----------|------|-------|-------------|
| Zone produit | Primary | Demander un devis | `contact.html` |
| Section finale | Primary | Demander un devis pour ce produit | `contact.html` |
| Produits associés | Secondary | Voir le produit | `produit-X.html` |

#### Erreurs à éviter (fiches produits)

| ❌ Ne pas faire | ✅ Faire |
|----------------|---------|
| "Ajouter au panier" | "Demander un devis" |
| Prix exact (19,90€) | "Sur devis" ou fourchette |
| Description générique | Cas d'usage professionnels |
| Fiche minimaliste | Description complète + caractéristiques |
| Stock : "En stock" | Ne pas afficher de stock |
| Avis clients fictifs | Pas d'avis ou "Avis à venir" |

---

### 4.4 PAGE CONTACT (`contact.html`)

#### Objectif de la page

Convertir le visiteur intéressé en lead qualifié via une demande de devis ou de contact.

#### Structure attendue

```
┌────────────────────────────────────────────────────────────────┐
│ HEADER                                                         │
├────────────────────────────────────────────────────────────────┤
│ BREADCRUMBS : Accueil > Contact                               │
├────────────────────────────────────────────────────────────────┤
│ EN-TÊTE PAGE                                                   │
│ • H1 : Contactez-nous                                         │
│ • Texte d'accroche                                           │
├────────────────────────────────────────────────────────────────┤
│ SECTION PRINCIPALE (2 colonnes)                               │
│ ┌─────────────────────────────┬──────────────────────────────┐│
│ │ FORMULAIRE                  │ COORDONNÉES                  ││
│ │                             │                              ││
│ │ • Nom *                     │ H2: Nos coordonnées         ││
│ │ • Email *                   │ • Adresse                   ││
│ │ • Téléphone                 │ • Téléphone                 ││
│ │ • Entreprise                │ • Email                     ││
│ │ • Sujet (select) *          │                              ││
│ │ • Message *                 │ H2: Horaires                ││
│ │ • Checkbox RGPD *           │ • Lun-Ven : 9h-18h         ││
│ │                             │                              ││
│ │ [Envoyer]                   │ (optionnel: carte)          ││
│ └─────────────────────────────┴──────────────────────────────┘│
├────────────────────────────────────────────────────────────────┤
│ SECTION : FAQ RAPIDE (optionnel)                              │
│ • H2 : Questions fréquentes                                  │
│ • 3-4 questions/réponses courtes                             │
├────────────────────────────────────────────────────────────────┤
│ FOOTER                                                         │
└────────────────────────────────────────────────────────────────┘
```

#### Hiérarchie Hn

```
H1: Contactez-nous
  H2: Envoyez-nous un message
  H2: Nos coordonnées
  H2: Horaires d'ouverture
  H2: Questions fréquentes (optionnel)
```

#### Contenu attendu

**EN-TÊTE**

```html
<h1>Contactez-nous</h1>
<p class="page-intro">
  Une question sur nos produits ? Besoin d'un devis personnalisé ? 
  Notre équipe vous répond sous 24h ouvrées.
</p>
```

**FORMULAIRE — Champs**

| Champ | Type | Obligatoire | Placeholder/Options |
|-------|------|-------------|---------------------|
| Nom complet | text | Oui | "Jean Dupont" |
| Email | email | Oui | "jean@restaurant.fr" |
| Téléphone | tel | Non | "01 23 45 67 89" |
| Entreprise | text | Non | "Restaurant Le Gourmet" |
| Sujet | select | Oui | Demande de devis / Information produit / Partenariat / Autre |
| Message | textarea | Oui | "Décrivez votre demande..." |
| RGPD | checkbox | Oui | "J'accepte que mes données soient utilisées pour traiter ma demande conformément à la politique de confidentialité." |

**COORDONNÉES**

```
Weliafood SAS
123 Rue du Commerce
75001 Paris, France

Téléphone : 01 00 00 00 00
Email : contact@weliafood.com

Horaires :
Lundi - Vendredi : 9h00 - 18h00
Samedi - Dimanche : Fermé
```

**FAQ RAPIDE (optionnel)**

| Question | Réponse |
|----------|---------|
| Quel est le minimum de commande ? | Nous n'imposons pas de minimum de commande. Contactez-nous pour discuter de vos besoins. |
| Quels sont vos délais de livraison ? | Livraison sous 24-48h pour toute commande passée avant 14h (France métropolitaine). |
| Proposez-vous des échantillons ? | Oui, nous pouvons envoyer des échantillons sur demande pour les professionnels. |

#### SEO — Title & Meta

```html
<title>Contact & Devis | Grossiste Alimentaire - Weliafood</title>
<meta name="description" content="Contactez Weliafood pour un devis personnalisé. Grossiste alimentaire pour professionnels. Réponse sous 24h. Tél : 01 00 00 00 00.">
```

#### CTA

| Position | Type | Texte |
|----------|------|-------|
| Formulaire | Primary | Envoyer ma demande |

#### Erreurs à éviter

| ❌ Ne pas faire | ✅ Faire |
|----------------|---------|
| Formulaire avec 15 champs | 6-7 champs maximum |
| Pas de numéro de téléphone | Téléphone visible et cliquable |
| Email générique (info@) | Email clair (contact@) |
| Pas d'horaires | Horaires affichés |
| "Merci de nous contacter" vague | Promesse délai réponse |

---

### 4.5 PAGE À PROPOS (`a-propos.html`)

#### Objectif de la page

Rassurer le visiteur sur la crédibilité et le sérieux de l'entreprise. Humaniser la relation B2B.

#### Structure attendue

```
┌────────────────────────────────────────────────────────────────┐
│ HEADER                                                         │
├────────────────────────────────────────────────────────────────┤
│ BREADCRUMBS : Accueil > À propos                              │
├────────────────────────────────────────────────────────────────┤
│ EN-TÊTE PAGE                                                   │
│ • H1 : À propos de Weliafood                                 │
│ • Sous-titre                                                  │
├────────────────────────────────────────────────────────────────┤
│ SECTION : NOTRE HISTOIRE                                      │
│ • H2 + texte (2-3 paragraphes)                               │
│ • (optionnel: photo équipe ou locaux)                        │
├────────────────────────────────────────────────────────────────┤
│ SECTION : NOS VALEURS                                         │
│ • H2 + 3-4 valeurs (icône + titre + description)             │
├────────────────────────────────────────────────────────────────┤
│ SECTION : NOS ENGAGEMENTS                                     │
│ • H2 + liste engagements qualité/service                     │
├────────────────────────────────────────────────────────────────┤
│ SECTION : CHIFFRES CLÉS (optionnel)                          │
│ • H2 + 3-4 chiffres (années, clients, références...)         │
├────────────────────────────────────────────────────────────────┤
│ SECTION : CTA                                                 │
│ • H2 + bouton contact                                        │
├────────────────────────────────────────────────────────────────┤
│ FOOTER                                                         │
└────────────────────────────────────────────────────────────────┘
```

#### Hiérarchie Hn

```
H1: À propos de Weliafood
  H2: Notre histoire
  H2: Nos valeurs
  H2: Nos engagements
  H2: Weliafood en chiffres (optionnel)
  H2: Travaillons ensemble
```

#### Contenu attendu

**EN-TÊTE**

```html
<h1>À propos de Weliafood</h1>
<p class="page-intro">
  Votre partenaire grossiste alimentaire depuis [année]. 
  Qualité, service et proximité au cœur de notre engagement.
</p>
```

**NOTRE HISTOIRE**

```
Fondée en [année], Weliafood est née de la passion de [fondateur(s)] pour les 
produits alimentaires de qualité et d'une conviction : les professionnels de 
la restauration méritent un partenaire à leur écoute.

Après [X] années dans le secteur de la distribution alimentaire, nous avons 
créé Weliafood pour proposer une alternative aux grands groupes : une 
sélection rigoureuse de produits, un service personnalisé et une vraie 
relation de proximité avec nos clients.

Aujourd'hui, nous accompagnons [X] établissements en France — restaurants 
gastronomiques, bistrots, hôtels, traiteurs — avec une gamme de plus de 
[X] références sélectionnées pour leur qualité.
```

**NOS VALEURS**

| Valeur | Titre | Description |
|--------|-------|-------------|
| 🎯 | Exigence qualité | Chaque produit est sélectionné selon des critères stricts. Nous visitons nos fournisseurs et goûtons avant de référencer. |
| 🤝 | Proximité | Un interlocuteur dédié qui connaît votre établissement. Pas de call center, une vraie relation commerciale. |
| 🚀 | Réactivité | Commande avant 14h, livraison le lendemain. Nous comprenons les contraintes du métier. |
| 🌱 | Responsabilité | Privilégier les circuits courts quand c'est possible. Emballages optimisés, transporteurs engagés. |

**NOS ENGAGEMENTS**

```
- Réponse à toute demande sous 24h ouvrées
- Livraison France métropolitaine sous 24-48h
- Produits tracés et certifiés (fiches techniques sur demande)
- Écoute et conseil personnalisé
- Flexibilité sur les conditionnements
- Échantillons disponibles sur demande
```

**CHIFFRES CLÉS** (adapter avec données réelles ou crédibles)

| Chiffre | Label |
|---------|-------|
| [X]+ | Années d'expérience |
| [X]+ | Clients professionnels |
| [X]+ | Références produits |
| 24-48h | Délai de livraison |

#### SEO — Title & Meta

```html
<title>À Propos | Weliafood - Grossiste Alimentaire Professionnel</title>
<meta name="description" content="Découvrez Weliafood, grossiste alimentaire pour professionnels de la restauration. Notre histoire, nos valeurs, nos engagements qualité et service.">
```

#### CTA

| Position | Type | Texte | Destination |
|----------|------|-------|-------------|
| Section finale | Primary | Contactez-nous | `contact.html` |
| Section finale | Secondary | Découvrir nos produits | `categorie.html` |

#### Erreurs à éviter

| ❌ Ne pas faire | ✅ Faire |
|----------------|---------|
| Texte corporate vide | Histoire concrète, chiffres |
| "Leader du marché" sans preuve | Engagements vérifiables |
| Pas de visage humain | Mentionner fondateur, équipe |
| Valeurs génériques | Valeurs spécifiques au métier |

---

## 5. Règles SEO on-page Sprint 2

### 5.1 Règles Hn (titres)

| Règle | Application |
|-------|-------------|
| 1 seul H1 par page | Titre principal unique, contient le mot-clé cible |
| Hiérarchie logique | H1 → H2 → H3 (pas de saut H1 → H3) |
| H2 = sections principales | Chaque grande section a un H2 |
| H3 = sous-sections | Utilisé si besoin de structurer un H2 |
| Pas de H1 dans header/footer | Le logo n'est pas un H1 |

### 5.2 Titles SEO

**Format recommandé** : `[Mot-clé principal] | [Complément] - Weliafood`

| Page | Title | Longueur |
|------|-------|----------|
| Accueil | `Weliafood \| Grossiste Alimentaire pour Professionnels - Épicerie Fine` | 64 car. |
| Catégorie | `Épicerie Fine Pro \| Huiles, Vinaigres, Pâtes - Weliafood` | 55 car. |
| Produit 1 | `Huile d'Olive Extra Vierge Premium Italie \| Grossiste - Weliafood` | 62 car. |
| Produit 2 | `Vinaigre Balsamique de Modène IGP 3 ans \| Grossiste - Weliafood` | 60 car. |
| Produit 3 | `Pâtes Artisanales Penne Rigate Bronze Italie \| Grossiste - Weliafood` | 64 car. |
| Contact | `Contact & Devis \| Grossiste Alimentaire - Weliafood` | 49 car. |
| À propos | `À Propos \| Weliafood - Grossiste Alimentaire Professionnel` | 55 car. |

**Règles** :
- 50-60 caractères (max 65)
- Mot-clé principal en début
- Marque en fin
- Unique par page

### 5.3 Meta descriptions

**Format** : `[Accroche avec mot-clé]. [Bénéfice/détail]. [CTA ou info contact].`

| Page | Meta description | Longueur |
|------|------------------|----------|
| Accueil | `Grossiste alimentaire pour restaurants, hôtels et traiteurs. Huiles d'olive, vinaigres balsamiques, pâtes artisanales. Livraison France entière. Demandez votre devis.` | 160 car. |
| Catégorie | `Grossiste épicerie fine pour professionnels : huiles d'olive premium, vinaigres balsamiques, pâtes artisanales italiennes. Livraison France. Devis gratuit.` | 155 car. |
| Produit 1 | `Huile d'olive extra vierge italienne pour professionnels. Première pression à froid, fruité intense. Bidons 5L. Livraison France. Demandez votre devis.` | 154 car. |
| Produit 2 | `Vinaigre balsamique de Modène IGP vieilli 3 ans pour professionnels. Traditionnel italien, texture sirupeuse. Cartons de 12. Demandez votre devis.` | 152 car. |
| Produit 3 | `Pâtes artisanales italiennes tréfilées au bronze pour professionnels. Penne rigate, semoule de blé dur, séchage lent. Cartons de 12kg. Devis gratuit.` | 156 car. |
| Contact | `Contactez Weliafood pour un devis personnalisé. Grossiste alimentaire pour professionnels. Réponse sous 24h. Tél : 01 00 00 00 00.` | 133 car. |
| À propos | `Découvrez Weliafood, grossiste alimentaire pour professionnels de la restauration. Notre histoire, nos valeurs, nos engagements qualité et service.` | 150 car. |

**Règles** :
- 150-160 caractères
- Contient le mot-clé principal
- Incitation à l'action
- Unique par page

### 5.4 Maillage interne

**Liens obligatoires** :

```
ACCUEIL
  ├── → Catégorie (section gamme + CTA)
  ├── → Produit 1, 2, 3 (section produits phares)
  ├── → Contact (CTA header + section finale)
  └── → À propos (section ou footer)

CATÉGORIE
  ├── → Accueil (breadcrumb + logo)
  ├── → Produit 1, 2, 3 (cards)
  └── → Contact (section conseil)

PRODUIT
  ├── → Accueil (breadcrumb + logo)
  ├── → Catégorie (breadcrumb)
  ├── → Autres produits (section associés)
  └── → Contact (CTA devis)

CONTACT
  ├── → Accueil (breadcrumb + logo)
  └── → Confidentialité (lien RGPD formulaire)

À PROPOS
  ├── → Accueil (breadcrumb + logo)
  ├── → Contact (CTA)
  └── → Catégorie (CTA découvrir produits)
```

### 5.5 Checklist SEO Sprint 2

| Critère | Vérification | Statut |
|---------|--------------|--------|
| **Structure Hn** | | |
| 1 seul H1 par page | Inspecter chaque page | ⬜ |
| Hiérarchie H1 > H2 > H3 respectée | Pas de saut de niveau | ⬜ |
| H1 contient mot-clé principal | Vérifier chaque page | ⬜ |
| **Titles** | | |
| Title unique par page | Aucun doublon | ⬜ |
| Title < 65 caractères | Vérifier longueur | ⬜ |
| Mot-clé en début de title | Vérifier position | ⬜ |
| **Meta descriptions** | | |
| Meta description unique par page | Aucun doublon | ⬜ |
| Meta description < 160 caractères | Vérifier longueur | ⬜ |
| Meta description contient CTA | Vérifier présence | ⬜ |
| **Maillage** | | |
| Toutes les pages accessibles depuis accueil | Tester navigation | ⬜ |
| Breadcrumbs corrects | Vérifier chaque page | ⬜ |
| Pas de liens cassés | Tester tous les liens | ⬜ |
| **Contenu** | | |
| Texte visible et indexable | Pas de texte en image | ⬜ |
| Images avec attribut alt | Vérifier toutes les images | ⬜ |
| URL propres (kebab-case) | Vérifier nommage fichiers | ⬜ |

---

## 6. Règles UX & conversion

### 6.1 Principes généraux

| Principe | Application |
|----------|-------------|
| **Clarté immédiate** | Visiteur comprend l'offre en < 5 secondes |
| **Action évidente** | CTA principal visible sans scroll (mobile) |
| **Confiance** | Éléments de rassurance présents |
| **Mobile-first** | Tout fonctionne parfaitement sur mobile |
| **Honnêteté** | Pas de fausse promesse de fonctionnalité |

### 6.2 Règles CTA

| Règle | Application |
|-------|-------------|
| 1 CTA principal par écran | Pas de compétition entre actions |
| Texte orienté action | "Demander un devis" > "Soumettre" |
| Contraste suffisant | Bouton primaire bien visible |
| Position stratégique | Au-dessus de la ligne de flottaison + fin de section |
| Cohérence | Même style de bouton = même type d'action |

**Hiérarchie CTA** :

| Type | Usage | Style |
|------|-------|-------|
| Primary | Action principale (devis, contact) | `.btn--primary` (vert plein) |
| Secondary | Action secondaire (voir produit, en savoir plus) | `.btn--secondary` (bordure) |
| Link | Navigation simple | Lien texte souligné |

### 6.3 Lisibilité mobile

| Critère | Valeur minimum |
|---------|----------------|
| Taille texte body | 16px |
| Taille boutons | 44x44px (zone cliquable) |
| Espacement entre éléments cliquables | 8px minimum |
| Largeur ligne de texte | 45-75 caractères |
| Contraste texte/fond | 4.5:1 (AA) |

### 6.4 Éléments de rassurance

**Obligatoires** (présents sur toutes les pages via header/footer) :

| Élément | Emplacement |
|---------|-------------|
| Logo cliquable vers accueil | Header |
| Numéro de téléphone | Header (mobile: icône) + Footer |
| CTA contact/devis | Header |
| Adresse complète | Footer |
| Liens légaux | Footer |

**Recommandés** (pages spécifiques) :

| Élément | Pages |
|---------|-------|
| Délai de livraison | Accueil, Catégorie, Produit |
| Promesse réponse 24h | Contact |
| Années d'expérience | À propos, Footer |

### 6.5 Sections à supprimer/éviter

| ❌ À éviter | Raison |
|------------|--------|
| Slider/carrousel | Taux de clic faible, distraction |
| Pop-up newsletter | Intrusif pour prototype |
| Chat fictif | Fausse promesse |
| Compteur de stock | Fausse urgence |
| "Ajouter au panier" | Fonctionnalité absente |
| Avis clients fictifs | Manque de crédibilité |
| Vidéo autoplay | Mauvaise UX mobile |

---

## 7. Checklist finale de validation

### 7.1 Validation technique

| Critère | Test | Statut |
|---------|------|--------|
| Build réussi | `npm run build` OK | ⬜ |
| Aucune erreur console | DevTools propre | ⬜ |
| Liens fonctionnels | Tous les liens testés | ⬜ |
| Images chargées | Toutes les images visibles | ⬜ |
| Responsive | Testé 320px, 768px, 1280px | ⬜ |
| Déploiement OK | Site accessible via URL GitHub Pages | ⬜ |

### 7.2 Validation contenu

| Critère | Test | Statut |
|---------|------|--------|
| Accueil complet | Toutes sections rédigées | ⬜ |
| Catégorie complète | Descriptions et cards remplies | ⬜ |
| Produit 1 complet | Description longue + caractéristiques | ⬜ |
| Produit 2 complet | Description longue + caractéristiques | ⬜ |
| Produit 3 complet | Description longue + caractéristiques | ⬜ |
| Contact complet | Formulaire + coordonnées | ⬜ |
| À propos complet | Histoire + valeurs + engagements | ⬜ |
| Cohérence tonale | Discours B2B homogène | ⬜ |
| Pas de lorem ipsum | Tout le texte est réel | ⬜ |

### 7.3 Validation SEO

| Critère | Test | Statut |
|---------|------|--------|
| Titles uniques | 7 titles différents | ⬜ |
| Metas uniques | 7 descriptions différentes | ⬜ |
| H1 uniques | 1 H1 par page, tous différents | ⬜ |
| Alt images | Toutes les images ont un alt | ⬜ |
| Maillage interne | Liens croisés fonctionnels | ⬜ |

### 7.4 Validation UX/conversion

| Critère | Test | Statut |
|---------|------|--------|
| CTA visible sans scroll (mobile) | Tester sur iPhone SE | ⬜ |
| Parcours Accueil → Produit → Contact | < 3 clics | ⬜ |
| Téléphone cliquable (mobile) | `tel:` fonctionne | ⬜ |
| Formulaire utilisable | Tous champs accessibles | ⬜ |
| Navigation claire | Menu compréhensible | ⬜ |

### 7.5 Validation client (présentation)

| Question | Réponse attendue | Statut |
|----------|------------------|--------|
| "C'est quoi Weliafood ?" | Grossiste alimentaire pro | ⬜ |
| "Qu'est-ce qu'ils vendent ?" | Épicerie fine, huiles, pâtes... | ⬜ |
| "Comment je les contacte ?" | Formulaire ou téléphone visible | ⬜ |
| "C'est une vraie entreprise ?" | Adresse, téléphone, à propos | ⬜ |
| "Je peux commander en ligne ?" | Non, demande de devis | ⬜ |

---

## 8. Notes de continuité vers Sprint 3

### Ce qui est prêt pour Sprint 3

| Élément | Statut Sprint 2 | Action Sprint 3 |
|---------|-----------------|-----------------|
| Contenus rédigés | ✅ Finalisés | Affiner si feedback client |
| Structure SEO | ✅ En place | Ajouter schema.org, sitemap |
| Maillage interne | ✅ Fonctionnel | Ajouter liens contextuels |
| Design system | ✅ Tokens + composants | Raffiner si besoin |

### Sujets pour Sprint 3 (SEO technique)

| Sujet | Description |
|-------|-------------|
| Schema.org | LocalBusiness, Product, BreadcrumbList |
| Sitemap XML | Génération automatique |
| Robots.txt | Configuration |
| Open Graph | Metas réseaux sociaux |
| Performance | Optimisation images, lazy loading |
| Canonical | URLs canoniques |

### Sujets pour Sprint 4 (Ads & tracking)

| Sujet | Description |
|-------|-------------|
| Google Tag Manager | Conteneur + configuration |
| Google Analytics 4 | Setup + événements |
| Google Ads | Pixels de conversion |
| Facebook Pixel | Si pertinent |
| Événements | Formulaire envoyé, clic tel |

### Feedback attendu du client

Questions à poser lors de la présentation :

1. Les produits présentés sont-ils représentatifs de votre offre ?
2. Le ton/discours vous semble-t-il adapté à vos clients ?
3. Les informations entreprise (adresse, téléphone) sont-elles correctes ?
4. Souhaitez-vous ajouter d'autres catégories ou produits ?
5. Y a-t-il des éléments de rassurance manquants ?
6. Le formulaire de contact capture-t-il les bonnes informations ?

---

## Annexe A — Récapitulatif des fichiers à modifier

```bash
# Pages à compléter avec contenu réel
src/pages/index.html           # Accueil
src/pages/categorie.html       # Catégorie
src/pages/produit-1.html       # Huile d'olive
src/pages/produit-2.html       # Vinaigre balsamique
src/pages/produit-3.html       # Pâtes artisanales
src/pages/contact.html         # Contact/Devis
src/pages/a-propos.html        # À propos

# CSS potentiellement à ajuster
src/styles/pages/home.css      # Styles accueil
src/styles/pages/product.css   # Styles fiche produit
src/styles/pages/category.css  # Styles catégorie

# Images à ajouter/remplacer
public/images/products/        # Photos produits réelles ou libres de droits
public/images/hero.jpg         # Image hero accueil (optionnel)
```

---

## Annexe B — Ressources images libres de droits

Pour le prototype, utiliser des images de qualité :

| Source | URL | Usage |
|--------|-----|-------|
| Unsplash | unsplash.com | Photos haute qualité gratuites |
| Pexels | pexels.com | Photos gratuites |
| Pixabay | pixabay.com | Photos gratuites |

**Recherches suggérées** :
- "olive oil bottle"
- "balsamic vinegar"
- "artisan pasta"
- "italian food products"
- "professional kitchen"
- "restaurant chef"

---

**Fin du document — Sprint 2 Implementation Guide**
