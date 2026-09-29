# Roadmap & carte de couverture

[English](./roadmap.md) · Français

Le périmètre final obligatoire de NoyaFin360 est de donner une identité cohérente à **toutes les parties de Jellyfin accessibles au Custom CSS**. Ce fichier est la carte de couverture de référence. Les phases sont livrées progressivement ; rien de stylable n'est hors périmètre.

## Deux dialectes, un seul design system

Toutes les zones partagent un même design system (couleurs, radii, typographie, boutons, inputs, focus, espacements, surfaces, feedback). Seul le registre diffère :

- **Média** — immersif, cinématique, centré sur l'affiche.
- **Admin / réglages** — sobre, structuré, niveau SaaS premium ; pas de flou/backdrop cinéma ni de grosses animations.

Règle transversale : **ne jamais masquer de fonctionnalité** ; l'accessibilité et l'accès D-pad/clavier priment.

## Phases

| Phase | Zone | Dialecte | Statut |
|---|---|---|---|
| 1 | Fondation : sélecteurs, tokens, design system, risques, build | — | **Terminée** |
| 2 | Navigation : app bar, nav/tiroir/onglets, accueil, cartes, focus | Média | Suivante |
| 3 | Contenu : détails film/série/saison/épisode, collections, casting, recommandations, recherche, dialogues | Média | Prévue |
| 4 | Lecture & responsive : player vidéo, player audio, affinage mobile/tablette/TV | Média | Prévue |
| 5 | Expérience utilisateur & Live TV : profil, réglages (display, lecture, sous-titres, notifications), appareils/préférences, Live TV, guide TV | Média + formulaires sobres | Prévue |
| 6 | Administration (obligatoire) : audit complet du Dashboard **d'abord**, puis toutes les pages admin + primitives partagées | Admin (sobre) | Prévue |
| 7 | Audit & release : CSS mort, conflits, audit responsive/a11y/perf, docs, release | — | Prévue |

## Check-list de couverture

### Expérience média
- [ ] Login
- [ ] Accueil
- [ ] Films
- [ ] Séries
- [ ] Saisons
- [ ] Épisodes
- [ ] Collections
- [ ] Musique
- [ ] Recherche
- [ ] Détails média
- [ ] Casting
- [ ] Recommandations
- [ ] Live TV
- [ ] Guide TV
- [ ] Player vidéo
- [ ] Player audio

### Expérience utilisateur
- [ ] Profil
- [ ] Paramètres utilisateur
- [ ] Display
- [ ] Lecture
- [ ] Sous-titres
- [ ] Notifications
- [ ] Appareils & préférences

### Administration (dialecte sobre)
- [ ] Dashboard
- [ ] Utilisateurs
- [ ] Bibliothèques
- [ ] Plugins
- [ ] Réseau
- [ ] Lecture
- [ ] Transcodage
- [ ] Appareils
- [ ] Tâches planifiées
- [ ] Logs
- [ ] Branding
- [ ] Live TV admin
- [ ] Métadonnées

### Primitives UI partagées (stylées une fois, réutilisées partout)
- [ ] Formulaires
- [ ] Tableaux
- [ ] Menus
- [ ] Dropdowns
- [ ] Toggles
- [ ] Tabs
- [ ] Modales
- [ ] Alertes
- [ ] Snackbars
- [ ] Inputs

## Phase 6 — Verrou d'audit du Dashboard

Le CSS admin ne doit pas être écrit avant un audit dédié :

1. Recenser chaque route du Dashboard Jellyfin 12 et chaque primitive partagée.
2. Vérifier chaque sélecteur dans la source actuelle (`src/apps/dashboard`, composants MUI, éléments partagés).
3. Consigner les sélecteurs vérifiés dans `docs/jellyfin-selectors.md` (section admin).
4. Confirmer que le dialecte sobre couvre chaque primitive avant le travail par page.

Ensuite seulement, implémenter : primitives d'abord, puis pages.
