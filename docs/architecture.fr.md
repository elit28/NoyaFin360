# Architecture

## Objectif

Conserver NoyaFin360 modulaire, auditable et résistant aux mises à jour Jellyfin.

## Couches

1. Variables de design — `src/variables.css`
2. Fondation globale — `src/base.css`
3. Typographie
4. Navigation
5. Accueil
6. Cartes
7. Pages de détail
8. Dialogues/formulaires
9. Lecture
10. Live TV
11. Administration
12. Ajustements responsive
13. Accessibilité

`src/theme.css` constitue le point d'entrée des sources.

## Sorties générées

Le build devra produire :

- `dist/theme.css`
- `dist/theme.min.css`

## Règle

Une correction spécifique à un composant doit rester dans le module correspondant. Éviter les fichiers fourre-tout.
