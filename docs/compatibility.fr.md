# Compatibilité

## Support visé

NoyaFin360 cible Jellyfin 12 Modern UI et les clients basés sur Jellyfin Web.

### Modes d'interaction

- Souris
- Clavier
- Tactile
- Télécommande / D-pad

### Formats

- Mobile
- Tablette
- Desktop
- Télévision grand écran

## Limite importante

Le support du Custom CSS dépend du client.

Un client qui affiche ou embarque Jellyfin Web peut récupérer le thème. Une application native disposant de sa propre interface peut ne pas l'appliquer.

Aucune plateforme ne doit être déclarée totalement compatible avant d'avoir été testée.

## Matrice

| Plateforme / client | Statut | Notes |
|---|---|---|
| Jellyfin Web desktop | Prévu | Cible principale |
| iOS web / WebView | Prévu | Tester les safe areas |
| Android web / WebView | Prévu | |
| Android TV / Google TV | Prévu | Focus D-pad critique |
| Freebox / environnements TV | À étudier | Dépend du client utilisé |
