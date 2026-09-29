# NoyaFin360

> Interface cinématique premium pour Jellyfin.

[English](./README.md) · **Français**

## Vision

NoyaFin360 est un thème original pour Jellyfin conçu pour proposer une expérience premium, cinématique et responsive sur ordinateur, mobile, tablette et télévision.

Le projet s'inspire des standards d'ergonomie des grandes plateformes de streaming sans copier l'identité visuelle de Netflix, Apple TV+, Disney+, Plex ou d'un autre service.

## Cibles

- Jellyfin 12 Modern UI
- Navigateurs desktop
- iPhone / iOS
- Smartphones Android
- iPad / tablettes
- Android TV / Google TV
- Navigateurs TV et clients basés sur Jellyfin Web
- Navigation télécommande / D-pad
- Clavier, souris et tactile

> La compatibilité dépend du client Jellyfin utilisé. Les clients reposant sur Jellyfin Web peuvent appliquer le Custom CSS. Une application native utilisant sa propre interface peut ne pas appliquer le thème.

## Principes

- Identité visuelle originale
- Mise en page adaptée au français et à l'anglais
- Aucun sélecteur dépendant du texte traduit de l'interface
- Focus très visible pour TV et clavier
- Responsive du mobile aux grands téléviseurs
- Animations performantes et discrètes
- Accessibilité et `prefers-reduced-motion`
- Architecture CSS maintenable
- Aucun add-on obligatoire pour le thème principal

## État du projet

Phase de fondation. Le thème n'est pas encore considéré comme prêt pour la production.

## Structure

```text
src/       Sources CSS
addons/    Extensions optionnelles
dist/      Fichiers distribuables
docs/      Documentation architecture et compatibilité
previews/  Captures et aperçus
scripts/   Outils de build
```

## Installation

Lorsqu'une version stable sera disponible, l'installation utilisera une seule ligne dans le Custom CSS Jellyfin :

```css
@import url("https://cdn.jsdelivr.net/gh/elit28/NoyaFin360@main/dist/theme.min.css");
```

Les versions figées par release seront également prises en charge.

## Licence

La licence sera choisie avant la première release publique.
